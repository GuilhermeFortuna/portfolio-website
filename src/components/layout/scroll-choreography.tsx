"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { useSceneTimeline } from "@/components/motion/motion-runtime";

type ScrollChoreographyProps = {
  children: ReactNode;
};

type DocumentWithFonts = Document & {
  fonts?: FontFaceSet;
};

/**
 * Owns the page-level connective tissue. Semantic content always starts in its
 * settled, readable state; the timeline only adds restrained spatial movement
 * to chapter introductions, Process geometry, and Contact atmosphere.
 */
export function ScrollChoreography({ children }: ScrollChoreographyProps) {
  const mainRef = useRef<HTMLElement>(null);

  useSceneTimeline(
    mainRef,
    ({ gsap, ScrollTrigger }) => {
      const main = mainRef.current;
      if (!main) {
        return;
      }

      const matchMedia = gsap.matchMedia();

      matchMedia.add("(min-width: 768px)", () => {
        const sceneIntroductions = gsap.utils.toArray<HTMLElement>(
          "[data-scene-intro]",
          main,
        );

        for (const introduction of sceneIntroductions) {
          gsap.fromTo(
            introduction,
            { y: 42 },
            {
              y: 0,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: introduction,
                start: "top 92%",
                end: "top 58%",
                scrub: 0.45,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        const processStages = gsap.utils.toArray<HTMLElement>(
          "[data-process-stage]",
          main,
        );

        for (const [index, stage] of processStages.entries()) {
          const line = stage.querySelector<HTMLElement>("[data-process-line]");

          gsap.fromTo(
            stage,
            { xPercent: index % 2 === 0 ? -5 : 5 },
            {
              xPercent: 0,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: stage,
                start: "top 92%",
                end: "top 56%",
                scrub: 0.4,
                invalidateOnRefresh: true,
              },
            },
          );

          if (line) {
            gsap.fromTo(
              line,
              { scaleX: 0.12 },
              {
                scaleX: 1,
                transformOrigin: index % 2 === 0 ? "left center" : "right center",
                ease: "none",
                immediateRender: false,
                scrollTrigger: {
                  trigger: stage,
                  start: "top 88%",
                  end: "top 54%",
                  scrub: 0.35,
                  invalidateOnRefresh: true,
                },
              },
            );
          }
        }
      });

      matchMedia.add("(max-width: 767px)", () => {
        const processStages = gsap.utils.toArray<HTMLElement>(
          "[data-process-stage]",
          main,
        );

        for (const stage of processStages) {
          const line = stage.querySelector<HTMLElement>("[data-process-line]");
          if (!line) {
            continue;
          }

          gsap.fromTo(
            line,
            { scaleX: 0.2 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: stage,
                start: "top 92%",
                end: "top 66%",
                scrub: 0.3,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      });

      const contact = main.querySelector<HTMLElement>("#contact");
      const contactHorizon = contact?.querySelector<HTMLElement>(
        "[data-contact-horizon]",
      );

      if (contact && contactHorizon) {
        gsap.fromTo(
          contactHorizon,
          { autoAlpha: 0.35, yPercent: 12 },
          {
            autoAlpha: 1,
            yPercent: 0,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: contact,
              start: "top bottom",
              end: "top 48%",
              scrub: 0.45,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      let firstFrame = 0;
      let secondFrame = 0;
      let disposed = false;

      const refresh = () => {
        window.cancelAnimationFrame(firstFrame);
        window.cancelAnimationFrame(secondFrame);
        firstFrame = window.requestAnimationFrame(() => {
          secondFrame = window.requestAnimationFrame(() => {
            if (!disposed) {
              ScrollTrigger.refresh();
              ScrollTrigger.update();
            }
          });
        });
      };

      window.addEventListener("hashchange", refresh);
      window.addEventListener("pageshow", refresh);
      window.addEventListener("popstate", refresh);
      window.addEventListener("resize", refresh, { passive: true });

      const fonts = (document as DocumentWithFonts).fonts;
      void fonts?.ready.then(refresh);
      refresh();

      return () => {
        disposed = true;
        window.cancelAnimationFrame(firstFrame);
        window.cancelAnimationFrame(secondFrame);
        window.removeEventListener("hashchange", refresh);
        window.removeEventListener("pageshow", refresh);
        window.removeEventListener("popstate", refresh);
        window.removeEventListener("resize", refresh);
        matchMedia.revert();
      };
    },
    [],
  );

  return (
    <main id="main-content" ref={mainRef} tabIndex={-1}>
      {children}
    </main>
  );
}
