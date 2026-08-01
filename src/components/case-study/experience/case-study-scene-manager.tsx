"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
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
  createInitialSceneSnapshot,
  parseSceneBoundary,
  type CaseStudySceneDefinition,
  type CaseStudySceneSnapshot,
} from "./case-study-scene-config";
import { CaseStudySceneContext } from "./case-study-scene-context";

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
 * One BSMNT root timeline for a case-study article. Enhances hydrated DOM with
 * inert scene waypoints; does not pin, animate, or alter server markup order.
 * Consumes the WO-025 root Lenis instance — never constructs a local scroller.
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

  const scenesRef = useRef(scenes);
  const sectionIdsRef = useRef(sectionIds);
  const scrollRef = useRef(portfolioScroll);
  const articleProgressRef = useRef(0);

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
        scenesRef.current,
        sectionIdsRef.current,
        articleProgress,
        scrollY,
        viewportHeight,
      ),
    );
  }, []);

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
    ScrollTrigger.refresh();
  }, [lenis]);

  useEffect(() => {
    publish(articleProgressRef.current);
  }, [portfolioScroll.scroll, portfolioScroll.limit, publish]);

  useEffect(() => {
    const onResize = () => {
      ScrollTrigger.refresh();
      publish(articleProgressRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [publish]);

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
    <CaseStudySceneContext.Provider value={snapshot}>
      <Root
        trigger={trigger}
        disabled={!trigger}
        start={start}
        end={end}
        scrub
        callbacks={callbacks}
        defaults={{ ease: "none" }}
      >
        {scenes.map((scene) => (
          <Waypoint
            key={scene.id}
            at={parseSceneBoundary(scene.start)}
            label={`scene:${scene.id}`}
          />
        ))}
        {shell}
      </Root>
    </CaseStudySceneContext.Provider>
  );
}
