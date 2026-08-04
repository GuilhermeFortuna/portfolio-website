# WO-038 — Nexo Dental Integration and Release Review

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-038 row is
`READY`.

## Result to Produce

An independent `GO` / `NO-GO` release decision for `/work/nexo-dental`,
covering truth, disclosure, browser behavior, accessibility, metadata,
performance, and series consistency with `/work/aegis`, `/work/q`, and
`/work/gosigapp`. This is the release gate for the fourth and final chapter
of the case-study series.

## Prerequisites

- WO-037 `DONE`, committed and frozen at a named commit

## Files to Create or Modify

```text
docs/nexo-dental-case-study-release-review.md
docs/work-orders/wo/WO-STATUS.md
```

This is a review, not an implementation order. Change product code **only**
to correct a reproducible acceptance failure, and only with recorded owner
authorization — the constraint WO-023, WO-028, and WO-033 all operated
under.

## Review Scope

Review the frozen WO-037 commit against a **production build** (`next
build` + `next start`), never a dev server.

### 1. Truth and disclosure

- Every visible string matches the WO-036 contract verbatim; report the
  block count and mismatch count.
- Every claim traces to an accepted WO-034 claim ID.
- No operational-metric claim (clinic count, patient count, adoption,
  uptime) is stated as a real result.
- No real clinic, real patient, or any other real individual is named or
  identifiable anywhere in rendered output.
- No incumbent/competitor product is named or paraphrased anywhere in
  rendered output, alt text, captions, or metadata — a `MAJOR` finding if
  found (Locked Owner Fact 3, confirmed 2026-08-04).
- Zero `[REQUIRED:`, `[CONFIDENTIAL:`, author notes, forbidden terms,
  external links, or repository links in the rendered output.
- Secret/credential/Firebase-project/database-connection-string pattern
  scan over rendered HTML and shipped assets returns zero matches.
- The live-environment control renders as `aria-disabled="true"` with no
  `href`, reading `Live environment — coming soon` — never a real link and
  never a `[REQUIRED: ...]` marker.

### 2. Media integrity

- Every file in `public/work/nexo-dental/` is hash- and byte-exact against
  the WO-035 manifest.
- OCR pass over every shipped asset returns no real clinic name, patient
  name, CPF, phone number, address, financial amount, message content, or
  Firebase/infra identifier.
- No asset shows a degraded, error, or empty state unless the content
  contract specifically calls for it.

### 3. Series consistency

- `/work/aegis`, `/work/q`, `/work/gosigapp`, and `/work/nexo-dental` read
  as one series: same shell, same heading rhythm, same interaction
  vocabulary.
- Aegis, Quant, and gosigapp rendering are byte-identical to their
  pre-WO-037 output, proving the shared primitives closed out four chapters
  without regression.
- The homepage now links all four projects; no project retains `href:
  null`.
- All four case studies still satisfy the WO-023 accessibility baseline.

### 4. Browser, accessibility, and performance

- Chromium, Firefox, and WebKit; 1440×900, 1024×768, 768×1024, 375×780, and
  200% zoom. Zero horizontal overflow and zero overflowing elements.
- `axe-core` on `/work/nexo-dental`: target zero violations. Confirm
  whether any pre-existing non-gating findings from prior reviews (F-02
  Open Graph tags, F-03 `LogoLoop`/tap-target sizing, F-04 dynamic-rendering
  note) also affect this route.
- Real native `Tab` traversal, not synthetic focus calls. Skip link first;
  `Enter` moves real focus to `#main-content`. The disabled
  live-environment control must not receive focus as if it were
  interactive.
- No interactive target under 44 px.
- JavaScript disabled: the page renders completely.
- Image/asset failure: the page still reads.
- Record LCP, CLS, total transferred bytes, request count, and console
  errors, and compare against all three prior chapters.
- Homepage WebGL context count is unchanged.

### 5. Metadata

- `/work/nexo-dental` title, description, and canonical match the
  `docs/content.md` registry.
- JSON-LD contains only verified data.

## Procedure

1. Freeze the WO-037 commit and record it.
2. Build for production and serve it. Record versions of every engine
   used.
3. Work the scope above in order, recording evidence per item — viewport,
   browser, and motion mode included, per the WO-STATUS evidence rules.
4. Classify findings `MAJOR` / `MINOR` with reproduction steps. Any real
   clinic/patient data, Firebase/credential leak, a functioning
   (non-disabled) live-environment link pointing at an unverified URL, or
   any incumbent/competitor product reference is automatically `MAJOR`.
5. Any `MAJOR` is `NO-GO`. Refer shared-token or cross-route fixes to the
   owner rather than applying them unilaterally.
6. Re-run every check after any authorized correction.
7. Write `docs/nexo-dental-case-study-release-review.md` with the full
   matrix.
8. Record `GO` or `NO-GO` in the WO-STATUS gate log with the decision
   rationale. If `GO`, record that Batch 06 — and the four-chapter
   case-study series — is complete.
9. Stop every temporary server, browser, and container, including any
   seeded local backend/database from WO-035. Confirm no owner process or
   port was disturbed.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
sha256sum public/work/nexo-dental/*
git diff --check
```

## Acceptance Checklist

- [ ] Review ran against a production build of a frozen commit.
- [ ] Copy fidelity and claim traceability verified with counts.
- [ ] Media hash-exact, within all ceilings, with no real clinic/patient
      data present.
- [ ] No real individual, Firebase identifier, or credential found
      anywhere in rendered output or assets.
- [ ] The live-environment control is confirmed non-interactive and truthful.
- [ ] Series consistency verified and Aegis/Quant/gosigapp proven
      unregressed.
- [ ] Homepage confirmed to link all four projects with no remaining `null`.
- [ ] Three engines, five viewports, axe, real keyboard, no-JS, and zoom
      all recorded.
- [ ] Page weight recorded and compared against all three prior chapters.
- [ ] Metadata matches the registry.
- [ ] Every finding classified with reproduction steps.
- [ ] `GO` or `NO-GO` recorded with rationale.
- [ ] All temporary processes and any seeded data store stopped; owner
      environment untouched.

## Handoff

Include the decision, the full evidence matrix, every finding with
severity and reproduction, any authorized correction and its
re-verification, the page-weight comparison against all three prior
chapters, carried-forward items, and — if `GO` — an explicit note that the
four-chapter case-study series (Aegis, Quant, gosigapp, Nexo Dental) is
complete, plus any follow-up orders worth opening (e.g. the sitewide
tap-target and Open Graph items already carried forward from earlier
batches).
