---
# gstack: design-md-format=spec
name: Siddhesh Chaudhari portfolio, Systems Console
description: "An IDE and ops-console for a portfolio: dense, keyboard-first, flat, with a live simulation behind every project file."
colors:
  ground: "#0E1319"
  surface: "#141B22"
  line: "#243038"
  text: "#DCE4EA"
  text-muted: "#8795A1"
  accent: "#7FB7FF"
  on-accent: "#0E1319"
  ok: "#7BD88F"
  warn: "#F2C265"
  error: "#FF7A7A"
  ground-light: "#F4F6F8"
  surface-light: "#FFFFFF"
  line-light: "#D5DCE3"
  text-light: "#121820"
  text-muted-light: "#55616D"
  accent-light: "#1F5FBF"
  on-accent-light: "#FFFFFF"
typography:
  display:
    fontFamily: Cabinet Grotesk
    fontWeight: 800
    fontSize: 2.5rem
    letterSpacing: -0.03em
  body:
    fontFamily: General Sans
    fontWeight: 500
    fontSize: 0.9375rem
    lineHeight: 1.55
  label:
    fontFamily: JetBrains Mono
    fontWeight: 500
    fontSize: 0.75rem
    letterSpacing: 0.08em
  mono:
    fontFamily: JetBrains Mono
    fontWeight: 400
    fontSize: 0.8125rem
    fontFeature: tnum
rounded:
  sm: 4px
  md: 6px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
---

# Siddhesh Chaudhari portfolio, Systems Console

## Overview

**Creative North Star:** A working console, not a brochure. Every project is a file you open, run and poke, so the visitor learns how it works by operating it.
**Product context:** Portfolio of a software engineer (SDE first, targeting SDE plus AI, infra and ML roles): end to end, deep in AI, ML and infra, with strong fundamentals (DBMS, networks, OS, DSA). Audience: engineers and hiring managers who read code for a living.
**Mode per surface:** Operate for the shell (explorer, tabs, terminal, palette). Experience for the welcome tab and project panes.
**Memorable thing:** A software engineer who builds end to end and goes deep in AI, ML and infra.
**Key characteristics:**
- Dense and flat. Rows are 28px, borders are 1px, nothing glows.
- Keyboard first. Every action has a key and a terminal command.
- One accent. Status colours only ever mean state.
- A live widget and a draggable architecture diagram for every project file.

## Colors

**Strategy:** Restrained. One accent (ice blue) plus three status colours (ok, warn, error) that mean state and nothing else. Neutrals are tinted toward the accent hue.
**Light or dark:** Dark is the default for long reading in dim rooms; light is an IDE theme switch for daylight. Both are first-class and checked.

| Pair | Dark | Light |
|---|---|---|
| text on ground | 14.6:1 | 17:1 |
| text-muted on ground | 6.1:1 | 5.9:1 |
| accent on surface | 9:1 | 6.5:1 |
| on-accent on accent | 9:1 | 6.5:1 |
| ok / warn / error on surface | each above 7:1 | status colours darken in light mode |

`scripts/check.mjs` reads `src/styles/tokens.css` and fails below 4.5:1. The prototype's neon cyan was dropped as the near-black plus neon default.

## Typography

JetBrains Mono (Google Fonts, self-hosted) carries chrome, tree, tabs, terminal and all data at 13px with tabular numerals. General Sans (Fontshare, self-hosted) carries prose and pane headings. Cabinet Grotesk 800 (Fontshare, self-hosted) is used once, for the name on the welcome tab. All woff2 with `font-display: swap`; files live in `../assets/fonts`.

## Layout

Top bar 32px, tabs 34px, tree rows 28px, status bar 24px. Explorer (160 to 420px), editor, inspector (240 to 520px), and a terminal panel (100px to 50vh). All three are resizable by drag or arrow keys on the separator, and collapsible. Below 860px the explorer is a drawer, the inspector folds under the widget, and the terminal is a bottom sheet. Density toggles between compact and comfortable.

## Elevation & Depth

Flat. Depth is surface versus ground plus a 1px line. Menus and the palette sit on surface with a line border. No shadow, blur or glow.

## Shapes

4px for inputs, chips and tree rows. 6px for panels and the palette. Full radius only for toggles.

## Components

- **Explorer:** tree of folders and files with a kind dot, arrow-key and j/k navigation, Enter opens.
- **Tabs:** close button, middle-click and Alt W close, Alt 1 to 9 jump.
- **Editor pane:** heading, numeral line in mono, widget, facts. One idea per pane.
- **Skills matrix:** chips grouped by area. Selecting a skill lists the projects that evidence it; selecting a project lights up its skills. Self-reported skills carry `*`.
- **Fundamentals cards:** one per core subject (DBMS, networks, OS, DSA), each listing the real projects where it shows up. A profiles row appears only when links exist.
- **Inspector:** draggable architecture diagram, stack chips, source link.
- **Terminal:** real command line with history, completion and clickable suggestions.
- **Palette:** Ctrl P quick-open (fuzzy), Ctrl K commands.
- **Status bar:** branch, active file, theme, density, terminal toggle.
- **States:** hover tints the row, focus-visible is a 2px accent outline with 2px offset, disabled is 40 percent.

## Do's and Don'ts

- Do keep every claim traceable to a repo; label simulations and illustrative values.
- Do give every action a keyboard path and a terminal command.
- Do keep touch targets at 44px on coarse pointers and every widget operable by keyboard.
- Don't use accent for decoration; it marks the active thing.
- Don't add glow, gradients, blur, blobs or illustrations.
- Don't add a stats strip, a card grid or a testimonial row.
- Don't hide an action behind hover only.

## Motion

- **Approach:** intentional, mostly functional.
- **Easing:** enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration:** micro(50-100ms) short(150-250ms) medium(250-400ms) long(400-700ms)
- **The one authored moment:** a sub-second boot sequence on first visit per session, using real boot-log lines from the NexusOS README. Any key skips it. Simulations animate only on Run. `prefers-reduced-motion` disables all of it.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-10-05 | Console direction built as console/ beside the Exhibit site | Owner chose prototype A; shared data keeps facts in one place |
| 2026-10-05 | Ice-blue accent replaces neon cyan | Near-black plus neon is a default look; restrained accent is more distinctive |
| 2026-10-05 | Dark default with light theme | IDE convention; use scene is reading code in dim or bright rooms |
| 2026-10-05 | Terminal is a real interface | Matches the audience and gives every widget a keyboard path |
| 2026-10-05 | Message reworded: software engineer, SDE first, with AI, ML and infra depth; education and email added | Owner target roles: SDE plus AI/infra/ML, SDE preferred |
| 2026-10-05 | Core message is range plus depth, not a single specialty; DSA tracker detail removed, replaced by a fundamentals page | Owner direction: general-purpose engineer, end to end, strengthening DBMS, CN, OS, DSA |
