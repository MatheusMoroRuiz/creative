import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function CTASection() {
  return (
    <section className="section-pad relative overflow-hidden bg-wine text-paper">
      <span
        aria-hidden
        className="ghost-type pointer-events-none absolute -right-[4vw] -top-[8vw] text-[22vw] text-ink"
      >
        Clientes
      </span>

      <div className="container-edit relative">
        <Reveal>
          <h2 className="font-display text-[11vw] leading-[0.88] sm:text-[6vw] lg:text-[4.75rem]">
            Você confia na Creative
            <br />
            para conquistar
            <br />
            seus clientes?
          </h2>
        </Reveal>

        <Reveal delay={150} className="mt-10">
          <Link href="/contato" className="link-edit font-voice text-2xl sm:text-3xl">
            Conte pra gente →
            <span className="link-edit__line" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
