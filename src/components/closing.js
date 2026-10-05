import { h } from '../lib/dom.js';

export function renderClosing(profile) {
  return h('section', { class: 'ch ch--close', id: 'contact', 'aria-label': 'Experience and contact' },
    h('h2', { class: 'ch__title' }, 'Where I have worked.'),
    h('div', { class: 'ch__text' },
      h('ul', { class: 'facts' }, profile.experience.map((e) => h('li', {}, h('b', {}, e.org), h('span', {}, e.what, h('br'), h('span', { class: 'mono', style: { fontSize: '0.75rem', opacity: 0.85 } }, e.stack))))),
      h('p', { style: { marginTop: 'var(--s-5)' } }, 'Open to hard problems in distributed systems, infra and AI products.'),
      h('div', { class: 'links' }, profile.links.map((l) => h('a', { href: l.href, target: '_blank', rel: 'noopener' }, `${l.label} →`)))));
}
