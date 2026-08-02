import { render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const timeline = {
  add: vi.fn(),
  progress: vi.fn(),
  data: { id: "test-root" },
  eventCallback: vi.fn(),
  to: vi.fn(() => ({})),
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

const resolveBoundary = vi.fn(
  (boundary: {
    type?: string;
    id?: string;
    sectionProgress?: number;
    viewportProgress?: number;
  }) => {
    if (boundary.type === "article") {
      return boundary.id === "end" ? 100 : 0;
    }
    const map: Record<string, number> = {
      context: 10,
      "decision-1": 40,
      "decision-3": 50,
      contribution: 60,
      technology: 80,
      "decision-4": 55,
    };
    const base = map[boundary.id ?? ""] ?? 20;
    return (
      base +
      (boundary.sectionProgress ?? 0) * 10 +
      (1 - (boundary.viewportProgress ?? 0.25)) * 2
    );
  },
);

vi.mock("gsap", () => {
  const timelineFactory = () => ({
    fromTo: vi.fn().mockReturnThis(),
    to: vi.fn().mockReturnThis(),
    progress: vi.fn(() => 0.5),
  });
  const api = {
    registerPlugin: vi.fn(),
    context: vi.fn((fn: () => void) => {
      fn();
      return { revert: vi.fn() };
    }),
    timeline: vi.fn(timelineFactory),
    set: vi.fn(),
    fromTo: vi.fn(() => ({})),
    to: vi.fn(() => ({})),
    utils: { selector: vi.fn(() => vi.fn()) },
    getById: vi.fn(),
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
    activeSectionId: "decision-3",
    sectionProgress: 0.1,
    articleProgress: 0.5,
    entranceComplete: true,
    layoutRevision: 1,
    refreshLayout: vi.fn(),
    resolveBoundary,
  }),
}));

import { gsap } from "gsap";
import {
  assertInspectKeyframe,
  CaseStudyEvidencePlane,
  DEFAULT_EVIDENCE_BEATS,
  variation3SampleBeat,
} from "../case-study-evidence-plane";
import {
  CaseStudyEvidenceStage,
  type EvidencePlaneDefinition,
} from "../case-study-evidence-stage";

const PLANES: readonly EvidencePlaneDefinition[] = [
  {
    id: "aegis-player-investigation",
    start: { type: "section", id: "decision-3", viewportProgress: 1 },
    end: {
      type: "section",
      id: "decision-3",
      sectionProgress: 0.55,
      viewportProgress: 0.2,
    },
    inspectStart: 0.28,
    inspectEnd: 0.72,
  },
  {
    id: "aegis-risk-constellation",
    start: {
      type: "section",
      id: "decision-3",
      sectionProgress: 0.5,
      viewportProgress: 0.2,
    },
    end: { type: "section", id: "contribution", viewportProgress: 1 },
    inspectStart: 0.28,
    inspectEnd: 0.72,
  },
];

function Host({
  omitSecond = false,
  onReady,
  onFailed,
}: {
  omitSecond?: boolean;
  onReady?: () => void;
  onFailed?: () => void;
}) {
  return (
    <article>
      <CaseStudyEvidenceStage
        planes={PLANES}
        onReady={onReady}
        onFailed={onFailed}
      >
        <div data-decision-media-stage="">
          <CaseStudyEvidencePlane id="aegis-player-investigation">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element -- test fixture */}
              <img
                src="/work/aegis/player-investigation.webp"
                alt="Player investigation"
                width={1600}
                height={900}
              />
            </figure>
          </CaseStudyEvidencePlane>
          {omitSecond ? null : (
            <CaseStudyEvidencePlane id="aegis-risk-constellation">
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element -- test fixture */}
                <img
                  src="/work/aegis/risk-constellation.webp"
                  alt="Risk constellation"
                  width={1600}
                  height={900}
                />
              </figure>
            </CaseStudyEvidencePlane>
          )}
        </div>
      </CaseStudyEvidenceStage>
    </article>
  );
}

describe("Variation 3 keyframe helpers", () => {
  it("keeps inspect frontal, sharp, and fully saturated", () => {
    const beat = variation3SampleBeat({
      rotateX: 72,
      zTravel: 420,
      yPercent: -36,
    });
    expect(() => assertInspectKeyframe(beat.inspect)).not.toThrow();
    expect(beat.enter.rotateX).toBeGreaterThan(0);
    expect(beat.exit.rotateX).toBeLessThan(0);
    expect(DEFAULT_EVIDENCE_BEATS.mobile.inspect.z).toBe(0);
  });
});

describe("CaseStudyEvidenceStage", () => {
  beforeEach(() => {
    getTimelineSpace.mockClear();
    timeline.add.mockClear();
    timeline.progress.mockClear();
    resolveBoundary.mockClear();
    vi.mocked(gsap.context).mockClear();
    vi.mocked(gsap.timeline).mockClear();
  });

  it("registers sequential Decision 3 planes on the D-006 timeline", async () => {
    const onReady = vi.fn();
    render(<Host onReady={onReady} />);

    await waitFor(() => {
      expect(onReady).toHaveBeenCalledTimes(1);
    });

    expect(getTimelineSpace).toHaveBeenCalled();
    expect(timeline.add).toHaveBeenCalled();
    expect(
      document.querySelector('[data-evidence-plane="aegis-player-investigation"]'),
    ).not.toBeNull();
    expect(
      document.querySelector('[data-evidence-plane="aegis-risk-constellation"]'),
    ).not.toBeNull();
    expect(document.querySelector("[data-evidence-stage]")).toHaveAttribute(
      "data-evidence-enhanced",
      "true",
    );

    const playerStart = resolveBoundary.mock.calls.find(
      (call) =>
        call[0]?.id === "decision-3" && call[0]?.viewportProgress === 1,
    );
    const riskStart = resolveBoundary.mock.calls.find(
      (call) =>
        call[0]?.id === "decision-3" && call[0]?.sectionProgress === 0.5,
    );
    expect(playerStart).toBeTruthy();
    expect(riskStart).toBeTruthy();
  });

  it("fails closed when a plane shell is missing", async () => {
    const onReady = vi.fn();
    const onFailed = vi.fn();
    render(<Host omitSecond onReady={onReady} onFailed={onFailed} />);

    await waitFor(() => {
      // Soft retry never succeeds; stage stays unenhanced without throwing.
      expect(
        document.querySelector("[data-evidence-stage]"),
      ).toHaveAttribute("data-evidence-enhanced", "false");
    });
    expect(onReady).not.toHaveBeenCalled();
  });

  it("does not introduce random geometry or playback drivers", () => {
    const stageSource = [
      "case-study-evidence-stage.tsx",
      "case-study-evidence-plane.tsx",
    ];
    for (const name of stageSource) {
      expect(name.includes("Math.random")).toBe(false);
    }
    expect(document.body.innerHTML.includes("autoplay")).toBe(false);
  });
});
