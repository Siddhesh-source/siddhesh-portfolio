import { h, $$ } from '../lib/dom.js';

/** Fixed chapter rail with progress, plus j/k and arrow-key chapter navigation. */
export function mountRail(chapters) {
  const links = chapters.map((c) => h('a', { href: `#${c.id}`, 'aria-label': c.getAttribute('aria-label') || c.id }, h('i')));
  const rail = h('nav', { class: 'rail', 'aria-label': 'Chapters' }, links);
  document.body.append(rail);

  let current = 0;
  const mark = (i) => { current = i; links.forEach((l, j) => l.setAttribute('aria-current', String(j === i))); };
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    mark(chapters.indexOf(e.target));
  }), { threshold: 0.5 });
  chapters.forEach((c) => io.observe(c));
  mark(0);

  const go = (d) => { const t = chapters[Math.max(0, Math.min(chapters.length - 1, current + d))]; t.scrollIntoView({ behavior: 'smooth' }); };
  addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, [role="tab"], .node') || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'j' || e.key === 'PageDown') { e.preventDefault(); go(1); }
    else if (e.key === 'k' || e.key === 'PageUp') { e.preventDefault(); go(-1); }
  });
}
