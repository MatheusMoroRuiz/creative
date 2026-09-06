import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";
import { contact, whatsappLink, isWhatsappConfigured } from "@/config/contact";

export const metadata: Metadata = {
  title: "Contato",
  description: "Conte sobre o seu projeto e peça um orçamento para a Creative.",
};

export default function ContatoPage() {
  const directWhatsapp = whatsappLink(
    "Olá! Vim pelo site da Creative e quero falar sobre um projeto."
  );

  return (
    <div className="container-edit pb-20 pt-28 sm:pt-36">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Painel da marca */}
        <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <div className="relative flex flex-col overflow-hidden bg-wine p-8 text-paper sm:p-10">
            <LogoMark className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 text-paper/10" />

            <div className="relative">
              <span className="eyebrow text-paper/70">Contato</span>
              <h1 className="font-display mt-3 text-[11vw] leading-[0.9] sm:text-[5vw] lg:text-[3.5rem]">
                Vamos criar
                <br />o próximo?
              </h1>
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-paper/80">
                Conte o objetivo do filme e a gente volta com a ideia, o
                formato e o orçamento.
              </p>
            </div>

            <div className="relative mt-10 flex flex-col gap-4 border-t border-paper/20 pt-6">
              {isWhatsappConfigured && directWhatsapp && (
                <a
                  href={directWhatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 border border-paper/30 px-5 py-4 transition-colors hover:border-paper hover:bg-paper hover:text-wine"
                >
                  <span className="eyebrow">Chamar no WhatsApp</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              )}

              <a
                href={contact.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="link-edit eyebrow text-paper/80"
              >
                {contact.instagram.handle}
                <span className="link-edit__line" aria-hidden />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Formulário */}
        <Reveal delay={120} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
