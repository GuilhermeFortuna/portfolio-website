"use client";

import { useLocale } from "@/components/i18n/language-context";
import { SectionShell } from "@/components/layout/section-shell";
import { getSiteContent } from "@/content/site";

const PROCESS_STAGES = [
  "IDEA",
  "ARCHITECTURE",
  "AGENTS",
  "IMPLEMENTATION",
  "TESTING",
  "DEPLOYMENT",
] as const;

const STAGE_ACCENTS = [
  "var(--color-accent-a)",
  "var(--color-accent-b)",
  "var(--color-accent-c)",
] as const;

function stageAccent(index: number): string {
  return STAGE_ACCENTS[index % STAGE_ACCENTS.length];
}

export function ProcessSection() {
  const locale = useLocale();
  const siteContent = getSiteContent(locale);

  return (
    <SectionShell
      id="process"
      label={siteContent.processLabel}
      labelledBy="process-title"
      className="scene-section process-scene"
    >
      <div data-scene-intro className="scene-introduction process-introduction">
        <h2 id="process-title" className="process-title">
          {siteContent.processTitle}
        </h2>
        <p className="process-support">{siteContent.processBody}</p>
      </div>

      <ol aria-label="Engineering process" className="process-rail">
        {PROCESS_STAGES.map((stage, index) => (
          <li
            key={stage}
            data-process-stage
            className="process-stage"
          >
            <div
              data-process-line
              aria-hidden="true"
              className="process-stage-line"
            />
            <span className="process-stage-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="process-stage-name">{stage}</span>
            <span
              aria-hidden="true"
              className="process-stage-marker"
              style={{
                backgroundColor: stageAccent(index),
                color: stageAccent(index),
              }}
            />
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
