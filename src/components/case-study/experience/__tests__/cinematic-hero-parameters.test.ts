import { describe, expect, it } from "vitest";

import { resolveCinematicHeroParameters } from "../cinematic-hero-parameters";

describe("resolveCinematicHeroParameters", () => {
  it("keeps the restrained opening frame at hero progress 0", () => {
    const a = resolveCinematicHeroParameters("hero", 0);
    const b = resolveCinematicHeroParameters("hero", 0);
    expect(a).toEqual(b);
    expect(a.cylinderRotation).toBeCloseTo(0.5);
    expect(a.cameraZ).toBeGreaterThan(7);
    expect(a.arcExpansion).toBeLessThan(0.05);
    expect(a.particleEnergy).toBeLessThan(0.15);
  });

  it("increases rotation, scale, and energy through the mid hero range", () => {
    const early = resolveCinematicHeroParameters("hero", 0.2);
    const mid = resolveCinematicHeroParameters("hero", 0.5);
    expect(mid.cylinderRotation).toBeGreaterThan(early.cylinderRotation);
    expect(mid.mediaScale).toBeGreaterThan(early.mediaScale);
    expect(mid.particleEnergy).toBeGreaterThan(early.particleEnergy);
    expect(mid.cameraZ).toBeLessThan(early.cameraZ);
  });

  it("opens oversized arcs near the end of the hero scene", () => {
    const mid = resolveCinematicHeroParameters("hero", 0.5);
    const late = resolveCinematicHeroParameters("hero", 0.9);
    expect(late.arcExpansion).toBeGreaterThan(mid.arcExpansion);
    expect(late.cylinderRadius).toBeGreaterThan(mid.cylinderRadius);
  });

  it("reproduces the same frame when scrolling backward", () => {
    const forward = resolveCinematicHeroParameters("hero", 0.62);
    const back = resolveCinematicHeroParameters("hero", 0.62);
    expect(back).toEqual(forward);
  });

  it("holds the handoff state after leaving the hero scene", () => {
    const end = resolveCinematicHeroParameters("hero", 1);
    const context = resolveCinematicHeroParameters("context", 0.3);
    expect(context).toEqual(end);
  });
});
