"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { categoryNavLabel } from "@/data/projects";
import { TypewriterMachine } from "@/components/TypewriterMachine";

type Fase = "avancando" | "digitando" | "revelando" | "segurando";

const MS_AVANCO = 640;
const MS_POR_LETRA = 58;
const PAUSA_APOS_DIGITAR = 380;
const MS_REVELACAO = 820;
const MS_SEGURANDO = 3200;

/** Quantos filmes ficam à vista na folha. */
const VISIVEIS = 3;

/** Tira acentos para achar a tecla correspondente no teclado. */
function tecla(c: string) {
  const base = c
    .normalize("NFD")
    .split("")
    .filter((ch) => {
      const code = ch.charCodeAt(0);
      return code < 0x0300 || code > 0x036f;
    })
    .join("")
    .toUpperCase();
  if (base === " ") return " ";
  return /^[A-Z0-9]$/.test(base) ? base : null;
}

function usePrefereMenosMovimento() {
  return useSyncExternalStore(
    (aviso) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", aviso);
      return () => mq.removeEventListener("change", aviso);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

type Entrada = { projeto: Project; id: number };

/**
 * Produções apresentadas como papel contínuo numa máquina de escrever:
 * cada filme é datilografado na linha do rolo, o frame revela-se acima do
 * texto e, no filme seguinte, a folha avança e empurra os anteriores para
 * cima. Ficam três filmes à vista.
 *
 * Com `prefers-reduced-motion` a cena é estática: mostra os três primeiros
 * filmes já compostos, sem datilografia nem avanço.
 */
export function TypewriterStage({ projects }: { projects: Project[] }) {
  const reduzido = usePrefereMenosMovimento();

  // Já começa com o primeiro filme na folha: sem papel em branco na carga.
  const [pilha, setPilha] = useState<Entrada[]>(() =>
    projects.length ? [{ projeto: projects[0], id: 0 }] : []
  );
  const [proximo, setProximo] = useState(1);
  const [digitado, setDigitado] = useState("");
  const [fase, setFase] = useState<Fase>("digitando");
  const [batendo, setBatendo] = useState(false);
  const [ativo, setAtivo] = useState(false);
  const palcoRef = useRef<HTMLDivElement>(null);

  // Reinicia a cena quando a lista muda (filtro de categoria).
  const [listaAnterior, setListaAnterior] = useState(projects);
  if (projects !== listaAnterior) {
    setListaAnterior(projects);
    setPilha(projects.length ? [{ projeto: projects[0], id: 0 }] : []);
    setProximo(1);
    setDigitado("");
    setFase("digitando");
  }

  const atual = pilha[pilha.length - 1]?.projeto;
  const titulo = (atual?.title ?? "").toUpperCase();

  useEffect(() => {
    const el = palcoRef.current;
    // Rede de segurança: se o observador não responder, a cena começa
    // mesmo assim — nunca deixa a folha vazia na tela.
    const reserva = setTimeout(() => setAtivo(true), 1200);
    if (!el || typeof IntersectionObserver === "undefined") {
      return () => clearTimeout(reserva);
    }
    const obs = new IntersectionObserver(([e]) => setAtivo(e.isIntersecting), {
      threshold: 0.15,
    });
    obs.observe(el);
    return () => {
      clearTimeout(reserva);
      obs.disconnect();
    };
  }, []);

  // Máquina de estados da cena.
  useEffect(() => {
    if (reduzido || !ativo || projects.length === 0) return;

    let bater: ReturnType<typeof setTimeout>;

    const espera =
      fase === "avancando"
        ? MS_AVANCO
        : fase === "digitando"
          ? digitado.length < titulo.length
            ? MS_POR_LETRA
            : PAUSA_APOS_DIGITAR
          : fase === "revelando"
            ? MS_REVELACAO
            : MS_SEGURANDO;

    const t = setTimeout(() => {
      if (fase === "avancando") {
        const projeto = projects[proximo % projects.length];
        // `proximo` cresce sempre, então serve de chave única por entrada.
        // Guarda um a mais que o visível: o extra sai cortado pelo topo.
        setPilha((p) => [...p, { projeto, id: proximo }].slice(-(VISIVEIS + 1)));
        setProximo((n) => n + 1);
        setDigitado("");
        setFase("digitando");
      } else if (fase === "digitando") {
        if (digitado.length < titulo.length) {
          setDigitado(titulo.slice(0, digitado.length + 1));
          setBatendo(true);
          bater = setTimeout(() => setBatendo(false), 70);
        } else {
          setFase("revelando");
        }
      } else if (fase === "revelando") {
        setFase("segurando");
      } else {
        setFase("avancando");
      }
    }, espera);

    return () => {
      clearTimeout(t);
      clearTimeout(bater);
    };
  }, [fase, digitado, titulo, ativo, reduzido, projects, proximo]);

  if (projects.length === 0) return null;

  // Sem movimento: a folha já vem composta.
  const entradas = reduzido
    ? projects.slice(0, VISIVEIS).map((projeto, i) => ({ projeto, id: i }))
    : pilha;

  const digitando = !reduzido && fase === "digitando";
  const teclaAtual =
    digitando && digitado.length > 0 ? tecla(digitado[digitado.length - 1]) : null;

  return (
    <div ref={palcoRef} className="mx-auto max-w-2xl">
      {/* folha contínua: o filme mais novo fica embaixo, junto ao rolo */}
      <div className="mx-auto flex h-[330px] w-full max-w-[300px] flex-col justify-end overflow-hidden border border-b-0 border-charcoal/10 bg-white px-4 pt-5 shadow-[0_22px_50px_rgba(20,8,9,0.2)] sm:h-[640px] sm:max-w-[400px] sm:px-6">
        {entradas.map((entrada, i) => {
          const ultima = i === entradas.length - 1;
          const emDigitacao = !reduzido && ultima;
          const texto = emDigitacao
            ? digitado
            : (entrada.projeto.title ?? "").toUpperCase();
          const revelado =
            reduzido || !ultima || fase === "revelando" || fase === "segurando";

          return (
            <div key={entrada.id} className="folha-avanco shrink-0">
              <div className="min-h-0 overflow-hidden">
                <Link href={`/trabalhos/${entrada.projeto.slug}`} className="mb-5 block">
                  <div
                    className="relative aspect-[4/3] w-full overflow-hidden bg-bone"
                    style={{
                      clipPath: revelado ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                      transition: `clip-path ${MS_REVELACAO}ms cubic-bezier(.16,1,.3,1)`,
                    }}
                  >
                    {entrada.projeto.thumbnail && (
                      <Image
                        src={entrada.projeto.thumbnail}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 70vw, 400px"
                        priority
                        className="object-cover"
                      />
                    )}
                    {entrada.projeto.preview && revelado && (
                      <video
                        src={entrada.projeto.preview}
                        poster={entrada.projeto.thumbnail ?? undefined}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        disablePictureInPicture
                        controlsList="nodownload noplaybackrate noremoteplayback"
                        onContextMenu={(e) => e.preventDefault()}
                        aria-hidden
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <p
                    className="mt-2 flex items-center justify-between gap-3 text-charcoal"
                    style={{
                      font: "600 11px/1.4 ui-monospace, 'Courier New', monospace",
                      letterSpacing: "0.06em",
                    }}
                  >
                    <span className="truncate">
                      <span aria-hidden>{texto}</span>
                      <span className="sr-only">{entrada.projeto.title}</span>
                      {emDigitacao && fase === "digitando" && (
                        <span
                          aria-hidden
                          className="ml-0.5 inline-block w-[6px] animate-pulse bg-charcoal align-middle"
                          style={{ height: "0.9em" }}
                        />
                      )}
                    </span>
                    <span
                      className="shrink-0 text-charcoal/45 transition-opacity duration-500"
                      style={{ opacity: revelado ? 1 : 0 }}
                    >
                      {categoryNavLabel[entrada.projeto.category]}
                      {entrada.projeto.duration ? ` ${entrada.projeto.duration}` : ""}
                    </span>
                  </p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <TypewriterMachine
        pressedKey={teclaAtual}
        striking={batendo}
        className="relative z-10 -mt-1"
      />
    </div>
  );
}
