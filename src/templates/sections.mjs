import { html } from './html.mjs';
import { icon } from './icons.mjs';
import { typed } from './typed.mjs';
import { heroDemo, pillarVisual } from './visuals.mjs';

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
  return html`<a class="btn btn--${variant}" href="${link.href}"${external ? html` target="_blank" rel="noopener"` : ''}><span>${link.label}</span>${variant === 'secondary' ? icon('arrow', 16) : ''}</a>`;
};

export function header({ site, nav, hero: h, logo }) {
  return html`
    <header class="site-header">
      <div class="container site-header__inner">
        <a class="brand" href="#top" aria-label="${site.name} home">${logo}<span class="brand__name">Progena<span class="brand__ai">AI</span></span></a>
        <nav class="site-nav" aria-label="Primary">
          ${nav.map((item) => html`<a href="${item.href}">${item.label}</a>`)}
        </nav>
        <div class="site-header__actions">
          <button class="icon-btn" type="button" data-theme-toggle aria-label="Toggle colour theme">
            <span class="icon-btn__sun">${icon('sun', 18)}</span><span class="icon-btn__moon">${icon('moon', 18)}</span>
          </button>
          ${cta(h.primary, 'ghost btn--sm')}
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
        <p class="pill reveal"><span class="pill__dot"></span>${h.pill}</p>
        <h1 class="hero__title reveal">
          <span class="sr-only">${tagline.prefix} ${tagline.first.toLowerCase()} your cloud workflows</span>
          <span aria-hidden="true" class="hero__line">${tagline.prefix}</span>
          <span aria-hidden="true" class="hero__line hero__line--typed">${typed({ words: tagline.words, first: tagline.first, suffix: tagline.suffix, className: 'typed--hero' })}</span>
        </h1>
        <p class="hero__lead reveal">${h.lead}</p>
        <div class="hero__ctas reveal">${cta(h.primary, 'primary')}${cta(h.secondary, 'secondary')}</div>
        <p class="hero__note reveal">${h.note}</p>
      </div>
      <div class="container hero__demo reveal">${heroDemo({ demo, tagline, logo: logoSmall })}</div>
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

export function how({ how: h }) {
  return html`
    <section class="section section--tinted" id="how">
      <div class="container">
        ${sectionHead(h)}
        <ol class="how">
          ${h.steps.map(
            (step, i) => html`
              <li class="how__step reveal">
                <span class="how__num">${i + 1}</span>
                <h3>${step.title}</h3>
                <p>${step.body}</p>
                <p class="how__example">${step.example}</p>
              </li>
            `,
          )}
        </ol>
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
                <p class="eyebrow eyebrow--accent">${item.label}</p>
                <h3>${item.title}</h3>
                <p class="audience__body">${item.body}</p>
                <ul class="checks">
                  ${item.points.map((point) => html`<li>${icon('check', 16)}<span>${point}</span></li>`)}
                </ul>
              </article>
            `,
          )}
        </div>
      </div>
    </section>
  `;
}

export function benefits({ benefits: b }) {
  return html`
    <section class="section section--tinted" id="why">
      <div class="container">
        ${sectionHead(b)}
        <div class="benefits">
          ${b.items.map(
            (item) => html`
              <div class="benefit reveal">
                <span class="benefit__icon">${icon(item.icon, 22)}</span>
                <h3>${item.title}</h3>
                <p>${item.body}</p>
              </div>
            `,
          )}
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

export function footer({ site, nav, footer: f, tagline, logo }) {
  return html`
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <div class="site-footer__brand">
          <a class="brand" href="#top">${logo}<span class="brand__name">Progena<span class="brand__ai">AI</span></span></a>
          <p class="site-footer__tagline">${tagline.prefix} ${tagline.first}${tagline.suffix}</p>
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
