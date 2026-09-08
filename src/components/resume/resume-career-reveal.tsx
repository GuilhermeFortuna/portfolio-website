"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { useSceneTimeline } from "@/components/motion/motion-runtime";
import { useResumeSceneRuntime } from "@/components/resume/resume-scene-runtime";
import { ResumeTimeline } from "@/components/resume/resume-timeline";
import type { ResumeExperience } from "@/types/resume";

export type ResumeCareerRevealProps = {
  entries: readonly ResumeExperience[];
  sectionLabel: string;
  sectionTitle: string;
};

const CAREER_ENHANCEMENT_QUERY =
  "(min-width: 1200px) and (min-height: 720px) and (pointer: fine)";

/**
 * The only client-side choice between the server-safe chronology and the
 * desktop treatment. Keeping the fallback as the initial render prevents a
 * hydration or media-query failure from removing Resume facts.
 */
export function ResumeExperienceScene(props: ResumeCareerRevealProps): ReactNode {
  const { prefersReducedMotion } = useResumeSceneRuntime();
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.(CAREER_ENHANCEMENT_QUERY);
    if (!media) {
      return;
    }
    const refresh = () => setEnhanced(media.matches);
    refresh();
    media.addEventListener("change", refresh);
    return () => media.removeEventListener("change", refresh);
  }, []);

  if (prefersReducedMotion || !enhanced) {
    return <ResumeTimeline {...props} />;
  }

  return <ResumeCareerReveal {...props} />;
}

/**
 * Presentational desktop adaptation of Horizontal Feature Reveal. Its list is
 * the sole experience DOM while the GSAP context changes only its geometry.
 */
export function ResumeCareerReveal({
  entries,
  sectionLabel,
  sectionTitle,
}: ResumeCareerRevealProps): ReactNode {
  const scopeRef = useRef<HTMLElement>(null);

  useSceneTimeline(
    scopeRef,
    ({ gsap }) => {
      const scope = scopeRef.current;
      const track = scope?.querySelector<HTMLElement>("[data-resume-career-track]");
      if (!scope || !track) {
        return;
      }

      const tween = gsap.to(track, {
        x: () => Math.min(0, scope.clientWidth - track.scrollWidth),
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top+=96",
          end: () => `+=${Math.max(scope.clientWidth, track.scrollWidth)}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (trigger) => {
            scope.dataset.activeCareerIndex = String(
              Math.min(entries.length - 1, Math.floor(trigger.progress * entries.length)),
            );
          },
        },
      });

      return () => {
        tween.kill();
        delete scope.dataset.activeCareerIndex;
      };
    },
    [entries.length],
  );

  return (
    <section
      ref={scopeRef}
      aria-labelledby="resume-experience-heading"
      className="resume-career-reveal border-b border-[var(--color-line)] py-12 lg:py-16"
      data-resume-career-reveal
    >
      <div className="resume-career-reveal__heading">
        <p className="[font-family:var(--font-geist-mono)] text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          {sectionLabel}
        </p>
        <h2
          id="resume-experience-heading"
          className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-3xl"
        >
          {sectionTitle}
        </h2>
      </div>

      <div className="resume-career-reveal__viewport">
        <div aria-hidden="true" className="resume-career-reveal__progress" data-resume-career-progress>
          <span>01</span>
          <i />
          <span>02</span>
        </div>
        <ol aria-label={sectionLabel} className="resume-career-reveal__track" data-resume-career-track>
          {entries.map((entry, index) => (
            <li key={`${entry.organization}-${entry.period}`} className="resume-career-reveal__card">
              <article aria-labelledby={`resume-career-${index}-heading`}>
                <p className="resume-career-reveal__period">{entry.period}</p>
                <h3 id={`resume-career-${index}-heading`}>{entry.organization}</h3>
                <p className="resume-career-reveal__role">{entry.role} · {entry.location}</p>
                <ul>
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
