"use client";

import { createContext, useContext } from "react";

import type { CaseStudySceneSnapshot } from "./case-study-scene-config";

export type CaseStudySceneContextValue = CaseStudySceneSnapshot & {
  /** True after the D-009 kinetic entrance completes (or when no entrance runs). */
  entranceComplete: boolean;
};

export const CaseStudySceneContext =
  createContext<CaseStudySceneContextValue | null>(null);

export const CaseStudyEntranceDispatchContext = createContext<
  ((complete: boolean) => void) | null
>(null);

export function useCaseStudyScene(): CaseStudySceneContextValue {
  const snapshot = useContext(CaseStudySceneContext);
  if (!snapshot) {
    throw new Error(
      "useCaseStudyScene must be used within CaseStudySceneManager.",
    );
  }
  return snapshot;
}

export function useCaseStudyEntranceDispatch(): (complete: boolean) => void {
  const dispatch = useContext(CaseStudyEntranceDispatchContext);
  if (!dispatch) {
    throw new Error(
      "useCaseStudyEntranceDispatch must be used within CaseStudySceneManager.",
    );
  }
  return dispatch;
}
