# portfolio-website

Software engineering and applied AI portfolio prototype.

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
npm run lint
npm run typecheck
npm run build
```

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

Design requirements live in `docs/`. Executable Work Orders live in `docs/work-orders/wo/`.
