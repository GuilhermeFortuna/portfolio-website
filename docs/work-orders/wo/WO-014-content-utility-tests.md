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

- [x] `cn` conflict and conditional behavior is covered.
- [x] Site content contract is covered without duplicating arbitrary presentation details.
- [x] All four project records and their invariant fields are covered.
- [x] Tests do not add production code or dependencies.
- [x] The full suite, coverage, lint, and type-check pass.

## Handoff

### Test count and commands

- Added 14 tests across four files; the full suite contains 16 tests across
  five files.
- `npm run test`: pass — 5 files, 16 tests.
- `npm run test:coverage`: pass — v8 text and HTML reports generated.
- `npm run lint`: pass — 0 errors and 0 warnings.
- `npm run typecheck`: pass — no errors.

### Contracts protected

- `cn`: last-wins Tailwind conflict resolution, truthy conditional classes,
  and ordinary class concatenation.
- Site content: ordered desktop section destinations, the approved mobile
  subset, top/work references, shared GitHub and WakaTime destinations, exact
  email/LinkedIn/GitHub contact actions, and omission of an unavailable résumé
  action rather than a null placeholder.
- Projects: exactly four records in approved order, stable slugs/indexes and
  categories, unique identifiers, non-empty authored fields, and null `href`
  values until approved destinations exist.
- Types: compile-time-safe `Project` and `Technology` fixtures. No runtime
  invalid-value tests or production guards were manufactured for type aliases.

WO-014's procedure predates the fixed WO-003 `Project` type and refers to
project type/status/title/description fields that do not exist. The tests use
the authoritative `slug`, `index`, `name`, `category`, `summary`, and nullable
`href` contract from WO-003 and `src/types/content.ts`.

### Deliberately left to integration/manual review

Rendered heading hierarchy, actual section element IDs/order, link behavior,
responsive navigation visibility, and the absence of public placeholder text
remain Batch 01 integration concerns. These unit tests protect authored data
and references without duplicating component presentation assertions.
