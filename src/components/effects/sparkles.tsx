// Adapted from https://21st.dev/@manuarora700/components/sparkles
"use client";

import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from "react";

import { useEffectActivity } from "@/hooks/use-effect-activity";
import { cn } from "@/lib/cn";

type SparklesCoreProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

function SparklesCore({
  id = "selected-work-sparkles",
  className,
  background = "transparent",
  minSize = 0.3,
  maxSize = 0.8,
  speed = 0.15,
  particleColor = "#8EA0FF",
  particleDensity = 160,
}: SparklesCoreProps) {
  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: {
        enable: false,
        zIndex: 1,
      },
      background: {
        color: {
          value: background,
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: false,
          },
        },
        modes: {},
      },
      particles: {
        color: {
          value: particleColor,
        },
        links: {
          enable: false,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: false,
          speed,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: particleDensity,
        },
        opacity: {
          value: {
            min: 0.1,
            max: 0.45,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: {
            min: minSize,
            max: maxSize,
          },
        },
      },
      detectRetina: true,
    }),
    [
      background,
      maxSize,
      minSize,
      particleColor,
      particleDensity,
      speed,
    ],
  );

  return (
    <Particles
      id={id}
      className={cn("h-full w-full", className)}
      style={{ opacity: 0.55 }}
      options={options}
    />
  );
}

function StaticSparklesFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at center, color-mix(in srgb, var(--color-accent-a) 16%, transparent) 0%, transparent 68%)",
      }}
    />
  );
}

export type SparklesAccentProps = {
  className?: string;
};

export function SparklesAccent({
  className,
}: SparklesAccentProps): ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const active = useEffectActivity(wrapperRef);
  const [failed, setFailed] = useState(false);

  const init = useCallback(async (engine: Engine) => {
    try {
      await loadSlim(engine);
    } catch (error) {
      setFailed(true);
      throw error;
    }
  }, []);

  const showParticles = active && !failed;

  return (
    <div
      ref={wrapperRef}
      className={cn("pointer-events-none relative h-full w-full", className)}
    >
      <StaticSparklesFallback />
      {showParticles ? (
        <ParticlesProvider init={init}>
          <SparklesCore
            id="selected-work-sparkles"
            background="transparent"
            minSize={0.3}
            maxSize={0.8}
            particleDensity={160}
            particleColor="#8EA0FF"
            speed={0.15}
            className="absolute inset-0 z-[1] h-full w-full"
          />
        </ParticlesProvider>
      ) : null}
    </div>
  );
}
