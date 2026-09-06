"use client";

import { useRef, useState } from "react";
import { hero } from "@/data/hero";

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  return (
    <div className="absolute inset-0">
      {hero.video ? (
        <>
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={hero.video}
            poster={hero.poster ?? undefined}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
            aria-hidden
          />
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="absolute bottom-8 right-6 z-20 flex items-center gap-2 border border-paper/30 px-3 py-2 text-paper/80 backdrop-blur-sm transition-colors hover:border-paper/70 hover:text-paper sm:right-10"
            aria-label={muted ? "Ativar som" : "Silenciar"}
          >
            <span className="eyebrow">{muted ? "Som" : "Mudo"}</span>
            <span aria-hidden className="text-sm">
              {muted ? "♪" : "×"}
            </span>
          </button>
        </>
      ) : (
        <div aria-hidden className="frame-duotone h-full w-full" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/15" />
    </div>
  );
}
