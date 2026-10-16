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

## Positioning and evidence

- Lead: **Your AI team, at work.** The typed signature starts with **Orchestrating**. Cloud engineering and cloud operations are the primary audiences, without a team-size restriction. Keep orchestration central rather than reframing the whole page around observability.
- **Why Progena AI** appears in desktop, mobile and footer navigation in page order. **Your cloud. Your rules. Your AI team.** positions cloud ownership through team-budgeted model usage, runtime-code customisation, configured identities and access controls, private-network proximity, and control over storage and external data destinations. Private connectivity depends on network configuration; hosting location alone does not guarantee security or data sovereignty. These are buying reasons, not exclusive capabilities: [Relevance AI](https://relevanceai.com/workforce) also markets agent teams and approvals, and [Copilot Studio](https://www.microsoft.com/en-us/copilot/products/copilot-studio) offers agents, workflows and consumption billing. Keep model-provider charges, limits and separate connected-agent quotas explicit.
- The Why section presents those five benefits in a manual carousel with short headlines, one paragraph, a quieter qualification and a themed SVG illustration per slide. Topic buttons and previous/next controls select slides; arrow keys and Home/End work within the topic controls. No autoplay, wheel interception or nested scrolling. Panels keep a consistent height across selections, reduced motion disables entry animation, and without JavaScript all five remain visible with controls hidden.
- **Who it’s for** pairs two illustrated cloud-team cards with conversational example requests, rather than generic feature checklists. Engineering covers Entra app identities, proof-of-concept deployment and coordinating an Azure migration; operations covers approved firewall access and peak-hour performance reporting. Illustrations are editorial, not recorded runs. Actual workflows depend on configured tools, permissions and approvals.
- The illustrative **Agentic workflow** pairs one compact typed request/reply with three static cards: build/delegate, Greg’s approval and apply/check/report. It is a storyboard, not a recorded run or a turnkey firewall integration.
- The request and single reply loop without adding messages. Reserved text space keeps the cards stationary during typing. There is no nested scroll container, auto-scroll, toolbar or manual approval UI. Playback pauses offscreen or in a hidden tab; reduced-motion and JavaScript-disabled browsing show the complete text.
- Each workflow card ends with a theme-aware SVG illustration: branching agent delegation, a human approval gate, and execution through verification to a report. Artwork is bottom-aligned on desktop; tags, inbox details and the standalone HTTPS result line are omitted.
- The hero app preview contains two Progena AI messages: specialist-delegation instructions with task steps, followed by the animated pending-reply signature. Its caption introduces the product benefit; illustration disclosures remain in the workflow introduction and FAQ.
- **Workflow automation** contains 32 Cloud-domain tasks selected from the report’s appendix, ordered by overall confidence without displaying scores. **Top picks** opens by default with six higher-confidence selections spanning all five categories; category filters show the remaining workflows without an “All workflows” or expand/collapse option. Rightsizing is excluded to avoid redundancy-related connotations. Without JavaScript the complete list stays readable. Cards are editorial suggestions, not turnkey integrations; the footer introduces the Progena AI automation marketplace and links to the source report.
- Interface examples are illustrative, not execution evidence. Do not add customer outcomes, timing benchmarks, savings, compliance badges or team-permission claims without evidence.
- Approval nodes pause workflows where explicitly configured; they do not automatically gate every external action.
- The core assistant uses the operator-configured Azure OpenAI deployment. Provider charges/limits still apply; connected agents and services can use separate accounts, quotas and billing. Workflow data can be sent to those configured providers.
- Early-access signup is intentionally unwired by owner choice. Do not add a form or contact CTA until a real destination is supplied.


## Product deployment

GitHub Pages hosts this static marketing site only; it is not the Progena AI deployment offering. The page uses disabled **Deploy to Azure** buttons with no URL or deployment action, displaying Microsoft’s official badge from https://aka.ms/deploytoazurebutton (stored locally). The Azure panel describes the planned flow, not a working deployment.

When the deployment template is ready, wire the shared CTA in `src/content.mjs` to Azure Portal using a URL-encoded, reachable ARM JSON template URL. Bicep must first be compiled to JSON. See [Microsoft’s Deploy to Azure button documentation](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-to-azure-button).

## Deploying to GitHub Pages

The public repository publishes through `.github/workflows/pages.yml`. Pushes to `main` build and deploy; pull requests build and validate without publishing. The workflow can also be run manually from Actions.

The build runs `node build.mjs` on Node.js 22, uploads `dist/` as a Pages artifact, then deploys through GitHub’s `github-pages` environment. No dependency installation, personal token or `gh-pages` branch is needed. The deploy job has only `pages: write` and `id-token: write`; source checkout has read-only access.

GitHub Pages must use **GitHub Actions** as its publishing source. Until the custom domain is configured, the site is available at https://tamaw.github.io/progena-landing-page/. Relative asset paths support this project URL.

For `progena.ai`, configure DNS for GitHub Pages, then set the repository’s **Settings → Pages → Custom domain** and enable HTTPS once the certificate is ready. The workflow deliberately does not set a custom domain or modify DNS. Metadata continues to identify `https://progena.ai` as the intended canonical domain.
