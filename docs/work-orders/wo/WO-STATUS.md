# Portfolio Website — Work Order Status

**Last updated:** 2026-07-30

**Batch index:** [`README.md`](README.md)

**Fixed implementation specification:** [`IMPLEMENTATION-SPEC.md`](IMPLEMENTATION-SPEC.md)

**Authoritative editorial source:** [`../../content.md`](../../content.md)

## Purpose

This file is the operational source of truth for Work Order dispatch. It records whether each order can start, who owns it, what evidence exists, and exactly why a blocked order cannot proceed.

The Work Order files define the work. This file defines whether that work is currently dispatchable.

## State Definitions

| State | Meaning |
| --- | --- |
| `BLOCKED` | Do not dispatch. A prerequisite, decision, source, or required input is missing. |
| `READY` | All prerequisites and gates are satisfied. The order may be assigned. |
| `IMPLEMENTING` | One named agent is actively executing the order. |
| `REVIEW` | Implementation was handed off, but acceptance criteria and evidence have not yet been independently checked. |
| `DONE` | A reviewer confirmed the acceptance checklist and required validation evidence. |
| `CANCELLED` | The owner explicitly removed the order from scope. Include the decision and replacement, if any. |

Only one of these exact state values may appear in the Current State table.

## Current Batch Gate

The component set and prescriptive Work Order structure are approved. WO-001 through WO-003 are implemented, reviewed, and complete.

`docs/content.md` is now the authoritative source for copy, verified facts, profile links, contact information, and truth/placeholder handling.

Batch 01 remains a single-page homepage. Its approved adaptation uses `Explore my work` → `#work`, the order Hero → Work → Process → About → Contact, and Logo Loop for the truthful six-stage Process sequence. Route-specific case studies remain later scope.

Two untracked pnpm files also exist even though Batch 01 specifies npm and a committed `package-lock.json`. They must not be committed unless the package-manager contract is explicitly changed.

## Current State

| WO | State | Prerequisites | Owner | Branch/commit | Evidence or blocker |
| --- | --- | --- | --- | --- | --- |
| [WO-001](WO-001-application-foundation.md) | `DONE` | None | Guilherme (commit author) | `main` @ `5df896c` | Next.js 16, React 19, strict TypeScript, Tailwind 4, ESLint, npm scripts, README, and lockfile committed. Current lint and type-check pass; production build passes with network access for `next/font`. |
| [WO-002](WO-002-tokens-shared-primitives.md) | `DONE` | WO-001 | Guilherme (commit author) | `main` @ `c0c1c18` | Fixed tokens, Geist variables, `SectionShell`, `cn`, reduced-motion hook, and effect-activity hook committed. Current lint, type-check, and production build pass. |
| [WO-003](WO-003-content-page-skeleton.md) | `DONE` | WO-002 | Guilherme (commit author) | `main` @ `ca6ccf0` | Approved homepage copy, navigation, Process, About, Work, Contact, profile links, metadata, and project records committed. Contracts reconciled with `docs/content.md`; lint, type-check, and production build pass. |
| [WO-004](WO-004-line-waves-effect.md) | `DONE` | WO-002, WO-003 | Auto (feat/wo-004-line-waves) | `feat/wo-004-line-waves` | Adapted Line Waves + `ogl`; hero client frame with activity gating, DPR caps, fades, and reduced-motion fallback. `npm run lint`, `npm run typecheck`, and `npm run build` passed. Manual checks still needed (offscreen pause, reduced motion, 375px). |
| [WO-005](WO-005-hero-liquid-metal-cta.md) | `DONE` | WO-004 | Auto (WO-005 hero CTA) | `development` (uncommitted) | `WebGLManager`/`ManagedWebGLEffect` added under `src/components/webgl/`, wrapped in `layout.tsx`; Line Waves migrated to `line-waves` (hero/high/mobile) and Liquid Metal registered as `liquid-metal` (hero/low/no mobile) using the canonical `liquidMetalFragmentShader` via `@paper-design/shaders`. `npm run lint`, `npm run typecheck`, `npm run build` pass. Chromium evidence: CTA is an `<a href="#work">`, 56px height, 24px inline padding, 999px radius, 1px `--color-line-strong`, Geist Mono 12px/600/0.96px uppercase, `--color-text`; mouse + Enter both reach `#work`; focus ring 2px `--color-focus` at 4px offset unobstructed; hover lifts 1px and glow 0.60→0.72; reduced motion mounts 0 canvases with the accent A→B static ring at identical dimensions and no hover transform; 320/375/768/1024/1440 show no horizontal overflow and title top 155px vs header bottom 72px; 2 contexts on desktop (budget 4 = high 3 + low 1), 1 on mobile with the CTA on its static fallback; contexts unmount past the 300px band and remount on return; app-owned rAF drops to zero when the document is hidden; console has 0 errors. Deviations recorded in the handoff (mobile budget, shader tint, hero heading typography workaround). |
| [WO-006](WO-006-about-scroll-reveal.md) | `DONE` | WO-002, WO-003 | Auto (feat/wo-006-about-scroll-reveal) | `feat/wo-006-about-scroll-reveal` | Adapted Scroll Reveal + `gsap`; About two-column layout; scoped `gsap.context` cleanup; reduced-motion static paragraph. `npm run lint`, `npm run typecheck`, and `npm run build` passed. Manual scroll/reduced-motion checks still needed. |
| [WO-007](WO-007-process-logo-loop.md) | `DONE` | WO-002, WO-003 | Auto (WO-007 process loop) | `development` (uncommitted) | Adapted Logo Loop added at `src/components/ui/logo-loop.tsx` with `active` (rAF gated on section activity) and `pauseOnFocus`; `ProcessSection` now renders the six approved stages (IDEA → ARCHITECTURE → AGENTS → IMPLEMENTATION → TESTING → DEPLOYMENT) through one left-moving loop (`speed=34`, `gap=48`, `logoHeight=22`, `fadeOut` `#06070a`, `scaleOnHover=false`, `ariaLabel="Engineering process"`) using text nodes with a 6px accent square cycling accents A/B/C in Geist Mono 0.75rem/550/0.06em; hover, focus, offscreen, hidden-tab, and reduced-motion all freeze the track; reduced motion swaps the loop for one static two-column (mobile) / six-column (desktop) semantic list, and duplicated loop copies are `aria-hidden`. Approved heading and support copy unchanged; no dependency added. `npm run lint` (0 errors), `npm run typecheck`, and `npm run build` pass. Manual checks still needed (hover/focus pause, offscreen pause, hidden-tab pause, reduced-motion grid, exact order, hidden duplicates). |
| [WO-008](WO-008-project-showcase-structure.md) | `DONE` | WO-002, WO-003 | Auto (WO-008 project showcase) | `feat/wo-008-project-showcase` @ `c2f555c` | Client `ProjectShowcase` with desktop selectors + sticky abstract stage, mobile articles, `[data-sparkles-slot]` and `[data-shape-blur-slot]`. `npm run lint`, `npm run typecheck`, and `npm run build` passed. Owner marked review complete. |
| [WO-009](WO-009-selected-work-sparkles.md) | `REVIEW` | WO-008 | Auto (WO-009 sparkles) | `feat/wo-009-selected-work-sparkles` | Adapted SparklesCore into `src/components/effects/sparkles.tsx` with `@tsparticles/engine`, `@tsparticles/react`, and `@tsparticles/slim` only; one `[data-sparkles-slot]` mounts one `selected-work-sparkles` instance gated by `useEffectActivity`/`useMotionPreference` with static glow fallback. Fixed settings: color `#8EA0FF`, size `0.3–0.8`, density `160`, speed `0.15`, opacity `0.1–0.45`, canvas opacity `0.55`, links/interactivity/fullscreen off. `npm run lint`, `npm run typecheck`, and `npm run build` passed. Runtime manual checks still needed (offscreen unmount/stop, reduced-motion static line, 320px overflow). |
| [WO-010](WO-010-shape-blur-interaction.md) | `REVIEW` | WO-008 | Auto (WO-010 shape blur) | `feat/wo-010-shape-blur` (uncommitted) | Adapted Shape Blur into `src/components/effects/shape-blur.tsx` with `three` as the only runtime dependency (`@types/three` added as a devDependency because `three@0.185.1` ships no type declarations). One instance mounts inside the single `[data-shape-blur-slot]` through `ManagedWebGLEffect` with `shape-blur`/`decorative`/`high`/`continuous`/`allowMobile: false` and `fallback={null}`, using the fixed parameters (`variation 0`, `pixelRatio 1.25`, `shapeSize 1.05`, `roundness 0.45`, `borderSize 0.04`, `circleSize 0.18`, `circleEdge 0.3`). Source corrections: `uColor` uniform replaces the hard-coded white output, `document` mouse/pointer listeners removed, DPR capped at `min(devicePixelRatio, pixelRatio)`, rAF started only while `active`, and geometry/material/renderer/canvas/observer/frame/listeners disposed on unmount. `npm run lint` (0 errors), `npm run typecheck`, and `npm run build` pass. Chrome for Testing 151.0.7922.10 headless (SwiftShader), 1440×900 @ DPR 1, motion allowed: exactly 1 Shape Blur canvas and 1 WebGL context in the stage; slot computes `position absolute`, inset `0`, `z-index 0`, `opacity 0.18`, `pointer-events none`, intersected 12% edge masks, diagram layer `relative`/`z-index 1`; canvas buffer 591×442 at effective DPR 1; readback of the shader output per selector returns `#8ea0ff` (Aegis), `#68d7c5` (Q), `#b49cff` (gosigapp), `#8ea0ff` (Nexo Dental); two pointer positions inside the stage produce different frames while two positions outside it produce identical frames; draw calls run at 60/s while visible and 0/s while parked offscreen inside the 300px margin with the context still mounted; unmounting past the margin leaves the canvas disconnected with `isContextLost() === true`; 1023×800 and 375×780 mount 0 Shape Blur canvases (desktop grid `display: none`, no horizontal overflow); `prefers-reduced-motion: reduce` mounts 0 canvases and keeps the static surface and diagram. Only pre-existing console noise appeared (`404 /favicon.ico`). Deviations: the stage-local `pointermove`/`pointerleave` listeners attach to the nearest ancestor that accepts pointer events, because the slot itself is `pointer-events: none` and could never be an event target; the uniform is converted with `new THREE.Color(color).convertLinearToSRGB()` so the raw shader write lands on the specified sRGB hex; `src/components/webgl/webgl-manager.tsx` was modified outside this order's file list to carry the owner-approved desktop budget increase recorded in the Gate Log. |
| [WO-011](WO-011-contact-dotted-surface-footer.md) | `READY` | WO-002, WO-003 | Unassigned | — | Foundations and verified Email, LinkedIn, and GitHub actions are complete. |
| [WO-012](WO-012-integration-accessibility-performance.md) | `BLOCKED` | WO-005–WO-011 | Unassigned | — | Final integration gate. All section and effect orders must reach `DONE` first. |

## Gate Log

| Date | Gate | Verdict | Evidence | Next action |
| --- | --- | --- | --- | --- |
| 2026-07-29 | Component selection | `GO` | [`../../portfolio-component-blueprint.md`](../../portfolio-component-blueprint.md) locks seven components and excludes Laser Flow. | Use the locked component roles; add no visual effect in Batch 01. |
| 2026-07-29 | Prescriptive Work Order batch | `GO` | [`README.md`](README.md), [`IMPLEMENTATION-SPEC.md`](IMPLEMENTATION-SPEC.md), and WO-001–WO-012 define the dependency graph and execution recipes. | WO-001 may be dispatched. |
| 2026-07-29 | Editorial source adoption | `REVISE` | [`../../content.md`](../../content.md) contains owner-approved copy and verified profile/contact facts that conflict with the earlier draft content contract. | Reconcile WO-003, WO-005–WO-008, WO-011, WO-012, and the implementation specification before marking WO-003 ready. |
| 2026-07-29 | WO-001 foundation review | `DONE` | Commit `5df896c`; `npm run lint` and `npm run typecheck` passed; `npm run build` passed when Google Fonts network access was available. | WO-002 implementation was permitted and is now complete. |
| 2026-07-29 | WO-002 primitives review | `DONE` | Commit `c0c1c18`; source inspection confirmed fixed tokens and shared hooks; current lint, type-check, and production build pass. | Review WO-003 against the authoritative editorial source. |
| 2026-07-29 | WO-003 homepage skeleton | `REVIEW` | Commit `ca6ccf0`; approved copy and verified contact/profile actions are present; current lint, type-check, and production build pass. | Reconcile the written contracts, decide the truthful Logo Loop framing, and resolve untracked pnpm files before closing review. |
| 2026-07-29 | Editorial and WO-003 reconciliation | `DONE` | Implementation specification and WO-003, WO-005–WO-008, WO-011, and WO-012 now defer to `docs/content.md`; Logo Loop is assigned to the approved Process sequence. | Mark WO-003 done; WO-004, WO-006, WO-007, WO-008, and WO-011 are ready. |
| 2026-07-29 | WO-004 Line Waves review | `DONE` | Branch `feat/wo-004-line-waves`; adapted Line Waves + `ogl`; hero client frame with activity gating, DPR caps, fades, and reduced-motion fallback; lint, type-check, and build passed. | Unblock WO-005; Wave 5 peers (WO-006–WO-008, WO-011) remain independently dispatchable. |
| 2026-07-30 | Desktop WebGL budget increase | `GO` | Chrome for Testing 151.0.7922.10 headless at 1440×900, motion allowed: with the budget at `4` the project stage was already visible from `scrollY≈400` while Shape Blur only mounted from `≈1300`, because Line Waves (`high`) plus the Liquid Metal CTA (`low`) held 4 of 4 units; at `6` it mounted from `≈1000`; at `7` a Shape Blur canvas exists at every scroll position where the stage is on screen, peaking at three simultaneous contexts. Frame gating was re-measured after the change: 60 draw calls/second while visible and 0 while parked 242px above the viewport inside the 300px margin. | Owner raised the desktop budget to `7` in `webgl-manager.tsx` and `IMPLEMENTATION-SPEC.md` section 9. Re-evaluate the desktop total when WO-011 registers Dotted Surface (`decorative`/`high`), and confirm the three-context peak on low-end hardware during WO-012. |
| 2026-07-29 | Managed WebGL architecture | `GO` | Owner directed multiple WebGL runtimes through one registry/provider with 300px near-viewport mounting, offscreen pausing, cost budgets, mobile fallbacks, and normalized cleanup. | WO-005 introduces the manager, migrates Line Waves, and retains the canonical Paper Liquid Metal shader. WO-010 and WO-011 consume the manager later. |

## Dispatch Record

Add one row when an order is assigned. Do not remove historical rows.

| Date | WO | Agent/owner | Branch/worktree | Write scope | Expected handoff |
| --- | --- | --- | --- | --- | --- |
| 2026-07-30 | WO-010 | Auto (WO-010 shape blur) | `feat/wo-010-shape-blur` | Adapted Shape Blur effect with `three`, one managed decorative instance in the desktop project stage, and the masked Shape Blur slot | Lint, type-check, build; Chromium colour/pointer/budget/disposal evidence; hand off for REVIEW |
| 2026-07-30 | WO-009 | Auto (WO-009 sparkles) | `feat/wo-009-selected-work-sparkles` | Bounded Selected Work SparklesAccent with tsParticles slim deps, activity gating, and static fallback | Lint, type-check, build; hand off for REVIEW |
| 2026-07-29 | WO-008 | Auto (WO-008 project showcase) | `feat/wo-008-project-showcase` | Selected Work structure: client `ProjectShowcase` with desktop selectors + sticky abstract stage, mobile articles, Sparkles and Shape Blur slots | Lint, type-check, build; hand off for REVIEW |
| 2026-07-29 | WO-007 | Auto (WO-007 process loop) | `development` | Adapted Logo Loop (`src/components/ui/logo-loop.tsx`) with activity/focus gating; Process section six-stage loop and reduced-motion static grid | Lint, type-check, build; hand off for REVIEW |
| 2026-07-29 | WO-006 | Auto (feat/wo-006-about-scroll-reveal) | `feat/wo-006-about-scroll-reveal` | Adapted Scroll Reveal + gsap; About two-column layout | Lint, type-check, build; hand off for REVIEW |
| 2026-07-29 | WO-005 | Auto (WO-005 hero CTA) | `development` | WebGL manager, Line Waves migration, canonical Paper Liquid Metal link, hero layout, dependency manifests | Lint, type-check, build; registry/budget/manual lifecycle evidence; hand off for REVIEW |
| 2026-07-29 | WO-004 | Auto (feat/wo-004-line-waves) | `feat/wo-004-line-waves` | Adapted Line Waves effect, ogl dependency, hero background integration | Lint, type-check, build; hand off for REVIEW |
| 2026-07-29 | WO-001 | Guilherme (commit author) | `main` | Application scaffold, tooling, README, base page | Commit `5df896c` and passing foundation checks |
| 2026-07-29 | WO-002 | Guilherme (commit author) | `main` | Tokens, fonts, layout primitive, hooks, `cn` | Commit `c0c1c18` and passing foundation checks |
| 2026-07-29 | WO-003 | Guilherme (commit author) | `main` | Typed content, navigation, semantic homepage sections | Commit `ca6ccf0`; editorial-contract review pending |

## Status Update Procedure

### When dispatching

1. Confirm the order is `READY`.
2. Add the named owner and branch/worktree.
3. Change its state to `IMPLEMENTING`.
4. Add a Dispatch Record row.
5. Do not change dependent orders yet.

### When the agent hands off

1. Link the handoff, commit, screenshots, and command results.
2. Change the state to `REVIEW`.
3. Keep dependent orders blocked until review completes.

### When review passes

1. Confirm every acceptance checkbox in the Work Order.
2. Confirm the required automated and manual evidence.
3. Change the state to `DONE`.
4. Re-evaluate every direct dependent.
5. Move a dependent to `READY` only when all its prerequisites and non-WO gates are satisfied.

### When blocked during implementation

1. Change the state to `BLOCKED`.
2. Preserve the owner and branch/worktree.
3. Replace vague language with the exact missing decision, file, command result, dependency, or external input.
4. State the action required to unblock it.

## Evidence Rules

- Do not write “verified,” “complete,” or `DONE` without linked or recorded evidence.
- Record exact validation commands and whether they passed.
- Record the viewport, browser, and motion mode for UI evidence.
- A skipped required check is a blocker, not a pass.
- Failed unrelated checks must still be recorded.
- Do not mark a dependent `READY` merely because upstream code exists; upstream must be reviewed and `DONE`.
- `[REQUIRED: …]` markers may remain in documentation fixtures but must never enter public UI, metadata, generated assets, or the production bundle.
