import { h, s } from '../../../src/lib/dom.js';

// Detection classes come from the Quatarly README; the penalties are illustrative.
export const SIGNALS = {
  'extra person': { box: [40, 30, 90, 100], penalty: 25 },
  phone: { box: [210, 85, 46, 64], penalty: 30 },
  book: { box: [290, 24, 70, 56], penalty: 15 },
  'tab switch': { box: null, penalty: 10 },
};
export const integrity = (on) => Math.max(0, 100 - [...on].reduce((a, k) => a + SIGNALS[k].penalty, 0));

export function mount(host) {
  const on = new Set();
  const boxes = s('g');
  const frame = s('svg', { class: 'frame', viewBox: '0 0 400 170', role: 'img', 'aria-label': 'Illustrative exam camera frame' },
    s('circle', { cx: 190, cy: 76, r: 26, fill: 'none', stroke: 'currentColor', 'stroke-width': 1.2 }),
    s('path', { d: 'M132 170c0-36 26-56 58-56s58 20 58 56', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.2 }), boxes);
  const score = h('div', { class: 'big-num' }, '100');
  const feed = h('div', { class: 'log', 'aria-live': 'polite', style: { minHeight: '3.5em' } });
  const draw = () => {
    boxes.replaceChildren(...[...on].filter((k) => SIGNALS[k].box).flatMap((k) => {
      const [x, y, w, hh] = SIGNALS[k].box;
      return [s('rect', { x, y, width: w, height: hh, fill: 'none', stroke: 'var(--error)', 'stroke-width': 2, 'stroke-dasharray': '5 3' }), s('text', { x, y: y - 5, fill: 'var(--error)', 'font-size': 10, 'font-family': 'monospace' }, k)];
    }));
    score.textContent = integrity(on);
    feed.textContent = on.size ? [...on].map((k) => `violation  ${k}`).join('\n') : 'no violations';
  };
  const btns = Object.keys(SIGNALS).map((k) => h('button', { class: 'btn', type: 'button', 'aria-pressed': 'false', onclick: (e) => { on.has(k) ? on.delete(k) : on.add(k); e.currentTarget.setAttribute('aria-pressed', String(on.has(k))); draw(); } }, k));
  host.append(h('h3', {}, 'Trigger a violation'), h('div', { class: 'ctl' }, ...btns), frame, h('h3', {}, 'Integrity score'), score, feed,
    h('p', { class: 'note' }, 'Illustration: penalties are examples. The real feed reaches professors over WebSocket.'));
  draw();
}

export async function run(args, out) {
  const on = new Set(args.join(' ').split(',').map((x) => x.trim()).filter((x) => SIGNALS[x]));
  if (!on.size) { out('usage: run quat extra person, phone, book, tab switch'); out(`signals: ${Object.keys(SIGNALS).join(', ')}`, 'muted'); return; }
  on.forEach((k) => out(`violation  ${k}`, 'err'));
  out(`integrity ${integrity(on)} / 100  (illustrative penalties)`);
}
