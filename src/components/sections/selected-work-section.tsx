"use client";

import { useLocale } from "@/components/i18n/language-context";
import { SectionShell } from "@/components/layout/section-shell";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { getProjects } from "@/content/projects";
import { getSiteContent } from "@/content/site";

export function SelectedWorkSection() {
  const locale = useLocale();
  const siteContent = getSiteContent(locale);
  const projects = getProjects(locale);

  return (
    <SectionShell
      id="work"
      label={siteContent.workLabel}
      labelledBy="work-title"
      className="scene-section work-scene"
    >
      <div data-scene-intro className="scene-introduction">
        <h2
          id="work-title"
          className="mt-8 max-w-[var(--content-reading)] text-[clamp(2.25rem,5vw,4.75rem)] leading-none font-[540] tracking-[-0.04em]"
        >
          {siteContent.workTitle}
        </h2>
        <div aria-hidden="true" className="scene-rule mt-8" />
      </div>
      <ProjectShowcase projects={projects} />
    </SectionShell>
  );
}
