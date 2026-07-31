/**
 * Authored case-study content. Every field exists because the approved Aegis
 * content contract (`docs/aegis-case-study-content.md`) needs it; nothing here
 * is generalized for a case study that has not been written yet.
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
  liveEnvironment: CaseStudyPendingAction;
  media: CaseStudyImage;
};

export type CaseStudySection = {
  /** Fragment identifier and React key; unique within one case study. */
  id: string;
  heading: string;
  paragraphs: readonly string[];
  images?: readonly CaseStudyImage[];
  video?: CaseStudyVideo;
};

export type CaseStudyClosing = {
  id: string;
  heading: string;
  paragraphs: readonly string[];
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
  context: CaseStudySection;
  problem: CaseStudySection;
  system: CaseStudySection;
  decisions: readonly CaseStudySection[];
  contribution: CaseStudySection;
  delivered: CaseStudySection;
  technology: CaseStudySection;
  confidentiality: CaseStudyClosing;
};
