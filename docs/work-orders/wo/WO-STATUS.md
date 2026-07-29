# Portfolio Website — Work Order Status

**Last updated:** 2026-07-29

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
| [WO-005](WO-005-hero-liquid-metal-cta.md) | `IMPLEMENTING` | WO-004 | Auto (WO-005 hero CTA) | `development` | WO-004 is `DONE`; Line Waves is integrated via `HeroLineWavesFrame`. Write scope: `src/components/ui/liquid-metal-link.tsx`, `src/components/sections/hero-section.tsx`, and dependency manifests. |
| [WO-006](WO-006-about-scroll-reveal.md) | `REVIEW` | WO-002, WO-003 | Auto (feat/wo-006-about-scroll-reveal) | `feat/wo-006-about-scroll-reveal` | Adapted Scroll Reveal + `gsap`; About two-column layout; scoped `gsap.context` cleanup; reduced-motion static paragraph. `npm run lint`, `npm run typecheck`, and `npm run build` passed. Manual scroll/reduced-motion checks still needed. |
| [WO-007](WO-007-process-logo-loop.md) | `READY` | WO-002, WO-003 | Unassigned | — | Approved Process copy and six-stage sequence are committed; Logo Loop will present those stages without unsupported technology claims. |
| [WO-008](WO-008-project-showcase-structure.md) | `READY` | WO-002, WO-003 | Unassigned | — | Content model and section shell are complete. Public project links remain absent until verified URLs exist. |
| [WO-009](WO-009-selected-work-sparkles.md) | `BLOCKED` | WO-008 | Unassigned | — | Waiting for the Selected Work heading and its single Sparkles slot. |
| [WO-010](WO-010-shape-blur-interaction.md) | `BLOCKED` | WO-008 | Unassigned | — | Waiting for the desktop project stage and its single Shape Blur slot. |
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

## Dispatch Record

Add one row when an order is assigned. Do not remove historical rows.

| Date | WO | Agent/owner | Branch/worktree | Write scope | Expected handoff |
| --- | --- | --- | --- | --- | --- |
| 2026-07-29 | WO-006 | Auto (feat/wo-006-about-scroll-reveal) | `feat/wo-006-about-scroll-reveal` | Adapted Scroll Reveal + gsap; About two-column layout | Lint, type-check, build; hand off for REVIEW |
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
