import { describe, expect, it } from "vitest";

import { resolveCinematicHeroParameters } from "../cinematic-hero-parameters";
import {
  DEFAULT_PARTICLE_CONFIG,
  resolveParticleUserData,
} from "../reactive-particle-field";

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

  it("starts restrained cylinder motion before the primary expansion", () => {
    const start = resolveCinematicHeroParameters("hero", 0);
    const early = resolveCinematicHeroParameters("hero", 0.18);

    expect(early.cylinderRotation).toBeGreaterThan(start.cylinderRotation);
    expect(early.cameraZ).toBeLessThan(start.cameraZ);
    expect(early.particleEnergy).toBeGreaterThan(start.particleEnergy);
    expect(early.arcExpansion).toBe(0);
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

  it("recedes the camera after splitting the cylinder into final arcs", () => {
    const middle = resolveCinematicHeroParameters("hero", 0.7);
    const end = resolveCinematicHeroParameters("hero", 1);

    expect(end.arcExpansion).toBeGreaterThan(1.5);
    expect(end.cameraZ).toBeGreaterThan(middle.cameraZ);
  });
});

describe("reactive particle layout", () => {
  it("uses deterministic particle geometry across remounts", () => {
    const first = resolveParticleUserData(DEFAULT_PARTICLE_CONFIG, 4, 1.2);
    const remount = resolveParticleUserData(DEFAULT_PARTICLE_CONFIG, 4, 1.2);

    expect(remount).toEqual(first);
  });
});
