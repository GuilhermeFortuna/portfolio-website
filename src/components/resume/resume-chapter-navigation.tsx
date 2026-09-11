"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useTransform,
  type MotionValue,
  type Transition,
} from "motion/react";

import {
  useResumeSceneRuntime,
  type ResumeChapter,
  type ResumeChapterId,
  type ResumeMotionMode,
} from "@/components/resume/resume-scene-runtime";

export type ResumeChapterNavigationLabels = {
  tableOfContents: string;
  closeTableOfContents: string;
};

export const DEFAULT_CHAPTER_LABELS: ResumeChapterNavigationLabels = {
  tableOfContents: "Table of contents",
  closeTableOfContents: "Close table of contents",
};

export type ResumeChapterNavigationProps = {
  chapters: readonly ResumeChapter[];
  activeChapter: ResumeChapterId;
  progress: number | MotionValue<number>;
  prefersReducedMotion?: boolean;
  motionMode?: ResumeMotionMode;
  labels?: ResumeChapterNavigationLabels;
};

function CircleProgressMotion({
  size,
  strokeWidth,
  radius,
  circumference,
  progress,
}: {
  size: number;
  strokeWidth: number;
  radius: number;
  circumference: number;
  progress: MotionValue<number>;
}) {
  const motionOffset = useTransform(
    progress,
    (value) => circumference * (1 - Math.min(1, Math.max(0, value))),
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="resume-dynamic-island__progress-circle"
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-line-strong)"
        strokeWidth={strokeWidth}
        opacity={0.35}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-accent-b)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={motionOffset}
        strokeLinecap="round"
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
          transition: "stroke-dashoffset 150ms ease-out",
        }}
      />
    </svg>
  );
}

function CircleProgressStatic({
  size,
  strokeWidth,
  radius,
  circumference,
  progress,
}: {
  size: number;
  strokeWidth: number;
  radius: number;
  circumference: number;
  progress: number;
}) {
  const clamped = Math.min(1, Math.max(0, progress));
  const offset = circumference * (1 - clamped);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="resume-dynamic-island__progress-circle"
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-line-strong)"
        strokeWidth={strokeWidth}
        opacity={0.35}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-accent-b)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
          transition: "stroke-dashoffset 150ms ease-out",
        }}
      />
    </svg>
  );
}

function CircleProgress({
  progress,
}: {
  progress: number | MotionValue<number>;
}) {
  const size = 24;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const isMotionValue =
    typeof progress === "object" && progress !== null && "get" in progress;

  if (isMotionValue) {
    return (
      <CircleProgressMotion
        size={size}
        strokeWidth={strokeWidth}
        radius={radius}
        circumference={circumference}
        progress={progress}
      />
    );
  }

  return (
    <CircleProgressStatic
      size={size}
      strokeWidth={strokeWidth}
      radius={radius}
      circumference={circumference}
      progress={progress}
    />
  );
}

export function ResumeChapterNavigation({
  chapters,
  activeChapter,
  progress,
  prefersReducedMotion = false,
  motionMode,
  labels = DEFAULT_CHAPTER_LABELS,
}: ResumeChapterNavigationProps): ReactNode {
  const [isExpanded, setIsExpanded] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasExpandedRef = useRef(false);
  const activeChapterData =
    chapters.find((c) => c.id === activeChapter) ?? chapters[0];
  const accessibleName = chapters.map((chapter) => chapter.label).join(" · ");

  const handleClose = useCallback(() => {
    setIsExpanded(false);
  }, []);

  useEffect(() => {
    if (isExpanded) {
      closeButtonRef.current?.focus();
      wasExpandedRef.current = true;
    } else if (wasExpandedRef.current) {
      triggerRef.current?.focus();
      wasExpandedRef.current = false;
    }
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, handleClose]);

  const islandTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 380, damping: 28 };

  return (
    <nav
      aria-label={accessibleName}
      className="resume-dynamic-island-nav"
      data-motion-mode={motionMode}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="resume-dynamic-island__backdrop"
            onClick={handleClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.div
        layout={!prefersReducedMotion}
        className="resume-dynamic-island"
        data-expanded={isExpanded}
        transition={islandTransition}
      >
        {/* Closed Pill Trigger */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsExpanded(true)}
          aria-expanded={isExpanded}
          aria-controls="resume-dynamic-island-menu"
          aria-haspopup="dialog"
          aria-label={`${labels.tableOfContents}: ${activeChapterData?.label ?? labels.tableOfContents}`}
          className="resume-dynamic-island__trigger"
          tabIndex={isExpanded ? -1 : 0}
        >
          <span className="resume-dynamic-island__dot" aria-hidden="true" />
          <span className="resume-dynamic-island__active-title-container">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={activeChapterData?.id ?? "active"}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeOut" }}
                className="resume-dynamic-island__active-title"
              >
                {activeChapterData?.label}
              </motion.span>
            </AnimatePresence>
          </span>
          <CircleProgress progress={progress} />
        </button>

        {/* Expanded Menu Content */}
        <div
          id="resume-dynamic-island-menu"
          role="region"
          aria-label={labels.tableOfContents}
          className="resume-dynamic-island__menu"
        >
          <div className="resume-dynamic-island__menu-header">
            <span className="resume-dynamic-island__menu-title">
              {labels.tableOfContents}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              aria-label={labels.closeTableOfContents}
              className="resume-dynamic-island__close-button"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <ol className="resume-dynamic-island__list">
            {chapters.map((chapter) => {
              const isCurrent = chapter.id === activeChapter;
              return (
                <li key={chapter.id} className="resume-dynamic-island__item">
                  <a
                    href={`#resume-chapter-${chapter.id}`}
                    aria-current={isCurrent ? "location" : undefined}
                    onClick={handleClose}
                    className="resume-dynamic-island__link"
                  >
                    <span className="resume-dynamic-island__link-text">
                      {chapter.label}
                    </span>
                    <span
                      className="resume-dynamic-island__link-indicator"
                      aria-hidden="true"
                      data-active={isCurrent}
                    />
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </motion.div>
    </nav>
  );
}

export function ResumeChapterNavigationConnected({
  labels,
}: {
  labels?: ResumeChapterNavigationLabels;
} = {}): ReactNode {
  const { chapters, activeChapter, scrollProgress, mode, prefersReducedMotion } =
    useResumeSceneRuntime();
  return (
    <ResumeChapterNavigation
      chapters={chapters}
      activeChapter={activeChapter}
      progress={scrollProgress}
      prefersReducedMotion={prefersReducedMotion}
      motionMode={mode}
      labels={labels}
    />
  );
}
