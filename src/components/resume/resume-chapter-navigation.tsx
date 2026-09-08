"use client";

import type { CSSProperties, ReactNode } from "react";

import {
  useResumeSceneRuntime,
  type ResumeChapter,
  type ResumeChapterId,
} from "@/components/resume/resume-scene-runtime";

export type ResumeChapterNavigationProps = {
  chapters: readonly ResumeChapter[];
  activeChapter: ResumeChapterId;
  progress: number;
};

export function ResumeChapterNavigation({
  chapters,
  activeChapter,
  progress,
}: ResumeChapterNavigationProps): ReactNode {
  const accessibleName = chapters.map((chapter) => chapter.label).join(" · ");

  return (
    <nav
      aria-label={accessibleName}
      className="resume-chapter-navigation"
      style={{ "--resume-progress": `${Math.min(1, Math.max(0, progress)) * 100}%` } as CSSProperties}
    >
      <span className="resume-chapter-navigation__trace" aria-hidden="true" />
      <ol className="resume-chapter-navigation__list">
        {chapters.map((chapter) => (
          <li key={chapter.id} className="resume-chapter-navigation__item">
            <a
              href={`#resume-chapter-${chapter.id}`}
              aria-current={chapter.id === activeChapter ? "location" : undefined}
              className="resume-chapter-navigation__link"
            >
              <span aria-hidden="true" className="resume-chapter-navigation__dot" />
              <span className="resume-chapter-navigation__label">{chapter.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ResumeChapterNavigationConnected(): ReactNode {
  const { chapters, activeChapter, progress } = useResumeSceneRuntime();
  return (
    <ResumeChapterNavigation
      chapters={chapters}
      activeChapter={activeChapter}
      progress={progress}
    />
  );
}
