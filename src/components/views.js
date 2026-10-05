import { h } from '../lib/dom.js';
import { createDiagram } from '../components/diagram.js';
import { widgets } from '../widgets/index.js';
import { profile, projects } from '../data/files.js';

/** Editor pane renderers. Each returns an optional cleanup function. */

export function readmeView(host, app) {
  const cmd = (c, label = c) => h('button', { class: 'sug', type: 'button', onclick: () => app.exec(c) }, label);
  host.append(
    h('h1', { class: 'hero' }, profile.name),
    h('p', { style: { marginTop: '8px' } }, profile.lede),
    h('div', { class: 'grid' },
      h('div', { class: 'box' }, h('h3', {}, 'Start here'),
        h('div', { class: 'kv' },
          h('span', {}, 'race buyers'), cmd('run flash --n 800'),
          h('span', {}, 'replay boot'), cmd('open nexusos.log'),
          h('span', {}, 'who uses Go'), cmd('skills go'),
          h('span', {}, 'core subjects'), cmd('fundamentals'),
          h('span', {}, 'all commands'), cmd('help'))),
      h('div', { class: 'box' }, h('h3', {}, 'Keys'),
        h('div', { class: 'kv' }, ...[['Ctrl P', 'quick open'], ['Ctrl K', 'commands'], ['Ctrl B', 'explorer'], ['Ctrl `', 'terminal'], ['Alt W', 'close tab'], ['Alt 1..9', 'jump to tab'], ['j / k', 'move in explorer']].flatMap(([k, v]) => [h('span', {}, k), h('span', {}, v)])))),
    h('div', { class: 'box', style: { marginTop: '12px' } }, h('h3', {}, 'Links'),
      h('div', { class: 'kv' }, profile.links.flatMap((l) => [h('span', {}, l.label), h('a', { href: l.href, target: '_blank', rel: 'noopener' }, l.href.replace('https://', ''))]))));
}

export function experienceView(host) {
  host.append(h('h1', {}, 'experience.yaml'), h('p', {}, 'Where I have worked.'),
    h('div', { class: 'grid', style: { gridTemplateColumns: '1fr' } },
      ...profile.experience.map((e) => h('div', { class: 'box' }, h('h3', {}, e.org), h('p', {}, e.what), h('ul', { class: 'chips' }, e.stack.split(' · ').map((x) => h('li', {}, x))))),
      ...profile.education.map((e) => h('div', { class: 'box' }, h('h3', {}, 'Education'), h('p', {}, `${e.school}, ${e.years}`)))));
}

export function projectView(host, p) {
  const w = h('div', { class: 'box' });
  const dg = createDiagram(p.diagram);
  host.append(
    h('h1', {}, p.name),
    h('div', { class: 'num' }, `${p.numeral}  ${p.caption}`),
    h('div', { class: 'grid' }, w,
      h('div', { class: 'box' }, h('h3', {}, 'About'), p.text.map((t) => h('p', {}, t)))),
    h('div', { class: 'box', style: { marginTop: '12px' } }, h('h3', {}, 'Architecture (drag nodes, arrow keys move the focused one)'), dg.el));
  const stop = widgets[p.id].mount(w);
  return () => { dg.destroy(); if (typeof stop === 'function') stop(); };
}

/** Inspector: what to run, the stack, and the source. */
export function inspectorView(host, file, app) {
  if (!file.project) {
    const open = (id, label) => h('button', { class: 'sug', type: 'button', onclick: () => app.open(id) }, label);
    host.append(h('h3', {}, 'Projects'),
      h('div', { class: 'kv', style: { gridTemplateColumns: '1fr', gap: '4px' } }, projects.map((p) => open(p.id, p.name)), open('more', 'More projects')),
      h('h3', { style: { marginTop: '16px' } }, 'Profile'),
      h('div', { class: 'kv', style: { gridTemplateColumns: '1fr', gap: '4px' } }, open('about', 'About'), open('skills', 'Skills'), open('exp', 'Experience'), open('core', 'Fundamentals'), open('now', 'Now')));
    return;
  }
  const p = file.project, cmd = (c) => h('button', { class: 'sug', type: 'button', onclick: () => app.exec(c) }, c);
  const runArg = { flash: 'run flash --n 800', whispr: 'run whispr "hello"', nexus: 'run nexus', ccml: 'run ccml', quat: 'run quat phone, book', trade: 'run trade 0.6 0.7 0.4' }[p.id];
  host.append(
    h('h3', {}, 'Run in terminal'),
    h('div', { class: 'kv', style: { gridTemplateColumns: '1fr', gap: '4px' } }, cmd(runArg), cmd(`cat ${file.name}`)),
    h('h3', { style: { marginTop: '16px' } }, 'Stack'), h('ul', { class: 'chips' }, p.stack.map((x) => h('li', {}, x))),
    h('h3', { style: { marginTop: '16px' } }, 'Source'), h('a', { href: p.link.href, target: '_blank', rel: 'noopener' }, `${p.link.label} ↗`));
}
