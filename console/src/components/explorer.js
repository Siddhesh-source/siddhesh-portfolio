import { h } from '../../../src/lib/dom.js';
import { files, DIRS } from '../data/files.js';
import * as store from '../lib/store.js';

/** File tree. Arrow keys or j/k move, Enter opens, Left/Right collapse and expand folders. */
export function mountExplorer(host, app) {
  const root = h('ul', { class: 'tree', role: 'tree', 'aria-label': 'Files' });
  host.append(h('div', { class: 'tree-h' }, 'Explorer'), root);

  function draw() {
    const s = store.get(), items = [];
    const file = (f, depth) => h('li', { class: 'file', role: 'treeitem', tabindex: -1, 'data-id': f.id, 'aria-current': String(s.active === f.id), style: { '--depth': depth } }, h('i'), f.name);
    items.push(h('li', { class: 'dir', role: 'treeitem', tabindex: -1, 'aria-expanded': 'true', style: { '--depth': 0, cursor: 'default' } }, 'portfolio'));
    files.filter((f) => !f.dir).forEach((f) => items.push(file(f, 1)));
    for (const dir of DIRS) {
      const open = s.dirs[dir] !== false;
      items.push(h('li', { class: 'dir', role: 'treeitem', tabindex: -1, 'data-dir': dir, 'aria-expanded': String(open), style: { '--depth': 1 } }, dir));
      if (open) files.filter((f) => f.dir === dir).forEach((f) => items.push(file(f, 2)));
    }
    root.replaceChildren(...items);
  }

  root.addEventListener('click', (e) => {
    const li = e.target.closest('li'); if (!li) return;
    if (li.dataset.dir) store.set({ dirs: { ...store.get().dirs, [li.dataset.dir]: li.getAttribute('aria-expanded') !== 'true' } });
    else if (li.dataset.id) app.open(li.dataset.id);
  });
  root.addEventListener('keydown', (e) => {
    const li = e.target.closest('li'); if (!li) return;
    const all = [...root.querySelectorAll('li')], i = all.indexOf(li);
    const move = (n) => { const t = all[Math.max(0, Math.min(all.length - 1, n))]; t.focus(); };
    if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); move(i + 1); }
    else if (e.key === 'ArrowUp' || e.key === 'k') { e.preventDefault(); move(i - 1); }
    else if (e.key === 'Home') { e.preventDefault(); move(0); }
    else if (e.key === 'End') { e.preventDefault(); move(all.length - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); li.click(); }
    else if (e.key === 'ArrowLeft' && li.dataset.dir) store.set({ dirs: { ...store.get().dirs, [li.dataset.dir]: false } });
    else if (e.key === 'ArrowRight' && li.dataset.dir) store.set({ dirs: { ...store.get().dirs, [li.dataset.dir]: true } });
  });
  store.subscribe((_s, patch) => { if ('active' in patch || 'dirs' in patch) { const had = document.activeElement?.dataset?.id; draw(); if (had) root.querySelector(`[data-id="${had}"]`)?.focus(); } });
  draw();
  return { focus: () => (root.querySelector('[aria-current="true"]') || root.querySelector('.file')).focus() };
}
