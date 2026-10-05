import { h } from '../lib/dom.js';
import { byId } from '../data/files.js';
import * as store from '../lib/store.js';

/** Tab strip. Click selects, x or middle-click closes. */
export function mountTabs(host, app) {
  host.setAttribute('role', 'tablist');
  function draw() {
    const s = store.get();
    host.replaceChildren(...s.tabs.map((id, i) => {
      const f = byId(id);
      return h('div', { class: 'tab', role: 'tab', id: `tab-${id}`, tabindex: s.active === id ? 0 : -1, 'aria-selected': String(s.active === id), 'data-id': id, title: `${f.path}  (Alt ${i + 1})` },
        h('span', {}, f.name),
        h('button', { class: 'x', type: 'button', 'aria-label': `Close ${f.name}`, 'data-close': id, tabindex: -1 }, '×'));
    }));
    host.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  host.addEventListener('click', (e) => {
    const x = e.target.closest('[data-close]'); if (x) return app.close(x.dataset.close);
    const t = e.target.closest('.tab'); if (t) app.open(t.dataset.id);
  });
  host.addEventListener('auxclick', (e) => { const t = e.target.closest('.tab'); if (e.button === 1 && t) app.close(t.dataset.id); });
  host.addEventListener('keydown', (e) => {
    const s = store.get(), i = s.tabs.indexOf(s.active);
    if (e.key === 'ArrowRight') { app.open(s.tabs[(i + 1) % s.tabs.length]); host.querySelector('[aria-selected="true"]').focus(); }
    else if (e.key === 'ArrowLeft') { app.open(s.tabs[(i + s.tabs.length - 1) % s.tabs.length]); host.querySelector('[aria-selected="true"]').focus(); }
  });
  store.subscribe((_s, p) => { if ('tabs' in p || 'active' in p) draw(); });
  draw();
}
