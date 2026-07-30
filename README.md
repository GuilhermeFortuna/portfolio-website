# portfolio-website

Software engineering and applied AI portfolio prototype.

## Architecture

- **Single-page homepage (Batch 01).** The site is one vertical page composed of
  ordered sections — Hero, Selected Work, Process, About, Contact — assembled in
  `src/app/page.tsx`. There are no additional routes.
- **Section / effect split.** Content lives in section components under
  `src/components/sections`, driven by static content in `src/content`. Visual
  effects live separately under `src/components/effects` (and a couple of
  interactive UI pieces under `src/components/ui`), so copy and layout stay
  independent of the animation code.
- **Managed WebGL registry.** Every WebGL effect (Line Waves, Liquid Metal,
  Shape Blur, Dotted Surface) is wrapped in `ManagedWebGLEffect` and registers
  with a single `WebGLManager` (`src/components/webgl`). The manager is the sole
  arbiter of near-viewport mounting, visibility, device-pixel-ratio policy,
  pausing, cost budget, and fallbacks — effects never read the environment
  themselves. Third-party WebGL is never scattered directly through sections.

See [`docs/portfolio-component-blueprint.md`](docs/portfolio-component-blueprint.md)
for the locked component set and visual direction, and
[`docs/component-provenance.md`](docs/component-provenance.md) for the origin and
adaptation of each external component.

## Prerequisites

- Currently supported Node.js LTS
- npm

## Setup

```bash
npm install
```

## Scripts

```bash
npm run dev
```

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run build` followed by `npm run start` serves a production preview at `/`.

## Reduced motion

Every animated component has a reduced-motion state, and the WebGL manager
refuses to grant a context when `prefers-reduced-motion: reduce` is set, so no
canvas or `requestAnimationFrame` loop runs. Under reduced motion the page falls
back to static equivalents: Line Waves becomes a static gradient, Liquid Metal a
static chrome fill, Scroll Reveal an unsplit paragraph, Logo Loop a frozen
wordmark row, Sparkles a static glow, Shape Blur is not mounted, and Dotted
Surface becomes a static dot pattern.

## Content notes

Some content fields are intentionally `null` rather than missing. Where a link
or contact destination is not yet ready — for example a project's `href` in
`src/content/projects.ts` — the `null` value is a deliberate, pending
placeholder, and such destinations should not be invented. When a value is
`null`, the corresponding contact/link information is intentionally pending.

## Testing

```bash
npm run test          # single, non-watch run; fails if no tests are found
npm run test:coverage # same run with text and HTML v8 coverage reports in ./coverage
```

Tests run under Vitest with jsdom and React Testing Library. Shared setup and
the `render` helper live in `src/test/`, and specs are colocated as
`*.test.ts`/`*.test.tsx`.

The initial baseline has three layers:

- Unit and content-contract tests cover `cn`, authored site/project records,
  and TypeScript fixtures.
- Component tests cover the layout primitives and static semantic contracts.
- Interaction and hook tests cover `ProjectShowcase`, reduced-motion changes,
  visibility/intersection activity, and listener cleanup with controlled test
  doubles.

Coverage is intentionally scoped to first-party TypeScript source. The baseline
requires at least 80% line coverage for `src/lib/cn.ts`, `src/content/`, layout
primitives, `ProjectShowcase`, and both reusable hooks; it does not yet impose a
repository-wide threshold. Test helpers, type-only declarations, Next.js App
Router wiring, and copied WebGL/canvas effect implementations remain excluded;
see `vitest.config.ts` for each exclusion's reason.

Runtime WebGL lifecycle, animation-frame performance, responsive rendering,
and real browser interactions belong to a later browser-validation batch. Unit
tests mock visual-effect leaves and assert the application's decision boundary
instead of rendering third-party WebGL, GSAP, OGL, or tsParticles runtimes.

## Documentation

Design requirements live in `docs/`. Executable Work Orders live in
`docs/work-orders/wo/` — see [`docs/work-orders/wo/README.md`](docs/work-orders/wo/README.md).
