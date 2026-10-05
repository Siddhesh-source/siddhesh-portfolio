import { h } from '../lib/dom.js';

/** Ctrl/Cmd+K command palette. commands: [{label, kind, run}] */
export function mountPalette(commands) {
  const input = h('input', { class: 'palette__in', type: 'text', placeholder: 'Jump to a chapter or link', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Search commands' });
  const list = h('ul', { class: 'palette__list', role: 'listbox' });
  const root = h('div', { class: 'palette', hidden: true }, h('div', { class: 'palette__box', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Command palette' }, input, list));
  document.body.append(root, h('div', { class: 'hint' }, h('kbd', {}, 'Ctrl K'), ' commands · ', h('kbd', {}, 'j'), ' ', h('kbd', {}, 'k'), ' chapters'));

  let shown = [], sel = 0, opener = null;
  const draw = () => {
    list.replaceChildren(...(shown.length ? shown.map((c, i) => h('li', { role: 'option', 'aria-selected': String(i === sel), onclick: () => run(i) }, c.label, h('span', {}, c.kind))) : [h('li', {}, h('span', {}, 'No matches'))]));
  };
  const filter = () => { const q = input.value.trim().toLowerCase(); shown = commands.filter((c) => c.label.toLowerCase().includes(q)); sel = 0; draw(); };
  const open = () => { opener = document.activeElement; root.hidden = false; input.value = ''; filter(); input.focus(); };
  const close = () => { root.hidden = true; if (opener) opener.focus(); };
  const run = (i) => { const c = shown[i]; if (c) { close(); c.run(); } };

  root.addEventListener('click', (e) => { if (e.target === root) close(); });
  input.addEventListener('input', filter);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, shown.length - 1); draw(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); draw(); e.preventDefault(); }
    else if (e.key === 'Enter') run(sel);
  });
  addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); root.hidden ? open() : close(); }
    else if (e.key === 'Escape' && !root.hidden) close();
  });
}
