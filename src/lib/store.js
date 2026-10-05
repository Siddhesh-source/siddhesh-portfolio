// Tiny persisted store. localStorage may be blocked or full, so every access is guarded.
// Bump the version to reset everyone's stored view preferences back to the defaults (compact density).
const KEY = 'console.v2';

const defaults = () => ({
  tabs: ['readme'], active: 'readme',
  theme: matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark',
  density: 'compact',
  wExp: 220, wIns: 280, hTerm: 220,
  exp: true, ins: true, term: !matchMedia('(max-width: 860px)').matches,
  dirs: { projects: true },
});

function load() {
  const base = defaults();
  try { return { ...base, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return base; }
}

const state = load();
const subs = new Set();

export const get = () => state;
export function set(patch) {
  Object.assign(state, patch);
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage unavailable */ }
  subs.forEach((fn) => fn(state, patch));
}
export const subscribe = (fn) => { subs.add(fn); return () => subs.delete(fn); };

/** Session-scoped flag (boot sequence runs once per session). */
export function once(key) {
  try { if (sessionStorage.getItem(key)) return false; sessionStorage.setItem(key, '1'); } catch { /* ignore */ }
  return true;
}
