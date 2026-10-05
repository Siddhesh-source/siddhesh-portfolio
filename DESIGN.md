---
# gstack: design-md-format=spec
name: Siddhesh Chaudhari portfolio
description: Poster-scale colour chapters, one per project, each carrying a live widget that proves the claim.
colors:
  ink: "#0C0F12"
  concrete: "#E8EBEE"
  on-dark: "#FFFFFF"
  cobalt: "#1B2BFF"
  black: "#0C0C0C"
  amber: "#FF9D2E"
  green: "#0D7A3E"
  mint: "#EAFFD9"
  red: "#D92D20"
  teal: "#0B6E7F"
  yellow: "#F6D44A"
typography:
  display:
    fontFamily: Cabinet Grotesk
    fontWeight: 800
    fontSize: clamp(2.5rem, 7vw, 6rem)
    letterSpacing: -0.04em
  body:
    fontFamily: General Sans
    fontWeight: 500
    fontSize: 1.0625rem
    lineHeight: 1.55
  label:
    fontFamily: JetBrains Mono
    fontWeight: 500
    fontSize: 0.75rem
    letterSpacing: 0.08em
  mono:
    fontFamily: JetBrains Mono
    fontWeight: 400
    fontFeature: tnum
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
---

# Siddhesh Chaudhari portfolio

## Overview

**Creative North Star:** An exhibit of working objects. Each project is a poster in its own colour, with something to touch, so the visitor learns how it works by using it.
**Product context:** Personal portfolio of a software engineer (full stack, AI/ML, infra, distributed systems, internals). Audience: engineers and hiring managers skimming for ten seconds, then reading one project closely.
**Mode per surface:** Experience for the project chapters and hero. Read for any long copy. No Persuade surface.
**Memorable thing:** He knows what is under the hood.
**Key characteristics:**
- One flat colour owns the viewport at a time. The colour changes as you scroll.
- Giant display type, tight tracking, left-aligned.
- Facts set as display numerals (223, 10,000+, 0 oversold, 7.4e-06), each with a mono caption.
- A live widget and a drawn diagram in every chapter.
- No gradients, glow, blobs, particles, icon tiles or stat strips.

## Colors

**Strategy:** Drenched. One hue per chapter owns the surface; text is the paired colour. The hero uses the cool concrete neutral; the closing chapter uses ink.
**Light or dark:** Decided by the chapter, not a toggle. Use scene: a laptop in daylight or an evening desk; saturated flat colour holds in both.

| Chapter | Surface | Text | Contrast |
|---|---|---|---|
| Hero | concrete | ink | 15:1 |
| Whispr | cobalt | on-dark | 8:1 |
| NexusOS | black | amber | 9:1 |
| ccml | green | mint | 5.3:1 |
| Flash Sale | red | on-dark | 5.0:1 |
| Quatarly | teal | on-dark | 5.7:1 |
| Trading Engine | yellow | ink | 13:1 |
| Closing | ink | on-dark | 18:1 |

Contrast is checked per pair before a colour ships. Interactive controls inside a chapter use the chapter's text colour as border and the inverse as fill. Overlays on a chapter use a black or white tint at 22 to 35 percent, never a new hue.

## Typography

Cabinet Grotesk (Fontshare) is the display voice: a utilitarian grotesk with enough character to carry giant type. General Sans (Fontshare) is the body: neutral and legible at 17px. JetBrains Mono (Google Fonts) carries labels, data and widget output. All three are self-hosted woff2 with `font-display: swap`. Instrument Sans was dropped because it is on the overused-as-display list.

- Scale: ratio 1.333. Display is capped at 6rem so the page reads as chapters, not one poster.
- Data as type: key facts are set as display numerals in the chapter, with a mono caption stating what they mean and where they come from.
- Tabular numerals on all data.

## Layout

Twelve-column grid, 7vw side padding, chapters at least 100vh with scroll-snap. Headline spans the width; text sits left and the widget right. Asymmetry is deliberate. Below 860px everything stacks and snap relaxes. Max prose width 46ch.

## Elevation & Depth

Flat. Depth comes from colour change between chapters and from 1.5px borders on widgets. Widget panels use a black tint at 22 percent over the chapter colour. No shadows, no blur, no glow.

## Shapes

Radius hierarchy: sm 4px for chips and inputs, md 8px for buttons, lg 12px for widget panels. Nested elements use the outer radius minus the gap. Pills (full) are reserved for toggles and stack tags.

## Components

- **Chapter:** full-viewport section with number label, display headline, text column, widget panel.
- **Widget:** bordered panel, mono type. Every widget has a visible state, a reset, and an honest label when data is illustrative.
- **Diagram:** inline SVG with draggable nodes and a trace control. Keyboard operable.
- **Chapter rail:** fixed dots with progress. Links to chapters.
- **Command palette:** Ctrl K, lists chapters and links.
- **States:** hover raises contrast, focus-visible uses a 2px outline in the text colour with 3px offset, disabled drops to 40 percent opacity.

## Do's and Don'ts

- Do keep every claim traceable to a repo. Label simulations and illustrative values as such.
- Do check contrast for each chapter pair before shipping a colour.
- Do keep touch targets at 44px and every widget reachable by keyboard.
- Do put one idea per chapter: one claim, one widget, one numeral.
- Don't add gradients, glow, particles, blobs, wavy dividers or icon tiles.
- Don't add a stats strip, a three-up card grid or a testimonial row.
- Don't set display above 6rem or use a kicker above headlines.
- Don't introduce a seventh accent hue; new chapters reuse the pairs above or get a new measured pair.

## Motion

- **Approach:** intentional.
- **Easing:** enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration:** micro(50-100ms) short(150-250ms) medium(250-400ms) long(400-700ms)
- **The one authored moment:** on chapter entry the headline rises 16px and fades in over 300ms, once. Bars grow on entry. Widgets respond to input only. Scroll-snap between chapters. `prefers-reduced-motion` disables all of it.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-10-05 | Initial system (amber, Instrument Sans, project index) | First build; judged generic and low on interactivity |
| 2026-10-05 | Replaced with Exhibit direction: drenched colour chapters, live widgets | /design-shotgun, chosen by the owner over Console and Blueprint |
| 2026-10-05 | Cabinet Grotesk + General Sans replace Instrument Sans | Instrument Sans is overused as display; both new faces verified on Fontshare |
| 2026-10-05 | Data set as display numerals, no stat strip | Facts belong inside their project; a stat strip is a template tell |
