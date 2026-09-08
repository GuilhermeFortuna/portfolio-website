# WO-046 — Identity Resolution and Capability Orbit

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-046 row is
`READY`.

## Result to Produce

The opening act of the Career Operating System: an adapted public Scroll
Choreography that resolves existing identity data into the Resume hero, followed
by an accessible Radial Orbital Timeline that presents the six existing
capability groups as one coherent technical system.

## Prerequisites

- WO-045 `DONE`, committed, frozen, and accepted with no unresolved runtime or
  navigation defect.

## Branch and Files

Create `wo/wo-046-resume-identity-capability-orbit` from the accepted WO-045
base. Expected write scope:

```text
src/components/resume/resume-page.tsx
src/components/resume/resume-identity-scene.tsx          (new)
src/components/resume/resume-capability-orbit.tsx        (new)
src/components/resume/__tests__/resume-identity-scene.test.tsx (new)
src/components/resume/__tests__/resume-capability-orbit.test.tsx (new)
src/app/globals.css
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

Do not change the career, projects, education, language, or closing-action
sections beyond the wrappers frozen by WO-045.

## External Sources

- Identity: `https://21st.dev/@componentry/components/scroll-choreography`
- Capabilities:
  `https://21st.dev/@jatin-yadav05/components/radial-orbital-timeline`

Use the exact WO-044 snapshots and adaptations. Do not substitute a paid scroll
mask, recreate React Bits Pro behavior, or add media merely to mimic a demo.

## Identity Scene Contract

- The source choreography becomes a restrained field of typographic/data
  plates derived only from existing role, location, experience, availability,
  and capability labels.
- Plates begin as a system being assembled and resolve into the current name,
  role, summary, contact, and PDF actions. Those primary actions are usable from
  the first rendered frame and before hydration.
- The name remains the single page `h1`; decorative echoes are `aria-hidden`.
- The scene may pin only on sufficiently wide/tall viewports and must reserve
  deterministic geometry to prevent layout shift.
- Mobile, reduced motion, no-JS, and failure modes render the existing compact
  editorial hero without overlap or animation-dependent copy.

## Capability Orbit Contract

- Exactly the existing six capability groups populate the orbit. The center is
  a non-factual organizing label such as the localized existing full-stack role,
  not a new experience claim.
- Pointer, keyboard, and scroll may change visual emphasis, but every group and
  skill remains present in one semantic list in document order.
- Keyboard interaction follows a documented roving-tabindex or native-control
  model, with Escape/blur behavior and visible focus. Hover is never required.
- A selected node reveals only its existing group skills; no generated
  descriptions, proficiency ratings, or invented relationships.
- Narrow, short, zoomed, reduced-motion, and no-JS modes use the existing
  wrapping capability list rather than a compressed or clipped orbit.

## Ordered Implementation

1. Record base commit, source snapshots, current hero/capability DOM, heading
   tree, action URLs, and LCP/CLS/bundle baseline.
2. Write failing identity tests for one `h1`, complete visible facts/actions,
   semantic order, reduced/static render, deterministic geometry, and no
   duplicated accessible text.
3. Adapt the identity choreography through existing tokens and the WO-045 scene
   progress API. Test progress boundaries and cleanup without adding listeners.
4. Write failing orbit tests for all six groups/skills, keyboard behavior,
   selected state, semantic fallback, reduced motion, and no invented content.
5. Adapt the orbital geometry and interaction. Keep the semantic list primary;
   use decorative geometry as a progressive enhancement.
6. Tune the transition so identity yields to the system map without two dominant
   animations competing in one viewport.
7. Verify both locales at 1730×900, 1440×900, 1024×768, 375×780, 320×700, short
   landscape, and 200% zoom with pointer, keyboard, reduced motion, and no JS.
8. Run validation, measure budgets, update provenance, commit, freeze, and move
   WO-047 to `READY` only after review.

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
rg -n "React Bits|scroll-mask|proficiency|expert in|years of" src/components/resume
```

The source scan must contain no paid-component reference or newly invented
skill/experience assertion. Manifest diff must be empty.

## Acceptance Checklist

- [ ] Identity resolves into the existing semantic hero without gating actions.
- [ ] Exactly one accessible `h1` exists and decorative echoes are hidden.
- [ ] All six capability groups and every skill remain semantically present.
- [ ] Orbit interaction works by pointer and keyboard and has a complete static
      fallback.
- [ ] Mobile, short viewport, zoom, reduced motion, no-JS, and hydration failure
      remain unclipped and readable.
- [ ] LCP, CLS, long-task, and client-JS deltas meet WO-044 budgets.
- [ ] No new factual copy, dependency, listener, provider, or unrelated change
      was introduced.
- [ ] Public-source provenance and material adaptations are recorded.

## Handoff

Report the freeze commit; source snapshots; content mapping; progress and
keyboard models; heading/accessibility evidence; full viewport/fallback matrix;
LCP/CLS/long-task/bundle measurements; tests/builds; provenance; and any tuning
constraint inherited by WO-047.

