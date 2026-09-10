import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ResumeBackdrop } from "@/components/resume/resume-backdrop";
import { ResumeCapabilityOrbit } from "@/components/resume/resume-capability-orbit";
import { ResumeExperienceScene } from "@/components/resume/resume-career-reveal";
import {
  ResumeChapter,
  ResumeReadingTrace,
  ResumeSceneRuntime,
} from "@/components/resume/resume-scene-runtime";
import { ResumeChapterNavigationConnected } from "@/components/resume/resume-chapter-navigation";
import { ResumeIdentityScene } from "@/components/resume/resume-identity-scene";
import { ResumeCredentialStack } from "@/components/resume/resume-credential-stack";
import { ResumeConvergence } from "@/components/resume/resume-convergence";
import { getResumeContent } from "@/content/resume";
import type { Locale } from "@/lib/i18n";
import type { ResumeContent } from "@/types/resume";

function ResumeDocument({ resume }: { resume: ResumeContent }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="resume-document"
    >
      <ResumeChapter id="identity" label={resume.identity.focus}>
        <ResumeIdentityScene
          identity={resume.identity}
          location={resume.location}
          availability={resume.availability}
          links={resume.links}
          pdf={resume.pdf}
          labels={resume.labels}
        />
      </ResumeChapter>

      <ResumeChapter id="capabilities" label={resume.labels.skills}>
        <ResumeCapabilityOrbit
          title={resume.labels.skills}
          centerLabel={resume.identity.role}
          groups={resume.skills}
        />
      </ResumeChapter>

      <ResumeChapter id="experience" label={resume.labels.experience}>
        <ResumeExperienceScene
          entries={resume.experience}
          sectionLabel={resume.labels.experience}
          sectionTitle={resume.labels.experience}
        />
      </ResumeChapter>

      <ResumeChapter id="credentials" label={resume.labels.education}>
        <ResumeCredentialStack
          entries={resume.education}
          sectionLabel={resume.labels.education}
        />
      </ResumeChapter>

      <ResumeChapter id="contact" label={resume.labels.contact}>
        <ResumeConvergence
          languageLabel={resume.labels.languages}
          languages={resume.languages}
          links={resume.links}
          labels={resume.labels}
          pdf={resume.pdf}
          contactHref={resume.links.find((link) => link.kind === "email")!.href}
          workHref={resume.locale === "en" ? "/#work" : "/pt-BR/#work"}
        />
      </ResumeChapter>
    </main>
  );
}

export function ResumePage({ locale }: { locale: Locale }): ReactNode {
  const resume = getResumeContent(locale);
  const chapters = [
    { id: "identity" as const, label: resume.identity.focus },
    { id: "capabilities" as const, label: resume.labels.skills },
    { id: "experience" as const, label: resume.labels.experience },
    { id: "credentials" as const, label: resume.labels.education },
    { id: "contact" as const, label: resume.labels.contact },
  ];

  return (
    <>
      <SiteHeader />
      <div className="resume-stage">
        <ResumeSceneRuntime chapters={chapters}>
          <ResumeBackdrop />
          <ResumeChapterNavigationConnected />
          <ResumeReadingTrace />
          <ResumeDocument resume={resume} />
        </ResumeSceneRuntime>
        <SiteFooter />
      </div>
    </>
  );
}
