import { h } from '../lib/dom.js';
import { projects, profile } from '../data/files.js';
import { about } from '../data/about.js';
import { skills, AREAS, WORK, findSkills } from '../data/skills.js';
import { archive, KINDS } from '../data/archive.js';
import { fundamentals, now } from '../data/learning.js';

const chip = (text, props = {}) => h('button', { class: 'btn', type: 'button', ...props }, text);
const link = (href, text) => h('a', { href, target: '_blank', rel: 'noopener' }, text);
const kv = (rows) => h('div', { class: 'kv' }, rows.flatMap(([k, v]) => [h('span', {}, k), v instanceof Node ? v : h('span', {}, v)]));
const put = (host, ...nodes) => host.append(...nodes.flat().filter(Boolean));
const head = (title, sub) => [h('h1', {}, title), sub ? h('div', { class: 'num' }, sub) : null];

/** Names for every evidence id: featured projects, archive, and work. */
export const evidenceName = (id) => projects.find((p) => p.id === id)?.name || archive.find((a) => a.id === id)?.name || WORK[id]?.name || id;
const evidenceIds = () => [...projects.map((p) => p.id), ...archive.map((a) => a.id), 'rink9', 'taxbharo', 'dsa'];

/* ---------------- about.md ---------------- */
export function aboutView(host, app) {
  const langs = skills.filter((s) => s.area === 'Languages').length;
  const total = projects.length + archive.length;
  const cmd = (c) => h('button', { class: 'sug', type: 'button', onclick: () => app.exec(c) }, c);
  put(host, 
    ...head(about.headline, `${about.location}  ·  ${about.tagline}`),
    ...about.summary.map((t) => h('p', { style: { marginTop: '8px' } }, t)),
    h('div', { class: 'grid' },
      h('div', { class: 'box' }, h('h3', {}, 'Range, depth, fundamentals'), kv(about.focus)),
      h('div', { class: 'box' }, h('h3', {}, 'Overview'),
        kv([['projects', `${total} (${projects.length} featured, ${archive.length} more)`], ['languages', String(langs)], ['skills', String(skills.length)], ['experience', `${profile.experience.length} roles`]]))),
    h('div', { class: 'grid c3' },
      h('div', { class: 'box' }, h('h3', {}, 'Skills'), h('p', {}, 'Each skill with the projects that prove it.'), cmd('open skills.yaml')),
      h('div', { class: 'box' }, h('h3', {}, 'Fundamentals'), h('p', {}, 'DBMS, networks, OS, DSA, and where each shows up.'), cmd('open fundamentals.md')),
      h('div', { class: 'box' }, h('h3', {}, 'More work'), h('p', {}, `${archive.length} other projects from GitHub.`), cmd('open more.md'))),
    about.education.length ? h('div', { class: 'box', style: { marginTop: '12px' } }, h('h3', {}, 'Education'), ...about.education.map(([school, years]) => h('p', { style: { marginTop: 0 } }, `${school}, ${years}`))) : null);
}

/* ---------------- skills.yaml ---------------- */
export function skillsView(host, app) {
  let area = 'All', query = '', sel = null; // sel: {type:'skill'|'project', id}
  const search = h('input', { class: 'field', type: 'search', placeholder: 'Filter skills', 'aria-label': 'Filter skills', style: { marginBottom: '0', maxWidth: '260px' } });
  const areaBtns = ['All', ...AREAS].map((a) => chip(a, { 'aria-pressed': String(a === area), onclick: () => { area = a; draw(); } }));
  const groups = h('div'), evidence = h('div', { class: 'box' });
  const top = h('div', { class: 'ctl' }, search, ...areaBtns);

  const usedBy = (s) => s.used;
  const isHit = (s) => sel?.type === 'project' && s.used.includes(sel.id);
  const isSel = (s) => sel?.type === 'skill' && sel.id === s.name;

  function draw() {
    areaBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.textContent === area)));
    const matches = new Set(findSkills(query));
    groups.replaceChildren(...AREAS.filter((a) => area === 'All' || a === area).map((a) => {
      const list = skills.filter((s) => s.area === a && matches.has(s));
      if (!list.length) return null;
      return h('div', { class: 'box', style: { marginBottom: '8px' } }, h('h3', {}, `${a}  ${list.length}`),
        h('div', { class: 'chips' }, list.map((s) => h('li', { style: { listStyle: 'none' } },
          h('button', { class: `sk${isHit(s) ? ' hit' : ''}${sel?.type === 'project' && !isHit(s) ? ' dim' : ''}`, type: 'button', 'aria-pressed': String(isSel(s)), onclick: () => { sel = { type: 'skill', id: s.name }; draw(); } },
            s.name, usedBy(s).length ? '' : ' *')))));
    }));
    evidence.replaceChildren(...(() => {
      if (!sel) return [h('h3', {}, 'Evidence'), h('p', { class: 'note', style: { marginTop: 0 } }, 'Pick a skill for its projects, or a project for its skills. * = self-reported, no public repo shows it yet.')];
      if (sel.type === 'skill') {
        const s = skills.find((x) => x.name === sel.id);
        return [h('h3', {}, s.name), s.used.length
          ? h('div', { class: 'kv', style: { gridTemplateColumns: '1fr' } }, s.used.map((id) => projectButton(id)))
          : h('p', { class: 'note', style: { marginTop: 0 } }, 'Self-reported: no public repo shows it yet.')];
      }
      const used = skills.filter((s) => s.used.includes(sel.id));
      return [h('h3', {}, `${evidenceName(sel.id)}  ${used.length} skills`), h('div', { class: 'chips' }, used.map((s) => h('li', {}, s.name)))];
    })());
    plist.replaceChildren(...evidenceIds().map((id) => h('button', { class: 'sk', type: 'button', 'aria-pressed': String(sel?.type === 'project' && sel.id === id), onclick: () => { sel = { type: 'project', id }; draw(); } }, evidenceName(id))));
  }
  const projectButton = (id) => {
    const featured = projects.find((p) => p.id === id);
    return featured
      ? h('button', { class: 'sug', type: 'button', onclick: () => app.open(id) }, `${featured.name}  (open)`)
      : h('span', {}, evidenceName(id));
  };
  const plist = h('div', { class: 'chips' });
  search.addEventListener('input', () => { query = search.value; draw(); });
  put(host, ...head('skills.yaml', `${skills.length} skills across ${AREAS.length} areas, each tied to evidence`), top,
    h('div', { class: 'grid' }, groups, h('div', {}, evidence, h('div', { class: 'box', style: { marginTop: '8px' } }, h('h3', {}, 'By project'), plist))));
  draw();
}

/* ---------------- more.md ---------------- */
export function moreView(host) {
  let kind = 'All', sort = 'newest';
  const list = h('div');
  const kinds = ['All', ...KINDS].map((k) => chip(k, { 'aria-pressed': String(k === kind), onclick: () => { kind = k; draw(); } }));
  const sorts = ['newest', 'name'].map((s) => chip(s, { 'aria-pressed': String(s === sort), onclick: () => { sort = s; draw(); } }));
  function draw() {
    kinds.forEach((b) => b.setAttribute('aria-pressed', String(b.textContent === kind)));
    sorts.forEach((b) => b.setAttribute('aria-pressed', String(b.textContent === sort)));
    const rows = archive.filter((a) => kind === 'All' || a.kind === kind).sort((a, b) => (sort === 'name' ? a.name.localeCompare(b.name) : b.year - a.year || a.name.localeCompare(b.name)));
    list.replaceChildren(...rows.map((a) => h('div', { class: 'box', style: { marginBottom: '8px' } },
      h('div', { class: 'row' }, h('b', {}, link(a.href, a.name + ' ↗')), h('span', { class: 'muted' }, `${a.kind} · ${a.year}${a.note ? ' · ' + a.note : ''}`)),
      h('p', { style: { marginTop: '4px' } }, a.desc),
      h('ul', { class: 'chips' }, a.stack.map((s) => h('li', {}, s))))));
  }
  put(host, ...head('more.md', `${archive.length} more projects on GitHub, beyond the six featured`),
    h('div', { class: 'ctl' }, ...kinds), h('div', { class: 'ctl' }, h('span', { class: 'muted' }, 'sort'), ...sorts), list,
    h('p', { class: 'note' }, 'Public repositories only, each checked against its README.'));
  draw();
}

/* ---------------- fundamentals.md ---------------- */
export function fundamentalsView(host, app) {
  const cards = fundamentals.map((f) => {
    const proj = ([id, why]) => {
      const featured = projects.find((p) => p.id === id);
      return [featured ? h('button', { class: 'sug', type: 'button', onclick: () => app.open(id) }, evidenceName(id)) : h('span', {}, evidenceName(id)), h('span', { class: 'muted' }, why)];
    };
    return h('div', { class: 'box' }, h('h3', {}, f.name), h('p', { style: { marginTop: 0 } }, f.line),
      h('div', { class: 'kv', style: { gridTemplateColumns: '9rem 1fr', marginTop: '8px' } }, f.shows.flatMap(proj)),
      f.profiles.length ? h('div', { class: 'ctl' }, h('span', { class: 'muted' }, 'profiles'), ...f.profiles.map((l) => link(l.href, l.label + ' ↗'))) : null);
  });
  put(host, ...head('fundamentals.md', 'Core subjects I keep strengthening, shown where they appear in real work'),
    h('p', { style: { marginTop: '8px' } }, 'How data is stored, how machines talk, what the OS does, which algorithm to pick.'),
    h('div', { class: 'grid', style: { gridTemplateColumns: '1fr' } }, ...cards));
}

/* ---------------- now.md ---------------- */
export function nowView(host) {
  const list = (items) => h('div', { class: 'kv', style: { gridTemplateColumns: '10rem 1fr' } }, items.flatMap((i) => [h('b', { style: { fontWeight: 500 } }, i.what), h('span', { class: 'muted' }, i.detail)]));
  put(host, ...head('now.md', 'What I am building and learning'),
    h('div', { class: 'grid' }, h('div', { class: 'box' }, h('h3', {}, 'Building'), list(now.building)), h('div', { class: 'box' }, h('h3', {}, 'Learning'), list(now.learning))));
}

/* ---------------- contact.md ---------------- */
export function contactView(host) {
  const rows = [...profile.links.map((l) => [l.label, link(l.href, l.href.replace('https://', ''))])];
  if (about.email) rows.push(['email', link(`mailto:${about.email}`, about.email)]);
  if (about.resumeHref) rows.push(['resume', link(about.resumeHref, 'download')]);
  put(host, ...head('contact.md', about.openTo),
    h('div', { class: 'box' }, h('h3', {}, 'Find me'), kv(rows)));
}
