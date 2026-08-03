# Portfolio Website — VIZ Work Order Status

**Last updated:** 2026-08-03

**Line index:** [`README.md`](README.md)

**Companion line:** [`../wo/WO-STATUS.md`](../wo/WO-STATUS.md) — read-only from
here. VIZ never changes `WO` state, and `WO` never changes VIZ state.

## Purpose

This file is the operational source of truth for VIZ dispatch. It records
whether each order can start, who owns it, what evidence exists, and exactly why
a blocked order cannot proceed.

The Work Order files define the work. This file defines whether that work is
currently dispatchable.

## State Definitions

| State | Meaning |
| --- | --- |
| `BLOCKED` | Do not dispatch. A prerequisite, decision, or required input is missing. |
| `READY` | All prerequisites are satisfied. The order may be assigned. |
| `IMPLEMENTING` | One named agent is actively executing the order. |
| `REVIEW` | Implementation was handed off; acceptance criteria have not been independently checked. |
| `DONE` | A reviewer confirmed the acceptance checklist and required evidence. |
| `CANCELLED` | The owner explicitly removed the order from scope. Record the decision and any replacement. |

Only these exact values may appear in the Current State table.

## Line Gate

VIZ is **open**. The owner approved the visual direction recorded in
[`docs/design/viz-visual-decisions.md`](../../design/viz-visual-decisions.md);
VIZ-001 and VIZ-002 are `DONE`; VIZ-003 through VIZ-005 are ready for parallel
implementation.

This line is deliberately less constrained than the `WO` line. Owner decision,
2026-08-03: `IMPLEMENTATION-SPEC.md` does not bind VIZ orders. A VIZ order may
change layout, section order, composition, motion, tokens, dependencies, and
runtime architecture, and updates the specification when it does.

Three standing constraints survive, all recorded in the line index: reduced
motion, do not regress the shipped `/work/aegis` release, and stay out of Batch
04's write scope while both lines run in parallel.

**Running in parallel with Batch 04.** The file split is in the line index and
was verified on 2026-08-03. The key finding that makes it clean:
`project-showcase.tsx` renders its case-study link generically from
`project.name` and `project.href`, so Batch 04 needs no edit there and WO-027's
write scope was reduced to `src/content/projects.ts`. VIZ owns the component.

**Judge assembled, not in isolation.** The component blueprint's own rule —
"do not add more visual-effect components until the assembled page has been
evaluated in context" — is why VIZ-001 starts with an evaluation of what is
actually on screen today rather than with a shortlist of new effects.

## Current State

| VIZ | State | Prerequisites | Owner | Branch/commit | Evidence or blocker |
| --- | --- | --- | --- | --- | --- |
| [VIZ-001](VIZ-001-visual-direction.md) | `DONE` | None | Codex | `development` | Owner approved D-004 through D-013, the effect verdicts, scene contract, and recorded specification supersessions on 2026-08-03. The ledger remains the binding VIZ direction; no product code changed in VIZ-001. |
| [VIZ-002](VIZ-002-motion-runtime-foundation.md) | `DONE` | VIZ-001 | Codex | `development` | Owner accepted [`VIZ-002-handoff.md`](VIZ-002-handoff.md) on 2026-08-03 and waived the outstanding independent GPU-browser evidence. Runtime, contract, pins, docs, and automated checks are complete. |
| [VIZ-003](VIZ-003-hero.md) | `REVIEW` | VIZ-002 | Codex | `development` | [`VIZ-003-handoff.md`](VIZ-003-handoff.md): owner-restored paired Liquid Metal controls, kinetic semantic hero, retained Line Waves, verified wheel-scroll repair, automated checks, and Chromium desktop/mobile evidence. Awaiting independent visual acceptance. |
| [VIZ-004](VIZ-004-scroll-choreography.md) | `BLOCKED` | VIZ-002 | Codex | `development` | [`VIZ-004-handoff.md`](VIZ-004-handoff.md): implementation, Chromium evidence, Firefox functional coverage, recordings, axe, tests, lint, scoped type-check, and diff checks are complete. Full type-check/build is red from concurrent Q case-study files outside VIZ-004; WebKit cannot launch without `libicudata.so.74`; Firefox desktop normal motion records 42.1 fps against the 55 fps gate. |
| [VIZ-005](VIZ-005-selected-work-stage.md) | `REVIEW` | VIZ-002 | Codex | `development` | [`VIZ-005-handoff.md`](VIZ-005-handoff.md): D-010 persistent aperture (GSAP Flip) and D-011 panel choreography implemented; Shape Blur and the four diagrams removed; button-reset bug fixed; real Aegis/Quant media plus authored gosigapp/Nexo Dental placeholders; keyboard-reachable rail for `href: null` projects; automated checks pass; Chromium evidence recorded. Awaiting independent visual acceptance; no WebKit/Firefox evidence gathered. |
| [VIZ-006](VIZ-006-release-review.md) | `BLOCKED` | VIZ-003, VIZ-004, VIZ-005 | Unassigned | `development` | Awaiting all three. `GO`/`NO-GO` on the assembled page against a production build. |

## Gate Log

| Date | Gate | Verdict | Evidence | Next action |
| --- | --- | --- | --- | --- |
| 2026-08-03 | VIZ line created | `OPEN` | Owner directed a parallel line for the cinematic landing page, explicitly not restricted by `IMPLEMENTATION-SPEC.md`. Six orders created. The line exists because the `WO` line structurally cannot do this work: §3 fixes page order, §7 fixes layout, §9 fixes motion policy, and §11 fixes project presentation. This also supersedes the Batch 04 renumbering note in `../wo/WO-STATUS.md`, which deferred the cinematic scope to "a later batch" — that scope is now this line, running in parallel rather than after. Verified before writing: GSAP 3.15.0, Three 0.185.1, OGL 1.0.11, `@paper-design/shaders` 0.0.78, and tsparticles 4.3.2 are installed; `IMPLEMENTATION-SPEC.md` §9 already specifies `motion@12.43.0` and `lenis@1.3.25` with a runtime ownership split; the homepage composes five sections in `src/app/page.tsx`; and `project-showcase.tsx` renders its link generically, which is what makes parallel execution with Batch 04 safe. | Dispatch VIZ-001. It evaluates the assembled page first, per the component blueprint's own rule, rather than opening with a shortlist of new effects. |
| 2026-08-03 | VIZ-001 implementation handoff | `REVIEW` | The assembled homepage was captured and inspected in Google Chrome at desktop and mobile widths. The original automated desktop hero capture failed to render Line Waves; the owner supplied an accurate live capture and the invalid image is explicitly excluded. The corrected ledger retains Line Waves, Scroll Reveal, and Dotted Surface; rejects both Liquid Metal links, Logo Loop, Sparkles, and Shape Blur; sharpens the thesis; re-ratifies BSMNT Scrollytelling, Codrops Kinetic Typography, Codrops One Element Scroll, and 21st.dev Story Scroll for distinct homepage roles; and leaves the prior image cylinder open for later case-study use. Source revisions and rights boundaries are recorded. No product code changed. | Owner reviews the corrected ledger. On explicit approval, mark VIZ-001 `DONE` and VIZ-002 `READY`; otherwise record the changed decisions and keep VIZ-002 blocked. |
| 2026-08-03 | VIZ-001 owner approval and VIZ-002 dispatch | `DONE` | Owner explicitly approved D-004 through D-013, the retained/cut effect verdicts, homepage scene contract, and specification supersessions. VIZ-001 moved to `DONE`; VIZ-002 passed `READY` and is now `IMPLEMENTING` under Codex. | Build and verify VIZ-002; VIZ-003 through VIZ-005 remain blocked until VIZ-002 is independently reviewed. |
| 2026-08-03 | VIZ-002 implementation handoff | `REVIEW` | Motion/Lenis pins, one root runtime, one GSAP ticker bridge, shared progress, BSMNT-compatible scoped timeline cleanup, motion contract, provenance, and §9 reconciliation landed. `pnpm run test` (15 files/83 tests), lint, typecheck, build, and diff checks pass. Chrome smoke verification covers normal/reduced motion, keyboard skip link, homepage/Aegis anchor return, and repeated navigation; 2-second samples measured 52 fps at 1440×900 and 375×780. Browser WebGL is unavailable, producing 0 fallback canvases/contexts before and after rather than the expected GPU baseline; homepage axe retains the pre-existing `scrollable-region-focusable` finding. | Independent reviewer must reproduce GPU context/leak and frame-rate evidence in a GPU-capable browser, assess the known axe finding, then mark VIZ-002 `DONE` and move VIZ-003 through VIZ-005 to `READY`. |
| 2026-08-03 | VIZ-002 owner acceptance | `DONE` | Owner explicitly accepted the VIZ-002 handoff and waived the outstanding independent GPU-browser evidence. Automated checks and browser smoke evidence remain recorded in the handoff; the pre-existing homepage axe finding remains open for VIZ-004/VIZ-006. | VIZ-003, VIZ-004, and VIZ-005 move to `READY` and may be dispatched in parallel. |
| 2026-08-03 | VIZ-003 implementation handoff | `REVIEW` | D-009 kinetic title aperture now resolves over retained Line Waves while semantic copy stays fully visible; the two rejected Liquid Metal shaders and dependency are removed. Chromium evidence records 54–56 fps desktop / 60.5 fps mobile, one managed canvas, zero observed CLS, no horizontal overflow, reduced-motion still, no-JS markup, and keyboard action targets. The Lenis bridge was also repaired: a root-wheel event now advances 698px desktop and 649px mobile instead of remaining at zero. | Independent reviewer assesses desktop/mobile composition, entrance recording, and the remaining browser coverage before accepting VIZ-003. |
| 2026-08-03 | VIZ-003 owner CTA override | `REVIEW` | Owner rejected the bright solid/text replacement after visual comparison with the supplied prior-hero reference and directed restoration of both Liquid Metal controls. Chromium at 1440×900 records 52 fps with three managed canvases and CLS `0`; mobile keeps one Line Waves canvas with static CTA fallbacks; reduced motion holds zero canvases. Wheel input remains repaired (698px desktop advance). | Independent reviewer reassesses the refreshed evidence and approves or rejects the assembled hero. |
| 2026-08-03 | VIZ-004 implementation evidence | `BLOCKED` | [`VIZ-004-handoff.md`](VIZ-004-handoff.md) records the master choreography, Process restage, shared About reveal, Contact resolution, 0 axe violations, anchor/history/resize matrix, Chromium 56.4/60.3 fps, Firefox functional coverage, and desktop/mobile recordings. Firefox desktop normal motion records 42.1 fps; WebKit lacks `libicudata.so.74`; concurrent Q case-study changes break the full repository type-check after an earlier green VIZ-004 build. | Restore the external type/build baseline, reproduce WebKit on a compatible host, and resolve or explicitly accept the Firefox desktop performance gate before moving VIZ-004 to `REVIEW`. |
| 2026-08-03 | VIZ-005 implementation handoff | `REVIEW` | [`VIZ-005-handoff.md`](VIZ-005-handoff.md) records `project-showcase.tsx` rebuilt around D-010 (persistent GSAP Flip aperture) and D-011 (pinned panel choreography); Shape Blur and its `WebGLEffectId` removed; the button-reset `@layer` bug fixed; real Aegis/Quant screenshots plus authored gosigapp/Nexo Dental placeholder SVGs at the path a real capture will replace; a keyboard-reachable "select project" rail closing a reachability gap for the two `href: null` projects. `pnpm run test/lint/typecheck/build` and `git diff --check` all pass on VIZ-005's files. Chromium evidence (desktop pin/Flip/crossfade, reduced motion, mobile, rail keyboard jump) recorded via `playwright-cli`; no WebKit/Firefox evidence gathered (same `libicudata.so.74` gap as VIZ-004); no numeric fps sample taken for this section specifically; the four project scenes share one template rather than bespoke per-scene compositions. | Independent reviewer assesses the assembled desktop/mobile/reduced-motion evidence, the aperture mechanism, and the page-weight numbers, then moves VIZ-005 to `DONE` or records specific findings. |

## Update Rules

### When an order starts

1. Change the state to `IMPLEMENTING` and name the owner.
2. Record the branch or worktree.

### When an order is handed off

1. Link the handoff, commit, screenshots, and command results.
2. Change the state to `REVIEW`.

### When review passes

1. Confirm every acceptance checkbox and the required evidence.
2. Change the state to `DONE`.
3. Re-evaluate every direct dependent and move it to `READY` when unblocked.

### When blocked during implementation

1. Change the state to `BLOCKED`.
2. Replace vague language with the exact missing decision, file, or input.
3. State the action required to unblock it.

## Evidence Rules

- Visual work still needs evidence. Record the viewport, browser, motion mode,
  and frame rate for anything claimed to be smooth.
- Screenshots and short screen recordings are first-class evidence here and are
  expected in every handoff.
- "Looks good" is not evidence. "60 fps sustained at 1440×900 in Chromium, 48 fps
  in WebKit, recording attached" is.
- Record every specification supersession explicitly, with the section number.
- A skipped required check is a blocker, not a pass.
