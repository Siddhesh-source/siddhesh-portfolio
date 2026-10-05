// Zero-dependency checks: chapter colour contrast (WCAG AA, 4.5:1) and project data shape.
// Usage: node scripts/check.mjs
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
let failures = 0;
const fail = (msg) => { failures++; console.error(`FAIL  ${msg}`); };
const ok = (msg) => console.log(`ok    ${msg}`);

/* ---- contrast ---- */
const css = readFileSync(resolve(root, 'src/styles/tokens.css'), 'utf8');
const vars = Object.fromEntries([...css.matchAll(/--([a-z-]+):\s*(#[0-9a-f]{6})\s*;/gi)].map((m) => [m[1], m[2]]));
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
const themes = [...css.matchAll(/\.ch--([a-z]+)\s*\{\s*--bg:\s*var\(--([a-z-]+)\);\s*--fg:\s*var\(--([a-z-]+)\);/g)];
if (!themes.length) fail('no chapter themes found in tokens.css');
for (const [, name, bg, fg] of themes) {
  const r = ratio(vars[bg], vars[fg]);
  (r >= 4.5 ? ok : fail)(`contrast ${name}: ${bg} on ${fg} = ${r.toFixed(2)}:1`);
}

/* ---- data ---- */
const { projects } = await import(pathToFileURL(resolve(root, 'src/data/projects.js')).href);
const { widgets } = await import(pathToFileURL(resolve(root, 'src/widgets/index.js')).href);
const themeNames = new Set(themes.map((t) => t[1]));
const ids = new Set();
for (const p of projects) {
  for (const k of ['id', 'short', 'theme', 'name', 'title', 'numeral', 'caption', 'text', 'stack', 'link', 'diagram']) if (!p[k]) fail(`${p.id || '?'} missing ${k}`);
  if (ids.has(p.id)) fail(`duplicate id ${p.id}`); ids.add(p.id);
  if (!themeNames.has(p.theme)) fail(`${p.id}: no .ch--${p.theme} theme in tokens.css`);
  if (!widgets[p.id]) fail(`${p.id}: no widget registered`);
  if (!/^https:\/\//.test(p.link?.href || '')) fail(`${p.id}: link must be https`);
  const nodeIds = new Set(p.diagram.nodes.map((n) => n.id));
  for (const [a, b] of p.diagram.edges) if (!nodeIds.has(a) || !nodeIds.has(b)) fail(`${p.id}: edge ${a}->${b} references a missing node`);
  for (const id of p.diagram.trace) if (!nodeIds.has(id)) fail(`${p.id}: trace node ${id} missing`);
  for (const id of nodeIds) if (!p.diagram.info[id]) fail(`${p.id}: no info text for node ${id}`);
}
if (!failures) ok(`${projects.length} projects valid`);

/* ---- flash-sale simulation invariants ---- */
const { simulate } = await import(pathToFileURL(resolve(root, 'src/widgets/flash.js')).href).catch(() => ({}));
if (simulate) {
  for (const n of [100, 500, 800, 2000]) {
    const atomic = simulate(n, true).at(-1);
    (atomic.oversold === 0 ? ok : fail)(`atomic never oversells at ${n} requests`);
  }
}

if (failures) { console.error(`\n${failures} check(s) failed`); process.exit(1); }
console.log('\nall checks passed');
