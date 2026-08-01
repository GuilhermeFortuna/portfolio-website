import { useRef, type ReactElement } from "react";
import { act, render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useEffectActivity } from "@/hooks/use-effect-activity";

type ObserverCallback = (
  entries: Array<Pick<IntersectionObserverEntry, "isIntersecting">>,
) => void;

function stubVisibility(initial: DocumentVisibilityState) {
  let visibilityState = initial;
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    get: () => visibilityState,
  });

  return {
    setVisibility(next: DocumentVisibilityState) {
      visibilityState = next;
      document.dispatchEvent(new Event("visibilitychange"));
    },
  };
}

function createIntersectionObserverDouble() {
  const observers: Array<{
    callback: ObserverCallback;
    observe: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
  }> = [];

  class IntersectionObserverDouble {
    observe: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
    unobserve = vi.fn();

    constructor(callback: ObserverCallback) {
      this.observe = vi.fn();
      this.disconnect = vi.fn();
      observers.push({
        callback,
        observe: this.observe,
        disconnect: this.disconnect,
      });
    }
  }

  vi.stubGlobal("IntersectionObserver", IntersectionObserverDouble);

  return {
    trigger(isIntersecting: boolean) {
      const latest = observers.at(-1);
      expect(latest).toBeDefined();
      latest!.callback([{ isIntersecting }]);
    },
    latest() {
      return observers.at(-1);
    },
  };
}

function ActivityProbe(): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const active = useEffectActivity(ref);

  return (
    <div>
      <div ref={ref} data-testid="observed" />
      <output data-testid="active">{String(active)}</output>
    </div>
  );
}

describe("useEffectActivity", () => {
  it("becomes active only while intersecting and document-visible", () => {
    const visibility = stubVisibility("visible");
    const intersection = createIntersectionObserverDouble();

    render(<ActivityProbe />);
    expect(screen.getByTestId("active")).toHaveTextContent("false");
    expect(intersection.latest()?.observe).toHaveBeenCalled();

    act(() => {
      intersection.trigger(true);
    });
    expect(screen.getByTestId("active")).toHaveTextContent("true");

    act(() => {
      visibility.setVisibility("hidden");
    });
    expect(screen.getByTestId("active")).toHaveTextContent("false");

    act(() => {
      visibility.setVisibility("visible");
    });
    expect(screen.getByTestId("active")).toHaveTextContent("true");

    act(() => {
      intersection.trigger(false);
    });
    expect(screen.getByTestId("active")).toHaveTextContent("false");
  });

  it("disconnects the IntersectionObserver on unmount", () => {
    stubVisibility("visible");
    const intersection = createIntersectionObserverDouble();

    const { unmount } = render(<ActivityProbe />);
    expect(intersection.latest()?.observe).toHaveBeenCalled();

    unmount();
    expect(intersection.latest()?.disconnect).toHaveBeenCalledTimes(1);
  });

  it("skips observing when the ref has no element", () => {
    stubVisibility("visible");
    const intersection = createIntersectionObserverDouble();

    const { result } = renderHook(() =>
      useEffectActivity({ current: null }),
    );

    expect(result.current).toBe(false);
    expect(intersection.latest()).toBeUndefined();
  });
});
