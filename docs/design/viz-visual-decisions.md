# VIZ Visual Decisions

## Status and Authority

**VIZ-001 handoff:** `REVIEW`  
**Audit date:** 2026-08-03  
**Owner approval:** Open

This ledger governs the homepage-first VIZ line. `docs/content.md` remains
authoritative for copy and factual claims. The prior Aegis ledger recovered from
Git and mirrored at `/home/gui/projects/q/docs/batch-04-aegis-visual-decisions.md`
is research evidence, not a second active authority.

Statuses are exactly:

- **Selected** — approved for translation into a VIZ Work Order.
- **Rejected** — considered and excluded from this direction.
- **Constraint** — a standing rule for every later VIZ selection.
- **Open** — the role exists, but no source is authorized yet.

Only **Selected** authorizes implementation.

## Current Homepage Audit

The supporting homepage sections were captured in Google Chrome at `1440x900`
and `375x780`, with normal motion enabled. Each image was inspected after
capture. The original automated desktop hero capture did not render Line Waves
and is retained only as
[`desktop-top-automated-invalid.png`](evidence/viz-001/desktop-top-automated-invalid.png).
The owner supplied the accepted `1024x506` `desktop-top.png` from a live rendered
session; all hero decisions below use that image instead.

| View | Desktop evidence | Mobile evidence |
| --- | --- | --- |
| Hero | [`desktop-top.png`](evidence/viz-001/desktop-top.png) | [`mobile-top.png`](evidence/viz-001/mobile-top.png) |
| Selected Work | [`desktop-work.png`](evidence/viz-001/desktop-work.png) | [`mobile-work.png`](evidence/viz-001/mobile-work.png) |
| Process | [`desktop-process.png`](evidence/viz-001/desktop-process.png) | [`mobile-process.png`](evidence/viz-001/mobile-process.png) |
| About | [`desktop-about.png`](evidence/viz-001/desktop-about.png) | [`mobile-about.png`](evidence/viz-001/mobile-about.png) |
| Contact | [`desktop-contact.png`](evidence/viz-001/desktop-contact.png) | [`mobile-contact.png`](evidence/viz-001/mobile-contact.png) |

The page is clean, readable, and consistent, but it behaves as five restrained
sections with isolated effects. It does not yet read as one cinematic system.
The strongest current moments are the Line Waves hero and the large About
typography. The weakest is the Selected Work stage: abstract diagrams and a
low-opacity shader look like placeholders beside the real case-study content
the section should sell.

### Per-effect verdicts

| Effect | Status | Evidence and decision |
| --- | --- | --- |
| Line Waves | **Selected** | The owner-supplied live capture shows a strong spatial field with a premium silhouette, clear depth, and restrained purple-white light. It establishes a memorable identity while leaving usable negative space for the claim. Keep it as the hero's sole persistent dominant environment; preserve a text-safe zone and do not layer a competing background effect over it. |
| Liquid Metal links | **Selected** | Owner override, 2026-08-03: the paired dark chrome controls integrate with the Line Waves field more successfully than the bright solid/text replacement. Retain both manager-owned shader links with their static mobile fallback; preserve semantic labels, targets, and the approved destinations. |
| Scroll Reveal | **Selected** | The About manifesto is the current page's strongest editorial composition. Keep the word-reveal capability, but subordinate its timing to the shared page choreography; it must not own an independent scroll system. |
| Logo Loop | **Rejected** | The Process capture compresses the engineering sequence into a small horizontal ticker. It is legible but visually modest, repetitive, and disconnected from the narrative. Restage the same approved words as part of the page's scene choreography. |
| Sparkles | **Rejected** | In Selected Work it reads as a faint separator/glow, not a meaningful transition. It adds another runtime without changing the composition. |
| Shape Blur | **Rejected** | The shader remains subordinate, but the combined stage still reads as a placeholder dot matrix rather than project evidence. Replace the entire presentation premise instead of polishing the shader. |
| Dotted Surface | **Selected** | The restrained horizon supports the Contact scene without fighting the copy. Keep it as closing atmosphere and choreograph its arrival through the shared runtime; do not promote it to a second dominant background. |

## Direction

### D-001 — Portfolio visual system owns every project presentation

**Status:** Constraint  
**Recovered owner decision:** 2026-07-31

Every project presentation uses the portfolio's typography, palette, spacing,
layout logic, surfaces, interaction vocabulary, and motion direction. Project
evidence may appear inside it, but the portfolio must not imitate a project's
product interface or adopt a project-specific design system.

### D-002 — Projects carry comparable weight

**Status:** Constraint  
**Recovered owner decision:** 2026-07-31

No project receives visibly greater editorial care, production quality,
ambition, or navigational prominence. Presentation primitives must work for
projects with approved media and projects without media; missing media must not
look like an unfinished state.

### D-003 — Selection process

**Status:** Constraint  
**Recovered owner decision:** 2026-07-31

Select one visual role at a time. Inspect the working demo and obtainable source,
not only marketing screenshots. Present only sources that clear the quality and
integration bar. Record the decision before dispatching implementation. Do not
manufacture a three-option shortlist when only one candidate qualifies.

Prior decisions may be re-ratified when their capability maps cleanly to a
homepage role and their current source is rechecked. They are not inherited
wholesale from the Aegis route.

### D-004 — Sharpened visual thesis

**Status:** Selected  
**Proposed in VIZ-001:** 2026-08-03

> **Precise software systems unfolding through continuous computational space.**

This sharpens, rather than discards, “Precise software emerging from fluid
computational depth.” The page remains technical, atmospheric, and cinematic,
but continuity becomes the test: typography, project evidence, spatial objects,
and section handoffs must feel like states of one directed experience. Isolated
decorative effects that do not change the composition are rejected.

The direction explicitly excludes gaming interfaces, cyberpunk decoration,
generic developer-portfolio grids, repeated glass cards, and a gallery of
uncoordinated component demos.

### D-005 — Reduced motion remains authored

**Status:** Constraint  
**Proposed in VIZ-001:** 2026-08-03

Every selected motion system needs a deliberately composed reduced-motion state.
The earlier Aegis ledger's forced-motion decision is not carried forward. A
reduced-motion presentation may remove pinning, scrubbing, spatial travel, and
continuous animation, but it must preserve every fact, action, project, and
the intended hierarchy.

### D-006 — One coordinated runtime

**Status:** Constraint  
**Proposed in VIZ-001:** 2026-08-03

Lenis owns document scroll, Motion owns state/layout/presence transitions,
GSAP/ScrollTrigger owns authored timelines, and the WebGL manager owns canvas
animation. A sourced component may not add another smooth-scroll instance,
nested scroller, root subscription, global ticker, page RAF, or WebGL context.
VIZ-002 defines the shared APIs before visible work starts.

### D-007 — Source and rights boundary

**Status:** Constraint  
**Proposed in VIZ-001:** 2026-08-03

Use obtainable source through its official channel and record the exact source
revision or acquired file hash before implementation. Do not reuse provider demo
imagery, copy, branding, screenshots, video, or metadata. Preserve license text
and attribution requirements. For 21st.dev components, acquire code through the
official platform, link back to the component page where required, and treat the
provider demo media as reference-only.

## Visual Roles

| Role | Required experience | Authorized decision |
| --- | --- | --- |
| First-frame claim | Communicate what Guilherme builds within two seconds, then reveal a settled hero without waiting for scroll. | D-009 and D-009A |
| Master continuity | Make the five semantic destinations feel like states of one directed experience while keeping input and anchors predictable. | D-008 |
| Project narrative | Give all four projects individual, full-production scenes and quick access without repeating one card treatment. | D-011 |
| Persistent project evidence | Carry one spatial object through the four project scenes, with equal-quality states whether approved media exists or not. | D-010 |
| Narrative typography | Give the About manifesto editorial weight without creating a competing scroll owner. | D-012 |
| Closing resolution | Resolve motion and atmosphere behind Contact without competing with its copy or actions. | D-013 |

Process internal composition and the exact footer handoff remain open roles
under D-016. The owner selected Liquid Metal for both hero actions on 2026-08-03.

## Selected Homepage Capabilities

### D-008 — Master scene choreography

**Status:** Selected  
**Source:** BSMNT Scrollytelling  
**Demo:** https://scrollytelling.basement.studio/  
**Repository:** https://github.com/basementstudio/scrollytelling  
**Reviewed revision:** `0c26959b106d9e81931c30af7dfeebfd83d0a379`  
**License:** MIT; GSAP remains subject to its standard license

Use BSMNT as the page-level scene grammar and React/GSAP integration model. The
homepage must feel like a sequence of directed scenes with controlled pinning,
overlaps, progress, and handoffs, not five sections decorated independently.
Retain semantic document order and predictable native input. Adapt the
capability, not the BSMNT demo's agency branding, typography, density, imagery,
or laboratory vignettes.

VIZ-002 must expose one timeline-registration and cleanup contract compatible
with BSMNT. VIZ-004 owns the page-level scene composition.

### D-009 — Hero entrance and title aperture

**Status:** Selected  
**Source:** Codrops Kinetic Typography Page Transition  
**Demo:** https://tympanus.net/Development/KineticTypePageTransition/  
**Repository:** https://github.com/codrops/KineticTypePageTransition  
**Reviewed revision:** `ebe926e2f1de42950c36ff8a678321155280c1af`  
**License:** MIT

Adapt the kinetic typographic field into the homepage entrance. Oversized
`GUILHERME` and claim fragments briefly establish a spatial composition; their
scale, overlap, counters, and negative space reveal the settled approved hero
copy and actions over D-009A. The entrance must resolve within two seconds and
must not wait for scroll. It is choreography inside the selected Line Waves
environment, not a second persistent hero premise. VIZ-003 owns this
composition.

Do not copy the source's warm palette, serif styling, article cards, images, or
page-transition content. Do not hide approved copy inside WebGL or replace
semantic headings with decorative glyphs.

### D-009A — Existing hero environmental field

**Status:** Selected  
**Source:** Existing adapted React Bits Line Waves  
**Accepted evidence:** [`desktop-top.png`](evidence/viz-001/desktop-top.png)

Retain Line Waves as the hero's persistent dominant environment. Its flowing
white-to-violet bands express the sharpened thesis directly: precise repeated
structure bending through computational space. Preserve the large-scale arc,
depth, restrained palette, cursor response, and dark negative space around the
claim.

VIZ-003 may retune framing, intensity, and responsive placement so the brightest
bands do not cross body copy or interactive labels, but it must not reduce the
effect to the nearly invisible state shown by the rejected automated capture.
The title choreography in D-009 must settle into this field rather than replace
it. Reduced motion keeps a deliberately framed still state with the same visual
identity.

### D-010 — Persistent project aperture

**Status:** Selected  
**Source:** Codrops One Element Scroll  
**Demo:** https://tympanus.net/Development/OneElementScroll/  
**Repository:** https://github.com/codrops/OneElementScroll  
**Reviewed revision:** `feb7ad7fbc602b8cdbb5109da83442ff5995cdaf`  
**License:** MIT

Use the GSAP Flip waypoint technique for one persistent project aperture that
changes size, position, and relationship to the four project compositions. It
must not disappear and remount as four unrelated cards. Approved media may
occupy it where available; projects without media receive an equally authored
typographic/surface state, not a fake screenshot or homemade diagram.

VIZ-005 owns the aperture and its responsive waypoint layouts. D-006 owns scroll
progress and cleanup. Do not copy the source demo's generated imagery.

### D-011 — Selected Work panel choreography

**Status:** Selected  
**Source:** 21st.dev Story Scroll by Samira Boudjadja  
**Demo and source:** https://21st.dev/@boudjadjasamira/components/story-scroll  
**Reviewed publication:** 2026-05-04  
**Dependencies shown by source:** `gsap`, `@gsap/react`

Adapt the angular full-viewport panel takeover into four individually composed
project scenes. Each incoming project shares the frame briefly with the prior
one, then settles with its own hierarchy, summary, route state, and D-010
aperture position. The shared handoff is connective tissue; the four projects
must not become copies of one card.

Use only code acquired through the official component channel. Do not copy the
demo's colors, art-platform copy, statistics, layout content, imagery, or media.
VIZ-005 owns this sequence and must preserve quick access to later projects,
keyboard navigation, and the `href: null` contract.

### D-012 — Existing narrative reveal

**Status:** Selected  
**Source:** Existing adapted React Bits Scroll Reveal

Retain the About word-reveal technique because the assembled audit shows it
already contributes hierarchy and editorial weight. Rebuild its timeline under
D-006 rather than preserving an independent ScrollTrigger owner. The full text
must be present and readable before hydration and in reduced motion.

### D-013 — Existing closing atmosphere

**Status:** Selected  
**Source:** Existing adapted 21st.dev Dotted Surface

Retain the shallow dot horizon as the final atmospheric state. It remains low
contrast and subordinate to Contact copy, enters as the page resolves, stops
offscreen, and uses the shared WebGL manager. It is not a full-screen background.

## Reopened or Excluded Prior Choices

### D-014 — Cinematic image-cylinder environment

**Status:** Open

The prior Codrops cinematic WebGL cylinder remains a premium candidate for a
future case-study visual role. It is not authorized for the homepage: only two
projects currently have approved media, so a project-media cylinder would
violate D-002 or force invented filler; it would also compete with D-009A for
the dominant environmental role.

### D-015 — Floating chapter table of contents

**Status:** Rejected

The prior 21st.dev Dynamic Island TOC solved orientation in a long case study.
The homepage has five familiar destinations and an existing site header. A
second persistent navigation object would compete with the project aperture and
add interface weight without solving a demonstrated homepage problem.

### D-016 — Remaining visual roles and hero action treatment

**Status:** Selected for hero actions; open for Process and footer

**Hero action source:** existing adapted 21st.dev Liquid Metal Button
**Owner override:** 2026-08-03

The two hero actions use the existing manager-owned Liquid Metal links, whose
dark chrome outline supports the Line Waves field without introducing a bright
surface. Mobile and reduced-motion use the component's static fallback. Process
internal composition and the Contact-footer handoff remain open; later VIZ
orders should first compose those roles from D-008 through D-013 and shared
tokens.

## Homepage Scene Contract

The semantic order remains:

1. Hero — kinetic title aperture lands the claim and actions without scroll.
2. Selected Work — four project panels and one persistent project aperture.
3. Process — approved sequence restaged as a scene, not a ticker.
4. About — large narrative reveal within the master timeline.
5. Contact — copy resolves over the retained dot horizon and hands off cleanly
   to the footer.

The visual composition may overlap and pin these scenes, but document order,
section IDs, anchor navigation, keyboard reading order, and fast access to
Contact remain intact.

## Specification Supersessions

| Specification section | Decision |
| --- | --- |
| §3 Page order | Preserve the five semantic destinations and their order, but replace isolated stacked sections with one coordinated scene sequence. Pinning and overlap may not change DOM/anchor order. |
| §5 Tokens | No supersession yet. Current tokens remain the normalization layer until the assembled selected direction proves a specific change is necessary. |
| §6 Typography | Supersede the fixed section-heading treatment where D-009 uses type as full-viewport spatial architecture. Approved strings and semantic heading order remain binding. |
| §7 Layout | Supersede generic contained grids for Hero and Selected Work. Author full-viewport, pinned, overlapping, and responsive scene states while preserving readable document flow. |
| §9 Motion policy | Add D-005 and D-006: BSMNT-compatible scoped GSAP timelines, one Lenis source, Motion for state transitions, managed WebGL, and authored reduced-motion compositions. |
| §11 Project presentation | Replace the `5fr 7fr` selector/sticky-stage premise with D-010 and D-011: four project scenes plus one persistent aperture, with equal treatment for media and no-media projects. |

## VIZ Handoff Dependencies

- **VIZ-002:** implement the one-owner runtime and the BSMNT-compatible timeline,
  progress, cleanup, reduced-motion, and WebGL registration interfaces.
- **VIZ-003:** implement D-009 over D-009A and the owner-selected paired Liquid
  Metal action treatment; retain Line Waves and both manager-owned CTA shaders.
- **VIZ-004:** implement D-008 across the page, restage Process, integrate D-012,
  and retain D-013 as the closing state; remove Logo Loop and Sparkles.
- **VIZ-005:** implement D-010 and D-011; remove Shape Blur and the placeholder
  diagrams while preserving project data, links, and mixed-media parity.
- **VIZ-006:** judge the assembled result against D-004. If it still reads as
  stacked sections or a component gallery, the line is `NO-GO` even when tests
  and performance checks pass.

## Owner Review Gate

VIZ-001 remains `REVIEW` until the owner explicitly approves or changes:

- the sharpened thesis in D-004;
- the four cut / three keep verdict for the shipping effects;
- the mapped selections D-008 through D-013; and
- the homepage scene contract and specification supersessions.

No product code changed in VIZ-001.
