"use client";

import { useState } from "react";

import { ShapeBlur } from "@/components/effects/shape-blur";
import { ManagedWebGLEffect } from "@/components/webgl/managed-webgl-effect";
import type { WebGLEffectConfig } from "@/components/webgl/webgl-manager";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/content";

type ProjectShowcaseProps = {
  projects: readonly Project[];
};

type KnownProjectSlug = "aegis" | "q" | "gosigapp" | "nexo-dental";

const SHAPE_BLUR_CONFIG: WebGLEffectConfig = {
  id: "shape-blur",
  priority: "decorative",
  estimatedCost: "high",
  continuous: true,
  allowMobile: false,
};

/** Fades the outer 12% of every edge so the canvas never meets the stage border. */
const STAGE_EDGE_MASK = [
  "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
  "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
].join(", ");

function isFinePointer(): boolean {
  return window.matchMedia("(pointer: fine)").matches;
}

function isKnownProjectSlug(slug: string): slug is KnownProjectSlug {
  switch (slug) {
    case "aegis":
    case "q":
    case "gosigapp":
    case "nexo-dental":
      return true;
    default:
      return false;
  }
}

function shapeBlurColor(slug: string): string {
  if (!isKnownProjectSlug(slug)) {
    return "#8EA0FF";
  }

  switch (slug) {
    case "aegis":
      return "#8EA0FF";
    case "q":
      return "#68D7C5";
    case "gosigapp":
      return "#B49CFF";
    case "nexo-dental":
      return "#8EA0FF";
    default: {
      const _exhaustive: never = slug;
      return _exhaustive;
    }
  }
}

function AegisDiagram() {
  const highlightAccents: Record<number, string> = {
    9: "var(--color-accent-a)",
    18: "var(--color-accent-b)",
    26: "var(--color-accent-c)",
  };

  return (
    <div
      aria-hidden="true"
      className="grid h-full w-full grid-cols-7 grid-rows-5 place-items-center gap-[clamp(0.5rem,2vw,1.25rem)]"
    >
      {Array.from({ length: 35 }, (_, index) => {
        const cell = index + 1;
        const accent = highlightAccents[cell];

        return (
          <span
            key={cell}
            className="block size-[clamp(0.5rem,1.6vw,0.75rem)] rounded-full"
            style={{
              backgroundColor: accent ?? "var(--color-line)",
            }}
          />
        );
      })}
    </div>
  );
}

function QDiagram() {
  const lines = [
    { width: "82%", marker: false },
    { width: "68%", marker: true },
    { width: "48%", marker: false },
  ] as const;

  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full flex-col justify-center gap-[clamp(1.5rem,4vw,2.5rem)]"
    >
      {lines.map((line) => (
        <div
          key={line.width}
          className="relative"
          style={{ width: line.width }}
        >
          <div className="h-px w-full bg-[var(--color-line)]" />
          {line.marker ? (
            <span className="absolute top-1/2 left-[64%] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent-a)]" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function GosigappDiagram() {
  const stages = ["UPLOAD", "VALIDATE", "SUBMIT"] as const;

  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full flex-col items-center justify-center gap-0 min-[1200px]:flex-row"
    >
      {stages.map((stage, index) => (
        <div
          key={stage}
          className="flex flex-col items-center min-[1200px]:flex-row"
        >
          <div className="flex min-h-12 min-w-28 items-center justify-center border border-[var(--color-line)] px-4 py-3 [font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
            {stage}
          </div>
          {index < stages.length - 1 ? (
            <div
              className="h-8 w-px bg-[var(--color-line)] min-[1200px]:h-px min-[1200px]:w-10"
              aria-hidden="true"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function NexoDentalDiagram() {
  return (
    <div aria-hidden="true" className="relative h-full w-full">
      <div className="grid h-full w-full grid-cols-4 grid-rows-3 gap-[clamp(0.4rem,1.5vw,0.75rem)]">
        {Array.from({ length: 12 }, (_, index) => {
          const cell = index + 1;
          const isAccent = cell === 6;

          return (
            <span
              key={cell}
              className="block border border-[var(--color-line)]"
              style={{
                backgroundColor: isAccent
                  ? "var(--color-accent-b)"
                  : "transparent",
                opacity: isAccent ? 0.55 : 1,
              }}
            />
          );
        })}
      </div>
      <span
        className="pointer-events-none absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-text-muted)]"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute top-1/2 left-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-[var(--color-text-muted)]"
        aria-hidden="true"
      />
    </div>
  );
}

function ProjectDiagram({ slug }: { slug: string }) {
  if (!isKnownProjectSlug(slug)) {
    return null;
  }

  switch (slug) {
    case "aegis":
      return <AegisDiagram />;
    case "q":
      return <QDiagram />;
    case "gosigapp":
      return <GosigappDiagram />;
    case "nexo-dental":
      return <NexoDentalDiagram />;
    default: {
      const _exhaustive: never = slug;
      return _exhaustive;
    }
  }
}

function ProjectMeta({
  project,
  active,
}: {
  project: Project;
  active?: boolean;
}) {
  return (
    <>
      <p
        className={cn(
          "[font-family:var(--font-geist-mono)] text-[0.6875rem] leading-none font-semibold tracking-[0.14em] uppercase",
          active ? "text-[var(--color-accent-a)]" : "text-[var(--color-text-dim)]",
        )}
      >
        {project.index}
      </p>
      <p className="mt-3 [font-family:var(--font-geist-mono)] text-[0.6875rem] leading-none font-semibold tracking-[0.14em] text-[var(--color-text-dim)] uppercase">
        {project.category}
      </p>
      <h3
        className={cn(
          "mt-4 text-3xl font-[540] tracking-[-0.04em]",
          active === false
            ? "text-[var(--color-text-muted)]"
            : "text-[var(--color-text)]",
        )}
      >
        {project.name}
      </h3>
      <p className="mt-3 max-w-[var(--content-reading)] leading-relaxed text-[var(--color-text-muted)]">
        {project.summary}
      </p>
    </>
  );
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [activeSlug, setActiveSlug] = useState(projects[0].slug);

  return (
    <div className="mt-12">
      <div className="hidden lg:grid lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-[clamp(2rem,5vw,5rem)]">
        <div>
          {projects.map((project, index) => {
            const isActive = project.slug === activeSlug;

            return (
              <button
                key={project.slug}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveSlug(project.slug)}
                onFocus={() => setActiveSlug(project.slug)}
                onMouseEnter={() => {
                  if (isFinePointer()) {
                    setActiveSlug(project.slug);
                  }
                }}
                className={cn(
                  "w-full min-h-40 rounded-none border-t border-[var(--color-line)] bg-transparent py-6 text-left shadow-none",
                  index === projects.length - 1 && "border-b",
                )}
              >
                <ProjectMeta project={project} active={isActive} />
              </button>
            );
          })}
        </div>

        <div className="relative sticky top-32 aspect-[4/3] max-h-[42rem] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] p-[clamp(1.5rem,4vw,3rem)]">
          <div
            data-shape-blur-slot
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              opacity: 0.18,
              maskImage: STAGE_EDGE_MASK,
              maskComposite: "intersect",
              WebkitMaskImage: STAGE_EDGE_MASK,
              WebkitMaskComposite: "source-in",
            }}
          >
            <ManagedWebGLEffect
              config={SHAPE_BLUR_CONFIG}
              className="absolute inset-0 h-full w-full"
              fallback={null}
            >
              {({ shouldAnimate }) => (
                <ShapeBlur
                  active={shouldAnimate}
                  color={shapeBlurColor(activeSlug)}
                  variation={0}
                  pixelRatio={1.25}
                  shapeSize={1.05}
                  roundness={0.45}
                  borderSize={0.04}
                  circleSize={0.18}
                  circleEdge={0.3}
                />
              )}
            </ManagedWebGLEffect>
          </div>
          <div className="relative z-[1] h-full w-full">
            <ProjectDiagram slug={activeSlug} />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className={cn(
              "border-t border-[var(--color-line)] py-8",
              index === projects.length - 1 && "border-b",
            )}
          >
            <ProjectMeta project={project} />
          </article>
        ))}
      </div>
    </div>
  );
}
