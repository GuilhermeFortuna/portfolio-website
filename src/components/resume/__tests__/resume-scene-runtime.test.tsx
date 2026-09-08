import { act, render, screen } from "@/test/render";
import { motionValue } from "motion/react";
import { hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  ResumeChapter,
  ResumeReadingTrace,
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

  it("publishes five stable chapters in semantic order and registers each anchor once", async () => {
    const chapters = [
      { id: "identity", label: "Identity" },
      { id: "capabilities", label: "Capabilities" },
      { id: "experience", label: "Experience" },
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

    await act(async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

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

  it("keeps the server and first client render in the same static mode", async () => {
    const browserWindow = window;
    const chapters = [{ id: "identity", label: "Identity" }] as const;
    vi.stubGlobal("window", undefined);
    const markup = renderToString(
      <ResumeSceneRuntime chapters={chapters}>
        <RuntimeProbe />
        <ResumeReadingTrace />
      </ResumeSceneRuntime>,
    );
    vi.stubGlobal("window", browserWindow);

    expect(markup.replaceAll("<!-- -->", "")).toContain("identity:0.00:static");
    expect(markup).toContain("resume-reading-trace--static");

    const host = document.createElement("div");
    host.innerHTML = markup;
    document.body.append(host);
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    let root: Root | undefined;

    await act(async () => {
      root = hydrateRoot(
        host,
        <ResumeSceneRuntime chapters={chapters}>
          <RuntimeProbe />
          <ResumeReadingTrace />
        </ResumeSceneRuntime>,
      );
      await new Promise((resolve) => window.setTimeout(resolve, 10));
    });

    const reportedHydrationMismatch = consoleError.mock.calls.some((call) =>
      call.some((value) => String(value).includes("hydrated")),
    );
    await act(async () => root?.unmount());
    host.remove();
    consoleError.mockRestore();
    expect(reportedHydrationMismatch).toBe(false);
  });

  it("maps shared progress and intersection state without owning scroll events", async () => {
    const chapters = [
      { id: "identity", label: "Identity" },
      { id: "capabilities", label: "Capabilities" },
      { id: "experience", label: "Experience" },
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

    await act(async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

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
