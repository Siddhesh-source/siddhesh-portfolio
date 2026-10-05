import { h } from '../../../src/lib/dom.js';
import { once } from '../lib/store.js';

// Excerpt of the real NexusOS boot log, then the mount line for this console.
const LINES = [
  ['[ok] Phase 3 memory management verified.', 'ok'],
  ['[ok] Phase 4 process management verified.', 'ok'],
  ['[ok] Phase 5 scheduler verified.', 'ok'],
  ['mounting /portfolio ...', ''],
  ['6 projects mounted', ''],
];

/** Sub-second boot overlay, once per session. Any key or click skips it. Resolves when done. */
export function boot() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !once('console.booted')) return Promise.resolve();
  return new Promise((resolve) => {
    const body = h('div');
    const el = h('div', { class: 'boot', role: 'status', 'aria-label': 'Booting' }, body, h('small', {}, 'any key to skip'));
    document.body.append(el);
    let done = false, timers = [];
    const finish = () => { if (done) return; done = true; timers.forEach(clearTimeout); el.remove(); removeEventListener('keydown', finish); resolve(); };
    LINES.forEach(([t, cls], i) => timers.push(setTimeout(() => body.append(h('div', { class: cls }, t)), i * 120)));
    timers.push(setTimeout(finish, LINES.length * 120 + 180));
    addEventListener('keydown', finish); el.addEventListener('click', finish);
  });
}
