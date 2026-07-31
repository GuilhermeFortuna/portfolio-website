# WO-029 — Visual Integration and Release Review

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-029 row is
`READY`.

## Result to Produce

Issue an independent `GO` or `NO-GO` for Batch 04 based on source fidelity,
portfolio-system continuity, equal project-page weight, factual
integrity, forced-motion policy, scroll-runtime ownership, browser behavior,
accessibility, lifecycle correctness, WebGL stability, media integrity, and
production performance.

## Prerequisites

- WO-028 `DONE`

## Files to Create or Modify

```text
docs/aegis-case-study-visual-release-review.md
docs/work-orders/wo/WO-STATUS.md
```

Modify implementation/tests only to fix a reproduced blocker or major finding.
Record each correction and rerun its entire affected matrix.

## Review Matrix

### Source and adaptation fidelity

- Recalculate every copied source hash and compare it with the accepted WO-024
  register; verify canonical URL, immutable revision, source hash, and
  `Adapted from` comment.
- Compare Threads, Animated Content, Fade Content, Scroll Progress, Sticky
  Scroll Reveal, Scroll Stack, and Glare Hover against their pinned sources.
- Confirm each signature mechanic remains recognizable and every deviation is
  limited to semantic content, shared runtime integration, portfolio tokens,
  responsive behavior, accessibility repair, and cleanup.
- Fail the release if a listed component was silently substituted or rebuilt
  from scratch.

### Portfolio visual continuity and equal weight

- The route uses the existing canvas/surface/text/accent tokens, Geist type,
  shared header, widths, gutters, spacing, radii, focus treatment, and
  case-study primitives.
- No Aegis-only palette, product chrome, dashboard shell, iris/shield motif, or
  project-identity reskin appears outside approved evidence assets.
- Shared primitives contain no Aegis copy, image path, mark, or special-case
  styling and can accept another project's approved content.
- Aegis is presented as the first case study, with no greater importance than another
  project. Search active source and docs for language that gives Aegis special project status; no match is allowed.
- The route has real compositional contrast across opening, architecture,
  decisions/evidence, and close; it must not read as disconnected component demos.

### Truth and content integrity

- Compare copy, order, headings, media, captions, metadata, and links against
  WO-020 and the Batch 03 release review.
- Verify no employer, production data, internal identifier, repository link,
  unsupported outcome, or invented metric appears.
- Hash all six Aegis media files and compare with WO-019.

### Motion, Lenis, and forced-motion ownership

- Confirm exact direct dependencies `motion@12.43.0` and `lenis@1.3.25`.
- Exactly one `MotionConfig reducedMotion="never"` and one root `ReactLenis`
  wrap the site. No component constructs Lenis, calls root `useScroll`, creates
  a page RAF, owns a global ticker, or adds a nested smooth scroller.
- Lenis feeds ScrollTrigger updates and the one GSAP ticker; the callback and
  subscription are removed at provider cleanup.
- Motion owns state/layout/presence/pointer transitions, GSAP owns accepted
  timelines, Lenis owns smooth document scroll, CSS owns simple transitions,
  and the WebGL manager owns canvas animation.
- Test OS `no-preference` and `reduce`; animation behavior must be identical.
  Current implementation and policy docs contain no active preference branch.
- Record the owner-chosen absence of a reduced-motion alternative as an explicit
  accessibility limitation, not a release defect.

### Accessibility and resilient content

- Keyboard order, landmarks, headings, focus, skip link, fragment links, native
  video controls, visible captions, and 44px interactive targets.
- Keyboard, wheel, touch, anchors, sticky positioning, text selection, history
  restoration, 200% zoom, narrow reflow, and no horizontal overflow.
- JavaScript disabled, WebGL unavailable/context lost, image/video failure, and
  slow resources preserve the complete readable story.
- Run axe and document automation limits; do not claim full WCAG conformance.

### WebGL, lifecycle, and performance

- Exactly one case-study canvas/context; homepage context and cost budgets stay
  unchanged. Verify DPR cap, hidden-tab/offscreen pause, context recovery, and
  route-exit disposal.
- Count Lenis instances, scroll listeners, observers, frames, GSAP tickers and
  ScrollTriggers, Motion subscriptions, contexts, and pointer listeners before
  entry, while active, and after exit.
- Run a five-minute top-to-bottom/reverse-scroll soak and record console errors,
  context count, heap direction, and long tasks.
- Review Chromium, Firefox, and WebKit at 1440×900, 1280×800, 1024×768,
  768×1024, 390×844, and 320×568 in a production build.
- Record LCP, CLS, INP when measurable, transferred bytes, JS delta from Batch
  03, canvas count, long tasks, and image/video requests. Target CLS `<= 0.05`;
  require no uncaught error and no ordinary-scroll task over `50ms` on the
  review machine.

## Procedure

1. Confirm WO-023's Batch 03 `GO` evidence and capture repository status.
2. Verify the source snapshot register and recompute source hashes.
3. Run repository checks plus source, runtime-owner, policy, and terminology searches.
4. Execute the browser, input, capability, lifecycle, and performance matrix.
5. Compare consistent captures at 1440×900, 768×1024, and 390×844 across
   opening, architecture, decisions/evidence, and close; compare the complete
   route with the existing portfolio shell, not with Aegis product UI.
6. Classify findings `BLOCKER`, `MAJOR`, `MINOR`, or `NOTE`; `GO` permits no
   blocker or major finding.
7. Apply only minimal corrections, document them, rerun affected checks, and
   stop servers, browser sessions, traces, and profiling processes.
8. Record `GO` or `NO-GO`; mark Batch 04 `DONE` only after `GO`.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
pnpm list motion lenis --depth 0
rg -n "prefers-reduced-motion|useMotionPreference" src README.md docs/component-provenance.md docs/portfolio-component-blueprint.md
rg -n "new Lenis|useScroll\(|scroll-behavior: *smooth" src/components src/app
rg -n "requestAnimationFrame" src/components/providers src/components/case-study src/components/ui/scroll-progress.tsx src/components/effects/animated-content.tsx src/components/effects/fade-content.tsx src/components/effects/sticky-scroll-reveal.tsx src/components/effects/scroll-stack.tsx src/components/effects/glare-hover.tsx
rg -n -i "Aegis.{0,40}(flag|ship|premier|primary|most important)" src README.md docs
git diff --check
```

All four `rg` commands must return no match. The managed Threads WebGL render
loop is deliberately outside the non-WebGL RAF search and must be inspected
separately under the WebGL lifecycle matrix.

## Acceptance Checklist

- [ ] Every sourced component matches its immutable public source snapshot.
- [ ] Signature mechanics remain recognizable; no component was custom-rebuilt.
- [ ] The route clearly belongs to the portfolio system, not the Aegis product UI.
- [ ] Shared primitives are reusable and Aegis has no special visual hierarchy.
- [ ] Active source and docs give Aegis no special project status.
- [ ] Approved copy, facts, order, media, hashes, metadata, and links are unchanged.
- [ ] Motion/Lenis versions and one-owner runtime boundaries are proven.
- [ ] OS motion preference produces no behavior difference or active branch.
- [ ] Keyboard, input, semantics, zoom, reflow, fragments, and native media pass.
- [ ] Failure states preserve the complete readable story.
- [ ] Browser, lifecycle, performance, request, and console evidence is recorded.
- [ ] Homepage visuals and WebGL budgets do not regress.
- [ ] No blocker or major finding remains; final `GO` or `NO-GO` is recorded.

## Handoff

Include the decision, finding table, source revision/hash audit, source versus
adaptation comparisons, portfolio-continuity and reusability review, phase
captures, browser/input matrix, forced-motion equivalence proof, accessibility
limitation, truth/media comparison, runtime ownership and lifecycle table, soak
and performance results, corrections, remaining notes, and exact recommendation.
