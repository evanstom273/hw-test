# GAME_DESIGN.md

Authoritative, living record of the game's design. Timestamps are Europe/London, ISO 8601 with UTC offset, recorded at the time the decision was confirmed in conversation unless marked otherwise.

---

## A. Project Overview

A game **in the vein of Happy Wheels, including the gore and destruction**, with its art made from **SVGs** (History #1). **Its own game in that genre, not a recreation of Happy Wheels** (History #3). Working title: none yet; the repository is `hw-test`.

History #1–#3 were decided in conversation a few minutes before this document existed; their timestamps are documentation time.

**Where the project stands (as of 2026-11-16T05:12:50+00:00):**
- Living design document created (History #4). Nothing built yet.

**Stack:** React, Vite, TypeScript, Tailwind CSS, Phaser, IndexedDB via Dexie.js and Cloudflare Workers: Lyra's normal stack (History #2). What each part handles is not decided yet.

**Guiding principles** *(carried over from Lyra's previous project's design document; flag if any don't apply here)*:
- Discuss → Decide → Document → Implement → Test → Expand.
- Small, polished and functional beats large and placeholder-filled.
- The creative director (Lyra) makes design decisions; recommendations are not decisions until approved.

---

## B. Confirmed Design Decisions

### Concept
- **A game like Happy Wheels, including all the gore and destruction, using SVGs.** *(2026-11-16T05:12:50+00:00 — History #1)*
- **Not a recreation of Happy Wheels.** An original game in the genre: none of Happy Wheels' characters, art, levels or name. *(2026-11-16T05:12:50+00:00 — History #3)*

### Technical architecture / platform
- **Stack: React, Vite, TypeScript, Tailwind CSS, Phaser, IndexedDB via Dexie.js, Cloudflare Workers.** *(2026-11-16T05:12:50+00:00 — History #2)*

### Documentation
- **Living `GAME_DESIGN.md`**, using the format of Lyra's previous project's design document, filled in with everything decided and done as the project goes. *(2026-11-16T05:12:50+00:00 — History #4)*

---

## C. Current Development Scope

Nothing in development yet. The repository holds only this document and the README.

---

## D. Future Possibilities

*Proposals only — not confirmed features.*

- **SVG asset pipeline** (Claude, 2026-11-16): joint pivot points marked inside each body part's SVG (e.g. `id="joint-elbow"`) and read at load time, so the physics rig lines up with the art automatically; level terrain drawn as SVG paths and converted into physics collision lines, so levels could be drawn in Inkscape or Figma.
- **Replays or ghost runs** (Claude, 2026-11-16): would need physics that gives identical results across browsers (Rapier can; Planck.js isn't guaranteed to).

---

## E. Open Questions

1. **Title.**
2. **Everything about the game itself.**
3. **Physics engine.** Claude recommended **Planck.js** (a TypeScript port of Box2D) driving the physics, with Phaser handling rendering, camera, input and particles. Reasoning: Arcade physics is boxes only; Matter.js has springy joints, no proper joint limits, and no release since mid-2024; Box2D-style joints (revolute with limits and motors, wheel joints with suspension, readable joint forces) are what this genre is built on. box2d3-wasm is the faster alternative if needed. Not decided.
4. **What each part of the stack handles**, including what Cloudflare Workers is for, and where the game is deployed.

---

## F. Implementation Status

*Updated 2026-11-16T05:12:50+00:00.*

| Feature | Status | Notes |
|---|---|---|
| Design doc | Done | `GAME_DESIGN.md`. *(2026-11-16T05:12:50+00:00)* |

### Known issues and limitations
- None yet.

### Implementation interpretations (technical, not design decisions — flag if wrong)
- The guiding principles in §A and the standing orders in §H were carried over from Lyra's previous design document rather than restated for this project.

---

## G. Decision History

*Append-only. Changed decisions are recorded as new entries; earlier entries are preserved.*

| # | Timestamp (Europe/London) | Category | Decision |
|---|---|---|---|
| 1 | 2026-11-16T05:12:50+00:00 | Concept | A game like Happy Wheels, including all the gore and destruction, using SVGs. |
| 2 | 2026-11-16T05:12:50+00:00 | Technical | Stack: React, Vite, TypeScript, Tailwind CSS, Phaser, IndexedDB via Dexie.js, Cloudflare Workers (Lyra's normal stack). |
| 3 | 2026-11-16T05:12:50+00:00 | Concept | Not a recreation of Happy Wheels: an original game in the genre. |
| 4 | 2026-11-16T05:12:50+00:00 | Documentation | Living `GAME_DESIGN.md`, using the format of Lyra's previous project's design document. |

---

## H. Technical Notes

- **Repository:** `evanstom273/hw-test`. Working branch `ccr-e80cc760-iehzmg`.
- **Explain before adding** *(carried over from Lyra's previous design document)*: before building anything, Claude says what it's about to add and how, then waits for the go-ahead.
- **Workflow** *(Lyra's standing order across all her projects, carried over from the previous design document)*: after committing to the working branch, always merge straight to `main` as well; no need to ask each time.
