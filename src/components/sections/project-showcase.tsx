import type { Project } from "@/types/content";

type ProjectShowcaseProps = {
  projects: readonly Project[];
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  return (
    <ul className="mt-12 space-y-12">
      {projects.map((project) => (
        <li key={project.slug}>
          <p className="[font-family:var(--font-geist-mono)] text-[0.6875rem] leading-none font-semibold tracking-[0.14em] text-[var(--color-text-dim)] uppercase">
            {project.index} / {project.category}
          </p>
          <h3 className="mt-4 text-3xl font-[540] tracking-[-0.04em]">
            {project.name}
          </h3>
          <p className="mt-3 max-w-[var(--content-reading)] leading-relaxed text-[var(--color-text-muted)]">
            {project.summary}
          </p>
        </li>
      ))}
    </ul>
  );
}
