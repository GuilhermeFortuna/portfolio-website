"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { CaseStudySceneId } from "./case-study-scene-config";

const CaseStudySceneIdContext = createContext<CaseStudySceneId | null>(null);

/**
 * Marks a scene region without introducing wrapper DOM. Children stay in the
 * server-rendered order; later orders register animations inside this boundary.
 */
export function CaseStudyScene({
  id,
  children,
}: {
  id: CaseStudySceneId;
  children: ReactNode;
}) {
  return (
    <CaseStudySceneIdContext.Provider value={id}>
      {children}
    </CaseStudySceneIdContext.Provider>
  );
}

export function useCaseStudySceneId(): CaseStudySceneId | null {
  return useContext(CaseStudySceneIdContext);
}
