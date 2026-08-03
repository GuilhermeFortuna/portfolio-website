# WO-028 — Q Integration and Release Review

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-028 row is
`READY`.

## Result to Produce

An independent `GO` / `NO-GO` release decision for `/work/q`, covering truth,
disclosure, browser behavior, accessibility, metadata, performance, and series
consistency with `/work/aegis`.

## Prerequisites

- WO-027 `DONE`, committed and frozen at a named commit

## Files to Create or Modify

```text
docs/q-case-study-release-review.md
docs/work-orders/wo/WO-STATUS.md
```

This is a review, not an implementation order. Change product code **only** to
correct a reproducible acceptance failure, and only with recorded owner
authorization — the constraint WO-023 operated under, and the reason its
`--color-text-dim` fix is traceable.

## Review Scope

Review the frozen WO-027 commit against a **production build** (`next build` +
`next start`), never a dev server. WO-022 and WO-023 both recorded that dev-only
symptoms mislead.

### 1. Truth and disclosure

- Every visible string matches the WO-026 contract verbatim; report the block
  count and mismatch count.
- Every claim traces to an accepted WO-024 claim ID.
- No trading outcome is stated as a real result, per the site-wide
  no-invented-metrics rule.
- The verified execution status is stated and not contradicted anywhere on the
  page.
- Zero `[REQUIRED:`, `[CONFIDENTIAL:`, author notes, forbidden terms, external
  links, or repository links in the rendered output.
- Secret/credential/account/broker pattern scan over rendered HTML and shipped
  assets returns zero matches.

### 2. Media integrity

- Every file in `public/work/q/` is hash- and byte-exact against the WO-025
  manifest.
- Every deliverable is 2560×1440; none exceeds 500 KiB; the directory total is
  under 5 MiB.
- No master PNG entered the repository.
- OCR pass over every shipped asset returns no broker, account, credential,
  host, or identifier string.

### 3. Series consistency

- `/work/aegis` and `/work/q` read as one series: same shell, same heading
  rhythm, same interaction vocabulary, comparable length (batch constraint
  D-002).
- Aegis rendering is byte-identical to its pre-WO-027 output, proving the shared
  primitives were widened without regression.
- Both case studies still satisfy the WO-023 accessibility baseline.

### 4. Browser, accessibility, and performance

- Chromium, Firefox, and WebKit; 1440×900, 1024×768, 768×1024, 375×780, and
  200% zoom. Zero horizontal overflow and zero overflowing elements.
- `axe-core` on `/work/q`: target zero violations. The two `MINOR` homepage
  findings WO-023 left open (F-02 absent Open Graph tags, F-03 `LogoLoop`
  keyboard access) are pre-existing and non-gating; confirm whether F-02 now
  also affects `/work/q`.
- Real native `Tab` traversal, not synthetic focus calls — the gap WO-021 and
  WO-022 both carried and WO-023 finally closed. Skip link first; `Enter` moves
  real focus to `#main-content`.
- No interactive target under 44 px.
- JavaScript disabled: the page renders completely.
- Image failure: the page still reads.
- Record LCP, CLS, total transferred bytes, request count, and console errors.
  **This page carries far more image weight than Aegis's 306 KiB.** Confirm
  lazy loading defers off-screen images and report the initial versus full
  transfer. If initial transfer regresses badly against Aegis, that is a
  finding, and the fix is placement or dimensions — not silently degrading the
  resolution WO-025 was commissioned to produce.
- Homepage WebGL context count is unchanged.

### 5. Metadata

- `/work/q` title, description, and canonical match the `docs/content.md`
  registry.
- JSON-LD contains only verified data.

## Procedure

1. Freeze the WO-027 commit and record it.
2. Build for production and serve it. Record versions of every engine used.
3. Work the scope above in order, recording evidence per item — viewport,
   browser, and motion mode included, per the WO-STATUS evidence rules.
4. Classify findings `MAJOR` / `MINOR` with reproduction steps.
5. Any `MAJOR` is `NO-GO`. Refer shared-token or cross-route fixes to the owner
   rather than applying them unilaterally; WO-023's contrast fix is the
   precedent.
6. Re-run every check after any authorized correction.
7. Write `docs/q-case-study-release-review.md` with the full matrix.
8. Record `GO` or `NO-GO` in the WO-STATUS gate log with the decision rationale.
9. Stop every temporary server, browser, and container. Confirm no owner process
   or port was disturbed.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
sha256sum public/work/q/*
git diff --check
```

## Acceptance Checklist

- [ ] Review ran against a production build of a frozen commit.
- [ ] Copy fidelity and claim traceability verified with counts.
- [ ] Media hash-exact, within all ceilings, with no master committed.
- [ ] Series consistency verified and Aegis proven unregressed.
- [ ] Three engines, five viewports, axe, real keyboard, no-JS, and zoom all
      recorded.
- [ ] Page weight and lazy-loading behavior recorded and judged.
- [ ] Metadata matches the registry.
- [ ] Every finding classified with reproduction steps.
- [ ] `GO` or `NO-GO` recorded with rationale.
- [ ] All temporary processes stopped; owner environment untouched.

## Handoff

Include the decision, the full evidence matrix, every finding with severity and
reproduction, any authorized correction and its re-verification, the page-weight
comparison against `/work/aegis`, carried-forward items, and the follow-up orders
worth opening.
