"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

/**
 * Central arbiter for every WebGL effect on the page, per section 9 of the
 * implementation specification. Effects never read the environment themselves:
 * they register a cost and report near/visible state, and the registry decides
 * whether a context may be held and at which device pixel ratio.
 */

export type WebGLEffectId =
  | "line-waves"
  | "liquid-metal"
  | "liquid-metal-github"
  | "dotted-surface";

export type WebGLEffectConfig = {
  id: WebGLEffectId;
  priority: "hero" | "decorative";
  estimatedCost: "low" | "medium" | "high";
  continuous: boolean;
  allowMobile: boolean;
};

export type WebGLEffectState = {
  /** Near the viewport, allowed, and granted a budget slot. */
  shouldMount: boolean;
  /** Mounted, actually visible, document-visible, and continuous. */
  shouldAnimate: boolean;
  dpr: number;
  pointerEnabled: boolean;
  isMobile: boolean;
};

const MOBILE_QUERY = "(max-width: 767px)";
const FINE_POINTER_QUERY = "(pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const MOBILE_DPR_CAP = 1.25;
const DESKTOP_DPR_CAP = 1.5;

const COST_UNITS: Record<WebGLEffectConfig["estimatedCost"], number> = {
  low: 1,
  medium: 2,
  high: 3,
};
const PRIORITY_RANK: Record<WebGLEffectConfig["priority"], number> = {
  hero: 0,
  decorative: 1,
};

/**
 * Raised from the specification's original 4 by owner decision on 2026-07-30. At
 * 4 units the hero effects held the whole budget while the project stage was
 * already on screen, so Shape Blur never mounted at a normal reading position.
 * Later raised to 8 so both hero Liquid Metal links (1 each) can sit with Line
 * Waves (3) and Shape Blur (3) when all are near the viewport.
 */
const DESKTOP_COST_BUDGET = 8;
/**
 * The specification states a mobile budget of 2 while also fixing Line Waves as
 * a `high` (3 unit) effect that runs on mobile in simplified form. The fixed
 * registration table is treated as authoritative, so the mobile budget admits
 * exactly one high-cost hero effect and nothing else.
 */
const MOBILE_COST_BUDGET = 3;

const DENIED_STATE: WebGLEffectState = {
  shouldMount: false,
  shouldAnimate: false,
  dpr: 1,
  pointerEnabled: false,
  isMobile: false,
};

type Registration = {
  config: WebGLEffectConfig;
  order: number;
  near: boolean;
  visible: boolean;
};

type WebGlRegistry = {
  register: (config: WebGLEffectConfig) => () => void;
  setNear: (id: WebGLEffectId, near: boolean) => void;
  setVisible: (id: WebGLEffectId, visible: boolean) => void;
  getState: (id: WebGLEffectId) => WebGLEffectState;
  subscribe: (listener: () => void) => () => void;
  refreshEnvironment: () => void;
};

function matches(query: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia(query).matches;
}

let webglSupportCache: boolean | null = null;

function canCreateWebGl(): boolean {
  if (typeof document === "undefined") {
    return false;
  }
  if (webglSupportCache === null) {
    try {
      const canvas = document.createElement("canvas");
      webglSupportCache = Boolean(
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl"),
      );
    } catch {
      webglSupportCache = false;
    }
  }
  return webglSupportCache;
}

/** Shared resolution cap, so no effect invents its own DPR policy. */
export function resolveWebGlDpr(): number {
  if (typeof window === "undefined") {
    return 1;
  }
  const cap = matches(MOBILE_QUERY) ? MOBILE_DPR_CAP : DESKTOP_DPR_CAP;
  return Math.min(window.devicePixelRatio || 1, cap);
}

function readEnvironment() {
  const isMobile = matches(MOBILE_QUERY);
  return {
    isMobile,
    motionAllowed: !matches(REDUCED_MOTION_QUERY) && canCreateWebGl(),
    documentVisible:
      typeof document === "undefined"
        ? false
        : document.visibilityState === "visible",
    dpr: resolveWebGlDpr(),
    pointerEnabled: !isMobile && matches(FINE_POINTER_QUERY),
  };
}

function sameState(a: WebGLEffectState, b: WebGLEffectState): boolean {
  return (
    a.shouldMount === b.shouldMount &&
    a.shouldAnimate === b.shouldAnimate &&
    a.dpr === b.dpr &&
    a.pointerEnabled === b.pointerEnabled &&
    a.isMobile === b.isMobile
  );
}

function createWebGlRegistry(): WebGlRegistry {
  const registrations = new Map<WebGLEffectId, Registration>();
  const states = new Map<WebGLEffectId, WebGLEffectState>();
  const listeners = new Set<() => void>();
  let registrationCounter = 0;

  function recompute(): void {
    const environment = readEnvironment();
    const budget = environment.isMobile
      ? MOBILE_COST_BUDGET
      : DESKTOP_COST_BUDGET;

    const ordered = [...registrations.values()].sort((a, b) => {
      const byPriority =
        PRIORITY_RANK[a.config.priority] - PRIORITY_RANK[b.config.priority];
      return byPriority === 0 ? a.order - b.order : byPriority;
    });

    let spent = 0;
    let changed = false;

    for (const registration of ordered) {
      const { config } = registration;
      const cost = COST_UNITS[config.estimatedCost];
      const allowed =
        environment.motionAllowed &&
        registration.near &&
        (config.allowMobile || !environment.isMobile);

      let granted = false;
      if (allowed && spent + cost <= budget) {
        granted = true;
        spent += cost;
      }

      const next: WebGLEffectState = {
        shouldMount: granted,
        shouldAnimate:
          granted &&
          config.continuous &&
          registration.visible &&
          environment.documentVisible,
        dpr: environment.dpr,
        pointerEnabled: environment.pointerEnabled,
        isMobile: environment.isMobile,
      };

      const previous = states.get(config.id);
      if (!previous || !sameState(previous, next)) {
        states.set(config.id, next);
        changed = true;
      }
    }

    if (changed) {
      for (const listener of listeners) {
        listener();
      }
    }
  }

  return {
    register(config) {
      registrationCounter += 1;
      registrations.set(config.id, {
        config,
        order: registrationCounter,
        near: false,
        visible: false,
      });
      recompute();

      return () => {
        registrations.delete(config.id);
        states.delete(config.id);
        recompute();
      };
    },
    setNear(id, near) {
      const registration = registrations.get(id);
      if (!registration || registration.near === near) {
        return;
      }
      registration.near = near;
      recompute();
    },
    setVisible(id, visible) {
      const registration = registrations.get(id);
      if (!registration || registration.visible === visible) {
        return;
      }
      registration.visible = visible;
      recompute();
    },
    getState(id) {
      return states.get(id) ?? DENIED_STATE;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    refreshEnvironment: recompute,
  };
}

const WebGlRegistryContext = createContext<WebGlRegistry | null>(null);

export function WebGLManager({ children }: { children: ReactNode }) {
  const [registry] = useState(createWebGlRegistry);

  useEffect(() => {
    const refresh = () => registry.refreshEnvironment();
    const queries = [
      MOBILE_QUERY,
      FINE_POINTER_QUERY,
      REDUCED_MOTION_QUERY,
    ].map((query) => window.matchMedia(query));

    for (const query of queries) {
      query.addEventListener("change", refresh);
    }
    window.addEventListener("resize", refresh);
    document.addEventListener("visibilitychange", refresh);
    refresh();

    return () => {
      for (const query of queries) {
        query.removeEventListener("change", refresh);
      }
      window.removeEventListener("resize", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [registry]);

  return (
    <WebGlRegistryContext.Provider value={registry}>
      {children}
    </WebGlRegistryContext.Provider>
  );
}

function getServerState(): WebGLEffectState {
  return DENIED_STATE;
}

/**
 * Registers an effect for its lifetime and returns the manager's current
 * decision for it. Intended for `ManagedWebGLEffect`, not for effect files.
 */
export function useWebGlEffect(config: WebGLEffectConfig): {
  state: WebGLEffectState;
  setNear: (near: boolean) => void;
  setVisible: (visible: boolean) => void;
} {
  const registry = useContext(WebGlRegistryContext);
  if (!registry) {
    throw new Error(
      "A WebGL effect was mounted outside WebGLManager. Wrap the application in <WebGLManager>.",
    );
  }

  const { id, priority, estimatedCost, continuous, allowMobile } = config;

  useEffect(
    () => registry.register({ id, priority, estimatedCost, continuous, allowMobile }),
    [registry, id, priority, estimatedCost, continuous, allowMobile],
  );

  const state = useSyncExternalStore(
    registry.subscribe,
    () => registry.getState(id),
    getServerState,
  );

  return {
    state,
    setNear: (near: boolean) => registry.setNear(id, near),
    setVisible: (visible: boolean) => registry.setVisible(id, visible),
  };
}
