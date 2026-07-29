# WO-012 — Integration, Accessibility, and Performance

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-012 row is `READY`.

## Result to Produce

A review-ready first prototype that passes the fixed page, accessibility, responsive, motion, dependency, and runtime checks. This order adds no visual feature.

Follow `docs/work-orders/wo/IMPLEMENTATION-SPEC.md`.

## Prerequisites

- WO-005
- WO-006
- WO-007
- WO-008
- WO-009
- WO-010
- WO-011

## Files Allowed to Modify

Any existing Batch 01 implementation file may be corrected when a checklist item fails.

Also create or update:

```text
README.md
docs/component-provenance.md
```

Do not add a new section or component.

## Procedure

### 1. Establish a clean baseline

Run and record:

```bash
git status --short
npm install
npm run lint
npm run typecheck
npm run build
```

Do not hide failures. Fix Batch 01 failures before continuing.

### 2. Verify the exact component inventory

There must be exactly:

- one Line Waves instance
- one Liquid Metal link
- one Scroll Reveal paragraph
- one Logo Loop
- one Sparkles instance
- one Shape Blur instance on desktop and zero below `1024px`
- one Dotted Surface instance

There must be no Laser Flow or other visual-effect component.

### 3. Audit dependency inventory

Expected direct runtime dependencies, in addition to Next/React:

- `clsx`
- `tailwind-merge`
- `ogl`
- `gsap`
- `three`
- `@tsparticles/engine`
- `@tsparticles/react`
- `@tsparticles/slim`
- `@paper-design/shaders` only if Liquid Metal still imports it

Remove unused:

- `lucide-react`
- `framer-motion`
- `next-themes`
- any package imported only by copied demo code

Do not remove a package that is still imported; remove the demo import first.

### 4. Verify fixed structure and copy

Compare the rendered page with sections 3 and 4 of the implementation spec.

Check:

- exact section order and IDs
- exact visible strings
- exact four project records
- exact Process sequence and approved profile/contact actions
- one `h1`
- required `h2` and project `h3` outline
- no invented link, metric, testimonial, date, or contact detail

Correct deviations; do not rewrite the approved copy.

### 5. Verify token compliance

Search source files for raw hex, rgb, hsl, duration, easing, and radius values.

Allowed raw colors:

- fixed tokens in `globals.css`
- Line Waves source parameters from WO-004
- project/effect color maps explicitly specified by Work Orders
- transparent renderer clear colors

Replace every other visual value with a fixed token or token-derived alpha.

### 6. Run the responsive matrix

Inspect these exact viewport sizes:

| Width × Height | Expected mode |
| --- | --- |
| 320 × 700 | minimum mobile |
| 375 × 812 | common mobile |
| 768 × 1024 | tablet |
| 1024 × 768 | desktop breakpoint |
| 1440 × 900 | standard desktop |
| 1920 × 1080 | wide desktop |

At every size verify:

- no horizontal scrollbar
- no clipped text
- no overlap with header
- touch targets at least `44px`
- Selected Work switches at exactly `1024px`
- contact horizon remains shallow

### 7. Run the input and accessibility matrix

Check:

- skip link
- keyboard traversal from header through footer
- visible focus on every anchor and button
- Enter/Space activation where appropriate
- project selection by click and focus
- fine-pointer hover is optional, never required
- accessible names for navigation and Logo Loop
- decorative canvases hidden from assistive technology
- duplicated marquee content hidden
- 200% browser zoom
- increased default font size
- text selection in hero, About, and project summaries

Fix issues without adding an accessibility library.

### 8. Run the motion matrix

Normal motion:

- only visible sections animate
- hidden browser tab stops continuous work
- leaving and returning to a section does not duplicate frames/listeners

Reduced motion:

- no canvas/WebGL requestAnimationFrame loop
- Line Waves static gradient
- Liquid Metal static chrome
- Scroll Reveal unsplit static paragraph
- Logo Loop static eight-item grid
- Sparkles static line/glow
- Shape Blur not mounted
- Dotted Surface static dot pattern

Mobile:

- pointer interaction disabled
- DPR cap `1.25`
- Shape Blur not mounted

### 9. Inspect runtime health

In production mode:

```bash
npm run build
npm run start
```

Load `/` and inspect:

- console errors
- hydration warnings
- failed asset or chunk requests
- unhandled promise rejections
- WebGL context errors
- visible layout shift

Fix all reproducible errors.

### 10. Record basic performance evidence

Using browser performance tools:

1. record five seconds on the hero
2. record scrolling through Process and Selected Work
3. record five seconds on the outro
4. confirm offscreen effect frames stop
5. record the maximum observed DPR for each canvas

If Lighthouse is available, target:

- Accessibility: `95` or higher
- Best Practices: `90` or higher
- Performance: `80` or higher on desktop

These scores are diagnostic; a lower score blocks completion only when caused by a reproducible Batch 01 issue that can be fixed without changing scope.

### 11. Create component provenance

`docs/component-provenance.md` must contain a table with:

- component
- canonical URL
- local file
- dependency
- main adaptations
- license/attribution note

Include all seven locked components. Do not claim a license was reviewed unless the source license was actually inspected.

### 12. Update README

Add:

- architecture summary
- link to `docs/portfolio-component-blueprint.md`
- link to `docs/work-orders/wo/README.md`
- validation commands
- reduced-motion summary
- note that contact information is intentionally pending when null

Do not add deployment instructions.

## Forbidden Changes

- No new visual component or dependency
- No Laser Flow
- No content rewrite
- No new page or route
- No analytics, CMS, contact backend, or deployment setup
- No broad framework upgrade
- No suppressing lint, TypeScript, or hydration errors

## Final Automated Checks

```bash
npm run lint
npm run typecheck
npm run build
```

Run any existing test script if earlier agents added one, but do not add a test framework solely for this order.

## Acceptance Checklist

- [ ] All twelve Work Orders’ outputs are present.
- [ ] Exact seven-component inventory is satisfied.
- [ ] No unapproved effect or dependency exists.
- [ ] Fixed structure, copy, tokens, and breakpoints are preserved.
- [ ] All viewport checks pass.
- [ ] Full keyboard and focus checks pass.
- [ ] 200% zoom remains usable.
- [ ] Reduced motion creates no continuous effect loop.
- [ ] Offscreen and hidden-tab animation stops.
- [ ] Production runtime has no known console or hydration error.
- [ ] Component provenance exists and is accurate.
- [ ] README is current.
- [ ] Lint, type-check, and build pass.

## Final Handoff

Use the standard format and additionally include:

- screenshot or preview URL when available
- viewport matrix results
- motion matrix results
- performance recording observations
- Lighthouse scores if measured
- unresolved content needs
- recommendation for Batch 02
