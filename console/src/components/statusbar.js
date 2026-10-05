import { h } from '../../../src/lib/dom.js';
import { byId } from '../data/files.js';
import * as store from '../lib/store.js';
import { about } from '../data/about.js';

export function mountStatus(host, app) {
  const file = h('span'), theme = h('button', { type: 'button', 'aria-label': 'Toggle theme', onclick: () => app.setTheme(store.get().theme === 'dark' ? 'light' : 'dark') });
  const dens = h('button', { type: 'button', 'aria-label': 'Toggle density', onclick: () => app.setDensity(store.get().density === 'compact' ? 'comfortable' : 'compact') });
  const term = h('button', { type: 'button', onclick: () => app.toggle('term') }, 'terminal');
  host.append(h('span', {}, 'main'), file, h('span', { class: 'sp' }), h('span', { class: 'muted' }, about.tagline), dens, theme, term);
  const draw = () => { const s = store.get(); file.textContent = byId(s.active).path; theme.textContent = s.theme; dens.textContent = s.density; };
  store.subscribe((_s, p) => { if ('active' in p || 'theme' in p || 'density' in p) draw(); });
  draw();
}
