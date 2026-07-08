# Presentation Script — How AI Is Changing How Work Gets Done

> ## **To practice aloud → open [PRACTICE_SCRIPT.md](./PRACTICE_SCRIPT.md)**
>
> That file has every line labeled **SAY:** in blockquotes — read it top to bottom with a timer.  
> This file is the presenter guide (timing, cues, demo setup). The exact words live in `PRACTICE_SCRIPT.md`.

**Event:** Chamber of Commerce  
**Date:** July 9th, 2026  
**Presenter:** Alex Lindberg | Elite AI  
**Audience:** ~8 local small business owners, mixed industries  
**Format:** ~35–40 min talk + ~10 min Q&A  
**Deck:** Web keynote at `http://localhost:5173` (press `F` fullscreen, `S` speaker notes)

---

## How to Use These Files

| File | What's in it |
|------|----------------|
| **[PRACTICE_SCRIPT.md](./PRACTICE_SCRIPT.md)** | **Exact words to say** — labeled `SAY:` in blockquotes. Open this to rehearse. |
| **PRESENTATION_SCRIPT.md** (this file) | Timing, on-screen cues, demo setup, Q&A topics, refinement log |

Press `→` in the deck at each **STEP** marker in the practice script.

---

# PART I — PRESENTER GUIDE

---

## Talk Overview

### Goals

1. **Mindset shift** — Help owners see that AI is changing *how work gets done*, not just adding another tool.
2. **Practical first steps** — Show how productive people become when AI is on their side.
3. **Defuse common fears** — Job replacement, "I'm not technical," cost, data privacy, "ChatGPT wasn't useful."

### Time Budget

| Section | Slides / Demo | Target | Flex |
|---------|---------------|--------|------|
| Opening + hook | Slide 1 (3 steps) | 4 min | Can trim to 3 min |
| The problem today | Slide 2 (7 steps) | 7 min | Trim steps 4–5 if behind |
| How AI is evolving | Slide 3 (6 steps) | 5 min | Keep tight |
| The agentic loop | Slide 4 (5 steps) | 5 min | Advance iterations quickly |
| Artifacts are changing | Slide 5 (4 steps) | 3 min | In-deck slider only |
| **Demo 1: ChatGPT Sites** | Window switch | 6 min | Use backup if slow |
| AI + your systems | Slide 6 (5 steps) | 4 min | Sets up Demo 2 |
| **Demo 2: Cursor + QBO** | Window switch | 7 min | CSV fallback if OAuth fails |
| Future workflow | Slide 7 (4 steps) | 3 min | |
| Close + predictions | Slide 8 (5 steps) | 4 min | Let final line breathe |
| **Q&A** | — | ~10 min | |
| **Total talk** | | **~38 min** | Buffer: 2–3 min from Slide 2 or 3 |

### Rehearsal Notes

Run Part II aloud with a timer. Expected speak rate: ~130 words/min.

| Component | Estimate |
|-----------|----------|
| Part II speakable text | ~1,400 words ≈ 11 min |
| Demo 1 (ChatGPT Sites) | 6 min (includes generation wait) |
| Demo 2 (Cursor + QBO) | 7 min (includes script run wait) |
| Animation pauses, audience moments | ~10–14 min |
| **Estimated total talk** | **~34–38 min** |

**Checkpoints — if over by 3+ min, cut here:**

| Checkpoint | Cumulative | Cut |
|------------|------------|-----|
| End Slide 2 | ~11 min | Steps 4–5 narration |
| End Slide 4 | ~21 min | One value-chain stage |
| End Demo 1 | ~30 min | Use pre-built Site |
| End Demo 2 | ~37 min | Skip invoice-creation punch |
| End Slide 8 | ~41 min | One sentence per prediction |

**Window layout for demos:**
- **Dual monitor:** Deck on one screen, demos on the other
- **Single monitor:** Alt+Tab; bookmark order: Deck → ChatGPT → QBO → Cursor

### Presenter Bio

Alex Lindberg runs Elite AI — a one-person company helping businesses implement high-impact technology solutions to modernize their operations. Previously presented to this Chamber group ~1 year ago at Dial One. Today's talk: how AI is changing how work gets done (not a survey of every new tool).

### Recurring Themes Checklist

- [ ] **Humans move up the value chain** — Slides 2, 7, 8
- [ ] **Artifacts become interactive** — Slide 5 + Demo 1
- [ ] **AI + your data beats generic AI** — Slide 6 + Demo 2
- [ ] **Agents iterate; software doesn't** — Slide 4 + Demo 2
- [ ] **Address all five objections naturally** — see Objection Map

### Objection Handling Map

| Fear | Where | Anchor line (in Part II) |
|------|-------|--------------------------|
| Job replacement | Slides 2, 7, 8 | "Humans move higher in the value chain" |
| Not technical | Demo 2 | "I am not a QuickBooks power user" |
| Too expensive | Slide 6, Q&A | "You already pay for software" |
| Data privacy | Slide 6, Q&A | "You decide what AI sees" |
| ChatGPT wasn't useful | Opening, Demo 1 | "That gap is exactly what we're here to talk about" |

---

## Demo Runbooks

> **Exact demo wording → [PRACTICE_SCRIPT.md](./PRACTICE_SCRIPT.md#demo-1--chatgpt-sites)**

---

### Demo 1: ChatGPT Sites

| | |
|---|---|
| **Placement** | After Slide 5, step 1 — before in-deck slider |
| **Duration** | 6 min |
| **Narrative beat** | Static PDF/report → interactive site as the deliverable |

**Window setup:** Deck tab → ChatGPT tab → Backup Site tab (bookmark all three)

**Live prompt** — copy from Part II or Notes app before talk.

**Backup if WiFi/generation fails:** Switch to pre-built Site; say "I built this one ahead of time — same idea."

**Prep checklist:**
- [ ] ChatGPT Plus with Sites confirmed working
- [ ] Backup Site created and bookmarked
- [ ] Prompt in Notes app
- [ ] Test 48 hours before event
- [ ] Venue WiFi or phone hotspot ready

---

### Demo 2: Cursor + QuickBooks Online Sandbox

| | |
|---|---|
| **Placement** | After Slide 6, step 5 |
| **Duration** | 7 min |
| **Narrative beat** | AI as super-user layer over software you already use |

**Why QBO sandbox:** Full QuickBooks UI with ~29 customers, ~146 transactions, sample "Party Planning Services" company. API changes visible when you refresh the QBO tab.

**One-time setup:**
1. [developer.intuit.com](https://developer.intuit.com) → create account
2. My Hub → Sandboxes → QBO Plus → US → Create
3. Create app "Elite AI Demo" → get Client ID + Secret
4. [OAuth 2.0 Playground](https://developer.intuit.com/app/developer/playground) → Refresh Token + Realm ID
5. Copy to `demo/qbo/.env` (see `demo/qbo/.env.example`)

**Split-screen layout:** Cursor + terminal left | QBO browser tab right

**Risk mitigation:**

| Risk | Mitigation |
|------|------------|
| OAuth expired | Run scripts 30 min before; test end-to-end |
| API fails on stage | CSV export fallback — see Part II Demo 2 fallback block |
| Terminal too small | `Cmd + +` or output to markdown file in browser |

**Prep checklist:**
- [ ] Sandbox created and bookmarked
- [ ] `.env` populated with refresh token
- [ ] `query-overdue.js` tested (build during rehearsal)
- [ ] Screen recording backup saved
- [ ] CSV export fallback prepared

---

## Slide-by-Slide Guide

Press `→` to advance steps. Press `S` for in-deck speaker notes.

> **Exact wording for every step → [PRACTICE_SCRIPT.md](./PRACTICE_SCRIPT.md)**

---

### Slide 1 — Opening (~4 min)

**On-screen:** Title animates — "How AI Is Changing How Work Gets Done." Date, name, Elite AI, subtitle. (Visual is static after load — use → for pacing beats.)

| Step | Time | Intent |
|------|------|--------|
| 0 | ~1 min | Thank you; Dial One callback; reintro — Alex Lindberg, Elite AI, one-person shop, modernizing operations |
| 1 | ~1.5 min | AI moved fast since last talk; today's goal is *how work gets done*, not every tool/trend |
| 2 | ~1.5 min | Productivity without deep technical background; walk through concepts leaders should experiment with |

**Notes:** Returning audience — the Dial One reference builds credibility. Hand-raise poll removed in favor of direct framing.  
**Transition:** Pause, then → to Slide 2.

---

### Slide 2 — How Work Traditionally Happens (~7 min)

**On-screen:** Kicker "The Status Quo." Vertical workflow diagram builds.

| Step | Time | On-screen cue | Intent |
|------|------|---------------|--------|
| 0 | 30 sec | Title only | "This is how most businesses work today" |
| 1 | 1 min | Business Systems | Information lives in disconnected systems |
| 2 | 1 min | Humans (highlighted) | Humans are the connective tissue |
| 3 | 1 min | PDF/Excel/Word/Email tags | Name the artifacts of knowledge work |
| 4 | 45 sec | Information in motion animation | Handoffs = delay + error risk |
| 5 | 45 sec | Reports + Meetings nodes | Meetings exist because info is scattered |
| 6 | 1 min | Decisions node + insight card | Decisions wait on slow assembly |
| 7 | 1 min | Full insight visible | Key line: humans move information, not value |

**Audience moment (step 6):** "Does this sound familiar?"  
**Objection weave:** Plants "humans aren't replaced — they're the glue today."  
**Transition:** "So what changes?"

---

### Slide 3 — AI Moves Up The Value Chain (~5 min)

**On-screen:** Kicker "Evolution." Five-stage horizontal progression.

| Step | Time | On-screen cue | Intent |
|------|------|---------------|--------|
| 0 | 30 sec | Title | AI role is shifting — historical frame |
| 1 | 45 sec | Calculator | Assists computation |
| 2 | 45 sec | Software | Stores information |
| 3 | 45 sec | Automation | Repeats rules |
| 4 | 45 sec | AI | Reasons over unstructured data |
| 5 | 1 min | Agent + bottom card | Agents pursue goals; AI participates in work |

**Transition:** "What does that look like? The agentic loop."

---

### Slide 4 — The Agentic Loop (~5 min)

**On-screen:** Kicker "The Shift." Loop SVG + comparison cards.

| Step | Time | On-screen cue | Intent |
|------|------|---------------|--------|
| 0 | 30 sec | Title | Name the mental model |
| 1 | 1 min | Loop draws: Goal→Think→Act→Observe | Explain iteration until goal met |
| 2 | 1 min | Traditional Software card | Input→Output, one pass |
| 3 | 1 min | Agent card + iteration counter | Goal→Iterate→Complete; let animation run |
| 4 | 45 sec | Bottom line visible | "This is why AI feels different" |

**Audience moment (step 3):** Let loop animate 2–3 iterations before advancing.  
**Transition:** "Two things change in practice — outputs and connections."

---

### Slide 5 — Interactive Artifact Transformation (~3 min + Demo 1)

**On-screen:** Kicker "Transformation." Before/after slider.

| Step | Time | On-screen cue | Intent |
|------|------|---------------|--------|
| 0 | 30 sec | Title | AI changes what work *produces* |
| 1 | 45 sec | Subtitle line | Name weekly outputs: proposals, reports, recaps |
| — | 6 min | **→ DEMO 1** | ChatGPT Sites — window switch |
| 2 | 1 min | Slider + example tabs | Drag slider; click Proposal/Report/Agenda tabs |
| 3 | 45 sec | Bottom insight line | Artifact becomes a tool |

**Transition:** "Interactive outputs are half the story. Where AI gets its information is the other half."

---

### Slide 6 — AI Connected To Business Systems (~4 min + Demo 2)

**On-screen:** Kicker "Architecture." Hub diagram — AI Agent center, systems around it.

| Step | Time | On-screen cue | Intent |
|------|------|---------------|--------|
| 0 | 30 sec | Title | Most important section for leaders |
| 1 | 45 sec | System nodes appear | Name their existing tools |
| 2 | 45 sec | Connection lines | Generic AI ≠ connected AI |
| 3 | 45 sec | Data pulses inward | Connected AI = super-powered team member |
| 4 | 45 sec | Key insight card glows | Layer above systems, not replacement |
| 5 | 30 sec | Subtext visible | Proprietary context = competitive moat |
| — | 7 min | **→ DEMO 2** | Cursor + QBO — window switch |

**Objection weave (step 3):** Data privacy — intentional connection.  
**Transition:** "Let me show you what this looks like in practice."

---

### Slide 7 — Future Workflow (~3 min)

**On-screen:** Kicker "The Shift Ahead." Today vs Future side-by-side.

| Step | Time | On-screen cue | Intent |
|------|------|---------------|--------|
| 0 | 30 sec | Title | Two pictures: today and emerging |
| 1 | 1 min | Today column | Human is bottleneck at every step |
| 2 | 45 sec | Future column | AI handles analysis; human decides |
| 3 | 45 sec | Both columns | Human step moved, not removed |
| 4 | 45 sec | Key message card | Humans move up the value chain |

**Objection weave (step 3):** Job replacement — "Your people aren't replaced. They're elevated."  
**Transition:** "Three predictions."

---

### Slide 8 — Closing (~4 min)

**On-screen:** Kicker "Looking Ahead." Three predictions → full-screen final statement.

| Step | Time | On-screen cue | Intent |
|------|------|---------------|--------|
| 0 | 30 sec | Title | Frame as directions you're already seeing |
| 1 | 45 sec | Prediction 01 | AI assistant as infrastructure |
| 2 | 45 sec | Prediction 02 | Artifacts become interactive |
| 3 | 45 sec | Prediction 03 | Business context = moat |
| 4 | 1 min | Full-screen final statement | Read closing lines slowly; thank audience |

**Audience moment (step 4):** 3–4 seconds of silence after final line.  
**Transition:** Open Q&A (~10 min).

---

## Q&A Prep

> **Exact Q&A answers → [PRACTICE_SCRIPT.md](./PRACTICE_SCRIPT.md#qa--exact-answers)**

Likely topics: job replacement, not technical, cost, data privacy, ChatGPT disappointment, where to start, industry fit, hiring help, accuracy, urgency.

---

## Refinement Log

### Opening / Personal Story
- [x] Dial One callback (~1 year ago) — in opening script
- [x] Elite AI intro — one-person company, high-impact tech solutions
- [ ] Add exact city name if desired
- [ ] Confirm industries of the 8 owners before July 9

### Demo 1 — ChatGPT Sites
- [ ] Final scenario: Summit Plumbing vs bakery vs agency
- [ ] Create and bookmark backup Site
- [ ] Test venue WiFi / hotspot

### Demo 2 — Cursor + QBO
- [ ] Complete sandbox setup
- [ ] Build and test `demo/qbo/` scripts
- [ ] Decide: read-only query vs invoice-creation punch
- [ ] Record screen backup

### Close
- [ ] Mention Elite AI services explicitly, or stay educational?
- [ ] Business card / contact mention?

### Rehearsal Timing (Fill In After Part II Run-Through)

| Section | Target | Actual | Notes |
|---------|--------|--------|-------|
| Slide 1 | 4 min | | |
| Slide 2 | 7 min | | |
| Slide 3 | 5 min | | |
| Slide 4 | 5 min | | |
| Slide 5 | 3 min | | |
| Demo 1 | 6 min | | |
| Slide 6 | 4 min | | |
| Demo 2 | 7 min | | |
| Slide 7 | 3 min | | |
| Slide 8 | 4 min | | |
| **Total** | **~38 min** | | |

---

# Practice Script (Exact Wording)

All spoken lines are in **[PRACTICE_SCRIPT.md](./PRACTICE_SCRIPT.md)** — open that file to rehearse.

Every block is labeled **SAY:** in blockquotes so you can read it aloud top to bottom.

---

*Last updated: guide + practice script split into two files.*
