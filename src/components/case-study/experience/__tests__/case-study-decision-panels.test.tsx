import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const timeline = {
  add: vi.fn(),
  progress: vi.fn(),
  data: { id: "test-root" },
  eventCallback: vi.fn(),
  to: vi.fn(),
  fromTo: vi.fn(() => ({})),
  addLabel: vi.fn(),
  removeLabel: vi.fn(),
  revert: vi.fn(),
};

const getTimelineSpace = vi.fn(
  ({ start, end }: { start: number; end: number }) => ({
    duration: end - start,
    position: start,
    cleanup: vi.fn(),
  }),
);

vi.mock("gsap", () => {
  const api = {
    registerPlugin: vi.fn(),
    context: vi.fn((fn: () => void) => {
      fn();
      return { revert: vi.fn() };
    }),
    timeline: vi.fn(() => timeline),
    utils: { selector: vi.fn(() => vi.fn()) },
    getById: vi.fn(),
    set: vi.fn(),
    fromTo: vi.fn(() => ({})),
    ticker: { add: vi.fn(), remove: vi.fn() },
  };
  return { gsap: api, default: api };
});

vi.mock("../bsmnt", () => ({
  useScrollytelling: () => ({
    timeline,
    rootRef: { current: null },
    events: {},
  }),
  useDispatcher: () => ({
    getTimelineSpace,
    scopedQuerySelector: undefined,
  }),
}));

vi.mock("../case-study-scene-context", () => ({
  useCaseStudyScene: () => ({
    activeSceneId: "decisions",
    sceneProgress: 0.25,
    activeSectionId: "decision-1",
    sectionProgress: 0.1,
    articleProgress: 0.42,
    entranceComplete: true,
  }),
}));

import { CaseStudyDecisionPanel } from "../case-study-decision-panel";
import { CaseStudyDecisionPanels } from "../case-study-decision-panels";

function Host({
  omitPanels = false,
}: {
  omitPanels?: boolean;
}) {
  return (
    <CaseStudyDecisionPanels>
      {omitPanels ? null : (
        <>
          <CaseStudyDecisionPanel index={0} composition="declaration">
            <section id="decision-1" aria-labelledby="decision-1-heading">
              <h2 id="decision-1-heading">Decision 1</h2>
              <p>Standalone product reasoning.</p>
            </section>
          </CaseStudyDecisionPanel>
          <CaseStudyDecisionPanel index={1} composition="contrast">
            <section id="decision-2" aria-labelledby="decision-2-heading">
              <h2 id="decision-2-heading">Decision 2</h2>
              <p>Curated store versus lakehouse.</p>
            </section>
          </CaseStudyDecisionPanel>
          <CaseStudyDecisionPanel index={2} composition="evidenceStage">
            <section id="decision-3" aria-labelledby="decision-3-heading">
              <h2 id="decision-3-heading">Decision 3</h2>
              <div data-decision-media-stage="">
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element -- test fixture */}
                  <img
                    src="/work/aegis/player-investigation.webp"
                    alt="Player investigation"
                  />
                </figure>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element -- test fixture */}
                  <img
                    src="/work/aegis/risk-constellation.webp"
                    alt="Risk constellation"
                  />
                </figure>
              </div>
            </section>
          </CaseStudyDecisionPanel>
          <CaseStudyDecisionPanel index={3} composition="identityVideo">
            <section id="decision-4" aria-labelledby="decision-4-heading">
              <h2 id="decision-4-heading">Decision 4</h2>
              <video
                controls
                muted
                playsInline
                preload="metadata"
                poster="/work/aegis/entry-intro-poster.webp"
                src="/work/aegis/entry-intro.mp4"
              />
            </section>
          </CaseStudyDecisionPanel>
        </>
      )}
    </CaseStudyDecisionPanels>
  );
}

describe("CaseStudyDecisionPanels", () => {
  beforeEach(() => {
    timeline.add.mockClear();
    timeline.progress.mockClear();
    getTimelineSpace.mockClear();
  });

  it("renders four semantic decision sections with distinct compositions", async () => {
    render(<Host />);

    expect(document.querySelector("[data-decision-panels]")).not.toBeNull();
    expect(
      document.querySelectorAll("[data-decision-panel]"),
    ).toHaveLength(4);
    expect(
      document.querySelector('[data-decision-composition="declaration"]'),
    ).not.toBeNull();
    expect(
      document.querySelector('[data-decision-composition="contrast"]'),
    ).not.toBeNull();
    expect(
      document.querySelector('[data-decision-composition="evidenceStage"]'),
    ).not.toBeNull();
    expect(
      document.querySelector('[data-decision-composition="identityVideo"]'),
    ).not.toBeNull();

    expect(screen.getByRole("heading", { name: "Decision 1" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Decision 4" })).toBeTruthy();
    expect(document.querySelector("[data-decision-media-stage]")).not.toBeNull();

    await waitFor(() => {
      expect(
        document.querySelector("[data-decision-panels]"),
      ).toHaveAttribute("data-decision-enhanced", "true");
    });
  });

  it("exposes aria-hidden decorative numerals from the panel index", () => {
    render(<Host />);
    const numerals = Array.from(
      document.querySelectorAll("[data-decision-panel] [aria-hidden='true']"),
    ).map((node) => node.textContent);
    expect(numerals).toEqual(["01", "02", "03", "04"]);
  });

  it("preserves native video controls without autoplay or loop", () => {
    render(<Host />);
    const video = document.querySelector("video");
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video).not.toHaveAttribute("autoplay");
    expect(video).not.toHaveAttribute("loop");
  });

  it("registers rotation tweens on the D-006 timeline for incoming panels", async () => {
    render(<Host />);

    await waitFor(() => {
      expect(getTimelineSpace).toHaveBeenCalled();
      expect(timeline.add).toHaveBeenCalled();
    });

    // First panel is settled; three incoming panels take timeline space.
    expect(getTimelineSpace.mock.calls.length).toBeGreaterThanOrEqual(3);
  });

  it("does not ship forbidden scroll ownership APIs", async () => {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const files = [
      "src/components/case-study/experience/case-study-decision-panels.tsx",
      "src/components/case-study/experience/case-study-decision-panel.tsx",
    ];

    for (const relative of files) {
      const source = await fs.readFile(
        path.join(process.cwd(), relative),
        "utf8",
      );
      expect(source).not.toMatch(/new Lenis/);
      expect(source).not.toMatch(/useScroll\(/);
      expect(source).not.toMatch(/Observer\.create/);
      expect(source).not.toMatch(/requestAnimationFrame/);
      expect(source).not.toMatch(/scroll-snap/);
      expect(source).not.toMatch(/prefers-reduced-motion/);
    }
  });
});
