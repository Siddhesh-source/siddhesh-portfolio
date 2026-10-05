import { h } from '../lib/dom.js';

const PHASES = [
  ['Phase 1', 'boot via Limine (BIOS + UEFI)'],
  ['Phase 2', 'GDT/TSS, IDT, exceptions, timer'],
  ['Phase 3', 'memory management verified'],
  ['Phase 4', 'process management verified'],
  ['Phase 5', 'scheduler verified'],
];

export function mount(host) {
  const range = h('input', { type: 'range', min: 1, max: 5, value: 3, 'aria-label': 'Boot phase' });
  const label = h('span');
  const log = h('div', { class: 'log', 'aria-live': 'polite' });
  const play = h('button', { class: 'btn', type: 'button' }, 'Replay boot');
  let timers = [];

  const draw = (n) => {
    label.textContent = `Phase ${n} of 5`;
    log.textContent = PHASES.map(([p, t], i) => `${i < n ? '[ok]' : '[..]'} ${p}  ${t}`).join('\n') + (n === 5 ? '\n\n223 boot tests passing' : '');
  };
  range.addEventListener('input', () => { timers.forEach(clearTimeout); draw(+range.value); });
  play.addEventListener('click', () => {
    timers.forEach(clearTimeout); timers = [];
    [1, 2, 3, 4, 5].forEach((n) => timers.push(setTimeout(() => { range.value = n; draw(n); }, (n - 1) * 600)));
  });

  host.append(h('div', { class: 'w-head' }, 'Scrub through the boot'), h('div', { class: 'range-label' }, label), range, log, h('div', { class: 'ctl' }, play),
    h('p', { class: 'w-note' }, 'Lines mirror the real boot log in the project README.'));
  draw(3);
}
