# WO-007 — Process and Logo Loop

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-007 row is `READY`.

## Result to Produce

Adapt Logo Loop into one slow process-stage loop inside the approved Process section.

## Prerequisites

- WO-002 and WO-003 are `DONE`.
- `ProcessSection` contains the approved heading, sequence, and support copy.

## Canonical Source

- https://reactbits.dev/animations/logo-loop
- Use the TypeScript + Tailwind source variant.

## Files to Create or Modify

```text
src/components/sections/process-section.tsx
src/components/ui/logo-loop.tsx
```

## Procedure

1. Copy the source into `logo-loop.tsx` and add:

   ```ts
   // Adapted from https://reactbits.dev/animations/logo-loop
   ```

2. Add `active?: boolean` and `pauseOnFocus?: boolean`. Run requestAnimationFrame only while active; stop on hover, focus, offscreen, hidden tab, and reduced motion.
3. Use exactly these stages, in order:

   ```text
   IDEA
   ARCHITECTURE
   AGENTS
   IMPLEMENTATION
   TESTING
   DEPLOYMENT
   ```

4. Render text nodes with a `6px` accent square, Geist Mono, `0.75rem`, weight `550`, and `0.06em` tracking. Cycle accents A, B, and C. Do not use logos.
5. Use:

   ```tsx
   <LogoLoop
     logos={items}
     speed={34}
     direction="left"
     width="100%"
     logoHeight={22}
     gap={48}
     pauseOnHover
     pauseOnFocus
     fadeOut
     fadeOutColor="#06070a"
     scaleOnHover={false}
     ariaLabel="Engineering process"
     active={active}
   />
   ```

6. Keep the approved Process heading and support paragraph unchanged. Replace the plain sequence line with the loop.
7. Under reduced motion, render the six stages once as a two-column mobile grid and six-column desktop grid.
8. Hide duplicated loop sequences from assistive technology; keep one semantic stage list available.

## Forbidden Changes

- No technology claims or brand logos
- No second loop
- No reverse row
- No speed above `34`
- No scale-on-hover
- No new dependency
- No copy changes

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

Manually verify hover/focus pause, offscreen pause, reduced-motion grid, exact stage order, and hidden duplicate content.

## Acceptance Checklist

- [ ] Exact six stages render in order.
- [ ] One loop exists.
- [ ] Approved Process copy is unchanged.
- [ ] Hover, focus, offscreen, hidden-tab, and reduced-motion states stop movement.
- [ ] Reduced motion shows one static grid.
- [ ] Duplicate loop content is hidden from assistive technology.
- [ ] No dependency was added.
- [ ] Lint, type-check, and build pass.
