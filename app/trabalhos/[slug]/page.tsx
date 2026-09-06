import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categoryLabel,
  getAdjacentProject,
  getProjectBySlug,
  projects,
} from "@/data/projects";
import { MediaFrame } from "@/components/MediaFrame";
import { FilmFrame } from "@/components/FilmFrame";
import { Reveal } from "@/components/Reveal";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = project.title ?? "Projeto";
  return {
    title,
    description: project.description ?? `${categoryLabel[project.category]} — Creative.`,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getAdjacentProject(slug);
  const isVertical = project.orientation === "vertical";

  return (
    <article className="pb-20 pt-28 sm:pt-36">
      <div className="container-edit">
        <Reveal>
          <span className="eyebrow text-charcoal/50">{categoryLabel[project.category]}</span>
          <h1 className="font-display mt-3 text-[10vw] leading-[0.9] sm:text-[6vw] lg:text-[4.5rem]">
            {project.title ?? "Projeto Creative"}
          </h1>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-2 border-b border-charcoal/15 pb-8">
          <Detail label="Categoria" value={categoryLabel[project.category]} />
          <Detail label="Ano" value={project.year ? String(project.year) : null} />
          <Detail label="Duração" value={project.duration} />
          <Detail label="Cliente" value={project.client} />
        </div>
      </div>

      {/* Painel de projeção: faixa escura de ponta a ponta, com trilhos de
          ficha técnica em cima e embaixo. A margem deixa de ser espaço vazio
          e passa a ser a moldura do filme. */}
      <section className="relative mt-12 overflow-hidden bg-ink text-paper sm:mt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 45%, rgba(168,35,43,0.28), transparent 70%)",
          }}
        />

        <div className="container-edit relative py-8 sm:py-12">
          <div className="flex items-baseline justify-between gap-4 border-b border-paper/15 pb-4">
            <span className="eyebrow text-paper/70">
              {project.title ?? "Projeto Creative"}
            </span>
            <span className="eyebrow text-paper/45">
              {project.duration ?? categoryLabel[project.category]}
            </span>
          </div>

          <div className="relative flex items-center justify-center py-10 sm:py-14">
            {isVertical && (
              <>
                <span
                  aria-hidden
                  className="eyebrow absolute left-0 top-1/2 hidden text-paper/35 [writing-mode:vertical-rl] lg:block"
                  style={{ transform: "translateY(-50%) rotate(180deg)" }}
                >
                  {categoryLabel[project.category]}
                </span>
                {project.client && (
                  <span
                    aria-hidden
                    className="eyebrow absolute right-0 top-1/2 hidden -translate-y-1/2 text-paper/35 [writing-mode:vertical-rl] lg:block"
                  >
                    {project.client}
                  </span>
                )}
              </>
            )}

            <FilmFrame
              tone="dark"
              className={isVertical ? "w-full max-w-[24rem]" : "w-full max-w-5xl"}
            >
              <div className={isVertical ? "aspect-[9/16]" : "aspect-video"}>
                <MediaFrame
                  video={project.video}
                  image={project.thumbnail ?? project.poster}
                  alt={project.title ?? "Projeto Creative"}
                  label={categoryLabel[project.category]}
                  sub={project.duration}
                  tone="charcoal"
                  sizes={isVertical ? "(max-width: 640px) 100vw, 24rem" : "(max-width: 1024px) 100vw, 64rem"}
                  fit="contain"
                  controls
                  priority
                />
              </div>
            </FilmFrame>
          </div>

          <div className="flex items-baseline justify-between gap-4 border-t border-paper/15 pt-4">
            <span className="eyebrow text-paper/45">Creative — Audiovisual Publicitário</span>
            {project.video && (
              <span className="eyebrow text-paper/45">Ative o som no player</span>
            )}
          </div>
        </div>
      </section>

      {project.description && (
        <div className="container-edit mt-14 sm:mt-20">
          <Reveal className="max-w-2xl text-xl leading-relaxed text-charcoal/80 sm:text-2xl">
            {project.description}
          </Reveal>
        </div>
      )}

      <div className="container-edit mt-24 flex items-center justify-between border-t border-charcoal/15 pt-10 sm:mt-32">
        <span className="eyebrow text-charcoal/50">Próximo projeto</span>
        <Link href={`/trabalhos/${next.slug}`} className="link-edit font-display text-3xl sm:text-4xl">
          {next.title ?? "Projeto Creative"} →
          <span className="link-edit__line" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <span className="eyebrow block text-charcoal/40">{label}</span>
      <span className="text-base">{value}</span>
    </div>
  );
}
