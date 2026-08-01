"use client";

import { useMemo, useRef } from "react";

import { SectionShell } from "@/components/layout/section-shell";
import { LogoLoop, type LogoItem } from "@/components/ui/logo-loop";
import { siteContent } from "@/content/site";
import { useEffectActivity } from "@/hooks/use-effect-activity";

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

const stageLabelClassName =
  "inline-flex items-center gap-[0.625rem] whitespace-nowrap [font-family:var(--font-geist-mono)] text-[0.75rem] font-[550] tracking-[0.06em] text-[var(--color-text-muted)] uppercase";

function StageLabel({ stage, accent }: { stage: string; accent: string }) {
  return (
    <span className={stageLabelClassName}>
      <span
        aria-hidden="true"
        className="h-[6px] w-[6px] flex-none"
        style={{ backgroundColor: accent }}
      />
      {stage}
    </span>
  );
}

function stageAccent(index: number): string {
  return STAGE_ACCENTS[index % STAGE_ACCENTS.length];
}

export function ProcessSection() {
  const loopRef = useRef<HTMLDivElement>(null);
  const active = useEffectActivity(loopRef);

  const stageItems = useMemo<LogoItem[]>(
    () =>
      PROCESS_STAGES.map((stage, index) => ({
        node: <StageLabel stage={stage} accent={stageAccent(index)} />,
      })),
    [],
  );

  return (
    <SectionShell
      id="process"
      label={siteContent.processLabel}
      labelledBy="process-title"
    >
      <h2
        id="process-title"
        className="mt-8 max-w-[var(--content-reading)] text-[clamp(2.25rem,5vw,4.75rem)] leading-none font-[540] tracking-[-0.04em]"
      >
        {siteContent.processTitle}
      </h2>

      <div className="mt-8">
        <div ref={loopRef}>
          <LogoLoop
            logos={stageItems}
            speed={34}
            direction="left"
            width="100%"
            logoHeight={22}
            gap={48}
            pauseOnHover
            pauseOnFocus
            fadeOut
            fadeOutColor="#06070a"
            scaleOnHover={false}
            ariaLabel="Engineering process"
            active={active}
          />
        </div>
      </div>

      <p className="mt-8 max-w-[var(--content-reading)] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.65] text-[var(--color-text-muted)]">
        {siteContent.processBody}
      </p>
    </SectionShell>
  );
}
