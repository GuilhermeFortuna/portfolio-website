import type { RefObject } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ProjectShowcase } from "@/components/sections/project-showcase";
import type { SceneTimelineFactory } from "@/components/motion/motion-runtime";
import { projectMedia } from "@/content/project-media";
import { projects } from "@/content/projects";
import { render, screen, within } from "@/test/render";

/*
 * `useSceneTimeline` is mocked so this file proves DOM structure, content,
 * and the enhancement's wiring (pin/Flip/keyboard-follow) without real GSAP,
 * ScrollTrigger, or Flip work — matching the convention already used by
 * scroll-choreography.test.tsx.
 */
const timelineRegistration = vi.hoisted(() => vi.fn());

vi.mock("@/components/motion/motion-runtime", () => ({
  useSceneTimeline: timelineRegistration,
}));

vi.mock("gsap/Flip", () => ({
  Flip: {
    getState: vi.fn(() => ({})),
    from: vi.fn(),
  },
}));

function registeredTimeline(): { createTimeline: SceneTimelineFactory } {
  const call = timelineRegistration.mock.calls.at(-1) as [
    RefObject<Element | null>,
    SceneTimelineFactory,
    unknown[],
  ];
  return { createTimeline: call[1] };
}

function runDesktopEnhancement() {
  const { createTimeline } = registeredTimeline();

  const set = vi.fn();
  const to = vi.fn();
  const registerPlugin = vi.fn();
  const matchMediaAdd = vi.fn((_query: string, callback: () => unknown) => {
    callback();
  });
  const gsapFake = {
    registerPlugin,
    set,
    to,
    matchMedia: vi.fn(() => ({ add: matchMediaAdd })),
  };

  const trigger = { start: 0, end: 900, scroll: vi.fn() };
  const create = vi.fn((_config: Record<string, unknown>) => trigger);
  const ScrollTriggerFake = { create };

  createTimeline({
    gsap: gsapFake,
    ScrollTrigger: ScrollTriggerFake,
    scrollProgress: { on: vi.fn(() => vi.fn()) },
    prefersReducedMotion: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  return { gsapFake, trigger, create, matchMediaAdd, registerPlugin };
}

describe("ProjectShowcase", () => {
  beforeEach(() => {
    timelineRegistration.mockClear();
  });

  it("renders every project's index, category, name, and summary verbatim, always in source order", () => {
    render(<ProjectShowcase projects={projects} />);

    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(projects.length);

    articles.forEach((article, index) => {
      const project = projects[index];
      expect(
        within(article).getByRole("heading", { level: 3 }),
      ).toHaveTextContent(project.name);
      expect(article).toHaveTextContent(project.summary);
      expect(article).toHaveTextContent(project.category);
      expect(article).toHaveTextContent(project.index);
    });
  });

  it("renders a link only for projects with a route, with the derived label, never nested in a button", () => {
    render(<ProjectShowcase projects={projects} />);

    expect(document.querySelectorAll("button")).toHaveLength(0);

    for (const project of projects) {
      const link = screen.queryByRole("link", {
        name: `View ${project.name} case study`,
      });

      if (project.href === null) {
        expect(link).toBeNull();
      } else {
        expect(link).not.toBeNull();
        expect(link).toHaveAttribute("href", project.href);
        expect(link!.closest("button")).toBeNull();
      }
    }

    expect(document.querySelector("[aria-disabled]")).toBeNull();
    expect(document.body.textContent).not.toContain("[REQUIRED:");
  });

  it("gives every project — media or placeholder — the same aperture slot shape", () => {
    render(<ProjectShowcase projects={projects} />);

    projects.forEach((project, index) => {
      const image = document.querySelector(
        `[data-aperture-own-image="${project.slug}"]`,
      ) as HTMLImageElement | null;
      const media = projectMedia[project.slug];

      expect(image).not.toBeNull();
      expect(image).toHaveAttribute("src", media.src);
      expect(image).toHaveAttribute("alt", media.alt);
      expect(image).toHaveAttribute("loading", index === 0 ? "eager" : "lazy");

      const slot = image!.closest("[data-aperture-slot]");
      expect(slot).not.toBeNull();
    });
  });

  it("keeps the shared aperture decorative and hidden until the motion enhancement runs", () => {
    render(<ProjectShowcase projects={projects} />);

    const aperture = document.querySelector(
      '[aria-hidden="true"].pointer-events-none.absolute',
    );
    expect(aperture).not.toBeNull();
    expect(aperture).toHaveClass("opacity-0");
    expect(aperture!.textContent).toBe("");
  });

  it("registers a desktop-only pinned scene through useSceneTimeline", () => {
    render(<ProjectShowcase projects={projects} />);

    const { create, matchMediaAdd, registerPlugin } = runDesktopEnhancement();

    expect(matchMediaAdd).toHaveBeenCalledWith(
      "(min-width: 1024px)",
      expect.any(Function),
    );
    expect(registerPlugin).toHaveBeenCalled();
    expect(create).toHaveBeenCalledTimes(1);
    expect(create.mock.calls[0][0]).toMatchObject({ pin: true });
  });

  /*
   * Absolute-stacked panels keep painting opacity for crossfades, but an
   * opacity-0 panel still sits above earlier siblings in DOM order and
   * intercepts clicks. Without pointer-events toggling, the Aegis case-study
   * link is covered by later panels (notably Nexo Dental's left-side aperture).
   */
  it("disables pointer events on inactive stacked panels so the active case-study link stays clickable", () => {
    render(<ProjectShowcase projects={projects} />);
    const { gsapFake, create } = runDesktopEnhancement();

    const articles = screen.getAllByRole("article");
    expect(gsapFake.set).toHaveBeenCalledWith(articles, {
      position: "absolute",
      inset: 0,
      opacity: 0,
      pointerEvents: "none",
    });
    expect(gsapFake.set).toHaveBeenCalledWith(articles[0], {
      opacity: 1,
      pointerEvents: "auto",
    });

    const onUpdate = create.mock.calls[0][0].onUpdate as (self: {
      progress: number;
    }) => void;

    // Midway between Aegis (0) and Quant (1) still rounds to Aegis.
    onUpdate({ progress: 0.1 / (projects.length - 1) });
    expect(gsapFake.set).toHaveBeenCalledWith(articles[0], {
      opacity: expect.any(Number),
      pointerEvents: "auto",
    });
    expect(gsapFake.set).toHaveBeenCalledWith(articles[1], {
      opacity: expect.any(Number),
      pointerEvents: "none",
    });

    // Snap to Quant — only its panel should accept pointer input.
    gsapFake.set.mockClear();
    onUpdate({ progress: 1 / (projects.length - 1) });
    expect(gsapFake.set).toHaveBeenCalledWith(articles[0], {
      opacity: expect.any(Number),
      pointerEvents: "none",
    });
    expect(gsapFake.set).toHaveBeenCalledWith(articles[1], {
      opacity: expect.any(Number),
      pointerEvents: "auto",
    });
  });

  it("advances the pinned scroll position when a project's link is focused via keyboard", () => {
    render(<ProjectShowcase projects={projects} />);
    const { trigger } = runDesktopEnhancement();

    // Quant has a case-study link; focusing it should be enough to bring it
    // into view even though it isn't the rail (index 0, Aegis, starts active
    // and would be a no-op jump).
    const link = screen.getAllByRole("link", {
      name: `View ${projects[1].name} case study`,
    })[0];
    link.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));

    const stops = projects.length - 1;
    const expectedScroll =
      trigger.start + (1 / stops) * (trigger.end - trigger.start);
    expect(trigger.scroll).toHaveBeenCalledWith(expectedScroll);
  });

  it("gives every project a keyboard-reachable rail control", () => {
    render(<ProjectShowcase projects={projects} />);
    const { trigger } = runDesktopEnhancement();

    // Every project has a published case-study route; the rail still makes
    // each panel reachable while the section is pinned.
    const targetProject = projects[3];
    expect(targetProject).toBeDefined();

    const railLink = document.querySelector(
      `[data-project-jump="${targetProject.slug}"]`,
    ) as HTMLElement;
    expect(railLink).not.toBeNull();
    expect(railLink.tagName).toBe("A");

    railLink.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));

    const stops = projects.length - 1;
    const index = projects.findIndex(
      (project) => project.slug === targetProject.slug,
    );
    const expectedScroll =
      trigger.start + (index / stops) * (trigger.end - trigger.start);
    expect(trigger.scroll).toHaveBeenCalledWith(expectedScroll);
  });

  it("intercepts a rail click during the pinned enhancement instead of a native hash jump", () => {
    render(<ProjectShowcase projects={projects} />);
    const { trigger } = runDesktopEnhancement();

    const railLink = document.querySelector(
      `[data-project-jump="${projects[3].slug}"]`,
    ) as HTMLAnchorElement;
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    railLink.dispatchEvent(clickEvent);

    expect(clickEvent.defaultPrevented).toBe(true);
    expect(trigger.scroll).toHaveBeenCalled();
  });
});
