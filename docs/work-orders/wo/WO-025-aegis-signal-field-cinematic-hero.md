# WO-025 — Sourced Threads Background and Cinematic Hero

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-025 row is
`READY`.

## Result to Produce

Adapt React Bits `Threads` as the shared case-study WebGL background and React
Bits `Animated Content` as the hero entrance mechanic. The result must look like
the portfolio—not like Aegis product chrome—and remain reusable for every later
project route.

## Prerequisites

- WO-024 `DONE`
- `Threads` and `Animated Content` rows in
  `docs/aegis-case-study-component-shortlist.md` are `ACCEPTED`

## Canonical Sources

```text
https://www.reactbits.dev/backgrounds/threads
https://www.reactbits.dev/animations/animated-content
https://github.com/DavidHDev/react-bits/tree/b9158acb37e7bdfd6c5bc5894da1826fe1d05a6b
```

Copy the accepted TypeScript source identified and hashed by WO-024. Do not
rewrite either component from a demo screenshot or prose description.

## Files to Create or Modify

```text
src/components/effects/case-study-threads.tsx
src/components/effects/animated-content.tsx
src/components/case-study/case-study-ambient-background.tsx
src/components/case-study/case-study-experience.module.css
src/components/case-study/aegis/aegis-experience.tsx
src/components/case-study/case-study-hero.tsx
src/components/case-study/case-study-media.tsx
src/components/webgl/webgl-manager.tsx
src/app/__tests__/aegis-page.test.tsx
src/components/case-study/aegis/__tests__/aegis-experience.test.tsx
docs/component-provenance.md
docs/work-orders/wo/IMPLEMENTATION-SPEC.md
docs/work-orders/wo/WO-STATUS.md
```

## Threads Adaptation Contract

Extend the effect ID union with `"case-study-threads"` and register exactly:

```ts
{
  id: "case-study-threads",
  priority: "hero",
  estimatedCost: "high",
  continuous: true,
  allowMobile: false,
}
```

Preserve from upstream:

- its vertex and fragment shaders byte-for-byte;
- the Perlin line-field algorithm, line count, blur, and alpha output;
- the `color`, `amplitude`, `distance`, and pointer-interaction concepts;
- the OGL `Renderer`, `Program`, `Triangle`, and `Mesh` implementation.

Adapt only:

- rename/export typing and add the canonical source header;
- accept manager-controlled `active`, `dpr`, and `pointerEnabled` inputs;
- replace upstream's independent visibility observer, DPR lookup, and perpetual
  frame ownership with `ManagedWebGLEffect` state;
- dispose through the portfolio's established WebGL cleanup contract;
- size it as the case-study route background;
- use portfolio accent A as the single line color:
  `color={[0.5569, 0.6275, 1]}`;
- use `amplitude={0.72}`, `distance={0.28}`, and manager-controlled pointer
  interaction;
- lower opacity behind the reading column with the route CSS mask.

Do not add uniforms, change the shader into a point field, draw an eye/shield,
add amber risk state, or give Aegis a unique background. Later case studies use
the same component and parameters unless a future portfolio-wide order changes
the shared system.

The route owns at most one canvas/context. Mobile, no-JS, context-loss, and
WebGL-denied states render the existing portfolio canvas/surface treatment with
no invented replacement illustration.

## Animated Content Hero Contract

Preserve React Bits' GSAP + ScrollTrigger entrance implementation and one-shot
behavior. Adapt it to prevent hydration failure: server content starts visible;
the client component applies its initial transform only after it owns a valid
element and must restore visibility if initialization fails.

Wrap existing semantic groups without splitting or rewriting text:

| Group | Delay | Distance | Duration | Opacity | Scale |
| --- | ---: | ---: | ---: | ---: | ---: |
| Breadcrumb + category | `0s` | `24px` | `0.8s` | `0` → `1` | `1` |
| Title | `0.08s` | `32px` | `0.8s` | `0` → `1` | `1` |
| Deck + support | `0.16s` | `32px` | `0.8s` | `0` → `1` | `1` |
| Facts + action | `0.24s` | `24px` | `0.8s` | `0` → `1` | `1` |

Use `direction="vertical"`, `ease="power3.out"`, `threshold={0.1}`, no
disappearance, and the forced-motion policy from WO-024.

## Portfolio Composition Rules

- Hero minimum height: `calc(100svh - 4rem)`, safe at 320px width and short
  landscape heights.
- Keep breadcrumb first in DOM and keyboard order.
- Keep title, deck, support, facts, and disabled environment action verbatim.
- Preserve Geist, portfolio tokens, reading measure, radii, and page gutters.
- Keep the poster full width and uncropped after the text; do not apply Aegis
  product colors, glow, or shield/iris framing to the page shell.
- Do not autoplay the video. It remains in Decision 4 with native controls.
- No content may remain invisible if a sourced component fails.

## Procedure

1. Recheck WO-024 hashes before copying both upstream files.
2. Copy the components with canonical URL, pinned revision, and source-hash
   header comments.
3. Add `case-study-threads` to the manager without changing budgets or homepage
   registrations.
4. Make only the listed Threads lifecycle/token adaptations.
5. Compose the shared ambient background through the Aegis route adapter.
6. Wrap hero groups with the sourced Animated Content component and fixed props.
7. Update provenance with line-level adaptation notes; do not claim authorship.
8. Record a five-minute frame/context/cleanup check and hero failure fallback.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
```

## Manual Checks

- 1440×900, 1280×800, 1024×768, 768×1024, 390×844, and 320×568.
- WebGL available/unavailable, context loss, JavaScript disabled, and Save-Data.
- Fine pointer, coarse pointer, hidden tab, browser back, and route exit.
- Hero contrast and layout at the brightest frame and at 200% zoom.

## Acceptance Checklist

- [ ] Threads shader/behavior is sourced from the pinned React Bits revision,
  not custom-created.
- [ ] Animated Content owns hero entrances with the exact fixed props.
- [ ] Every adaptation is limited to tokens, lifecycle, accessibility,
  responsiveness, and integration and is recorded in provenance.
- [ ] The background and hero use the portfolio visual system and contain no
  Aegis-specific page chrome or palette.
- [ ] The shared components are reusable by later project routes.
- [ ] One managed context is stable and existing homepage budgets do not change.
- [ ] No new visual runtime or silent source substitution exists.
- [ ] Approved content remains verbatim, legible, selectable, and server rendered.
- [ ] Tests and manual lifecycle checks pass.

## Handoff

Include source revision/hash comparison, adaptation diff summary,
source-comment result, desktop/mobile captures, failure fallback, canvas/context
counts, visible/hidden draw calls, route-exit disposal proof, dependency delta,
and all validation results.
