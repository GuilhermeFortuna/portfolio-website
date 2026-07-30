# WO-014 — Content and Utility Unit Tests

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-014 row is `READY`.

## Result to Produce

Fast, deterministic unit tests that protect authored content contracts and reusable non-visual utility behavior.

## Prerequisites

- WO-013

## Files to Create or Modify

```text
src/lib/__tests__/cn.test.ts
src/content/__tests__/site.test.ts
src/content/__tests__/projects.test.ts
src/types/__tests__/content.test.ts
```

## Procedure

1. Test `cn` with conflicting Tailwind classes, conditional classes, and ordinary class concatenation. Assert output semantics, not internal library calls.
2. Test site content as a public contract: required navigation destinations, section IDs/order references, profile links, and contact nullability must remain consistent with `docs/content.md`.
3. Test project content: exactly four stable project records, unique IDs, permitted project types/statuses, non-empty title/summary/description, and no non-null project URL until an approved URL exists.
4. Test the exported content types through compile-time-safe fixture values and invalid-value assertions only where the runtime module exposes a meaningful guard. Do not manufacture runtime validation solely to test a type alias.
5. Keep tests independent of browser rendering, time, network, and copied effect code.

## Automated Checks

```bash
npm run test
npm run test:coverage
npm run lint
npm run typecheck
```

## Acceptance Checklist

- [ ] `cn` conflict and conditional behavior is covered.
- [ ] Site content contract is covered without duplicating arbitrary presentation details.
- [ ] All four project records and their invariant fields are covered.
- [ ] Tests do not add production code or dependencies.
- [ ] The full suite, coverage, lint, and type-check pass.

## Handoff

Report the test count, the contracts protected, and any content condition deliberately left to the Batch 01 integration/manual review.
