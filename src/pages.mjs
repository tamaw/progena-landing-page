import { html, raw } from './templates/html.mjs';
import { audiences, benefits, faq, finalCta, footer, header, hero, how, platform, selfHost } from './templates/sections.mjs';

// Runs before first paint so the stored theme never flashes. Dark is the default.
const THEME_BOOT = `try{var t=localStorage.getItem('progena-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;

function indexPage({ content, asset }) {
  const { site } = content;
  const logo = html`<img class="logo" src="${asset('logo.svg')}" alt="" width="28" height="28">`;
  const logoSmall = html`<img class="logo" src="${asset('logo.svg')}" alt="" width="16" height="16">`;
  const ogImage = site.url + asset('og.png');

  return html`<!doctype html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${site.title}</title>
  <meta name="description" content="${site.description}">
  <link rel="canonical" href="${site.url}">
  <meta name="theme-color" content="#0e1014">
  <link rel="icon" href="${asset('favicon.svg')}" type="image/svg+xml">
  <link rel="preload" href="${asset('fonts/InterVariable.woff2')}" as="font" type="font/woff2" crossorigin>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${site.name}">
  <meta property="og:title" content="${site.title}">
  <meta property="og:description" content="${site.description}">
  <meta property="og:url" content="${site.url}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${site.title}">
  <meta name="twitter:description" content="${site.description}">
  <meta name="twitter:image" content="${ogImage}">
  <script>${raw(THEME_BOOT)}</script>
  <link rel="stylesheet" href="${asset('styles.css')}">
  <script src="${asset('main.js')}" defer></script>
</head>
<body>
  <a class="skip-link" href="#platform">Skip to content</a>
  ${header({ site, nav: content.nav, logo })}
  <main>
    ${hero({ ...content, logoSmall })}
    ${platform(content)}
    ${how(content)}
    ${audiences(content)}
    ${benefits(content)}
    ${selfHost(content)}
    ${faq(content)}
    ${finalCta(content)}
  </main>
  ${footer({ ...content, logo })}
</body>
</html>
`;
}

export function renderPages({ content, asset }) {
  const { url } = content.site;
  return {
    'index.html': indexPage({ content, asset }),
    'robots.txt': `User-agent: *\nAllow: /\nSitemap: ${url}sitemap.xml\n`,
    'sitemap.xml': `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${url}</loc></url></urlset>\n`,
  };
}
