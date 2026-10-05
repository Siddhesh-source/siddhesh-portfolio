// The virtual file system shown in the explorer. Content comes from the shared data in ../../../src/data.
import { projects } from '../../../src/data/projects.js';
import { profile } from '../../../src/data/profile.js';

const NAMES = {
  whispr: 'whispr.md',
  nexus: 'nexusos.log',
  ccml: 'ccml.bench',
  flash: 'flash-sale.sim',
  quat: 'quatarly.json',
  trade: 'trading.py',
};

/** @typedef {{id:string, name:string, dir:string, path:string, title:string, project?:object}} VFile */

/** @type {VFile[]} */
export const files = [
  { id: 'readme', name: 'README.md', dir: '', path: 'README.md', title: 'README' },
  { id: 'exp', name: 'experience.yaml', dir: '', path: 'experience.yaml', title: 'Experience' },
  ...projects.map((p) => ({ id: p.id, name: NAMES[p.id] || `${p.id}.md`, dir: 'projects', path: `projects/${NAMES[p.id] || p.id + '.md'}`, title: p.name, project: p })),
];

export const byId = (id) => files.find((f) => f.id === id);
export const byName = (q) => {
  const s = q.toLowerCase().replace(/^\.?\/?/, '');
  return files.find((f) => f.id === s || f.name.toLowerCase() === s || f.path.toLowerCase() === s)
    || files.find((f) => f.name.toLowerCase().startsWith(s) || f.id.startsWith(s));
};
export { projects, profile };
