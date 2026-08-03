# VIZ-006 — Performance, Accessibility, and Release Review

## Status

See [`VIZ-STATUS.md`](VIZ-STATUS.md). Dispatch only when the VIZ-006 row is
`READY`.

## Result to Produce

A `GO` / `NO-GO` decision on the cinematic landing page, judged assembled.

VIZ-003, VIZ-004, and VIZ-005 run in parallel and each sees only its own
section. This order is the first time anyone judges the page as one thing —
which is the only way a cinematic page can be judged.

## Prerequisites

- VIZ-003, VIZ-004, and VIZ-005 all `DONE`, committed and frozen at a named
  commit

## Files to Create or Modify

```text
docs/design/viz-release-review.md
docs/work-orders/viz/VIZ-STATUS.md
```

Change product code only to correct a reproducible acceptance failure, and only
with recorded owner authorization. WO-023's contrast fix is the precedent: the
review found it, referred the shared-token change to the owner, applied it on
authority, and re-ran everything.

## Review Against a Production Build

`next build` + `next start`, never a dev server. WO-022 reported a hydration
error that did not reproduce in production, and WO-023 confirmed it was
dev-only. Do not repeat that.

## 1. Does It Work as One Page

The question the three parallel orders could not answer:

- Scroll top to bottom slowly, then quickly, then in a flick. Does it feel like
  one composed piece or three separate ideas?
- Does any section fight another for attention?
- Is there still exactly one dominant visual moment per viewport, or did three
  agents each build a dominant moment?
- Does the eye land where the content hierarchy wants it to?

This is a judgement call and it is the most important section of this review.
Record it with a full-page recording and an honest verdict, including
disagreement with the approved direction if the assembled result argues against
it.

## 2. Truth and Copy

- Every visible string still matches `docs/content.md` verbatim. Report block
  and mismatch counts.
- Zero `[REQUIRED:`, `[CONFIDENTIAL:`, forbidden terms, or fake links.
- No invented metric, client, date, or outcome was introduced by visual copy,
  captions, or alt text.

## 3. Accessibility

The bar is what `/work/aegis` already meets — zero axe violations.

- `axe-core` on `/`, settled and under reduced motion. **Scan settled**: WO-023
  found 28 phantom contrast violations from scanning a GSAP reveal mid-animation
  at `opacity: 0.3`. If VIZ-003 chose to animate contrast, honor its recorded
  decision here.
- Real native `Tab` traversal, not synthetic `focus()` calls. WO-021 and WO-022
  both failed to do this and carried the gap forward; WO-023 finally closed it.
- Skip link first; `Enter` moves real focus to `#main-content`.
- No interactive target under 44 px.
- Reduced motion: complete, readable, deliberately composed — not the animated
  page with motion subtracted.
- JavaScript disabled: the page still delivers its content and actions.
- 200% zoom and 375 px width with zero horizontal overflow.
- Confirm the WO-023 open finding F-03 (`LogoLoop` keyboard access) was closed
  by VIZ-004 or record it as still open.

## 4. Performance

- LCP, CLS, INP, total transferred bytes, request count, console errors.
- **Baselines to beat or justify:** the shipped homepage measured LCP 80 ms,
  CLS 0, 306.0 KiB over 19 requests, 0 console errors, and 2 canvases / 2 WebGL
  contexts. A cinematic page may legitimately cost more. It may not cost more by
  accident — every regression is either justified in writing or fixed.
- Sustained frame rate scrolling top to bottom, per browser, at 1440×900 and on
  a mobile viewport. Report the worst sustained figure, not the average.
- Leak check: navigate `/` ↔ `/work/aegis` ten times and record listener, RAF,
  and WebGL context counts before and after.
- Mobile: DPR cap honored, GPU-heavy effects simplified or absent.
- Behavior on a hidden tab and after a resize.

## 5. Cross-Browser

Chromium, Firefox, and WebKit, at 1440×900, 1024×768, 768×1024, 375×780, and
200% zoom. WO-023 ran WebKit in
`mcr.microsoft.com/playwright:v1.62.1-noble` because Fedora 44 lacks the Ubuntu
ABI libraries the host build needs; expect to do the same.

## 6. No Regression Elsewhere

- `/work/aegis` renders and behaves exactly as it did at its `GO`. If shared
  tokens changed, re-run its contrast and axe checks in full.
- If Batch 04 landed `/work/q` by now, include it.
- `--color-text-dim` is `#7a8496` for a reason — worst case 4.80:1, raised from
  a failing 3.63:1. If any VIZ order changed it, re-verify every surface.

## 7. Specification Consistency

Every supersession VIZ-001 through VIZ-005 recorded is actually reflected in
`IMPLEMENTATION-SPEC.md`. A `WO` agent reading that document must not be
following a page that no longer exists. Stale sections are a finding.

## Procedure

1. Freeze the commit and record it.
2. Build for production and serve. Record every engine version.
3. Work sections 1–7 in order, recording evidence per item with viewport,
   browser, and motion mode.
4. Classify findings `MAJOR` / `MINOR` with reproduction steps.
5. Any `MAJOR` is `NO-GO`. Refer shared-token and cross-route fixes to the owner.
6. Re-run everything after any authorized correction.
7. Write `docs/design/viz-release-review.md` with the full matrix.
8. Record `GO` or `NO-GO` in the VIZ-STATUS gate log with rationale.
9. Stop every temporary server, browser, and container; confirm no owner process
   or port was disturbed.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
```

## Acceptance Checklist

- [ ] Reviewed a production build of a frozen commit.
- [ ] The assembled-page judgement is recorded honestly, with a recording.
- [ ] Copy fidelity verified with counts.
- [ ] axe scanned settled; target zero violations on `/`.
- [ ] Real native `Tab` traversal performed.
- [ ] Reduced motion, no-JS, zoom, and five viewports across three engines.
- [ ] LCP, CLS, INP, bytes, requests, and worst sustained frame rate recorded
      against the stated baselines, with every regression justified or fixed.
- [ ] Leak counts recorded before and after repeated navigation.
- [ ] `/work/aegis` proven unregressed.
- [ ] `IMPLEMENTATION-SPEC.md` matches the shipped page.
- [ ] Every finding classified with reproduction steps.
- [ ] `GO` or `NO-GO` recorded with rationale.
- [ ] All temporary processes stopped.

## Handoff

Include the decision, the full evidence matrix, the assembled-page verdict and
recording, every finding with severity and reproduction, any authorized
correction and its re-verification, the performance comparison against baseline,
proof of no regression elsewhere, and the follow-up orders worth opening.
