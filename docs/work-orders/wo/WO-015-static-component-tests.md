# WO-015 — Static Composition and Navigation Component Tests

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-015 row is `READY`.

## Result to Produce

Component tests that protect the semantic shell and critical static navigation without freezing visual styling or animation internals.

## Prerequisites

- WO-013

## Files to Create or Modify

```text
src/components/layout/__tests__/site-header.test.tsx
src/components/layout/__tests__/site-footer.test.tsx
src/components/layout/__tests__/section-shell.test.tsx
src/app/__tests__/page.test.tsx
```

## Procedure

1. Render `SiteHeader` and test the skip link, labelled primary navigation, expected anchor destinations, accessible names, and keyboard-reachable links.
2. Render `SiteFooter` and test the back-to-top target, approved external-link security attributes, and copyright text sourced from the current content contract.
3. Render `SectionShell` with representative props and test the resulting semantic landmark/heading relationship plus consumer-provided children. Do not assert utility-class strings.
4. Render the homepage composition and assert one `h1`, the approved section IDs in page order, required `h2`s, and four project `h3`s. Mock only browser-incompatible visual-effect leaves; mocks must preserve the component's accessible fallback.
5. Do not snapshot the full homepage. Use role-, label-, and text-based assertions that explain user-visible regressions.

## Automated Checks

```bash
npm run test
npm run test:coverage
npm run lint
npm run typecheck
```

## Acceptance Checklist

- [x] Header skip/navigation behavior is covered.
- [x] Footer actions and external-link safety are covered.
- [x] `SectionShell` semantic behavior is covered without CSS snapshots.
- [x] Homepage semantic outline and section order are covered.
- [x] Visual-effect mocks are local, minimal, and documented in the test.

## Handoff

### Test count and commands

- Added 9 tests across four files; the full suite contains 25 tests across
  nine files.
- `npm run test`: pass — 9 files, 25 tests.
- `npm run test:coverage`: pass — v8 text and HTML reports generated.
- `npm run lint`: pass — 0 errors and 0 warnings.
- `npm run typecheck`: pass — no errors.

### Visible contracts tested

- `SiteHeader`: skip link → `#main-content`, labelled Primary / Primary mobile
  navs with approved destinations, wordmark → `#top`, and Tab reaches skip,
  wordmark, then navigation anchors.
- `SiteFooter`: copyright from `footerContent`, Back to top → `#top`. The
  footer has no external links; `target`/`rel` safety for profile actions is
  asserted on the homepage LinkedIn/GitHub links instead.
- `SectionShell`: named region landmark via `aria-labelledby`, section `id`,
  optional eyebrow label, and consumer children — no utility-class assertions.
- Homepage: one `h1`, section IDs `top → work → process → about → contact`,
  the four required `h2`s, and the four authored project names as `h3`s
  (desktop + mobile trees both render in jsdom; uniqueness is the contract).

### Visual-effect mocks (local to `page.test.tsx`)

| Mock | Accessible surface kept |
| --- | --- |
| `ManagedWebGLEffect` | Always renders `fallback` (Liquid Metal static accent; decorative slots empty). |
| `SparklesAccent` | `null` — real leaf is decorative/`aria-hidden`. |
| `ScrollReveal` | Plain `<p>{children}</p>` (reduced-motion fallback). |
| `LogoLoop` | Named container with `ariaLabel` (unused when reduced-motion stub is on). |

`matchMedia` is stubbed to prefer reduced motion so Process uses its static
six-stage list and About skips GSAP.

### Deferred to WO-016

`ProjectShowcase` click/keyboard selection, hover-independent active state,
and hook behavior (`useMotionPreference`, `useEffectActivity`) remain
interactive client tests.
