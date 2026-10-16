// Hand-built HTML/SVG renditions of the product UI. No screenshots: they stay
// sharp at any size and follow the light/dark theme.

import { html } from './html.mjs';
import { icon } from './icons.mjs';
import { typed } from './typed.mjs';

export function heroDemo({ demo, tagline, logo }) {
  return html`
    <div class="demo" aria-label="Progena AI app preview" role="img">
      <div class="demo__chrome">
        <span class="demo__dot"></span><span class="demo__dot"></span><span class="demo__dot"></span>
        <span class="demo__address">app.example.com / chat</span>
      </div>
      <div class="demo__body">
        <aside class="demo__nav">
          <div class="demo__brand">${logo}<span>Progena AI</span></div>
          ${demo.nav.map(
            (group) => html`
              <div class="demo__group">
                <div class="demo__group-title">${group.group}</div>
                ${group.items.map(
                  (item) => html`<div class="demo__item${item === group.active ? ' is-active' : ''}">${item}</div>`,
                )}
              </div>
            `,
          )}
        </aside>
        <div class="demo__chat">
          <div class="demo__header">
            <span class="demo__title">${demo.title}</span>
            <span class="status status--live"><span class="status__dot"></span>Running</span>
          </div>
          <div class="demo__thread">
            <div class="msg msg--user anim" style="--d:0">
              <span class="msg__avatar">${icon('user', 14)}</span>
              <p>${demo.prompt}</p>
            </div>
            <div class="msg msg--agent anim" style="--d:1">
              <span class="msg__avatar msg__avatar--agent">${logo}</span>
              <div class="msg__content">
                <p class="msg__reply">${demo.reply}</p>
                <ul class="steps">
                  ${demo.steps.map(
                    (step, i) => html`
                      <li class="steps__item anim" style="--d:${i + 2}">
                        <span class="steps__check">${icon('check', 12)}</span>
                        <span class="steps__label">${step.label}</span>
                        <span class="steps__detail">${step.detail}</span>
                        <span class="steps__time">${step.time}</span>
                      </li>
                    `,
                  )}
                </ul>
              </div>
            </div>
            <div class="msg msg--agent anim" style="--d:${demo.steps.length + 2}">
              <span class="msg__avatar msg__avatar--agent">${logo}</span>
              <div class="msg__content">
                <div class="msg__pending">${typed({ words: tagline.words, first: 'Orchestrating', suffix: tagline.suffix, className: 'typed--small' })}</div>
              </div>
            </div>
          </div>
          <div class="demo__composer">
            <span>${demo.composer}</span>
            <span class="demo__send">${icon('arrow', 14)}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function orchestrateVisual(v) {
  return html`
    <div class="viz viz--orchestrate">
      <div class="bubble">${v.ask}</div>
      <div class="report">
        <div class="report__head">
          <span class="report__icon">${icon('inbox', 16)}</span>
          <div>
            <div class="report__title">${v.report.title}</div>
            <div class="report__meta">${v.report.meta}</div>
          </div>
        </div>
        <dl class="report__rows">
          ${v.report.rows.map((row) => html`<div><dt>${row.label}</dt><dd>${row.value}</dd></div>`)}
        </dl>
        <div class="report__actions"><span class="btn-mini btn-mini--primary">Approve</span><span class="btn-mini">Decline</span></div>
      </div>
    </div>
  `;
}

function spectateVisual(v) {
  return html`
    <div class="viz viz--spectate">
      <div class="viz__caption"><span class="status status--live"><span class="status__dot"></span>Live</span>${v.run}</div>
      <ol class="timeline">
        ${v.steps.map(
          (step) => html`
            <li class="timeline__item timeline__item--${step.state}">
              <span class="timeline__node"></span>
              <div class="timeline__body">
                <span class="timeline__label">${step.label}</span>
                <span class="timeline__detail">${step.detail}</span>
              </div>
              <span class="timeline__time">${step.time || html`<span class="spinner"></span>`}</span>
            </li>
          `,
        )}
      </ol>
      <div class="viz__footer"><span class="btn-mini">${icon('pause', 12)} Stop</span><span class="viz__hint">Stopping keeps everything written so far</span></div>
    </div>
  `;
}

function operateVisual(v) {
  return html`
    <div class="viz viz--operate">
      ${v.columns.map(
        (col) => html`
          <div class="kanban__col">
            <div class="kanban__title">${col.title}<span>${col.cards.length}</span></div>
            ${col.cards.map(
              (card) => html`
                <div class="kanban__card${card.live ? ' is-live' : ''}">
                  <span>${card.title}</span>
                  <span class="tag${card.live ? ' tag--accent' : ''}">${card.live ? html`<span class="status__dot"></span>` : ''}${card.tag}</span>
                </div>
              `,
            )}
          </div>
        `,
      )}
    </div>
  `;
}

// A small routine graph in the style of the app's canvas: start, classify,
// two parallel branches, a human approval gate, end.
function automateVisual() {
  return html`
    <div class="viz viz--automate">
      <svg class="graph" viewBox="0 0 360 272" role="img" aria-label="Workflow: classify, branch, approve, resolve">
        <g class="graph__edges">
          <path d="M180 34v22"/>
          <path d="M180 88v14H90v18M180 102h90v18"/>
          <path d="M90 152v18h90v14M270 152v18h-90"/>
          <path d="M180 216v22"/>
        </g>
        <circle class="graph__pulse" r="4"><animateMotion dur="4s" repeatCount="indefinite" path="M180 34V102H90V170H180V238"/></circle>
        <g class="graph__node graph__node--terminal"><rect x="146" y="8" width="68" height="26" rx="13"/><text x="180" y="25">Start</text></g>
        <g class="graph__node"><rect x="110" y="56" width="140" height="32" rx="8"/><text x="180" y="76">Classify alert</text></g>
        <g class="graph__node"><rect x="30" y="120" width="120" height="32" rx="8"/><text x="90" y="140">Urgent fix</text></g>
        <g class="graph__node"><rect x="210" y="120" width="120" height="32" rx="8"/><text x="270" y="140">Open ticket</text></g>
        <g class="graph__node graph__node--human"><rect x="105" y="184" width="150" height="32" rx="8"/><text x="180" y="204">Human approval</text></g>
        <g class="graph__node graph__node--terminal graph__node--end"><rect x="146" y="238" width="68" height="26" rx="13"/><text x="180" y="255">Done</text></g>
      </svg>
      <div class="viz__chips"><span class="chip">Weekdays · 08:00</span><span class="chip">Retry ×3</span><span class="chip">Timeout 10m</span></div>
    </div>
  `;
}

function delegateVisual(v) {
  return html`
    <div class="viz viz--delegate">
      ${v.agents.map(
        (agent) => html`
          <div class="agent">
            <span class="agent__avatar">${agent.name.slice(0, 1)}</span>
            <div class="agent__body">
              <span class="agent__name">${agent.name}</span>
              <span class="agent__role">${agent.role}</span>
            </div>
            <span class="status status--${agent.state.toLowerCase()}"><span class="status__dot"></span>${agent.state}</span>
          </div>
        `,
      )}
    </div>
  `;
}

function facilitateVisual(v) {
  return html`
    <div class="viz viz--facilitate">
      <div class="kpage">
        <div class="kpage__title">${v.page.title}</div>
        <div class="kpage__meta">${v.page.meta}</div>
        ${v.page.lines.map((w) => html`<span class="kpage__line" style="width:${w}%"></span>`)}
      </div>
      <ul class="tools">
        ${v.tools.map(
          (tool) => html`<li><span>${tool.name}</span><span class="toggle${tool.on ? ' is-on' : ''}" aria-label="${tool.on ? 'On' : 'Off'}"></span></li>`,
        )}
      </ul>
    </div>
  `;
}

function integrateVisual(v) {
  return html`
    <div class="viz viz--integrate">
      ${v.channels.map(
        (ch) => html`
          <div class="channel${ch.live ? ' is-live' : ''}">
            <span class="channel__name">${ch.name}</span>
            <span class="channel__state">${ch.live ? 'Live' : 'Coming soon'}</span>
          </div>
        `,
      )}
    </div>
  `;
}

const VISUALS = {
  orchestrate: orchestrateVisual,
  spectate: spectateVisual,
  operate: operateVisual,
  automate: automateVisual,
  delegate: delegateVisual,
  facilitate: facilitateVisual,
  integrate: integrateVisual,
};

export function pillarVisual(visual) {
  const render = VISUALS[visual.kind];
  if (!render) throw new Error(`Unknown pillar visual: ${visual.kind}`);
  return render(visual);
}

// Editorial illustrations, not product screenshots or deployment guarantees.
export function benefitVisual(kind) {
  const tile = (x, y, width, label) => html`
    <rect x="${x}" y="${y}" width="${width}" height="52" rx="14" class="ownership-art__tile"/>
    <text x="${x + width / 2}" y="${y + 31}" text-anchor="middle">${label}</text>`;
  const scenes = {
    budget: html`
      <path d="M100 90v60h140M100 230v-80M240 150h70" class="ownership-art__flow"/>
      ${tile(28, 38, 144, 'Your team')}
      ${tile(28, 204, 144, 'Cloud budget')}
      <path d="M292 110c-16-43 53-68 76-29 41-13 67 37 34 61H286c-25-3-25-31 6-32Z" class="ownership-art__cloud"/>
      ${tile(252, 150, 200, 'Model capacity')}
      <text x="352" y="240" text-anchor="middle" class="ownership-art__caption">One team. Ongoing work.</text>`,
    helix: html`
      <rect x="28" y="36" width="250" height="226" rx="20" class="ownership-art__tile"/>
      <circle cx="51" cy="58" r="4" class="ownership-art__dot"/><circle cx="67" cy="58" r="4" class="ownership-art__dot"/>
      <text x="54" y="108" class="ownership-art__code">&lt;your-workflow&gt;</text>
      <path d="M56 136h150M76 158h104M76 180h130M56 202h78" class="ownership-art__lines"/>
      <path d="M278 150h42v-58h26M320 150v64h26" class="ownership-art__flow"/>
      ${tile(334, 66, 120, 'Tools')}
      ${tile(334, 188, 120, 'Agents')}`,
    shield: html`
      ${tile(22, 124, 126, 'Workflow')}
      <path d="M148 150h48M282 150h46v-65h24M328 150v66h24" class="ownership-art__flow"/>
      <path d="M239 79l44 16v55c0 36-44 65-44 65s-44-29-44-65V95Z" class="ownership-art__cloud"/>
      <path d="M220 146l14 14 27-31" class="ownership-art__check"/>
      ${tile(344, 59, 114, 'Allowed')}
      ${tile(344, 190, 114, 'Scoped')}
      <text x="239" y="254" text-anchor="middle" class="ownership-art__caption">Your identities. Your permissions.</text>`,
    network: html`
      <rect x="22" y="32" width="436" height="236" rx="26" class="ownership-art__boundary"/>
      <text x="48" y="67" class="ownership-art__caption">YOUR PRIVATE NETWORK</text>
      ${tile(48, 124, 162, 'Progena AI')}
      <path d="M210 150h56v-34h32M266 150v66h32" class="ownership-art__flow"/>
      ${tile(296, 90, 138, 'Your apps')}
      ${tile(296, 190, 138, 'Private API')}`,
    database: html`
      <rect x="22" y="34" width="202" height="230" rx="24" class="ownership-art__boundary"/>
      <text x="123" y="70" text-anchor="middle" class="ownership-art__caption">YOUR CHOSEN REGION</text>
      <ellipse cx="123" cy="116" rx="48" ry="16" class="ownership-art__cloud"/>
      <path d="M75 116v68c0 22 96 22 96 0v-68M75 150c0 22 96 22 96 0" class="ownership-art__lines"/>
      <text x="123" y="234" text-anchor="middle">Workflow data</text>
      <path d="M224 150h40v-50h36M264 150v62h36" class="ownership-art__flow"/>
      ${tile(296, 74, 162, 'Chosen model')}
      ${tile(296, 186, 162, 'Chosen tools')}`,
  };
  return html`<svg class="ownership-art" viewBox="0 0 480 300" fill="none" aria-hidden="true">${scenes[kind]}</svg>`;
}

export function audienceVisual(kind) {
  const scene = kind === 'engineering' ? html`
    <path d="M98 100h54M248 100h48M392 100h42" class="audience-art__route"/>
    <rect x="18" y="64" width="80" height="72" rx="16" class="audience-art__node"/>
    <path d="M49 88l-12 12 12 12M67 88l12 12-12 12" class="audience-art__ink"/>
    <rect x="152" y="64" width="96" height="72" rx="16" class="audience-art__node"/>
    <circle cx="200" cy="90" r="9" class="audience-art__ink"/>
    <path d="M183 117c2-17 32-17 34 0" class="audience-art__ink"/>
    <rect x="296" y="64" width="96" height="72" rx="16" class="audience-art__node"/>
    <path d="M319 105c-9-18 17-32 28-17 18-7 30 17 13 24h-33c-4 0-7-3-8-7Z" class="audience-art__ink"/>
    <text x="58" y="166">Your app</text><text x="200" y="166">Identity</text><text x="344" y="166">Azure</text>
    <text x="240" y="32" class="audience-art__caption">BUILD · CONNECT · DEPLOY</text>
    <circle cx="434" cy="100" r="10" class="audience-art__signal"/>` : html`
    <rect x="18" y="48" width="280" height="126" rx="18" class="audience-art__node"/>
    <rect x="136" y="64" width="70" height="91" rx="8" class="audience-art__peak"/>
    <path d="M38 148h240M38 124h240M38 100h240" class="audience-art__grid"/>
    <path d="M38 143l28-5 24 5 24-24 24 4 22-39 24 20 24-14 24 39 22-8 24 11" class="audience-art__ink"/>
    <path d="M298 110h42" class="audience-art__route"/>
    <rect x="340" y="48" width="122" height="126" rx="18" class="audience-art__node"/>
    <path d="M364 80h54M364 96h72M364 112h62" class="audience-art__ink"/>
    <path d="M383 141l10 10 22-24" class="audience-art__check"/>
    <text x="158" y="200">Peak-hour monitoring</text><text x="401" y="200">Team report</text>
    <text x="240" y="26" class="audience-art__caption">WATCH · COORDINATE · REPORT</text>`;
  return html`<svg class="audience-art" viewBox="0 0 480 220" fill="none" aria-hidden="true">${scene}</svg>`;
}
