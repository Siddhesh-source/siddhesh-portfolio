# Systems Console

The portfolio as a working console: a file explorer, tabs, a terminal and a palette, with a live simulation behind every project file. Same static, no-build approach as the main site, and it shares its content and pure logic.

## Run

From the repo root:

```sh
npm start                 # then open http://localhost:8000/console/
npm run check:console     # contrast for both themes, registries, simulation invariants
```

ES modules need HTTP, so serve from the repo root (the console imports `../src/data` and fonts from `../assets`).

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

Terminal: `help`, `ls`, `open <file>`, `cat <file>`, `run flash --n 800`, `run nexus`, `run ccml`, `run whispr "hi"`, `run quat phone, book`, `run trade 0.6 0.7 0.4`, `theme light`, `density comfortable`, `toggle terminal`. Tab completes, Up/Down is history.

Tabs, theme, density and pane sizes persist in localStorage. Deep links work: `/console/#/flash`.

## Structure

```
console/
  index.html
  DESIGN.md                 design intent, tokens, rules for this direction
  src/
    main.js                 composes the shell, keyboard, deep links
    commands.js             one registry for terminal and palette
    data/files.js           virtual file tree, built from ../../src/data
    components/             explorer, tabs, editor, views, terminal, palette, statusbar, resize, boot
    widgets/                one module per project: mount(host) for the pane, run(args, out) for the terminal
    lib/                    store (persisted state), fuzzy
    styles/                 tokens (both themes), layout, components
  scripts/check.mjs
```

Shared with the main site (not copied): `../src/data/*`, `../src/lib/dom.js`, `../src/components/diagram.js`, the flash-sale simulation and trading composite, and the fonts.

## Add a project

Add it to `../src/data/projects.js`, then create `console/src/widgets/<id>.js` exporting `mount` and `run`, register it in `widgets/index.js`, and add its file name in `data/files.js` (`NAMES`). `npm run check:console` verifies the widget contract.

## Notes

- The Whispr "ciphertext" is derived opaque bytes for illustration, not real libsignal output. Trading weights, Quatarly penalties and the flash-sale race are simulations. Each is labelled in the UI.
- The Whispr repository link points to a private repo until it is made public.
