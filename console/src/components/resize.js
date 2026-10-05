import * as store from '../lib/store.js';

/** Drag or arrow-key resize for a separator. axis 'x' resizes widths, 'y' the terminal height. */
export function attachResize(sep, { key, min, max, axis = 'x', invert = false, apply }) {
  const clamp = (v) => Math.max(min, Math.min(typeof max === 'function' ? max() : max, v));
  const commit = (v) => { const val = Math.round(clamp(v)); apply(val); store.set({ [key]: val }); };
  sep.setAttribute('role', 'separator');
  sep.tabIndex = 0;
  sep.setAttribute('aria-orientation', axis === 'x' ? 'vertical' : 'horizontal');
  let start = null;
  sep.addEventListener('pointerdown', (e) => { start = { p: axis === 'x' ? e.clientX : e.clientY, v: store.get()[key] }; sep.setPointerCapture(e.pointerId); sep.classList.add('drag'); });
  sep.addEventListener('pointermove', (e) => {
    if (!start) return;
    const d = (axis === 'x' ? e.clientX : e.clientY) - start.p;
    commit(start.v + (invert ? -d : d));
  });
  const end = () => { start = null; sep.classList.remove('drag'); };
  sep.addEventListener('pointerup', end); sep.addEventListener('pointercancel', end);
  sep.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 40 : 12, k = axis === 'x' ? ['ArrowLeft', 'ArrowRight'] : ['ArrowUp', 'ArrowDown'];
    if (!k.includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === k[1] ? 1 : -1;
    commit(store.get()[key] + (invert ? -dir : dir) * step);
  });
  apply(clamp(store.get()[key]));
}
