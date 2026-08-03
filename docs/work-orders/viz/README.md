# Portfolio Website — VIZ Work Orders

## What This Line Is

`VIZ` orders own the **visual and cinematic experience** of the portfolio. They
exist because the `WO` line cannot do this work: `WO` orders are governed by
`IMPLEMENTATION-SPEC.md`, which fixes page order, layout, motion policy, and
project presentation. Those constraints were correct for building a truthful,
accessible product. They make a cinematic redesign impossible by construction.

**VIZ orders are not restricted by that specification.** Owner decision,
2026-08-03. A VIZ order may change layout, section order, composition, motion,
typography scale, tokens, dependencies, and runtime architecture. Where a VIZ
order overrules the specification, it **updates the specification** as part of
its own work, so `WO` agents are never left following a document that no longer
describes reality.

## Scope

The landing page is the first target: `/` and everything it composes. Case-study
routes come later, once the language established here is proven against real
content in all four chapters.

## Authority

| Document | Authority over VIZ |
| --- | --- |
| `VIZ-STATUS.md` | Dispatch state. Binding. |
| `../wo/IMPLEMENTATION-SPEC.md` | **Not binding.** VIZ may overrule any of §3, §5–§11 and must record the supersession. |
| `../../portfolio-component-blueprint.md` | Reference and starting point, not a lock. Its Visual Thesis is the one idea worth preserving. |
| `../../content.md` | **Binding for copy and factual claims.** VIZ changes how words are presented, never what they say. |
| `../wo/WO-STATUS.md` | Read-only. VIZ does not change `WO` state. |

Rewording approved copy is a `WO` concern with its own owner-approval gate. If a
VIZ order needs different words to make a visual idea work, it stops and asks
rather than editing `content.md` itself.

## The One Idea Worth Keeping

From the component blueprint:

> **Precise software emerging from fluid computational depth.**

The interface should feel technical, atmospheric, and cinematic without drifting
into gaming, cyberpunk, or generic developer-portfolio clichés.

VIZ-001 may replace this thesis. It may not ignore it silently.

## Standing Constraints

Three, and they are coordination and quality rules rather than creative limits.

1. **Reduced motion.** Every animated thing needs a reduced-motion state. This
   is cheap, the codebase already does it everywhere, and it is the difference
   between an ambitious site and one that makes some people ill.
2. **Do not break what shipped.** `/work/aegis` passed a `GO` release review on
   2026-07-31 with zero axe violations. VIZ may restyle it, but a VIZ order that
   touches shared tokens or primitives re-verifies that route before handoff.
3. **Stay out of Batch 04's write scope.** See below. Both lines run in
   parallel; a merge conflict in the middle of a capture batch costs more than
   the coordination does.

Everything else — dependencies, layout, section order, WebGL budgets, the
managed-effect architecture, the seven "locked" components — is open.

## Parallel Execution with Batch 04

Batch 04 (`../wo/BATCH-04-README.md`) builds the Quant chapter at the same time.
The file split below was verified on 2026-08-03 and is designed so neither line
blocks the other.

### VIZ owns

```text
src/app/page.tsx
src/app/layout.tsx
src/app/globals.css
src/components/sections/**
src/components/effects/**
src/components/webgl/**
src/components/layout/**
src/components/ui/**
package.json  (VIZ may add motion runtimes; Batch 04 adds nothing)
```

`src/components/sections/project-showcase.tsx` is **VIZ-owned**. It renders the
case-study link generically from `project.name` and `project.href`, so Batch 04
never needs to edit it — WO-027's write scope was reduced accordingly.

### Batch 04 owns

```text
src/content/**
src/types/case-study.ts
src/components/case-study/**
src/app/work/**
public/work/q/**
docs/content.md
docs/q-case-study-*.md
```

### Shared — coordinate before writing

```text
src/app/globals.css              VIZ owns tokens; Batch 04 reads them
docs/component-provenance.md     both append; never rewrite another line's entries
src/app/__tests__/page.test.tsx  VIZ changes composition; Batch 04 changes link expectations
```

A VIZ order that must change a Batch 04 file, or vice versa, stops and reports
rather than reaching across. If `globals.css` tokens change, say so in the
handoff — Batch 04's captures and the Aegis contrast fix both depend on them.

## Dependency Order

```text
VIZ-001 Visual Direction and Cinematic Language
  └─ VIZ-002 Motion Runtime Foundation
       ├─ VIZ-003 Hero
       ├─ VIZ-004 Scroll Choreography and Section Transitions
       └─ VIZ-005 Selected Work Stage
            └─ VIZ-006 Performance, Accessibility, and Release Review
```

VIZ-003, VIZ-004, and VIZ-005 may run in parallel once VIZ-002 is `DONE`, if
each takes a distinct file scope and they rebase on each other. That is a
deliberate difference from the `WO` line, where every order froze inputs for the
next one.

## Work Order Index

| ID | Work Order | Primary output |
| --- | --- | --- |
| VIZ-001 | [Visual Direction and Cinematic Language](./VIZ-001-visual-direction.md) | Evaluated current page, approved direction, decision ledger |
| VIZ-002 | [Motion Runtime Foundation](./VIZ-002-motion-runtime-foundation.md) | Lenis + Motion + GSAP + WebGL runtime with one owner per concern |
| VIZ-003 | [Hero](./VIZ-003-hero.md) | The first screen, as the defining statement |
| VIZ-004 | [Scroll Choreography and Section Transitions](./VIZ-004-scroll-choreography.md) | How the page moves as one continuous piece |
| VIZ-005 | [Selected Work Stage](./VIZ-005-selected-work-stage.md) | The project showcase as the portfolio's centerpiece |
| VIZ-006 | [Performance, Accessibility, and Release Review](./VIZ-006-release-review.md) | `GO`/`NO-GO` on the cinematic landing page |

## Line Completion Rule

The VIZ line's first phase is complete when VIZ-006 records a `GO`. Individual
orders landing is not completion — the point is one coherent page, and that can
only be judged assembled.
