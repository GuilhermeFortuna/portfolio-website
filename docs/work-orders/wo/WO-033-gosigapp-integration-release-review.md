# WO-033 — gosigapp Integration and Release Review

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-033 row is
`READY`.

## Result to Produce

An independent `GO` / `NO-GO` release decision for `/work/gosigapp`, covering
truth, disclosure, browser behavior, accessibility, metadata, performance,
and series consistency with `/work/aegis` and `/work/q`.

## Prerequisites

- WO-032 `DONE`, committed and frozen at a named commit

## Files to Create or Modify

```text
docs/gosigapp-case-study-release-review.md
docs/work-orders/wo/WO-STATUS.md
```

This is a review, not an implementation order. Change product code **only**
to correct a reproducible acceptance failure, and only with recorded owner
authorization — the constraint WO-023 and WO-028 both operated under.

## Review Scope

Review the frozen WO-032 commit against a **production build** (`next build`
+ `next start`), never a dev server.

### 1. Truth and disclosure

- Every visible string matches the WO-031 contract verbatim; report the
  block count and mismatch count.
- Every claim traces to an accepted WO-029 claim ID.
- No operational-metric claim (files processed, uptime, success rate,
  regulator feedback) is stated as a real result.
- The employer is not named or hinted at; the brand codes `BRX`/`RICO` do
  not appear anywhere in rendered output, source maps, or shipped assets.
- Zero `[REQUIRED:`, `[CONFIDENTIAL:`, author notes, forbidden terms,
  external links, or repository links in the rendered output.
- Secret/credential/account/certificate-path pattern scan over rendered
  HTML and shipped assets returns zero matches.

### 2. Media integrity

- Every file in `public/work/gosigapp/` is hash- and byte-exact against the
  WO-030 manifest.
- No cloud-console screenshot exists anywhere in the shipped assets — this
  is a `MAJOR` finding if found, per the explicit owner prohibition.
- OCR pass over every shipped asset returns no bucket name, brand code,
  certificate path, token, hostname, or account identifier.
- The system-map diagram's labels match WO-029's accepted boundaries
  exactly — no invented component or throughput number.

### 3. Series consistency

- `/work/aegis`, `/work/q`, and `/work/gosigapp` read as one series: same
  shell, same heading rhythm, same interaction vocabulary. gosigapp is
  expected to be visually lighter and shorter given its much smaller media
  set — that is a legitimate difference, not an inconsistency, provided the
  page still reads as complete rather than thin.
- Aegis and Quant rendering are byte-identical to their pre-WO-032 output,
  proving the shared primitives were widened without regression.
- All three case studies still satisfy the WO-023 accessibility baseline.

### 4. Browser, accessibility, and performance

- Chromium, Firefox, and WebKit; 1440×900, 1024×768, 768×1024, 375×780, and
  200% zoom. Zero horizontal overflow and zero overflowing elements.
- `axe-core` on `/work/gosigapp`: target zero violations. Confirm whether
  any pre-existing non-gating findings from WO-023/WO-028 (F-02 Open Graph
  tags, F-03 `LogoLoop` keyboard access) also affect this route.
- Real native `Tab` traversal, not synthetic focus calls. Skip link first;
  `Enter` moves real focus to `#main-content`.
- No interactive target under 44 px.
- JavaScript disabled: the page renders completely.
- Image/asset failure: the page still reads.
- Record LCP, CLS, total transferred bytes, request count, and console
  errors. This page should be the lightest of the three case studies —
  confirm that and report the comparison; a regression toward Aegis/Quant
  weight with far less content would itself be a finding.
- Homepage WebGL context count is unchanged.

### 5. Metadata

- `/work/gosigapp` title, description, and canonical match the
  `docs/content.md` registry.
- JSON-LD contains only verified data.

## Procedure

1. Freeze the WO-032 commit and record it.
2. Build for production and serve it. Record versions of every engine used.
3. Work the scope above in order, recording evidence per item — viewport,
   browser, and motion mode included, per the WO-STATUS evidence rules.
4. Classify findings `MAJOR` / `MINOR` with reproduction steps. Any
   cloud-console screenshot, brand-code leak, or employer-identifying
   detail is automatically `MAJOR`.
5. Any `MAJOR` is `NO-GO`. Refer shared-token or cross-route fixes to the
   owner rather than applying them unilaterally.
6. Re-run every check after any authorized correction.
7. Write `docs/gosigapp-case-study-release-review.md` with the full matrix.
8. Record `GO` or `NO-GO` in the WO-STATUS gate log with the decision
   rationale.
9. Stop every temporary server, browser, and container. Confirm no owner
   process or port was disturbed.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
sha256sum public/work/gosigapp/*
git diff --check
```

## Acceptance Checklist

- [ ] Review ran against a production build of a frozen commit.
- [ ] Copy fidelity and claim traceability verified with counts.
- [ ] Media hash-exact, within all ceilings, with no cloud-console
      screenshot present.
- [ ] No brand code or employer-identifying detail found anywhere in
      rendered output or assets.
- [ ] Series consistency verified and Aegis/Quant proven unregressed.
- [ ] Three engines, five viewports, axe, real keyboard, no-JS, and zoom all
      recorded.
- [ ] Page weight recorded and confirmed lighter than Aegis/Quant, or any
      regression explained.
- [ ] Metadata matches the registry.
- [ ] Every finding classified with reproduction steps.
- [ ] `GO` or `NO-GO` recorded with rationale.
- [ ] All temporary processes stopped; owner environment untouched.

## Handoff

Include the decision, the full evidence matrix, every finding with severity
and reproduction, any authorized correction and its re-verification, the
page-weight comparison against `/work/aegis` and `/work/q`, carried-forward
items, and the follow-up orders worth opening — including, if warranted,
whether Batch 05's diagram-and-CLI media approach should be documented as
the template for any future no-UI chapter.
