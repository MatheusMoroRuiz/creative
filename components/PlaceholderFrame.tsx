import { cn } from "@/lib/cn";

type PlaceholderFrameProps = {
  number?: string;
  label?: string;
  sub?: string | null;
  tone?: "wine" | "charcoal" | "paper";
  className?: string;
};

/**
 * Substitui uma imagem/vídeo ausente por um frame com textura da marca —
 * nunca uma foto de banco. Usado sempre que `thumbnail`, `video` ou
 * `poster` de um projeto ainda não foram configurados.
 */
export function PlaceholderFrame({
  number,
  label = "Creative",
  sub,
  className,
}: PlaceholderFrameProps) {
  return (
    <div
      className={cn(
        "frame-duotone relative flex h-full w-full flex-col justify-between p-6 text-paper sm:p-8",
        className
      )}
    >
      {number && (
        <span
          aria-hidden
          className="ghost-type absolute -bottom-[0.15em] -left-[0.04em] z-0 text-[7rem] sm:text-[9rem]"
        >
          {number}
        </span>
      )}

      <div className="relative z-10 flex items-start justify-between">
        <span className="eyebrow text-paper/80">{label}</span>
        {number && <span className="eyebrow text-paper/50">{number}</span>}
      </div>

      <div className="relative z-10 flex items-end justify-between gap-4">
        <span className="font-display text-[clamp(1.25rem,3vw,2rem)] leading-[0.9] text-paper/90">
          Material a caminho
        </span>
        {sub && <span className="eyebrow shrink-0 text-paper/60">{sub}</span>}
      </div>
    </div>
  );
}
