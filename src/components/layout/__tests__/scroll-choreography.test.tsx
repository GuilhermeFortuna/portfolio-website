import type { RefObject } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type {
  SceneTimelineContext,
  SceneTimelineFactory,
} from "@/components/motion/motion-runtime";
import { ScrollChoreography } from "@/components/layout/scroll-choreography";
import { act, render, screen } from "@/test/render";

const timelineRegistration = vi.hoisted(() => vi.fn());

vi.mock("@/components/motion/motion-runtime", () => ({
  useSceneTimeline: timelineRegistration,
}));

function registeredTimeline(): {
  scopeRef: RefObject<Element | null>;
  createTimeline: SceneTimelineFactory;
} {
  const [scopeRef, createTimeline] = timelineRegistration.mock.calls.at(-1) as [
    RefObject<Element | null>,
    SceneTimelineFactory,
    unknown[],
  ];
  return { scopeRef, createTimeline };
}

describe("ScrollChoreography", () => {
  beforeEach(() => {
    timelineRegistration.mockClear();
  });

  it("renders a settled, focusable semantic main before motion runs", () => {
    render(
      <ScrollChoreography>
        <section id="work">Readable work</section>
        <section id="contact">Readable contact</section>
      </ScrollChoreography>,
    );

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(main).toHaveTextContent("Readable work");
    expect(main).toHaveTextContent("Readable contact");
    expect(timelineRegistration).toHaveBeenCalledTimes(1);
  });

  it("refreshes after navigation/layout events and removes every listener", () => {
    const animationFrames: FrameRequestCallback[] = [];
    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn((callback: FrameRequestCallback) => {
        animationFrames.push(callback);
        return animationFrames.length;
      }),
    );
    vi.stubGlobal("cancelAnimationFrame", vi.fn());

    render(
      <ScrollChoreography>
        <section id="process">
          <div data-scene-intro />
          <div data-process-stage>
            <div data-process-line />
          </div>
        </section>
        <section id="contact">
          <div data-contact-horizon />
        </section>
      </ScrollChoreography>,
    );

    const { scopeRef, createTimeline } = registeredTimeline();
    expect(scopeRef.current).toBe(screen.getByRole("main"));

    const fromTo = vi.fn();
    const matchMediaRevert = vi.fn();
    const refresh = vi.fn();
    const update = vi.fn();
    const context = {
      gsap: {
        fromTo,
        matchMedia: () => ({
          add: (_query: string, create: () => void) => create(),
          revert: matchMediaRevert,
        }),
        utils: {
          toArray: <T extends Element>(selector: string, scope: Element) =>
            Array.from(scope.querySelectorAll<T>(selector)),
        },
      },
      ScrollTrigger: { refresh, update },
      prefersReducedMotion: false,
      scrollProgress: { get: () => 0 },
    } as unknown as SceneTimelineContext;

    const cleanup = createTimeline(context);
    expect(fromTo).toHaveBeenCalled();

    const flushRefresh = () => {
      const first = animationFrames.shift();
      first?.(0);
      const second = animationFrames.shift();
      second?.(0);
    };

    act(flushRefresh);
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledTimes(1);

    act(() => window.dispatchEvent(new HashChangeEvent("hashchange")));
    act(flushRefresh);
    expect(refresh).toHaveBeenCalledTimes(2);

    if (typeof cleanup !== "function") {
      throw new Error("The choreography timeline must provide cleanup.");
    }
    cleanup();
    expect(matchMediaRevert).toHaveBeenCalledTimes(1);

    act(() => window.dispatchEvent(new HashChangeEvent("hashchange")));
    act(flushRefresh);
    expect(refresh).toHaveBeenCalledTimes(2);
  });
});
