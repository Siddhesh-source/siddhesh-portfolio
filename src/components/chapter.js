import { h } from '../lib/dom.js';
import { createDiagram } from './diagram.js';
import { widgets } from '../widgets/index.js';

/** Renders one project chapter: headline, numeral, text, and a tabbed live panel (widget | diagram). */
export function renderChapter(p) {
  const widgetPane = h('div', { class: 'pane', id: `${p.id}-widget`, role: 'tabpanel', 'aria-labelledby': `${p.id}-t1` });
  const diagramPane = h('div', { class: 'pane', id: `${p.id}-diagram`, role: 'tabpanel', 'aria-labelledby': `${p.id}-t2`, hidden: true });
  const tab = (id, label, pane, selected) => h('button', { id, role: 'tab', type: 'button', 'aria-selected': String(selected), 'aria-controls': pane.id }, label);
  const t1 = tab(`${p.id}-t1`, 'Try it', widgetPane, true);
  const t2 = tab(`${p.id}-t2`, 'Architecture', diagramPane, false);
  const select = (which) => {
    t1.setAttribute('aria-selected', String(which === 1)); t2.setAttribute('aria-selected', String(which === 2));
    widgetPane.hidden = which !== 1; diagramPane.hidden = which !== 2;
  };
  t1.addEventListener('click', () => select(1));
  t2.addEventListener('click', () => select(2));

  const section = h('section', { class: `ch ch--${p.theme}`, id: p.id, 'aria-label': p.name },
    h('h2', { class: 'ch__title' }, p.title),
    h('div', { class: 'ch__text' },
      h('div', { class: 'ch__num' }, p.numeral),
      h('p', { class: 'ch__cap' }, p.caption),
      p.text.map((t) => h('p', {}, t)),
      h('ul', { class: 'ch__tags', 'aria-label': 'Stack' }, p.stack.map((s) => h('li', {}, s))),
      h('a', { class: 'ch__link', href: p.link.href, target: '_blank', rel: 'noopener' }, `${p.link.label} ↗`)),
    h('div', { class: 'ch__panel' }, h('div', { class: 'panel' }, h('div', { class: 'tabs', role: 'tablist' }, t1, t2), widgetPane, diagramPane)));

  // Widgets and diagrams mount lazily when the chapter nears the viewport.
  const io = new IntersectionObserver(async (entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    try { (await widgets[p.id]()).mount(widgetPane); } catch (err) { widgetPane.textContent = 'Widget failed to load.'; console.error(err); }
    diagramPane.append(createDiagram(p.diagram).el);
  }, { rootMargin: '600px 0px' });
  io.observe(section);
  return section;
}
