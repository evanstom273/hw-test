# GAME_DESIGN.md

Authoritative, living record of the game's design. Timestamps are Europe/London, ISO 8601 with UTC offset, recorded at the time the decision was confirmed in conversation unless marked otherwise.

---

## A. Project Overview

A game **in the vein of Happy Wheels, including the gore and destruction**, with its art made from **SVGs** (History #1). **Its own game in that genre, not a recreation of Happy Wheels** (History #3). Working title: none yet; the repository is `hw-test`.

History #1–#3 were decided in conversation a few minutes before this document existed; their timestamps are documentation time.

**Where the project stands (as of 2026-11-16T05:18:58+00:00):**
- **Project scaffolded** (2026-11-16T05:18:58+00:00): builds, lints and is set up to deploy on Cloudflare Workers. The site is a "coming soon" page explaining what the game is. Phaser, Planck.js and Dexie are installed but not used yet.
- Living design document created (History #4).

**Stack:** React, Vite, TypeScript, Tailwind CSS, Phaser, IndexedDB via Dexie.js and Cloudflare Workers: Lyra's normal stack (History #2), plus **Planck.js for physics**, with Phaser handling rendering, camera, input and particles (History #7). **Deployed to the web on Cloudflare Workers** (History #6). What the other parts handle is not decided yet.

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
- **Deployed on Cloudflare Workers**: that's where the game goes out to the web. *(2026-11-16T05:14:53+00:00 — History #6)*
- **Physics: Planck.js** (a TypeScript port of Box2D), driving the physics, with Phaser handling rendering, camera, input and particles and syncing each sprite to its physics body. Claude's recommendation, approved by Lyra; reasoning under Open Questions #3. *(2026-11-16T05:14:53+00:00 — History #7)*

### Documentation
- **Living `GAME_DESIGN.md`**, using the format of Lyra's previous project's design document, filled in with everything decided and done as the project goes. *(2026-11-16T05:12:50+00:00 — History #4)*
- **`CLAUDE.md`** points every Claude session at this document and its standing orders, so they carry over between conversations. *(2026-11-16T05:22:32+00:00 — History #8)*

---

## C. Current Development Scope

### Scaffold — **DONE** *(2026-11-16T05:18:58+00:00)*
Lyra's request: scaffold the project, blank for now, a "coming soon" page with an explanation of what it is.

**In scope (done):** Vite + React + TypeScript + Tailwind CSS v4; Phaser 4, Planck.js and Dexie installed; a "coming soon" page; `wrangler.jsonc` serving the build as static assets on Cloudflare Workers.

**Out of scope:** any game design or gameplay; wiring up Phaser, Planck.js or Dexie.

---

## D. Future Possibilities

*Proposals only — not confirmed features.*

- **SVG asset pipeline** (Claude, 2026-11-16): joint pivot points marked inside each body part's SVG (e.g. `id="joint-elbow"`) and read at load time, so the physics rig lines up with the art automatically; level terrain drawn as SVG paths and converted into physics collision lines, so levels could be drawn in Inkscape or Figma.
- **Replays or ghost runs** (Claude, 2026-11-16): would need physics that gives identical results across browsers (Rapier can; Planck.js isn't guaranteed to).

---

## E. Open Questions

1. **Title.**
2. **Everything about the game itself.**
3. ~~**Physics engine.**~~ Planck.js (#7). Claude's reasoning when recommending it: Arcade physics is boxes only; Matter.js has springy joints, no proper joint limits, and no release since mid-2024; Box2D-style joints (revolute with limits and motors, wheel joints with suspension, readable joint forces) are what this genre is built on. box2d3-wasm is the faster alternative if needed.
4. **What each part of the stack handles.** ~~Where the game is deployed~~ (Cloudflare Workers, #6); ~~physics~~ (Planck.js, #7). Still open: what React, Dexie and anything server-side handle.

---

## F. Implementation Status

*Updated 2026-11-16T05:18:58+00:00.*

| Feature | Status | Notes |
|---|---|---|
| Design doc | Done | `GAME_DESIGN.md`. *(2026-11-16T05:12:50+00:00)* |
| Project scaffold | Tested | Vite 8, React 19, TypeScript 7, Tailwind CSS 4, oxlint (from the current `create-vite` React + TypeScript template). `npm run build` (type-check + Vite build) and `npm run lint` pass. Phaser 4.2.1, Planck.js 1.5.1 and Dexie 4.4.7 installed; checked with a throwaway test (removed afterwards) that all three type-check, bundle and run in headless Chromium, including a Planck revolute joint with limits stepping and reporting its reaction force. *(2026-11-16T05:18:58+00:00)* |
| Coming-soon page | Tested | `src/App.tsx`. "In development", "Coming soon." and one line on what the game is. Checked in headless Chromium at desktop 1280×720 and a Pixel 7: renders, no console errors. *(2026-11-16T05:18:58+00:00)* |
| Cloudflare Workers deployment (#6) | Implemented | `wrangler.jsonc`: assets-only Worker named `hw-test` serving `dist/`, single-page-app fallback. `npx wrangler deploy --dry-run` reads the build correctly. Not yet deployed for real: depends on the Cloudflare side Lyra is setting up. *(2026-11-16T05:18:58+00:00)* |

### Known issues and limitations
- **Phaser is big:** in the throwaway test it bundled to ~1.7 MB minified (~430 KB gzipped). It should be lazily loaded in its own chunk when it's wired up, so the page appears before it arrives.
- No tests yet.

### Implementation interpretations (technical, not design decisions — flag if wrong)
- **The coming-soon copy is Claude's placeholder:** "A browser game of ragdoll physics, gore and destruction. It's still being built, so there's nothing to play yet." "Ragdoll physics" is read from "like Happy Wheels" (#1). Happy Wheels isn't named on the public page.
- **The page's look is a placeholder:** near-black background, white heavy heading with a red full stop; favicon a red dot on black. Not an art direction.
- **Page title** is "Coming soon" until the game has a name.
- **Worker name `hw-test`**, matching the repository (the Cloudflare dashboard's default when importing it).
- **Answering a feature's design rounds counts as the go-ahead to build it** (#8), so "explain before adding" is met by the one line on what's being added, as in the mod project. If a round is only exploring an idea, nothing gets built.
- **Node 22** pinned in `.node-version` (Vite 8 needs 20.19+ or 22.12+), so Cloudflare's builds use a version that works.
- The guiding principles in §A and the "explain before adding" standing order in §H were carried over from Lyra's previous design document rather than restated for this project. (The merge-to-`main` order has since been confirmed, #5.)

---

## G. Decision History

*Append-only. Changed decisions are recorded as new entries; earlier entries are preserved.*

| # | Timestamp (Europe/London) | Category | Decision |
|---|---|---|---|
| 1 | 2026-11-16T05:12:50+00:00 | Concept | A game like Happy Wheels, including all the gore and destruction, using SVGs. |
| 2 | 2026-11-16T05:12:50+00:00 | Technical | Stack: React, Vite, TypeScript, Tailwind CSS, Phaser, IndexedDB via Dexie.js, Cloudflare Workers (Lyra's normal stack). |
| 3 | 2026-11-16T05:12:50+00:00 | Concept | Not a recreation of Happy Wheels: an original game in the genre. |
| 4 | 2026-11-16T05:12:50+00:00 | Documentation | Living `GAME_DESIGN.md`, using the format of Lyra's previous project's design document. |
| 5 | 2026-11-16T05:13:42+00:00 | Workflow | Merge to `main` after every commit to the working branch, without asking (Lyra's standing order, confirmed for this project). |
| 6 | 2026-11-16T05:14:53+00:00 | Deployment | Deployed to the web on Cloudflare Workers. |
| 7 | 2026-11-16T05:14:53+00:00 | Technical | Physics: Planck.js, with Phaser handling rendering, camera, input and particles (Claude's recommendation, approved). |
| 8 | 2026-11-16T05:22:32+00:00 | Process | Features are designed through rounds of multiple-choice questions, structured the way Lyra's Minecraft mod project does it (details in §H). `CLAUDE.md` added so every session reads this document and follows it. |

---

## H. Technical Notes

- **Repository:** `evanstom273/hw-test`. Working branch `ccr-e80cc760-iehzmg`.
- **Deployment:** Cloudflare Workers (#6), configured in `wrangler.jsonc` as an assets-only Worker serving `dist/`. With Workers Builds connected to the repository: build command `npm run build`, deploy command `npx wrangler deploy`. The `name` in `wrangler.jsonc` must match the Worker's name in the dashboard. `npm run deploy` builds and deploys by hand (needs Wrangler logged in).
- **Code layout:** `index.html` page shell; `src/main.tsx` entry; `src/App.tsx` the coming-soon page; `src/index.css` Tailwind; `public/favicon.svg`.
- **Commands:** `npm run dev`, `npm run build`, `npm run lint` (oxlint), `npm run preview`, `npm run deploy`.
- **Explain before adding** *(carried over from Lyra's previous design document)*: before building anything, Claude says what it's about to add and how, then waits for the go-ahead.
- **Designing features: rounds of questions** *(Lyra, 2026-11-16T05:22:32+00:00, History #8)*. Features are designed the way Lyra's Minecraft mod project designs them (and the way simple-shooter designed its enemies and bosses): Claude asks rounds of multiple-choice questions, Lyra answers and adds her own ideas.
  - **One short line before each round** saying what it covers (e.g. "I'll start with how the spell behaves and what the wings are like to fly with.").
  - **Up to four questions per round**, asked with the question tool. Each has two to four options; Lyra can always pick Other and write her own answer.
  - **Every question stands on its own:** it names the feature and gives the facts needed to answer it, especially reference numbers from what already exists (e.g. "sprinting is about 5.6 blocks/sec and a vanilla Elytra cruises around 30 blocks/sec").
  - **Fundamentals first, polish last:** how it works and how it's triggered → how it feels and its numbers → edge cases and failure states (running out, letting go, crashing) → its name → controls → look, effects, sound and UI.
  - **Each round builds on the last.** Between rounds, one line saying what Claude has taken from the answers (e.g. "Channelled and powered it is, so I've taken mana as draining for as long as you hold."), so a wrong reading gets caught before the next round.
  - **Names are offered as options too**, with Other for Lyra's own.
  - **Options are Claude's suggestions, not decisions;** nothing is decided until Lyra picks it.
  - **When the design is settled**, it goes into this document: the decisions, History entries, the options that were offered for looks, and anything Claude assumed rather than asked, marked as such. Then it's built, with one line on what's being added first (e.g. "The design is settled, so I'm building Veil of Flight. First I'll…").
- **Workflow** *(Lyra's standing order across all her projects; confirmed for this project 2026-11-16T05:13:42+00:00, History #5)*: after committing to the working branch, always merge straight to `main` as well; no need to ask each time.
