# Resume Refinement Decisions

## Status and Authority

**WO-057 handoff:** `REVIEW` (Batch 09 Integration & Freeze)
**Audit date:** 2026-09-10
**Owner approval:** All surfaces approved and implemented (RD-001 – RD-008); all 14 register defects closed

This ledger governs Batch 09 (the Resume refinement batch). `docs/content.md`
and `src/content/resume.ts` remain authoritative for facts and copy.

Statuses are exactly:

- **Selected** — approved by the owner; authorizes the owning WO to implement.
- **Rejected** — considered and excluded.
- **Deferred** — no direction approved yet; the owning WO must produce a fresh
  proposal before it may start (the batch's "visual direction before code"
  rule still applies).
- **Content** — not a presentation decision; recorded as an owner answer to a
  content question, feeding a WO-040 amendment.

## Audit

Production build (`pnpm build && pnpm start`), captured headless at
1730×900, 1440×900, 1024×768, and 375×780, in both enhanced and
`prefers-reduced-motion: reduce` modes, for `/resume` (`en`) and
`/pt-BR/resume`, one rest-state capture per chapter (identity, capabilities,
experience, credentials, languages/contact, convergence) plus a
mid-transition capture for the three chapters with scroll-linked motion
(experience, credentials, convergence). 128 images under
[`evidence/resume-refinement/audit/`](evidence/resume-refinement/audit/),
named `{locale}-{chapter}-{viewport}-{motion}-{rest|transition}.png`, plus
two supplementary wheel-scroll captures of the convergence chapter
(`en-convergence-{viewport}-enhanced-{progressed|end}.png`) since a raw
`scrollTo` does not advance the page's Lenis/Motion scroll-progress state the
way a real scroll gesture does.

Base commit: `cd5d5a6` (branch `wo/wo-051-resume-refinement-audit-direction`,
created from `development`). WO-049's freeze commit `ac516aa` is an ancestor;
four commits landed after the freeze and before this audit
(`aec9b2f`, `ff50c65`, `e00b7aa`, `34a50c3` — Gemini-effect and career-scroll
fixes touching `src/app/globals.css`, `resume-career-reveal.tsx`, and
`resume-convergence.tsx`). The audit reflects the page as it exists today,
which already includes those fixes.

## Defect Register (Final Resolution State)

| ID | Chapter | Viewport/Mode | Severity | Owning WO | Status | Resolving Commit | Summary & Resolution Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R-001 | Experience | all desktop widths, enhanced | MAJOR | WO-052 | Resolved | `40065d3` | Full-bleed masthead anatomy (RD-001 Direction B) with card-integrated top progress bar, organization h3 heading, metadata row, and two-column highlights grid filling full card width. Evidence in `evidence/resume-refinement/wo-052/`. |
| R-002 | Credentials | all desktop widths, enhanced | MAJOR | WO-053 | Resolved | `f162520`, `7ec9b77`, `029aad9` | Redesigned full-width cards with structured header strip (index, institution, period), prominent program title, decorative ghost ordinal, and Magic Card border. Evidence in `evidence/resume-refinement/wo-053/` and `evidence/resume-refinement/wo-058/`. |
| R-003 | Languages/Contact | all widths | MAJOR | WO-054 | Resolved | `3d03838` | Structured language rows with language heading, proficiency subheading, and distinct credential pill badge (RD-003 Direction A); balanced beside Contact. Evidence in `evidence/resume-refinement/wo-054/`. |
| R-004 | Convergence | all widths, enhanced | MAJOR | WO-055 | Resolved | `ef81c41`, `0b12f39`, `029aad9` | Reference-faithful 5-path geometry framed at desktop scale (~500–600px), synchronous 0.8 draw completion, accent token recoloring (`--color-accent-a/b/c`), progress-bound glow, and centered closing focal card. Evidence in `evidence/resume-refinement/wo-055/` and `evidence/resume-refinement/wo-058/`. |
| R-005 | Identity, Capabilities, Experience, Credentials, Languages/Contact | all widths | MAJOR | WO-056 | Resolved | `5059e08` | Unified `ResumeSectionHeader` component across all 5 non-identity chapters exposing mono uppercase eyebrow, h2 title, and bottom rule. Evidence in `evidence/resume-refinement/wo-056/`. |
| R-006 | Identity | all widths, enhanced | MINOR | WO-056 | Resolved | `5059e08`, `029aad9` | Hero contact cluster anchored into dedicated Magic Card container with `--color-surface-strong`, border beam, divided link ledger, and high-contrast styling. Evidence in `evidence/resume-refinement/wo-056/` and `evidence/resume-refinement/wo-058/`. |
| R-007 | Page-wide | all widths | MINOR | WO-056 | Resolved | `5059e08` | Straightened reading trace beam to continuous vertical line (`M 10 0 V 100`) running across the full viewport height without per-chapter node resets. Evidence in `evidence/resume-refinement/wo-056/`. |
| R-008 | Convergence/Contact | all widths | MINOR | WO-056 | Resolved | `5059e08`, `029aad9` | Closing actions restyled as pill buttons (View PDF filled primary CTA, Download PDF outline CTA) inside focal beam card at convergence point. Evidence in `evidence/resume-refinement/wo-056/` and `evidence/resume-refinement/wo-058/`. |
| R-009 | Experience | 1730×900, 1440×900, 1024×768 | MINOR | WO-052 | Resolved | `40065d3` | Dead space eliminated: highlights occupy full card width in a two-column grid beneath oversized masthead. Evidence in `evidence/resume-refinement/wo-052/`. |
| R-010 | Credentials | 1730×900, 1440×900, 1024×768 | MINOR | WO-053 | Resolved | `f162520`, `7ec9b77`, `029aad9` | Dead space eliminated: compact header strip, prominent program title, and decorative ghost ordinal fill card body. Evidence in `evidence/resume-refinement/wo-053/` and `evidence/resume-refinement/wo-058/`. |
| R-011 | Credentials | all desktop widths, enhanced, transition state | MAJOR | WO-053 | Resolved | `f162520` | Stack-scale issue resolved: cards return to `scale: 1` at rest with equal width, eliminating rectangular overlap; sticky offset (4.25rem) reveals header strip cleanly mid-stack. Evidence in `evidence/resume-refinement/wo-053/`. |
| R-012 | Experience | all widths | MINOR — presentation | WO-052 | Resolved | `40065d3` | Redundant "· Remote" suffix dropped from role line; period line retains location indicator. Evidence in `evidence/resume-refinement/wo-052/`. |
| R-013 | Languages/Contact, Convergence | all widths | MINOR — presentation | WO-056 | Resolved | `5059e08`, `029aad9` | Collision eliminated: Contact action link folded into Email ledger / styled as distinct CTA with accent indicator. Evidence in `evidence/resume-refinement/wo-056/` and `evidence/resume-refinement/wo-058/`. |
| R-014 | Credentials | all widths | MAJOR — content | WO-053 | Resolved | `3163a15`, `d0c70eb`, `7ec9b77` | Non-chronological order resolved via WO-040 amendment: Technical Diploma in Electromechanics removed per owner instruction (RD-007); remaining two entries are strictly chronological (2014–2018, 2024–Present). Evidence in `evidence/resume-refinement/wo-053/`. |

Counts: 14 findings — 8 MAJOR, 6 MINOR; all 14 verified RESOLVED.
Owning WO: WO-052 ×3, WO-053 ×4, WO-054 ×1, WO-055 ×1, WO-056 ×5. All five
owner findings from
[BATCH-09-README.md](../work-orders/wo/BATCH-09-README.md#owner-findings-2026-09-10)
are closed: #1→R-001/R-009/R-012, #2→R-002/R-010/R-011, #3→R-003, #4→R-004,
#5→R-005/R-006/R-007/R-008/R-013. Additionally, a hydration layout shift regression
(CLS = 0.1106) was diagnosed and resolved during WO-057 integration (CLS = 0.0003 EN / 0.0000 PT-BR).

## Visual Direction

### RD-001 — Career cards: full-bleed masthead

**Status:** Selected
**Surface:** Experience chapter (WO-052)
**Owner decision:** 2026-09-10

Two directions were presented against the same real content (BRXBET &
RICOBET entry) at 1440 wide plus a 375 mobile frame — evidence in
[`evidence/resume-refinement/mockups/career-cards.png`](evidence/resume-refinement/mockups/career-cards.png):

- **A — Ledger rail** (rejected): highlights wrap into a two-column grid;
  the empty right side becomes a metadata rail with an enlarged ordinal and
  the existing scroll-progress fill restyled as a bar.
- **B — Full-bleed masthead** (**selected**): the employer name becomes an
  oversized masthead spanning the card's full width, period/role sit as a
  metadata row beneath it, highlights fill a two-column grid below, and the
  existing scroll-progress indicator becomes a full-width bar at the top of
  the card rather than the floating "01 — 02" marker.

Anatomy: progress bar (full width, top) → masthead (`h3`, organization) →
meta row (role · location, period, right-aligned) → two-column highlight
grid (existing `label: detail` split, unchanged). Empty space is filled by
enlarging the masthead type and letting highlights use the full width.
State: the top progress bar's fill width reflects the existing
`data-active-career-index` scroll progress. Fallback: static/no-JS renders
the same anatomy with the bar at a fixed fill (or omitted) since there is no
scroll progress to show. Fields used: `period`, `organization`, `role`,
`location`, `highlights` — no new fields.

### RD-002 — Credential cards: fixed-offset fan stack, card anatomy only

**Status:** Selected
**Surface:** Credentials chapter (WO-053)
**Owner decision:** 2026-09-10

Evidence in
[`evidence/resume-refinement/mockups/credential-cards.png`](evidence/resume-refinement/mockups/credential-cards.png):

- **A — Numbered ledger rows** (rejected): single-column full-width rows,
  no scale/overlap effect at all.
- **B — Fixed-offset fan stack** (**selected**): keeps the stacked-deck
  look but replaces the scroll-linked `scale` (which produces the R-011
  hard-overlap misread) with a static fan offset and a scroll-filled
  connecting rule.

**Owner note:** "the existing animation is not the problem, just the cards
we are using today are the problem. Focus on the cards." WO-053's scope is
therefore the card anatomy from Direction B (full-width card, institution +
program on one line, period right-aligned, connecting rule) — it should not
assume the scroll-linked scale/animation itself must change unless fixing
the card anatomy requires it. If the existing `EnhancedCredentialCard` scale
transform can be kept once the cards no longer visually overlap at rest,
WO-053 may keep it; the fan-offset mechanism in the mockup is a fallback
proposal, not a mandate.

Anatomy: ordinal-free full-width card, institution + program stacked on the
left, period on the right, connected by a left-edge rule. State: scroll
progress shown via the rule fill (or the existing scale, per the note
above) rather than an overlapping scale. Fallback: static list renders the
same card anatomy without the rule fill. Fields used: `institution`,
`program`, `period` — no new fields.

### RD-003 — Languages: rated rows with credential badge

**Status:** Selected
**Surface:** Languages/Contact chapter (WO-054)
**Owner decision:** 2026-09-10

Evidence in
[`evidence/resume-refinement/mockups/languages.png`](evidence/resume-refinement/mockups/languages.png):

- **A — Rated rows with credential badge** (**selected**): splits the
  existing `"Language: Level (Credential)"` string into a heading
  (language) + subheading (level), with the credential pulled into a small
  pill badge — the same split-on-punctuation presentation already used for
  career highlights.
- **B — Two-column proficiency ledger** (rejected): definition-list
  anatomy with a mono label column; no new badge shape.

Anatomy: language name (heading) → level (subheading) → credential badge
(pill, only rendered when a parenthetical credential exists in the
string). State: none (static content, no scroll link). Fallback: identical
markup, no motion involved either way. Fields used: the existing
`languages` string array, parsed the same way `splitHighlight` already
parses career highlights — no new fields, no invented proficiency scale.

### RD-004 — Gemini convergence: same source geometry, recolored only

**Status:** Selected
**Surface:** Convergence chapter (WO-055)
**Owner decision:** 2026-09-10

Two initial directions (A — full-bleed reframe with progress-linked blur;
B — radial focal ring) were rejected. Owner guidance: *"The gemini effect's
shape should be the same as the original reference, we should only adapt
the colors."* A revised Direction C was presented and approved — evidence in
[`evidence/resume-refinement/mockups/convergence-v2.png`](evidence/resume-refinement/mockups/convergence-v2.png):

- **C — Reference-faithful proportions, recolored** (**selected**): the
  five-path geometry, the 1440×890 aspect, and the static Gaussian-blur
  duplicate layer stay exactly as already adapted from the Aceternity
  Google Gemini Effect (per
  [`component-provenance.md`](../component-provenance.md), line 61) —
  unchanged from today's code. The only presentation changes are: the
  container's rendered height, which should match the source's near-full
  scale (roughly 500–620px) instead of today's ~240px strip; and stronger
  per-path stroke opacity/width using the three existing accent tokens
  (`--color-accent-a/b/c`) so the lines read brightly at rest. No reframing,
  no focal ring, no new composition.

Anatomy: unchanged (5 SVG paths + 1 blurred duplicate layer, same geometry).
State: unchanged (existing scroll-linked `pathLength` draw). Fallback:
unchanged (paths omitted in static/reduced-motion mode, per the existing
`mode === "enhanced"` gate). Fields used: none — this direction is a sizing
and color-token change only, not a content or anatomy change.

### RD-005 — Page rhythm: unified section headers, rhythm scale, and reading trace

**Status:** Selected & Implemented (WO-056 & WO-058)
**Surface:** Page rhythm (WO-056, WO-058)
**Owner decision:** 2026-09-10

Resolved in WO-056 (commit `5059e08`) and further refined in WO-058 (commit `029aad9`):
- **Unified Section Headers:** Sourced unified `ResumeSectionHeader` component across all five non-identity chapters (Skills, Experience, Education, Languages, Contact) rendering mono uppercase eyebrow, semantic `h2` title, and subtle bottom rule, resolving R-005.
- **Rhythm Scale:** Normalized chapter vertical rhythm scale (`padding-block: clamp(3.5rem, 5vw, 5rem)`) and intra-section gap (`2.5rem`), removing arbitrary vertical variance.
- **Reading Trace:** Replaced fragmented per-chapter nodes with continuous vertical SVG beam (`M 10 0 V 100`) running across the full viewport height, resolving R-007.
- **Hero & Closing Anchoring:** Anchored hero contact cluster into dedicated surface container (R-006) and styled closing actions as distinct pills (R-008, R-013). Subsequently elevated to adapted Magic Card surfaces with border beam in WO-058 (RD-008).

### RD-006 — Credential order: reorder chronologically (content)

**Status:** Content
**Surface:** Credentials chapter (WO-053, blocked on WO-040)
**Owner decision:** 2026-09-10

R-014 flagged the credential order (2014–2018, 2024–Present, 2011–2013) as
a content question, not a presentation fix. Owner answer: **reorder
chronologically** — 2011–2013, 2014–2018, 2024–Present. This requires a
WO-040 content amendment to `src/content/resume.ts` (both locales) before
WO-053 implements the reordered card anatomy from RD-002; WO-053 should not
reorder the data itself without that amendment.

### RD-007 — Credential omission: remove Technical Diploma in Electromechanics (content)

**Status:** Content
**Surface:** Credentials chapter (WO-040 amendment)
**Owner decision:** 2026-09-10

Owner instruction: remove "Technical Diploma in Electromechanics" (`Técnico em Eletromecânica`) from Education and International Experience across both locales as irrelevant for programming positions. The section now contains 2 chronological entries:
1. `Savonia University of Applied Sciences (Kuopio, Finland) & SATC (Brazil) — Mechanical Engineering & Academic Exchange · 2014 – 2018`
2. `SATC (Brazil) — Software Engineering (In Progress) · 2024 – Present`

### RD-008 — Card surfaces: one adapted Magic Card vocabulary (WO-058)

**Status:** Selected
**Surface:** Identity contact card, Credentials cards, closing actions (WO-058)
**Owner decision:** 2026-09-10 (post-WO-056 review, in conversation)

After WO-056 the owner judged the hero contact card and the credential cards
"way too generic" and asked for a polished, premium treatment sourced from a
public component library, plus refinement of the close. Direction approved:

- **Surface.** Every card on the page becomes one adapted
  [Magic UI Magic Card](https://magicui.design/docs/components/magic-card)
  (MIT): pointer-tracked gradient border in `--color-accent-a` →
  `--color-accent-c` over `--color-line`, soft inner spotlight, static fixed
  hairline gradient without a fine pointer or under reduced motion.
  [Magic UI Border Beam](https://magicui.design/docs/components/border-beam)
  (MIT) runs on the two primary cards only (hero contact, closing actions),
  never under reduced motion. Existing `motion` only; no new package.
- **Hero.** Links become a ledger of divided rows; View PDF filled, Download
  PDF outline; the redundant "Contact" text link is folded into the Email row
  and `labels.contact` becomes the card eyebrow.
- **Credentials.** WO-053 header-strip anatomy kept; an oversized decorative
  ordinal fills the empty body on the right; the topmost stacked card gets a
  faint accent top edge.
- **Close.** Contact column shows the section header and the contact-link
  ledger; the action cluster moves into a beam card at the Gemini convergence
  point (the source's own centered-control layout); the band shrinks to fit.
  In static and reduced modes the card sits in normal flow below the grid.

This is an owner-approved exception to the "Structure, not decoration" batch
rule: the gradient border is the requested premium treatment and is bounded to
the card perimeter.

## Handoff & Freeze

- **Named Freeze Commit:** `f7083c5` (branch `wo/wo-057-resume-refinement-integration`).
- **Register Status:** All 14 defect findings (8 MAJOR, 6 MINOR) are **RESOLVED** with verified implementation commits and visual evidence captures.
- **Approved Directions:** RD-001 (career), RD-002 (credentials), RD-003 (languages), RD-004 (convergence), RD-005 (page rhythm), RD-006/RD-007 (content amendments), and RD-008 (card surfaces) are all fully implemented.
- **Integration Corrections:** Hydration layout shift regression (CLS = 0.1106) diagnosed and resolved in `src/app/globals.css` (TOC initial fixed placement on desktop fine pointer + dead sticky CSS cleanup), achieving CLS = 0.0003 (EN) / 0.0000 (PT-BR), well within the ≤ 0.05 budget.
- **Performance Budgets:** Re-measured against WO-049 baseline; CLS, LCP, Long Tasks, JS payload delta (≤ 20 KiB gzip), and 0-node unmount lifecycle all pass.
- **Handoff Target:** Ready for independent release review under `WO-050`.
