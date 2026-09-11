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
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMotionRuntime } from "@/components/motion/motion-runtime";

export type ResumeChapterId =
  | "identity"
  | "capabilities"
  | "experience"
  | "credentials"
  | "contact";

export type ResumeMotionMode = "enhanced" | "reduced" | "static";

export type ResumeMotionEnvironment = {
  prefersReducedMotion: boolean;
  matchesEnhancedViewport: boolean;
  saveData: boolean;
};

export type ResumeChapter = {
  id: ResumeChapterId;
  label: string;
};

export type ResumeSceneRuntimeProps = {
  chapters: readonly ResumeChapter[];
  children: ReactNode;
};

export type ResumeSceneBaseValue = {
  chapters: readonly ResumeChapter[];
  activeChapter: ResumeChapterId;
  scrollProgress: MotionValue<number>;
  mode: ResumeMotionMode;
  prefersReducedMotion: boolean;
  registerChapter: (id: ResumeChapterId, element: HTMLElement | null) => void;
};

export type ResumeSceneContextValue = ResumeSceneBaseValue & {
  progress: number;
};

const ResumeSceneBaseContext = createContext<ResumeSceneBaseValue | null>(null);
const ResumeSceneProgressContext = createContext<number>(0);

function clampProgress(value: number): number {
  return Math.min(1, Math.max(0, value));
}

const RESUME_ENHANCEMENT_QUERY =
  "(min-width: 1200px) and (min-height: 720px) and (pointer: fine)";

export function resolveResumeMotionMode({
  prefersReducedMotion,
  matchesEnhancedViewport,
  saveData,
}: ResumeMotionEnvironment): ResumeMotionMode {
  if (prefersReducedMotion) {
    return "reduced";
  }
  return matchesEnhancedViewport && !saveData ? "enhanced" : "static";
}

function getMotionMode(prefersReducedMotion: boolean): ResumeMotionMode {
  return prefersReducedMotion ? "reduced" : "static";
}

function getSaveDataPreference(): boolean {
  if (typeof navigator === "undefined") {
    return false;
  }
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean };
  }).connection;
  return connection?.saveData === true;
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
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia?.(RESUME_ENHANCEMENT_QUERY);
    const refreshTimers = new Set<number>();
    let disposed = false;
    const scheduleGeometryRefresh = () => {
      const timer = window.setTimeout(() => {
        refreshTimers.delete(timer);
        if (!disposed) {
          ScrollTrigger.refresh();
        }
      }, 0);
      refreshTimers.add(timer);
    };
    const refresh = () => {
      setMode(
        resolveResumeMotionMode({
          prefersReducedMotion,
          matchesEnhancedViewport: media?.matches ?? false,
          saveData: getSaveDataPreference(),
        }),
      );
      scheduleGeometryRefresh();
    };
    const refreshOnResize = () => refresh();
    const initialRefresh = window.setTimeout(refresh, 0);
    media?.addEventListener("change", refresh);
    window.addEventListener("resize", refreshOnResize, { passive: true });

    let cancelFontRefresh = () => {};
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!disposed) {
          scheduleGeometryRefresh();
        }
      });
      cancelFontRefresh = () => {
        disposed = true;
      };
    }

    scheduleGeometryRefresh();
    return () => {
      disposed = true;
      window.clearTimeout(initialRefresh);
      media?.removeEventListener("change", refresh);
      window.removeEventListener("resize", refreshOnResize);
      refreshTimers.forEach((timer) => window.clearTimeout(timer));
      refreshTimers.clear();
      cancelFontRefresh();
    };
  }, [prefersReducedMotion]);

  const lastProgressRef = useRef(progress);

  useMotionValueEvent(scrollProgress, "change", (value) => {
    const next = clampProgress(value);
    if (
      Math.abs(next - lastProgressRef.current) >= 0.01 ||
      (next === 0 && lastProgressRef.current !== 0) ||
      (next === 1 && lastProgressRef.current !== 1)
    ) {
      lastProgressRef.current = next;
      setProgress(next);
    }
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

  const baseValue = useMemo<ResumeSceneBaseValue>(
    () => ({
      chapters,
      activeChapter,
      scrollProgress,
      mode,
      prefersReducedMotion,
      registerChapter,
    }),
    [activeChapter, chapters, mode, prefersReducedMotion, registerChapter, scrollProgress],
  );

  return (
    <ResumeSceneBaseContext.Provider value={baseValue}>
      <ResumeSceneProgressContext.Provider value={progress}>
        {children}
      </ResumeSceneProgressContext.Provider>
    </ResumeSceneBaseContext.Provider>
  );
}

export function useResumeSceneBase(): ResumeSceneBaseValue {
  const base = useContext(ResumeSceneBaseContext);
  if (!base) {
    throw new Error(
      "useResumeSceneBase must be called beneath <ResumeSceneRuntime>.",
    );
  }
  return base;
}

export function useResumeSceneRuntime(): ResumeSceneContextValue {
  const base = useResumeSceneBase();
  const progress = useContext(ResumeSceneProgressContext);
  return useMemo(
    () => ({
      ...base,
      progress,
    }),
    [base, progress],
  );
}

export function useResumeSceneMode(): ResumeMotionMode {
  return useResumeSceneBase().mode;
}

export function useResumePrefersReducedMotion(): boolean {
  return useResumeSceneBase().prefersReducedMotion;
}

export type ResumeChapterProps = ResumeChapter & { children: ReactNode };

export function ResumeChapter({ id, label, children }: ResumeChapterProps): ReactNode {
  const { registerChapter } = useResumeSceneBase();
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
  const { mode, scrollProgress } = useResumeSceneBase();
  const clampedProgress = useTransform(scrollProgress, (value) =>
    Math.min(1, Math.max(0, value)),
  );
  const dashOffset = useTransform(clampedProgress, (value) => 1 - value);
  const [isActive, setIsActive] = useState(() => scrollProgress.get() > 0);

  useMotionValueEvent(scrollProgress, "change", (value) => {
    const active = value > 0;
    setIsActive((prev) => (prev !== active ? active : prev));
  });

  return (
    <div
      aria-hidden="true"
      className={`resume-reading-trace resume-reading-trace--${mode}`}
    >
      <div className="resume-reading-trace__indicator">
        <div
          className="resume-reading-trace__indicator-core"
          data-active={isActive}
        />
      </div>
      <svg
        className="resume-reading-trace__svg"
        viewBox="0 0 20 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient
            id="resume-beam-gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--color-accent-b)" stopOpacity="0.2" />
            <stop offset="0.3" stopColor="var(--color-accent-b)" />
            <stop offset="0.7" stopColor="var(--color-accent-a)" />
            <stop offset="1" stopColor="var(--color-accent-a)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M 10 0 V 100"
          className="resume-reading-trace__base"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M 10 0 V 100"
          className="resume-reading-trace__progress"
          pathLength="1"
          vectorEffect="non-scaling-stroke"
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>
    </div>
  );
}
