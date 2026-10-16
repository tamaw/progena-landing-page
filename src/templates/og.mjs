import { html, raw } from './html.mjs';

// 1200x630 social card. Rendered by `node build.mjs --og`, screenshotted to
// src/assets/og.png (PNG, because link unfurlers do not render SVG).
export function renderOgCard({ content, fontUrl, logoSvg }) {
  const { tagline, site } = content;
  return html`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  @font-face { font-family: Inter; src: url('${fontUrl}') format('woff2'); font-weight: 100 900; }
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; }
  body {
    position: relative; overflow: hidden; padding: 72px 80px;
    background: #0b0d11; color: #e6e8ed; font-family: Inter, sans-serif;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  body::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: radial-gradient(ellipse 80% 80% at 70% 40%, #000 20%, transparent 75%);
  }
  .glow { position: absolute; right: -160px; top: -200px; width: 900px; height: 700px;
    background: radial-gradient(closest-side at 40% 50%, rgba(111,150,255,.28), transparent),
                radial-gradient(closest-side at 65% 60%, rgba(20,184,166,.2), transparent); }
  .brand { position: relative; display: flex; align-items: center; gap: 16px; font-size: 34px; font-weight: 650; letter-spacing: -.03em; }
  .brand svg { width: 52px; height: 52px; }
  .grad { background: linear-gradient(90deg, #6f96ff, #14b8a6); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .title { position: relative; font-size: 96px; font-weight: 600; line-height: 1.02; letter-spacing: -.045em; }
  .typed { font-family: ui-monospace, 'SFMono-Regular', 'JetBrains Mono', Menlo, monospace; letter-spacing: -.04em; }
  .cursor { display: inline-block; width: 7px; height: 84px; margin-left: 8px; vertical-align: -8px; background: #14b8a6; border-radius: 2px; }
  .foot { position: relative; display: flex; justify-content: space-between; align-items: flex-end; }
  .lead { max-width: 660px; color: #b6bbc6; font-size: 28px; line-height: 1.4; }
  .domain { color: #8a919e; font-family: ui-monospace, monospace; font-size: 24px; letter-spacing: .04em; }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="brand">${raw(logoSvg)}<span>Progena <span class="grad">AI</span></span></div>
  <h1 class="title">${tagline.prefix}<br><span class="typed grad">${tagline.first}${tagline.suffix}</span><span class="cursor"></span></h1>
  <div class="foot">
    <p class="lead">${content.hero.pitch}</p>
    <span class="domain">${site.domain}</span>
  </div>
</body>
</html>
`;
}
