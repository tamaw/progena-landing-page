# progena.ai

Landing page for **Progena AI**: *Always Automating…*

A static site built by a zero-dependency Node generator (`build.mjs`). Output goes to `dist/`, ready for GitHub Pages.

## Commands

| Command | What it does |
|---|---|
| `npm run build` | Build `src/` → `dist/` and validate the output (missing anchors, missing assets, leaked `undefined`). Non-zero exit on failure. |
| `npm run dev` | Build, serve `dist/` at http://127.0.0.1:4173 with live reload, rebuild on every change under `src/`. `PORT=…` to change. |
| `npm run og` | Render the social card to `.og/card.html`. Screenshot it at 1200×630 and save as `src/assets/og.png`. |

Requires Node 20+. No `npm install` needed.

## Layout

```
build.mjs              generator: build, dev server, validation, OG render
src/content.mjs        every word on the page
src/pages.mjs          page assembly (index.html, robots.txt, sitemap.xml)
src/templates/         html tagged template, sections, product mock visuals, icons
src/assets/            styles.css, main.js, logo/favicon, Inter font, og.png
```

Edit copy in `src/content.mjs`, never in templates. Asset URLs are relative and content-hashed (`assets/styles.css?v=…`), so the site works both at a custom-domain root and under a `/<repo>/` project path.

## Brand

- **Name:** Progena AI · **Domain:** progena.ai
- **Tagline:** "Always" + a typed verb with a blinking cursor, cycling the seven things Progena does: Orchestrating, Spectating, Operating, Automating, Delegating, Facilitating, Integrating. It reuses the app's own pending-reply cursor, with the same 90ms typing rhythm.
- **Palette:** the app's theme tokens. Accent `#6f96ff` (dark) / `#2f6ff6` (light), teal `#14b8a6`, background `#0b0d11`. Dark-first, with a light toggle.
- **Mark:** double helix, blue→teal gradient (`src/assets/logo.svg`).

## Deploying to GitHub Pages (later)

Publish `dist/` (for example with `actions/upload-pages-artifact` + `actions/deploy-pages` after `node build.mjs`). For the custom domain, add a `CNAME` file containing `progena.ai`.
