# WO-024 — Batch 04 Component Source Register

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when WO-024 is `READY`.

## Result to Produce

Create the reproducible source and compatibility register for D-006 and
D-008–D-014. This is a documentation and source-inspection gate only: do not
install dependencies or modify application code.

## Prerequisites

- WO-023 `DONE` with `GO`
- D-001–D-014 in
  [`../../design/batch-04-aegis-visual-decisions.md`](../../design/batch-04-aegis-visual-decisions.md)
  are the active owner decisions

## Files to Create or Modify

```text
docs/batch-04-component-source-register.md
docs/component-provenance.md
docs/portfolio-component-blueprint.md
docs/work-orders/wo/WO-STATUS.md
```

Temporary source checkouts and captures must live outside the repository under
one `mktemp -d` directory and be removed after hashes are recorded.

## Required Source Rows

Create exactly one accepted row for each selection:

| Decision | Required source | Destination |
| --- | --- | --- |
| D-006 | `https://github.com/basementstudio/scrollytelling` | WO-026 |
| D-008 | `https://github.com/JosephASG/codrops-cinematic-scroll-animations`, Demo 1 | WO-027 |
| D-009 | `https://github.com/codrops/KineticTypePageTransition` | WO-027 and WO-032 |
| D-010 | `https://github.com/codrops/OneElementScroll` | WO-028 |
| D-011 | `https://21st.dev/@digitalzone0707/components/dynamic-island-toc` | WO-029 |
| D-012 | `https://21st.dev/@boudjadjasamira/components/story-scroll` | WO-030 |
| D-013 | `https://github.com/codrops/RotatingOnScrollAnimations`, Variation 3 | WO-031 |
| D-014 | `https://tympanus.net/codrops/2026/05/06/from-shader-uniforms-to-clip-path-wipes-how-gsap-drives-my-portfolio/` | WO-032 |

## Row Schema

Every row must record:

```text
Decision and role
Provider/component
Canonical demo URL
Canonical source URL
Immutable commit/tag or dated capture
Exact source file paths or published excerpt boundaries
SHA-256 for every copied source file/excerpt
Runtime and peer dependencies
Framework/module assumptions
Signature behavior that must survive adaptation
Permitted portfolio/runtime changes
Forbidden substitutions or source-local owners to remove
Destination Work Order
Compatibility verdict: ACCEPTED or BLOCKED
```

For repository-backed sources, resolve the default branch to an immutable
commit and hash the exact files required by the selected variation—not the
entire repository archive. For 21st.dev or article-published code without a
repository, save the exact published source/excerpt in the temporary directory,
record the URL and capture date, delimit the captured lines, and hash that file.

Do not add a license field, license search, terms assessment, or approval gate.
Public availability plus obtainable code is sufficient by owner decision.

## Compatibility Checks

Record, without installing anything:

- whether D-006's published `@bsmnt/scrollytelling` package supports the
  repository's React 19 and existing GSAP, or whether WO-026 must copy its
  minimal `Root`, `Animation`, `Waypoint`, and context source;
- every new direct package each later order would require;
- which selected sources instantiate Lenis, ScrollSmoother, ScrollTrigger,
  Motion `useScroll`, RAF, Canvas/WebGL, observers, or global listeners;
- the precise removal/adaptation required to preserve one root Lenis, one GSAP
  ticker integration, one BSMNT scene root, and one case-study WebGL context;
- whether every selected signature mechanic remains obtainable after those
  source-local owners are removed.

`motion@12.43.0` and `lenis@1.3.25` are already owner-pinned; verify registry
availability and integrity metadata but do not install them.

Stop with WO-024 `BLOCKED` if code for a selected mechanic cannot be obtained or
the mechanic fundamentally requires a conflicting root runtime. Do not select a
replacement, reduce the mechanic, or create a custom approximation.

## Documentation Reconciliation

Update `docs/component-provenance.md` and
`docs/portfolio-component-blueprint.md` so D-006–D-014 are the only planned
Batch 04 selections. Remove the stale Batch 04 acceptance of React Bits
Threads/Animated Content/Fade Content/Scroll Stack/Glare Hover, Magic UI Scroll
Progress, and Aceternity Sticky Scroll Reveal. Preserve unrelated Batch 01–03
provenance.

## Procedure

1. Record repository status and create one temporary source directory.
2. Resolve and record all immutable repository revisions.
3. Capture and hash exact repository/provider/article source files.
4. Complete runtime/dependency/ownership compatibility notes for every row.
5. Reconcile provenance and blueprint without touching application code.
6. Remove the temporary directory and prove the workspace contains no copied
   demo assets or source snapshots.
7. Move WO-024 to `REVIEW`; do not install packages or begin WO-025.

## Automated Checks

```bash
git status --short
test -s docs/batch-04-component-source-register.md
rg -n "D-006|D-008|D-009|D-010|D-011|D-012|D-013|D-014" docs/batch-04-component-source-register.md
rg -n "License|Licensing|license gate|licensing gate" docs/batch-04-component-source-register.md
rg -n "Threads|Animated Content|Fade Content|Scroll Progress|Sticky Scroll Reveal|Scroll Stack|Glare Hover" docs/batch-04-component-source-register.md docs/component-provenance.md
git diff -- package.json pnpm-lock.yaml src
git diff --check
```

The license scan, rejected-source scan, and application/package diff must return
no match or no diff. Historical provenance for unrelated shipped components is
out of scope; the exact rejected component names above must not remain as
planned Batch 04 entries.

## Acceptance Checklist

- [ ] All eight rows contain exact source locations, immutable revision/capture,
  hashes, dependencies, ownership conflicts, and destination orders.
- [ ] Every row is `ACCEPTED`, or WO-024 is explicitly `BLOCKED` without substitution.
- [ ] BSMNT package-versus-source strategy is decided for WO-026.
- [ ] Motion/Lenis availability and exact integrity metadata are recorded.
- [ ] No license investigation or approval gate exists.
- [ ] Stale Batch 04 selections are removed while older provenance is preserved.
- [ ] No application, package, lockfile, or public asset changed.
- [ ] Temporary checkouts/captures are removed and documentation checks pass.

## Handoff

Include the complete source table, immutable revisions, hashes, dependency and
runtime-conflict inventory, BSMNT strategy, temporary-directory cleanup proof,
scoped diff, validation results, and any blocker.

