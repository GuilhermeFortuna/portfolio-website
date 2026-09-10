import type { Metadata } from "next";

import { ResumePage } from "@/components/resume/resume-page";
import { getResumeContent } from "@/content/resume";
import { createPageMetadata } from "@/lib/seo";

const resume = getResumeContent("en");

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  pathname: "/resume",
  title: resume.metadata.title,
  description: resume.metadata.description,
});

export default function EnglishResumePage() {
  return <ResumePage locale="en" />;
}
