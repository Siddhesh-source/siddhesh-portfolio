// The virtual file system shown in the explorer. Project content comes from the data in this folder.
import { projects } from './projects.js';
import { profile } from './profile.js';

const NAMES = {
  whispr: 'whispr.md',
  nexus: 'nexusos.log',
  ccml: 'ccml.bench',
  flash: 'flash-sale.sim',
  quat: 'quatarly.json',
  trade: 'trading.py',
};

/** Folders in display order. */
export const DIRS = ['projects', 'learning'];

/** @typedef {{id:string, name:string, dir:string, path:string, title:string, view?:string, project?:object}} VFile */

/** @type {VFile[]} */
export const files = [
  { id: 'readme', name: 'README.md', dir: '', path: 'README.md', title: 'README', view: 'readme' },
  { id: 'about', name: 'about.md', dir: '', path: 'about.md', title: 'About', view: 'about' },
  { id: 'skills', name: 'skills.yaml', dir: '', path: 'skills.yaml', title: 'Skills', view: 'skills' },
  { id: 'exp', name: 'experience.yaml', dir: '', path: 'experience.yaml', title: 'Experience', view: 'exp' },
  { id: 'contact', name: 'contact.md', dir: '', path: 'contact.md', title: 'Contact', view: 'contact' },
  ...projects.map((p) => ({ id: p.id, name: NAMES[p.id] || `${p.id}.md`, dir: 'projects', path: `projects/${NAMES[p.id] || p.id + '.md'}`, title: p.name, project: p })),
  { id: 'more', name: 'more.md', dir: 'projects', path: 'projects/more.md', title: 'More projects', view: 'more' },
  { id: 'core', name: 'fundamentals.md', dir: 'learning', path: 'learning/fundamentals.md', title: 'Fundamentals', view: 'core' },
  { id: 'now', name: 'now.md', dir: 'learning', path: 'learning/now.md', title: 'Now', view: 'now' },
];

export const byId = (id) => files.find((f) => f.id === id);
export const byName = (q) => {
  const s = q.toLowerCase().replace(/^\.?\/?/, '');
  return files.find((f) => f.id === s || f.name.toLowerCase() === s || f.path.toLowerCase() === s)
    || files.find((f) => f.name.toLowerCase().startsWith(s) || f.id.startsWith(s));
};
export { projects, profile };
