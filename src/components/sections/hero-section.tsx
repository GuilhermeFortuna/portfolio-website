import { HeroLineWavesFrame } from "@/components/effects/line-waves";
import { SectionShell } from "@/components/layout/section-shell";
import { siteContent } from "@/content/site";

export function HeroSection() {
  return (
    <HeroLineWavesFrame>
      <SectionShell
        id="top"
        label={siteContent.heroEyebrow}
        labelledBy="hero-title"
        className="min-h-svh"
      >
        <h1
          id="hero-title"
          className="mt-8 max-w-[var(--content-wide)] text-[clamp(3rem,8vw,7.5rem)] leading-[0.94] font-[560] tracking-[-0.055em]"
        >
          {siteContent.heroTitle}
        </h1>
        <p className="mt-6 [font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
          {siteContent.heroDisciplines}
        </p>
        <p className="mt-8 max-w-[var(--content-reading)] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.65] text-[var(--color-text-muted)]">
          {siteContent.heroBody}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={siteContent.heroCtaHref}
            className="inline-flex min-h-11 items-center [font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] uppercase"
          >
            {siteContent.heroCta}
          </a>
          <a
            href={siteContent.heroGithubHref}
            className="inline-flex min-h-11 items-center [font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] text-[var(--color-text-muted)] uppercase"
            rel="noreferrer"
            target="_blank"
          >
            {siteContent.heroGithubLabel}
          </a>
        </div>
      </SectionShell>
    </HeroLineWavesFrame>
  );
}
