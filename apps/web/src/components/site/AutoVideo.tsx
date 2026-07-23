"use client";
import { useEffect, useRef } from "react";
import { cn } from "@gocsa/ui";

/**
 * Muted, looping background video that animates a scene. Reduced-motion users get the
 * still poster frame (the video is paused), so it degrades gracefully to the photo.
 */
export function AutoVideo({
  src,
  poster,
  className,
  objectPosition,
}: {
  src: string;
  poster?: string;
  className?: string;
  objectPosition?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }
    const play = () => v.play?.().catch(() => {});
    play();
  }, []);

  return (
    <video
      ref={ref}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      aria-hidden
      style={objectPosition ? { objectPosition } : undefined}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
