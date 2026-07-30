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
      <div
        data-sparkles-slot
        aria-hidden="true"
        className="mt-6 mb-12 h-24 w-[min(100%,45rem)] border-t border-[var(--color-line)]"
      />
      <ProjectShowcase projects={projects} />
    </SectionShell>
  );
}
