"use client";

import {
  useEffect,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import {
  useResumePrefersReducedMotion,
  useResumeSceneMode,
} from "@/components/resume/resume-scene-runtime";
import { ResumeSectionHeader } from "@/components/resume/resume-section-header";
import type { ResumeSkillGroup } from "@/types/resume";

export type ResumeCapabilityOrbitProps = {
  title: string;
  centerLabel: string;
  groups: readonly ResumeSkillGroup[];
};

export function ResumeCapabilityOrbit({
  title,
  centerLabel,
  groups,
}: ResumeCapabilityOrbitProps): ReactNode {
  const runtimeMode = useResumeSceneMode();
  const prefersReducedMotion = useResumePrefersReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const refresh = window.setTimeout(() => {
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(refresh);
  }, []);

  const mode = runtimeMode;

  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setSelectedIndex(null);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      event.currentTarget.blur();
      setSelectedIndex(null);
    }
  }

  return (
    <section
      aria-labelledby="resume-skills-heading"
      className={`resume-capability-orbit resume-capability-orbit--${mode}`}
      data-resume-capability-orbit
      data-motion-mode={mode}
      data-motion-preference={String(prefersReducedMotion)}
      data-resume-hydrated={hydrated ? "true" : "false"}
      onBlur={handleBlur}
    >
      <ResumeSectionHeader
        eyebrow={title}
        title={title}
        headingId="resume-skills-heading"
        className="resume-capability-orbit__heading"
      />
      <div className="resume-capability-orbit__stage">
        <div className="resume-capability-orbit__rings" aria-hidden="true" />
        <div className="resume-capability-orbit__center" aria-hidden="true">
          <span />
          {centerLabel}
        </div>
        <ul
          className="resume-capability-orbit__list"
          aria-label={title}
          data-resume-capability-list
          data-fallback={mode !== "enhanced" ? "true" : "false"}
        >
          {groups.map((group, index) => {
            const active = selectedIndex === index;
            const skillsId = `resume-capability-skills-${index}`;
            return (
              <li
                key={group.label}
                className={`resume-capability-orbit__group resume-capability-orbit__group--${index + 1}`}
                data-active={active ? "true" : "false"}
              >
                <button
                  type="button"
                  aria-controls={skillsId}
                  aria-expanded={active}
                  aria-pressed={active}
                  onClick={() => setSelectedIndex(index)}
                  onFocus={() => setSelectedIndex(index)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onKeyDown={handleKeyDown}
                  className="resume-capability-orbit__button"
                >
                  <span>{group.label}</span>
                </button>
                <ul
                  id={skillsId}
                  className="resume-capability-orbit__skills"
                  aria-label={group.label}
                  data-active={active ? "true" : "false"}
                >
                  {group.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
