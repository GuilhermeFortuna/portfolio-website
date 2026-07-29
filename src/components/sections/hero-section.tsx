import { HeroLineWavesBackground } from "@/components/effects/line-waves";
import { LiquidMetalLink } from "@/components/ui/liquid-metal-link";
import { siteContent } from "@/content/site";

export function HeroSection() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative min-h-svh overflow-x-clip"
    >
      <HeroLineWavesBackground />

      <div
        className="relative z-[2]"
        style={{
          maxWidth: "var(--content-wide)",
          marginInline: "auto",
          paddingInline: "var(--page-gutter)",
          paddingTop: "9rem",
          paddingBottom: "6rem",
        }}
      >
        <div style={{ maxWidth: "52rem" }}>
          <p
            className="text-[var(--color-text-muted)]"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "0.6875rem",
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {siteContent.heroEyebrow}
          </p>

          {/*
            Typography is inline because the unlayered heading reset in
            globals.css (`font-size: inherit`) outranks Tailwind's layered
            utilities, which would otherwise render this at body size.
          */}
          <h1
            id="hero-title"
            className="mt-6"
            style={{
              fontSize: "clamp(3rem, 8vw, 7.5rem)",
              lineHeight: 0.94,
              fontWeight: 560,
              letterSpacing: "-0.055em",
            }}
          >
            {siteContent.heroTitle}
          </h1>

          <p className="mt-6 [font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
            {siteContent.heroDisciplines}
          </p>

          <p
            className="mt-8 text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.65] text-[var(--color-text-muted)]"
            style={{ maxWidth: "42rem" }}
          >
            {siteContent.heroBody}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <LiquidMetalLink href={siteContent.heroCtaHref}>
              {siteContent.heroCta}
            </LiquidMetalLink>

            <a
              href={siteContent.heroGithubHref}
              className="inline-flex min-h-11 items-center [font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] text-[var(--color-text-muted)] uppercase"
              rel="noreferrer"
              target="_blank"
            >
              {siteContent.heroGithubLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
