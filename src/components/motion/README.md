# Motion Runtime Contract

`MotionRuntime` is mounted once in `src/app/layout.tsx`. It owns the root Lenis
instance, its one GSAP ticker bridge, the normalized document progress value,
and the site-level `MotionConfig`. Do not mount Lenis, create a page RAF, or
subscribe to document scroll anywhere else.

## Shared scroll and reduced motion

```tsx
"use client";

import { useMotionRuntime } from "@/components/motion/motion-runtime";

function ProgressLabel() {
  const { prefersReducedMotion, scrollProgress } = useMotionRuntime();
  return <output>{prefersReducedMotion ? "still" : scrollProgress.get()}</output>;
}
```

Use `scrollProgress.on("change", listener)` inside a component effect when a
subscription is necessary, and always return its unsubscribe function. Do not
call Motion's root `useScroll`.

## Scoped GSAP scenes

```tsx
const sceneRef = useRef<HTMLElement>(null);
useSceneTimeline(
  sceneRef,
  ({ gsap, scrollProgress }) => {
    gsap.to(".scene-title", { opacity: 1, scrollTrigger: { trigger: sceneRef.current } });
    return scrollProgress.on("change", (progress) => gsap.set(".scene", { "--progress": progress }));
  },
  [],
);
```

The hook creates one `gsap.context()` scoped to the ref and reverts it,
ScrollTriggers, and the optional returned cleanup on unmount. It is the only
timeline registration API for BSMNT-style section choreography.

## WebGL slots

Use the existing manager only:

```tsx
<ManagedWebGLEffect config={config} fallback={<StaticFallback />}>
  {({ shouldAnimate }) => <Effect active={shouldAnimate} />}
</ManagedWebGLEffect>
```

The manager grants or refuses the slot based on viewport, visibility, reduced
motion, mobile policy, and budget. A refused slot must render its fallback.

## Prohibited ownership

- another `ReactLenis`, Lenis instance, scroller, root `useScroll`, page RAF, or GSAP ticker;
- direct `ScrollTrigger` setup outside `useSceneTimeline`;
- a canvas/WebGL context outside `ManagedWebGLEffect` and `WebGLManager`;
- overriding the operating-system reduced-motion preference.
