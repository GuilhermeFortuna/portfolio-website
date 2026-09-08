# WO-050 — Career OS Integration and Release Review

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-050 row is
`READY`.

## Result to Produce

An independent `GO` / `NO-GO` decision for the bilingual Career Operating
System against the frozen WO-049 commit, covering Resume fact fidelity, public
source/provenance, runtime ownership, animation and fallback behavior,
accessibility, browser resilience, navigation/actions, static export, and
performance.

## Prerequisites

- WO-049 `DONE`, owner-accepted, committed, and frozen at a named commit.

## Branch and Files

Review the frozen commit without creating an implementation branch unless the
owner authorizes a correction. Normal write scope:

```text
docs/resume-career-os-release-review.md                 (new)
docs/work-orders/wo/WO-STATUS.md
```

Product changes require a reproducible `MAJOR` finding, explicit owner
authorization, a dedicated correction commit, and a complete re-run.

## Review Scope

### 1. Content, privacy, and actions

- Compare every rendered block in both locales to the accepted WO-040 contract;
  report exact block and mismatch counts.
- Confirm no facts, metrics, labels, relationships, or hidden accessible copies
  were invented for animation.
- Re-run Batch 07's email/phone/PDF/hash/localization/privacy contract, including
  zero Resume connection to `/work/aegis` and zero confidentiality regression on
  Work surfaces.
- Verify View PDF, Download PDF, contact, project, locale, chapter, header, and
  footer links before hydration and after every enhanced scene state.

### 2. Source and runtime integrity

- Confirm every shipped adaptation matches WO-044's selected free/public source
  and `docs/component-provenance.md`; no paid/private or React Bits Pro code,
  dependency, or near-copy entered the implementation.
- Confirm no new runtime package, second Lenis instance, duplicate GSAP/Motion
  provider, unmanaged frame loop, WebGL/canvas, global listener, or leaked
  observer/ScrollTrigger.
- Confirm each component's material local adaptations are recorded and the
  shipped interface is no broader than the approved contract.

### 3. Accessibility and fallbacks

- Inspect the accessibility tree for one `h1`, ordered headings, semantic
  lists/articles, one copy of every fact, descriptive link names, and correct
  current-page/current-chapter state.
- Traverse all controls with native keyboard input and verify visible,
  unobscured focus, stable order, skip link, hash navigation, and Escape behavior.
- Verify reduced motion, no JavaScript, 200% zoom, coarse pointer, narrow/short
  viewports, missing CSS, hydration failure, and failed PDF navigation.
- Confirm enhanced geometry never determines reading order and no content is
  hover-, pointer-, progress-, or animation-completion-only.

### 4. Browser and motion quality

- Independently repeat WO-049's full production browser matrix in every locally
  available engine and record environmental gaps honestly.
- Test slow/fast forward and reverse scroll, scrollbar scrub, resize across mode
  thresholds, refresh/deep link mid-scene, locale change, route return, and
  browser back/forward.
- Confirm one dominant scene per viewport; no overflow, scroll trap, blank pin,
  sticky overlap, transition jump, frame flash, focus cover, or stale active TOC.
- Compare representative frames with WO-044's accepted storyboard. Differences
  require rationale, not automatic rejection, unless they break the approved
  hierarchy or interaction contract.

### 5. Build and performance

- Run tests, coverage, lint, typecheck, normal production build, and static
  export from a clean output state.
- Measure both locales against Batch 07 and WO-044 budgets: LCP, CLS, transferred
  bytes, requests, client JavaScript, long tasks, scroll frame stability, and
  idle CPU/resource counts after unmount.
- Confirm the exported routes contain complete semantic content and actions with
  no animation runtime required for indexing or reading.

## Finding Severity

- `MAJOR`: content mismatch/invention; privacy or `/work/aegis` boundary breach;
  altered/broken PDF or primary action; paid/private component source; prohibited
  runtime/dependency; inaccessible or missing content in any fallback; keyboard
  trap; blocking overflow/scroll trap/sticky overlap; leaked runtime resources;
  missing locale; failed production/static build; or performance beyond the
  approved budget without owner exception.
- `MINOR`: a non-blocking visual/pacing inconsistency or evidence gap that does
  not misstate content, prevent use, break fallback, or violate a budget.

Any `MAJOR` produces `NO-GO`. Return it to the owning order with exact
reproduction; do not silently repair it during review.

## Procedure

1. Record frozen commit, dirty state, environment/tool/browser versions,
   manifests, Batch 07 baseline, WO-044 budgets, and available engines.
2. Run source/provenance/runtime/content/privacy scans before visual review.
3. Run automated validation and serve production output, never `next dev`.
4. Execute the complete accessibility, fallback, browser, motion, action, and
   performance matrices independently of WO-049's evidence.
5. Write `docs/resume-career-os-release-review.md` with exact measurements,
   screenshots/evidence paths, all findings, and `GO`/`NO-GO` rationale.
6. Record the verdict in the Gate Log. Mark WO-050 and Batch 08 `DONE` only on
   `GO`; otherwise leave WO-050 in `REVIEW` with the exact blocker.
7. Stop every temporary server/browser/profile and confirm owner processes and
   ports were not disturbed.

## Automated Checks

```bash
sha256sum docs/Guilherme_Fortuna_Resume.pdf public/resume/guilherme-fortuna-resume-en.pdf
sha256sum docs/Guilherme_Fortuna_Curriculo_PT-BR.pdf public/resume/guilherme-fortuna-resume-pt-BR.pdf
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

The manifests and scans must be empty except for documented, pre-existing
central runtime references. Both PDF hash pairs must match exactly.

## Acceptance Checklist

- [ ] Review ran independently against the named frozen WO-049 commit and a
      production build.
- [ ] Both locales contain every approved fact exactly once with zero unexplained
      mismatch, invention, privacy leak, or broken action.
- [ ] All shipped components have verified public/free provenance and no paid
      source or prohibited runtime entered the product.
- [ ] Accessibility, keyboard, reduced-motion, no-JS, zoom, coarse-pointer,
      narrow/short viewport, missing-CSS, hydration/PDF failure modes pass.
- [ ] Full available-engine motion matrix passes without scroll/focus/layout or
      lifecycle defect.
- [ ] Normal build, static export, performance budgets, and runtime cleanup pass.
- [ ] Every finding is classified and `GO` or `NO-GO` is recorded.
- [ ] Temporary processes are stopped and owner state is preserved.

## Handoff

Report the verdict; frozen commit; content/action/PDF/privacy results; exact
source/provenance/runtime findings; full accessibility/fallback/browser matrix;
storyboard comparison; LCP/CLS/bytes/requests/client-JS/long-task/frame/idle
resource measurements; all validation output; every finding and authorized
retest; and confirmation that temporary processes stopped.
