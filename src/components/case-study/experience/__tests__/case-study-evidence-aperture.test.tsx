import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const timeline = {
  add: vi.fn(),
  progress: vi.fn(),
  data: { id: "test-root" },
  eventCallback: vi.fn(),
  to: vi.fn(),
  addLabel: vi.fn(),
  removeLabel: vi.fn(),
  revert: vi.fn(),
};

const getTimelineSpace = vi.fn(({ start, end }: { start: number; end: number }) => ({
  duration: end - start,
  position: start,
  cleanup: vi.fn(),
}));

const { flipFit, flipGetState } = vi.hoisted(() => ({
  flipFit: vi.fn(() => ({ kill: vi.fn() })),
  flipGetState: vi.fn(() => ({ id: "flip-state" })),
}));

const sceneRanges = [
  { id: "hero" as const, start: 0, end: 10 },
  { id: "context" as const, start: 10, end: 20 },
  { id: "problem" as const, start: 20, end: 30 },
];

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
    ticker: { add: vi.fn(), remove: vi.fn() },
  };
  return { gsap: api, default: api };
});

vi.mock("gsap/Flip", () => ({
  Flip: {
    getState: flipGetState,
    fit: flipFit,
  },
}));

vi.mock("../bsmnt", () => ({
  useScrollytelling: () => ({ timeline, rootRef: { current: null }, events: {} }),
  useDispatcher: () => ({
    getTimelineSpace,
    scopedQuerySelector: undefined,
  }),
}));

vi.mock("../case-study-scene-context", () => ({
  useCaseStudyScene: () => ({
    activeSceneId: "context",
    sceneProgress: 0.2,
    activeSectionId: "context",
    sectionProgress: 0.2,
    articleProgress: 0.12,
    entranceComplete: true,
    sceneRanges,
    layoutRevision: 1,
  }),
}));

import {
  ApertureSlot,
  CaseStudyEvidenceAperture,
  type ApertureWaypoint,
} from "../case-study-evidence-aperture";
import type { CaseStudySceneDefinition } from "../case-study-scene-config";

const scenes: readonly CaseStudySceneDefinition[] = [
  {
    id: "hero",
    start: { type: "article", edge: "start" },
    end: { type: "section", id: "context" },
  },
  {
    id: "context",
    start: { type: "section", id: "context" },
    end: { type: "section", id: "problem" },
  },
  {
    id: "problem",
    start: { type: "section", id: "problem" },
    end: { type: "article", edge: "end" },
  },
];

const waypoints: readonly ApertureWaypoint[] = [
  {
    sceneId: "context",
    slotId: "slot-context",
    aspectRatio: "16 / 9",
    mediaKey: "overview",
    fit: "contain",
    alignment: "center",
  },
  {
    sceneId: "problem",
    slotId: "slot-problem",
    aspectRatio: "4 / 3",
    mediaKey: "overview",
    fit: "contain",
    alignment: "end",
  },
];

const mediaByKey = {
  overview: {
    src: "/work/aegis/overview.webp",
    alt: "Overview on synthetic data",
    width: 1600,
    height: 900,
  },
};

function Host({
  onReady,
  onFailed,
  omitSlots = false,
}: {
  onReady?: () => void;
  onFailed?: () => void;
  omitSlots?: boolean;
}) {
  return (
    <div>
      {omitSlots ? null : (
        <>
          <ApertureSlot
            slotId="slot-context"
            aspectRatio="16 / 9"
            alignment="center"
          />
          <ApertureSlot
            slotId="slot-problem"
            aspectRatio="4 / 3"
            alignment="end"
          />
        </>
      )}
      <CaseStudyEvidenceAperture
        waypoints={waypoints}
        scenes={scenes}
        mediaByKey={mediaByKey}
        onReady={onReady}
        onFailed={onFailed}
      />
    </div>
  );
}

describe("CaseStudyEvidenceAperture", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    flipFit.mockImplementation(() => ({ kill: vi.fn() }));
    getTimelineSpace.mockImplementation(
      ({ start, end }: { start: number; end: number }) => ({
        duration: end - start,
        position: start,
        cleanup: vi.fn(),
      }),
    );
  });

  it("registers consecutive Flip.fit tweens on the D-006 root timeline", async () => {
    const onReady = vi.fn();
    render(<Host onReady={onReady} />);

    await waitFor(() => {
      expect(flipGetState).toHaveBeenCalledTimes(2);
      expect(flipFit).toHaveBeenCalledTimes(2);
      expect(timeline.add).toHaveBeenCalledTimes(1);
      expect(onReady).toHaveBeenCalledTimes(1);
    });

    expect(getTimelineSpace).toHaveBeenCalledWith({ start: 16, end: 20 });
    expect(timeline.progress).toHaveBeenCalledWith(0.12);
    expect(screen.getByAltText("Overview on synthetic data")).toBeInTheDocument();
    expect(document.querySelector("[data-aperture-enabled='true']")).not.toBeNull();
  });

  it("leaves normal flow when waypoint slots are missing", async () => {
    const onFailed = vi.fn();
    const onReady = vi.fn();
    render(<Host omitSlots onReady={onReady} onFailed={onFailed} />);

    await waitFor(() => {
      expect(onFailed).toHaveBeenCalled();
    });
    expect(onReady).not.toHaveBeenCalled();
    expect(flipFit).not.toHaveBeenCalled();
    expect(document.querySelector("[data-aperture-enabled='true']")).toBeNull();
  });

  it("renders authored slot geometry targets for Flip measurement", () => {
    render(
      <ApertureSlot
        slotId="slot-context"
        aspectRatio="16 / 9"
        alignment="center"
      />,
    );
    const slot = document.querySelector('[data-aperture-slot="slot-context"]');
    expect(slot).not.toBeNull();
    expect(slot).toHaveAttribute("aria-hidden", "true");
  });
});
