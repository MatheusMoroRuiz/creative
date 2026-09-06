"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { categoryLabel, categoryNavLabel } from "@/data/projects";
import { MediaFrame } from "@/components/MediaFrame";
import { cn } from "@/lib/cn";

type WorksListProps = {
  projects: Project[];
  /** Numeração real da lista completa (para manter posição estável sob filtro). */
  startIndex?: number;
};

/**
 * Lista editorial de projetos. No desktop, passar o mouse sobre um título
 * revela um preview de vídeo/imagem que segue o cursor — a assinatura
 * visual do site, ligada diretamente ao ofício de quem faz filme.
 * No touch, cada linha mostra uma miniatura fixa em vez do preview.
 */
export function WorksList({ projects, startIndex = 0 }: WorksListProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = projects.find((p) => p.slug === activeSlug) ?? null;

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    function loop() {
      current.current.x += (target.current.x - current.current.x) * 0.16;
      current.current.y += (target.current.y - current.current.y) * 0.16;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -55%)`;
      }
      raf.current = requestAnimationFrame(loop);
    }
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLUListElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    target.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  return (
    <div className="relative">
      <div
        ref={previewRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-20 hidden overflow-hidden border border-paper/20 bg-ink shadow-[0_30px_60px_rgba(20,8,9,0.4)] transition-opacity duration-300 md:block",
          active?.orientation === "vertical"
            ? "aspect-[9/16] w-[15rem]"
            : "aspect-video w-[24rem]",
          active ? "opacity-100" : "opacity-0"
        )}
      >
        {active && (
          <MediaFrame
            video={active.video}
            image={active.thumbnail}
            poster={active.poster}
            alt={active.title ?? "Projeto Creative"}
            label={categoryLabel[active.category]}
            sub={active.duration}
            tone="charcoal"
            playVideo
          />
        )}
      </div>

      <ul
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setActiveSlug(null)}
        className="border-y border-charcoal/15"
      >
        {projects.map((project, i) => (
          <li key={project.slug} className="border-b border-charcoal/15 last:border-b-0">
            <Link
              href={`/trabalhos/${project.slug}`}
              onMouseEnter={() => setActiveSlug(project.slug)}
              onFocus={() => setActiveSlug(project.slug)}
              className="group flex items-center justify-between gap-4 py-5 sm:py-7"
            >
              <span className="flex min-w-0 items-baseline gap-4 sm:gap-6">
                <span className="eyebrow shrink-0 text-charcoal/35">
                  {String(startIndex + i + 1).padStart(2, "0")}
                </span>
                <span className="font-display truncate text-[7.5vw] leading-none transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl lg:text-4xl">
                  {project.title ?? "Projeto Creative"}
                </span>
              </span>

              <span className="hidden shrink-0 items-center gap-6 sm:flex">
                <span className="eyebrow text-charcoal/45">
                  {categoryNavLabel[project.category]}
                </span>
                {project.duration && (
                  <span className="eyebrow text-charcoal/45">{project.duration}</span>
                )}
              </span>

              <span
                className={cn(
                  "block shrink-0 overflow-hidden bg-ink sm:hidden",
                  project.orientation === "vertical" ? "h-16 w-11" : "h-14 w-20"
                )}
              >
                <MediaFrame
                  video={null}
                  image={project.thumbnail}
                  alt=""
                  tone="charcoal"
                  playVideo={false}
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
