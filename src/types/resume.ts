import type { Locale } from "@/lib/i18n";

export type ResumeLink = {
  label: string;
  href: string;
  kind: "email" | "phone" | "website" | "github" | "linkedin";
};

export type ResumeSkillGroup = {
  label: string;
  items: readonly string[];
};

export type ResumeExperience = {
  organization: string;
  role: string;
  period: string;
  location: string;
  highlights: readonly string[];
};

export type ResumeProject = {
  name: string;
  role: string;
  period: string;
  highlights: readonly string[];
};

export type ResumeEducation = {
  institution: string;
  program: string;
  period: string;
};

export type ResumeLabels = {
  skills: string;
  experience: string;
  projects: string;
  education: string;
  languages: string;
  viewPdf: string;
  downloadPdf: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  contact: string;
  returnToWork: string;
};

export type ResumeContent = {
  locale: Locale;
  metadata: { title: string; description: string };
  identity: { name: string; role: string; focus: string; summary: string };
  location: string;
  availability: string;
  links: readonly ResumeLink[];
  skills: readonly ResumeSkillGroup[];
  experience: readonly ResumeExperience[];
  projects: readonly ResumeProject[];
  education: readonly ResumeEducation[];
  languages: readonly string[];
  labels: ResumeLabels;
  pdf: { href: string; downloadName: string };
};
