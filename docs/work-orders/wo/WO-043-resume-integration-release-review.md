# WO-043 — Resume Integration and Release Review

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-043 row is
`READY`.

## Result to Produce

An independent `GO` / `NO-GO` decision for the bilingual resume feature,
covering source fidelity, route-scoped confidentiality, public contact data,
PDF integrity, browser behavior, accessibility, metadata, static export,
performance, navigation regressions, and provenance.

## Prerequisites

- WO-042 `DONE`, owner-accepted, committed, and frozen at a named commit.

## Branch and Files

Review the frozen commit without creating an implementation branch unless the
owner authorizes a correction. The normal write scope is:

```text
docs/resume-release-review.md                         (new)
docs/work-orders/wo/WO-STATUS.md
```

This is a review order. Product-code changes require a reproducible `MAJOR`
finding, explicit owner authorization, a dedicated correction commit, and a
full re-run.

## Review Scope

### 1. Content fidelity and disclosure

- Compare every rendered block in both locales with the owner-approved WO-040
  contract; report block count and mismatch count.
- Confirm the same facts and section order across locales without English
  fallback in Portuguese.
- Employer names, phone, new email, and the literal resume Aegis bullet are
  permitted on resume routes.
- Confirm zero anchors, structured data, nearby copy, or calls to action connect
  that bullet to `/work/aegis`.
- Confirm `/work/aegis` and `/work/gosigapp` still contain zero employer/brand
  disclosure prohibited by their own contracts. The Resume exception must not
  leak into Work content or tests.
- Confirm `guilhermefortuna.dev@gmail.com` on both homepage locales and resume
  routes. Confirm the phone exists only on resume routes/PDFs, not the homepage,
  footer, Work pages, metadata, or unrelated source modules.
- Confirm zero draft markers, author notes, unsupported claims, or accidental
  private repository links in rendered output.

### 2. PDF integrity and actions

- Compare each public PDF byte-for-byte and by SHA-256 with its `docs/` source.
- Confirm both direct URLs return `application/pdf`, open successfully, contain
  one page, and use the intended localized filename on download.
- Confirm View PDF opens safely in a new tab and Download PDF is a real download
  link; no embedded viewer, iframe, or client-side PDF parser is present.
- Confirm the web page remains the accessible primary document because the
  source PDFs are untagged.

### 3. Navigation and localization

- Verify desktop `Resume`/`Currículo` placement and mobile `Work` + `CV` at top
  and scrolled header states.
- Verify exactly one `aria-current` destination on the resume route and preserve
  homepage section-current behavior.
- Switch `/resume` ↔ `/pt-BR/resume` through the real language switcher and
  confirm content, metadata, HTML `lang`, and PDF actions change together.
- Check wordmark, Work, Contact/footer, and case-study navigation regressions.

### 4. Browser, accessibility, and resilience

- Review a production build in Chromium, Firefox, and WebKit where the local
  engines are available; record any environmental engine gap rather than
  claiming a pass.
- Test 1730×900, 1440×900, 1024×768, 375×780, 320×700, and 200% zoom with zero
  horizontal overflow, clipped content, header collision, or obscured focus.
- Use real native Tab/Shift+Tab/Enter traversal. Skip link is first, focus is
  visible, anchors activate correctly, and document order matches reading order.
- Inspect the accessibility tree: one `h1`, ordered heading hierarchy, semantic
  lists, descriptive link names, no duplicated timeline content, and decorative
  progress excluded.
- With reduced motion, confirm no progress-linked transform and a complete
  static chronology. With JavaScript disabled, confirm all content and actions
  remain.
- Simulate missing CSS and failed PDF navigation independently; the web resume
  remains readable, and a missing PDF does not erase the content.

### 5. Metadata, build, performance, and provenance

- Titles, descriptions, canonicals, hreflang plus `x-default`, HTML language,
  and sitemap entries match the contract for both routes.
- Normal production build and `NEXT_OUTPUT=export` succeed; exported resume
  routes and both PDF assets exist at their final paths.
- Record LCP, CLS, transferred bytes, request count, console warnings/errors,
  and client JavaScript attributable to the resume route. The timeline must not
  cause layout shift or load any new runtime dependency.
- Confirm component provenance records the canonical Aceternity URL, license
  check, dependency result, and local adaptations.

## Finding Severity

- `MAJOR`: incorrect or invented resume fact; source/public PDF mismatch;
  missing locale; old public email on a rendered portfolio surface; phone leak
  outside resume scope; added `/work/aegis` connection; Work confidentiality
  regression; broken PDF action; inaccessible content without JavaScript;
  missing canonical/hreflang; overflow blocking content; unverified component
  license; or a new prohibited runtime dependency.
- `MINOR`: non-blocking visual inconsistency, motion polish issue, or evidence
  gap that does not misstate content, expose data, or prevent use.

Any `MAJOR` produces `NO-GO`. Record exact reproduction and return the smallest
correction to the owning Work Order; do not silently repair it in review.

## Procedure

1. Record the frozen WO-042 commit, clean/dirty state, Node/pnpm/Next/Playwright
   versions, available browser engines, and production server port.
2. Run the source, asset, content, confidentiality, and contact scans before
   starting the browser; a failure here is not waived by a good screenshot.
3. Run `pnpm ci:local`, the coverage suite, and the static-export build. Serve
   the production output, not `next dev`.
4. Execute the full browser matrix and record per-engine/per-viewport evidence,
   reduced-motion behavior, keyboard sequence, overflow counts, console output,
   and performance figures.
5. Write `docs/resume-release-review.md` with the matrix, every finding, source
   hashes, content mismatch counts, and `GO`/`NO-GO` rationale.
6. Record the verdict in the Gate Log. Mark WO-043 and Batch 07 `DONE` only on
   `GO`; otherwise leave the order in `REVIEW` with its exact blocker.
7. Stop every temporary server/browser and confirm no owner process or port was
   disturbed.

## Automated Checks

```bash
sha256sum docs/Guilherme_Fortuna_Resume.pdf public/resume/guilherme-fortuna-resume-en.pdf
sha256sum docs/Guilherme_Fortuna_Curriculo_PT-BR.pdf public/resume/guilherme-fortuna-resume-pt-BR.pdf
pdfinfo public/resume/guilherme-fortuna-resume-en.pdf
pdfinfo public/resume/guilherme-fortuna-resume-pt-BR.pdf
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
NEXT_OUTPUT=export pnpm run build
rg -n "guilhermefortuna1000@gmail.com" src
rg -n "react-pdf|embedpdf|pdfjs|<iframe|/work/aegis" src/components/resume src/content/resume.ts src/app/\(en\)/resume src/app/\[lang\]/resume
git diff --check
```

The two source scans must be empty. Validate Work confidentiality with the
existing case-study tests and targeted rendered-output checks, not a repository-
wide `BRX|RICO` search, because resume publication is now intentionally allowed.

## Acceptance Checklist

- [ ] Review ran against the named frozen commit and a production build.
- [ ] Both locales match the approved contract with zero unexplained mismatch.
- [ ] Both public PDFs are byte-identical, reachable, viewable, and downloadable.
- [ ] Resume names/employment/contact publication stays inside its approved
      route scope; Work confidentiality remains intact.
- [ ] No `/work/aegis` connection was added from the resume.
- [ ] New public email is consistent; phone remains resume-only.
- [ ] Navigation and locale switching pass at every required state/viewport.
- [ ] Keyboard, semantics, no-JS, reduced motion, zoom, and resilience pass.
- [ ] Metadata, sitemap, normal build, and static export pass.
- [ ] Performance and console results are recorded; no prohibited dependency
      or layout shift is introduced.
- [ ] Provenance and license evidence are complete.
- [ ] Every finding is classified and `GO` or `NO-GO` is recorded.
- [ ] Temporary processes are stopped and owner state is preserved.

## Handoff

Report the verdict, frozen commit, content block/mismatch counts, both PDF hash
pairs, contact/disclosure scan results, full browser/accessibility matrix,
navigation and locale results, LCP/CLS/bytes/requests/client-JS figures, every
finding with reproduction and severity, corrections/retests if authorized, and
confirmation that all temporary processes stopped.
