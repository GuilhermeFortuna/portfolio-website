// Adapted from https://21st.dev/@digitalzone0707/components/dynamic-island-toc
// capture 2026-07-31 via 21st.dev get_component id 12488
// source path: d011-dynamic-island-toc.component.tsx — DynamicIslandTOC + CircleProgress
// SHA-256 (WO-024): dcab0863faa4c1d6ba632eb13076dc88b21d89aeeb777701376a6345070c81e2
// Adaptation: Motion compact/expanded morph, active label, progress circle, and
// navigable list only. Document scroll spy, heading discovery, window.scrollTo,
// useScroll, and reduced-motion branches removed. Chapter/progress come from
// D-006 props; anchor navigation uses real hrefs for the root Lenis owner.

"use client";

import {
  AnimatePresence,
  motion,
  type Transition,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";

import { cn } from "@/lib/cn";

import styles from "./case-study-chapter-instrument.module.css";

export type CaseStudyChapter = {
  id: string;
  label: string;
  href: `#${string}`;
};

export type CaseStudyChapterInstrumentProps = {
  chapters: readonly CaseStudyChapter[];
  activeId: string;
  localProgress: number;
  /** When false, only the static semantic nav is shown (pre-entrance / no enhance). */
  entranceComplete?: boolean;
};

const islandTransition: Transition = {
  type: "tween",
  ease: [0.22, 1, 0.36, 1],
  duration: 0.5,
};

function clampProgress(value: number): number {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

function CircleProgress({ progress }: { progress: number }) {
  const size = 24;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = clampProgress(progress) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className={styles.progressRing}
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className={styles.progressTrack}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        initial={false}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        strokeLinecap="round"
        className={styles.progressValue}
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function formatOrdinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}

/**
 * Persistent chapter instrument. Compact state shows active chapter + local
 * progress; expanded state lists all authored anchors. Root Lenis owns smooth
 * hash navigation via real `<a href="#…">` links.
 */
export function CaseStudyChapterInstrument({
  chapters,
  activeId,
  localProgress,
  entranceComplete = true,
}: CaseStudyChapterInstrumentProps) {
  const listId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [userExpanded, setUserExpanded] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const progress = clampProgress(localProgress);

  const activeIndex = Math.max(
    0,
    chapters.findIndex((chapter) => chapter.id === activeId),
  );
  const activeChapter = chapters[activeIndex] ?? chapters[0];
  const enhanced = isClient && entranceComplete;
  const navigationSettled =
    pendingId !== null && pendingId === activeId;
  const expanded = userExpanded && !navigationSettled;

  const collapse = useCallback((restoreFocus: boolean) => {
    setUserExpanded(false);
    setPendingId(null);
    if (restoreFocus) {
      queueMicrotask(() => {
        openerRef.current?.focus();
      });
    }
  }, []);

  // Restore focus once D-006 reports the selected chapter (derived collapse).
  useEffect(() => {
    if (!navigationSettled) return;
    queueMicrotask(() => {
      openerRef.current?.focus();
    });
  }, [navigationSettled]);

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        collapse(true);
      }
    };

    const onOutsideClick = (event: globalThis.MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (rootRef.current?.contains(target)) return;
      collapse(true);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onOutsideClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onOutsideClick);
    };
  }, [expanded, collapse]);

  const open = useCallback(() => {
    setPendingId(null);
    setUserExpanded(true);
  }, []);

  const onOpenerKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    },
    [open],
  );

  const onChapterActivate = useCallback(
    (chapterId: string) => (event: ReactMouseEvent<HTMLAnchorElement>) => {
      // Preserve native hash/history; do not preventDefault. Lenis anchors:true
      // owns smooth movement. Collapse once D-006 reports the destination.
      event.stopPropagation();
      setPendingId(chapterId);
      if (chapterId === activeId) {
        collapse(true);
      }
    },
    [activeId, collapse],
  );

  const onCloseClick = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      collapse(true);
    },
    [collapse],
  );

  return (
    <nav
      ref={rootRef}
      className={cn(
        styles.root,
        enhanced && styles.rootEnhanced,
        expanded && styles.rootExpanded,
      )}
      aria-label="Case study chapters"
      data-chapter-instrument=""
      data-enhanced={enhanced ? "true" : "false"}
      data-expanded={expanded ? "true" : "false"}
      data-entrance={entranceComplete ? "complete" : "pending"}
    >
      {/* No-JS / pre-entrance: full semantic list. Hidden visually when enhanced. */}
      <ol
        className={styles.staticList}
        data-chapter-static=""
        hidden={enhanced}
      >
        {chapters.map((chapter, index) => {
          const isActive = chapter.id === activeId;
          const isComplete = index < activeIndex;
          return (
            <li key={chapter.id}>
              <a
                href={chapter.href}
                className={cn(
                  styles.staticLink,
                  isActive && styles.linkActive,
                  isComplete && styles.linkComplete,
                )}
                aria-current={isActive ? "location" : undefined}
              >
                <span className={styles.ordinal}>{formatOrdinal(index)}</span>
                <span>{chapter.label}</span>
              </a>
            </li>
          );
        })}
      </ol>

      {enhanced ? (
        <>
          <AnimatePresence>
            {expanded ? (
              <motion.div
                key="chapter-backdrop"
                className={styles.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={islandTransition}
                onClick={() => collapse(true)}
                aria-hidden="true"
              />
            ) : null}
          </AnimatePresence>

          <motion.div
            className={styles.islandShell}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.div
              className={styles.island}
              layout
              initial={false}
              transition={islandTransition}
              data-chapter-island=""
            >
              <div
                className={cn(
                  styles.compact,
                  expanded && styles.compactHidden,
                )}
              >
                <button
                  ref={openerRef}
                  type="button"
                  className={styles.opener}
                  aria-expanded={expanded}
                  aria-controls={listId}
                  onClick={open}
                  onKeyDown={onOpenerKeyDown}
                >
                  <span className={styles.openerMark} aria-hidden="true" />
                  <span className={styles.openerBody}>
                    <span className={styles.ordinal}>
                      {formatOrdinal(activeIndex)}
                    </span>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={activeChapter?.id ?? "empty"}
                        className={styles.activeLabel}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {activeChapter?.label ?? "Chapters"}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <CircleProgress progress={progress} />
                  <span className={styles.srOnly}>
                    {`Chapter ${formatOrdinal(activeIndex)} of ${String(chapters.length).padStart(2, "0")}. Local progress ${Math.round(progress * 100)} percent. Open chapter list.`}
                  </span>
                </button>
              </div>

              <div
                id={listId}
                className={cn(
                  styles.expanded,
                  !expanded && styles.expandedHidden,
                )}
                hidden={!expanded}
              >
                <div className={styles.expandedHeader}>
                  <span className={styles.expandedEyebrow}>Chapters</span>
                  <button
                    type="button"
                    className={styles.close}
                    onClick={onCloseClick}
                    aria-label="Close chapter list"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <ol
                  className={styles.expandedList}
                  data-lenis-prevent="true"
                >
                  {chapters.map((chapter, index) => {
                    const isActive = chapter.id === activeId;
                    const isComplete = index < activeIndex;
                    return (
                      <li key={chapter.id}>
                        <a
                          href={chapter.href}
                          className={cn(
                            styles.expandedLink,
                            isActive && styles.linkActive,
                            isComplete && styles.linkComplete,
                          )}
                          aria-current={isActive ? "location" : undefined}
                          onClick={onChapterActivate(chapter.id)}
                        >
                          <span className={styles.ordinal}>
                            {formatOrdinal(index)}
                          </span>
                          <span className={styles.expandedLabel}>
                            {chapter.label}
                          </span>
                          {isActive ? (
                            <span
                              className={styles.activeDot}
                              aria-hidden="true"
                            />
                          ) : null}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </motion.div>
          </motion.div>
        </>
      ) : null}
    </nav>
  );
}
