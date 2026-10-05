import { h } from '../lib/dom.js';

const hex = (b) => [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');

/** Illustration only: SHA-256 expansion stands in for opaque ciphertext. This is NOT encryption. */
export async function opaque(text) {
  const enc = new TextEncoder();
  let buf = await crypto.subtle.digest('SHA-256', enc.encode(text + '|whispr-illustration'));
  let out = hex(buf);
  buf = await crypto.subtle.digest('SHA-256', buf);
  return (out + hex(buf)).slice(0, Math.max(32, text.length * 2 + 16));
}

export function mount(host) {
  const input = h('input', { class: 'field', type: 'text', value: 'hello from pune', maxlength: 80, 'aria-label': 'Message to send' });
  const names = ['Client A', 'Go relay', 'PostgreSQL', 'Client B'];
  const vals = names.map(() => h('span'));
  const rows = h('div', { class: 'kv' }, names.flatMap((n, i) => [h('span', {}, n), vals[i]]));
  const stepBtn = h('button', { class: 'btn go', type: 'button' }, 'Send step by step');
  let timers = [];

  async function update(step = 4) {
    const msg = input.value || '(empty)', bytes = await opaque(msg);
    vals[0].textContent = `${msg}  (plaintext, encrypts on device)`;
    vals[1].textContent = step >= 2 ? bytes : '...';
    vals[2].textContent = step >= 3 ? bytes : '...';
    vals[3].textContent = step >= 4 ? `${msg}  (decrypted on device)` : '...';
  }
  input.addEventListener('input', () => update());
  stepBtn.addEventListener('click', () => { timers.forEach(clearTimeout); timers = [1, 2, 3, 4].map((n) => setTimeout(() => update(n), (n - 1) * 600)); });

  host.append(h('h3', {}, 'Message path'), input, rows, h('div', { class: 'ctl' }, stepBtn),
    h('p', { class: 'note' }, 'Illustration: relay and database rows show derived opaque bytes, not real libsignal ciphertext.'));
  update();
  return () => timers.forEach(clearTimeout);
}

export async function run(args, out) {
  const msg = args.join(' ') || 'hello from pune';
  const bytes = await opaque(msg);
  out('client a   ' + msg + '  (plaintext, encrypts on device)');
  out('go relay   ' + bytes);
  out('postgresql ' + bytes);
  out('client b   ' + msg + '  (decrypted on device)');
  out('illustration: derived opaque bytes, not real libsignal ciphertext', 'muted');
}
