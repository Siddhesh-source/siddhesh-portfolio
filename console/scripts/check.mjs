// Zero-dependency checks for the console: theme contrast (WCAG AA) and registry integrity.
// Usage: node console/scripts/check.mjs
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
let failures = 0;
const fail = (m) => { failures++; console.error(`FAIL  ${m}`); };
const ok = (m) => console.log(`ok    ${m}`);

/* ---- contrast, both themes ---- */
const css = readFileSync(resolve(root, 'src/styles/tokens.css'), 'utf8');
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
const PAIRS = [['text', 'ground'], ['text', 'surface'], ['muted', 'ground'], ['muted', 'surface'], ['accent', 'surface'], ['accent', 'ground'], ['on-accent', 'accent'], ['ok', 'surface'], ['warn', 'surface'], ['error', 'surface']];
for (const theme of ['dark', 'light']) {
  const block = css.match(new RegExp(String.raw`\[data-theme="${theme}"\]\s*\{([^}]*)\}`))?.[1] || '';
  const v = Object.fromEntries([...block.matchAll(/--([a-z-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
  if (!v.ground) { fail(`${theme}: theme block not found`); continue; }
  for (const [fg, bg] of PAIRS) {
    const r = ratio(v[fg], v[bg]);
    (r >= 4.5 ? ok : fail)(`${theme} ${fg} on ${bg} = ${r.toFixed(2)}:1`);
  }
}

/* ---- registries ---- */
const { files } = await import(pathToFileURL(resolve(root, 'src/data/files.js')).href);
const { widgets } = await import(pathToFileURL(resolve(root, 'src/widgets/index.js')).href);
const { createCommands } = await import(pathToFileURL(resolve(root, 'src/commands.js')).href);
const paths = new Set();
for (const f of files) {
  if (paths.has(f.path)) fail(`duplicate path ${f.path}`); paths.add(f.path);
  if (f.project) {
    const w = widgets[f.id];
    if (!w || typeof w.mount !== 'function' || typeof w.run !== 'function') fail(`${f.id}: widget needs mount() and run()`);
  }
}
const names = createCommands({ get: () => ({}) }).map((c) => c.name);
if (new Set(names).size !== names.length) fail('duplicate command names');
if (!failures) ok(`${files.length} files, ${names.length} commands, ${Object.keys(widgets).length} widgets`);

/* ---- profile data ---- */
const { skills } = await import(pathToFileURL(resolve(root, 'src/data/skills.js')).href);
const { archive } = await import(pathToFileURL(resolve(root, 'src/data/archive.js')).href);
const { fundamentals } = await import(pathToFileURL(resolve(root, 'src/data/learning.js')).href);
const { projects } = await import(pathToFileURL(resolve(root, '../src/data/projects.js')).href);
const evidence = new Set([...projects.map((p) => p.id), ...archive.map((a) => a.id), 'rink9', 'taxbharo', 'dsa']);
const seen = new Set();
for (const a of archive) {
  if (seen.has(a.id)) fail(`duplicate archive id ${a.id}`); seen.add(a.id);
  if (!/^https:\/\/github\.com\//.test(a.href)) fail(`${a.id}: href must be a github https link`);
  for (const k of ['name', 'kind', 'desc', 'stack', 'year']) if (!a[k]) fail(`${a.id} missing ${k}`);
}
const skillNames = new Set();
for (const sk of skills) {
  if (skillNames.has(sk.name)) fail(`duplicate skill ${sk.name}`); skillNames.add(sk.name);
  for (const id of sk.used) if (!evidence.has(id)) fail(`skill ${sk.name} cites unknown evidence "${id}"`);
}
for (const f of fundamentals) {
  if (!f.shows.length) fail(`fundamentals ${f.id}: needs at least one piece of evidence`);
  for (const [id] of f.shows) if (!evidence.has(id)) fail(`fundamentals ${f.id} cites unknown evidence "${id}"`);
  for (const l of f.profiles) if (!/^https:\/\//.test(l.href)) fail(`fundamentals ${f.id}: profile links must be https`);
}
if (!failures) ok(`${skills.length} skills, ${archive.length} archive projects, ${fundamentals.length} core subjects`);

/* ---- simulation invariants (shared logic) ---- */
const { simulate } = await import(pathToFileURL(resolve(root, '../src/widgets/flash.js')).href);
for (const n of [100, 800, 2000]) (simulate(n, true).at(-1).oversold === 0 ? ok : fail)(`atomic never oversells at ${n}`);

if (failures) { console.error(`\n${failures} check(s) failed`); process.exit(1); }
console.log('\nall console checks passed');
