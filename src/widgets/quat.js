import { h, s } from '../lib/dom.js';

// Detection classes come from the Quatarly README; penalties are illustrative.
const SIGNALS = {
  'extra person': { box: [40, 40, 90, 110], penalty: 25 },
  phone: { box: [210, 95, 46, 64], penalty: 30 },
  book: { box: [290, 30, 70, 56], penalty: 15 },
  'tab switch': { box: null, penalty: 10 },
};

export function mount(host) {
  const on = new Set();
  const boxes = s('g');
  const frame = s('svg', { class: 'frame', viewBox: '0 0 400 190', role: 'img', 'aria-label': 'Illustrative exam camera frame with detection boxes' },
    s('rect', { width: 400, height: 190, fill: 'none' }), s('circle', { cx: 190, cy: 86, r: 28, fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }),
    s('path', { d: 'M130 190c0-40 28-62 60-62s60 22 60 62', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }), boxes);
  const score = h('div', { class: 'ch__num', style: { fontSize: '3rem' } }, '100');
  const feed = h('div', { class: 'log', 'aria-live': 'polite', style: { minHeight: '4.5rem' } });
  const btns = Object.keys(SIGNALS).map((k) => h('button', { class: 'btn', type: 'button', 'aria-pressed': 'false', onclick: (e) => {
    on.has(k) ? on.delete(k) : on.add(k);
    e.currentTarget.setAttribute('aria-pressed', String(on.has(k))); draw();
  } }, k));

  function draw() {
    boxes.replaceChildren(...[...on].filter((k) => SIGNALS[k].box).flatMap((k) => {
      const [x, y, w, hh] = SIGNALS[k].box;
      return [s('rect', { x, y, width: w, height: hh, fill: 'none', stroke: 'currentColor', 'stroke-width': 2.5, 'stroke-dasharray': '6 4' }), s('text', { x, y: y - 6, fill: 'currentColor', 'font-size': 11, 'font-family': 'monospace' }, k)];
    }));
    const total = [...on].reduce((a, k) => a + SIGNALS[k].penalty, 0);
    score.textContent = Math.max(0, 100 - total);
    feed.textContent = on.size ? [...on].map((k) => `violation  ${k}`).join('\n') : 'No violations.';
  }

  host.append(h('div', { class: 'w-head' }, 'Trigger a violation'), h('div', { class: 'ctl' }, ...btns), frame,
    h('div', { class: 'w-head' }, 'Integrity score'), score, feed,
    h('p', { class: 'w-note' }, 'Illustration: score penalties are examples. The real feed reaches professors over WebSocket.'));
  draw();
}
