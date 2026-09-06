import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type FilmFrameProps = {
  children: ReactNode;
  className?: string;
  /** `light` = sobre fundo creme; `dark` = sobre fundo escuro. */
  tone?: "light" | "dark";
};

/**
 * Moldura da marca: o filme fica montado sobre uma segunda cartela
 * deslocada em verde oliva — como uma cópia emoldurada sobre passe-partout.
 * No hover a cartela encaixa no filme, em vez de qualquer efeito solto.
 */
export function FilmFrame({ children, className, tone = "light" }: FilmFrameProps) {
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 translate-x-2.5 translate-y-2.5 border motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out group-hover:translate-x-0 group-hover:translate-y-0 sm:translate-x-3.5 sm:translate-y-3.5",
          tone === "light" ? "border-wine/60" : "border-wine/70"
        )}
      />
      <div
        className={cn(
          "relative overflow-hidden border bg-ink",
          tone === "light" ? "border-charcoal/25" : "border-paper/25"
        )}
      >
        {children}
      </div>
    </div>
  );
}
