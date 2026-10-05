// One command registry used by the terminal and the command palette.
import { files, byName, profile, projects } from './data/files.js';
import { widgets } from './widgets/index.js';

const PANELS = { explorer: 'exp', inspector: 'ins', terminal: 'term' };

/**
 * @param {object} app  { open(id), closeActive(), setTheme(t), setDensity(d), toggle(key), get() }
 * @returns {{name:string, args?:string, desc:string, run:(args:string[], out:(t:string, cls?:string)=>void)=>any}[]}
 */
export function createCommands(app) {
  const need = (a, out, usage) => { if (!a.length) { out(`usage: ${usage}`, 'muted'); return false; } return true; };
  return [
    { name: 'help', desc: 'list commands', run: (_a, out) => commands.forEach((c) => out(`${(c.name + ' ' + (c.args || '')).trim().padEnd(26)} ${c.desc}`)) },
    { name: 'ls', args: '[projects]', desc: 'list files', run: (a, out) => files.filter((f) => !a[0] || f.dir === a[0].replace('/', '')).forEach((f) => out(f.path)) },
    { name: 'open', args: '<file>', desc: 'open a file in a tab', run: (a, out) => { if (!need(a, out, 'open <file>')) return; const f = byName(a.join(' ')); f ? app.open(f.id) : out(`no such file: ${a.join(' ')}`, 'err'); } },
    {
      name: 'cat', args: '<file>', desc: 'print a file summary',
      run: (a, out) => {
        if (!need(a, out, 'cat <file>')) return;
        const f = byName(a.join(' '));
        if (!f) return out(`no such file: ${a.join(' ')}`, 'err');
        if (f.project) { const p = f.project; out(`${p.name}  ${p.numeral}  ${p.caption}`, 'acc'); p.text.forEach((t) => out(t)); out(`stack: ${p.stack.join(', ')}`, 'muted'); out(p.link.href, 'muted'); }
        else if (f.id === 'exp') profile.experience.forEach((e) => { out(`${e.org}: ${e.what}`); out(`  ${e.stack}`, 'muted'); });
        else { out(profile.title, 'acc'); out(profile.lede); }
      },
    },
    {
      name: 'run', args: '<whispr|nexus|ccml|flash|quat|trade> [args]', desc: 'run a simulation here',
      run: async (a, out) => {
        const w = widgets[byName(a[0] || '')?.id] || widgets[a[0]];
        if (!w) return out(`usage: run <${Object.keys(widgets).join('|')}> [args]   e.g. run flash --n 800`, 'muted');
        await w.run(a.slice(1), out);
      },
    },
    { name: 'stack', desc: 'print the tech stack', run: (_a, out) => profile.stack.forEach(([k, v]) => out(`${k.padEnd(15)} ${v}`)) },
    { name: 'links', desc: 'print profile links', run: (_a, out) => profile.links.forEach((l) => out(`${l.label.padEnd(9)} ${l.href}`)) },
    { name: 'whoami', desc: 'who is this', run: (_a, out) => { out(profile.name, 'acc'); out(profile.lede); } },
    { name: 'theme', args: '<dark|light>', desc: 'switch theme', run: (a, out) => { if (['dark', 'light'].includes(a[0])) app.setTheme(a[0]); else out('usage: theme <dark|light>', 'muted'); } },
    { name: 'density', args: '<compact|comfortable>', desc: 'switch density', run: (a, out) => { if (['compact', 'comfortable'].includes(a[0])) app.setDensity(a[0]); else out('usage: density <compact|comfortable>', 'muted'); } },
    { name: 'toggle', args: '<explorer|inspector|terminal>', desc: 'show or hide a panel', run: (a, out) => { if (PANELS[a[0]]) app.toggle(PANELS[a[0]]); else out('usage: toggle <explorer|inspector|terminal>', 'muted'); } },
    { name: 'close', desc: 'close the active tab', run: () => app.closeActive() },
    { name: 'clear', desc: 'clear the terminal', run: () => app.clearTerm() },
  ];
}

let commands = [];
export const setCommands = (c) => { commands = c; return c; };

/** Items for the Ctrl K palette. */
export function paletteItems(app) {
  const s = app.get();
  return [
    ...files.map((f) => ({ label: `Open ${f.path}`, kind: 'file', run: () => app.open(f.id) })),
    { label: 'Toggle explorer  (Ctrl B)', kind: 'view', run: () => app.toggle('exp') },
    { label: 'Toggle inspector', kind: 'view', run: () => app.toggle('ins') },
    { label: 'Toggle terminal  (Ctrl `)', kind: 'view', run: () => app.toggle('term') },
    { label: `Theme: ${s.theme === 'dark' ? 'light' : 'dark'}`, kind: 'theme', run: () => app.setTheme(s.theme === 'dark' ? 'light' : 'dark') },
    { label: `Density: ${s.density === 'compact' ? 'comfortable' : 'compact'}`, kind: 'theme', run: () => app.setDensity(s.density === 'compact' ? 'comfortable' : 'compact') },
    { label: 'Close tab  (Alt W)', kind: 'tab', run: () => app.closeActive() },
    ...projects.map((p) => ({ label: `${p.name} source on GitHub`, kind: 'link', run: () => window.open(p.link.href, '_blank', 'noopener') })),
    ...profile.links.map((l) => ({ label: `Open ${l.label}`, kind: 'link', run: () => window.open(l.href, '_blank', 'noopener') })),
  ];
}
