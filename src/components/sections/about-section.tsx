"use client";

import { useLocale } from "@/components/i18n/language-context";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { SectionShell } from "@/components/layout/section-shell";
import { getSiteContent } from "@/content/site";

const sectionTitleClassName =
  "max-w-[18rem] text-[clamp(2.25rem,5vw,4.75rem)] leading-none font-[540] tracking-[-0.04em]";

const manifestoClassName =
  "max-w-[var(--content-reading)] text-[clamp(2rem,4.5vw,4rem)] leading-[1.12] font-[450] tracking-[-0.035em]";

const bodyClassName =
  "mt-6 max-w-[var(--content-reading)] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.65] text-[var(--color-text-muted)]";

const profileLinkClassName =
  "inline-flex min-h-11 items-center [font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] uppercase";

export function AboutSection() {
  const locale = useLocale();
  const siteContent = getSiteContent(locale);
  const [manifesto, secondParagraph] = siteContent.aboutBody;

  return (
    <SectionShell
      id="about"
      label={siteContent.aboutLabel}
      labelledBy="about-title"
      className="scene-section about-scene"
    >
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[4fr_8fr] lg:gap-[clamp(2rem,6vw,6rem)]">
        <div data-scene-intro className="scene-introduction">
          <h2 id="about-title" className={sectionTitleClassName}>
            {siteContent.aboutTitle}
          </h2>
        </div>

        <div>
          <ScrollReveal
            className={manifestoClassName}
            baseOpacity={0.12}
            baseRotation={3}
            blurStrength={3}
            rotationEnd="bottom 70%"
            wordAnimationEnd="bottom 65%"
          >
            {manifesto}
          </ScrollReveal>

          <p className={bodyClassName}>{secondParagraph}</p>

          <p className="mt-8 text-[var(--color-text-dim)]">
            {siteContent.aboutTimezone}
          </p>
          <p className="mt-3 text-[var(--color-text-muted)]">
            {siteContent.aboutAvailability}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            <a
              href={siteContent.aboutGithubHref}
              className={profileLinkClassName}
              rel="noreferrer"
              target="_blank"
            >
              {siteContent.aboutGithubLabel}
            </a>
            <a
              href={siteContent.aboutWakatimeHref}
              className={profileLinkClassName}
              rel="noreferrer"
              target="_blank"
            >
              {siteContent.aboutWakatimeLabel}
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
