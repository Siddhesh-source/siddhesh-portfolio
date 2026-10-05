import { h } from '../lib/dom.js';

export function renderClosing(profile) {
  return h('section', { class: 'ch ch--close', id: 'contact', 'aria-label': 'Experience and contact' },
    h('h2', { class: 'ch__title' }, 'Where I have worked.'),
    h('div', { class: 'ch__text' },
      h('ul', { class: 'facts' }, profile.experience.map((e) => h('li', {}, h('b', {}, e.org), h('span', {}, e.what, h('br'), h('span', { class: 'mono', style: { fontSize: '0.75rem', opacity: 0.85 } }, e.stack))))),
      h('p', { style: { marginTop: 'var(--s-4)' } }, ...profile.education.map((e) => `${e.school}, ${e.years}.`)),
      h('p', { style: { marginTop: 'var(--s-3)' } }, 'Open to SDE roles, and SDE-leaning AI, ML and infra roles.'),
      h('div', { class: 'links' }, h('a', { href: `mailto:${profile.email}` }, 'Email →'), profile.links.map((l) => h('a', { href: l.href, target: '_blank', rel: 'noopener' }, `${l.label} →`)))));
}
