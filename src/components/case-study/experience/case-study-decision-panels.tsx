// Adapted from https://21st.dev/@boudjadjasamira/components/story-scroll
// capture 2026-07-31 via 21st.dev get_component id 12461
// source path: d012-story-scroll.component.tsx — FlowArt (lines 1–134)
// SHA-256 (WO-024): ab4a1e7f278bee29a419bd170729640be65383746bd6188db69c423009f633ec
// Adaptation: angular rotation (30°→0°, bottom-left origin), sticky overlap
// stack, and scrubbed reverse path only. Source-local ScrollTrigger.create /
// useGSAP / document <main> / reduced-motion early return removed. Sequence
// registers on the D-006 BSMNT root timeline via getTimelineSpace + gsap.context();
// root Lenis drives scrub. Zero new packages.

"use client";

import { gsap } from "gsap";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useDispatcher, useScrollytelling } from "./bsmnt";
import {
  AEGIS_SCENE_DEFINITIONS,
  parseSceneBoundary,
} from "./case-study-scene-config";
import { useCaseStudyScene } from "./case-study-scene-context";
import styles from "./case-study-experience.module.css";

const DECISIONS_SCENE = AEGIS_SCENE_DEFINITIONS.find(
  (scene) => scene.id === "decisions",
)!;

type CaseStudyDecisionPanelsProps = {
  children: ReactNode;
  onReady?: () => void;
  onFailed?: () => void;
};

function startRotationDegrees(): number {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return 30;
  }
  if (window.matchMedia("(max-width: 767px)").matches) return 12;
  if (window.matchMedia("(max-width: 1023px)").matches) return 18;
  return 30;
}

/**
 * D-012 decision sequence: sticky stacked panels with timeline-scrubbed
 * angular takeovers owned by the BSMNT root (decisions scene 40–60).
 */
export function CaseStudyDecisionPanels({
  children,
  onReady,
  onFailed,
}: CaseStudyDecisionPanelsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { timeline } = useScrollytelling();
  const { getTimelineSpace } = useDispatcher();
  const { articleProgress } = useCaseStudyScene();
  const [enhanced, setEnhanced] = useState(false);
  const readyRef = useRef(false);
  const ctxRef = useRef<gsap.Context | null>(null);
  const spaceCleanupsRef = useRef<Array<() => void>>([]);
  const geometryKeyRef = useRef("");
  const articleProgressRef = useRef(articleProgress);

  useEffect(() => {
    articleProgressRef.current = articleProgress;
  }, [articleProgress]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !timeline) {
      return;
    }

    let cancelled = false;

    const clearSpaces = () => {
      for (const cleanup of spaceCleanupsRef.current) cleanup();
      spaceCleanupsRef.current = [];
    };

    const build = () => {
      const panels = Array.from(
        root.querySelectorAll<HTMLElement>("[data-decision-panel]"),
      );
      if (panels.length === 0) {
        if (!readyRef.current) {
          onFailed?.();
        }
        return;
      }

      const inners = panels.map((panel) =>
        panel.querySelector<HTMLElement>("[data-decision-inner]"),
      );
      if (inners.some((inner) => !inner)) {
        if (!readyRef.current) {
          onFailed?.();
        }
        return;
      }

      const rotation = startRotationDegrees();
      const nextKey = [
        panels.length,
        rotation,
        Math.round(window.innerWidth),
        Math.round(window.innerHeight),
      ].join(":");
      if (nextKey === geometryKeyRef.current && ctxRef.current) {
        return;
      }
      geometryKeyRef.current = nextKey;

      ctxRef.current?.revert();
      ctxRef.current = null;
      clearSpaces();

      try {
        ctxRef.current = gsap.context(() => {
          const sceneStart = parseSceneBoundary(DECISIONS_SCENE.start);
          const sceneEnd = parseSceneBoundary(DECISIONS_SCENE.end);
          const span = Math.max(sceneEnd - sceneStart, Number.EPSILON);
          const panelSpan = span / panels.length;
          // Takeover occupies the first 55% of each incoming panel window so
          // the settled composition stays readable before the next handoff.
          const takeoverRatio = 0.55;

          panels.forEach((panel, index) => {
            gsap.set(panel, { zIndex: index + 1 });
            const inner = inners[index]!;

            if (index === 0) {
              gsap.set(inner, {
                rotation: 0,
                transformOrigin: "bottom left",
              });
              return;
            }

            gsap.set(inner, {
              rotation,
              transformOrigin: "bottom left",
            });

            const windowStart = sceneStart + index * panelSpan;
            const takeoverEnd = windowStart + panelSpan * takeoverRatio;
            const space = getTimelineSpace({
              start: windowStart,
              end: takeoverEnd,
            });
            if (!space) return;
            spaceCleanupsRef.current.push(space.cleanup);

            const tween = gsap.fromTo(
              inner,
              { rotation, transformOrigin: "bottom left" },
              {
                rotation: 0,
                transformOrigin: "bottom left",
                ease: "none",
                duration: Math.max(space.duration, 0.01),
              },
            );
            timeline.add(tween, space.position);
          });

          timeline.progress(articleProgressRef.current);
        }, root);

        if (!cancelled) {
          setEnhanced(true);
          if (!readyRef.current) {
            readyRef.current = true;
            onReady?.();
          }
        }
      } catch {
        ctxRef.current?.revert();
        ctxRef.current = null;
        clearSpaces();
        if (!cancelled) {
          setEnhanced(false);
          onFailed?.();
        }
      }
    };

    build();

    const onResize = () => {
      geometryKeyRef.current = "";
      build();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      ctxRef.current?.revert();
      ctxRef.current = null;
      clearSpaces();
      geometryKeyRef.current = "";
    };
  }, [getTimelineSpace, onFailed, onReady, timeline]);

  useEffect(() => {
    if (!enhanced || !timeline || !ctxRef.current) return;
    timeline.progress(articleProgress);
  }, [articleProgress, enhanced, timeline]);

  return (
    <div
      ref={rootRef}
      className={styles.decisionPanels}
      data-decision-panels=""
      data-decision-enhanced={enhanced ? "true" : "false"}
    >
      {children}
    </div>
  );
}
