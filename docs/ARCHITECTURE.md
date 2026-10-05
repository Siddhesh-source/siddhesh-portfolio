# Architecture

## Flow

`index.html` loads the four stylesheets and `src/main.js`. `main.js` builds the page from data:

```
profile + projects  ->  renderHero / renderChapter x N / renderClosing  ->  #app
                    ->  mountRail(chapters)      progress dots, j/k navigation
                    ->  mountPalette(commands)   Ctrl/Cmd+K
```

Each chapter renders its text and a tabbed panel. The panel's widget (`src/widgets/<id>.js`) and
diagram (`components/diagram.js`) mount lazily when the chapter is within 600px of the viewport.

## Add a project

1. **Data:** add an entry to `src/data/projects.js`: `id`, `short`, `theme`, `name`, `title`, `numeral`,
   `caption`, `text[]`, `stack[]`, `link`, and a `diagram` (`nodes`, `edges`, `trace`, `info` per node).
2. **Widget:** create `src/widgets/<id>.js` exporting `mount(host)` (optionally return a cleanup function).
3. **Registry:** add `<id>: () => import('./<id>.js')` to `src/widgets/index.js`.
4. **Theme:** add `.ch--<theme> { --bg; --fg; --panel }` to `src/styles/tokens.css`. Pick a measured pair.
5. **Check:** `npm run check` fails on contrast under 4.5:1, a missing widget or theme, bad diagram edges,
   non-https links, or a missing field.

## Rules

- Style only from tokens. No hard-coded hex outside `tokens.css`.
- Widgets are self-contained: no globals, no shared state, labelled when illustrative.
- Keep `DESIGN.md` in step with `tokens.css`; the check script reads `tokens.css`.
- Motion respects `prefers-reduced-motion` (handled globally in `base.css`).
