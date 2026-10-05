# portfolio

Personal developer portfolio: poster-scale colour chapters, one per project, each with a live widget and a draggable architecture diagram. Static site, native ES modules, **no build step and no dependencies**.

## Two versions

- `/` Exhibit: colour chapters, one per project, each with a live demo.
- `/console/` Systems Console: an IDE-style portfolio with a terminal, palette and skills, fundamentals and more-projects pages. See `console/README.md`.

## Run

```sh
npm start          # python -m http.server 8000, then open http://localhost:8000
npm run check      # contrast (WCAG AA) + project data + simulation invariants (Node 20+)
```

ES modules need HTTP, so opening `index.html` from disk will not work. Any static host works (GitHub Pages, Netlify, Vercel): publish the repo root.

## Structure

```
index.html              shell: fonts, stylesheets, <main id="app">, module entry
src/
  main.js               composes chapters, rail and command palette
  data/                 content only
    projects.js         one entry per project chapter (copy, numeral, stack, diagram)
    profile.js          name, links, experience, stack
  components/           UI building blocks (no content)
    chapter.js hero.js closing.js diagram.js rail.js palette.js
  widgets/              one live demo per project, lazy-loaded
    index.js            registry: project id -> module
  styles/
    tokens.css          colours, type, spacing, chapter themes (from DESIGN.md)
    base.css layout.css components.css
  lib/dom.js            tiny h()/s() element helpers
assets/
  fonts/                self-hosted woff2 (Cabinet Grotesk, General Sans, JetBrains Mono)
  favicon.svg
scripts/check.mjs       zero-dependency checks
docs/ARCHITECTURE.md    how to extend it
DESIGN.md               design intent, tokens, rules (source of truth for visuals)
```

## Add a project

See `docs/ARCHITECTURE.md`. In short: data entry, widget module, registry line, theme in `tokens.css`, then `npm run check`.

## Principles

- Content lives in `src/data`, behaviour in `src/components` and `src/widgets`, look in `src/styles`.
- Every claim traces to a repository. Simulations and illustrative values are labelled on the page.
- Works without a framework, a bundler or a lockfile.
