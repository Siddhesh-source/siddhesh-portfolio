(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GH = 'https://github.com/Siddhesh-source/';

  /* ---------- data ---------- */
  const ICONS = {
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
    cube: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12L4 7.5M12 12v9"/>',
    bolt: '<path d="M13 3L5 13h6l-1 8 8-10h-6z"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
  };
  const PROJECTS = [
    { name: 'Whispr', tag: 'E2EE MESSENGER', cat: ['systems', 'fullstack'], color: 'var(--purple)', icon: 'lock',
      desc: 'Privacy-first Android messenger on a Go backend. The server relays ciphertext and never sees content.',
      code: [['crypto', 'libsignal · PQXDH + Double Ratchet'], ['groups', 'sender keys, rotated on leave'], ['server', 'ciphertext only', 'o']],
      stack: ['Kotlin', 'Go', 'PostgreSQL', 'S3'], link: GH + 'whispr', note: 'opening soon' },
    { name: 'NexusOS', tag: 'OS INTERNALS', cat: ['systems'], color: 'var(--orange)', icon: 'chip',
      desc: 'x86-64 kernel written from scratch, with self-tests that run inside the kernel at every boot.',
      code: [['[ok]', 'Phase 5 scheduler verified'], ['tests', '223 passing', 'o'], ['progress', 'phase 5 of 10', 'c']],
      stack: ['C', 'NASM', 'Limine'], link: GH + 'NexusOS--a-custom-operating-system' },
    { name: 'ccml', tag: 'GPU / ML INFRA', cat: ['systems', 'ml'], color: 'var(--green)', icon: 'cube',
      desc: 'Hand-written CUDA kernels for matmul, layernorm and softmax behind a stable C ABI, validated and benchmarked against PyTorch.',
      code: [['matmul', 'err 7.4e-06', 'o'], ['layernorm', 'err 6.0e-08', 'o'], ['softmax', 'err 4.4e-08', 'o']],
      stack: ['CUDA', 'C++', 'Python'], link: GH + 'custom-cuda-kernel-library-for-ml-operators' },
    { name: 'Flash Sale', tag: 'DISTRIBUTED SYSTEMS', cat: ['distributed', 'fullstack'], color: 'var(--red)', icon: 'bolt',
      desc: 'Inventory that never oversells under heavy concurrency: a fast atomic path with a durable source of truth.',
      code: [['load', '10,000+ concurrent · 0 oversold', 'o'], ['stock', 'atomic Redis Lua scripts'], ['truth', 'PostgreSQL + 60s reconcile']],
      stack: ['Go', 'Redis', 'PostgreSQL'], link: GH + 'flash_sale' },
    { name: 'Quatarly', tag: 'FULL STACK + AI', cat: ['fullstack', 'ml'], color: 'var(--cyan)', icon: 'eye',
      desc: 'End-to-end exam platform with live AI proctoring, NLP-based grading and role-based dashboards.',
      code: [['detect', 'persons · phones · books'], ['monitor', 'WebSocket live feed'], ['grading', 'NLP semantic + keywords']],
      stack: ['FastAPI', 'PostgreSQL', 'YOLO', 'WebSocket'], link: GH + 'Smart-Exam-Proctor' },
    { name: 'Trading Engine', tag: 'REAL-TIME', cat: ['distributed', 'ml', 'fullstack'], color: 'var(--green)', icon: 'chart',
      desc: 'Explainable trading signals for Indian equities, streamed live to the UI with a human-readable rationale per decision.',
      code: [['score', 'sentiment + technicals + regime'], ['stream', 'redis pub/sub → SSE'], ['ui', 'live, no polling']],
      stack: ['FastAPI', 'React', 'Redis', 'SSE'], link: GH + 'Algorithmic-Trading-Engine' },
  ];
  const FILTERS = [['all', 'all'], ['systems', 'systems'], ['distributed', 'distributed'], ['ml', 'ai / ml'], ['fullstack', 'full stack']];
  const STACK = [
    ['Languages', 'var(--blue)', ['Python', 'Java', 'TypeScript', 'JavaScript', 'Go', 'C', 'C++', 'Kotlin', 'SQL']],
    ['Web', 'var(--cyan)', ['React', 'Next.js', 'Tailwind', 'Node.js', 'Express', 'Spring Boot', 'FastAPI', 'Django']],
    ['Data & infra', 'var(--orange)', ['Redis', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'GCP', 'Firebase', 'WebSockets']],
    ['AI / ML', 'var(--green)', ['PyTorch', 'CUDA', 'YOLO', 'LLM agents', 'NLP']],
    ['Automation', 'var(--yellow)', ['Playwright', 'Git', 'Linux']],
  ];
  const TERM = [
    ['p', '$ whoami'], ['v', 'siddhesh — software engineer, pune'],
    ['p', '$ cat focus.txt'], ['k', 'distributed systems · scaling · efficient design'],
    ['p', '$ ls skills/'], ['v', 'full-stack/  ai-ml/  infra/  internals/'],
    ['p', '$ ls projects/'], ['o', 'whispr/  nexusos/  ccml/  flash-sale/  quatarly/'],
  ];
  const ROLES = ['End-to-end engineering across the stack', 'Distributed systems, scaling & efficient design', 'Down to the internals: kernels, CUDA, crypto'];

  /* ---------- theme ---------- */
  const root = document.documentElement, themeBtn = $('#theme');
  const sun = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const moon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';
  const setTheme = (t) => {
    root.dataset.theme = t; themeBtn.innerHTML = t === 'dark' ? sun : moon;
    try { localStorage.setItem('theme', t); } catch (_) { /* storage unavailable */ }
    $('meta[name="theme-color"]').content = t === 'dark' ? '#0f1117' : '#f6f7fb';
  };
  let saved = null; try { saved = localStorage.getItem('theme'); } catch (_) { /* ignore */ }
  setTheme(saved || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
  themeBtn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  /* ---------- render projects, filters, stack ---------- */
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const grid = $('#grid');
  grid.innerHTML = PROJECTS.map((p) => `
    <article class="proj reveal" data-cat="${p.cat.join(' ')}" style="--c:${p.color}">
      <div class="p-head">
        <div class="p-ico"><svg viewBox="0 0 24 24">${ICONS[p.icon]}</svg></div>
        <div class="p-title">${esc(p.name)}</div>
        <div class="p-tag">${esc(p.tag)}</div>
      </div>
      <p>${esc(p.desc)}</p>
      <div class="code">${p.code.map(([k, v, c]) => `<div><span class="k">${esc(k)}</span> <span class="${c || 'v'}">${esc(v)}</span></div>`).join('')}</div>
      <div class="p-foot">
        <div class="chips">${p.stack.map((s) => `<span>${esc(s)}</span>`).join('')}</div>
        <a class="p-link" href="${p.link}" target="_blank" rel="noopener">${p.note ? esc(p.note) : 'source'} ↗</a>
      </div>
    </article>`).join('');

  const filters = $('#filters');
  filters.innerHTML = FILTERS.map(([k, l], i) => `<button role="tab" data-f="${k}" class="${i ? '' : 'on'}" aria-selected="${!i}">${l}</button>`).join('');
  filters.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', filters).forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
    $$('.proj').forEach((c) => c.classList.toggle('hide', b.dataset.f !== 'all' && !c.dataset.cat.split(' ').includes(b.dataset.f)));
  });

  $('#stack-grid').innerHTML = STACK.map(([t, c, items]) =>
    `<div class="stack-row" style="--c:${c}"><h3>${t}</h3><div>${items.map((i) => `<span>${i}</span>`).join('')}</div></div>`).join('');

  /* ---------- card tilt + glow ---------- */
  $$('.proj').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', x * 100 + '%'); card.style.setProperty('--my', y * 100 + '%');
      if (!reduced) card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 6}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  /* ---------- reveal, progress, active nav ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  $$('.reveal').forEach((el) => io.observe(el));
  const links = $$('.nav nav a'), sections = links.map((a) => $(a.getAttribute('href')));
  const onScroll = () => {
    const h = document.documentElement;
    $('#progress').style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100 + '%';
    const y = h.scrollTop + 120; let cur = -1;
    sections.forEach((s, i) => { if (s && s.offsetTop <= y) cur = i; });
    links.forEach((a, i) => a.classList.toggle('on', i === cur));
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- cursor spotlight ---------- */
  addEventListener('pointermove', (e) => { const s = $('#spotlight').style; s.setProperty('--x', e.clientX + 'px'); s.setProperty('--y', e.clientY + 'px'); }, { passive: true });

  /* ---------- typing + terminal ---------- */
  const typed = $('#typed');
  if (reduced) typed.textContent = ROLES[0];
  else {
    let r = 0, i = 0, del = false;
    (function tick() {
      const w = ROLES[r];
      typed.textContent = w.slice(0, i);
      if (!del && i === w.length) { del = true; return setTimeout(tick, 1600); }
      if (del && i === 0) { del = false; r = (r + 1) % ROLES.length; }
      i += del ? -1 : 1; setTimeout(tick, del ? 18 : 42);
    })();
  }
  const termEl = $('#term-body'), cls = { p: 't-p', k: 't-k', v: 't-v', o: 't-o', c: 't-c' };
  const line = (t, s) => `<span class="${cls[t]}">${esc(s)}</span>`;
  if (reduced) termEl.innerHTML = TERM.map(([t, s]) => line(t, s)).join('\n');
  else {
    let n = 0, buf = [];
    (function next() {
      if (n >= TERM.length) return;
      const [t, s] = TERM[n]; let c = 0;
      const speed = t === 'p' ? 28 : 8;
      (function type() {
        c++; termEl.innerHTML = buf.concat(line(t, s.slice(0, c))).join('\n') + '<span class="caret">▍</span>';
        if (c < s.length) setTimeout(type, speed);
        else { buf.push(line(t, s)); n++; setTimeout(next, t === 'p' ? 260 : 90); }
      })();
    })();
  }

  /* ---------- live GitHub numbers (falls back to static) ---------- */
  const countUp = (el, to) => {
    if (reduced) { el.textContent = to; return; }
    const t0 = performance.now();
    (function f(t) { const p = Math.min((t - t0) / 900, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
  };
  const mio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { countUp(e.target, +e.target.dataset.count); mio.unobserve(e.target); } }), { threshold: .6 });
  fetch('https://api.github.com/users/Siddhesh-source').then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((u) => { $('#m-repos').dataset.count = u.public_repos; $('#m-followers').dataset.count = u.followers; })
    .catch(() => { /* keep static fallbacks */ })
    .finally(() => $$('[data-count]').forEach((el) => mio.observe(el)));

  /* ---------- command palette ---------- */
  const pal = $('#palette'), inp = $('#palette-input'), list = $('#palette-list');
  const CMDS = [
    ...[['About', '#about'], ['Work', '#work'], ['Projects', '#projects'], ['Stack', '#stack'], ['Contact', '#contact']].map(([l, h]) => ({ l: 'Go to ' + l, s: 'section', run: () => { location.hash = h; } })),
    ...PROJECTS.map((p) => ({ l: p.name, s: 'project', run: () => window.open(p.link, '_blank', 'noopener') })),
    { l: 'Open GitHub', s: 'link', run: () => window.open('https://github.com/Siddhesh-source', '_blank', 'noopener') },
    { l: 'Open LinkedIn', s: 'link', run: () => window.open('https://www.linkedin.com/in/siddhesh-chaudhari3011', '_blank', 'noopener') },
    { l: 'Open X', s: 'link', run: () => window.open('https://x.com/csiddhesh3011', '_blank', 'noopener') },
    { l: 'Toggle theme', s: 'action', run: () => themeBtn.click() },
  ];
  let shown = [], sel = 0;
  const draw = () => {
    list.innerHTML = shown.map((c, i) => `<li class="${i === sel ? 'sel' : ''}" data-i="${i}">${esc(c.l)}<span>${c.s}</span></li>`).join('') || '<li><span>no matches</span></li>';
  };
  const filter = () => { const q = inp.value.trim().toLowerCase(); shown = CMDS.filter((c) => c.l.toLowerCase().includes(q)); sel = 0; draw(); };
  const open = () => { pal.hidden = false; inp.value = ''; filter(); inp.focus(); };
  const close = () => { pal.hidden = true; };
  const run = (i) => { const c = shown[i]; if (c) { close(); c.run(); } };
  $('#open-palette').addEventListener('click', open);
  pal.addEventListener('click', (e) => { if (e.target === pal) close(); });
  list.addEventListener('click', (e) => { const li = e.target.closest('li[data-i]'); if (li) run(+li.dataset.i); });
  inp.addEventListener('input', filter);
  inp.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, shown.length - 1); draw(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); draw(); e.preventDefault(); }
    else if (e.key === 'Enter') run(sel);
  });
  addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? open() : close(); }
    else if (e.key === 'Escape' && !pal.hidden) close();
  });

  /* ---------- background network canvas ---------- */
  const cv = $('#bg'), ctx = cv.getContext('2d');
  let W, H, pts = [], mouse = { x: -999, y: -999 };
  const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; pts = Array.from({ length: Math.min(70, Math.floor(W * H / 22000)) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3 })); };
  size(); addEventListener('resize', size);
  addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  const color = () => getComputedStyle(root).getPropertyValue('--blue').trim();
  (function frame() {
    ctx.clearRect(0, 0, W, H);
    const c = color();
    ctx.fillStyle = c; ctx.strokeStyle = c;
    pts.forEach((p, i) => {
      if (!reduced) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }
      ctx.globalAlpha = .6; ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, 6.283); ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 120) { ctx.globalAlpha = (1 - d / 120) * .25; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      }
      const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (dm < 160) { ctx.globalAlpha = (1 - dm / 160) * .5; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
    });
    if (!reduced) requestAnimationFrame(frame);
  })();

  $('#year').textContent = new Date().getFullYear();
})();
