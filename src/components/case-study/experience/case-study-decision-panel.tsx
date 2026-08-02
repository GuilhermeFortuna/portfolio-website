// Adapted from https://21st.dev/@boudjadjasamira/components/story-scroll
// capture 2026-07-31 via 21st.dev get_component id 12461
// source path: d012-story-scroll.component.tsx — FlowSection (lines 1–134)
// SHA-256 (WO-024): ab4a1e7f278bee29a419bd170729640be65383746bd6188db69c423009f633ec
// Adaptation: sticky panel shell with bottom-left transform origin and
// decorative index only. Source FlowArt ScrollTriggers, useGSAP, document
// <main> owner, reduced-motion gate, and demo palette/copy removed. Motion
// registration lives in case-study-decision-panels.tsx under D-006.

import type { ReactNode } from "react";

import styles from "./case-study-experience.module.css";

export type DecisionComposition =
  | "declaration"
  | "contrast"
  | "evidenceStage"
  | "identityVideo";

const DECISION_COMPOSITIONS = [
  "declaration",
  "contrast",
  "evidenceStage",
  "identityVideo",
] as const satisfies readonly DecisionComposition[];

export function decisionCompositionForIndex(
  index: number,
): DecisionComposition {
  return DECISION_COMPOSITIONS[index] ?? "declaration";
}

export type CaseStudyDecisionPanelProps = {
  /** Zero-based index within the decision sequence. */
  index: number;
  composition: DecisionComposition;
  children: ReactNode;
  className?: string;
};

/**
 * One decision chapter shell. Sticky stacking + transform origin reproduce the
 * D-012 pin/overlap frame; rotation is owned by CaseStudyDecisionPanels.
 */
export function CaseStudyDecisionPanel({
  index,
  composition,
  children,
  className,
}: CaseStudyDecisionPanelProps) {
  const numeral = String(index + 1).padStart(2, "0");

  return (
    <div
      className={[styles.decisionPanel, className].filter(Boolean).join(" ")}
      data-decision-panel=""
      data-decision-composition={composition}
      data-decision-index={String(index)}
      style={{ zIndex: index + 1 }}
    >
      <div
        className={styles.decisionInner}
        data-decision-inner=""
        style={{ transformOrigin: "bottom left" }}
      >
        <span className={styles.decisionNumeral} aria-hidden="true">
          {numeral}
        </span>
        <div
          className={styles.decisionBody}
          data-decision-body=""
          data-decision-composition={composition}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
