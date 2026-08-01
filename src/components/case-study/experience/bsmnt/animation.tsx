// Adapted from https://github.com/basementstudio/scrollytelling
// commit 0c26959b106d9e81931c30af7dfeebfd83d0a379
// source path: scrollytelling/src/components/animation/index.tsx
// SHA-256: a5c47ec7ed00d4a513d198aa1f25a5ea26338f1e2b2609f290250f8301e98139
// Adaptation: local Slot; local import paths; React 19 ref typing.

"use client";

import * as React from "react";

import { useDispatcher, useScrollytelling } from "./context";
import { Slot } from "./slot";
import type {
  AnimationProps,
  DataOrDataArray,
  TweenWithChildrenDef,
  TweenWithTargetDef,
} from "./types";
import { buildDeclarativeTween, getTweenTarget } from "./util";

export function Animation(props: {
  tween: DataOrDataArray<TweenWithTargetDef>;
  disabled?: boolean;
}): null;

export function Animation(props: {
  children: React.ReactNode;
  tween: DataOrDataArray<TweenWithChildrenDef>;
  disabled?: boolean;
}): React.ReactElement;

export function Animation({
  tween,
  children,
  disabled = false,
}: AnimationProps): React.ReactElement | null {
  const ref = React.useRef<HTMLElement>(null);
  const id = React.useId();

  const { timeline } = useScrollytelling();
  const { getTimelineSpace } = useDispatcher();

  React.useEffect(() => {
    if (!timeline || !tween || disabled) return;

    const addTweenToTimeline = (
      tweenDef: TweenWithChildrenDef | TweenWithTargetDef,
    ) => {
      const tweenTarget = getTweenTarget({
        targetContainer: "target" in tweenDef ? tweenDef : {},
        ref,
      });
      if (tweenTarget) {
        const timelineSpace = getTimelineSpace({
          start: tweenDef.start,
          end: tweenDef.end,
        });
        if (!timelineSpace) return;
        const cleanup = buildDeclarativeTween({
          id,
          timeline,
          op: tweenDef,
          target: tweenTarget,
          duration: timelineSpace.duration,
          position: timelineSpace.position,
        });

        return () => {
          cleanup();
          timelineSpace.cleanup();
        };
      }
      return () => undefined;
    };

    if (Array.isArray(tween)) {
      const cleanupTweens = tween.map((tweenDef) => {
        return addTweenToTimeline(tweenDef);
      });
      return () => {
        cleanupTweens.forEach((cleanup) => cleanup?.());
      };
    }
    const cleanup = addTweenToTimeline(tween);
    return () => {
      cleanup?.();
    };
  }, [getTimelineSpace, id, tween, timeline, disabled]);

  if (children) {
    return <Slot ref={ref}>{children}</Slot>;
  }
  return null;
}
