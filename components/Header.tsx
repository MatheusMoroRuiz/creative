"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";

const NAV_ITEMS = [
  { href: "/trabalhos", label: "Produções" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/sobre", label: "O que a Creative faz?" },
  { href: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled || menuOpen
            ? "bg-paper/95 text-charcoal backdrop-blur-sm shadow-[0_1px_0_rgba(36,20,22,0.14)]"
            : "bg-transparent text-paper"
        )}
      >
        {!scrolled && !menuOpen && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink/55 to-transparent"
          />
        )}
        <div className="container-edit flex h-20 items-center justify-between sm:h-24">
          <Link href="/" aria-label="Creative — página inicial">
            <Logo className="text-xl sm:text-2xl" />
          </Link>

          <nav
            className="hidden items-center gap-5 md:flex lg:gap-8"
            aria-label="Navegação principal"
          >
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="link-edit eyebrow">
                {item.label}
                <span className="link-edit__line" aria-hidden />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="eyebrow relative z-[60] flex items-center gap-3 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? "Fechar" : "Menu"}
            <span className="relative flex h-4 w-6 flex-col justify-between">
              <span
                className={cn(
                  "h-px w-full bg-current transition-transform duration-300",
                  menuOpen && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-full bg-current transition-opacity duration-300",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "h-px w-full bg-current transition-transform duration-300",
                  menuOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} items={NAV_ITEMS} />
    </>
  );
}
