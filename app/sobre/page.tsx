import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça o propósito da Creative, produtora de filmes publicitários.",
};

export default function SobrePage() {
  return (
    <div className="container-edit pb-20 pt-28 sm:pt-36">
      <Reveal>
        <span className="eyebrow text-charcoal/50">Sobre</span>
        <p className="font-voice mt-4 max-w-2xl text-[7vw] leading-[1.15] text-charcoal sm:text-[2.75rem]">
          Publicidade é atenção. Cinema é emoção. A Creative trabalha no
          encontro dos dois.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-10 sm:mt-24 lg:grid-cols-12">
        <Reveal delay={100} className="lg:col-span-7">
          <p className="text-xl leading-relaxed text-charcoal/80 sm:text-2xl">
            A Creative é uma produtora de audiovisual publicitário. Combina
            roteiro, direção visual e execução técnica para transformar um
            objetivo comercial em um filme — realista, animado em 3D ou em
            360°, dependendo do que a ideia pede.
          </p>
          <p className="mt-8 text-xl leading-relaxed text-charcoal/80 sm:text-2xl">
            Todo projeto começa antes da câmera: numa ideia que precisa
            justificar o tempo de quem vai assistir.
          </p>
        </Reveal>

        <div className="lg:col-span-5 lg:pl-8">
          <Reveal delay={200}>
            <span className="eyebrow text-charcoal/50">Frentes</span>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="border-b border-charcoal/15 pb-3">Filmes realistas</li>
              <li className="border-b border-charcoal/15 pb-3">Animação &amp; 3D</li>
              <li className="border-b border-charcoal/15 pb-3">Vídeo 360°</li>
              <li className="pb-3">Roteiro criativo</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
