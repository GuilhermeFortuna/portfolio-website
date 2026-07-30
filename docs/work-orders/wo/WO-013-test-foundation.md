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

- [ ] Tests execute once and fail if no tests are discovered.
- [ ] jsdom, `@/` aliases, jest-dom matchers, and cleanup work.
- [ ] No production dependency was added or upgraded.
- [ ] Coverage report is generated with documented, narrow exclusions.
- [ ] Existing lint, type-check, and production build pass.

## Handoff

Include exact package versions, test/coverage commands and results, every shim introduced, and the reason for each coverage exclusion.
