import { h } from '../../../src/lib/dom.js';

// Values from the ccml README status table.
export const KERNELS = [
  { name: 'matmul', err: 7.38e-6, label: 'scaled rel. 7.38e-06', speed: [0.12, 0.32] },
  { name: 'layernorm', err: 5.96e-8, label: 'rel. 5.96e-08', speed: [0.17, 0.46] },
  { name: 'softmax', err: 4.4e-8, label: 'abs. 4.40e-08', speed: [0.22, 0.52] },
];
const digits = (e) => -Math.log10(e);

export function mount(host) {
  let mode = 'accuracy';
  const body = h('div'), note = h('p', { class: 'note' });
  const mk = (id, text) => h('button', { class: 'btn', type: 'button', 'aria-pressed': String(mode === id), onclick: () => { mode = id; sync(); } }, text);
  const a = mk('accuracy', 'Accuracy'), s = mk('speed', 'Speed vs PyTorch');
  function sync() {
    a.setAttribute('aria-pressed', String(mode === 'accuracy')); s.setAttribute('aria-pressed', String(mode === 'speed'));
    body.replaceChildren(...KERNELS.map((k) => {
      const [lo, hi] = k.speed;
      const bar = mode === 'accuracy' ? { '--l': '0%', '--w': (digits(k.err) / 8) * 100 + '%' } : { '--l': lo * 100 + '%', '--w': (hi - lo) * 100 + '%' };
      return h('div', { class: 'bar' }, h('span', {}, k.name), h('div', { class: 'rng' }, h('i', { style: bar })), h('span', {}, mode === 'accuracy' ? k.label : `${lo}x to ${hi}x`));
    }));
    note.textContent = mode === 'accuracy' ? 'Longer bar = more digits of agreement with the references (max error, log scale).' : 'Throughput relative to PyTorch (full bar = parity). Below parity today; still tuning.';
  }
  host.append(h('h3', {}, 'Inspect a kernel'), h('div', { class: 'ctl' }, a, s), body, note);
  sync();
}

export async function run(_args, out) {
  out('kernel      max error             speed vs pytorch');
  KERNELS.forEach((k) => out(`${k.name.padEnd(11)} ${k.label.padEnd(21)} ${k.speed[0]}x to ${k.speed[1]}x`));
  out('validated against two independent references; still tuning for speed', 'muted');
}
