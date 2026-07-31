# WO-023 — Case-Study Integration and Release Review

## Status

See `[WO-STATUS.md](WO-STATUS.md)`. Dispatch only when the WO-023 row is
`READY`.

## Result to Produce

An independent `GO` or `NO-GO` decision for the first Aegis case study based on
truthfulness, confidentiality, media integrity, browser behavior,
accessibility, performance, metadata, cleanup, and homepage integration.

## Prerequisites

- WO-022 `DONE`

## Files to Create or Modify

```text
docs/aegis-case-study-release-review.md
docs/work-orders/wo/WO-STATUS.md
```

Modify implementation or tests only to correct a reproducible acceptance
failure. Record each correction and rerun the affected checks.

## Review Matrix



### Truth and confidentiality

- Compare every rendered sentence to WO-018 and WO-020.
- Search built output and assets for the former employer, real brands, internal
hosts, project IDs, credentials, real people/player identifiers, and required
markers.
- Confirm production delivery is not converted into a business-impact claim.
- Confirm the public version is described as sanitized/evolved.



### Browser and responsive behavior

- Chromium, Firefox, and WebKit current stable engines.
- Viewports: 1440×900, 1024×768, 768×1024, and 375×780.
- Direct route load, homepage → Aegis, browser back, hard reload, and unknown
`/work/*` behavior.
- JavaScript disabled and slow/failed media requests.



### Accessibility

- Keyboard order, skip link, focus visibility, 44px targets.
- Landmark and heading hierarchy.
- Image alternatives and video accessible name/summary/controls.
- Reduced motion, 200% zoom, responsive reflow, and no horizontal overflow.
- Automated axe scan plus manual verification; do not claim full WCAG
conformance from automation alone.



### Media and lifecycle

- Poster-first display and native controls.
- No automatic play under reduced motion or Save-Data.
- Offscreen/hidden-tab behavior if preview exists.
- No media or observer activity after route exit.
- Six asset hashes and byte sizes match WO-019.



### Performance and metadata

- Production build only, not dev-server timing.
- Record LCP, CLS, INP when measurable, transferred bytes, image/video request
behavior, and console errors.
- The 17.3 MB 4K source is absent.
- `/work/aegis` title, description, canonical behavior once a canonical base
exists, Open Graph fallback, server HTML, and private-source semantics.
- Homepage WebGL budgets and draw-call behavior remain unchanged.



## Procedure

1. Start from a clean production build and record repository status.
2. Run all automated repository checks.
3. Execute the review matrix and save bounded evidence in
  `docs/aegis-case-study-release-review.md`.
4. Classify each finding as `BLOCKER`, `MAJOR`, `MINOR`, or `NOTE`. A `GO`
  permits no blocker or major finding.
5. If correcting an implementation defect, make the smallest scoped change,
  document it, and rerun its full affected matrix.
6. Verify all temporary servers, browser sessions, traces, and profiling
  processes are stopped.
7. Record `GO` or `NO-GO` in the gate log. Mark WO-023 and Batch 03 `DONE` only
  after `GO`.



## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
```

Run secret/identifier scans against changed source, `public/work/aegis`, and
the production output without printing any matched secret value.

## Acceptance Checklist

- [ ] Every rendered claim matches the accepted evidence/content contracts.
- [ ] Confidential/company/production data scans pass.
- [ ] Chromium, Firefox, WebKit, viewport, navigation, no-JS, and media-failure
  ```
  checks pass.
  ```
- [ ] Keyboard, semantics, media alternatives, reduced motion, zoom, reflow,
  ```
  and axe checks have evidence.
  ```
- [ ] Media hashes/sizes match and the 4K source is absent.
- [ ] Production performance and request behavior are recorded.
- [ ] Metadata and server-rendered HTML are correct.
- [ ] Homepage WebGL behavior and budgets did not regress.
- [ ] No blocker or major finding remains.
- [ ] Repository checks pass and temporary processes are stopped.
- [ ] A final `GO` or `NO-GO` is recorded.



## Handoff

Include the decision, finding table, browsers/versions, viewport evidence,
accessibility limitations, performance metrics, transfer/request table,
truth/confidentiality scan summary, corrections made, remaining minor notes,
and exact release recommendation.
