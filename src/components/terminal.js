import { h } from '../lib/dom.js';
import { files } from '../data/files.js';
import { createCommands, setCommands } from '../commands.js';

/** Real command line with history (Up/Down), completion (Tab) and clickable suggestions. */
export function mountTerminal(host, app) {
  const out = h('div', { class: 'term-out', role: 'log', 'aria-live': 'polite' });
  const input = h('input', { type: 'text', spellcheck: 'false', autocomplete: 'off', 'aria-label': 'Terminal command', placeholder: 'type help' });
  const closeBtn = h('button', { type: 'button', 'aria-label': 'Hide terminal', onclick: () => app.toggle('term') }, 'hide');
  host.append(h('div', { class: 'term' },
    h('div', { class: 'term-h' }, 'terminal', closeBtn),
    out,
    h('label', { class: 'term-in' }, h('span', { class: 'p' }, '$'), input)));

  const commands = setCommands(createCommands(app));
  const history = [];
  let hi = 0;

  const print = (text, cls = '') => { const d = h('div', { class: cls }, text); out.append(d); out.scrollTop = out.scrollHeight; return d; };
  app.print = print;
  app.clearTerm = () => out.replaceChildren();

  const parse = (line) => [...line.matchAll(/"([^"]*)"|(\S+)/g)].map((m) => m[1] ?? m[2]);

  async function exec(line) {
    const trimmed = line.trim(); if (!trimmed) return;
    history.push(trimmed); hi = history.length;
    print(`$ ${trimmed}`, 'muted');
    const [name, ...args] = parse(trimmed);
    const cmd = commands.find((c) => c.name === name);
    if (!cmd) {
      const d = print(`command not found: ${name}. try `);
      d.append(h('button', { class: 'sug', type: 'button', onclick: () => exec('help') }, 'help'));
      return;
    }
    try { await cmd.run(args, print); } catch (err) { print(String(err.message || err), 'err'); }
  }
  app.exec = (line) => { app.show('term'); return exec(line); };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { const v = input.value; input.value = ''; exec(v); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); hi = Math.max(0, hi - 1); input.value = history[hi] ?? ''; }
    else if (e.key === 'ArrowDown') { e.preventDefault(); hi = Math.min(history.length, hi + 1); input.value = history[hi] ?? ''; }
    else if (e.key === 'Tab') {
      e.preventDefault();
      const parts = input.value.split(/\s+/), last = parts.at(-1).toLowerCase();
      const pool = parts.length === 1 ? commands.map((c) => c.name) : files.flatMap((f) => [f.name, f.id]);
      const hit = pool.find((x) => x.toLowerCase().startsWith(last));
      if (hit) { parts[parts.length - 1] = hit; input.value = parts.join(' ') + (parts.length === 1 ? ' ' : ''); }
    } else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); app.clearTerm(); }
  });

  print('Systems Console. Type ', 'muted').append(h('button', { class: 'sug', type: 'button', onclick: () => exec('help') }, 'help'), ' or click a suggestion: ',
    h('button', { class: 'sug', type: 'button', onclick: () => exec('run flash --n 800') }, 'run flash --n 800'));
  return { focus: () => input.focus() };
}
