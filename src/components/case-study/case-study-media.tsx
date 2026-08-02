import type { CaseStudyImage, CaseStudyVideo } from "@/types/case-study";
import { eyebrowStyle, readingColumnStyle } from "./case-study-shell";

const figureClassName =
  "overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)]";

const captionClassName =
  "mt-4 text-[0.9375rem] leading-[1.6] text-[var(--color-text-muted)]";

/**
 * Screenshots render as plain image elements so the page is complete with
 * JavaScript disabled. `<picture>` declares the delivered format and is the
 * seam for adding an additional source without touching callers.
 *
 * `evidencePlaneId` is the WO-031 D-013 shell hook — captions stay on the
 * figure; transforms target the plane inner only when enhanced.
 */
export function CaseStudyFigure({
  image,
  eager = false,
  evidencePlaneId,
}: {
  image: CaseStudyImage;
  eager?: boolean;
  /** Optional D-013 plane id for CaseStudyEvidenceStage registration. */
  evidencePlaneId?: string;
}) {
  return (
    <figure style={{ margin: 0 }} data-evidence-figure={evidencePlaneId}>
      <picture
        className={figureClassName + " block"}
        data-evidence-media={evidencePlaneId}
      >
        <source srcSet={image.src} type="image/webp" />
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-auto w-full"
        />
      </picture>
      {image.caption ? (
        <figcaption className={captionClassName} style={readingColumnStyle}>
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * The intro is poster-first and never autoplayed: playback is a deliberate
 * visitor action. The film is silent, so the visible transcript carries its
 * content whether or not the video ever plays.
 *
 * WO-022 permits an optional muted in-view preview. It is deliberately not
 * implemented: with no automatic playback at all, reduced motion, Save-Data,
 * and a hidden tab need no special case, and this stays a Server Component
 * with no client runtime to clean up on route exit.
 *
 * WO-030 decision-4 may place this figure first in the identity composition;
 * playback remains user-controlled and is never scroll-scrubbed.
 *
 * WO-031 may wrap this figure in a D-013 plane for spatial arrival only;
 * inspect restores pointer events so native controls stay usable.
 */
export function CaseStudyVideoFigure({
  video,
  evidencePlaneId,
}: {
  video: CaseStudyVideo;
  evidencePlaneId?: string;
}) {
  return (
    <figure style={{ margin: 0 }} data-evidence-figure={evidencePlaneId}>
      <p
        style={eyebrowStyle}
        className="mb-4 text-[var(--color-text-muted)]"
      >
        {video.title}
      </p>
      <video
        src={video.src}
        poster={video.poster}
        width={video.width}
        height={video.height}
        controls
        muted
        playsInline
        preload="metadata"
        aria-label={video.ariaLabel}
        className={figureClassName + " h-auto w-full"}
        data-evidence-media={evidencePlaneId}
      />
      <figcaption className={captionClassName} style={readingColumnStyle}>
        {video.transcript}
      </figcaption>
    </figure>
  );
}
