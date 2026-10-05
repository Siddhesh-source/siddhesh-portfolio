import { h, s } from '../lib/dom.js';

const W = 680, H = 360, NW = 156, NH = 54;
let uid = 0;

/**
 * Draggable architecture diagram. Nodes are focusable; arrow keys move the focused node,
 * Enter/Space selects it. "Trace" sends a packet along spec.trace.
 * @param {{nodes:{id:string,label:string,sub:string,x:number,y:number,hot?:boolean}[], edges:string[][], trace:string[], info:Record<string,string>}} spec
 * @returns {{el:HTMLElement, destroy:()=>void}}
 */
export function createDiagram(spec) {
  const markerId = `arrow-${++uid}`;
  const pos = new Map(spec.nodes.map((n) => [n.id, [n.x, n.y]]));
  const nodesById = new Map(spec.nodes.map((n) => [n.id, n]));
  let selected = (spec.nodes.find((n) => n.hot) || spec.nodes[0]).id;
  let timers = [];

  const edgesG = s('g');
  const nodesG = s('g');
  const pkt = s('circle', { class: 'pkt', r: 6, cx: -30, cy: -30 });
  const svg = s('svg', { class: 'dg', viewBox: `0 0 ${W} ${H}`, role: 'group', 'aria-label': 'Architecture diagram. Drag or use arrow keys to move nodes.' },
    s('defs', {}, s('marker', { id: markerId, viewBox: '0 0 8 8', refX: 7, refY: 4, markerWidth: 7, markerHeight: 7, orient: 'auto' }, s('path', { d: 'M0 0L8 4L0 8z', fill: 'currentColor' }))),
    edgesG, nodesG, pkt);
  const read = h('div', { class: 'dg-read', 'aria-live': 'polite' });
  const traceBtn = h('button', { class: 'btn', type: 'button' }, 'Trace a message');
  const resetBtn = h('button', { class: 'btn', type: 'button' }, 'Reset layout');
  const el = h('div', {}, svg, read, h('div', { class: 'ctl' }, traceBtn, resetBtn));

  const clip = (cx, cy, tx, ty) => {
    const dx = tx - cx, dy = ty - cy;
    const k = Math.min((NW / 2 + 4) / Math.abs(dx || 1e-9), (NH / 2 + 4) / Math.abs(dy || 1e-9));
    return [cx + dx * k, cy + dy * k];
  };

  function draw() {
    edgesG.replaceChildren(...spec.edges.map(([a, b]) => {
      const [ax, ay] = pos.get(a), [bx, by] = pos.get(b);
      const A = [ax + NW / 2, ay + NH / 2], B = [bx + NW / 2, by + NH / 2];
      const p1 = clip(...A, ...B), p2 = clip(...B, ...A);
      return s('path', { class: 'edge', 'marker-end': `url(#${markerId})`, d: `M${p1[0]} ${p1[1]}L${p2[0]} ${p2[1]}` });
    }));
    nodesG.replaceChildren(...spec.nodes.map((n) => {
      const [x, y] = pos.get(n.id);
      const g = s('g', { class: `node${selected === n.id ? ' sel' : ''}`, 'data-id': n.id, transform: `translate(${x} ${y})`, tabindex: 0, role: 'button', 'aria-label': `${n.label}: ${n.sub}` },
        s('rect', { width: NW, height: NH, rx: 8 }), s('text', { class: 't1', x: NW / 2, y: 23 }, n.label), s('text', { class: 't2', x: NW / 2, y: 40 }, n.sub));
      return g;
    }));
    const n = nodesById.get(selected);
    read.replaceChildren(h('b', {}, n.label), ' ', spec.info[selected] || '');
  }

  const toSvg = (e) => { const r = svg.getBoundingClientRect(); return [((e.clientX - r.left) / r.width) * W, ((e.clientY - r.top) / r.height) * H]; };
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  let drag = null;
  svg.addEventListener('pointerdown', (e) => {
    const g = e.target.closest('.node'); if (!g) return;
    const id = g.dataset.id, [px, py] = toSvg(e), [nx, ny] = pos.get(id);
    drag = { id, dx: px - nx, dy: py - ny }; selected = id; svg.setPointerCapture(e.pointerId); draw();
  });
  svg.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const [px, py] = toSvg(e);
    pos.set(drag.id, [clamp(px - drag.dx, 0, W - NW), clamp(py - drag.dy, 0, H - NH)]); draw();
  });
  svg.addEventListener('pointerup', () => { drag = null; });
  svg.addEventListener('keydown', (e) => {
    const g = e.target.closest('.node'); if (!g) return;
    const id = g.dataset.id, [x, y] = pos.get(id), step = e.shiftKey ? 30 : 12;
    const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (moves[e.key]) { e.preventDefault(); pos.set(id, [clamp(x + moves[e.key][0], 0, W - NW), clamp(y + moves[e.key][1], 0, H - NH)]); selected = id; draw(); svg.querySelector(`[data-id="${id}"]`).focus(); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selected = id; draw(); svg.querySelector(`[data-id="${id}"]`).focus(); }
  });

  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  traceBtn.addEventListener('click', () => {
    clearTimers();
    spec.trace.forEach((id, i) => timers.push(setTimeout(() => {
      const [x, y] = pos.get(id);
      pkt.style.transition = 'cx 0.5s var(--ease-out), cy 0.5s var(--ease-out)';
      pkt.setAttribute('cx', x + NW / 2); pkt.setAttribute('cy', y + NH / 2);
      selected = id; draw(); traceBtn.textContent = `Hop ${i + 1} of ${spec.trace.length}`;
    }, i * 800)));
    timers.push(setTimeout(() => { traceBtn.textContent = 'Trace a message'; }, spec.trace.length * 800));
  });
  resetBtn.addEventListener('click', () => { clearTimers(); spec.nodes.forEach((n) => pos.set(n.id, [n.x, n.y])); pkt.setAttribute('cx', -30); pkt.setAttribute('cy', -30); traceBtn.textContent = 'Trace a message'; draw(); });

  draw();
  return { el, destroy: clearTimers };
}
