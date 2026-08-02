// Adapted from https://github.com/codrops/RotatingOnScrollAnimations
// commit ebbe2c9bd80237d05c709475e47aad171030e21f
// source path: js/index3.js — initGalleryAnimation (lines 52–86)
// SHA-256 (WO-024): 0f15d19f3a4e99c4ed504a9e97cb9541c5433b5960195ee39751d8906a7d13fc
// Adaptation: deterministic enter→inspect→exit keyframe scrub on D-006
// getTimelineSpace. Source ScrollTrigger.create per item, Lenis ticker,
// marquee, imagesloaded, DOM reparenting, and randomized angles removed.

"use client";

import { gsap } from "gsap";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type Ref,
} from "react";

import { useDispatcher, useScrollytelling } from "./bsmnt";
import type { CaseStudySceneBoundary } from "./case-study-scene-config";
import { useCaseStudyScene } from "./case-study-scene-context";
import {
  DEFAULT_EVIDENCE_BEATS,
  resolveEvidenceViewport,
  type EvidencePlaneBeat,
  type EvidenceViewport,
} from "./case-study-evidence-plane";
import styles from "./case-study-experience.module.css";

export type EvidencePlaneDefinition = {
  id: string;
  start: CaseStudySceneBoundary;
  end: CaseStudySceneBoundary;
  /** Local plane progress [0,1] where inspect dwell begins. */
  inspectStart?: number;
  /** Local plane progress [0,1] where inspect dwell ends. */
  inspectEnd?: number;
  beats?: Partial<Record<EvidenceViewport, EvidencePlaneBeat>>;
};

type CaseStudyEvidenceStageProps = {
  planes: readonly EvidencePlaneDefinition[];
  children?: ReactNode;
  onReady?: () => void;
  onFailed?: () => void;
  className?: string;
  /**
   * Forwarded to the stage root. `CaseStudySceneManager` clones its single
   * child to attach the D-006 ScrollTrigger trigger; dropping this ref leaves
   * the root timeline disabled and silently kills D-010/D-012/D-013.
   */
  ref?: Ref<HTMLDivElement>;
};

function applyPlaneFrame(
  target: HTMLElement,
  frame: {
    yPercent: number;
    rotateX: number;
    z: number;
    brightness: number;
    saturation: number;
  },
) {
  gsap.set(target, {
    yPercent: frame.yPercent,
    rotateX: frame.rotateX,
    z: frame.z,
    transformPerspective: 1200,
    transformOrigin: "50% 50%",
    filter: `saturate(${frame.saturation}) brightness(${frame.brightness})`,
  });
}

function isInspecting(
  localProgress: number,
  inspectStart: number,
  inspectEnd: number,
): boolean {
  return localProgress >= inspectStart && localProgress <= inspectEnd;
}

/**
 * D-013 evidence stage: registers CSS 3D plane beats on the BSMNT root
 * timeline. Subordinate to D-010 aperture travel and D-012 panel geometry.
 */
export function CaseStudyEvidenceStage({
  planes,
  children,
  onReady,
  onFailed,
  className,
  ref,
}: CaseStudyEvidenceStageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const attachRoot = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
  };
  const { timeline } = useScrollytelling();
  const { getTimelineSpace } = useDispatcher();
  const {
    articleProgress,
    layoutRevision,
    resolveBoundary,
  } = useCaseStudyScene();
  const layoutEnhanced = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [enhanced, setEnhanced] = useState(false);
  const readyRef = useRef(false);
  const ctxRef = useRef<gsap.Context | null>(null);
  const spaceCleanupsRef = useRef<Array<() => void>>([]);
  const geometryKeyRef = useRef("");
  const articleProgressRef = useRef(articleProgress);
  const planeProgressRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    articleProgressRef.current = articleProgress;
  }, [articleProgress]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !timeline || !layoutEnhanced || planes.length === 0) {
      return;
    }

    let cancelled = false;

    const clearSpaces = () => {
      for (const cleanup of spaceCleanupsRef.current) cleanup();
      spaceCleanupsRef.current = [];
    };

    const build = () => {
      const viewport = resolveEvidenceViewport(window.innerWidth);
      // Aperture planes portal onto the article; search the case-study article
      // so D-010 and D-012 hosts share one stage owner.
      const searchRoot =
        root.querySelector("article") ??
        (root.closest("article") as HTMLElement | null) ??
        root;
      const nextKey = [
        planes.map((plane) => plane.id).join(","),
        viewport,
        layoutRevision,
        Math.round(window.innerWidth),
        Math.round(window.innerHeight),
      ].join(":");
      if (nextKey === geometryKeyRef.current && ctxRef.current) {
        return;
      }

      const missing = planes.filter(
        (definition) =>
          !searchRoot.querySelector(
            `[data-evidence-plane="${definition.id}"]`,
          ),
      );
      if (missing.length > 0) {
        if (!readyRef.current && !cancelled) {
          window.setTimeout(() => {
            if (cancelled) return;
            geometryKeyRef.current = "";
            build();
          }, 0);
        }
        return;
      }

      geometryKeyRef.current = nextKey;

      ctxRef.current?.revert();
      ctxRef.current = null;
      clearSpaces();
      planeProgressRef.current.clear();

      try {
        ctxRef.current = gsap.context(() => {
          for (const definition of planes) {
            const shell = searchRoot.querySelector<HTMLElement>(
              `[data-evidence-plane="${definition.id}"]`,
            );
            const inner = shell?.querySelector<HTMLElement>(
              "[data-evidence-plane-inner]",
            );
            if (!shell || !inner) {
              throw new Error(`Missing evidence plane: ${definition.id}`);
            }

            const start = resolveBoundary(definition.start);
            const end = resolveBoundary(definition.end);
            if (start === null || end === null || end <= start) {
              throw new Error(
                `Invalid evidence plane range: ${definition.id}`,
              );
            }

            const space = getTimelineSpace({ start, end });
            if (!space) {
              throw new Error(
                `No timeline space for evidence plane: ${definition.id}`,
              );
            }
            spaceCleanupsRef.current.push(space.cleanup);

            const beat =
              definition.beats?.[viewport] ?? DEFAULT_EVIDENCE_BEATS[viewport];
            const inspectStart = Math.min(
              Math.max(definition.inspectStart ?? 0.35, 0),
              1,
            );
            const inspectEnd = Math.min(
              Math.max(definition.inspectEnd ?? 0.65, inspectStart),
              1,
            );

            applyPlaneFrame(inner, beat.enter);
            shell.dataset.evidenceInspect = "false";
            shell.style.pointerEvents = "none";
            planeProgressRef.current.set(definition.id, 0);

            const duration = Math.max(space.duration, 0.01);
            const enterDur = Math.max(inspectStart * duration, 0.01);
            const inspectDur = Math.max(
              (inspectEnd - inspectStart) * duration,
              0.01,
            );
            const exitDur = Math.max((1 - inspectEnd) * duration, 0.01);

            const localTl = gsap.timeline({
              defaults: { ease: "none" },
              onUpdate: () => {
                const local = localTl.progress();
                planeProgressRef.current.set(definition.id, local);
                const inspecting = isInspecting(
                  local,
                  inspectStart,
                  inspectEnd,
                );
                shell.dataset.evidenceInspect = inspecting ? "true" : "false";
                shell.style.pointerEvents = inspecting ? "auto" : "none";
              },
            });

            localTl.fromTo(
              inner,
              {
                yPercent: beat.enter.yPercent,
                rotateX: beat.enter.rotateX,
                z: beat.enter.z,
                filter: `saturate(${beat.enter.saturation}) brightness(${beat.enter.brightness})`,
              },
              {
                yPercent: beat.inspect.yPercent,
                rotateX: beat.inspect.rotateX,
                z: beat.inspect.z,
                filter: `saturate(${beat.inspect.saturation}) brightness(${beat.inspect.brightness})`,
                duration: enterDur,
                transformPerspective: 1200,
                transformOrigin: "50% 50%",
              },
              0,
            );
            localTl.to(
              inner,
              {
                yPercent: beat.inspect.yPercent,
                rotateX: beat.inspect.rotateX,
                z: beat.inspect.z,
                filter: `saturate(${beat.inspect.saturation}) brightness(${beat.inspect.brightness})`,
                duration: inspectDur,
                transformPerspective: 1200,
                transformOrigin: "50% 50%",
              },
              enterDur,
            );
            localTl.to(
              inner,
              {
                yPercent: beat.exit.yPercent,
                rotateX: beat.exit.rotateX,
                z: beat.exit.z,
                filter: `saturate(${beat.exit.saturation}) brightness(${beat.exit.brightness})`,
                duration: exitDur,
                transformPerspective: 1200,
                transformOrigin: "50% 50%",
              },
              enterDur + inspectDur,
            );

            timeline.add(localTl, space.position);
          }

          timeline.progress(articleProgressRef.current);
        }, searchRoot);

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
  }, [
    getTimelineSpace,
    layoutEnhanced,
    layoutRevision,
    onFailed,
    onReady,
    planes,
    resolveBoundary,
    timeline,
  ]);

  useEffect(() => {
    if (!enhanced || !timeline || !ctxRef.current) return;
    timeline.progress(articleProgress);
  }, [articleProgress, enhanced, timeline]);

  return (
    <div
      ref={attachRoot}
      className={[styles.evidenceStage, className].filter(Boolean).join(" ")}
      data-evidence-stage=""
      data-evidence-enhanced={enhanced ? "true" : "false"}
      data-evidence-layout={layoutEnhanced ? "enhanced" : "flow"}
    >
      {children}
    </div>
  );
}
