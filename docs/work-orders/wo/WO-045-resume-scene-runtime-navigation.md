# WO-045 — Resume Scene Runtime and Chapter Navigation

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-045 row is
`READY`.

## Result to Produce

A small Resume-only scene runtime that composes with the site's existing root
motion infrastructure, plus an adapted Tracing Beam and Dynamic Island TOC that
expose chapter progress without owning or duplicating Resume content.

## Prerequisites

- WO-044 `DONE`, owner-approved, committed, and frozen.

## Branch and Files

Create `wo/wo-045-resume-scene-runtime-navigation` from the accepted WO-044
base. Expected write scope:

```text
src/components/resume/resume-page.tsx
src/components/resume/resume-scene-runtime.tsx          (new)
src/components/resume/resume-chapter-navigation.tsx     (new)
src/components/resume/__tests__/resume-scene-runtime.test.tsx (new)
src/components/resume/__tests__/resume-chapter-navigation.test.tsx (new)
src/app/globals.css
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

Do not implement the hero, orbit, horizontal career track, project stack, or
closing convergence in this order.

## External Sources

- Tracing Beam: `https://ui.aceternity.com/components/tracing-beam`
- Dynamic Island TOC:
  `https://21st.dev/@digitalzone0707/components/dynamic-island-toc`

Use only the WO-044-frozen source snapshots. Re-inspect if the canonical source
has drifted, but do not silently switch implementations.

## Runtime Contract

- The root `MotionRuntime` remains the sole owner of Lenis, MotionConfig, GSAP
  registration, and global ScrollTrigger refresh.
- The Resume runtime may observe its own chapter elements through one scoped
  mechanism and expose progress/active chapter through context or a narrow hook.
- Do not add a global provider, body scroll mutation, duplicated scroll event,
  nested scroll container, or unmanaged requestAnimationFrame loop.
- Chapter IDs are stable anchors in semantic document order. URL hashes and
  native anchor navigation remain functional before hydration.
- The trace is decorative. The TOC is operable navigation with visible focus,
  current-chapter semantics, a textual accessible name, and no focus theft.

## Responsive Behavior

- Desktop: a restrained floating island may expand to reveal chapter labels;
  the trace indicates overall reading progress.
- Tablet: use a compact horizontal/edge-safe presentation that never collides
  with the fixed site header or PDF actions.
- Mobile/zoom/coarse pointer: render a compact native chapter menu or skip the
  island entirely when it would obscure content. All anchors remain available.
- Reduced motion: update current chapter without animated interpolation.
- No JavaScript: chapter headings and native anchors remain; the current Resume
  dossier/timeline reads completely without the enhanced island or trace.

## Ordered Implementation

1. Record base commit, manifest hashes, existing providers/listeners, Resume
   chapter structure, and current test/browser baseline.
2. Write failing tests for stable IDs, semantic order, anchor behavior, active
   chapter, reduced/static modes, cleanup, and the absence of duplicated text.
3. Implement the smallest scene registry/progress surface that composes with
   existing motion ownership. Prove mount/unmount and route transitions clean up.
4. Adapt the Tracing Beam geometry to the Resume content column using existing
   line/accent tokens; keep it decorative and layout-neutral.
5. Adapt the Dynamic Island TOC to the frozen chapter model with keyboard,
   current-state, header-offset, focus, and responsive behavior.
6. Integrate only chapter wrappers into `resume-page.tsx`; preserve exact content
   sequence and the current timeline fallback.
7. Verify both locales at the required viewports, reduced motion, native keyboard
   traversal, hash navigation, refresh/deep link, and no JavaScript.
8. Run full validation, update provenance with shipped adaptations, commit,
   freeze, and move WO-046 to `READY` only after independent review.

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
rg -n "new Lenis|createContext.*Motion|requestAnimationFrame|addEventListener\(['\"]scroll" src/components/resume
```

Any runtime-ownership match requires manual explanation and evidence that it is
scoped, cleaned up, and not duplicating the root runtime. Manifest diff is empty.

## Acceptance Checklist

- [ ] One stable semantic chapter model drives anchors, progress, and TOC.
- [ ] Root motion runtime remains the only global animation/scroll owner.
- [ ] The adapted trace is decorative and never changes layout or reading order.
- [ ] The TOC is keyboard operable, announces current chapter, restores focus
      predictably, and never obscures primary actions.
- [ ] Mobile, zoom, reduced-motion, and no-JS fallbacks are complete.
- [ ] Both locales preserve exact content and route behavior.
- [ ] Tests prove cleanup and no duplicate listener/provider/content path.
- [ ] No package or unrelated surface changed; provenance is complete.

## Handoff

Report the freeze commit; public source snapshots; interface and listener
ownership; component/static test results; locale/viewport/hash/keyboard/reduced-
motion/no-JS evidence; cleanup evidence; provenance; bundle delta; and remaining
known limitations for WO-046.
