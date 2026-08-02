// Adapted from https://github.com/codrops/RotatingOnScrollAnimations
// commit ebbe2c9bd80237d05c709475e47aad171030e21f
// source path: js/index3.js — initGalleryAnimation (lines 52–86)
// SHA-256 (WO-024): 0f15d19f3a4e99c4ed504a9e97cb9541c5433b5960195ee39751d8906a7d13fc
// Adaptation: Variation 3's non-linear rotateX / z / yPercent / saturate /
// brightness progression expressed as authored enter→inspect→exit keyframes.
// Demo Lenis, marquee, randomized angles, DOM reparenting, imagesloaded, and
// document ScrollTriggers removed. Motion registration lives in
// case-study-evidence-stage.tsx under D-006.

import type { ReactNode } from "react";

import styles from "./case-study-experience.module.css";

export type EvidencePlaneKeyframe = {
  progress: number;
  yPercent: number;
  rotateX: number;
  z: number;
  brightness: number;
  saturation: number;
};

export type EvidencePlaneBeat = {
  enter: EvidencePlaneKeyframe;
  inspect: EvidencePlaneKeyframe;
  exit: EvidencePlaneKeyframe;
};

export type EvidenceViewport = "desktop" | "tablet" | "mobile";

export type EvidencePlaneProps = {
  /** Stable id matched by CaseStudyEvidenceStage definitions. */
  id: string;
  children: ReactNode;
  className?: string;
};

/** Semantic media shell; GSAP writes transforms onto the inner plane. */
export function CaseStudyEvidencePlane({
  id,
  children,
  className,
}: EvidencePlaneProps) {
  return (
    <div
      className={[styles.evidencePlaneShell, className].filter(Boolean).join(" ")}
      data-evidence-plane={id}
      data-evidence-plane-shell=""
    >
      <div className={styles.evidencePlaneInner} data-evidence-plane-inner="">
        {children}
      </div>
    </div>
  );
}

/** Inspect must be frontal, sharp, fully saturated (WO-031 contract). */
export function assertInspectKeyframe(frame: EvidencePlaneKeyframe): void {
  if (
    frame.rotateX !== 0 ||
    frame.z !== 0 ||
    frame.brightness !== 1 ||
    frame.saturation !== 1
  ) {
    throw new Error(
      "Evidence inspect keyframe must be rotateX=0 z=0 brightness=1 saturation=1",
    );
  }
}

export function resolveEvidenceViewport(
  width: number,
): EvidenceViewport {
  if (width <= 767) return "mobile";
  if (width <= 1023) return "tablet";
  return "desktop";
}

/**
 * Sample Variation 3's continuous formulas at enter / mid / exit, remapping
 * mid-point z from the source's deep recess to the WO inspect contract (z=0).
 */
export function variation3SampleBeat(scale: {
  rotateX: number;
  zTravel: number;
  yPercent: number;
}): EvidencePlaneBeat {
  const sample = (progress: number) => {
    const angle = progress * Math.PI;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const rotateX =
      Math.sign(cos) * Math.pow(Math.abs(cos), 0.6) * scale.rotateX;
    // Source peaks at sin^8 * -800 mid-scroll; remap so inspect lands at z=0
    // while off-axis travel still recessess along −z.
    const recess = Math.pow(Math.abs(cos), 2) * scale.zTravel;
    const z = progress === 0.5 ? 0 : -recess;
    const yPercent = Math.pow(cos, 2) * scale.yPercent;
    const tone = Math.pow(sin, 3);
    return {
      progress,
      rotateX: progress === 0.5 ? 0 : rotateX,
      z,
      yPercent: progress === 0.5 ? 0 : yPercent,
      brightness: progress === 0.5 ? 1 : Math.max(tone, 0.2),
      saturation: progress === 0.5 ? 1 : Math.max(tone, 0.15),
    } satisfies EvidencePlaneKeyframe;
  };

  const enter = sample(0);
  const inspect = sample(0.5);
  const exit = sample(1);
  assertInspectKeyframe(inspect);
  return { enter, inspect, exit };
}

export const DEFAULT_EVIDENCE_BEATS: Record<EvidenceViewport, EvidencePlaneBeat> =
  {
    desktop: variation3SampleBeat({
      rotateX: 72,
      zTravel: 420,
      yPercent: -36,
    }),
    tablet: variation3SampleBeat({
      rotateX: 48,
      zTravel: 260,
      yPercent: -24,
    }),
    mobile: variation3SampleBeat({
      rotateX: 28,
      zTravel: 120,
      yPercent: -14,
    }),
  };
