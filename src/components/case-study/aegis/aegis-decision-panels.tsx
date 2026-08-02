"use client";

import type { ReactNode } from "react";

import {
  CaseStudyDecisionPanel,
  type DecisionComposition,
} from "@/components/case-study/experience/case-study-decision-panel";
import { CaseStudyDecisionPanels } from "@/components/case-study/experience/case-study-decision-panels";

type AegisDecisionPanelsProps = {
  children: ReactNode;
};

/**
 * Aegis adapter host for D-012 decision-panel choreography. Supplies no Aegis
 * visual skin — only the shared sequence root.
 */
export function AegisDecisionPanels({ children }: AegisDecisionPanelsProps) {
  return <CaseStudyDecisionPanels>{children}</CaseStudyDecisionPanels>;
}

export { CaseStudyDecisionPanel };
export type { DecisionComposition };
