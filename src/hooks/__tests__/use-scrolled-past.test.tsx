import { describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useScrolledPast } from "@/hooks/use-scrolled-past";

vi.mock("lenis/react", () => ({
  useLenis: () => undefined,
}));

describe("useScrolledPast", () => {
  it("reports false at the top and true past the threshold", () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 0,
    });

    const { result } = renderHook(() => useScrolledPast(72));
    expect(result.current).toBe(false);

    act(() => {
      Object.defineProperty(window, "scrollY", {
        configurable: true,
        value: 100,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(true);
  });
});
