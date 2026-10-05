import { h } from '../lib/dom.js';

// Illustrative only: SHA-256 expansion stands in for opaque ciphertext. This is NOT encryption.
async function opaque(text) {
  const enc = new TextEncoder();
  let buf = await crypto.subtle.digest('SHA-256', enc.encode(text + '|whispr-illustration'));
  let out = hex(buf);
  buf = await crypto.subtle.digest('SHA-256', buf);
  out += hex(buf);
  return out.slice(0, Math.max(32, text.length * 2 + 16));
}
const hex = (b) => [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');

export function mount(host) {
  const input = h('input', { class: 'field', type: 'text', value: 'hello from pune', 'aria-label': 'Message to send', maxlength: 80 });
  const rows = ['Client A', 'Go relay', 'PostgreSQL', 'Client B'].map((k) => ({ k, v: h('span') }));
  const list = h('div', {}, rows.map((r) => h('div', { class: 'w-row' }, h('b', {}, r.k), r.v)));
  const stepBtn = h('button', { class: 'btn', type: 'button' }, 'Send step by step');
  let timers = [];

  async function update(step = 4) {
    const msg = input.value || '(empty)';
    const bytes = await opaque(msg);
    rows[0].v.textContent = msg + '  (plaintext, encrypts on device)';
    rows[1].v.textContent = step >= 2 ? bytes : '…';
    rows[2].v.textContent = step >= 3 ? bytes : '…';
    rows[3].v.textContent = step >= 4 ? msg + '  (decrypted on device)' : '…';
  }
  input.addEventListener('input', () => update());
  stepBtn.addEventListener('click', () => {
    timers.forEach(clearTimeout); timers = [];
    [1, 2, 3, 4].forEach((n) => timers.push(setTimeout(() => update(n), (n - 1) * 650)));
  });

  host.append(h('div', { class: 'w-head' }, 'Type a message, see who holds what'), input, list, h('div', { class: 'ctl' }, stepBtn),
    h('p', { class: 'w-note' }, 'Illustration: the relay and database rows show derived opaque bytes, not real libsignal ciphertext.'));
  update();
  return () => timers.forEach(clearTimeout);
}
