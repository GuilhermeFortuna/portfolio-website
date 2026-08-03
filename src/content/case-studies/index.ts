import type { CaseStudy, CaseStudySection } from "@/types/case-study";
import { aegisCaseStudy } from "./aegis";
import { qCaseStudy } from "./q";

export { aegisCaseStudy, qCaseStudy };

export const caseStudies = {
  aegis: aegisCaseStudy,
  q: qCaseStudy,
} as const;

/**
 * The body sections between the hero and the closing note, in the order fixed
 * by each chapter's content contract. Routes render this list as-is so the
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
