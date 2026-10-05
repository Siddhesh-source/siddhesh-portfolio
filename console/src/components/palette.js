import { h } from '../../../src/lib/dom.js';
import { files } from '../data/files.js';
import { paletteItems } from '../commands.js';
import { rank } from '../lib/fuzzy.js';

/** Ctrl P: quick open (files). Ctrl K: commands. Same component, two item sources. */
export function mountPalette(app) {
  const input = h('input', { class: 'pin', type: 'text', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Search' });
  const list = h('ul', { class: 'plist', role: 'listbox' });
  const root = h('div', { class: 'palette', hidden: true }, h('div', { class: 'pbox', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Palette' }, input, list));
  document.body.append(root);

  let mode = 'files', items = [], shown = [], sel = 0, opener = null;
  const source = () => (mode === 'files'
    ? files.map((f) => ({ label: f.path, kind: 'file', run: () => app.open(f.id) }))
    : paletteItems(app));
  const draw = () => list.replaceChildren(...(shown.length
    ? shown.map((c, i) => h('li', { role: 'option', 'aria-selected': String(i === sel), onclick: () => run(i) }, c.label, h('span', {}, c.kind)))
    : [h('li', {}, h('span', {}, 'no matches'))]));
  const filter = () => { const q = input.value.trim(); shown = q ? rank(q, items, (c) => c.label) : items; sel = 0; draw(); };
  const run = (i) => { const c = shown[i]; if (c) { hide(); c.run(); } };
  function show(m) { mode = m; opener = document.activeElement; items = source(); input.placeholder = m === 'files' ? 'Open file by name' : 'Run a command'; input.value = ''; root.hidden = false; filter(); input.focus(); }
  function hide() { root.hidden = true; opener?.focus?.(); }

  root.addEventListener('click', (e) => { if (e.target === root) hide(); });
  input.addEventListener('input', filter);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, shown.length - 1); draw(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); draw(); e.preventDefault(); }
    else if (e.key === 'Enter') run(sel);
  });
  return { show, hide, isOpen: () => !root.hidden };
}
