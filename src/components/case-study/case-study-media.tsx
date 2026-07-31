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
 */
export function CaseStudyFigure({
  image,
  eager = false,
}: {
  image: CaseStudyImage;
  eager?: boolean;
}) {
  return (
    <figure style={{ margin: 0 }}>
      <picture className={figureClassName + " block"}>
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
 */
export function CaseStudyVideoFigure({ video }: { video: CaseStudyVideo }) {
  return (
    <figure style={{ margin: 0 }}>
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
      />
      <figcaption className={captionClassName} style={readingColumnStyle}>
        {video.transcript}
      </figcaption>
    </figure>
  );
}
