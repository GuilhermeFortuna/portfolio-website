import { SectionShell } from "@/components/layout/section-shell";
import { siteContent } from "@/content/site";

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      label={siteContent.aboutLabel}
      labelledBy="about-title"
    >
      <h2
        id="about-title"
        className="mt-8 max-w-[var(--content-reading)] text-[clamp(2.25rem,5vw,4.75rem)] leading-none font-[540] tracking-[-0.04em]"
      >
        {siteContent.aboutTitle}
      </h2>
      <div className="mt-8 max-w-[var(--content-reading)] space-y-6 text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.65] text-[var(--color-text-muted)]">
        {siteContent.aboutBody.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-8 text-[var(--color-text-dim)]">
        {siteContent.aboutTimezone}
      </p>
      <p className="mt-3 text-[var(--color-text-muted)]">
        {siteContent.aboutAvailability}
      </p>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
        <a
          href={siteContent.aboutGithubHref}
          className="inline-flex min-h-11 items-center [font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] uppercase"
          rel="noreferrer"
          target="_blank"
        >
          {siteContent.aboutGithubLabel}
        </a>
        <a
          href={siteContent.aboutWakatimeHref}
          className="inline-flex min-h-11 items-center [font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] uppercase"
          rel="noreferrer"
          target="_blank"
        >
          {siteContent.aboutWakatimeLabel}
        </a>
      </div>
    </SectionShell>
  );
}
