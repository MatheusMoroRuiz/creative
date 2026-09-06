"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type AutoplayVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  /** Pausa o vídeo quando sai da viewport, para economizar recursos. */
  pauseOffscreen?: boolean;
  /** `contain` mostra o frame inteiro (usado no case, onde o filme é o conteúdo). */
  fit?: "cover" | "contain";
};

export function AutoplayVideo({
  src,
  poster,
  className,
  pauseOffscreen = true,
  fit = "cover",
}: AutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !pauseOffscreen || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else if (!el.paused) {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pauseOffscreen]);

  return (
    <video
      ref={ref}
      className={cn(
        "h-full w-full",
        fit === "contain" ? "object-contain" : "object-cover",
        className
      )}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      controlsList="nodownload noplaybackrate noremoteplayback"
      onContextMenu={(e) => e.preventDefault()}
      aria-hidden
    />
  );
}
