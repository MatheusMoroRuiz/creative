import { cn } from "@/lib/cn";

/**
 * Marca da Creative: o "C" é um rolo de filme e o lápis ocupa a abertura
 * do C (no logotipo original, o lugar do "I" de CREATIVE). Vetor
 * monocromático em `currentColor`, para funcionar sobre vinho, sobre papel
 * e em qualquer tamanho.
 *
 * Ao receber o arquivo vetorial oficial da marca, basta trocar este
 * componente — nenhum outro arquivo depende do desenho.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={cn("block", className)} aria-hidden>
      <mask id="creative-mark" maskUnits="userSpaceOnUse">
        <rect width="120" height="120" fill="black" />
        {/* disco externo → vira o corpo do C */}
        <circle cx="56" cy="60" r="46" fill="white" />
        <circle cx="56" cy="60" r="30" fill="black" />
        {/* abertura do C, à direita */}
        <path d="M56 60 L130 2 L130 118 Z" fill="black" />
        {/* rolo de filme, dentro do C */}
        <circle cx="56" cy="60" r="22" fill="white" />
        <circle cx="56" cy="60" r="4.6" fill="black" />
        <circle cx="56" cy="48" r="4.6" fill="black" />
        <circle cx="66.4" cy="54" r="4.6" fill="black" />
        <circle cx="66.4" cy="66" r="4.6" fill="black" />
        <circle cx="56" cy="72" r="4.6" fill="black" />
        <circle cx="45.6" cy="66" r="4.6" fill="black" />
        <circle cx="45.6" cy="54" r="4.6" fill="black" />
      </mask>

      <rect width="120" height="120" fill="currentColor" mask="url(#creative-mark)" />

      {/* lápis, na abertura do C */}
      <g fill="currentColor">
        <path d="M96 32 L104 46 L88 46 Z" />
        <rect x="88" y="49" width="16" height="38" />
      </g>
    </svg>
  );
}

/** Lockup: marca + wordmark, com assinatura opcional. */
export function Logo({
  className,
  withTagline = false,
}: {
  className?: string;
  withTagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-[1.25em] w-[1.25em] shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1em] leading-none">Creative</span>
        {withTagline && (
          <span className="mt-[0.4em] text-[0.28em] font-semibold uppercase tracking-[0.3em] opacity-70">
            Audiovisual Publicitário
          </span>
        )}
      </span>
    </span>
  );
}
