# WO-053 — Credential Card Redesign

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-053 row is
`READY`.

## Result to Produce

Education and International Experience cards with real anatomy, an aligned rest
state, and a stacking motion that reads as deliberate depth — sharing the card
vocabulary WO-052 established for career chapters.

## Prerequisites

- WO-052 `DONE`, with the career-card vocabulary frozen.
- WO-051 credential-card direction approved, including the owner's answer on
  credential order.

## Branch and Files

Create `wo/wo-053-resume-credential-card-redesign` from the WO-052 commit.

```text
src/components/resume/resume-credential-stack.tsx
src/components/resume/__tests__/resume-credential-stack.test.tsx
src/app/globals.css                         (resume-credential-* only)
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

If the owner approved a credential reorder, that is a content change: it lands
first as a separate, owner-approved WO-040 amendment commit in
`src/content/resume.ts`, never inside this order's presentation commits.

## Design Contract

- **Anatomy instead of a headline in a box.** The period, institution, and
  program each get a defined place, following the approved direction. The card
  no longer leaves most of its area empty at 1440/1730.
- **Repeated institution.** Two cards share `SATC (Brazil)`. The design must
  stop the repetition from dominating — through hierarchy, not by removing the
  text: each card still states its institution for assistive technology.
- **Aligned at rest.** When the stack is settled, or in any static mode, cards
  are the same width and aligned. Scale is a mid-motion effect only.
- **Legible stacking.** While stacking, each covered card keeps a visible header
  strip (period and institution), so the stack reads as a pile of credentials
  rather than cards vanishing.
- **Shared vocabulary.** Chrome, index, and hairline treatment match WO-052.

## Invariants

- One ordered list; one article per credential; enhanced and static lists render
  identical fields.
- Motion stays on the existing `useScroll`/`useTransform` pattern; sticky
  stacking only applies inside the existing desktop/fine-pointer/height media
  gate and is removed under reduced motion.
- No new content, dependency, or animation runtime.

## Non-Goals

- Changing the number of credentials or merging entries.
- Adding crests, logos, degrees, or grades.
- Languages and convergence (WO-054/WO-055).

## Ordered Implementation

1. Record the base commit, current tests, and baseline captures including a
   mid-stack frame.
2. Add tests first: one article per credential; identical fields in both modes;
   the rest-state scale is `1`; the header-strip element exists per card.
3. Restructure the card markup for the approved anatomy.
4. Rework the stacking ranges so scale returns to `1` at rest and header strips
   stay visible mid-stack.
5. Verify forward/reverse scroll, resize across the media gate, reduced motion,
   200% zoom, 375 wide, and no-JS in both locales.
6. Update provenance, run validation, commit, move WO-053 to `REVIEW`, and stop.

## Automated Checks

```bash
pnpm run test
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
git diff -- package.json pnpm-lock.yaml pnpm-workspace.yaml
```

## Acceptance Checklist

- [ ] Cards follow the approved anatomy with no dominant empty area.
- [ ] Rest and static states are aligned at equal width.
- [ ] Mid-stack frames show each covered card's header strip.
- [ ] The repeated institution no longer dominates and remains fully accessible.
- [ ] Reduced motion, 375, 200% zoom, and no-JS show the complete list.
- [ ] No manifest or runtime change; validation passes.

## Handoff

Report the commit; before/after rest and mid-stack captures; any content
amendment commit made on owner authority; tests; provenance; and open items.
