# Portfolio Website — Work Orders, Batch 01

## Purpose

This batch produces one complete homepage prototype from the locked component blueprint. These are execution recipes, not design briefs. Implementing agents are expected to follow the specified architecture, copy, dimensions, tokens, component settings, and checks.

## Mandatory Reading

Before starting any Work Order, read:

1. `docs/FOUNDATIONAL-IDEA.txt`
2. `docs/portfolio-component-blueprint.md`
3. `docs/work-orders/wo/IMPLEMENTATION-SPEC.md`
4. The assigned Work Order

Do not start from `docs/component-links.txt` alone; it is only a link list.

## Rule for Ambiguity

Agents must not improvise when an instruction is unclear.

1. Re-read `docs/work-orders/wo/IMPLEMENTATION-SPEC.md`.
2. Inspect files created by prerequisite Work Orders.
3. Choose the smallest implementation that preserves the specified output.
4. Record the ambiguity in the handoff.

Do not change the page structure, copy, palette, component selection, breakpoints, or motion values to solve an implementation problem.

## Fixed Technical Direction

- Next.js App Router
- React and strict TypeScript
- Tailwind CSS and CSS custom properties
- Geist Sans and Geist Mono
- npm with `package-lock.json`
- Server Components for page composition
- Client Components only for effects and stateful interaction
- No CMS, database, authentication, analytics, contact backend, UI kit, or second animation system

## Execution Waves

```text
Wave 1
  WO-001 Application Foundation

Wave 2
  WO-002 Tokens and Shared Primitives

Wave 3
  WO-003 Content and Page Skeleton

Wave 4
  WO-004 Line Waves Effect

Wave 5
  WO-005 Hero and Liquid Metal CTA
  WO-006 About and Scroll Reveal
  WO-007 Technologies and Logo Loop
  WO-008 Project Showcase Structure
  WO-011 Contact, Dotted Surface, and Footer

Wave 6
  WO-009 Selected Work Sparkles Accent
  WO-010 Shape Blur Project Interaction

Wave 7
  WO-012 Integration, Accessibility, and Performance
```

Do not run Work Orders from the same wave in parallel unless their prerequisites are complete and their ownership tables do not overlap.

## Work Order Index

| ID | Work Order | Prerequisites | Primary output |
| --- | --- | --- | --- |
| WO-001 | [Application Foundation](./WO-001-application-foundation.md) | None | Runnable Next.js repository |
| WO-002 | [Tokens and Shared Primitives](./WO-002-tokens-shared-primitives.md) | WO-001 | Fixed tokens, fonts, layout and motion utilities |
| WO-003 | [Content and Page Skeleton](./WO-003-content-page-skeleton.md) | WO-002 | Typed content and semantic section composition |
| WO-004 | [Line Waves Effect](./WO-004-line-waves-effect.md) | WO-002, WO-003 | Adapted hero background |
| WO-005 | [Hero and Liquid Metal CTA](./WO-005-hero-liquid-metal-cta.md) | WO-004 | Finished hero content and CTA |
| WO-006 | [About and Scroll Reveal](./WO-006-about-scroll-reveal.md) | WO-002, WO-003 | Finished About section |
| WO-007 | [Technologies and Logo Loop](./WO-007-technologies-logo-loop.md) | WO-002, WO-003 | Finished Technologies section |
| WO-008 | [Project Showcase Structure](./WO-008-project-showcase-structure.md) | WO-002, WO-003 | Fixed four-project presentation |
| WO-009 | [Selected Work Sparkles Accent](./WO-009-selected-work-sparkles.md) | WO-008 | Localized heading transition |
| WO-010 | [Shape Blur Project Interaction](./WO-010-shape-blur-interaction.md) | WO-008 | Single active-project effect |
| WO-011 | [Contact, Dotted Surface, and Footer](./WO-011-contact-dotted-surface-footer.md) | WO-002, WO-003 | Finished closing scene |
| WO-012 | [Integration, Accessibility, and Performance](./WO-012-integration-accessibility-performance.md) | WO-005–WO-011 | Review-ready first prototype |

## Required Agent Workflow

Every agent must execute these steps:

1. Run `git status --short` and record pre-existing changes.
2. Read the mandatory documents.
3. Confirm prerequisite output files exist.
4. Touch only files listed under “Files to Create or Modify.”
5. Follow the numbered implementation procedure in order.
6. Run the Work Order’s automated checks.
7. Perform its manual checks.
8. Compare the result against every acceptance checkbox.
9. Return the standard handoff.

## Standard Handoff Format

Use this exact structure:

```text
Work Order: WO-XXX
Status: complete | partial | blocked

Implemented:
- ...

Files changed:
- ...

Dependencies:
- package — reason

Validation:
- command — pass/fail
- manual check — pass/fail

Acceptance criteria not met:
- none | exact unmet item

Notes for the next agent:
- ...
```

An agent may report `complete` only when every acceptance checkbox is true.

## Batch Completion Rule

Batch 01 is complete only after WO-012 passes. Completion of the seven component integrations alone is not sufficient.
