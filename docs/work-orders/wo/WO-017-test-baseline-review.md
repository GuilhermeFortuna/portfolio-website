# WO-017 — Test Baseline Review and Documentation

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-017 row is `READY`.

## Result to Produce

A review-ready and documented test baseline with meaningful coverage evidence, no flaky tests, and clear boundaries between unit/component coverage and browser validation.

## Prerequisites

- WO-014
- WO-015
- WO-016

## Files to Create or Modify

```text
README.md
docs/work-orders/wo/WO-STATUS.md
```

Modify test configuration or test files only to correct a reproducible test-quality issue discovered during review.

## Procedure

1. Run the complete suite three consecutive times from a clean terminal. Investigate any inconsistent result; do not retry a flaky test into acceptance.
2. Run coverage and inspect the text and HTML reports. Record overall statement, branch, function, and line coverage plus the covered source-file list in the handoff.
3. Confirm the initially covered modules (`src/lib/cn.ts`, `src/content/`, layout primitives, `ProjectShowcase`, and both reusable hooks) each show at least 80% line coverage. Do not impose a repository-wide threshold yet because WebGL/effect implementations are intentionally excluded from this unit-test baseline.
4. Verify every test has a behavior-level assertion and that no full-page snapshot, sleep, external request, or real renderer remains.
5. Update README with the test layers, commands, coverage scope, and the boundary that runtime WebGL/performance checks remain part of a later browser-validation batch.
6. Move the status row to `REVIEW`; the independent reviewer validates the evidence and changes it to `DONE` when accepted.

## Automated Checks

```bash
npm run test
npm run test
npm run test
npm run test:coverage
npm run lint
npm run typecheck
npm run build
```

## Acceptance Checklist

- [ ] Three consecutive suite runs pass consistently.
- [ ] Coverage is recorded and targeted modules each reach 80% line coverage.
- [ ] Initial coverage exclusions remain narrow and documented.
- [ ] No forbidden flaky/integration-only testing pattern exists.
- [ ] README accurately documents the testing baseline and boundary.
- [ ] All Batch 02 validation commands pass.

## Handoff

Include the three suite results, coverage metrics by targeted module, exclusions, test count, documentation changes, and a recommendation for the next browser-validation/CI batch.
