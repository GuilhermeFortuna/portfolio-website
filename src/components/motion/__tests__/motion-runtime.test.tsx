import {
  act,
  render,
  renderHook,
  waitFor,
} from "@testing-library/react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const runtime = vi.hoisted(() => {
  const scrollListeners = new Set<() => void>();
  const tickerListeners = new Set<(time: number) => void>();
  const lenis = {
    progress: 0,
    on: vi.fn((_event: "scroll", callback: () => void) => {
      scrollListeners.add(callback);
      return () => scrollListeners.delete(callback);
    }),
    raf: vi.fn(),
  };
  const context = { revert: vi.fn() };
  const gsap = {
    registerPlugin: vi.fn(),
    ticker: {
      add: vi.fn((callback: (time: number) => void) => tickerListeners.add(callback)),
      remove: vi.fn((callback: (time: number) => void) => tickerListeners.delete(callback)),
    },
    context: vi.fn((callback: () => void) => {
      callback();
      return context;
    }),
  };
  const ScrollTrigger = { update: vi.fn() };

  return { context, gsap, lenis, ScrollTrigger, scrollListeners, tickerListeners };
});

vi.mock("lenis/react", () => ({
  useLenis: () => runtime.lenis,
  ReactLenis: forwardRef(function ReactLenisMock(
    { children }: { children: React.ReactNode },
    ref,
  ) {
    useImperativeHandle(ref, () => ({ lenis: runtime.lenis }));
    return <>{children}</>;
  }),
}));

vi.mock("motion/react", () => ({
  MotionConfig: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useMotionValue: (initial: number) => {
    let value = initial;
    return {
      get: () => value,
      set: (next: number) => {
        value = next;
      },
    };
  },
}));

vi.mock("gsap", () => ({ gsap: runtime.gsap }));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: runtime.ScrollTrigger }));

import {
  MotionRuntime,
  useMotionRuntime,
  useSceneTimeline,
} from "@/components/motion/motion-runtime";

function wrapper({ children }: { children: React.ReactNode }) {
  return <MotionRuntime>{children}</MotionRuntime>;
}

describe("MotionRuntime", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", () => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  it("owns one Lenis subscription and GSAP ticker bridge, then removes both", async () => {
    const { result, unmount } = renderHook(() => useMotionRuntime(), { wrapper });

    await waitFor(() => expect(runtime.lenis.on).toHaveBeenCalledTimes(1));
    expect(runtime.gsap.ticker.add).toHaveBeenCalledTimes(1);

    act(() => {
      runtime.lenis.progress = 0.4;
      for (const listener of runtime.scrollListeners) listener();
    });
    expect(result.current.scrollProgress.get()).toBe(0.4);
    expect(runtime.ScrollTrigger.update).toHaveBeenCalled();

    act(() => {
      for (const listener of runtime.tickerListeners) listener(1.5);
    });
    expect(runtime.lenis.raf).toHaveBeenCalledWith(1500);

    unmount();
    expect(runtime.gsap.ticker.remove).toHaveBeenCalledTimes(1);
    expect(runtime.scrollListeners).toHaveLength(0);
  });

  it("scopes a scene timeline and reverts it with custom cleanup", async () => {
    const customCleanup = vi.fn();
    const createTimeline = vi.fn(() => customCleanup);

    function Scene() {
      const ref = useRef<HTMLElement>(null);
      useSceneTimeline(ref, createTimeline, []);
      return <section ref={ref} />;
    }

    const rendered = render(<Scene />, { wrapper });
    await waitFor(() => expect(createTimeline).toHaveBeenCalledTimes(1));
    expect(runtime.gsap.context).toHaveBeenCalledTimes(1);

    rendered.unmount();
    expect(customCleanup).toHaveBeenCalledTimes(1);
    expect(runtime.context.revert).toHaveBeenCalledTimes(1);
  });

  it("honors reduced motion and does not create a scene timeline", () => {
    vi.stubGlobal("matchMedia", () => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    const createTimeline = vi.fn();

    function Scene() {
      const ref = useRef<HTMLElement>(null);
      useSceneTimeline(ref, createTimeline, []);
      return <section ref={ref} />;
    }

    const { result } = renderHook(() => useMotionRuntime(), { wrapper });
    render(<Scene />, { wrapper });

    expect(result.current.prefersReducedMotion).toBe(true);
    expect(createTimeline).not.toHaveBeenCalled();
  });
});
