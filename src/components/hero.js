import { h } from '../lib/dom.js';

export function renderHero(profile, projects) {
  return h('section', { class: 'ch ch--hero', id: 'top', 'aria-label': 'Introduction' },
    h('h1', { class: 'ch__title' }, profile.title),
    h('div', { class: 'ch__text' },
      h('p', {}, profile.lede),
      h('div', { class: 'links', style: { fontSize: '1.125rem', fontFamily: 'var(--body)', fontWeight: 600, letterSpacing: 0 } },
        profile.links.map((l) => h('a', { href: l.href, target: '_blank', rel: 'noopener' }, l.label)))),
    h('nav', { class: 'ch__panel', 'aria-label': 'Projects' },
      h('ul', { class: 'index' }, projects.map((p) =>
        h('li', {}, h('a', { href: `#${p.id}` }, h('b', {}, p.name), h('span', {}, p.short)))))));
}
