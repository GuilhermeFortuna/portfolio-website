# WO-015 — Static Composition and Navigation Component Tests

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-015 row is `READY`.

## Result to Produce

Component tests that protect the semantic shell and critical static navigation without freezing visual styling or animation internals.

## Prerequisites

- WO-013

## Files to Create or Modify

```text
src/components/layout/__tests__/site-header.test.tsx
src/components/layout/__tests__/site-footer.test.tsx
src/components/layout/__tests__/section-shell.test.tsx
src/app/__tests__/page.test.tsx
```

## Procedure

1. Render `SiteHeader` and test the skip link, labelled primary navigation, expected anchor destinations, accessible names, and keyboard-reachable links.
2. Render `SiteFooter` and test the back-to-top target, approved external-link security attributes, and copyright text sourced from the current content contract.
3. Render `SectionShell` with representative props and test the resulting semantic landmark/heading relationship plus consumer-provided children. Do not assert utility-class strings.
4. Render the homepage composition and assert one `h1`, the approved section IDs in page order, required `h2`s, and four project `h3`s. Mock only browser-incompatible visual-effect leaves; mocks must preserve the component's accessible fallback.
5. Do not snapshot the full homepage. Use role-, label-, and text-based assertions that explain user-visible regressions.

## Automated Checks

```bash
npm run test
npm run test:coverage
npm run lint
npm run typecheck
```

## Acceptance Checklist

- [ ] Header skip/navigation behavior is covered.
- [ ] Footer actions and external-link safety are covered.
- [ ] `SectionShell` semantic behavior is covered without CSS snapshots.
- [ ] Homepage semantic outline and section order are covered.
- [ ] Visual-effect mocks are local, minimal, and documented in the test.

## Handoff

Report the visible contracts tested and any intentionally untested client-only behavior delegated to WO-016.
