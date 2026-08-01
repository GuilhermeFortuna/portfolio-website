import { act, render, renderHook, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { scrollTriggerRefresh, fakeLenisRef } = vi.hoisted(() => {
  return {
    scrollTriggerRefresh: vi.fn(),
    fakeLenisRef: { current: null as null | object },
  };
});

vi.mock("gsap", () => {
  const timeline = {
    data: { id: "test-root" },
    eventCallback: vi.fn(),
    to: vi.fn(),
    add: vi.fn(),
    addLabel: vi.fn(),
    removeLabel: vi.fn(),
    revert: vi.fn(),
  };
  return {
    gsap: {
      registerPlugin: vi.fn(),
      context: vi.fn((fn: () => void) => {
        fn();
        return { revert: vi.fn() };
      }),
      timeline: vi.fn(() => timeline),
      utils: { selector: vi.fn(() => vi.fn()) },
      getById: vi.fn(),
      set: vi.fn(() => ({
        play: vi.fn(),
        vars: {},
        data: {},
      })),
    },
    default: {
      registerPlugin: vi.fn(),
      context: vi.fn((fn: () => void) => {
        fn();
        return { revert: vi.fn() };
      }),
      timeline: vi.fn(() => timeline),
      utils: { selector: vi.fn(() => vi.fn()) },
      getById: vi.fn(),
      set: vi.fn(() => ({
        play: vi.fn(),
        vars: {},
        data: {},
      })),
      ticker: { add: vi.fn(), remove: vi.fn() },
    },
  };
});

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    refresh: scrollTriggerRefresh,
    update: vi.fn(),
  },
}));

vi.mock("motion/react", () => ({
  MotionConfig: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("lenis/react", () => ({
  ReactLenis: ({ children }: { children: ReactNode }) => (
    <div data-testid="react-lenis">{children}</div>
  ),
  useLenis: () => fakeLenisRef.current,
}));

import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import {
  AEGIS_SCENE_DEFINITIONS,
  AEGIS_SECTION_IDS,
  clamp01,
  computeSceneSnapshot,
  resolveActiveScene,
  resolveActiveSection,
} from "@/components/case-study/experience/case-study-scene-config";
import { useCaseStudyScene } from "@/components/case-study/experience/case-study-scene-context";
import { CaseStudySceneManager } from "@/components/case-study/experience/case-study-scene-manager";
import { PortfolioMotionProvider } from "@/components/providers/portfolio-motion-provider";

function SnapshotProbe() {
  const snapshot = useCaseStudyScene();
  return (
    <div
      data-testid="snapshot"
      data-scene={snapshot.activeSceneId}
      data-scene-progress={String(snapshot.sceneProgress)}
      data-section={snapshot.activeSectionId}
      data-article-progress={String(snapshot.articleProgress)}
    />
  );
}

describe("case-study scene resolution", () => {
  it("clamps progress and resolves scenes from the 0–100 timeline", () => {
    expect(clamp01(-1)).toBe(0);
    expect(clamp01(2)).toBe(1);
    expect(resolveActiveScene(AEGIS_SCENE_DEFINITIONS, 0).activeSceneId).toBe(
      "hero",
    );
    expect(
      resolveActiveScene(AEGIS_SCENE_DEFINITIONS, 0.45).activeSceneId,
    ).toBe("decisions");
    expect(resolveActiveScene(AEGIS_SCENE_DEFINITIONS, 1).activeSceneId).toBe(
      "closing",
    );
    expect(
      resolveActiveScene(AEGIS_SCENE_DEFINITIONS, 0.45).sceneProgress,
    ).toBeGreaterThan(0);
    expect(
      resolveActiveScene(AEGIS_SCENE_DEFINITIONS, 0.45).sceneProgress,
    ).toBeLessThan(1);
  });

  it("resolves semantic sections independently of scene ranges", () => {
    const scrollY = 700;
    const elements = new Map<string, HTMLElement>();
    AEGIS_SECTION_IDS.forEach((id, index) => {
      const el = document.createElement("section");
      el.id = id;
      Object.defineProperty(el, "offsetHeight", {
        value: 200,
        configurable: true,
      });
      // Document Y = index * 200; viewport top = documentY - scrollY.
      el.getBoundingClientRect = () =>
        ({
          top: index * 200 - scrollY,
          bottom: index * 200 + 200 - scrollY,
          left: 0,
          right: 0,
          width: 100,
          height: 200,
          x: 0,
          y: index * 200 - scrollY,
          toJSON: () => ({}),
        }) as DOMRect;
      elements.set(id, el);
    });

    const getElementById = vi
      .spyOn(document, "getElementById")
      .mockImplementation((id) => elements.get(id) ?? null);

    // decision-1 is the 5th section (index 4) at y=800; probe = scrollY + 160.
    const mid = resolveActiveSection(AEGIS_SECTION_IDS, scrollY, 800);
    expect(mid.activeSectionId).toBe("decision-1");
    expect(mid.sectionProgress).toBeGreaterThanOrEqual(0);
    expect(mid.sectionProgress).toBeLessThanOrEqual(1);

    const snapshot = computeSceneSnapshot(
      AEGIS_SCENE_DEFINITIONS,
      AEGIS_SECTION_IDS,
      0.5,
      scrollY,
      800,
    );
    expect(snapshot.activeSceneId).toBe("decisions");
    expect(snapshot.activeSectionId).toBe("decision-1");
    expect(snapshot.articleProgress).toBe(0.5);

    getElementById.mockRestore();
  });
});

describe("CaseStudySceneManager", () => {
  beforeEach(() => {
    scrollTriggerRefresh.mockClear();
    fakeLenisRef.current = {
      scroll: 0,
      limit: 1000,
      velocity: 0,
      direction: 0,
      progress: 0,
      raf: vi.fn(),
      stop: vi.fn(),
      start: vi.fn(),
      on: vi.fn(() => vi.fn()),
      off: vi.fn(),
      destroy: vi.fn(),
    };
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("exposes the snapshot API through the shell without changing copy", () => {
    render(
      <PortfolioMotionProvider>
        <CaseStudySceneManager
          scenes={AEGIS_SCENE_DEFINITIONS}
          sectionIds={AEGIS_SECTION_IDS}
        >
          <CaseStudyShell>
            <section id="top">Hero</section>
            <SnapshotProbe />
          </CaseStudyShell>
        </CaseStudySceneManager>
      </PortfolioMotionProvider>,
    );

    expect(screen.getByTestId("snapshot")).toHaveAttribute("data-scene", "hero");
    expect(screen.getByText("Hero")).toBeInTheDocument();
  });

  it("throws outside the manager", () => {
    expect(() => renderHook(() => useCaseStudyScene())).toThrow(
      /CaseStudySceneManager/,
    );
  });

  it("refreshes ScrollTrigger when the root Lenis instance appears", () => {
    fakeLenisRef.current = null;
    const { rerender } = render(
      <PortfolioMotionProvider>
        <CaseStudySceneManager
          scenes={AEGIS_SCENE_DEFINITIONS}
          sectionIds={AEGIS_SECTION_IDS}
        >
          <CaseStudyShell>
            <SnapshotProbe />
          </CaseStudyShell>
        </CaseStudySceneManager>
      </PortfolioMotionProvider>,
    );

    fakeLenisRef.current = {
      scroll: 0,
      limit: 1000,
      velocity: 0,
      direction: 0,
      progress: 0,
      raf: vi.fn(),
      stop: vi.fn(),
      start: vi.fn(),
      on: vi.fn(() => vi.fn()),
      off: vi.fn(),
      destroy: vi.fn(),
    };

    act(() => {
      rerender(
        <PortfolioMotionProvider>
          <CaseStudySceneManager
            scenes={AEGIS_SCENE_DEFINITIONS}
            sectionIds={AEGIS_SECTION_IDS}
          >
            <CaseStudyShell>
              <SnapshotProbe />
            </CaseStudyShell>
          </CaseStudySceneManager>
        </PortfolioMotionProvider>,
      );
    });

    expect(scrollTriggerRefresh).toHaveBeenCalled();
  });
});
