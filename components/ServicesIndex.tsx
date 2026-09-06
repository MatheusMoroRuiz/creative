"use client";

import { useState } from "react";
import Link from "next/link";
import { services } from "@/data/services";
import { MediaFrame } from "@/components/MediaFrame";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

/**
 * Índice interativo de serviços (clique para expandir), em vez de quatro
 * blocos empilhados ocupando a tela inteira — mais rápido de escanear e
 * mais diferente do que uma lista passiva.
 */
export function ServicesIndex() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];

  return (
    <section id="servicos" className="section-pad bg-charcoal text-paper">
      <div className="container-edit">
        <SectionHeading
          number="Serviços"
          title={
            <>
              O que
              <br />
              fazemos
            </>
          }
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <ul className="border-t border-paper/15 lg:col-span-6">
            {services.map((service, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={service.number} className="border-b border-paper/15">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    onFocus={() => setActiveIndex(i)}
                    aria-expanded={isActive}
                    className={cn(
                      "flex w-full items-center justify-between gap-6 py-6 text-left transition-colors sm:py-8",
                      isActive ? "text-paper" : "text-paper/40 hover:text-paper/70"
                    )}
                  >
                    <span className="font-display text-[8vw] leading-none sm:text-3xl lg:text-4xl">
                      {service.title}
                    </span>
                    <span className="eyebrow shrink-0" aria-hidden>
                      {isActive ? "—" : "+"}
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-out lg:hidden",
                      isActive ? "grid-rows-[1fr] pb-7" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="max-w-md text-base leading-relaxed text-paper/70">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:col-span-6 lg:block">
            <Reveal
              key={active.number}
              variant="iris"
              className="block aspect-square w-full overflow-hidden"
            >
              {active.media ? (
                <MediaFrame
                  image={active.media}
                  alt={`Still de um filme da Creative — ${active.title}`}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              ) : (
                <ServicePoster title={active.title} />
              )}
            </Reveal>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/75">
              {active.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Cartaz para a frente que ainda não tem trabalho publicado. Em vez de um
 * frame de outro serviço (que daria a entender ser um exemplo de 360°),
 * mostra um desenho da marca com convite direto ao contato.
 */
function ServicePoster({ title }: { title: string }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-wine p-7 text-paper sm:p-9">
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
      >
        <g fill="none" stroke="currentColor" strokeWidth="0.7">
          {[14, 28, 42, 56, 70, 84, 96].map((rx) => (
            <ellipse key={rx} cx="100" cy="100" rx={rx} ry="92" />
          ))}
          <line x1="0" y1="100" x2="200" y2="100" />
        </g>
      </svg>

      <span className="eyebrow relative text-paper/80">{title}</span>

      <div className="relative">
        <p className="font-display text-[clamp(2.5rem,7vw,4rem)] leading-[0.9]">360°</p>
        <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-paper/75">
          Ainda sem exemplo publicado aqui. Peça uma amostra e a gente mostra
          como fica no seu espaço.
        </p>
        <Link href="/contato" className="link-edit eyebrow mt-5 inline-flex">
          Falar com a Creative →
          <span className="link-edit__line" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
