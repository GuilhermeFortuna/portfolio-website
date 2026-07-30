# WO-013 — Test Foundation and Shared Test Utilities

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-013 row is `READY`.

## Result to Produce

A deterministic unit/component-test environment that works with the existing Next.js and strict TypeScript setup.

## Prerequisites

- WO-012

## Files to Create or Modify

```text
package.json
package-lock.json
vitest.config.ts
src/test/setup.ts
src/test/render.tsx
README.md
```

## Procedure

1. Add Vitest, jsdom, React Testing Library, `@testing-library/jest-dom`, and `@testing-library/user-event` as development dependencies. Do not change production dependencies.
2. Add `test` (single non-watch run) and `test:coverage` npm scripts. The test script must fail on zero test files and use the repository's TypeScript path aliases.
3. Configure jsdom, the setup file, `@/` resolution, and v8 coverage for TypeScript source. Exclude generated framework files, test helpers, and copied visual-effect implementations from the initial coverage report; record the exclusions in the config with a short reason.
4. In shared setup, register jest-dom matchers and only the browser API shims needed by current tests. Stubs must be reset after each test.
5. Provide a `render` helper that wraps React Testing Library and is intentionally small. Do not add a provider unless an existing component genuinely needs it.
6. Add one smoke test that proves the setup, alias, matcher, and DOM cleanup work. The smoke test belongs with the helper it verifies.
7. Document `npm run test` and `npm run test:coverage` in README without removing Batch 01 validation instructions.

## Automated Checks

```bash
npm run test
npm run test:coverage
npm run lint
npm run typecheck
npm run build
```

## Acceptance Checklist

- [x] Tests execute once and fail if no tests are discovered.
- [x] jsdom, `@/` aliases, jest-dom matchers, and cleanup work.
- [x] No production dependency was added or upgraded.
- [x] Coverage report is generated with documented, narrow exclusions.
- [x] Existing lint, type-check, and production build pass.

## Handoff

### Dev dependencies added (exact resolved versions)

| Package | Version | Purpose |
| --- | --- | --- |
| `vitest` | 4.1.10 | Test runner |
| `@vitest/coverage-v8` | 4.1.10 | V8 coverage provider |
| `jsdom` | 30.0.1 | DOM environment |
| `@testing-library/react` | 16.3.2 | Component rendering |
| `@testing-library/jest-dom` | 7.0.0 | DOM matchers |
| `@testing-library/user-event` | 14.6.1 | User-interaction simulation (available for later WOs) |
| `@vitejs/plugin-react` | 6.0.4 | React/JSX transform for Vitest |

No production dependency was added or changed. `package.json` `dependencies` is
byte-for-byte identical to before this order. `vite-tsconfig-paths` was installed
during development, then removed in favor of Vite's native `resolve.tsconfigPaths`.

### Scripts

- `npm run test` → `vitest run` (single, non-watch run; no `--passWithNoTests`, so it exits non-zero when no test files are discovered).
- `npm run test:coverage` → `vitest run --coverage`.

### Configuration

- `vitest.config.ts`: `environment: "jsdom"`, `globals: true`, `setupFiles: ["./src/test/setup.ts"]`, test include `src/**/*.{test,spec}.{ts,tsx}`.
- `@/` aliases resolve via `resolve.tsconfigPaths: true`, reusing `tsconfig.json` `paths`.
- Coverage: `provider: "v8"`, reporters `text` + `html` (written to gitignored `./coverage`).

### Shims introduced

None. jsdom covers everything the current smoke test needs. `src/test/setup.ts`
registers jest-dom matchers (`@testing-library/jest-dom/vitest`) and an
`afterEach` that runs RTL `cleanup()`, `vi.unstubAllGlobals()`, and
`vi.restoreAllMocks()` so any future stub is reset per test. A comment marks
where to add a real shim (via `vi.stubGlobal`) when a test first needs one.

### Coverage exclusions and reasons

| Exclusion | Reason |
| --- | --- |
| `src/test/**` | Test helpers/infrastructure, not code under test. |
| `src/types/**` | Type-only declarations; no executable statements. |
| `src/components/effects/**` | Copied/adapted third-party visual effects; WebGL/canvas, not meaningful under jsdom. |
| `src/components/ui/logo-loop.tsx` | Copied/adapted third-party visual effect. |
| `src/app/**` | Next.js App Router entry files (metadata, fonts, page composition); framework wiring exercised by the build. |

### Commands and results

| Command | Result |
| --- | --- |
| `npm run test` | Pass — 1 file, 2 tests. |
| Zero-test check (`npx vitest run __no_such_test_pattern__`) | Exit code 1 (fails on zero tests). |
| `npm run test:coverage` | Pass — HTML + text report generated in `./coverage`. |
| `npm run lint` | Pass — 0 errors, 0 warnings (added `coverage/**` to ESLint ignores). |
| `npm run typecheck` | Pass — no errors. |
| `npm run build` | Pass — Next.js 16.2.12 production build (network available for `next/font`). |
