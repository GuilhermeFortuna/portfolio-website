/**
 * Authored case-study content. Shaped for the approved Aegis and Quant content
 * contracts (`docs/aegis-case-study-content.md`, `docs/q-case-study-content.md`).
 *
 * Copy is stored as plain strings, never as markup, so no authored value can
 * introduce HTML into the route.
 */

export type CaseStudyLink = {
  label: string;
  /** Root-relative same-origin destination, e.g. `/#work`. */
  href: string;
};

/**
 * A control whose destination is not yet verified. It renders visibly disabled
 * and non-interactive, so it deliberately carries no `href`.
 */
export type CaseStudyPendingAction = {
  label: string;
};

export type CaseStudyFact = {
  label: string;
  value: string;
};

export type CaseStudyImage = {
  /** Path under `public/work/<slug>/`. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Omitted for the hero still, which carries no visible caption. */
  caption?: string;
};

export type CaseStudyVideo = {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Visible descriptive title rendered above the player. */
  title: string;
  /** Visible summary of a silent film, rendered whether or not it plays. */
  transcript: string;
  ariaLabel: string;
};

export type CaseStudyHero = {
  /** Return path to the homepage work section. */
  backLink: CaseStudyLink;
  category: string;
  title: string;
  deck: string;
  facts: readonly CaseStudyFact[];
  support: string;
  /**
   * Optional: omitted when the chapter has no live URL to wait for (Quant /
   * DEC-02). When present, the hero renders a disabled pending control.
   */
  liveEnvironment?: CaseStudyPendingAction;
  /** Optional hero image; omitted when chapter has no hero media (gosigapp / DEC-02). */
  media?: CaseStudyImage;
  /** Optional secondary hero showcase image (e.g. a visual-identity still). */
  identityMedia?: CaseStudyImage;
};

export type CaseStudySection = {
  /** Fragment identifier and React key; unique within one case study. */
  id: string;
  heading: string;
  paragraphs: readonly string[];
  images?: readonly CaseStudyImage[];
  video?: CaseStudyVideo;
  /**
   * Optional compact metadata/badge list (e.g. a technology summary),
   * rendered as pills instead of, or in addition to, prose paragraphs.
   */
  badges?: readonly string[];
};

export type CaseStudyClosing = {
  id: string;
  /**
   * Visible section heading when the closing carries prose. When `paragraphs`
   * is omitted the closing renders as bare navigation, and this becomes the
   * accessible name of that nav rather than a rendered heading.
   */
  heading: string;
  /** Omitted when the chapter ends on navigation alone (Aegis). */
  paragraphs?: readonly string[];
  actions: readonly CaseStudyLink[];
};

export type CaseStudyMetadata = {
  title: string;
  description: string;
};

export type CaseStudy = {
  slug: string;
  metadata: CaseStudyMetadata;
  hero: CaseStudyHero;
  /**
   * Legacy narrative sections (Aegis's shape). Optional so a chapter can use
   * the newer `identity` / `origin` / `tour*` fields below instead.
   */
  context?: CaseStudySection;
  problem?: CaseStudySection;
  system: CaseStudySection;
  decisions: readonly CaseStudySection[];
  contribution: CaseStudySection;
  delivered?: CaseStudySection;
  technology: CaseStudySection;
  confidentiality: CaseStudyClosing;

  /** Visual-identity chapter (product design / brand origin story). */
  identity?: CaseStudySection;
  /** "Why I built this" origin story, replacing `context` + `problem`. */
  origin?: CaseStudySection;
  /** Intro prose for a workspace-by-workspace product tour. */
  tourIntro?: CaseStudySection;
  /** One section per workspace/feature group in the product tour. */
  tourGroups?: readonly CaseStudySection[];
};
