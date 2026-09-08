import { act, render, screen } from "@/test/render";
import { motionValue } from "motion/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  ResumeChapter,
  ResumeSceneRuntime,
  useResumeSceneRuntime,
} from "@/components/resume/resume-scene-runtime";

const sharedProgress = motionValue(0);
const observe = vi.fn();
const disconnect = vi.fn();
let observerCallback: IntersectionObserverCallback | undefined;

vi.mock("@/components/motion/motion-runtime", () => ({
  useMotionRuntime: () => ({
    scrollProgress: sharedProgress,
    prefersReducedMotion: false,
  }),
}));

class IntersectionObserverFake {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }

  observe = observe;
  unobserve = vi.fn();
  disconnect = disconnect;
}

function RuntimeProbe() {
  const runtime = useResumeSceneRuntime();
  return (
    <output data-testid="runtime-probe">
      {runtime.activeChapter}:{runtime.progress.toFixed(2)}:{runtime.mode}
    </output>
  );
}

describe("ResumeSceneRuntime", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    observerCallback = undefined;
    sharedProgress.set(0);
    vi.stubGlobal("IntersectionObserver", IntersectionObserverFake);
  });

  it("publishes six stable chapters in semantic order and registers each anchor once", () => {
    const chapters = [
      { id: "identity", label: "Identity" },
      { id: "capabilities", label: "Capabilities" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "credentials", label: "Credentials" },
      { id: "contact", label: "Contact" },
    ] as const;

    render(
      <ResumeSceneRuntime chapters={chapters}>
        <RuntimeProbe />
        {chapters.map((chapter) => (
          <ResumeChapter key={chapter.id} {...chapter}>
            <h2>{chapter.label}</h2>
          </ResumeChapter>
        ))}
      </ResumeSceneRuntime>,
    );

    expect(screen.getByTestId("runtime-probe")).toHaveTextContent(
      "identity:0.00:enhanced",
    );
    expect(screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent)).toEqual(
      chapters.map((chapter) => chapter.label),
    );
    expect(Array.from(document.querySelectorAll<HTMLElement>("[data-resume-chapter]"), (chapter) => chapter.id)).toEqual(
      chapters.map((chapter) => `resume-chapter-${chapter.id}`),
    );
    expect(observe).toHaveBeenCalledTimes(chapters.length);
  });

  it("maps shared progress and intersection state without owning scroll events", () => {
    const chapters = [
      { id: "identity", label: "Identity" },
      { id: "capabilities", label: "Capabilities" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "credentials", label: "Credentials" },
      { id: "contact", label: "Contact" },
    ] as const;

    render(
      <ResumeSceneRuntime chapters={chapters}>
        <RuntimeProbe />
        {chapters.map((chapter) => (
          <ResumeChapter key={chapter.id} {...chapter}>
            {chapter.label}
          </ResumeChapter>
        ))}
      </ResumeSceneRuntime>,
    );

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-resume-chapter]"));
    act(() => {
      sharedProgress.set(0.64);
      observerCallback?.([
        { target: sections[2], isIntersecting: true, intersectionRatio: 0.8 },
      ] as unknown as IntersectionObserverEntry[], {} as IntersectionObserver);
    });

    expect(screen.getByTestId("runtime-probe")).toHaveTextContent(
      "experience:0.64:enhanced",
    );
    expect(screen.queryByText("scroll")).not.toBeInTheDocument();
  });

  it("disconnects its scoped observer on unmount", () => {
    const { unmount } = render(
      <ResumeSceneRuntime
        chapters={[{ id: "identity", label: "Identity" }]}
      >
        <ResumeChapter id="identity" label="Identity">
          Identity
        </ResumeChapter>
      </ResumeSceneRuntime>,
    );

    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
  });
});
