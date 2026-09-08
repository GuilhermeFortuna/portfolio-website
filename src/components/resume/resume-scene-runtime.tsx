"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefCallback,
} from "react";
import { useMotionValueEvent } from "motion/react";

import { useMotionRuntime } from "@/components/motion/motion-runtime";

export type ResumeChapterId =
  | "identity"
  | "capabilities"
  | "experience"
  | "projects"
  | "credentials"
  | "contact";

export type ResumeMotionMode = "enhanced" | "reduced" | "static";

export type ResumeChapter = {
  id: ResumeChapterId;
  label: string;
};

export type ResumeSceneRuntimeProps = {
  chapters: readonly ResumeChapter[];
  children: ReactNode;
};

export type ResumeSceneContextValue = {
  chapters: readonly ResumeChapter[];
  activeChapter: ResumeChapterId;
  progress: number;
  mode: ResumeMotionMode;
  prefersReducedMotion: boolean;
  registerChapter: (id: ResumeChapterId, element: HTMLElement | null) => void;
};

const ResumeSceneContext = createContext<ResumeSceneContextValue | null>(null);

function clampProgress(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function getMotionMode(prefersReducedMotion: boolean): ResumeMotionMode {
  if (prefersReducedMotion) {
    return "reduced";
  }
  if (typeof window === "undefined") {
    return "static";
  }

  const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches;
  const narrowViewport = window.innerWidth < 768 || window.innerHeight < 600;
  return coarsePointer || narrowViewport ? "static" : "enhanced";
}

function getClientMotionMode(prefersReducedMotion: boolean): ResumeMotionMode {
  if (prefersReducedMotion || typeof window === "undefined") {
    return prefersReducedMotion ? "reduced" : "static";
  }
  return "enhanced";
}

export function ResumeSceneRuntime({
  chapters,
  children,
}: ResumeSceneRuntimeProps): ReactNode {
  const { scrollProgress, prefersReducedMotion } = useMotionRuntime();
  const chapterElements = useRef(new Map<ResumeChapterId, HTMLElement>());
  const [activeChapter, setActiveChapter] = useState<ResumeChapterId>(
    chapters[0]?.id ?? "identity",
  );
  const [progress, setProgress] = useState(() =>
    clampProgress(scrollProgress.get()),
  );
  const [mode, setMode] = useState<ResumeMotionMode>(() =>
    getMotionMode(prefersReducedMotion),
  );

  useEffect(() => {
    const refreshMode = window.setTimeout(() => {
      setMode(getClientMotionMode(prefersReducedMotion));
    }, 0);
    return () => window.clearTimeout(refreshMode);
  }, [prefersReducedMotion]);

  useMotionValueEvent(scrollProgress, "change", (value) => {
    setProgress(clampProgress(value));
  });

  const registerChapter = useCallback(
    (id: ResumeChapterId, element: HTMLElement | null) => {
      if (element) {
        chapterElements.current.set(id, element);
      } else {
        chapterElements.current.delete(id);
      }
    },
    [],
  );

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) {
          return;
        }

        const chapter = chapters.find(
          (candidate) => chapterElements.current.get(candidate.id) === visible.target,
        );
        if (chapter) {
          setActiveChapter(chapter.id);
        }
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    chapterElements.current.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [chapters]);

  const value = useMemo<ResumeSceneContextValue>(
    () => ({
      chapters,
      activeChapter,
      progress,
      mode,
      prefersReducedMotion,
      registerChapter,
    }),
    [activeChapter, chapters, mode, prefersReducedMotion, progress, registerChapter],
  );

  return (
    <ResumeSceneContext.Provider value={value}>
      {children}
    </ResumeSceneContext.Provider>
  );
}

export function useResumeSceneRuntime(): ResumeSceneContextValue {
  const runtime = useContext(ResumeSceneContext);
  if (!runtime) {
    throw new Error(
      "useResumeSceneRuntime must be called beneath <ResumeSceneRuntime>.",
    );
  }
  return runtime;
}

export function useResumeSceneMode(): ResumeMotionMode {
  const { mode, prefersReducedMotion } = useResumeSceneRuntime();
  const [clientMode, setClientMode] = useState<ResumeMotionMode>(mode);

  useEffect(() => {
    const refreshMode = window.setTimeout(() => {
      setClientMode(getClientMotionMode(prefersReducedMotion));
    }, 0);
    return () => window.clearTimeout(refreshMode);
  }, [mode, prefersReducedMotion]);

  return clientMode;
}

export type ResumeChapterProps = ResumeChapter & { children: ReactNode };

export function ResumeChapter({ id, label, children }: ResumeChapterProps): ReactNode {
  const { registerChapter } = useResumeSceneRuntime();
  const ref = useMemo<RefCallback<HTMLElement>>(
    () => (element) => registerChapter(id, element),
    [id, registerChapter],
  );

  return (
    <div
      ref={ref}
      id={`resume-chapter-${id}`}
      data-resume-chapter={id}
      aria-label={label}
      className="resume-chapter"
    >
      {children}
    </div>
  );
}

export function ResumeReadingTrace(): ReactNode {
  const { progress, mode } = useResumeSceneRuntime();
  const dashOffset = 1 - progress;

  return (
    <svg
      aria-hidden="true"
      className={`resume-reading-trace resume-reading-trace--${mode}`}
      viewBox="0 0 2 100"
      preserveAspectRatio="none"
    >
      <path className="resume-reading-trace__base" d="M1 0v100" pathLength="1" />
      <path
        className="resume-reading-trace__progress"
        d="M1 0v100"
        pathLength="1"
        style={{ strokeDashoffset: dashOffset }}
      />
    </svg>
  );
}
