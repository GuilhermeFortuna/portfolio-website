import type { CaseStudy, CaseStudySection } from "@/types/case-study";
import type { Locale } from "@/lib/i18n";
import { aegisCaseStudy, getAegisCaseStudy } from "./aegis";
import { qCaseStudy, getQCaseStudy } from "./q";
import { gosigappCaseStudy, getGosigappCaseStudy } from "./gosigapp";
import {
  nexoDentalCaseStudy,
  getNexoDentalCaseStudy,
} from "./nexo-dental";

export {
  aegisCaseStudy,
  qCaseStudy,
  gosigappCaseStudy,
  nexoDentalCaseStudy,
  getAegisCaseStudy,
  getQCaseStudy,
  getGosigappCaseStudy,
  getNexoDentalCaseStudy,
};

export const caseStudies = {
  aegis: aegisCaseStudy,
  q: qCaseStudy,
  gosigapp: gosigappCaseStudy,
  "nexo-dental": nexoDentalCaseStudy,
} as const;

export function getCaseStudy(
  slug: string,
  locale: Locale = "en",
): CaseStudy | undefined {
  if (slug === "aegis") return getAegisCaseStudy(locale);
  if (slug === "q") return getQCaseStudy(locale);
  if (slug === "gosigapp") return getGosigappCaseStudy(locale);
  if (slug === "nexo-dental") return getNexoDentalCaseStudy(locale);
  return undefined;
}

export function getCaseStudies(locale: Locale = "en"): Record<string, CaseStudy> {
  return {
    aegis: getAegisCaseStudy(locale),
    q: getQCaseStudy(locale),
    gosigapp: getGosigappCaseStudy(locale),
    "nexo-dental": getNexoDentalCaseStudy(locale),
  };
}

/**
 * The body sections between the hero and the closing note, in the order fixed
 * by each chapter's content contract. Routes render this list as-is so the
 * order lives in content rather than in JSX.
 */
export function caseStudyBodySections(
  caseStudy: CaseStudy,
): readonly CaseStudySection[] {
  return [
    caseStudy.identity,
    caseStudy.origin,
    caseStudy.context,
    caseStudy.problem,
    caseStudy.tourIntro,
    ...(caseStudy.tourGroups ?? []),
    caseStudy.system,
    ...caseStudy.decisions,
    caseStudy.contribution,
    caseStudy.delivered,
    caseStudy.technology,
  ].filter((section): section is CaseStudySection => section !== undefined);
}
