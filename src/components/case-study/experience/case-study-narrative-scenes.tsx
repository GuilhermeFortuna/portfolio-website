// Portfolio composition host for D-010 chapter handoffs. Flip ownership lives
// in case-study-evidence-aperture.tsx; this module only places the aperture
// host and progressive-enhancement chrome. Does not introduce a local scroller,
// smoother, animation frame loop, or OS motion-preference branch.

"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import type { CaseStudySceneDefinition } from "./case-study-scene-config";
import {
  ApertureSlot,
  CaseStudyEvidenceAperture,
  type ApertureMediaMap,
  type ApertureWaypoint,
} from "./case-study-evidence-aperture";
import styles from "./case-study-experience.module.css";

type CaseStudyNarrativeScenesProps = {
  waypoints: readonly ApertureWaypoint[];
  scenes: readonly CaseStudySceneDefinition[];
  mediaByKey: ApertureMediaMap;
  children: ReactNode;
};

/**
 * Composes the persistent evidence aperture under D-006. Chapter pages place
 * `NarrativeSceneSlot` inside each scene so Flip can measure authored geometry.
 * When Flip init fails, children keep Batch 03 normal-flow media.
 */
export function CaseStudyNarrativeScenes({
  waypoints,
  scenes,
  mediaByKey,
  children,
}: CaseStudyNarrativeScenesProps) {
  const [enhanced, setEnhanced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [experienceLayer, setExperienceLayer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setExperienceLayer(rootRef.current?.closest("article") ?? null);
  }, []);

  const onReady = useCallback(() => {
    setEnhanced(true);
  }, []);

  const onFailed = useCallback(() => {
    setEnhanced(false);
  }, []);

  return (
    <>
      <div
        ref={rootRef}
        className={styles.narrativeRoot}
        data-aperture-enhanced={enhanced ? "true" : "false"}
      >
        {children}
      </div>
      {experienceLayer
        ? createPortal(
            <CaseStudyEvidenceAperture
              waypoints={waypoints}
              scenes={scenes}
              mediaByKey={mediaByKey}
              onReady={onReady}
              onFailed={onFailed}
            />,
            experienceLayer,
          )
        : null}
    </>
  );
}

export function NarrativeSceneSlot({
  waypoint,
  className,
}: {
  waypoint: ApertureWaypoint;
  className?: string;
}) {
  return (
    <ApertureSlot
      slotId={waypoint.slotId}
      aspectRatio={waypoint.aspectRatio}
      alignment={waypoint.alignment}
      className={className}
    />
  );
}

export type { ApertureMediaMap, ApertureWaypoint };
