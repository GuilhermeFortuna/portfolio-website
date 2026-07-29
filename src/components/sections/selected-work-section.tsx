import { SectionShell } from "@/components/layout/section-shell";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { projects } from "@/content/projects";
import { siteContent } from "@/content/site";

export function SelectedWorkSection() {
  return (
    <SectionShell
      id="work"
      label={siteContent.workLabel}
      labelledBy="work-title"
    >
      <h2
        id="work-title"
        className="mt-8 max-w-[var(--content-reading)] text-[clamp(2.25rem,5vw,4.75rem)] leading-none font-[540] tracking-[-0.04em]"
      >
        {siteContent.workTitle}
      </h2>
      <ProjectShowcase projects={projects} />
    </SectionShell>
  );
}
