import { cn } from "@/lib/cn";

const ROWS = ["1234567890", "QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const ROW_Y = [206, 244, 282, 320];
const KEY_R = 15;
const KEY_GAP = 40;
const CENTER = 300;

type Key = { char: string; x: number; y: number };

const KEYS: Key[] = ROWS.flatMap((row, r) =>
  row.split("").map((char, i) => ({
    char,
    x: CENTER - ((row.length - 1) * KEY_GAP) / 2 + i * KEY_GAP,
    y: ROW_Y[r],
  }))
);

/**
 * Máquina de escrever desenhada em vetor, na paleta da Creative.
 * Ilustração original — nenhuma foto de banco envolvida.
 * `pressedKey` faz a tecla correspondente afundar; `striking` aciona a
 * barra de tipos no centro do cesto.
 */
export function TypewriterMachine({
  pressedKey,
  striking,
  className,
}: {
  pressedKey: string | null;
  striking: boolean;
  className?: string;
}) {
  const spaceDown = pressedKey === " ";

  return (
    <svg
      viewBox="0 0 600 380"
      className={cn("block w-full", className)}
      aria-hidden
      focusable="false"
    >
      {/* cilindro / rolo do papel */}
      <rect x="112" y="36" width="376" height="30" rx="15" fill="var(--color-bone)" />
      <rect x="112" y="36" width="376" height="12" rx="6" fill="var(--color-white)" opacity="0.5" />
      <circle cx="98" cy="51" r="24" fill="var(--color-wine-deep)" />
      <circle cx="98" cy="51" r="10" fill="var(--color-wine)" />
      <circle cx="502" cy="51" r="24" fill="var(--color-wine-deep)" />
      <circle cx="502" cy="51" r="10" fill="var(--color-wine)" />

      {/* barra do apoio de papel */}
      <rect x="150" y="72" width="300" height="5" rx="2.5" fill="var(--color-ink)" opacity="0.55" />
      <rect x="186" y="66" width="16" height="16" rx="3" fill="var(--color-ink)" opacity="0.7" />
      <rect x="398" y="66" width="16" height="16" rx="3" fill="var(--color-ink)" opacity="0.7" />

      {/* cesto de tipos */}
      <path d="M84 96 H516 L536 148 H64 Z" fill="var(--color-wine)" />
      <path d="M84 96 H516 L520 106 H80 Z" fill="var(--color-white)" opacity="0.12" />
      <path
        d="M228 148 a72 42 0 0 1 144 0 Z"
        fill="var(--color-ink)"
        opacity="0.85"
      />
      {/* barras de tipo */}
      {[-52, -34, -17, 0, 17, 34, 52].map((dx, i) => (
        <line
          key={dx}
          x1={300 + dx * 1.25}
          y1="146"
          x2={300 + dx}
          y2="120"
          stroke="var(--color-bone)"
          strokeWidth="2"
          opacity={i === 3 ? 0.9 : 0.45}
        />
      ))}
      {/* barra que bate no papel (transform — atributos SVG não animam em CSS) */}
      <g
        style={{
          transform: striking ? "translateY(0)" : "translateY(30px)",
          transition: "transform 90ms cubic-bezier(.2,.9,.3,1)",
        }}
      >
        <rect x="298" y="70" width="4" height="78" rx="2" fill="var(--color-bone)" />
      </g>

      {/* corpo */}
      <path d="M64 148 H536 L556 330 H44 Z" fill="var(--color-wine)" />
      <path d="M64 148 H536 L539 172 H61 Z" fill="var(--color-ink)" opacity="0.18" />
      <rect x="30" y="330" width="540" height="26" rx="10" fill="var(--color-wine-deep)" />

      {/* teclas */}
      {KEYS.map((k) => {
        const down = pressedKey === k.char;
        return (
          <g
            key={k.char + k.x}
            style={{
              transform: down ? "translateY(3.5px)" : "translateY(0)",
              transition: "transform 90ms ease-out",
            }}
          >
            <circle cx={k.x} cy={k.y + 4} r={KEY_R} fill="var(--color-ink)" opacity="0.45" />
            <circle
              cx={k.x}
              cy={k.y}
              r={KEY_R}
              fill={down ? "var(--color-bone)" : "var(--color-paper)"}
            />
            <text
              x={k.x}
              y={k.y + 4.5}
              textAnchor="middle"
              fill="var(--color-charcoal)"
              style={{ font: "600 12px var(--font-sans), sans-serif" }}
            >
              {k.char}
            </text>
          </g>
        );
      })}

      {/* barra de espaço */}
      <g
        style={{
          transform: spaceDown ? "translateY(3.5px)" : "translateY(0)",
          transition: "transform 90ms ease-out",
        }}
      >
        <rect x="192" y="352" width="216" height="16" rx="8" fill="var(--color-ink)" opacity="0.45" />
        <rect
          x="192"
          y="348"
          width="216"
          height="16"
          rx="8"
          fill={spaceDown ? "var(--color-bone)" : "var(--color-paper)"}
        />
      </g>
    </svg>
  );
}
