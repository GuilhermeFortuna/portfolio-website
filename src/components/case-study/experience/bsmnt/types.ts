// Adapted from https://github.com/basementstudio/scrollytelling
// commit 0c26959b106d9e81931c30af7dfeebfd83d0a379
// source path: scrollytelling/src/types/index.ts
// SHA-256: b36ae1bcb965375435b14c4064c90b6238b98442cea0aef8d30b21c314e9b47e
// Adaptation: React namespace import for RefObject under TypeScript strict.

import { gsap } from "gsap";
import type * as React from "react";

export type DataOrDataArray<T> = T | Array<T>;
export type UnitValue<Unit = string> = { value: number; unit: Unit };
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type FromToOptions =
  | { to: gsap.TweenVars; from?: never; fromTo?: never }
  | { from: gsap.TweenVars; to?: never; fromTo?: never }
  | { fromTo: [gsap.TweenVars, gsap.TweenVars]; to?: never; from?: never };

export type StartEndOptions = {
  start: number;
  end: number;
};

type TweenBaseDef = StartEndOptions & FromToOptions;

export type TweenTarget = gsap.TweenTarget | React.RefObject<HTMLElement | null>;

export type TweenWithTargetDef = TweenBaseDef & {
  target: TweenTarget;
};

export type TweenWithChildrenDef = TweenBaseDef;

export interface AnimationProps {
  tween: DataOrDataArray<TweenBaseDef | TweenWithTargetDef>;
  children?: React.ReactNode;
  disabled?: boolean;
}

export type WaypointBaseDef = {
  at: number;
  onCall?: () => void;
  onReverseCall?: () => void;
  label?: string;
  disabled?: boolean;
};

export type StaggerBaseDef = {
  overlap?: number;
  disabled?: boolean;
};

export type SimpleTween = FromToOptions & {
  duration: number;
  forwards?: boolean;
};

export type TweenVars = gsap.TweenVars;

export type Plugin = Parameters<typeof gsap.registerPlugin>[number];
