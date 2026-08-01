// Adapted from https://github.com/basementstudio/scrollytelling
// commit 0c26959b106d9e81931c30af7dfeebfd83d0a379
// source path: scrollytelling/src/util/merge-refs.ts
// (supporting util for local Slot; not in the D-006 hash table)

import type * as React from "react";

export function mergeRefs<T = unknown>(
  refs: Array<
    React.MutableRefObject<T> | React.LegacyRef<T> | React.ForwardedRef<T>
  >,
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
