import type { CaseStudy, CaseStudySection } from "@/types/case-study";
import { aegisCaseStudy } from "./aegis";

export { aegisCaseStudy };

export const caseStudies = {
  aegis: aegisCaseStudy,
} as const;

/**
 * The body sections between the hero and the closing note, in the order fixed
 * by `docs/aegis-case-study-content.md`. Routes render this list as-is so the
 * order lives in content rather than in JSX.
 */
export function caseStudyBodySections(
  caseStudy: CaseStudy,
): readonly CaseStudySection[] {
  return [
    caseStudy.context,
    caseStudy.problem,
    caseStudy.system,
    ...caseStudy.decisions,
    caseStudy.contribution,
    caseStudy.delivered,
    caseStudy.technology,
  ];
}
