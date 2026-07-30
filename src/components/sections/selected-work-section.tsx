import { SparklesAccent } from "@/components/effects/sparkles";
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
        className="pointer-events-none relative mt-6 mb-12 h-24 w-[min(100%,45rem)] overflow-hidden"
      >
        <div
          className="absolute top-0 left-1/2 z-20 h-px w-4/5 -translate-x-1/2"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-accent-a) 28%, transparent)",
          }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            maskImage:
              "radial-gradient(ellipse at center, black 18%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 18%, transparent 72%)",
          }}
        >
          <SparklesAccent className="h-full w-full" />
        </div>
      </div>
      <ProjectShowcase projects={projects} />
    </SectionShell>
  );
}
