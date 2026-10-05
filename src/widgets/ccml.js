import { h } from '../lib/dom.js';

// Values from the ccml README status table.
const KERNELS = [
  { name: 'matmul', err: 7.38e-6, errLabel: 'scaled rel. 7.38e-06', speed: [0.12, 0.32] },
  { name: 'layernorm', err: 5.96e-8, errLabel: 'rel. 5.96e-08', speed: [0.17, 0.46] },
  { name: 'softmax', err: 4.4e-8, errLabel: 'abs. 4.40e-08', speed: [0.22, 0.52] },
];
const digits = (e) => -Math.log10(e); // longer bar = more digits of agreement

export function mount(host) {
  let mode = 'accuracy';
  const body = h('div');
  const note = h('p', { class: 'w-note' });
  const mk = (id, text) => h('button', { class: 'btn', type: 'button', 'aria-pressed': String(mode === id), 'data-mode': id, onclick: () => { mode = id; sync(); } }, text);
  const bAcc = mk('accuracy', 'Accuracy');
  const bSpd = mk('speed', 'Speed vs PyTorch');

  function sync() {
    bAcc.setAttribute('aria-pressed', String(mode === 'accuracy'));
    bSpd.setAttribute('aria-pressed', String(mode === 'speed'));
    body.replaceChildren(...KERNELS.map((k) => {
      if (mode === 'accuracy') {
        const w = (digits(k.err) / 8) * 100;
        return h('div', { class: 'bar' }, h('span', {}, k.name), h('div', { class: 'rng' }, h('i', { style: { '--l': '0%', '--w': w + '%' } })), h('span', {}, k.errLabel));
      }
      const [lo, hi] = k.speed;
      return h('div', { class: 'bar' }, h('span', {}, k.name), h('div', { class: 'rng' }, h('i', { style: { '--l': lo * 100 + '%', '--w': (hi - lo) * 100 + '%' } })), h('span', {}, `${lo}x to ${hi}x`));
    }));
    note.textContent = mode === 'accuracy'
      ? 'Longer bar = more digits of agreement with the references (max error, log scale).'
      : 'ccml throughput relative to PyTorch (full bar = parity). Below parity today; still tuning.';
  }

  host.append(h('div', { class: 'w-head' }, 'Inspect a kernel'), h('div', { class: 'ctl' }, bAcc, bSpd), body, note);
  sync();
}
