import { h } from '../lib/dom.js';
import { simulate } from '../lib/sim.js';

const STOCK = 100;
const fmt = (st, total) => `requests     ${st.done}/${total}\nsold         ${st.sold}\nstock left   ${st.stock}\noversold     ${st.oversold}`;

export function mount(host) {
  let atomic = false, timers = [];
  const n = h('input', { type: 'range', min: 100, max: 2000, step: 100, value: 800, 'aria-label': 'Concurrent requests' });
  const nv = h('span', { class: 'acc' }, '800');
  const meter = h('div', { class: 'meter' }, h('i'));
  const out = h('div', { class: 'log' }, 'Press run.');
  const mk = (isAtomic, text) => h('button', { class: 'btn', type: 'button', 'aria-pressed': String(isAtomic === atomic), onclick: () => { atomic = isAtomic; bs.forEach((b, i) => b.setAttribute('aria-pressed', String((i === 1) === atomic))); } }, text);
  const bs = [mk(false, 'naive read then write'), mk(true, 'atomic Lua decrement')];
  const go = h('button', { class: 'btn go', type: 'button' }, 'Run');
  n.addEventListener('input', () => { nv.textContent = n.value; });
  go.addEventListener('click', () => {
    timers.forEach(clearTimeout);
    const total = +n.value;
    timers = simulate(total, atomic).map((st, i) => setTimeout(() => { meter.firstChild.style.setProperty('--w', (st.done / total) * 100 + '%'); out.textContent = fmt(st, total); }, i * 130));
  });
  host.append(h('h3', {}, `Stock = ${STOCK}. Race the buyers.`), h('div', { class: 'rl' }, h('span', {}, 'requests at once'), nv), n, h('div', { class: 'ctl' }, ...bs, go), meter, out,
    h('p', { class: 'note' }, 'Simulation of the failure mode, not a benchmark of the real system.'));
  return () => timers.forEach(clearTimeout);
}

export async function run(args, out) {
  const i = args.indexOf('--n');
  const total = Math.min(5000, Math.max(100, parseInt(i >= 0 ? args[i + 1] : args.find((a) => /^\d+$/.test(a)), 10) || 800));
  for (const atomic of [false, true]) {
    const last = simulate(total, atomic).at(-1);
    out(`${atomic ? 'atomic' : 'naive '}  requests ${total}  sold ${last.sold}  oversold ${last.oversold}`, last.oversold ? 'err' : 'ok');
  }
  out('simulation of the failure mode, not a benchmark', 'muted');
}
