// Adapted from https://github.com/codrops/OneElementScroll
// commit feb7ad7fbc602b8cdbb5109da83442ff5995cdaf
// source path: js/index.js — createFlipOnScrollAnimation (~lines 15–49)
// SHA-256 (WO-024): fc1eaa878301e925cb3943ee4435639d3eedda08613b0ad8c96471ef0ecf8612
// Adaptation: Flip.getState / Flip.fit waypoint sequence only; scrubbed by the
// D-006 BSMNT root timeline (no source ScrollTrigger); demo Lenis/ticker,
// parallax, type effects, image reveals, filter-on-first-switch, loader, and
// document-level init removed. Rebuild via scoped gsap.context() on geometry change.

"use client";

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import type {
  ApertureMediaMap,
  ApertureWaypoint,
} from "./aperture-types";
import { useDispatcher, useScrollytelling } from "./bsmnt";
import type {
  CaseStudySceneDefinition,
  CaseStudySceneId,
} from "./case-study-scene-config";
import { parseSceneBoundary } from "./case-study-scene-config";
import { useCaseStudyScene } from "./case-study-scene-context";
import styles from "./case-study-experience.module.css";

gsap.registerPlugin(Flip);

export type { ApertureMediaMap, ApertureWaypoint };

type CaseStudyEvidenceApertureProps = {
  waypoints: readonly ApertureWaypoint[];
  scenes: readonly CaseStudySceneDefinition[];
  mediaByKey: ApertureMediaMap;
  /** Called once when Flip registration succeeds (progressive enhancement). */
  onReady?: () => void;
  /** Called when init fails so the host can keep normal-flow media. */
  onFailed?: () => void;
};

function sceneStart(
  scenes: readonly CaseStudySceneDefinition[],
  sceneId: CaseStudySceneId,
): number {
  const scene = scenes.find((entry) => entry.id === sceneId);
  if (!scene) {
    throw new Error(`Missing scene definition for aperture waypoint: ${sceneId}`);
  }
  return parseSceneBoundary(scene.start);
}

function sceneEnd(
  scenes: readonly CaseStudySceneDefinition[],
  sceneId: CaseStudySceneId,
): number {
  const scene = scenes.find((entry) => entry.id === sceneId);
  if (!scene) {
    throw new Error(`Missing scene definition for aperture waypoint: ${sceneId}`);
  }
  return parseSceneBoundary(scene.end);
}

function resolveActiveMediaKey(
  waypoints: readonly ApertureWaypoint[],
  activeSceneId: CaseStudySceneId,
): string | undefined {
  const exact = waypoints.find((waypoint) => waypoint.sceneId === activeSceneId);
  if (exact) return exact.mediaKey;
  return undefined;
}

function isCaptionActive(
  waypoints: readonly ApertureWaypoint[],
  activeSceneId: CaseStudySceneId,
): boolean {
  const waypoint = waypoints.find((entry) => entry.sceneId === activeSceneId);
  return Boolean(waypoint?.mediaKey);
}

/**
 * Persistent evidence aperture: one owned DOM frame travels through authored
 * waypoint slots via Flip.getState / Flip.fit under the D-006 root timeline.
 */
export function CaseStudyEvidenceAperture({
  waypoints,
  scenes,
  mediaByKey,
  onReady,
  onFailed,
}: CaseStudyEvidenceApertureProps) {
  const apertureRef = useRef<HTMLDivElement>(null);
  const { timeline } = useScrollytelling();
  const { getTimelineSpace } = useDispatcher();
  const { activeSceneId, articleProgress } = useCaseStudyScene();
  const [enabled, setEnabled] = useState(false);
  const readyRef = useRef(false);
  const flipCtxRef = useRef<gsap.Context | null>(null);
  const spaceCleanupsRef = useRef<Array<() => void>>([]);
  const geometryKeyRef = useRef("");
  const articleProgressRef = useRef(articleProgress);

  useEffect(() => {
    articleProgressRef.current = articleProgress;
  }, [articleProgress]);

  const activeMediaKey = resolveActiveMediaKey(waypoints, activeSceneId);
  const activeMedia = activeMediaKey ? mediaByKey[activeMediaKey] : undefined;
  const captionActive = isCaptionActive(waypoints, activeSceneId);
  const activeWaypoint = waypoints.find((entry) => entry.sceneId === activeSceneId);
  // Readable waypoints stay uncropped; transitional crop only while no caption
  // is presented as active (decisions clear / technology recede).
  const objectFit = captionActive
    ? "contain"
    : (activeWaypoint?.fit ?? "cover");

  useLayoutEffect(() => {
    const aperture = apertureRef.current;
    if (!aperture || !timeline || waypoints.length === 0) {
      return;
    }

    let cancelled = false;

    const clearSpaces = () => {
      for (const cleanup of spaceCleanupsRef.current) cleanup();
      spaceCleanupsRef.current = [];
    };

    const collectSlots = () =>
      waypoints
        .map((waypoint) =>
          document.querySelector<HTMLElement>(
            `[data-aperture-slot="${waypoint.slotId}"]`,
          ),
        )
        .filter((node): node is HTMLElement => node !== null);

    const measureGeometryKey = (slots: HTMLElement[]) =>
      slots
        .map((slot) => {
          const rect = slot.getBoundingClientRect();
          return [
            slot.dataset.apertureSlot,
            Math.round(rect.width),
            Math.round(rect.height),
            Math.round(rect.top),
            Math.round(rect.left),
          ].join(":");
        })
        .join("|");

    const build = () => {
      const slots = collectSlots();
      if (slots.length !== waypoints.length) {
        if (!readyRef.current) {
          onFailed?.();
        }
        return;
      }

      const nextKey = measureGeometryKey(slots);
      if (nextKey === geometryKeyRef.current && flipCtxRef.current) {
        return;
      }
      geometryKeyRef.current = nextKey;

      // Revert the old Flip state before rebuilding (WO-028 runtime rule).
      flipCtxRef.current?.revert();
      flipCtxRef.current = null;
      clearSpaces();

      try {
        flipCtxRef.current = gsap.context(() => {
          // Adapted from createFlipOnScrollAnimation — Flip states then
          // consecutive Flip.fit adds. Duration/position come from D-006
          // timeline space instead of a source-local ScrollTrigger.
          const flipConfig = {
            ease: "sine.inOut",
          } as const;

          const states = slots.map((slot) => Flip.getState(slot));

          states.forEach((state, index) => {
            const waypoint = waypoints[index]!;
            const start = sceneStart(scenes, waypoint.sceneId);
            const end =
              index < waypoints.length - 1
                ? sceneStart(scenes, waypoints[index + 1]!.sceneId)
                : sceneEnd(scenes, waypoint.sceneId);
            const space = getTimelineSpace({ start, end });
            if (!space) return;

            spaceCleanupsRef.current.push(space.cleanup);

            const customFlipConfig = {
              ...flipConfig,
              duration: Math.max(space.duration, 0.01),
              ease: index === 0 ? "none" : flipConfig.ease,
              absolute: true,
            };
            const fitTween = Flip.fit(
              aperture,
              state,
              customFlipConfig,
            ) as gsap.core.Tween | gsap.core.Timeline | null;
            if (fitTween) {
              timeline.add(fitTween, space.position);
            }
          });

          // Seek current progress so fragment / restored scroll lands on the
          // matching waypoint without replaying earlier chapters.
          timeline.progress(articleProgressRef.current);
        }, aperture);

        if (!cancelled) {
          setEnabled(true);
          if (!readyRef.current) {
            readyRef.current = true;
            onReady?.();
          }
        }
      } catch {
        flipCtxRef.current?.revert();
        flipCtxRef.current = null;
        clearSpaces();
        if (!cancelled) {
          setEnabled(false);
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
      flipCtxRef.current?.revert();
      flipCtxRef.current = null;
      clearSpaces();
      geometryKeyRef.current = "";
    };
  }, [getTimelineSpace, onFailed, onReady, scenes, timeline, waypoints]);

  // Re-seek when article progress jumps (hash / history) without full rebuild.
  useEffect(() => {
    if (!enabled || !timeline || !flipCtxRef.current) return;
    timeline.progress(articleProgress);
  }, [articleProgress, enabled, timeline]);

  const apertureStyle = {
    "--aperture-fit": objectFit,
    "--aperture-align": activeWaypoint?.alignment ?? "center",
  } as CSSProperties;

  return (
    <div
      ref={apertureRef}
      className={styles.aperture}
      data-aperture=""
      data-aperture-enabled={enabled ? "true" : "false"}
      data-aperture-caption-active={captionActive ? "true" : "false"}
      data-aperture-scene={activeSceneId}
      style={apertureStyle}
      aria-hidden={activeMedia ? undefined : true}
    >
      {activeMedia ? (
        // eslint-disable-next-line @next/next/no-img-element -- traveling Flip frame; semantic figures remain in chapter DOM.
        <img
          className={styles.apertureImage}
          src={activeMedia.src}
          alt={activeMedia.alt}
          width={activeMedia.width}
          height={activeMedia.height}
          decoding="async"
          draggable={false}
        />
      ) : (
        <div className={styles.apertureEmpty} />
      )}
    </div>
  );
}

export function ApertureSlot({
  slotId,
  aspectRatio,
  alignment,
  className,
}: {
  slotId: string;
  aspectRatio: ApertureWaypoint["aspectRatio"];
  alignment: ApertureWaypoint["alignment"];
  className?: string;
}) {
  return (
    <div
      className={[styles.apertureSlot, className].filter(Boolean).join(" ")}
      data-aperture-slot={slotId}
      data-aperture-align={alignment}
      style={{ aspectRatio }}
      aria-hidden="true"
    />
  );
}
