import { h, $ } from '../../src/lib/dom.js';
import * as store from './lib/store.js';
import { byId, files } from './data/files.js';
import { mountExplorer } from './components/explorer.js';
import { mountTabs } from './components/tabs.js';
import { mountEditor } from './components/editor.js';
import { mountTerminal } from './components/terminal.js';
import { mountStatus } from './components/statusbar.js';
import { mountPalette } from './components/palette.js';
import { attachResize } from './components/resize.js';
import { boot } from './components/boot.js';

const app = { print() {}, exec() {}, clearTerm() {} };
const root = $('#app');

/* ---- skeleton ---- */
const explorer = h('aside', { class: 'explorer', 'aria-label': 'Explorer' });
const tabs = h('div', { class: 'tabs' });
const pane = h('main', { class: 'pane', id: 'pane', role: 'tabpanel', tabindex: 0 });
const inspector = h('aside', { class: 'inspector', 'aria-label': 'Inspector' });
const s1 = h('div', { class: 'sep s1', 'aria-label': 'Resize explorer' });
const s2 = h('div', { class: 'sep s2', 'aria-label': 'Resize inspector' });
const sRow = h('div', { class: 'sep row', 'aria-label': 'Resize terminal' });
const termHost = h('div');
const termwrap = h('div', { class: 'termwrap' }, sRow, termHost);
const work = h('div', { class: 'work' }, explorer, s1, h('div', { class: 'editor' }, tabs, pane), s2, inspector);
const status = h('footer', { class: 'status' });
const menu = h('button', { class: 'btn only-m', type: 'button', 'aria-label': 'Toggle explorer drawer', onclick: () => root.classList.toggle('drawer-open') }, 'files');
const topbar = h('header', { class: 'topbar' }, menu, h('b', {}, 'siddhesh.dev'), h('span', { class: 'muted hide-m' }, '~/portfolio'), h('span', { class: 'sp' }),
  h('button', { class: 'btn nw', type: 'button', onclick: () => palette.show('files') }, 'Open'),
  h('button', { class: 'btn nw', type: 'button', onclick: () => palette.show('commands') }, 'Commands'));
root.replaceChildren(topbar, work, termwrap, status);

/* ---- view state ---- */
function applyView() {
  const s = store.get();
  document.documentElement.dataset.theme = s.theme;
  document.documentElement.dataset.density = s.density;
  document.querySelector('meta[name="theme-color"]').content = s.theme === 'dark' ? '#0e1319' : '#f4f6f8';
  work.classList.toggle('no-exp', !s.exp);
  work.classList.toggle('no-ins', !s.ins);
  termwrap.classList.toggle('hidden', !s.term);
  work.style.setProperty('--w-exp', s.wExp + 'px');
  work.style.setProperty('--w-ins', s.wIns + 'px');
  termwrap.style.setProperty('--h-term', s.hTerm + 'px');
  document.title = `${byId(s.active).name} · Siddhesh Chaudhari`;
}
store.subscribe(applyView);

/* ---- app API ---- */
Object.assign(app, {
  get: store.get,
  open(id) {
    if (!byId(id)) return;
    const s = store.get();
    store.set({ tabs: s.tabs.includes(id) ? s.tabs : [...s.tabs, id], active: id });
    history.replaceState(null, '', `#/${id}`);
    root.classList.remove('drawer-open');
  },
  close(id) {
    const s = store.get(), i = s.tabs.indexOf(id);
    if (i < 0) return;
    let tabsLeft = s.tabs.filter((t) => t !== id);
    if (!tabsLeft.length) tabsLeft = ['readme'];
    const next = s.active === id ? tabsLeft[Math.min(i, tabsLeft.length - 1)] : s.active;
    store.set({ tabs: tabsLeft, active: next });
    history.replaceState(null, '', `#/${next}`);
  },
  closeActive() { app.close(store.get().active); },
  setTheme(theme) { store.set({ theme }); },
  setDensity(density) { store.set({ density }); },
  toggle(key) { store.set({ [key]: !store.get()[key] }); if (key === 'term' && store.get().term) term.focus(); },
  show(key) { if (!store.get()[key]) store.set({ [key]: true }); if (key === 'term') term.focus(); },
});

/* ---- mount ---- */
const explorerApi = mountExplorer(explorer, app);
mountTabs(tabs, app);
mountEditor(pane, inspector, app);
const term = mountTerminal(termHost, app);
mountStatus(status, app);
const palette = mountPalette(app);
attachResize(s1, { key: 'wExp', min: 160, max: 420, apply: (v) => work.style.setProperty('--w-exp', v + 'px') });
attachResize(s2, { key: 'wIns', min: 240, max: 520, invert: true, apply: (v) => work.style.setProperty('--w-ins', v + 'px') });
attachResize(sRow, { key: 'hTerm', min: 100, max: () => innerHeight * 0.5, axis: 'y', invert: true, apply: (v) => termwrap.style.setProperty('--h-term', v + 'px') });

/* ---- deep link ---- */
const fromHash = location.hash.replace(/^#\/?/, '');
if (fromHash && byId(fromHash)) app.open(fromHash);
applyView();

/* ---- keyboard ---- */
addEventListener('keydown', (e) => {
  const mod = e.ctrlKey || e.metaKey, k = e.key.toLowerCase();
  if (e.key === 'Escape' && palette.isOpen()) { palette.hide(); return; }
  if (mod && k === 'p' && !e.shiftKey) { e.preventDefault(); palette.show('files'); }
  else if (mod && (k === 'k' || (k === 'p' && e.shiftKey))) { e.preventDefault(); palette.show('commands'); }
  else if (mod && k === 'b') { e.preventDefault(); app.toggle('exp'); }
  else if (mod && (e.key === '`' || k === 'j')) { e.preventDefault(); app.toggle('term'); }
  else if (e.altKey && k === 'w') { e.preventDefault(); app.closeActive(); }
  else if (e.altKey && /^[1-9]$/.test(e.key)) { const id = store.get().tabs[+e.key - 1]; if (id) { e.preventDefault(); app.open(id); } }
  else if (e.altKey && k === 'e') { e.preventDefault(); explorerApi.focus(); }
});

boot();
