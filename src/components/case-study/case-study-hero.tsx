import type { CSSProperties } from "react";

import type { CaseStudyHero as CaseStudyHeroContent } from "@/types/case-study";
import { CaseStudyFigure, CaseStudyVideoFigure } from "./case-study-media";
import { eyebrowStyle, readingColumnStyle } from "./case-study-shell";

const titleStyle: CSSProperties = {
  fontSize: "clamp(2.75rem, 7vw, 5rem)",
  lineHeight: 1,
  fontWeight: 540,
  letterSpacing: "-0.04em",
};

const deckStyle: CSSProperties = {
  fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)",
  lineHeight: 1.3,
  fontWeight: 450,
  letterSpacing: "-0.02em",
};

/*
 * The unlayered `a` and `button` resets in globals.css (`color: inherit`,
 * `border: 0`, `padding: 0`, `cursor: pointer`) outrank Tailwind's layered
 * utilities, so these properties have to be set inline to take effect.
 */
const backLinkStyle: CSSProperties = {
  ...eyebrowStyle,
  color: "var(--color-text-muted)",
};

const pendingActionStyle: CSSProperties = {
  ...eyebrowStyle,
  color: "var(--color-text-dim)",
  border: "1px solid var(--color-line)",
  borderRadius: "var(--radius-pill)",
  paddingInline: "1.5rem",
  cursor: "not-allowed",
};

/** The site header already owns the `banner` landmark, so the hero is a section. */
const TITLE_ID = "case-study-title";

export function CaseStudyHero({ hero }: { hero: CaseStudyHeroContent }) {
  return (
    <section
      id="top"
      aria-labelledby={TITLE_ID}
      className="flex flex-col gap-10"
    >
      <nav aria-label="Breadcrumb">
        <a
          href={hero.backLink.href}
          style={backLinkStyle}
          className="inline-flex min-h-11 items-center"
        >
          {hero.backLink.label}
        </a>
      </nav>

      <div className="flex flex-col gap-6" style={readingColumnStyle}>
        <p style={eyebrowStyle} className="text-[var(--color-accent-a)]">
          {hero.category}
        </p>

        <h1 id={TITLE_ID} style={titleStyle}>
          {hero.title}
        </h1>

        <p style={deckStyle} className="text-[var(--color-text)]">
          {hero.deck}
        </p>

        <p className="text-[clamp(1.0625rem,1.5vw,1.1875rem)] leading-[1.65] text-[var(--color-text-muted)]">
          {hero.support}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[var(--color-line)] pt-8 md:grid-cols-4">
        {hero.facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-2">
            <dt style={eyebrowStyle} className="text-[var(--color-text-dim)]">
              {fact.label}
            </dt>
            <dd className="m-0 text-[0.9375rem] text-[var(--color-text)]">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      {hero.liveEnvironment ? (
        <div>
          {/*
            No verified live URL exists yet. This is a real disabled control
            rather than a link to nowhere or a visible placeholder marker, so it
            is out of the tab order and announced as unavailable. Chapters with
            no live URL to wait for (Quant / DEC-02) omit this field entirely.
          */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            style={pendingActionStyle}
            className="inline-flex min-h-11 items-center"
          >
            {hero.liveEnvironment.label}
          </button>
        </div>
      ) : null}

      {hero.video ? <CaseStudyVideoFigure video={hero.video} /> : null}

      {hero.media && !hero.video ? (
        <CaseStudyFigure image={hero.media} eager />
      ) : null}

      {hero.identityMedia ? (
        <CaseStudyFigure image={hero.identityMedia} />
      ) : null}
    </section>
  );
}
