# WO-044 — Career OS Component and Choreography Contract

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-044 row is
`READY`.

## Result to Produce

An owner-approved implementation contract for the Career Operating System,
including an exact public-source snapshot for every adapted component, the
mapping from existing bilingual Resume content to scenes, narrow local
interfaces, responsive and reduced-motion behavior, performance budgets, and a
shot-by-shot desktop/mobile acceptance storyboard.

## Prerequisites

- WO-043 `DONE` with a recorded `GO`, accepted Resume base commit, and no open
  `MAJOR` findings.

## Branch and Files

Create `wo/wo-044-career-os-component-contract` from the accepted Batch 07
freeze commit.

```text
docs/resume-career-operating-system.md                 (new)
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

This is a research and contract order. Do not change product code, assets,
package manifests, PDFs, or visible copy.

## Required Research

Inspect the live public source for every candidate in the Batch 08 source table
using the enabled component registries/MCPs or an ordinary read-only browser.
For each source, record:

- canonical URL, author, retrieval date, source/registry path, and commit or
  immutable version when exposed;
- whether full source is publicly inspectable without an account or purchase;
- runtime dependencies, client boundaries, observers/listeners, and animation
  ownership;
- DOM/semantic assumptions, fixed dimensions, responsive behavior, and
  reduced-motion gaps;
- exact concepts retained, exact code/structure adapted, and substantial local
  changes required by this repository.

Reject any candidate that exposes only a preview, generated screenshot, or
paywalled source. Do not inspect or imitate React Bits Pro. If one required role
has no usable listed source, research a free/public alternative and stop for
owner acceptance of that substitution.

## Contract Contents

`docs/resume-career-operating-system.md` must freeze:

1. **Narrative arc:** identity resolution → system map → career chapters → proof
   stack → education/languages decompression → convergence/actions.
2. **Content map:** every scene points to existing `ResumeContent` fields. No
   decorative label may introduce a factual claim.
3. **Component map:** one selected source and one narrow local interface per
   scene, with source-specific adaptations and explicit non-goals.
4. **Layout storyboard:** start/mid/end frames at 1440×900 and 375×780, plus
   1024×768 and 200% zoom collapse behavior.
5. **Motion grammar:** shared progress ranges, pin thresholds, easing/duration
   tokens, transitions between scenes, and the rule of one dominant effect per
   viewport.
6. **Fallback matrix:** normal motion, reduced motion, coarse pointer, narrow
   viewport, short viewport, no JavaScript, hydration failure, and missing CSS.
7. **Accessibility model:** document order, heading/list semantics, keyboard
   operation, focus management, live-region prohibition, decorative ARIA, and
   motion controls.
8. **Budgets:** zero new runtime packages; zero second smooth-scroll/WebGL
   runtime; CLS ≤ 0.05; no long task over 200 ms attributable to Resume scenes;
   and a measured client-JS/transfer baseline with a maximum delta of 20 KiB
   gzip unless the owner approves a source-backed exception.
9. **Test plan:** component/static tests, browser matrix, no-JS and reduced
   motion, exact locale/content parity, and source-provenance verification.

## Fixed Local Interfaces

The contract may refine property names, but it must preserve these ownership
boundaries:

```ts
type ResumeChapterId =
  | "identity"
  | "capabilities"
  | "experience"
  | "projects"
  | "credentials"
  | "contact";

type ResumeSceneProps = {
  id: ResumeChapterId;
  label: string;
  children: React.ReactNode;
};

type ResumeMotionMode = "enhanced" | "reduced" | "static";
```

Content remains owned by `src/content/resume.ts`; scene components consume
typed data and never contain locale-specific resume facts.

## Ordered Implementation

1. Record the base commit, clean/dirty state, manifests, current Resume route
   metrics, and Batch 07 release evidence.
2. Inspect every named source without installing it. Save no third-party package
   or generated project into the repository.
3. Build the source/dependency/adaptation matrix and reject non-public or
   runtime-conflicting candidates.
4. Map every existing Resume block in both locales to the narrative arc and
   prove that enhanced and fallback presentations share one semantic source.
5. Write the storyboard, interfaces, motion/fallback/accessibility contracts,
   budgets, and ordered implementation slices.
6. Reconcile `docs/component-provenance.md` with the selected sources, marking
   them planned rather than shipped.
7. Present the complete contract for owner approval. On approval, commit and
   freeze the result, mark WO-044 `DONE`, and move WO-045 to `READY`.

## Automated Checks

```bash
git diff --check
git diff -- package.json pnpm-lock.yaml pnpm-workspace.yaml
rg -n "T[B]D|TO[D]O|FIX[M]E|placehold[e]r|React B[i]ts Pro|reactb[i]ts.*pro" docs/resume-career-operating-system.md docs/component-provenance.md
rg -n "identity|capabilities|experience|projects|credentials|contact" docs/resume-career-operating-system.md
```

The manifest diff must be empty. A React Bits Pro match is permitted only in an
explicit exclusion/prohibition statement; no React Bits URL or adaptation may
appear in the selected component matrix.

## Acceptance Checklist

- [ ] Every selected component has inspectable free/public source and an exact
      provenance record.
- [ ] The contract maps all existing bilingual Resume content without adding or
      omitting facts.
- [ ] Scene interfaces and runtime ownership prevent a second animation or
      smooth-scroll system.
- [ ] Desktop, tablet, mobile, zoom, reduced-motion, no-JS, and failure behavior
      are specified frame by frame.
- [ ] Accessibility and performance budgets are measurable and testable.
- [ ] Each later Work Order has an unambiguous input/output boundary.
- [ ] No product code, package file, PDF, or visible copy changed.
- [ ] The owner approved the complete contract and a freeze commit is recorded.

## Handoff

Report the freeze commit; source matrix and rejected candidates; exact public
snapshots; scene/content/interface mapping; storyboard; fallback and test
matrices; baseline and budgets; provenance delta; owner approval; and confirmation
that manifests and product code are unchanged.
