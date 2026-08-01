// Adapted from https://github.com/basementstudio/scrollytelling
// commit 0c26959b106d9e81931c30af7dfeebfd83d0a379
// source path: scrollytelling/src/context/index.tsx
// SHA-256: fbde6a5436b2b3482fb4886df4d03b31c9c75b95eaff5f030e2d478a92c38604
// Adaptation: import paths; RefObject nullability for React 19.

"use client";

import gsap from "gsap";
import * as React from "react";

import type { Emitter } from "./emitter";

export type ScrollytellingContextType = {
  timeline: gsap.core.Timeline | undefined;
  rootRef: React.RefObject<HTMLDivElement | null>;
  events: Emitter;
};

export const ScrollytellingContext = React.createContext<
  undefined | ScrollytellingContextType
>(undefined);

export const useScrollytelling = () => {
  const scrollytelling = React.useContext(ScrollytellingContext);
  if (!scrollytelling) {
    throw new Error(
      "useScrollytelling must be used within a Scrollytelling.Root",
    );
  }
  return scrollytelling;
};

export type ScrollytellingDispatchersContextType = {
  getTimelineSpace: (params: { start: number; end: number }) => {
    duration: number;
    position: number;
    cleanup: () => void;
  } | null;
  scopedQuerySelector: gsap.utils.SelectorFunc | undefined;
};

export const ScrollytellingDispatchersContext = React.createContext<
  undefined | ScrollytellingDispatchersContextType
>(undefined);

export const useDispatcher = () => {
  const dispatcher = React.useContext(ScrollytellingDispatchersContext);
  if (!dispatcher) {
    throw new Error("useDispatcher must be used within a ScrollytellingRoot");
  }
  return dispatcher;
};
