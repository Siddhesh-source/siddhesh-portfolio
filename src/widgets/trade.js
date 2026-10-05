import { h } from '../lib/dom.js';

// Three streams per the README; weights here are illustrative, not the production values.
const STREAMS = [
  { id: 'sentiment', weight: 0.4, value: 0.6 },
  { id: 'technicals', weight: 0.4, value: 0.7 },
  { id: 'regime', weight: 0.2, value: 0.4 },
];

export function composite(streams) {
  return streams.reduce((a, x) => a + x.value * x.weight, 0);
}

export function mount(host) {
  const st = STREAMS.map((x) => ({ ...x }));
  const meter = h('div', { class: 'meter' }, h('i'));
  const score = h('div', { class: 'ch__num', style: { fontSize: '3rem' } });
  const why = h('div', { class: 'log', style: { minHeight: '3.5rem' }, 'aria-live': 'polite' });

  const draw = () => {
    const c = composite(st);
    score.textContent = c.toFixed(2);
    meter.firstChild.style.setProperty('--w', c * 100 + '%');
    why.textContent = 'rationale: ' + st.map((x) => `${x.id} ${x.value.toFixed(2)} x ${x.weight}`).join(' + ');
  };
  const rows = st.map((x) => {
    const v = h('span', {}, x.value.toFixed(2));
    const r = h('input', { type: 'range', min: 0, max: 100, value: x.value * 100, 'aria-label': `${x.id} signal` });
    r.addEventListener('input', () => { x.value = r.value / 100; v.textContent = x.value.toFixed(2); draw(); });
    return h('div', {}, h('div', { class: 'range-label' }, h('span', {}, x.id), v), r);
  });

  host.append(h('div', { class: 'w-head' }, 'Weight the signals'), ...rows, h('div', { class: 'w-head' }, 'Composite score'), score, meter, why,
    h('p', { class: 'w-note' }, 'Illustrative weights. The real engine fuses the same three streams and explains each decision.'));
  draw();
}
