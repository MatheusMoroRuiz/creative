import { processSteps } from "@/data/process";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function ProcessSection() {
  return (
    <section className="section-pad bg-paper">
      <div className="container-edit">
        <SectionHeading
          number="Processo"
          title={
            <>
              Um bom conteúdo
              <br />
              começa com
            </>
          }
        />

        <div className="flex flex-col sm:flex-row sm:items-stretch sm:gap-6 lg:gap-10">
          {processSteps.map((step, i) => (
            <Reveal
              key={step}
              delay={i * 80}
              className="flex flex-1 items-center gap-4 py-6 sm:flex-col sm:items-start sm:gap-0 sm:py-0"
            >
              <div className="flex w-full items-center gap-4 sm:flex-col sm:items-start sm:gap-5">
                <span className="eyebrow text-charcoal/50">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-3xl leading-[0.95] sm:text-[2rem] lg:text-[2.5rem]">
                  {step}
                </span>
              </div>
              {i < processSteps.length - 1 && (
                <span
                  aria-hidden
                  className="hairline mt-8 hidden flex-1 sm:block"
                />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
