# How AI Is Changing How Work Gets Done

A premium, presenter-driven web keynote for Chamber of Commerce audiences. Full-screen slide deck with keyboard navigation, progressive in-slide reveals, cinematic transitions, and bespoke animated diagrams.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and press **F** for fullscreen presentation mode.

## Build & Deploy

```bash
npm run build    # outputs to dist/
npm run preview  # preview production build locally
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host. Share the link after your talk.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` / `Space` / `PageDown` | Advance step, then next slide |
| `←` / `PageUp` | Go back one step |
| `Home` / `End` | Jump to first / last slide |
| `1`–`8` | Jump directly to slide |
| `F` | Toggle fullscreen |
| `S` | Toggle speaker notes |
| `O` | Toggle slide overview grid |
| `Esc` | Close overlays |

## Editing Content

All slide copy, step counts, and speaker notes live in one file:

**[`src/content/slides.ts`](src/content/slides.ts)**

- **`steps`** — number of progressive reveal beats per slide (controls how many times you press → before advancing)
- **`speakerNotes`** — one note per step, shown when you press `S`
- **`predictions`** and **`finalStatement`** — closing slide content

Individual slide visuals are in **`src/slides/`** — edit layout and animations there.

## Architecture

```
src/
├── content/slides.ts      # Copy, notes, step counts
├── deck/                  # Slide engine (nav, progress, overlays)
├── components/            # Shared UI primitives
└── slides/                # One file per slide (01–08)
```

## Tech Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v4
- Motion (Framer Motion)
- Clash Display + Satoshi + Geist Mono

## Presentation Tips

1. **Rehearse with speaker notes** (`S`) — each step has a scripted note
2. **Use progressive reveals** — don't rush through steps; let animations land
3. **Slide 4 (Agentic Loop)** — advance through iterations to show the loop animating
4. **Slide 5 (Artifact Transform)** — drag the slider live to demonstrate before/after
5. **Pause on the opening question** — let the audience reflect before continuing
