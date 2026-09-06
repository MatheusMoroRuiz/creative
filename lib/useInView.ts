"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Marca o elemento como "em vista" uma vez e mantém — usado para reveals
 * de scroll que não devem re-disparar ao rolar para cima/baixo.
 */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      const id = setTimeout(() => setInView(true), 0);
      return () => clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options }
    );

    observer.observe(el);

    // Rede de segurança: nenhum conteúdo pode ficar escondido porque o
    // observador não disparou (aba em segundo plano, zoom, captura de tela
    // de página inteira). Passado esse tempo, revela de qualquer forma.
    const failsafe = setTimeout(() => {
      setInView(true);
      observer.disconnect();
    }, 1200);

    return () => {
      clearTimeout(failsafe);
      observer.disconnect();
    };
  }, [options]);

  return { ref, inView };
}
