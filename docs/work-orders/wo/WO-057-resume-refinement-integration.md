# WO-057 — Refinement Integration and Freeze

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-057 row is
`READY`.

## Result to Produce

The refined Resume verified as one piece against the WO-049 integration
contract, with WO-044 budgets re-measured, and a named freeze commit that
[`WO-050`](WO-050-resume-career-os-release-review.md) reviews.

## Prerequisites

- WO-052 through WO-056 `DONE`.
- Every WO-051 `MAJOR` register item closed.

## Branch and Files

Create `wo/wo-057-resume-refinement-integration` from the WO-056 commit. Write
scope is limited to verified corrections inside the Batch 09 write scopes, plus:

```text
docs/design/resume-refinement-decisions.md     (final register state)
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

No new visual work. Anything that is not a regression fix goes back to its
owning order or to a later batch.

## Verification

- Re-run the **WO-049 Required Browser Matrix** and **Accessibility and
  Resilience** sections in full, on production output, for both locales.
- Re-measure the **WO-049 Performance Gate** against the WO-049 freeze as the
  baseline: LCP, CLS, transfer, requests, Resume client-JS delta, long tasks,
  scroll frame stability, and runtime resources after unmount.
- Walk the WO-051 register end to end: every item is `resolved`, `deferred (owner
  approved)`, or `won't fix (owner approved)`, with evidence.
- Compare the final captures against each approved `RD-###` direction and record
  intentional deviations with rationale.

## Ordered Implementation

1. Record base commit, dirty state, manifests, and toolchain/browser versions.
2. Run the automated checks from a clean build.
3. Run the browser, accessibility, and resilience matrices; log defects with
   owning component.
4. Fix only regressions, in page order; re-run the affected matrix rows.
5. Run performance measurements and the register walk.
6. Run the full validation twice from clean output, record the named freeze
   commit, move WO-057 to `REVIEW`, and stop. WO-050 becomes `READY` only on
   owner acceptance of this freeze.

## Automated Checks

```bash
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
sha256sum docs/Guilherme_Fortuna_Resume.pdf public/resume/guilherme-fortuna-resume-en.pdf
sha256sum docs/Guilherme_Fortuna_Curriculo_PT-BR.pdf public/resume/guilherme-fortuna-resume-pt-BR.pdf
```

Both scans and the manifest diff must be empty, and each PDF pair must match.

## Acceptance Checklist

- [ ] Full WO-049 browser/accessibility/resilience matrix passes in both locales.
- [ ] WO-044 budgets hold against the WO-049 baseline.
- [ ] Every WO-051 register item has a final state with evidence.
- [ ] Final captures match the approved directions or deviations are explained.
- [ ] Normal and static-export builds pass twice from clean output.
- [ ] A named freeze commit is recorded for WO-050.

## Handoff

Report the freeze commit; the matrix results; performance deltas against
WO-049; the final register state; direction comparisons; validation output; and
every remaining finding with severity.
