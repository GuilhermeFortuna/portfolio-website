"use client";

import type Lenis from "lenis";
import { createContext, useContext, useSyncExternalStore } from "react";

export type PortfolioScrollSnapshot = {
  scroll: number;
  limit: number;
  velocity: number;
  direction: 1 | -1 | 0;
  progress: number;
};

export const EMPTY_SCROLL_SNAPSHOT: PortfolioScrollSnapshot = {
  scroll: 0,
  limit: 0,
  velocity: 0,
  direction: 0,
  progress: 0,
};

export type PortfolioMotionStore = {
  getLenis: () => Lenis | null;
  subscribeLenis: (onStoreChange: () => void) => () => void;
  getSnapshot: () => PortfolioScrollSnapshot;
  getServerSnapshot: () => PortfolioScrollSnapshot;
  subscribeSnapshot: (onStoreChange: () => void) => () => void;
};

export const PortfolioMotionContext =
  createContext<PortfolioMotionStore | null>(null);

function usePortfolioMotionStore(): PortfolioMotionStore {
  const store = useContext(PortfolioMotionContext);
  if (!store) {
    throw new Error(
      "Portfolio motion hooks require PortfolioMotionProvider. Wrap the application in <PortfolioMotionProvider>.",
    );
  }
  return store;
}

/** Root Lenis instance. Case-study scenes (D-006) must consume this — never `new Lenis`. */
export function usePortfolioLenis(): Lenis | null {
  const store = usePortfolioMotionStore();
  return useSyncExternalStore(
    store.subscribeLenis,
    store.getLenis,
    () => null,
  );
}

/** Shared scroll snapshot updated by the root Lenis → GSAP bridge. */
export function usePortfolioScrollSnapshot(): PortfolioScrollSnapshot {
  const store = usePortfolioMotionStore();
  return useSyncExternalStore(
    store.subscribeSnapshot,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}

export function createPortfolioMotionStore(): PortfolioMotionStore & {
  setLenis: (lenis: Lenis | null) => void;
  writeSnapshotFromLenis: (lenis: Lenis) => void;
  reset: () => void;
} {
  let lenis: Lenis | null = null;
  let snapshot: PortfolioScrollSnapshot = EMPTY_SCROLL_SNAPSHOT;
  const lenisListeners = new Set<() => void>();
  const snapshotListeners = new Set<() => void>();

  function emit(listeners: Set<() => void>) {
    for (const listener of listeners) {
      listener();
    }
  }

  return {
    getLenis: () => lenis,
    subscribeLenis: (onStoreChange) => {
      lenisListeners.add(onStoreChange);
      return () => {
        lenisListeners.delete(onStoreChange);
      };
    },
    getSnapshot: () => snapshot,
    getServerSnapshot: () => EMPTY_SCROLL_SNAPSHOT,
    subscribeSnapshot: (onStoreChange) => {
      snapshotListeners.add(onStoreChange);
      return () => {
        snapshotListeners.delete(onStoreChange);
      };
    },
    setLenis(next) {
      if (lenis === next) {
        return;
      }
      lenis = next;
      emit(lenisListeners);
    },
    writeSnapshotFromLenis(instance) {
      const next: PortfolioScrollSnapshot = {
        scroll: instance.scroll,
        limit: instance.limit,
        velocity: instance.velocity,
        direction: instance.direction,
        progress: instance.progress,
      };
      if (
        snapshot.scroll === next.scroll &&
        snapshot.limit === next.limit &&
        snapshot.velocity === next.velocity &&
        snapshot.direction === next.direction &&
        snapshot.progress === next.progress
      ) {
        return;
      }
      snapshot = next;
      emit(snapshotListeners);
    },
    reset() {
      lenis = null;
      snapshot = EMPTY_SCROLL_SNAPSHOT;
      emit(lenisListeners);
      emit(snapshotListeners);
    },
  };
}
