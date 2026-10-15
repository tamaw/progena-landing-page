import { html } from './html.mjs';

// The product's "busy" signature: a word typed out next to a blinking cursor.
// Server-rendered with the first word fully typed, so it reads correctly
// without JavaScript; main.js animates every [data-typed] element.
export function typed({ words, first, suffix, className = '' }) {
  return html`<span class="typed ${className}" data-typed data-words="${JSON.stringify(words)}" data-first="${first}" data-suffix="${suffix}"><span class="typed__text">${first}${suffix}</span><span class="typed__cursor"></span></span>`;
}
