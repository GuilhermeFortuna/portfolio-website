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
npm run test:coverage # same run with a v8 coverage report in ./coverage
```

Tests run under Vitest with jsdom and React Testing Library. Shared setup and
the `render` helper live in `src/test/`, and specs are colocated as
`*.test.ts`/`*.test.tsx`. Coverage excludes test helpers, type-only
declarations, Next.js App Router entry files, and the copied visual-effect
implementations; see `vitest.config.ts` for each exclusion's reason.

## Documentation

Design requirements live in `docs/`. Executable Work Orders live in `docs/work-orders/wo/`.
