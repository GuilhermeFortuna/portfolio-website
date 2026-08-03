"use client";

import { useLocale } from "@/components/i18n/language-context";
import { HeroLineWavesBackground } from "@/components/effects/line-waves";
import { useSceneTimeline } from "@/components/motion/motion-runtime";
import { LiquidMetalLink } from "@/components/ui/liquid-metal-link";
import { getSiteContent } from "@/content/site";
import { useRef } from "react";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const locale = useLocale();
  const siteContent = getSiteContent(locale);

  useSceneTimeline(
    heroRef,
    ({ gsap }) => {
      const kineticLayers = heroRef.current?.querySelectorAll<HTMLElement>(
        "[data-hero-kinetic]",
      );
      if (!kineticLayers?.length) {
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      timeline
        .fromTo(
          kineticLayers,
          { clipPath: "inset(0 0 100% 0)", xPercent: -8 },
          {
            clipPath: "inset(0 0 0% 0)",
            xPercent: 0,
            duration: 0.62,
            stagger: 0.1,
          },
        )
        .to(kineticLayers, {
          xPercent: 8,
          duration: 0.72,
          stagger: 0.06,
        });

      return () => timeline.kill();
    },
    [],
  );

  return (
    <section
      ref={heroRef}
      id="top"
      aria-labelledby="hero-title"
      className="hero-scene relative min-h-svh overflow-x-clip"
    >
      <HeroLineWavesBackground />

      <div aria-hidden="true" className="hero-kinetic-field">
        <span data-hero-kinetic className="hero-kinetic-word hero-kinetic-name">
          GUILHERME
        </span>
        <span data-hero-kinetic className="hero-kinetic-word hero-kinetic-system">
          SYSTEMS
        </span>
        <span data-hero-kinetic className="hero-kinetic-word hero-kinetic-ambition">
          AMBITION
        </span>
      </div>

      <div className="hero-content relative z-[2]">
        <p className="hero-eyebrow">{siteContent.heroEyebrow}</p>

        <h1 id="hero-title" className="hero-title">
          {siteContent.heroTitle}
        </h1>

        <p className="hero-disciplines">{siteContent.heroDisciplines}</p>

        <p className="hero-body">{siteContent.heroBody}</p>

        <div className="hero-actions">
          <LiquidMetalLink href={siteContent.heroCtaHref}>
            {siteContent.heroCta}
          </LiquidMetalLink>

          <LiquidMetalLink
            effectId="liquid-metal-github"
            href={siteContent.heroGithubHref}
            rel="noreferrer"
            target="_blank"
          >
            {siteContent.heroGithubLabel}
          </LiquidMetalLink>
        </div>
      </div>
    </section>
  );
}
