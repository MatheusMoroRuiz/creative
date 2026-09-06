import { Reveal } from "@/components/Reveal";

export function Manifesto() {
  return (
    <section className="section-pad bg-paper">
      <div className="container-edit grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7 lg:col-start-1">
          <p className="font-voice text-[9vw] leading-[1.05] text-charcoal sm:text-[3.25rem] lg:text-[3.75rem]">
            Antes da câmera, existe uma ideia.
            <br />
            Antes da venda, existe uma história.
          </p>
        </Reveal>

        <Reveal
          delay={150}
          className="text-lg leading-relaxed text-charcoal/70 lg:col-span-4 lg:col-start-9 lg:self-end lg:text-xl"
        >
          A Creative combina roteiro, linguagem cinematográfica e direção
          visual para transformar produtos, serviços e marcas em histórias
          que merecem ser assistidas até o fim.
        </Reveal>
      </div>
    </section>
  );
}
