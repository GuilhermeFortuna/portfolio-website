import { beforeEach, describe, expect, it, vi } from "vitest";

import { AmbientRays, createAmbientRays } from "@/components/effects/ambient-rays";
import { render } from "@/test/render";

let reduceMotion = false;

vi.mock("motion/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("motion/react")>()),
  useReducedMotion: () => reduceMotion,
}));

describe("AmbientRays", () => {
  beforeEach(() => {
    reduceMotion = false;
  });

  it("is decorative and renders the requested number of rays", () => {
    const { container } = render(<AmbientRays count={5} />);
    const root = container.querySelector("[data-ambient-rays]");

    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root).toHaveAttribute("data-motion", "animated");
    expect(container.querySelectorAll("[data-ambient-ray]")).toHaveLength(5);
  });

  it("lays rays out deterministically from the seed", () => {
    expect(createAmbientRays(6, 18, 7)).toEqual(createAmbientRays(6, 18, 7));
    expect(createAmbientRays(6, 18, 7)).not.toEqual(createAmbientRays(6, 18, 8));
    expect(createAmbientRays(0, 18, 7)).toEqual([]);
  });

  it("renders a static field under reduced motion", () => {
    reduceMotion = true;
    const { container } = render(<AmbientRays count={3} />);

    expect(container.querySelector("[data-ambient-rays]")).toHaveAttribute(
      "data-motion",
      "static",
    );
    for (const ray of container.querySelectorAll<HTMLElement>("[data-ambient-ray]")) {
      expect(Number(ray.style.opacity)).toBeGreaterThan(0);
    }
  });
});
