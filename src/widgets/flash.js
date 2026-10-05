import { h } from '../lib/dom.js';

const STOCK = 100;

/**
 * Wave model: requests arrive in 10 waves. Naive read-then-write lets a whole wave act on the
 * same stale stock; the atomic path decrements and checks in one step. A simulation of the failure
 * mode, not a benchmark of the real system.
 */
export function simulate(requests, atomic) {
  const wave = Math.max(1, Math.round(requests / 10));
  let stock = STOCK, sold = 0, done = 0;
  const steps = [];
  while (done < requests) {
    const w = Math.min(wave, requests - done);
    done += w;
    if (atomic) { const t = Math.min(stock, w); sold += t; stock -= t; }
    else if (stock > 0) { sold += w; stock = Math.max(0, stock - w); }
    steps.push({ done, sold, stock, oversold: Math.max(0, sold - STOCK) });
  }
  return steps;
}

export function mount(host) {
  let atomic = false, timers = [];
  const n = h('input', { type: 'range', min: 100, max: 2000, step: 100, value: 800, 'aria-label': 'Concurrent requests' });
  const nv = h('span', {}, '800');
  const meter = h('div', { class: 'meter' }, h('i'));
  const out = h('div', { class: 'log' }, 'Press run.');
  const mk = (isAtomic, text) => h('button', { class: 'btn', type: 'button', 'aria-pressed': String(atomic === isAtomic), onclick: () => { atomic = isAtomic; bs.forEach((b, i) => b.setAttribute('aria-pressed', String((i === 1) === atomic))); } }, text);
  const bs = [mk(false, 'Naive read, then write'), mk(true, 'Atomic Lua decrement')];
  const run = h('button', { class: 'btn solid', type: 'button' }, 'Run');

  const show = (st, total) => {
    meter.firstChild.style.setProperty('--w', (st.done / total) * 100 + '%');
    out.textContent = `requests     ${st.done}/${total}\nsold         ${st.sold}\nstock left   ${st.stock}\noversold     ${st.oversold}`;
  };
  n.addEventListener('input', () => { nv.textContent = n.value; });
  run.addEventListener('click', () => {
    timers.forEach(clearTimeout); timers = [];
    const total = +n.value;
    simulate(total, atomic).forEach((st, i) => timers.push(setTimeout(() => show(st, total), i * 140)));
  });

  host.append(h('div', { class: 'w-head' }, `Stock = ${STOCK}. Race the buyers.`),
    h('div', { class: 'range-label' }, h('span', {}, 'requests at once'), nv), n, h('div', { class: 'ctl' }, ...bs, run), meter, out,
    h('p', { class: 'w-note' }, 'Simulation of the failure mode, not a benchmark of the real system.'));
  return () => timers.forEach(clearTimeout);
}
