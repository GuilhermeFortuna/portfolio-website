// Adapted from https://magicui.design/docs/components/light-rays
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

export type AmbientRaysProps = {
  className?: string;
  style?: CSSProperties;
  count?: number;
  /** Any CSS color; token `var(...)` references are supported. */
  color?: string;
  blur?: number;
  /** Seconds per swing/breathe cycle. */
  speed?: number;
  length?: string;
  /** Seed for the ray layout, so server and client render the same field. */
  seed?: number;
};

type Ray = {
  left: number;
  rotate: number;
  width: number;
  swing: number;
  delay: number;
  duration: number;
  intensity: number;
};

/** Small deterministic PRNG (mulberry32); replaces `Math.random` for SSR parity. */
function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createAmbientRays(count: number, cycle: number, seed: number): Ray[] {
  const random = createRandom(seed);
  return Array.from({ length: Math.max(0, count) }, () => ({
    left: 8 + random() * 84,
    rotate: -28 + random() * 56,
    width: 160 + random() * 160,
    swing: 0.8 + random() * 1.8,
    delay: random() * cycle,
    duration: cycle * (0.75 + random() * 0.5),
    intensity: 0.6 + random() * 0.5,
  }));
}

export function AmbientRays({
  className,
  style,
  count = 7,
  color = "rgba(160, 210, 255, 0.2)",
  blur = 36,
  speed = 14,
  length = "70vh",
  seed = 7,
}: AmbientRaysProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const rays = createAmbientRays(count, Math.max(speed, 0.1), seed);

  return (
    <div
      aria-hidden="true"
      data-ambient-rays
      data-motion={reduceMotion ? "static" : "animated"}
      className={cn("pointer-events-none absolute inset-0 isolate overflow-hidden", className)}
      style={
        {
          "--ambient-rays-color": color,
          "--ambient-rays-blur": `${blur}px`,
          "--ambient-rays-length": length,
          ...style,
        } as CSSProperties
      }
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, color-mix(in srgb, var(--ambient-rays-color) 45%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 80% 10%, color-mix(in srgb, var(--ambient-rays-color) 35%, transparent), transparent 75%)",
        }}
      />
      {rays.map((ray, index) => (
        <motion.div
          key={index}
          data-ambient-ray
          className="absolute -top-[12%] origin-top -translate-x-1/2 rounded-full mix-blend-screen"
          style={{
            left: `${ray.left}%`,
            width: `${ray.width}px`,
            height: "var(--ambient-rays-length)",
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--ambient-rays-color) 70%, transparent), transparent)",
            filter: "blur(var(--ambient-rays-blur))",
          }}
          initial={
            reduceMotion
              ? { rotate: ray.rotate, opacity: ray.intensity * 0.6 }
              : { rotate: ray.rotate, opacity: 0 }
          }
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0, ray.intensity, 0],
                  rotate: [ray.rotate - ray.swing, ray.rotate + ray.swing, ray.rotate - ray.swing],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: ray.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: ray.delay,
                  repeatDelay: ray.duration * 0.1,
                }
          }
        />
      ))}
    </div>
  );
}
