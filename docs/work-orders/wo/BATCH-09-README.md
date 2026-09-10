# Portfolio Website — Work Orders, Batch 09

## Purpose

Refine the Batch 08 **Career Operating System** Resume from "structurally
complete" to "finished." Batch 08 delivered the scene runtime, the chapters, and
their fallbacks. The owner review on **2026-09-10** found that several surfaces
still read as first drafts: the career and credential cards are flat boxes with
large dead areas, the Languages block is two muted lines, and the closing Gemini
effect is a thin, dim band without a focal point or payoff.

This is a polishing batch. It changes presentation, composition, and motion
quality. It does not change resume facts, the chapter model, the runtime, or the
fallback strategy that Batch 08 established.

## Scope Boundary

In scope: Resume-only components, their tests, Resume-owned selectors/tokens in
`src/app/globals.css`, Resume visual-decision records, component provenance, and
the status ledger.

Out of scope: resume facts, dates, ordering, or PDFs (any change needs a WO-040
content amendment approved by the owner); homepage and case-study surfaces;
new chapters, routes, dependencies, runtimes, palettes, or fonts; replacing an
approved Batch 08 source component with a different one.

## Owner Findings (2026-09-10)

These are the starting points. WO-051 turns them into a complete, numbered
defect register and adds whatever else the audit finds.

1. **Work Experience cards look too simple.** One flat gradient panel per
   employer; highlights occupy roughly the left 60% and the right side is empty;
   the `01 — 02` progress marker floats above the card and does not show state.
2. **Education cards look too simple.** Three plain boxes whose residual stack
   scale reads as misalignment at rest; headline-only anatomy with large empty
   areas; the repeated `SATC (Brazil)` headline dominates two of three cards.
3. **Languages needs improvement.** Two muted text lines with no hierarchy; the
   TOEFL credential is buried mid-sentence; the column does not balance the
   Contact column beside it.
4. **The Gemini effect needs improvement.** The paths sit in a short band under
   the content instead of framing the close; the convergence point is empty;
   the blur layer is drawn statically in full, so the progressive draw reads as
   a smear; strokes are too dim to register as the closing payoff.
5. **"Among other things."** Section headers are inconsistent between chapters;
   the hero's contact cluster floats without anchoring; the reading trace looks
   segmented; the closing actions are plain underlined links.

## Mandatory Reading

1. This batch index and [`WO-STATUS.md`](WO-STATUS.md).
2. [`BATCH-08-README.md`](BATCH-08-README.md) — its Source Policy, Runtime and
   Content Invariants, and Shared Prohibitions **bind this batch unchanged**.
3. [`WO-044`](WO-044-career-os-component-contract.md) budgets and
   [`../../resume-career-operating-system.md`](../../resume-career-operating-system.md).
4. The WO-048 and WO-049 handoffs.
5. [`../../component-provenance.md`](../../component-provenance.md).

## Dependency Order

```text
WO-049 Batch 08 Integration Polish (owner-accepted, frozen)
  └─ WO-051 Resume Refinement Audit and Visual Direction   (owner approval gate)
       └─ WO-052 Career Chapter Card Redesign
            └─ WO-053 Credential Card Redesign
                 └─ WO-054 Languages Panel
                      └─ WO-055 Gemini Convergence Refinement
                           └─ WO-056 Page Rhythm and Residual Findings
                                └─ WO-058 Premium Card Surfaces and Closing Focal Point
                                     └─ WO-057 Refinement Integration and Freeze
                                          └─ WO-050 Career OS Release Review (re-pointed)
```

The orders are sequential because each one edits the shared Resume stylesheet
and consumes the card/heading vocabulary frozen by the previous one. WO-050 now
reviews the WO-057 freeze instead of the WO-049 freeze, so the release review
runs once, on the refined product.

## Work Order Index

| ID | Work Order | Primary output |
| --- | --- | --- |
| WO-051 | [Resume Refinement Audit and Visual Direction](./WO-051-resume-refinement-audit-direction.md) | Numbered defect register and owner-approved visual direction for every refinement surface |
| WO-052 | [Career Chapter Card Redesign](./WO-052-resume-career-card-redesign.md) | Full-width, structured employer cards with live chapter state, in enhanced and fallback modes |
| WO-053 | [Credential Card Redesign](./WO-053-resume-credential-card-redesign.md) | Credential cards with real anatomy, aligned rest state, and a legible stacking motion |
| WO-054 | [Languages Panel](./WO-054-resume-languages-panel.md) | Structured language rows with visible proficiency and credential hierarchy |
| WO-055 | [Gemini Convergence Refinement](./WO-055-resume-gemini-convergence.md) | Full-bleed converging paths that resolve on the closing actions |
| WO-056 | [Page Rhythm and Residual Findings](./WO-056-resume-page-rhythm.md) | One section-header system, spacing rhythm, and every remaining register item |
| WO-058 | [Premium Card Surfaces and Closing Focal Point](./WO-058-resume-premium-card-surfaces.md) | One adapted Magic Card surface for the hero, credential, and closing cards; closing actions at the convergence point |
| WO-057 | [Refinement Integration and Freeze](./WO-057-resume-refinement-integration.md) | Re-verified matrix, budgets, and the named freeze commit for WO-050 |

## Batch-Specific Rules

- **Visual direction before code.** No implementation order starts until WO-051
  records owner approval of the direction for its surface.
- **Structure, not decoration.** "Less simple" means better anatomy, hierarchy,
  use of space, and state feedback. It does not mean glass, glow fields, extra
  gradients, or a new shadow language.
- **No invented content.** No proficiency percentages, skill bars, logos, tech
  tags, metrics, or descriptions that are not already in the accepted content.
  Presentation may split an existing string (as the career highlights already
  split on `:`), but one accessible copy of every fact remains.
- **Fallbacks inherit the redesign.** A card redesign applies to the enhanced
  desktop scene *and* its static/mobile/no-JS fallback. A beautiful desktop and
  an untouched fallback is not done.
- **Budgets hold.** WO-044 budgets apply: zero new packages, CLS ≤ 0.05, no Resume
  long task over 200 ms, and ≤ 20 KiB gzip client-JS delta against the WO-049
  freeze.

## Batch Completion Rule

Batch 09 is complete when WO-051's direction is owner-approved, WO-052 through
WO-056 and WO-058 are `DONE`, WO-057 records a named freeze commit, and WO-050 records `GO`
against that freeze.
