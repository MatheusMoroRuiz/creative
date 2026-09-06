"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type FilmPlayerProps = {
  src: string;
  poster?: string;
  fit?: "cover" | "contain";
};

/**
 * Player mínimo da Creative: apenas pausar e som. Sem a barra nativa do
 * navegador (que expõe download, picture-in-picture e o endereço do
 * arquivo) e sem menu de contexto no vídeo.
 */
export function FilmPlayer({ src, poster, fit = "contain" }: FilmPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  // Pausa fora da viewport, mas respeita a pausa feita pela pessoa.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!pausedByUser.current) el.play().catch(() => {});
        } else if (!el.paused) {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function togglePlay() {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      pausedByUser.current = false;
      el.play().catch(() => {});
    } else {
      pausedByUser.current = true;
      el.pause();
    }
  }

  function toggleMute() {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  }

  return (
    <div className="relative h-full w-full">
      <video
        ref={ref}
        className={cn(
          "h-full w-full",
          fit === "contain" ? "object-contain" : "object-cover"
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
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <div className="absolute bottom-3 left-3 flex border border-paper/25 bg-ink/70 backdrop-blur-sm sm:bottom-4 sm:left-4">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pausar filme" : "Reproduzir filme"}
          className="flex h-10 w-10 items-center justify-center text-paper/80 transition-colors hover:text-paper"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        <span aria-hidden className="w-px self-stretch bg-paper/20" />

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Ativar som" : "Desativar som"}
          className="flex h-10 w-10 items-center justify-center text-paper/80 transition-colors hover:text-paper"
        >
          {muted ? <MutedIcon /> : <SoundIcon />}
        </button>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden>
      <path d="M0 0l12 7-12 7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" aria-hidden>
      <rect width="3" height="14" />
      <rect x="7" width="3" height="14" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M1 5v4h3l4 3V2L4 5H1z" fill="currentColor" stroke="none" />
      <path d="M10.5 4.5a3.5 3.5 0 010 5M12.8 2.2a7 7 0 010 9.6" strokeLinecap="round" />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M1 5v4h3l4 3V2L4 5H1z" fill="currentColor" stroke="none" />
      <path d="M11 5l4 4M15 5l-4 4" strokeLinecap="round" />
    </svg>
  );
}
