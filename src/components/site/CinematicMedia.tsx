import { useEffect, useRef, useState } from "react";

type Props = {
  /** Poster / fallback image URL (required — used for SSR and reduced-motion). */
  poster: string;
  /** Optional muted video URL. If omitted, only the poster renders. */
  videoSrc?: string;
  alt: string;
  className?: string;
  /** Aspect ratio helper (Tailwind class). */
  aspect?: string;
  /** Add slow ken-burns motion to the poster (only when no video). */
  kenBurns?: boolean;
  /** Object-position override, e.g. "center 30%". */
  objectPosition?: string;
};

/**
 * Reusable cinematic media block.
 * - Muted autoplay video with poster fallback
 * - Lazy-loads video only when scrolled near
 * - Respects prefers-reduced-motion (poster-only)
 * - No controls; pointer-events disabled for calm presentation
 */
export function CinematicMedia({
  poster,
  videoSrc,
  alt,
  className = "",
  aspect = "aspect-[16/9]",
  kenBurns = false,
  objectPosition,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
  }, []);

  useEffect(() => {
    if (!videoSrc || reduced) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldLoadVideo(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShouldLoadVideo(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [videoSrc, reduced]);

  const showVideo = Boolean(videoSrc) && !reduced && shouldLoadVideo;

  return (
    <div ref={ref} className={`relative overflow-hidden bg-stone-200 ${aspect} ${className}`}>
      <img
        src={poster}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover ${
          kenBurns && !reduced && !showVideo ? "animate-ken-burns" : ""
        } ${showVideo ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}
        style={objectPosition ? { objectPosition } : undefined}
      />
      {showVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          style={objectPosition ? { objectPosition } : undefined}
        />
      )}
    </div>
  );
}
