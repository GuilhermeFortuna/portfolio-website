import { act, render } from "@/test/render";
import { motionValue } from "motion/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  ResumeBackdrop,
  resolveAmbientOpacity,
} from "@/components/resume/resume-backdrop";
import { ResumeSceneRuntime } from "@/components/resume/resume-scene-runtime";

const progress = motionValue(0);

vi.mock("@/components/motion/motion-runtime", () => ({
  useMotionRuntime: () => ({
    scrollProgress: progress,
    prefersReducedMotion: false,
  }),
}));

vi.mock("@/components/webgl/managed-webgl-effect", () => ({
  ManagedWebGLEffect: ({ fallback }: { fallback: ReactNode }) => (
    <div data-testid="webgl-fallback">{fallback}</div>
  ),
}));

function renderBackdrop() {
  return render(
    <ResumeSceneRuntime chapters={[{ id: "identity", label: "Identity" }]}>
      <ResumeBackdrop />
    </ResumeSceneRuntime>,
  );
}

describe("ResumeBackdrop", () => {
  beforeEach(() => {
    progress.set(0);
    vi.stubGlobal("matchMedia", () => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  it("is decorative and shows the static rays when WebGL is withheld", () => {
    const { container } = renderBackdrop();

    expect(container.querySelector("[data-resume-backdrop]")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(container.querySelector("[data-light-rays-fallback]")).not.toBeNull();
    expect(container.querySelector("[data-ambient-rays]")).not.toBeNull();
    expect(container.querySelector("[data-ambient-rays]")).toHaveAttribute(
      "data-motion",
      "static",
    );
  });

  it("renders animated ambient rays when in enhanced mode", async () => {
    vi.stubGlobal("matchMedia", () => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    const { container } = renderBackdrop();
    await act(async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });
    expect(container.querySelector("[data-ambient-rays]")).toHaveAttribute(
      "data-motion",
      "animated",
    );
  });

  it("hands off from the hero rays to the ambient field as the page scrolls", () => {
    const { container } = renderBackdrop();
    const ambient = container.querySelector<HTMLElement>(
      "[data-resume-backdrop-ambient]",
    );

    expect(ambient?.style.opacity).toBe("0");

    act(() => progress.set(0.4));
    expect(Number(ambient?.style.opacity)).toBeCloseTo(0.8);
  });

  it("clamps the ambient opacity curve", () => {
    expect(resolveAmbientOpacity(0)).toBe(0);
    expect(resolveAmbientOpacity(0.1)).toBeCloseTo(0.4);
    expect(resolveAmbientOpacity(1)).toBeCloseTo(0.8);
  });
});
