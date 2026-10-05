import { h } from '../../../src/lib/dom.js';

// Lines mirror the real boot log in the NexusOS README.
export const PHASES = [
  ['Phase 1', 'boot via Limine (BIOS + UEFI)'],
  ['Phase 2', 'GDT/TSS, IDT, exceptions, timer'],
  ['Phase 3', 'memory management verified'],
  ['Phase 4', 'process management verified'],
  ['Phase 5', 'scheduler verified'],
];
export const lines = (n) => PHASES.map(([p, t], i) => `${i < n ? '[ok]' : '[..]'} ${p}  ${t}`).join('\n') + (n === 5 ? '\n\n223 boot tests passing' : '');

export function mount(host) {
  const range = h('input', { type: 'range', min: 1, max: 5, value: 3, 'aria-label': 'Boot phase' });
  const label = h('span'), log = h('div', { class: 'log', 'aria-live': 'polite' });
  const play = h('button', { class: 'btn go', type: 'button' }, 'Replay boot');
  let timers = [];
  const draw = (n) => { label.textContent = `phase ${n} of 5`; log.textContent = lines(n); };
  range.addEventListener('input', () => { timers.forEach(clearTimeout); draw(+range.value); });
  play.addEventListener('click', () => { timers.forEach(clearTimeout); timers = [1, 2, 3, 4, 5].map((n) => setTimeout(() => { range.value = n; draw(n); }, (n - 1) * 550)); });
  host.append(h('h3', {}, 'Boot log'), h('div', { class: 'rl' }, h('span', {}, 'scrub'), label), range, log, h('div', { class: 'ctl' }, play),
    h('p', { class: 'note' }, 'Phase 5 of 10 is done. Self-tests run inside the kernel at every boot.'));
  draw(3);
  return () => timers.forEach(clearTimeout);
}

export async function run(_args, out) {
  for (let n = 1; n <= 5; n++) { out(lines(n).split('\n')[n - 1]); await new Promise((r) => setTimeout(r, 350)); }
  out('223 boot tests passing', 'ok');
}
