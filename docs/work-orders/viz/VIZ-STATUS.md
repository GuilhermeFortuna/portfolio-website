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

VIZ is **open**. VIZ-001 is in `REVIEW`; VIZ-002 remains blocked until the owner
approves the visual direction recorded in
[`docs/design/viz-visual-decisions.md`](../../design/viz-visual-decisions.md).

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
| [VIZ-001](VIZ-001-visual-direction.md) | `REVIEW` | None | Codex | `development` | Handoff: [`viz-visual-decisions.md`](../../design/viz-visual-decisions.md). Ten accepted section captures plus the excluded automated hero capture are in [`docs/design/evidence/viz-001/`](../../design/evidence/viz-001/). The owner-supplied live hero capture supersedes the automated image that failed to render Line Waves. The ledger records per-effect verdicts, a sharpened thesis, four re-ratified premium sources mapped to homepage roles, three retained local effects, the scene contract, and §3/§5/§6/§7/§9/§11 supersessions. Awaiting explicit owner approval; no product code changed. |
| [VIZ-002](VIZ-002-motion-runtime-foundation.md) | `BLOCKED` | VIZ-001 | Unassigned | `development` | Awaiting owner approval of the VIZ-001 ledger. The selected direction requires a BSMNT-compatible timeline registration/cleanup contract in addition to the planned Motion/Lenis/GSAP/WebGL ownership split. |
| [VIZ-003](VIZ-003-hero.md) | `BLOCKED` | VIZ-002 | Unassigned | `development` | Awaiting VIZ-002. May run in parallel with VIZ-004 and VIZ-005. |
| [VIZ-004](VIZ-004-scroll-choreography.md) | `BLOCKED` | VIZ-002 | Unassigned | `development` | Awaiting VIZ-002. May run in parallel with VIZ-003 and VIZ-005. |
| [VIZ-005](VIZ-005-selected-work-stage.md) | `BLOCKED` | VIZ-002 | Unassigned | `development` | Awaiting VIZ-002. May run in parallel with VIZ-003 and VIZ-004. Owns `project-showcase.tsx`; the fixed two-column `5fr 7fr` layout in `IMPLEMENTATION-SPEC.md` §11 is explicitly open to replacement. |
| [VIZ-006](VIZ-006-release-review.md) | `BLOCKED` | VIZ-003, VIZ-004, VIZ-005 | Unassigned | `development` | Awaiting all three. `GO`/`NO-GO` on the assembled page against a production build. |

## Gate Log

| Date | Gate | Verdict | Evidence | Next action |
| --- | --- | --- | --- | --- |
| 2026-08-03 | VIZ line created | `OPEN` | Owner directed a parallel line for the cinematic landing page, explicitly not restricted by `IMPLEMENTATION-SPEC.md`. Six orders created. The line exists because the `WO` line structurally cannot do this work: §3 fixes page order, §7 fixes layout, §9 fixes motion policy, and §11 fixes project presentation. This also supersedes the Batch 04 renumbering note in `../wo/WO-STATUS.md`, which deferred the cinematic scope to "a later batch" — that scope is now this line, running in parallel rather than after. Verified before writing: GSAP 3.15.0, Three 0.185.1, OGL 1.0.11, `@paper-design/shaders` 0.0.78, and tsparticles 4.3.2 are installed; `IMPLEMENTATION-SPEC.md` §9 already specifies `motion@12.43.0` and `lenis@1.3.25` with a runtime ownership split; the homepage composes five sections in `src/app/page.tsx`; and `project-showcase.tsx` renders its link generically, which is what makes parallel execution with Batch 04 safe. | Dispatch VIZ-001. It evaluates the assembled page first, per the component blueprint's own rule, rather than opening with a shortlist of new effects. |
| 2026-08-03 | VIZ-001 implementation handoff | `REVIEW` | The assembled homepage was captured and inspected in Google Chrome at desktop and mobile widths. The original automated desktop hero capture failed to render Line Waves; the owner supplied an accurate live capture and the invalid image is explicitly excluded. The corrected ledger retains Line Waves, Scroll Reveal, and Dotted Surface; rejects both Liquid Metal links, Logo Loop, Sparkles, and Shape Blur; sharpens the thesis; re-ratifies BSMNT Scrollytelling, Codrops Kinetic Typography, Codrops One Element Scroll, and 21st.dev Story Scroll for distinct homepage roles; and leaves the prior image cylinder open for later case-study use. Source revisions and rights boundaries are recorded. No product code changed. | Owner reviews the corrected ledger. On explicit approval, mark VIZ-001 `DONE` and VIZ-002 `READY`; otherwise record the changed decisions and keep VIZ-002 blocked. |

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
