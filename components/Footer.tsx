import Link from "next/link";
import { contact } from "@/config/contact";
import { Logo } from "@/components/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="container-edit flex flex-col gap-10 py-14 sm:flex-row sm:items-end sm:justify-between">
        <Logo className="text-3xl" withTagline />

        <div className="flex gap-10">
          <a
            href={contact.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="link-edit eyebrow"
          >
            Instagram
            <span className="link-edit__line" aria-hidden />
          </a>
          <Link href="/contato" className="link-edit eyebrow">
            Contato
            <span className="link-edit__line" aria-hidden />
          </Link>
        </div>

        <p className="eyebrow text-paper/60">
          {contact.city ? `${contact.city} — ` : ""}© {year} Creative
        </p>
      </div>
    </footer>
  );
}
