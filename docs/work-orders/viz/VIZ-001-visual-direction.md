# VIZ-001 — Visual Direction and Cinematic Language

## Status

See [`VIZ-STATUS.md`](VIZ-STATUS.md). Dispatch only when the VIZ-001 row is
`READY`.

## Result to Produce

An honest evaluation of the homepage as it exists today, an owner-approved
cinematic direction, and an open decision ledger that every later VIZ order
selects from.

No implementation. This order decides what the page should feel like and why,
so VIZ-002 through VIZ-005 are executing a direction rather than improvising
one.

## Prerequisites

None.

## Files to Create or Modify

```text
docs/design/viz-visual-decisions.md
docs/work-orders/viz/VIZ-STATUS.md
```

Do not modify product code in this order.

## Start With What Is Already There

The component blueprint's own rule:

> Do not add more visual-effect components until the assembled page has been
> evaluated in context.

That evaluation has never been recorded. Do it first. Seven effects already
ship — Line Waves, Liquid Metal CTA, Scroll Reveal, Logo Loop, Sparkles, Shape
Blur, Dotted Surface — chosen individually and assembled without a verdict on
the result.

Run the site and answer, per effect, with a screenshot or recording:

- Does it still serve the page, or was it interesting in isolation only?
- Does it fight another effect for the same viewport?
- Would the page be better without it?

An effect that survives this is a deliberate keep, not an inheritance. Removing
one is a legitimate and probably necessary outcome — seven effects on five
sections is a lot, and the blueprint's own "one dominant effect per viewport"
rule is worth testing against reality.

## The Thesis

Currently: **"Precise software emerging from fluid computational depth."** The
interface should feel technical, atmospheric, and cinematic without drifting
into gaming, cyberpunk, or generic developer-portfolio clichés.

Either reaffirm it, sharpen it, or replace it — but decide explicitly, and write
the reason. Every later selection is judged against whatever this order lands
on. A thesis that cannot reject a candidate is not doing any work.

## Decision Ledger Format

`docs/design/viz-visual-decisions.md` is the ledger. Statuses are exactly:

- **Selected** — approved. It may be translated into a Work Order.
- **Rejected** — considered and explicitly excluded. Do not reintroduce it as a
  substitute later.
- **Constraint** — a standing rule every later selection must satisfy.
- **Open** — the role is identified; no source is selected yet.

Only **Selected** authorizes a choice. A candidate, a search result, or a
mention in an older planning document is not an approval.

### Carry forward from the reverted document

`docs/design/batch-04-aegis-visual-decisions.md` was reverted at `abc682df` and
is still deleted in the working tree. Two of its constraints survived the
renumbering and belong in the new ledger:

- **D-001** — the portfolio visual system owns every project page. Project media
  may appear inside a page, but the page must not imitate that project's
  product interface or adopt a separate design system.
- **D-002** — projects carry comparable weight. No chapter gets visibly more
  editorial care than another.

Recover them from Git rather than paraphrasing from memory:

```bash
git show HEAD~2:docs/design/batch-04-aegis-visual-decisions.md
```

Its **selection process** is also worth keeping: one visual role at a time,
search real sources, inspect the working demo and its source rather than
marketing screenshots, present only candidates that clear the bar, owner
selects, record the decision before dispatching implementation. Do not build a
preselected batch-wide shortlist, and do not manufacture three options when only
one is good enough.

## Selection Sources

The foundational idea (`docs/FOUNDATIONAL-IDEA.txt`) is curation, not invention:
adapt high-quality components from 21st.dev, React Bits, and comparable sources
into one cohesive system through shared tokens. That still holds and is the
fastest path to a premium result.

Nothing is off the table. Specifically reopened:

- **Laser Flow**, excluded by the blueprint only because it would have been a
  second dominant effect competing with Line Waves. If Line Waves does not
  survive the evaluation above, that exclusion no longer applies.
- The seven "locked" components. The lock was scoped to the first prototype.
- The `IMPLEMENTATION-SPEC.md` WebGL cost budget of `7`, the fixed effect
  registry, and the fixed section order.

## Specification Supersession

`IMPLEMENTATION-SPEC.md` does not bind this line. Where the approved direction
contradicts it, record the exact section — §3 page order, §5 tokens, §6
typography, §7 layout, §9 motion policy, §11 project presentation — in a
dedicated ledger section. VIZ-002 onward will carry those edits into the
specification so `WO` agents are never following a stale document.

## Procedure

1. Run the site in a real browser at desktop and mobile widths. Capture the
   current state honestly, including anything that looks worse than intended.
2. Record the per-effect evaluation above with evidence.
3. Recover D-001, D-002, and the selection process from Git into the new ledger.
4. Decide the thesis and write the reasoning.
5. Define the visual roles the page needs, as roles — "the first screen must
   land the claim in under two seconds" — not as component names.
6. Present candidates to the owner one role at a time, with working demos.
7. Record each decision with its status before any implementation order is
   dispatched.
8. List every specification supersession the direction implies.
9. Move VIZ-001 to `REVIEW`. The owner accepts the direction before VIZ-002.

## Acceptance Checklist

- [ ] Every shipping effect has a recorded keep/cut verdict with evidence.
- [ ] The thesis is explicitly reaffirmed, sharpened, or replaced, with reasons.
- [ ] D-001, D-002, and the selection process are recovered into the ledger.
- [ ] Visual roles are defined as roles, not as component names.
- [ ] Every selection has a status; only **Selected** entries authorize work.
- [ ] Specification supersessions are listed by section number.
- [ ] The owner approved the direction.
- [ ] No product code changed.

## Handoff

Include the per-effect evaluation with screenshots, the thesis decision and its
reasoning, the ledger with every status, the roles defined, the supersession
list, the owner's approval, and the specific decisions VIZ-002 through VIZ-005
each depend on.
