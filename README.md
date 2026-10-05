# Systems Console

Personal portfolio built as a working console: a file explorer, tabs, a terminal and a command palette, with a live simulation behind every project file. Static site, native ES modules, no build step, no dependencies.

## Run

```sh
npm start          # python -m http.server 8000, then open http://localhost:8000
npm run check      # theme contrast, data and registry integrity, simulation invariants (Node 20+)
```

ES modules need HTTP, so opening `index.html` from disk will not work. Any static host works; `vercel.json` is included for Vercel.

## Use it

| Key | Action |
|---|---|
| Ctrl P | quick open (fuzzy) |
| Ctrl K or Ctrl Shift P | command palette |
| Ctrl B | toggle explorer |
| Ctrl ` or Ctrl J | toggle terminal |
| Alt W | close tab |
| Alt 1..9 | jump to tab |
| Alt E | focus the explorer; j / k or arrows move, Enter opens |
| drag a separator | resize panes (arrow keys work too) |

Terminal: `help`, `ls`, `open <file>`, `cat <file>`, `run flash --n 800`, `run nexus`, `run ccml`, `run whispr "hi"`, `run quat phone, book`, `run trade 0.6 0.7 0.4`, `skills go`, `fundamentals`, `now`, `more ML`, `about`, `theme light`, `density comfortable`, `toggle terminal`. Tab completes, Up/Down is history.

Tabs, theme, density and pane sizes persist in localStorage. Deep links work: `/#/flash`.

## Files

| File | What it is |
|---|---|
| `README.md` | welcome and start-here commands |
| `about.md` | profile overview, with counts computed from the data |
| `skills.yaml` | skills in 7 areas; click a skill for its evidence, or a project to light up its skills. `*` = self-reported |
| `experience.yaml` | roles and education |
| `contact.md` | links and email |
| `projects/` | six featured projects with live widgets, plus `more.md` (13 other GitHub projects) |
| `learning/fundamentals.md` | DBMS, networks, OS and DSA, tied to the projects where each shows up |
| `learning/now.md` | what I am building and learning |

## Structure

```
index.html                  shell
DESIGN.md                   design intent, tokens, rules (source of truth for visuals)
src/
  main.js                   composes the shell, keyboard, deep links
  commands.js               one registry for the terminal and the palette
  data/                     projects.js, profile.js, about.js, skills.js, archive.js, learning.js, files.js
  components/               explorer, tabs, editor, views, profile-views, diagram, terminal, palette, statusbar, resize, boot
  widgets/                  one module per project: mount(host) for the pane, run(args, out) for the terminal
  lib/                      dom, store (persisted state), fuzzy, sim (flash-sale and trading logic)
  styles/                   tokens (both themes), layout, components
assets/                     fonts (woff2) and favicon
scripts/check.mjs           zero-dependency checks
```

## Edit the content

- Profile text and resume link: `src/data/about.js`. Email and education: `src/data/profile.js` (empty fields stay hidden).
- Featured projects: `src/data/projects.js`, plus a widget in `src/widgets/` registered in `widgets/index.js`, and a file name in `src/data/files.js`.
- Skills and their evidence: `src/data/skills.js`. A skill with no evidence is shown as self-reported.
- Other GitHub projects: `src/data/archive.js`. Check each against its README first.
- Core subjects, profile links (`profiles: [{ label, href }]`, https only) and current work: `src/data/learning.js`.
- `npm run check` fails on unknown evidence ids, duplicate entries, non-GitHub links, subjects without evidence, non-https profile links, and contrast below 4.5:1 in either theme.

## Notes

- The Whispr "ciphertext" is derived opaque bytes for illustration, not real libsignal output. Trading weights, Quatarly penalties and the flash-sale race are simulations. Each is labelled in the UI.
- The Whispr repository is private until it is opened.
