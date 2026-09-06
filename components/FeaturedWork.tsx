"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { categoryLabel } from "@/data/projects";
import { MediaFrame } from "@/components/MediaFrame";
import { FilmFrame } from "@/components/FilmFrame";
import { Reveal } from "@/components/Reveal";

export function FeaturedWork({ project }: { project: Project }) {
  const [hover, setHover] = useState(false);
  const isVertical = project.orientation === "vertical";

  const media = (
    <MediaFrame
      video={project.video}
      image={project.thumbnail}
      poster={project.poster}
      alt={project.title ?? "Projeto Creative"}
      label={`Destaque — ${categoryLabel[project.category]}`}
      sub={project.duration}
      tone="charcoal"
      sizes={isVertical ? "(max-width: 1024px) 100vw, 30vw" : "100vw"}
      playVideo={hover}
      priority
    />
  );

  // Filme vertical: composição dividida, para o frame aparecer inteiro em vez
  // de ser cortado dentro de um quadro panorâmico.
  if (isVertical) {
    return (
      <Reveal>
        <Link
          href={`/trabalhos/${project.slug}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="group block"
        >
          <div className="flex items-baseline justify-between gap-4 border-t border-charcoal/25 pt-4">
            <span className="eyebrow text-charcoal/45">
              Destaque — {categoryLabel[project.category]}
            </span>
            {project.duration && (
              <span className="eyebrow text-charcoal/40">{project.duration}</span>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 items-end gap-8 sm:mt-10 lg:grid-cols-12 lg:gap-10">
            <FilmFrame className="w-full max-w-[20rem] lg:col-span-4">
              <div className="aspect-[9/16]">{media}</div>
            </FilmFrame>

            <div className="lg:col-span-7 lg:col-start-6 lg:pb-3">
              <h3 className="font-display text-[11vw] leading-[0.9] sm:text-[6vw] lg:text-[4.25rem]">
                {project.title ?? "Projeto Creative"}
              </h3>
              {project.description && (
                <p className="mt-5 max-w-sm text-lg leading-relaxed text-charcoal/70">
                  {project.description}
                </p>
              )}
              <span className="link-edit eyebrow mt-8 inline-flex">
                Ver o filme →
                <span className="link-edit__line" aria-hidden />
              </span>
            </div>
          </div>
        </Link>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <Link
        href={`/trabalhos/${project.slug}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group relative block aspect-[16/9] w-full overflow-hidden bg-ink sm:aspect-[21/9]"
      >
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
          {media}
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/70 to-transparent p-6 sm:p-9">
          <span className="font-display text-[8vw] leading-none text-paper sm:text-4xl lg:text-5xl">
            {project.title ?? "Projeto Creative"}
          </span>
          <span className="eyebrow hidden shrink-0 text-paper/70 sm:block">
            {categoryLabel[project.category]}
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
