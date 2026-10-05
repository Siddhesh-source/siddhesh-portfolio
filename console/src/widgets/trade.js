import { h } from '../../../src/lib/dom.js';
import { composite } from '../../../src/widgets/trade.js';

// Three streams per the README; weights are illustrative, not production values.
const STREAMS = [{ id: 'sentiment', weight: 0.4, value: 0.6 }, { id: 'technicals', weight: 0.4, value: 0.7 }, { id: 'regime', weight: 0.2, value: 0.4 }];
const why = (st) => 'rationale: ' + st.map((x) => `${x.id} ${x.value.toFixed(2)} x ${x.weight}`).join(' + ');

export function mount(host) {
  const st = STREAMS.map((x) => ({ ...x }));
  const meter = h('div', { class: 'meter' }, h('i'));
  const score = h('div', { class: 'big-num' });
  const text = h('div', { class: 'log', 'aria-live': 'polite', style: { minHeight: '3em' } });
  const draw = () => { const c = composite(st); score.textContent = c.toFixed(2); meter.firstChild.style.setProperty('--w', c * 100 + '%'); text.textContent = why(st); };
  const rows = st.map((x) => {
    const v = h('span', { class: 'acc' }, x.value.toFixed(2));
    const r = h('input', { type: 'range', min: 0, max: 100, value: x.value * 100, 'aria-label': `${x.id} signal` });
    r.addEventListener('input', () => { x.value = r.value / 100; v.textContent = x.value.toFixed(2); draw(); });
    return h('div', {}, h('div', { class: 'rl' }, h('span', {}, x.id), v), r);
  });
  host.append(h('h3', {}, 'Weight the signals'), ...rows, h('h3', { style: { marginTop: '12px' } }, 'Composite score'), score, meter, text,
    h('p', { class: 'note' }, 'Illustrative weights. The real engine fuses the same three streams and explains each decision.'));
  draw();
}

export async function run(args, out) {
  const vals = args.map(Number).filter((x) => !Number.isNaN(x));
  const st = STREAMS.map((x, i) => ({ ...x, value: Math.min(1, Math.max(0, vals[i] ?? x.value)) }));
  out(`score ${composite(st).toFixed(2)}`, 'ok');
  out(why(st), 'muted');
  out('usage: run trade <sentiment> <technicals> <regime>   values 0 to 1', 'muted');
}
