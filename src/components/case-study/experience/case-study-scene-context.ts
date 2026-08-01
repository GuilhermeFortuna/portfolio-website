"use client";

import { createContext, useContext } from "react";

import type { CaseStudySceneSnapshot } from "./case-study-scene-config";

export const CaseStudySceneContext =
  createContext<CaseStudySceneSnapshot | null>(null);

export function useCaseStudyScene(): CaseStudySceneSnapshot {
  const snapshot = useContext(CaseStudySceneContext);
  if (!snapshot) {
    throw new Error(
      "useCaseStudyScene must be used within CaseStudySceneManager.",
    );
  }
  return snapshot;
}
