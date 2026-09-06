import Link from "next/link";
import { HeroMedia } from "@/components/HeroMedia";

export function HeroShowreel() {
  return (
    <section className="relative flex h-[92svh] min-h-[600px] w-full flex-col justify-end overflow-hidden bg-ink text-paper">
      <HeroMedia />

      <span
        aria-hidden
        className="ghost-type pointer-events-none absolute -top-[6vw] left-1/2 z-0 -translate-x-1/2 text-[26vw] text-paper"
      >
        Creative
      </span>

      <div className="container-edit relative z-10 pb-14 pt-32 sm:pb-16 sm:pt-40">
        <h1 className="font-display text-[11vw] leading-[0.88] sm:text-[7vw] lg:text-[5.5rem]">
          Filmes publicitários
          <br />
          com linguagem de cinema.
        </h1>

        <div className="mt-8 flex flex-col gap-6 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-voice max-w-md text-xl text-paper/85 sm:text-2xl">
            Seu comercial não precisa parecer um comercial.
          </p>

          <div className="flex items-center gap-8">
            <Link href="/trabalhos" className="link-edit eyebrow">
              Ver trabalhos
              <span className="link-edit__line" aria-hidden />
            </Link>
            <Link href="/contato" className="link-edit eyebrow">
              Criar um filme
              <span className="link-edit__line" aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      <div className="container-edit relative z-10 flex items-center gap-3 pb-8 text-paper/60">
        <span className="h-8 w-px animate-pulse bg-paper/40" aria-hidden />
        <span className="eyebrow">Role para assistir</span>
      </div>
    </section>
  );
}
