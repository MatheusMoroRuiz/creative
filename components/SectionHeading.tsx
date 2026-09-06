import { Reveal } from "@/components/Reveal";
import type { ReactNode } from "react";

export function SectionHeading({
  number,
  title,
  action,
}: {
  number: string;
  title: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
      <Reveal>
        <span className="eyebrow opacity-50">{number}</span>
        <h2 className="font-display mt-3 text-[10vw] leading-[0.9] sm:text-[4.5vw] lg:text-[3.5rem]">
          {title}
        </h2>
      </Reveal>
      {action && <Reveal delay={120}>{action}</Reveal>}
    </div>
  );
}
