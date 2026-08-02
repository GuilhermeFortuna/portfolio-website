import type {
  ApertureMediaMap,
  ApertureWaypoint,
} from "@/components/case-study/experience/aperture-types";

/**
 * Aegis-only media keys for the D-010 aperture. Shared primitives receive these
 * as generic data — do not invent section media here. Kept outside `"use client"`
 * so the server page can author waypoint placement during prerender.
 */
export const AEGIS_APERTURE_MEDIA: ApertureMediaMap = {
  overview: {
    src: "/work/aegis/overview.webp",
    alt: "The Aegis overview screen: a dark console with a Portuguese sidebar, a risk summary panel counting 25,000 analysed players and 97 with a signal, and a field of faint points with an amber cluster to the right.",
    width: 1600,
    height: 900,
  },
  alerts: {
    src: "/work/aegis/alerts.webp",
    alt: "The alerts triage queue, grouped by rule: duplicate document, incomplete identity checks, deposit structuring, promotional-credit volume, and two operator-impact rules, each with its rule code, category, alert count, and maximum score, next to an empty evidence panel inviting the analyst to select an alert.",
    width: 1600,
    height: 900,
  },
};

/** Authored desktop/tablet/mobile waypoint sequence for Aegis chapters. */
export const AEGIS_APERTURE_WAYPOINTS: readonly ApertureWaypoint[] = [
  {
    sceneId: "context",
    slotId: "aegis-aperture-context",
    aspectRatio: "16 / 9",
    mediaKey: "overview",
    fit: "contain",
    alignment: "center",
  },
  {
    sceneId: "problem",
    slotId: "aegis-aperture-problem",
    aspectRatio: "4 / 3",
    mediaKey: "overview",
    fit: "contain",
    alignment: "end",
  },
  {
    sceneId: "system",
    slotId: "aegis-aperture-system",
    aspectRatio: "16 / 9",
    mediaKey: "overview",
    fit: "contain",
    alignment: "start",
  },
  {
    sceneId: "decisions",
    slotId: "aegis-aperture-decisions",
    aspectRatio: "3 / 4",
    fit: "cover",
    alignment: "start",
  },
  {
    sceneId: "contribution",
    slotId: "aegis-aperture-contribution",
    aspectRatio: "16 / 9",
    mediaKey: "alerts",
    fit: "contain",
    alignment: "center",
  },
  {
    sceneId: "delivered",
    slotId: "aegis-aperture-delivered",
    aspectRatio: "16 / 9",
    mediaKey: "alerts",
    fit: "contain",
    alignment: "start",
  },
  {
    sceneId: "technology",
    slotId: "aegis-aperture-technology",
    aspectRatio: "3 / 2",
    fit: "cover",
    alignment: "end",
  },
  {
    sceneId: "confidentiality",
    slotId: "aegis-aperture-confidentiality",
    aspectRatio: "3 / 2",
    fit: "cover",
    alignment: "center",
  },
];
