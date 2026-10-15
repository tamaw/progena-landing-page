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
        <span class="demo__address">app.progena.ai / chat</span>
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
                <div class="msg__pending">${typed({ words: tagline.words, first: 'Orchestrating', suffix: tagline.suffix, className: 'typed--small' })}</div>
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
                <p class="msg__reply anim" style="--d:${demo.steps.length + 2}">${demo.reply}</p>
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
