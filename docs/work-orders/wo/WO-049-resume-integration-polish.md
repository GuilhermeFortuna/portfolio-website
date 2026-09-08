# WO-049 — Responsive, Accessible Integration Polish

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-049 row is
`READY`.

## Result to Produce

One cohesive, production-ready Career Operating System across both locales:
scene pacing and visual hierarchy feel authored as a single story; all
responsive/static fallbacks are explicit; accessibility and performance budgets
hold across the complete page; and a named freeze commit is ready for an
independent release review.

## Prerequisites

- WO-048 `DONE`, committed, frozen, and accepted with no open content, action,
  focus, or runtime defect.

## Branch and Files

Create `wo/wo-049-resume-integration-polish` from the accepted WO-048 base.
Write scope is limited to the already-created Resume scene components, their
tests, Resume-owned styles, provenance, and status ledger:

```text
src/components/resume/**
src/app/__tests__/resume-page.test.tsx
src/app/globals.css                              (Resume selectors/tokens only)
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

Do not add a new component source, animation concept, dependency, content field,
route, asset, palette, or dominant effect. This order integrates and subtracts;
it does not expand the approved direction.

## Integration Contract

- At most one scene is pinned/dominant in any viewport. Entry and exit ranges
  leave readable breathing room and never overlap fixed navigation/actions.
- Chapter TOC, tracing beam, scene progress, GSAP, and Motion share one coherent
  lifecycle with deterministic refresh after fonts, resize, and route changes.
- Desktop earns the full narrative. Tablet degrades deliberately. Mobile,
  coarse pointer, 200% zoom, short viewport, reduced motion, save-data where
  detectable, and no-JS render the semantic dossier without animation debt.
- The current Batch 07 timeline is the explicit experience fallback; no hidden
  duplicate content remains exposed to accessibility, find-in-page, or indexing.
- All visual layers use existing tokens and keep the Resume recognizably part of
  the landing-page design system rather than a pasted collection of demos.

## Required Browser Matrix

Where local engines are installed, test production output in Chromium, Firefox,
and WebKit at:

- 1730×900 and 1440×900 with motion enabled;
- 1024×768 at the enhanced/fallback boundary;
- 375×780 and 320×700 in natural document flow;
- a short landscape viewport defined by WO-044;
- 200% browser zoom and OS reduced motion.

For each, record initial load, full forward scroll, reverse scroll, fast scrub,
scrollbar drag, resize across breakpoints, anchor/deep-link load, browser
back/forward, locale switch, keyboard-only traversal, refresh mid-scene, and a
second route visit. Environmental engine gaps must be reported, never counted
as passes.

## Accessibility and Resilience

- One `h1`; ordered headings; complete semantic lists/articles; one accessible
  copy of every fact; exactly one current chapter/navigation destination.
- Native Tab/Shift+Tab/Enter/Escape behavior, visible unobscured focus, skip
  link first, no focus reordering by transforms, and correct hash focus/offset.
- No content or primary action depends on hover, pointer position, animation
  completion, canvas, client hydration, CSS, or successful PDF navigation.
- No horizontal page overflow, scroll trap, blank pin spacer, cumulative sticky
  overlap, duplicate accessible content, or layout jump.

## Performance Gate

Record production measurements for both locales, comparing Batch 07 baseline:

- LCP and CLS;
- transferred bytes, request count, and Resume-attributable client JavaScript;
- long tasks, animation-frame stability during a normal and fast scroll, and
  idle CPU after leaving the route;
- active observers/listeners/ScrollTriggers before mount, during the route, and
  after unmount.

Meet WO-044 budgets. If not, first shorten/remove decorative work, reduce DOM,
and disable enhancement at more conservative thresholds. Do not add memoization,
workers, or new libraries without evidence and a new approved contract.

## Ordered Implementation

1. Record base commit, dirty state, manifests, all scene/progress owners, current
   automated results, and per-locale production baselines.
2. Add integration regressions for semantic uniqueness, chapter/content order,
   runtime cleanup, breakpoint mode selection, and the full action/navigation
   contract before polishing visuals.
3. Run the browser matrix and log every defect with scene, viewport, mode,
   reproduction, severity, and owning component.
4. Fix defects in narrative order, using subtraction when scenes compete. Keep
   every correction inside the approved component/content/runtime contract.
5. Re-run the complete matrix after the last change, including no-JS and failed
   PDF navigation. Capture representative desktop and mobile evidence.
6. Run accessibility inspection and performance profiling on the production
   build, then prove observers/listeners/triggers return to baseline on unmount.
7. Run the full validation twice from a clean build state, update provenance,
   commit only verified corrections, record the named freeze commit, move
   WO-049 to `REVIEW`, and stop. WO-050 requires owner acceptance/`DONE` before
   dispatch.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
NEXT_OUTPUT=export pnpm run build
git diff --check
git diff -- package.json pnpm-lock.yaml pnpm-workspace.yaml
rg -n "React Bits|new Lenis|@react-three|WebGL|requestAnimationFrame" src/components/resume
rg -n "/work/aegis" src/components/resume src/content/resume.ts src/app/\(en\)/resume src/app/\[lang\]/resume
```

Both source scans and the manifest diff must be empty unless a match is an
existing centralized runtime reference explicitly documented in the handoff.

## Acceptance Checklist

- [ ] The complete route reads as one Career Operating System, with no competing
      dominant effects or pasted-demo styling.
- [ ] Both locales pass the complete production browser/viewport/motion/zoom/
      no-JS matrix with zero content mismatch or blocking defect.
- [ ] Heading, list, article, navigation, focus, anchor, and action semantics pass.
- [ ] No overflow, scroll trap, blank spacer, sticky overlap, layout jump, or
      duplicate accessible/indexed content remains.
- [ ] Runtime resources return to baseline after resize, route change, and
      unmount.
- [ ] LCP, CLS, client-JS, transfer, long-task, and frame-stability budgets pass.
- [ ] Normal and static-export builds pass twice from clean output.
- [ ] Provenance is complete, manifests are unchanged, and a named freeze commit
      is ready for WO-050.

## Handoff

Report the freeze commit; before/after scene defect log; complete per-engine and
per-viewport matrix; accessibility tree and keyboard sequence; no-JS/reduced/
zoom/resilience evidence; runtime resource counts; LCP/CLS/bytes/requests/client-
JS/long-task/frame results; test/coverage/lint/type/build/static-build results;
provenance; and every remaining finding with severity.

