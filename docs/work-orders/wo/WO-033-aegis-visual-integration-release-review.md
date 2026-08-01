# WO-033 — Aegis Visual Integration and Release Review

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when WO-033 is `READY`.

## Result to Produce

Issue an independent `GO` or `NO-GO` for Batch 04. Review source fidelity,
visible compositional quality, portfolio continuity, equal project weight,
truth/media integrity, forced motion, one-owner runtime behavior, accessibility,
lifecycle correctness, WebGL stability, and production performance.

## Prerequisites

- WO-032 `DONE`

## Files to Create or Modify

```text
docs/aegis-case-study-visual-release-review.md
docs/work-orders/wo/WO-STATUS.md
```

Modify implementation/tests only to correct a reproduced blocker or major
finding. Record and revalidate every correction.

## Source and Visual-Fidelity Matrix

- Recompute the WO-024 hashes and verify every `Adapted from` header.
- Compare D-006 BSMNT, D-008 cylinder/particles, D-009 kinetic type, D-010 Flip
  aperture, D-011 chapter instrument, D-012 panel takeover, D-013 Variation 3,
  and D-014 closing morph against their selected demos and sources.
- Fail if a selected mechanic was substituted, rebuilt from scratch, reduced to
  a generic reveal, or altered beyond portfolio styling/runtime/accessibility
  integration.
- Capture matched start/mid/end states for each major mechanic. Passing tests
  cannot compensate for weak scale, pacing, depth, layering, or visual impact.

## Portfolio, Truth, and Evidence Matrix

- Confirm Geist, portfolio tokens, grid, surfaces, spacing, radii, focus, header,
  and shared case-study primitives own the route.
- Confirm no Aegis product skin, shield/iris motif, unique page palette, or
  flagship/primary-project language exists.
- Compare all visible copy, section order, metadata, links, captions, map labels,
  and six asset hashes with Batch 03.
- Verify every evidence inspection state is frontal, uncropped, and readable;
  video remains native and user controlled.
- Confirm Aegis closing targets `/#work` until another real route is published.

## Runtime and Forced-Motion Matrix

- Exact direct `motion@12.43.0`, `lenis@1.3.25`, and pinned BSMNT evidence.
- Exactly one MotionConfig, root Lenis, GSAP ticker integration, BSMNT scene
  root, and managed case-study WebGL context.
- No component-local Lenis, root Motion `useScroll`, global ticker, page RAF,
  nested scroller, input observer, or second Canvas/context.
- OS `no-preference` and `reduce` produce the same authored motion. Record the
  absence of a reduced-motion alternative as an explicit owner decision, not a
  release defect.
- Count listeners, observers, ScrollTriggers, tickers, timers, contexts, and
  pointer handlers before entry, while active, and after exit.

## Browser, Accessibility, and Performance Matrix

- Production Chromium, Firefox, and WebKit at 1440×900, 1280×800, 1024×768,
  768×1024, 390×844, 320×568, and 200% zoom.
- Keyboard, wheel, touch, anchors, chapter instrument, video controls, closing
  activation, history restoration, reverse/fast scroll, and interrupted routes.
- JavaScript disabled, WebGL unavailable/context loss, media failure, Save-Data,
  hidden tab, slow resources, and mobile budget preserve a complete story.
- Run axe and report automation limits; do not claim full WCAG conformance.
- Five-minute top-to-bottom/reverse soak: no uncaught errors, leaked contexts,
  upward-only heap trend, or ordinary-scroll long task over 50ms on the review
  machine. Target CLS `<= 0.05`; record LCP, INP when measurable, transferred
  bytes, JS delta, long tasks, and canvas count.

## Procedure

1. Capture clean repository status and verify WO-023 plus WO-024–WO-032 handoffs.
2. Recompute source/media hashes and run policy/runtime/terminology scans.
3. Execute the full browser, input, capability, lifecycle, and performance matrix.
4. Compare consistent captures across hero, narrative aperture, chapter
   instrument, decisions, evidence, and close against selected references.
5. Classify `BLOCKER`, `MAJOR`, `MINOR`, or `NOTE`; `GO` permits no blocker or major.
6. Apply only minimal corrections, rerun affected matrices, and stop all test
   servers, browsers, traces, and profiling processes.
7. Record `GO` or `NO-GO`; mark Batch 04 done only after `GO`.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
pnpm list motion lenis @bsmnt/scrollytelling --depth 0
rg -n "prefers-reduced-motion|useMotionPreference" src README.md docs/component-provenance.md docs/portfolio-component-blueprint.md
rg -n "new Lenis|useScroll\(|scroll-behavior: *smooth|ScrollSmoother|Observer\.create" src/components src/app
rg -n "requestAnimationFrame" src/components/providers src/components/case-study
rg -n -i "Aegis.{0,40}(flagship|premier|primary|most important)" src README.md docs
rg -n "Threads|Animated Content|Fade Content|Scroll Progress|Sticky Scroll Reveal|Scroll Stack|Glare Hover" docs/batch-04-component-source-register.md docs/component-provenance.md src/components/case-study
sha256sum public/work/aegis/*
git diff --check
```

Policy, duplicate-owner, hierarchy, and rejected-source scans must have no
active matches. Review the managed D-008 render loop separately.

## Acceptance Checklist

- [ ] Every D-006/D-008–D-014 mechanic is source-traceable and visually recognizable.
- [ ] The route shows a substantial, coherent compositional transformation.
- [ ] Portfolio styling owns every scene and shared primitives contain no Aegis skin.
- [ ] Aegis receives no special hierarchy and its exit target is truthful.
- [ ] Batch 03 copy, facts, media, hashes, order, metadata, and links are unchanged.
- [ ] One-owner scroll/scene/WebGL boundaries and complete cleanup are proven.
- [ ] Forced authored motion is identical across OS motion preferences.
- [ ] Evidence, video, semantics, keyboard, zoom, reflow, fragments, and no-JS pass.
- [ ] Browser/capability soak has no blocker, major, leak, uncaught error, or
  ordinary-scroll task over 50ms.
- [ ] All repository checks pass and evidence limitations are explicit.

## Handoff

Publish the review document with source/media hash tables, reference-versus-
implementation captures, visual findings, runtime counts, accessibility/input
results, capability/failure results, performance measurements, corrections,
remaining limitations, and final `GO` or `NO-GO`.
