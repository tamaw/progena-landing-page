import { html } from './html.mjs';
import { icon } from './icons.mjs';
import { typed } from './typed.mjs';
import { heroDemo, pillarVisual, benefitVisual, audienceVisual } from './visuals.mjs';

const sectionHead = ({ eyebrow, title, intro }) => html`
  <div class="section-head reveal">
    <p class="eyebrow">${eyebrow}</p>
    <h2>${title}</h2>
    ${intro && html`<p class="section-head__intro">${intro}</p>`}
  </div>
`;

const cta = (link, variant) => {
  if (link.disabled) {
    return html`<button class="btn btn--${variant} btn--azure" type="button" disabled aria-label="${link.label}"><img src="assets/deploy-to-azure.svg" alt="${link.label}" width="167" height="34"></button>`;
  }
  const external = link.href.startsWith('http');
  return html`<a class="btn btn--${variant}" href="${link.href}"${external ? html` target="_blank" rel="noopener"` : ''}>${link.href === 'https://github.com/tamaw/progenitor' ? html`<span class="github-mark" aria-hidden="true"></span>` : ''}<span>${link.label}</span>${variant === 'secondary' && !external ? icon('arrow', 16) : ''}</a>`;
};

export function header({ site, nav, hero: h, logo }) {
  return html`
    <header class="site-header">
      <div class="container site-header__inner">
        <a class="brand" href="#top" aria-label="${site.name} home">${logo}<span class="brand__name">Progena<span class="brand__ai">AI</span></span></a>
        <nav class="site-nav" aria-label="Primary">
          ${nav.filter(item => !item.href.startsWith('http')).map((item) => html`<a href="${item.href}">${item.label}</a>`)}
        </nav>
        <div class="site-header__actions">
          <button class="icon-btn" type="button" data-theme-toggle aria-label="Toggle colour theme">
            <span class="icon-btn__sun">${icon('sun', 18)}</span><span class="icon-btn__moon">${icon('moon', 18)}</span>
          </button>
          ${cta(h.primary, 'ghost btn--sm')}
          <a class="icon-btn" href="${h.secondary.href}" target="_blank" rel="noopener" aria-label="View Progena AI on GitHub"><span class="github-mark" aria-hidden="true"></span></a>
          <button class="icon-btn site-header__menu" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">${icon('menu', 20)}</button>
        </div>
      </div>
      <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile" hidden>
        ${nav.map((item) => html`<a href="${item.href}">${item.label}</a>`)}
      </nav>
    </header>
  `;
}

export function hero({ hero: h, tagline, demo, logoSmall }) {
  return html`
    <section class="hero" id="top">
      <div class="hero__glow" aria-hidden="true"></div>
      <div class="container hero__inner">
        <h1 class="hero__title reveal">
          <span class="sr-only">${tagline.prefix} ${tagline.first.toLowerCase()} your AI team</span>
          <span aria-hidden="true" class="hero__line">${tagline.prefix}</span>
          <span aria-hidden="true" class="hero__line hero__line--typed">${typed({ words: tagline.words, first: tagline.first, suffix: tagline.suffix, className: 'typed--hero' })}</span>
        </h1>
        <p class="hero__pitch reveal">${h.pitch}</p>
        <p class="hero__lead reveal">${h.lead}</p>
        <div class="hero__ctas reveal">${cta(h.primary, 'primary')}${cta(h.secondary, 'secondary')}</div>
        <p class="hero__note reveal">${h.note}</p>
      </div>
      <figure class="container hero__demo reveal">
        ${heroDemo({ demo, tagline, logo: logoSmall })}
        <figcaption class="hero__note">${demo.caption}</figcaption>
      </figure>
    </section>
  `;
}

export function platform({ platform: p }) {
  return html`
    <section class="section" id="platform">
      <div class="container">
        ${sectionHead(p)}
        <div class="verb-index reveal" aria-hidden="true">
          ${p.pillars.map((pillar, i) => html`<a href="#${pillar.id}"><span>${String(i + 1).padStart(2, '0')}</span>${pillar.verb}</a>`)}
        </div>
        <div class="pillars">
          ${p.pillars.map(
            (pillar, i) => html`
              <article class="pillar reveal${i % 2 ? ' pillar--flip' : ''}" id="${pillar.id}">
                <div class="pillar__copy">
                  <p class="pillar__verb"><span>${String(i + 1).padStart(2, '0')}</span>${pillar.verb}</p>
                  <h3>${pillar.headline}</h3>
                  <p class="pillar__body">${pillar.body}</p>
                  <ul class="checks">
                    ${pillar.points.map((point) => html`<li>${icon('check', 16)}<span>${point}</span></li>`)}
                  </ul>
                </div>
                <div class="pillar__visual">${pillarVisual(pillar.visual)}</div>
              </article>
            `,
          )}
        </div>
      </div>
    </section>
  `;
}

const howArtwork = [
  html`<path class="how-art__link" d="M82 80h28V38h42M110 80v42h42"/>
    <rect class="how-art__node" x="20" y="51" width="62" height="58" rx="14"/>
    <path d="M38 69h26M38 80h20M38 91h14"/>
    <rect class="how-art__node" x="152" y="12" width="116" height="52" rx="13"/>
    <rect class="how-art__node" x="152" y="96" width="116" height="52" rx="13"/>
    <circle cx="177" cy="31" r="6"/><path d="M167 48c2-9 18-9 20 0M199 30h49M199 43h34"/>
    <circle cx="177" cy="115" r="6"/><path d="M167 132c2-9 18-9 20 0M199 114h49M199 127h34"/>
    <circle class="how-art__signal" cx="110" cy="80" r="5"/>`,
  html`<rect class="how-art__node" x="16" y="39" width="65" height="84" rx="12"/>
    <path d="M32 59h32M32 72h24M32 85h28M32 101h15"/>
    <path class="how-art__link" d="M81 81h30M191 81h24"/>
    <path class="how-art__gate" d="M150 30l35 14v37c0 26-20 41-35 49-15-8-35-23-35-49V44z"/>
    <path class="how-art__check" d="M133 78l12 12 23-27"/>
    <circle class="how-art__node" cx="249" cy="81" r="29"/>
    <circle cx="249" cy="72" r="8"/><path d="M233 97c3-16 29-16 32 0"/>`,
  html`<path class="how-art__link" d="M77 80h37M181 80h33"/>
    <circle class="how-art__node" cx="46" cy="80" r="30"/>
    <path class="how-art__play" d="M39 66l20 14-20 14z"/>
    <circle class="how-art__gate" cx="148" cy="80" r="32"/>
    <path class="how-art__check" d="M132 80l11 11 22-24"/>
    <rect class="how-art__node" x="216" y="37" width="67" height="87" rx="12"/>
    <path d="M231 57h36M231 70h24M231 83h30"/>
    <path class="how-art__check" d="M232 103l6 6 13-14"/>`,
];

export function how({ how: h }) {
  return html`
    <section class="section section--tinted" id="how">
      <div class="container">
        ${sectionHead(h)}
        <div class="workflow-chat reveal" data-workflow-chat>
          <div class="workflow-chat__request">
            <strong>${h.playback.user}</strong>
            <p class="workflow-typed"><span aria-hidden="true">${h.playback.prompt}</span><span data-workflow-prompt>${h.playback.prompt}</span></p>
          </div>
          <div class="workflow-chat__message">
            <strong>${h.playback.agent}</strong>
            <p class="workflow-typed"><span aria-hidden="true">${h.playback.reply}</span><span data-workflow-response>${h.playback.reply}</span></p>
          </div>
        </div>
        <ol class="how">
          ${h.steps.map((step, i) => html`
            <li class="how__step reveal">
              <span class="how__num">${i + 1}</span>
              <h3>${step.title}</h3>
              <p>${step.body}</p>
              <svg class="how-art" viewBox="0 0 300 160" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${howArtwork[i]}</svg>
            </li>
          `)}
        </ol>
      </div>
    </section>
  `;
}

export function ideas({ ideas: s }) {
  const categories = new Map(s.categories.map(category => [category.id, category.label]));
  return html`
    <section class="section section--tinted ideas" id="ideas">
      <div class="container">
        ${sectionHead(s)}
        <div class="ideas__controls" role="group" aria-label="Filter cloud workflows">
          <button class="btn-mini is-top-picks" type="button" data-ideas-filter="top" aria-pressed="true" aria-controls="ideas-grid">${s.featured}</button>
          ${s.categories.map(category => html`<button class="btn-mini" type="button" data-ideas-filter="${category.id}" aria-pressed="false" aria-controls="ideas-grid">${category.label}</button>`)}
        </div>
        <p class="ideas__count" role="status"><span data-ideas-count>${s.items.length}</span> workflows</p>
        <div class="ideas__grid" id="ideas-grid">
          ${s.items.map(idea => html`
            <article class="idea" data-idea-category="${idea.category}" data-idea-top-pick="${Boolean(idea.topPick)}">
              <span class="idea__category">${categories.get(idea.category)}</span>
              <h3>${idea.title}</h3>
              <p class="idea__request">“${idea.request}”</p>
              <p class="idea__outcome">${idea.outcome}</p>
            </article>
          `)}
        </div>
        <a class="ideas__source" href="${s.sourceUrl}" target="_blank" rel="noopener">${s.sourceLabel}</a>
        <div class="ideas__footer">
          <p>${s.note}</p>
        </div>
      </div>
    </section>
  `;
}

export function audiences({ audiences: a }) {
  return html`
    <section class="section" id="who">
      <div class="container">
        ${sectionHead(a)}
        <div class="audiences">
          ${a.items.map(
            (item) => html`
              <article class="audience reveal">
                <div class="audience__visual">${audienceVisual(item.visual)}</div>
                <p class="eyebrow eyebrow--accent">${item.label}</p>
                <h3>${item.title}</h3>
                <p class="audience__body">${item.body}</p>
                <ul class="audience__requests" aria-label="${item.label} example requests">
                  ${item.requests.map((request) => html`<li>${icon('chat', 18)}<span>“${request}”</span></li>`)}
                </ul>
              </article>
            `,
          )}
        </div>
        <p class="audiences__note">${a.note}</p>
      </div>
    </section>
  `;
}

export function benefits({ benefits: b }) {
  return html`
    <section class="section section--tinted" id="why">
      <div class="container">
        ${sectionHead(b)}
        <div class="ownership" data-ownership aria-label="Why choose Progena AI">
          <div class="ownership__choices" data-ownership-controls aria-label="Explore cloud benefits">
            ${b.items.map((item, i) => html`<button type="button" data-ownership-choice="${i}" aria-controls="ownership-panel-${i}" aria-pressed="${i === 0}">${icon(item.icon, 18)}<span>${item.label}</span></button>`)}
          </div>
          <div class="ownership__panels">
            ${b.items.map((item, i) => html`
              <article class="ownership__panel" id="ownership-panel-${i}" data-ownership-panel role="group" aria-label="${i + 1} of ${b.items.length}: ${item.label}">
                <div class="ownership__copy">
                  <span class="ownership__number" aria-hidden="true">0${i + 1} / 0${b.items.length}</span>
                  <h3>${item.title}</h3>
                  <p class="ownership__body">${item.body}</p>
                  <p class="ownership__note">${item.note}</p>
                </div>
                <div class="ownership__visual">${benefitVisual(item.icon)}</div>
              </article>
            `)}
          </div>
          <div class="ownership__navigation" data-ownership-controls>
            <p class="ownership__status" data-ownership-status role="status" aria-live="polite">1 of ${b.items.length} · ${b.items[0].label}</p>
            <div>
              <button class="icon-btn" type="button" data-ownership-prev aria-label="Previous cloud benefit"><span class="ownership__back">${icon('arrow', 20)}</span></button>
              <button class="icon-btn" type="button" data-ownership-next aria-label="Next cloud benefit">${icon('arrow', 20)}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function selfHost({ selfHost: s }) {
  return html`
    <section class="section" id="deploy">
      <div class="container selfhost">
        <div class="selfhost__copy reveal">
          <p class="eyebrow">${s.eyebrow}</p>
          <h2>${s.title}</h2>
          <p class="section-head__intro">${s.body}</p>
          <ul class="selfhost__points">
            ${s.points.map((point) => html`<li><strong>${point.title}</strong><span>${point.body}</span></li>`)}
          </ul>
          <div class="hero__ctas hero__ctas--left">${cta(s.cta, 'primary')}</div>
          <p class="hero__note">${s.availability}</p>
          <p class="hero__note">${s.qualification}</p>
        </div>
        <div class="terminal reveal">
          <div class="terminal__bar">
            <span class="demo__dot"></span><span class="demo__dot"></span><span class="demo__dot"></span>
            <span class="terminal__title">${s.previewTitle}</span>
          </div>
          <div class="terminal__body">
            ${s.previewSteps.map((line, i) => html`<p>${i + 1}. ${line}</p>`)}
            <p class="terminal__line--out">${s.previewNote}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function faq({ faq: f }) {
  return html`
    <section class="section section--tinted" id="faq">
      <div class="container faq">
        <div class="faq__head reveal">
          <p class="eyebrow">${f.eyebrow}</p>
          <h2>${f.title}</h2>
        </div>
        <div class="faq__list reveal">
          ${f.items.map(
            (item) => html`
              <details class="faq__item">
                <summary>${item.q}</summary>
                <p>${item.a}</p>
              </details>
            `,
          )}
        </div>
      </div>
    </section>
  `;
}

export function finalCta({ finalCta: c, tagline, hero: h, selfHost: s }) {
  return html`
    <section class="final" id="start">
      <div class="final__glow" aria-hidden="true"></div>
      <div class="container final__inner reveal">
        <h2 class="final__title">
          <span class="sr-only">${c.prefix} automating with Progena AI</span>
          <span aria-hidden="true">${c.prefix} ${typed({ words: tagline.words, first: 'Orchestrating', suffix: tagline.suffix, className: 'typed--final' })}</span>
        </h2>
        <p class="hero__lead">${c.lead}</p>
        <div class="hero__ctas">${cta(s.cta, 'primary')}${cta(h.secondary, 'secondary')}</div>
      </div>
    </section>
  `;
}

export function footer({ site, nav, footer: f, logo }) {
  return html`
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <div class="site-footer__brand">
          <a class="brand" href="#top">${logo}<span class="brand__name">Progena<span class="brand__ai">AI</span></span></a>
        </div>
        <nav class="site-footer__nav" aria-label="Footer">
          ${nav.map((item) => html`<a href="${item.href}">${item.label}</a>`)}
        </nav>
      </div>
      <div class="container site-footer__base">
        <span>© ${site.year} ${site.name} · ${site.domain}</span>
        <span class="mono-stats">${f.stats.join(' · ')}</span>
      </div>
    </footer>
  `;
}
