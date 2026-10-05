# portfolio

Personal developer portfolio. A single static page: plain HTML, CSS and JavaScript with no build step and no dependencies.

## Features

- Project index where each row opens to its real artifact: architecture flow, boot log, benchmark, request path
- Hero diagram of the Whispr message flow that draws itself once
- Dark and light themes (follows system preference, persisted), one amber accent
- Command palette (`Ctrl/Cmd + K`) for sections, projects and links
- Self-hosted fonts, no external requests; works without JavaScript for static content
- Respects `prefers-reduced-motion`; responsive down to phone width; 44px touch targets

Design rules and tokens live in `DESIGN.md`.

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python -m http.server 8000
```

## Structure

```
index.html   markup and sections
styles.css   theme tokens, layout, components
script.js    project and stack data, rendering, palette, theme
fonts/       self-hosted woff2 files
DESIGN.md    design intent, tokens, rules
```

Project, stack and role content lives in the data constants at the top of `script.js`.

## Deploy

Works as-is on GitHub Pages, Netlify or Vercel: publish the repository root.
