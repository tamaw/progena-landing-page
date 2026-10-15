#!/usr/bin/env node
// Progena AI static site generator. Zero dependencies.
//
//   node build.mjs           build src/ -> dist/ and validate the output
//   node build.mjs --serve   build, serve dist/ with live reload, rebuild on change
//   node build.mjs --og      render the social card page to .og/card.html
//
// Pages are plain ES modules returning HTML strings (src/pages.mjs); copy lives
// in src/content.mjs; static files in src/assets/ are copied verbatim.

import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import { createReadStream, existsSync, watch } from 'node:fs';
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const ASSETS = path.join(SRC, 'assets');
const DIST = path.join(ROOT, 'dist');
const OG_DIR = path.join(ROOT, '.og');
const RELOAD_PATH = '/__reload';

const args = new Set(process.argv.slice(2));

async function hashFile(file) {
  return createHash('sha256').update(await readFile(file)).digest('hex').slice(0, 10);
}

// Relative asset URL with a content hash, so GitHub Pages caching never serves
// stale CSS/JS after a deploy. Relative paths work both on a custom domain root
// and under a project-pages subpath.
async function createAssetResolver() {
  const cache = new Map();
  const files = await listFiles(ASSETS);
  for (const file of files) {
    const rel = path.relative(ASSETS, file).split(path.sep).join('/');
    cache.set(rel, `assets/${rel}?v=${await hashFile(file)}`);
  }
  return (name) => {
    const url = cache.get(name);
    if (!url) throw new Error(`Unknown asset referenced by template: ${name}`);
    return url;
  };
}

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(full) : [full];
  }));
  return nested.flat();
}

async function loadModule(rel) {
  return import(pathToFileURL(path.join(SRC, rel)).href);
}

function liveReloadSnippet() {
  return `<script>new EventSource('${RELOAD_PATH}').onmessage = () => location.reload();</script>`;
}

// Fails the build on dangling in-page anchors, missing local files, and
// template slips that leak "undefined"/"[object Object]" into the markup.
function validatePage(name, markup) {
  const errors = [];
  const ids = new Set([...markup.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const [, target] of markup.matchAll(/href="#([^"]*)"/g)) {
    if (target && !ids.has(target)) errors.push(`${name}: link to missing #${target}`);
  }
  for (const [, , ref] of markup.matchAll(/\s(src|href|content)="(assets\/[^"?#]+)/g)) {
    if (!existsSync(path.join(DIST, ref))) errors.push(`${name}: missing file ${ref}`);
  }
  for (const leak of ['undefined', '[object Object]', 'NaN']) {
    if (markup.replace(/<script[\s\S]*?<\/script>/g, '').includes(`>${leak}<`)) {
      errors.push(`${name}: rendered "${leak}" as text`);
    }
  }
  return errors;
}

async function build({ dev = false } = {}) {
  const started = performance.now();
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });
  await cp(ASSETS, path.join(DIST, 'assets'), { recursive: true });

  const { content } = await loadModule('content.mjs');
  const { renderPages } = await loadModule('pages.mjs');
  const asset = await createAssetResolver();
  const pages = renderPages({ content, asset });

  const errors = [];
  for (const [name, page] of Object.entries(pages)) {
    let markup = String(page);
    if (dev && name.endsWith('.html')) markup = markup.replace('</body>', `${liveReloadSnippet()}</body>`);
    await writeFile(path.join(DIST, name), markup);
    if (name.endsWith('.html')) errors.push(...validatePage(name, markup));
  }
  // GitHub Pages: serve files as-is, no Jekyll processing.
  await writeFile(path.join(DIST, '.nojekyll'), '');

  if (errors.length) {
    throw new Error(`Build validation failed:\n  ${errors.join('\n  ')}`);
  }
  const ms = Math.round(performance.now() - started);
  console.log(`built ${Object.keys(pages).length} files -> dist/ in ${ms}ms`);
}

async function renderOg() {
  const { content } = await loadModule('content.mjs');
  const { renderOgCard } = await loadModule('templates/og.mjs');
  await mkdir(OG_DIR, { recursive: true });
  const fontUrl = pathToFileURL(path.join(ASSETS, 'fonts/InterVariable.woff2')).href;
  const logoSvg = await readFile(path.join(ASSETS, 'logo.svg'), 'utf8');
  await writeFile(path.join(OG_DIR, 'card.html'), String(renderOgCard({ content, fontUrl, logoSvg })));
  console.log('rendered .og/card.html (screenshot at 1200x630 -> src/assets/og.png)');
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
};

// Each rebuild runs in a fresh child process so edited template modules are
// re-imported (ESM has no cache invalidation).
function rebuildInChild() {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [fileURLToPath(import.meta.url), '--dev-build'], { stdio: 'inherit' });
    child.on('exit', (code) => resolve(code === 0));
  });
}

async function serve() {
  const port = Number(process.env.PORT || 4173);
  const clients = new Set();
  if (!(await rebuildInChild())) console.error('initial build failed; fix and save to retry');

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === RELOAD_PATH) {
      res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
      res.write(': connected\n\n');
      clients.add(res);
      req.on('close', () => clients.delete(res));
      return;
    }
    let file = path.join(DIST, decodeURIComponent(url.pathname));
    if (!file.startsWith(DIST)) {
      res.writeHead(403).end();
      return;
    }
    try {
      if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
      await stat(file);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    createReadStream(file).pipe(res);
  });
  server.listen(port, '127.0.0.1', () => console.log(`serving dist/ at http://127.0.0.1:${port}`));

  let timer = null;
  let building = false;
  let pending = false;
  const trigger = () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      if (building) {
        pending = true;
        return;
      }
      building = true;
      const ok = await rebuildInChild();
      building = false;
      if (ok) for (const client of clients) client.write('data: reload\n\n');
      if (pending) {
        pending = false;
        trigger();
      }
    }, 80);
  };
  watch(SRC, { recursive: true }, trigger);
}

try {
  if (args.has('--og')) await renderOg();
  else if (args.has('--serve')) await serve();
  else await build({ dev: args.has('--dev-build') });
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
