import {
  forwardRef,
  type ImgHTMLAttributes,
  type ReactNode,
  type VideoHTMLAttributes,
} from "react";
import { cn } from "../utils/cn";

const RATIO: Record<string, string> = {
  square: "aspect-square",
  "4-3": "aspect-4-3",
  "3-2": "aspect-3-2",
  "16-9": "aspect-16-9",
};

/* ── Image ────────────────────────────────────────────────────────────────────
 * Presentational responsive image. Accepts pre-built src/srcSet (the MediaProvider
 * pipeline supplies these in later sprints, docs/17). Alt text is REQUIRED unless
 * explicitly decorative — enforced at the type level.
 * ──────────────────────────────────────────────────────────────────────────── */
export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "alt"> {
  alt: string;
  /** Marks the image decorative → empty alt + hidden from assistive tech. */
  decorative?: boolean;
  ratio?: keyof typeof RATIO;
}
export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ alt, decorative, ratio, className, loading = "lazy", ...props }, ref) => {
    const img = (
      <img
        ref={ref}
        alt={decorative ? "" : alt}
        aria-hidden={decorative ? true : undefined}
        loading={loading}
        decoding="async"
        className={cn("h-full w-full object-cover", !ratio && className)}
        {...props}
      />
    );
    if (!ratio) return img;
    return (
      <span className={cn("block overflow-hidden rounded-lg bg-surface", RATIO[ratio], className)}>
        {img}
      </span>
    );
  },
);
Image.displayName = "Image";

/* ── Video ────────────────────────────────────────────────────────────────────
 * Captions AND a transcript are REQUIRED (docs/11 §13, docs/17 §7). No sound-autoplay.
 * ──────────────────────────────────────────────────────────────────────────── */
export interface VideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "children"> {
  src: string;
  poster: string;
  /** WebVTT captions track (required). */
  captionsSrc: string;
  captionsLang?: string;
  /** Accessible title for the video. */
  title: string;
  /** Transcript content or a link — required for accessibility. */
  transcript: ReactNode;
}
export const Video = forwardRef<HTMLVideoElement, VideoProps>(
  (
    { src, poster, captionsSrc, captionsLang = "en", title, transcript, className, ...props },
    ref,
  ) => (
    <figure className="flex flex-col gap-3">
      <video
        ref={ref}
        controls
        preload="none"
        poster={poster}
        title={title}
        className={cn("w-full rounded-lg bg-neutral-900", className)}
        {...props}
      >
        <source src={src} />
        <track kind="captions" src={captionsSrc} srcLang={captionsLang} label="Captions" default />
      </video>
      <figcaption className="font-body text-sm text-ink-muted">
        <details>
          <summary className="cursor-pointer font-medium text-ink">Transcript</summary>
          <div className="mt-2">{transcript}</div>
        </details>
      </figcaption>
    </figure>
  ),
);
Video.displayName = "Video";
