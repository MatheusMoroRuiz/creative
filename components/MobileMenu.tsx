"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { contact } from "@/config/contact";

type NavItem = { href: string; label: string };

export function MobileMenu({ open, items }: { open: boolean; items: readonly NavItem[] }) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        "fixed inset-0 z-40 flex flex-col justify-between bg-wine px-6 pb-10 pt-28 text-paper transition-[opacity,visibility] duration-500 md:hidden",
        open ? "visible opacity-100" : "invisible opacity-0"
      )}
      aria-hidden={!open}
    >
      <nav className="flex flex-col gap-2" aria-label="Navegação mobile">
        {items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-baseline gap-4 border-b border-paper/20 py-4"
          >
            <span className="eyebrow text-paper/60">0{i + 1}</span>
            <span className="font-display text-[13vw] leading-[0.9] transition-transform duration-300 group-active:translate-x-2">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="flex flex-col items-start gap-3 pt-10 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={contact.instagram.url}
          target="_blank"
          rel="noreferrer"
          className="link-edit eyebrow"
        >
          Instagram
          <span className="link-edit__line" aria-hidden />
        </a>
        <span className="eyebrow text-paper/60">Audiovisual Publicitário</span>
      </div>
    </div>
  );
}
