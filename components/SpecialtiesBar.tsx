import { LogoMark } from "@/components/Logo";

/**
 * Faixa de especialidades logo abaixo da abertura: as três frentes de
 * produção, ditas em uma linha, com o símbolo da marca como separador.
 */
const SPECIALTIES = ["Animação", "Realista", "Gravação Local"];

export function SpecialtiesBar() {
  return (
    <section className="bg-wine text-paper" aria-label="Especialidades da Creative">
      <div className="container-edit flex flex-wrap items-center justify-center gap-x-5 gap-y-3 py-5 sm:gap-x-8 sm:py-6">
        {SPECIALTIES.map((item, i) => (
          <div key={item} className="flex items-center gap-5 sm:gap-8">
            {i > 0 && (
              <LogoMark className="h-3.5 w-3.5 shrink-0 text-paper/45 sm:h-4 sm:w-4" />
            )}
            <span className="eyebrow text-sm sm:text-base">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
