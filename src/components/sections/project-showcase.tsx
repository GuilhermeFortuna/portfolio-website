"use client";

import { useRef } from "react";
import { Flip } from "gsap/Flip";

import { useLocale } from "@/components/i18n/language-context";
import { useSceneTimeline } from "@/components/motion/motion-runtime";
import { projectMedia } from "@/content/project-media";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/content";

type ProjectShowcaseProps = {
  projects: readonly Project[];
};

type KnownProjectSlug = "aegis" | "q" | "gosigapp" | "nexo-dental";

const DESKTOP_QUERY = "(min-width: 1024px)";

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

function apertureAccent(slug: string): string {
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

/*
 * The case-study link is a real link only where a route exists. Projects
 * whose `href` is still `null` render nothing here — no disabled control, no
 * fake destination, no placeholder action. There is no "active" selection
 * state in this layout (every project is always fully visible), so the link
 * is always rendered unconditionally when a route exists; it can never
 * appear or disappear under the pointer, so row geometry never shifts
 * because of it.
 */
const caseStudyLinkClassName =
  "inline-flex min-h-11 items-center [font-family:var(--font-geist-mono)] text-[0.875rem] font-semibold tracking-[0.14em] uppercase lg:text-[1rem]";

function CaseStudyLink({ project }: { project: Project }) {
  const locale = useLocale();

  if (project.href === null) {
    return null;
  }

  const label =
    locale === "pt-BR"
      ? `Ver estudo de caso: ${project.name}`
      : `View ${project.name} case study`;

  return (
    <a
      href={project.href}
      className={caseStudyLinkClassName}
      style={{ color: "var(--color-accent-a)" }}
    >
      {label}
    </a>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div>
      <p className="[font-family:var(--font-geist-mono)] text-[0.875rem] leading-none font-semibold tracking-[0.14em] text-[var(--color-accent-a)] uppercase lg:text-[1rem]">
        {project.index}
      </p>
      <p className="mt-5 [font-family:var(--font-geist-mono)] text-[0.875rem] leading-none font-semibold tracking-[0.14em] text-[var(--color-text-dim)] uppercase lg:text-[1rem]">
        {project.category}
      </p>
      <h3 className="mt-6 text-[clamp(3rem,5.5vw,6.5rem)] leading-[0.95] font-[540] tracking-[-0.04em] text-[var(--color-text)]">
        {project.name}
      </h3>
      <p className="mt-8 max-w-[46rem] text-[1.25rem] leading-relaxed text-[var(--color-text-muted)] lg:text-[1.5rem]">
        {project.summary}
      </p>
      <div className="mt-10">
        <CaseStudyLink project={project} />
      </div>
    </div>
  );
}

function ProjectAperture({
  slug,
  eager,
  slotRef,
}: {
  slug: string;
  eager: boolean;
  slotRef: (element: HTMLDivElement | null) => void;
}) {
  const media = projectMedia[slug];

  return (
    <div
      ref={slotRef}
      data-aperture-slot={slug}
      className="relative aspect-video overflow-hidden rounded-[var(--radius-lg)] border"
      style={{ borderColor: "var(--color-line)" }}
    >
      {media ? (
        <img
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          data-aperture-own-image={slug}
          className="h-full w-full object-cover"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${apertureAccent(slug)} 20%, transparent)` }}
      />
    </div>
  );
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Record<string, HTMLElement | null>>({});
  const slotRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const apertureRef = useRef<HTMLDivElement>(null);
  const apertureImageRefs = useRef<{
    a: HTMLImageElement | null;
    b: HTMLImageElement | null;
  }>({ a: null, b: null });

  useSceneTimeline(
    sectionRef,
    ({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(Flip);

      const mm = gsap.matchMedia();

      mm.add(DESKTOP_QUERY, () => {
        const section = sectionRef.current;
        const aperture = apertureRef.current;
        const panels = projects.map(
          (project) => panelRefs.current[project.slug],
        );

        if (
          !section ||
          !aperture ||
          panels.some((panel) => panel === null)
        ) {
          return () => {};
        }

        const stops = projects.length - 1;
        let activeIndex = 0;
        let topLayer: "a" | "b" = "a";

        // Panels lose their document-flow height once they go absolute, so
        // the section itself would collapse to the rail's height and pin
        // flush against the top edge. Give it the full viewport instead and
        // let each panel's own `items-center` grid centre its content in it.
        // The shared aperture takes over showing each project's image; the
        // per-panel slot's own <img> stays in the DOM (for the static/no-JS
        // state) but must not paint underneath it here, or the two visibly
        // double up whenever their rects drift apart even slightly.
        const slotImages = projects
          .map((project) => slotRefs.current[project.slug]?.querySelector("img"))
          .filter((img): img is HTMLImageElement => img !== null && img !== undefined);

        gsap.set(section, { minHeight: "100vh" });
        // Opacity alone is not enough: absolute panels stack in DOM order, so
        // an opacity-0 sibling still intercepts clicks over earlier panels
        // (e.g. Nexo Dental's left aperture covering Aegis's case-study link).
        gsap.set(panels, {
          position: "absolute",
          inset: 0,
          opacity: 0,
          pointerEvents: "none",
        });
        gsap.set(panels[0], { opacity: 1, pointerEvents: "auto" });
        gsap.set(slotImages, { opacity: 0 });
        gsap.set(aperture, { opacity: 1 });

        const positionAperture = (index: number, animate: boolean) => {
          const slot = slotRefs.current[projects[index].slug];
          if (!slot) {
            return;
          }

          const state = animate ? Flip.getState(aperture) : null;
          const sectionBox = section.getBoundingClientRect();
          const slotBox = slot.getBoundingClientRect();

          gsap.set(aperture, {
            left: slotBox.left - sectionBox.left,
            top: slotBox.top - sectionBox.top,
            width: slotBox.width,
            height: slotBox.height,
            borderColor: apertureAccent(projects[index].slug),
          });

          if (state) {
            Flip.from(state, { duration: 0.6, ease: "power2.inOut" });
          }

          const media = projectMedia[projects[index].slug];
          const nextLayer = topLayer === "a" ? "b" : "a";
          const nextImg = apertureImageRefs.current[nextLayer];
          const prevImg = apertureImageRefs.current[topLayer];

          if (media && nextImg) {
            nextImg.src = media.src;
            nextImg.alt = media.alt;
            gsap.set(nextImg, { opacity: 0 });
            gsap.to(nextImg, { opacity: 1, duration: 0.4 });
            if (prevImg) {
              gsap.to(prevImg, { opacity: 0, duration: 0.4 });
            }
          }

          topLayer = nextLayer;
        };

        positionAperture(0, false);

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * stops}`,
          pin: true,
          scrub: 0.5,
          snap: {
            snapTo: 1 / stops,
            duration: 0.35,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const raw = self.progress * stops;
            const nextIndex = Math.min(stops, Math.round(raw));

            projects.forEach((project, index) => {
              const panel = panelRefs.current[project.slug];
              if (!panel) {
                return;
              }
              const distance = Math.abs(raw - index);
              gsap.set(panel, {
                opacity: Math.max(0, 1 - distance * 1.6),
                pointerEvents: index === nextIndex ? "auto" : "none",
              });
            });

            if (nextIndex !== activeIndex) {
              activeIndex = nextIndex;
              positionAperture(activeIndex, true);
            }
          },
        });

        const handleResize = () => positionAperture(activeIndex, false);
        window.addEventListener("resize", handleResize);

        // A project without a case-study link has no other focusable element
        // in its panel; while pinned, a keyboard user could tab straight past
        // it. The rail gives every project — with or without a route — one
        // reachable control that brings it into view.
        const jumpTo = (index: number) => {
          if (index === -1 || index === activeIndex) {
            return;
          }
          const targetScroll =
            trigger.start + (index / stops) * (trigger.end - trigger.start);
          trigger.scroll(targetScroll);
        };

        const indexForSlug = (slug: string | null) =>
          projects.findIndex((project) => project.slug === slug);

        const handleFocusIn = (event: FocusEvent) => {
          const target = event.target;
          if (!(target instanceof HTMLElement)) {
            return;
          }
          const source = target.closest<HTMLElement>(
            "[data-project-panel], [data-project-jump]",
          );
          if (!source) {
            return;
          }
          const slug =
            source.getAttribute("data-project-panel") ??
            source.getAttribute("data-project-jump");
          jumpTo(indexForSlug(slug));
        };
        section.addEventListener("focusin", handleFocusIn);

        const handleRailClick = (event: MouseEvent) => {
          const target = event.target;
          if (!(target instanceof HTMLElement)) {
            return;
          }
          const rail = target.closest<HTMLElement>("[data-project-jump]");
          if (!rail) {
            return;
          }
          event.preventDefault();
          jumpTo(indexForSlug(rail.getAttribute("data-project-jump")));
        };
        section.addEventListener("click", handleRailClick);

        return () => {
          window.removeEventListener("resize", handleResize);
          section.removeEventListener("focusin", handleFocusIn);
          section.removeEventListener("click", handleRailClick);
          gsap.set(section, { clearProps: "minHeight" });
          gsap.set(panels, { clearProps: "all" });
          gsap.set(slotImages, { clearProps: "all" });
          gsap.set(aperture, { clearProps: "all" });
          (["a", "b"] as const).forEach((layer) => {
            const img = apertureImageRefs.current[layer];
            if (img) {
              gsap.set(img, { clearProps: "all" });
            }
          });
        };
      });
    },
    [projects],
  );

  return (
    <div className="mt-12 lg:mx-[calc(50%-50vw)] lg:w-screen">
      <div className="lg:mx-auto lg:max-w-[120rem] lg:px-[clamp(2.5rem,5vw,5rem)]">
        {/*
          Panels use `position: absolute; inset: 0`, which resolves against
          this element's own padding box and ignores any padding declared on
          it directly — so the horizontal gutter has to live one level up,
          on a non-positioned ancestor, or the panels render flush to the
          true edge regardless of it.
        */}
        <div ref={sectionRef} className="relative">
          <div
            ref={apertureRef}
            aria-hidden="true"
            className="pointer-events-none absolute z-10 hidden overflow-hidden rounded-[var(--radius-lg)] border opacity-0 lg:block"
            style={{ borderColor: "var(--color-line)" }}
          >
            <img
              ref={(element) => {
                apertureImageRefs.current.a = element;
              }}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <img
              ref={(element) => {
                apertureImageRefs.current.b = element;
              }}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-0"
            />
          </div>

          <nav
            aria-label="Select project"
            className="relative z-20 mb-8 hidden gap-4 lg:flex"
          >
            {projects.map((project) => (
              <a
                key={project.slug}
                href={`#${project.slug}`}
                data-project-jump={project.slug}
                className="[font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] text-[var(--color-text-dim)] uppercase transition-colors hover:text-[var(--color-text)]"
              >
                {`${project.index} ${project.name}`}
              </a>
            ))}
          </nav>

          {projects.map((project, index) => {
            const meta = <ProjectMeta key="meta" project={project} />;
            const aperture = (
              <ProjectAperture
                key="aperture"
                slug={project.slug}
                eager={index === 0}
                slotRef={(element) => {
                  slotRefs.current[project.slug] = element;
                }}
              />
            );

            return (
              <article
                key={project.slug}
                id={project.slug}
                ref={(element) => {
                  panelRefs.current[project.slug] = element;
                }}
                data-project-panel={project.slug}
                className={cn(
                  "grid gap-8 border-t border-[var(--color-line)] py-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-center lg:gap-[clamp(3rem,7vw,8rem)] lg:py-24",
                  index === projects.length - 1 && "border-b",
                )}
              >
                {index % 2 === 1 ? [aperture, meta] : [meta, aperture]}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
