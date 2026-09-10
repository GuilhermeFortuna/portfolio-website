# WO-055 — Gemini Convergence Refinement

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-055 row is
`READY`.

## Result to Produce

The Resume's closing payoff: the adapted Aceternity Google Gemini paths frame
the close at full width, draw together as the reader arrives, and converge on a
focal point where the primary closing actions sit. The closing actions become
proper primary/secondary controls from the site's existing CTA vocabulary.

## Prerequisites

- WO-054 `DONE`.
- WO-051 convergence direction approved, including which action is primary.

## Branch and Files

Create `wo/wo-055-resume-gemini-convergence` from the WO-054 commit.

```text
src/components/resume/resume-convergence.tsx
src/components/resume/__tests__/resume-convergence.test.tsx
src/app/globals.css                          (resume-convergence* only)
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

## Problems to Fix

From the owner review and the current implementation:

- The paths are a short band (`clamp(10rem, 24vw, 15rem)`) under the content, at
  0.72 group opacity and ≤ 0.62 stroke opacity — too small and dim to be a
  payoff.
- The convergence point in the middle of the geometry is empty; nothing
  connects the paths to the actions.
- The blur copies are always fully drawn, so the progressive draw of the sharp
  strokes reads as a smear over a static glow.
- The five draw ranges start at staggered points but all end at 1.2, so the
  strokes never complete together in view.
- Reduced motion hides the paths entirely, which leaves the fallback without the
  closing element.
- The actions are plain underlined links with no primary.

## Design Contract

- **Frame the close.** The path field spans the chapter at full bleed within the
  page container and has enough height to read as the dominant element for this
  viewport — the only dominant element.
- **Converge on the actions.** The geometric convergence point sits on the
  closing actions (or a focal mark directly behind them), per the approved
  direction.
- **Draw together.** Draw ranges are retuned so all strokes complete while the
  focal point is in view. The glow layer follows the same progress as its sharp
  stroke instead of being static.
- **Token color.** Strokes use the existing accent tokens, with enough opacity to
  register on the dark ground and never reduce text contrast below the site's
  existing minimum.
- **Static fallback.** Reduced motion and non-enhanced modes show the paths fully
  drawn and still, at reduced intensity. No-JS still shows every action.
- **Actions.** One primary control and secondary controls, using the site's
  existing CTA styling; keyboard focus stays visible above the paths.

## Invariants

- Aceternity's path geometry and the SVG + Motion `pathLength` approach are
  kept. Presentation, ranges, sizing, and layering are the adaptation, and they
  are recorded in provenance.
- The paths layer is `aria-hidden` and ignores pointer events; the actions stay
  real links with unchanged `href`/`download` targets.
- No canvas, WebGL, new dependency, or `requestAnimationFrame` loop. Filters stay
  within the WO-044 long-task and frame budgets — measure them.

## Non-Goals

- Changing action targets, labels, or the PDF files.
- Adding particles, sound, or cursor interaction.
- The languages block (WO-054).

## Ordered Implementation

1. Record base commit, captures at the start, middle, and end of the draw, and a
   performance trace of the current close.
2. Add tests first: every action keeps its `href`/`download`; the paths layer is
   `aria-hidden`; reduced/fallback modes render static, fully drawn paths; glow
   paths bind to progress.
3. Rebuild the layout: path field size and placement, focal point, action
   hierarchy.
4. Retune ranges, the glow binding, and stroke colors.
5. Verify slow/fast forward and reverse scroll, resize, reduced motion, 375,
   200% zoom, and no-JS in both locales; record a performance trace against the
   WO-044 budgets.
6. Update provenance, run validation, commit, move WO-055 to `REVIEW`, and stop.

## Automated Checks

```bash
pnpm run test
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
git diff -- package.json pnpm-lock.yaml pnpm-workspace.yaml
rg -n "requestAnimationFrame|<canvas|WebGL" src/components/resume
sha256sum public/resume/*.pdf
```

## Acceptance Checklist

- [ ] The path field is the single dominant element of the close at desktop.
- [ ] Strokes converge on the closing actions and complete together in view.
- [ ] Glow follows draw progress; nothing smears.
- [ ] Reduced motion and fallback modes show static paths; no-JS shows all actions.
- [ ] One primary action; all targets, labels, and PDF hashes unchanged.
- [ ] No long task over 200 ms, no frame-stability regression; validation passes.

## Handoff

Report the commit; start/mid/end captures in both locales; the reduced-motion
and mobile frames; before/after performance traces; provenance; and open items.
