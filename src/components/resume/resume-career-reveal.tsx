"use client";

import { useRef, type ReactNode } from "react";

import { useSceneTimeline } from "@/components/motion/motion-runtime";
import { useResumeSceneMode } from "@/components/resume/resume-scene-runtime";
import { ResumeTimeline } from "@/components/resume/resume-timeline";
import type { ResumeExperience } from "@/types/resume";

export type ResumeCareerRevealProps = {
  entries: readonly ResumeExperience[];
  sectionLabel: string;
  sectionTitle: string;
};

function splitHighlight(highlight: string): { label: string; detail: string } {
  const separator = highlight.indexOf(":");
  if (separator < 0) {
    return { label: highlight, detail: "" };
  }

  return {
    label: highlight.slice(0, separator).trim(),
    detail: highlight.slice(separator + 1).trim(),
  };
}

/**
 * The only client-side choice between the server-safe chronology and the
 * desktop treatment. Keeping the fallback as the initial render prevents a
 * hydration or media-query failure from removing Resume facts.
 */
export function ResumeExperienceScene(props: ResumeCareerRevealProps): ReactNode {
  const mode = useResumeSceneMode();

  if (mode !== "enhanced") {
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

      <div
        className="resume-career-reveal__viewport"
        data-resume-career-viewport
        data-career-stage="single-card"
      >
        <div aria-hidden="true" className="resume-career-reveal__progress" data-resume-career-progress>
          <span>01</span>
          <i />
          <span>02</span>
        </div>
        <ol aria-label={sectionLabel} className="resume-career-reveal__track" data-resume-career-track>
          {entries.map((entry, index) => (
            <li
              key={`${entry.organization}-${entry.period}`}
              className="resume-career-reveal__card"
              data-resume-career-card
            >
              <article aria-labelledby={`resume-career-${index}-heading`}>
                <p className="resume-career-reveal__period">{entry.period}</p>
                <h3 id={`resume-career-${index}-heading`}>{entry.organization}</h3>
                <p className="resume-career-reveal__role">{entry.role} · {entry.location}</p>
                <ul>
                  {entry.highlights.map((highlight, highlightIndex) => {
                    const { label, detail } = splitHighlight(highlight);

                    return (
                      <li key={highlight} className="resume-career-reveal__highlight">
                        <span aria-hidden="true" className="resume-career-reveal__highlight-index">
                          {String(highlightIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="resume-career-reveal__highlight-copy">
                          <span data-resume-highlight-label className="resume-career-reveal__highlight-label">
                            {label}{detail ? ":" : ""}
                          </span>
                          {detail ? <span className="resume-career-reveal__highlight-detail"> {detail}</span> : null}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
