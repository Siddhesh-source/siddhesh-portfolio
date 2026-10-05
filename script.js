(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const GH = 'https://github.com/Siddhesh-source/';
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const flow = (nodes) => `<div class="flow">${nodes.map(([t, hot], i) => `${i ? '<u>→</u>' : ''}<b${hot ? ' class="hot"' : ''}>${esc(t)}</b>`).join('')}</div>`;

  /* ---------- content ---------- */
  const PROJECTS = [
    { name: 'Whispr', claim: 'End-to-end encrypted Android messenger on a Go backend', stack: 'Kotlin · Go · PostgreSQL · S3',
      facts: ['libsignal for all protocol crypto (PQXDH, Double Ratchet). No custom crypto.', 'Group chats use sender keys, rotated when anyone leaves. Group name, picture and members are encrypted too.', 'Photos, files and voice are encrypted on the device; object storage only holds ciphertext.'],
      art: `<span class="dim"># what the server sees</span>\nenvelope   <span class="ok">opaque bytes</span>\nmedia      <span class="ok">ciphertext</span>\ncontent    <span class="dim">never</span>\nlogs       <span class="dim">no plaintext, no keys</span>`,
      link: [GH + 'whispr', 'Repository (opening soon)'] },
    { name: 'NexusOS', claim: 'x86-64 kernel written from scratch in C and NASM', stack: 'C · NASM · Limine',
      facts: ['Boot, interrupts, memory, threads, then a preemptive scheduler. Each layer ships self-tests that run inside the kernel at every boot.', 'Phase 5 of 10 is done.'],
      art: `<span class="ok">[ok]</span> Phase 3 memory management verified\n<span class="ok">[ok]</span> Phase 4 process management verified\n<span class="ok">[ok]</span> Phase 5 scheduler verified\n<span class="dim">boot tests</span> 223 passing`,
      link: [GH + 'NexusOS--a-custom-operating-system', 'Source'] },
    { name: 'ccml', claim: 'Hand-written CUDA kernels behind a stable C ABI', stack: 'CUDA · C++ · Python',
      facts: ['Matrix multiply, layer norm and softmax, packaged as a library with a C ABI and an optional Python binding.', 'Checked against two independent reference implementations and benchmarked against PyTorch. Still tuning for speed.'],
      art: `<div class="bars"><div class="bar"><span>matmul</span><i style="--w:69%"></i><span>7.4e-06</span></div><div class="bar"><span>layernorm</span><i style="--w:97%"></i><span>6.0e-08</span></div><div class="bar"><span>softmax</span><i style="--w:100%"></i><span>4.4e-08</span></div><p class="dim">max error vs reference · longer bar means closer agreement</p></div>`,
      link: [GH + 'custom-cuda-kernel-library-for-ml-operators', 'Source'] },
    { name: 'Flash Sale', claim: 'Inventory that never oversells under heavy concurrency', stack: 'Go · Redis · PostgreSQL',
      facts: ['10,000+ concurrent requests with zero overselling.', 'Redis Lua scripts make the stock decrement atomic. PostgreSQL stays the source of truth, with automatic reconciliation within 60 seconds.'],
      art: flow([['request'], ['Redis Lua: atomic decrement', true], ['sold or sold out'], ['PostgreSQL write'], ['reconcile ≤ 60s']]),
      link: [GH + 'flash_sale', 'Source'] },
    { name: 'Quatarly', claim: 'End-to-end exam platform with live AI proctoring', stack: 'FastAPI · PostgreSQL · YOLO',
      facts: ['YOLO detects multiple people, phones and books. Tab switches and audio are tracked too.', 'Violations feed a live integrity score and a WebSocket feed for professors. Subjective answers are graded by NLP similarity.'],
      art: flow([['camera + tab + audio'], ['YOLO + rules', true], ['violation log'], ['integrity score'], ['WebSocket to professor']]),
      link: [GH + 'Smart-Exam-Proctor', 'Source'] },
    { name: 'Trading Engine', claim: 'Explainable real-time trading signals for Indian equities', stack: 'FastAPI · React · Redis',
      facts: ['A composite score fuses sentiment, technicals and market regime, with a human-readable rationale per decision.', 'Streamed over Redis pub/sub and server-sent events, so the UI updates live with no polling.'],
      art: flow([['sentiment · technicals · regime'], ['composite score', true], ['Redis pub/sub'], ['SSE'], ['live UI + rationale']]),
      link: [GH + 'Algorithmic-Trading-Engine', 'Source'] },
  ];
  const STACK = [
    ['Languages', 'Python, Java, TypeScript, JavaScript, Go, C, C++, Kotlin, SQL'],
    ['Web', 'React, Next.js, Tailwind, Node.js, Express, Spring Boot, FastAPI, Django'],
    ['Data and infra', 'Redis, PostgreSQL, MongoDB, Docker, AWS, GCP, Firebase, WebSockets'],
    ['AI and ML', 'PyTorch, CUDA, YOLO, LLM agents, NLP'],
    ['Automation', 'Playwright, Git, Linux'],
  ];

  /* ---------- render ---------- */
  $('#index').innerHTML = PROJECTS.map((p, i) => `
    <details name="work"${i === 1 ? ' open' : ''}>
      <summary><span class="p-name">${esc(p.name)}</span><span class="p-claim">${esc(p.claim)}</span><span class="p-stack">${esc(p.stack)}</span><span class="chev" aria-hidden="true"></span></summary>
      <div class="panel">
        <div class="art">${p.art}</div>
        <div class="facts">${p.facts.map((f) => `<p>${esc(f)}</p>`).join('')}<p><a href="${p.link[0]}" target="_blank" rel="noopener">${esc(p.link[1])} ↗</a></p></div>
      </div>
    </details>`).join('');
  $('#stack-list').innerHTML = STACK.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
  $('#year').textContent = new Date().getFullYear();

  /* ---------- theme ---------- */
  const root = document.documentElement, themeBtn = $('#theme');
  const sun = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const moon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';
  const setTheme = (t) => {
    root.dataset.theme = t; themeBtn.innerHTML = t === 'dark' ? sun : moon;
    try { localStorage.setItem('theme', t); } catch (_) { /* storage unavailable */ }
    $('meta[name="theme-color"]').content = t === 'dark' ? '#0e1114' : '#f5f6f6';
  };
  let saved = null; try { saved = localStorage.getItem('theme'); } catch (_) { /* ignore */ }
  setTheme(saved || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
  themeBtn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  /* ---------- active nav ---------- */
  const links = $$('.nav nav a'), sections = links.map((a) => $(a.getAttribute('href')));
  const onScroll = () => {
    const y = document.documentElement.scrollTop + 120; let cur = -1;
    sections.forEach((s, i) => { if (s && s.offsetTop <= y) cur = i; });
    links.forEach((a, i) => a.classList.toggle('on', i === cur));
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- command palette ---------- */
  const pal = $('#palette'), inp = $('#palette-input'), list = $('#palette-list');
  const open = (u) => window.open(u, '_blank', 'noopener');
  const CMDS = [
    ...[['Work', '#work'], ['Experience', '#experience'], ['About', '#about'], ['Stack', '#stack'], ['Contact', '#contact']].map(([l, h]) => ({ l: 'Go to ' + l, s: 'section', run: () => { location.hash = h; } })),
    ...PROJECTS.map((p) => ({ l: p.name, s: 'project', run: () => open(p.link[0]) })),
    { l: 'Open GitHub', s: 'link', run: () => open('https://github.com/Siddhesh-source') },
    { l: 'Open LinkedIn', s: 'link', run: () => open('https://www.linkedin.com/in/siddhesh-chaudhari3011') },
    { l: 'Open X', s: 'link', run: () => open('https://x.com/csiddhesh3011') },
    { l: 'Toggle theme', s: 'action', run: () => themeBtn.click() },
  ];
  let shown = [], sel = 0;
  const draw = () => { list.innerHTML = shown.map((c, i) => `<li class="${i === sel ? 'sel' : ''}" data-i="${i}">${esc(c.l)}<span>${c.s}</span></li>`).join('') || '<li><span>no matches</span></li>'; };
  const filter = () => { const q = inp.value.trim().toLowerCase(); shown = CMDS.filter((c) => c.l.toLowerCase().includes(q)); sel = 0; draw(); };
  const show = () => { pal.hidden = false; inp.value = ''; filter(); inp.focus(); };
  const hide = () => { pal.hidden = true; };
  const run = (i) => { const c = shown[i]; if (c) { hide(); c.run(); } };
  $('#open-palette').addEventListener('click', show);
  pal.addEventListener('click', (e) => { if (e.target === pal) hide(); });
  list.addEventListener('click', (e) => { const li = e.target.closest('li[data-i]'); if (li) run(+li.dataset.i); });
  inp.addEventListener('input', filter);
  inp.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, shown.length - 1); draw(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); draw(); e.preventDefault(); }
    else if (e.key === 'Enter') run(sel);
  });
  addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? show() : hide(); }
    else if (e.key === 'Escape' && !pal.hidden) hide();
  });
})();
