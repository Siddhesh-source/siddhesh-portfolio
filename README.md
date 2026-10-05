# portfolio

Personal developer portfolio. A single static page: plain HTML, CSS and JavaScript with no build step and no dependencies.

## Features

- Dark and light themes (follows system preference, persisted)
- Command palette (`Ctrl/Cmd + K`) to jump to sections, projects and links
- Project cards with category filters, cursor glow and tilt
- Animated terminal intro, typing roles, and a cursor-reactive background
- Live GitHub counts (repos, followers) with static fallbacks
- Respects `prefers-reduced-motion`; responsive down to phone width

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python -m http.server 8000
```

## Structure

```
index.html   markup and sections
styles.css   theme tokens, layout, components
script.js    data, rendering, interactions
```

Project, stack and role content lives in the data constants at the top of `script.js`.

## Deploy

Works as-is on GitHub Pages, Netlify or Vercel: publish the repository root.
