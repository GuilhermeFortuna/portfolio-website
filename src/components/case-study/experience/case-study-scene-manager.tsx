"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import {
  usePortfolioLenis,
  usePortfolioScrollSnapshot,
} from "@/components/providers/portfolio-motion-context";

import { Root, Waypoint } from "./bsmnt";
import {
  computeSceneSnapshot,
  createFallbackSceneDefinitions,
  createInitialSceneSnapshot,
  resolveSceneBoundary,
  resolveSceneDefinitions,
  type CaseStudyLayoutMetrics,
  type CaseStudySceneBoundary,
  type CaseStudySceneDefinition,
  type CaseStudySceneSnapshot,
} from "./case-study-scene-config";
import {
  CaseStudyEntranceDispatchContext,
  CaseStudySceneContext,
} from "./case-study-scene-context";

type CaseStudySceneManagerProps = {
  scenes: readonly CaseStudySceneDefinition[];
  sectionIds: readonly string[];
  children: ReactNode;
  start?: ScrollTrigger.Vars["start"];
  end?: ScrollTrigger.Vars["end"];
};

function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && typeof ref === "object") {
        (ref as { current: T | null }).current = node;
      }
    }
  };
}

/**
 * One BSMNT root timeline for a case-study article. Owns pinning/progress/
 * labels/handoffs for D-006. Child effects (D-010 Flip aperture, later D-012+)
 * register onto this root via useScrollytelling — never a second ScrollTrigger
 * root, Lenis, RAF, Canvas, or WebGL context. Consumes the WO-025 root Lenis
 * instance — never constructs a local scroller.
 */
export function CaseStudySceneManager({
  scenes,
  sectionIds,
  children,
  start = "top top",
  end = "bottom bottom",
}: CaseStudySceneManagerProps) {
  const lenis = usePortfolioLenis();
  const portfolioScroll = usePortfolioScrollSnapshot();
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const [snapshot, setSnapshot] = useState<CaseStudySceneSnapshot>(() =>
    createInitialSceneSnapshot(scenes, sectionIds),
  );
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [sceneRanges, setSceneRanges] = useState(() =>
    createFallbackSceneDefinitions(scenes),
  );
  const [layoutRevision, setLayoutRevision] = useState(0);

  const scenesRef = useRef(scenes);
  const sectionIdsRef = useRef(sectionIds);
  const scrollRef = useRef(portfolioScroll);
  const articleProgressRef = useRef(0);
  const metricsRef = useRef<CaseStudyLayoutMetrics | null>(null);
  const signatureRef = useRef("");
  const sceneRangesRef = useRef(sceneRanges);

  useEffect(() => {
    sceneRangesRef.current = sceneRanges;
  }, [sceneRanges]);

  useEffect(() => {
    scenesRef.current = scenes;
    sectionIdsRef.current = sectionIds;
  }, [scenes, sectionIds]);

  useEffect(() => {
    scrollRef.current = portfolioScroll;
  }, [portfolioScroll]);

  const publish = useCallback((articleProgress: number) => {
    articleProgressRef.current = articleProgress;
    const scrollY =
      scrollRef.current.scroll ||
      (typeof window !== "undefined" ? window.scrollY : 0);
    const viewportHeight =
      typeof window !== "undefined" ? window.innerHeight : 1;
    setSnapshot(
      computeSceneSnapshot(
        sceneRangesRef.current,
        sectionIdsRef.current,
        articleProgress,
        scrollY,
        viewportHeight,
      ),
    );
  }, []);

  const measureLayout = useCallback(() => {
    if (!trigger || typeof window === "undefined") return;
    const scrollY = window.scrollY;
    const articleRect = trigger.getBoundingClientRect();
    if (articleRect.height <= 0 || articleRect.bottom <= articleRect.top) return;
    const sections: Record<string, { top: number; height: number }> = {};
    for (const id of sectionIdsRef.current) {
      const element = document.getElementById(id);
      if (!element) continue;
      const rect = element.getBoundingClientRect();
      sections[id] = {
        top: rect.top + scrollY,
        height: Math.max(rect.height || element.offsetHeight, 1),
      };
    }
    const metrics: CaseStudyLayoutMetrics = {
      articleTop: articleRect.top + scrollY,
      articleEnd: articleRect.bottom + scrollY,
      viewportHeight: window.innerHeight,
      sections,
    };
    const signature = JSON.stringify(metrics);
    metricsRef.current = metrics;
    if (signature === signatureRef.current) return;
    signatureRef.current = signature;
    const nextRanges = resolveSceneDefinitions(scenesRef.current, metrics);
    sceneRangesRef.current = nextRanges;
    setSceneRanges(nextRanges);
    setLayoutRevision((revision) => revision + 1);
    publish(articleProgressRef.current);
  }, [publish, trigger]);

  const refreshLayout = useCallback(() => {
    measureLayout();
    ScrollTrigger.refresh();
  }, [measureLayout]);

  const resolveBoundary = useCallback(
    (boundary: CaseStudySceneBoundary) => {
      if (!metricsRef.current) return null;
      return resolveSceneBoundary(boundary, metricsRef.current);
    },
    [],
  );

  const contextValue = useMemo(
    () => ({
      ...snapshot,
      entranceComplete,
      sceneRanges,
      layoutRevision,
      resolveBoundary,
      refreshLayout,
    }),
    [
      snapshot,
      entranceComplete,
      sceneRanges,
      layoutRevision,
      resolveBoundary,
      refreshLayout,
    ],
  );

  const callbacks = useMemo(
    () => ({
      onUpdate: (self: ScrollTrigger) => {
        publish(self.progress);
      },
      onRefresh: (self: ScrollTrigger) => {
        publish(self.progress);
      },
    }),
    [publish],
  );

  useEffect(() => {
    if (!lenis) return;
    refreshLayout();
  }, [lenis, refreshLayout]);

  useEffect(() => {
    publish(articleProgressRef.current);
  }, [portfolioScroll.scroll, portfolioScroll.limit, publish]);

  useLayoutEffect(() => {
    measureLayout();
  }, [measureLayout]);

  useEffect(() => {
    const onResize = refreshLayout;
    window.addEventListener("resize", onResize);
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => measureLayout());
    if (trigger) observer?.observe(trigger);
    return () => {
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [measureLayout, refreshLayout, trigger]);

  const child = Children.only(children);
  if (!isValidElement(child)) {
    throw new Error(
      "CaseStudySceneManager expects a single element child (typically CaseStudyShell).",
    );
  }

  const shell = cloneElement(child as ReactElement<{ ref?: Ref<HTMLElement> }>, {
    ref: composeRefs(
      (child as ReactElement<{ ref?: Ref<HTMLElement> }>).props.ref,
      setTrigger,
    ),
  });

  return (
    <CaseStudyEntranceDispatchContext.Provider value={setEntranceComplete}>
      <CaseStudySceneContext.Provider value={contextValue}>
        <Root
          trigger={trigger}
          disabled={!trigger}
          start={start}
          end={end}
          scrub
          callbacks={callbacks}
          defaults={{ ease: "none" }}
        >
          {sceneRanges.map((scene) => (
            <Waypoint
              key={scene.id}
              at={scene.start}
              label={`scene:${scene.id}`}
            />
          ))}
          {shell}
        </Root>
      </CaseStudySceneContext.Provider>
    </CaseStudyEntranceDispatchContext.Provider>
  );
}
