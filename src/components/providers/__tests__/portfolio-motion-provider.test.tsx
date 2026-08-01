import { act, render, renderHook, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const {
  tickerCallbacks,
  scrollTriggerUpdate,
  scrollTriggerRefresh,
  gsapTickerAdd,
  gsapTickerRemove,
  fakeLenisRef,
} = vi.hoisted(() => {
  const tickerCallbacks = new Set<(time: number) => void>();
  return {
    tickerCallbacks,
    scrollTriggerUpdate: vi.fn(),
    scrollTriggerRefresh: vi.fn(),
    gsapTickerAdd: vi.fn((callback: (time: number) => void) => {
      tickerCallbacks.add(callback);
    }),
    gsapTickerRemove: vi.fn((callback: (time: number) => void) => {
      tickerCallbacks.delete(callback);
    }),
    fakeLenisRef: {
      current: null as null | {
        scroll: number;
        limit: number;
        velocity: number;
        direction: 1 | -1 | 0;
        progress: number;
        raf: ReturnType<typeof vi.fn>;
        stop: ReturnType<typeof vi.fn>;
        start: ReturnType<typeof vi.fn>;
        on: ReturnType<typeof vi.fn>;
        off: ReturnType<typeof vi.fn>;
        destroy: ReturnType<typeof vi.fn>;
        emitScroll: () => void;
      },
    },
  };
});

vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    ticker: {
      add: gsapTickerAdd,
      remove: gsapTickerRemove,
    },
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    update: scrollTriggerUpdate,
    refresh: scrollTriggerRefresh,
  },
}));

vi.mock("motion/react", () => ({
  MotionConfig: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

type FakeLenis = {
  scroll: number;
  limit: number;
  velocity: number;
  direction: 1 | -1 | 0;
  progress: number;
  raf: ReturnType<typeof vi.fn>;
  stop: ReturnType<typeof vi.fn>;
  start: ReturnType<typeof vi.fn>;
  on: ReturnType<typeof vi.fn>;
  off: ReturnType<typeof vi.fn>;
  destroy: ReturnType<typeof vi.fn>;
  emitScroll: () => void;
};

vi.mock("lenis/react", () => ({
  ReactLenis: ({
    children,
    options,
  }: {
    children: ReactNode;
    options?: { autoRaf?: boolean };
  }) => {
    expect(options?.autoRaf).toBe(false);
    return <div data-testid="react-lenis">{children}</div>;
  },
  useLenis: () => fakeLenisRef.current,
}));

import {
  usePortfolioLenis,
  usePortfolioScrollSnapshot,
} from "@/components/providers/portfolio-motion-context";
import { PortfolioMotionProvider } from "@/components/providers/portfolio-motion-provider";

function createFakeLenis(): FakeLenis {
  let scrollCallback: ((lenis: FakeLenis) => void) | null = null;

  const lenis: FakeLenis = {
    scroll: 120,
    limit: 1000,
    velocity: 0.4,
    direction: 1,
    progress: 0.12,
    raf: vi.fn(),
    stop: vi.fn(),
    start: vi.fn(),
    on: vi.fn((event: string, callback: (lenis: FakeLenis) => void) => {
      expect(event).toBe("scroll");
      scrollCallback = callback;
      return () => {
        if (scrollCallback === callback) {
          scrollCallback = null;
        }
      };
    }),
    off: vi.fn(),
    destroy: vi.fn(),
    emitScroll() {
      scrollCallback?.(lenis);
    },
  };

  return lenis;
}

function ProviderProbe() {
  const lenis = usePortfolioLenis();
  const snapshot = usePortfolioScrollSnapshot();

  return (
    <div>
      <output data-testid="has-lenis">{String(Boolean(lenis))}</output>
      <output data-testid="scroll">{String(snapshot.scroll)}</output>
      <output data-testid="progress">{String(snapshot.progress)}</output>
    </div>
  );
}

describe("PortfolioMotionProvider", () => {
  beforeEach(() => {
    tickerCallbacks.clear();
    gsapTickerAdd.mockClear();
    gsapTickerRemove.mockClear();
    scrollTriggerUpdate.mockClear();
    scrollTriggerRefresh.mockClear();
    fakeLenisRef.current = createFakeLenis();
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "visible",
    });
  });

  afterEach(() => {
    fakeLenisRef.current = null;
  });

  it("exposes one Lenis instance and a shared scroll snapshot", () => {
    render(
      <PortfolioMotionProvider>
        <ProviderProbe />
      </PortfolioMotionProvider>,
    );

    expect(screen.getByTestId("react-lenis")).toBeInTheDocument();
    expect(screen.getByTestId("has-lenis")).toHaveTextContent("true");
    expect(screen.getByTestId("scroll")).toHaveTextContent("120");
    expect(screen.getByTestId("progress")).toHaveTextContent("0.12");
    expect(gsapTickerAdd).toHaveBeenCalledTimes(1);
    expect(fakeLenisRef.current?.on).toHaveBeenCalledTimes(1);

    act(() => {
      const lenis = fakeLenisRef.current!;
      lenis.scroll = 240;
      lenis.progress = 0.24;
      lenis.emitScroll();
    });

    expect(screen.getByTestId("scroll")).toHaveTextContent("240");
    expect(screen.getByTestId("progress")).toHaveTextContent("0.24");
    expect(scrollTriggerUpdate).toHaveBeenCalled();
  });

  it("drives Lenis from the GSAP ticker and cleans up both callbacks", () => {
    const { unmount } = render(
      <PortfolioMotionProvider>
        <ProviderProbe />
      </PortfolioMotionProvider>,
    );

    expect(tickerCallbacks.size).toBe(1);
    const [onTick] = tickerCallbacks;
    act(() => {
      onTick?.(1.5);
    });
    expect(fakeLenisRef.current?.raf).toHaveBeenCalledWith(1500);

    unmount();
    expect(gsapTickerRemove).toHaveBeenCalledTimes(1);
    expect(tickerCallbacks.size).toBe(0);
  });

  it("stops Lenis while hidden and restarts with a ScrollTrigger refresh", () => {
    let visibilityState: DocumentVisibilityState = "visible";
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => visibilityState,
    });

    render(
      <PortfolioMotionProvider>
        <ProviderProbe />
      </PortfolioMotionProvider>,
    );

    act(() => {
      visibilityState = "hidden";
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(fakeLenisRef.current?.stop).toHaveBeenCalledTimes(1);

    act(() => {
      visibilityState = "visible";
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(fakeLenisRef.current?.start).toHaveBeenCalledTimes(1);
    expect(scrollTriggerRefresh).toHaveBeenCalledTimes(1);
  });

  it("throws when portfolio motion hooks are used outside the provider", () => {
    expect(() => renderHook(() => usePortfolioLenis())).toThrow(
      /PortfolioMotionProvider/,
    );
  });
});
