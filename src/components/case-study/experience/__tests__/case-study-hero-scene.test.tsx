import { act, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const lenis = {
  stop: vi.fn(),
  start: vi.fn(),
};

vi.mock("gsap", () => {
  const timeline = {
    to: vi.fn().mockReturnThis(),
    eventCallback: vi.fn().mockReturnThis(),
    play: vi.fn().mockReturnThis(),
    kill: vi.fn(),
    totalDuration: vi.fn(() => 2.5),
  };
  const api = {
    timeline: vi.fn(() => timeline),
    set: vi.fn(),
    ticker: { add: vi.fn(), remove: vi.fn() },
  };
  return { gsap: api, default: api };
});

vi.mock("@/components/providers/portfolio-motion-context", () => ({
  usePortfolioLenis: () => lenis,
}));

vi.mock("@/components/case-study/experience/case-study-scene-context", () => ({
  useCaseStudyScene: () => ({
    activeSceneId: "hero",
    sceneProgress: 0,
    activeSectionId: "top",
    sectionProgress: 0,
    articleProgress: 0,
    entranceComplete: false,
  }),
  useCaseStudyEntranceDispatch: () => vi.fn(),
}));

vi.mock("@/components/webgl/managed-webgl-effect", () => ({
  ManagedWebGLEffect: ({
    fallback,
    children,
  }: {
    fallback: ReactNode;
    children: (state: {
      shouldAnimate: boolean;
      dpr: number;
      pointerEnabled: boolean;
      isMobile: boolean;
    }) => ReactNode;
  }) => (
    <div data-testid="managed-webgl">
      {fallback}
      {children({
        shouldAnimate: false,
        dpr: 1,
        pointerEnabled: false,
        isMobile: false,
      })}
    </div>
  ),
}));

vi.mock("@/components/case-study/experience/case-study-webgl-stage", async () => {
  const actual = await vi.importActual<
    typeof import("@/components/case-study/experience/case-study-webgl-stage")
  >("@/components/case-study/experience/case-study-webgl-stage");
  return {
    ...actual,
    CaseStudyWebGLStage: ({
      fallback,
    }: {
      fallback: ReactNode;
    }) => <div data-testid="cinematic-stage">{fallback}</div>,
  };
});

import { CaseStudyHeroScene } from "../case-study-hero-scene";
import {
  createKineticRouteTransitionController,
} from "../kinetic-route-transition";

const hero = {
  backLink: { label: "Back to selected work", href: "/#work" },
  category: "Fraud intelligence",
  title: "Aegis",
  deck: "Fraud intelligence for the Brazilian iGaming industry",
  facts: [{ label: "Source", value: "Private" }],
  support: "Support copy for the hero.",
  liveEnvironment: { label: "Live environment — coming soon" },
  media: {
    src: "/work/aegis/entry-intro-poster.webp",
    alt: "Poster alt",
    width: 1600,
    height: 900,
  },
};

const media = [hero.media];

describe("CaseStudyHeroScene", () => {
  beforeEach(() => {
    lenis.stop.mockClear();
    lenis.start.mockClear();
  });

  it("keeps semantic hero copy and the approved poster in the document", () => {
    render(<CaseStudyHeroScene hero={hero} media={media} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Aegis" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Live environment — coming soon" }),
    ).toBeDisabled();

    const poster = screen.getByAltText("Poster alt");
    expect(poster).toHaveAttribute("src", "/work/aegis/entry-intro-poster.webp");
    expect(document.querySelector("#top")).not.toBeNull();
  });

  it("renders a single kinetic type field from the title data", () => {
    render(<CaseStudyHeroScene hero={hero} media={media} />);
    const field = document.querySelector("[data-type-transition]");
    expect(field).not.toBeNull();
    expect(field?.textContent).toContain("Aegis");
    expect(field?.querySelectorAll("[data-kinetic-line]").length).toBe(10);
  });

  it("stops Lenis during entrance and restarts on completion", async () => {
    render(<CaseStudyHeroScene hero={hero} media={media} />);

    await act(async () => {
      await Promise.resolve();
    });

    expect(lenis.stop).toHaveBeenCalled();
  });
});

describe("createKineticRouteTransitionController", () => {
  it("exposes enter, exit, cancel, and dispose for WO-032 reuse", async () => {
    const root = document.createElement("div");
    const line = document.createElement("div");
    document.body.append(root, line);

    const controller = createKineticRouteTransitionController(root, [line]);
    expect(controller.isAnimating()).toBe(false);

    const enterPromise = controller.enter();
    expect(controller.isAnimating()).toBe(true);
    controller.cancel();
    await enterPromise;
    expect(controller.isAnimating()).toBe(false);

    controller.dispose();
    await controller.exit();
    expect(controller.isAnimating()).toBe(false);
  });
});
