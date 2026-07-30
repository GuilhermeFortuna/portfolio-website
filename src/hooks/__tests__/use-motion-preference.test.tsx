import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useMotionPreference } from "@/hooks/use-motion-preference";

type ChangeListener = () => void;

function createMatchMediaDouble(initialMatches: boolean) {
  const listeners = new Set<ChangeListener>();
  let matches = initialMatches;

  const mediaQueryList = {
    get matches() {
      return matches;
    },
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn((event: string, listener: ChangeListener) => {
      if (event === "change") {
        listeners.add(listener);
      }
    }),
    removeEventListener: vi.fn((event: string, listener: ChangeListener) => {
      if (event === "change") {
        listeners.delete(listener);
      }
    }),
    dispatchEvent: vi.fn(),
  };

  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => mediaQueryList),
  );

  return {
    listeners,
    mediaQueryList,
    setMatches(next: boolean) {
      matches = next;
      for (const listener of listeners) {
        listener();
      }
    },
  };
}

describe("useMotionPreference", () => {
  it("reports the initial prefers-reduced-motion media-query state", () => {
    createMatchMediaDouble(true);

    const { result } = renderHook(() => useMotionPreference());

    expect(result.current).toBe(true);
  });

  it("updates when the preference changes and removes its listener on unmount", () => {
    const media = createMatchMediaDouble(false);
    const { result, unmount } = renderHook(() => useMotionPreference());

    expect(result.current).toBe(false);
    expect(media.listeners.size).toBe(1);

    act(() => {
      media.setMatches(true);
    });
    expect(result.current).toBe(true);

    unmount();
    expect(media.listeners.size).toBe(0);
    expect(media.mediaQueryList.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });
});
