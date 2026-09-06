"use client";

import { useState, type FormEvent } from "react";
import {
  contact,
  whatsappLink,
  isWhatsappConfigured,
  isEmailConfigured,
} from "@/config/contact";

const PROJECT_TYPES = [
  "Filme publicitário",
  "Animação / 3D",
  "Vídeo 360°",
  "Roteiro / Conceito",
  "Outro",
];

const fieldClass =
  "w-full border border-charcoal/15 bg-bone/40 px-4 py-3.5 text-base text-charcoal outline-none transition-colors placeholder:text-charcoal/35 focus:border-wine focus:bg-white";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const canSubmit = isWhatsappConfigured || isEmailConfigured;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const message = [
      "Novo projeto pelo site da Creative:",
      "",
      `Nome: ${data.get("nome")}`,
      `Empresa/Marca: ${data.get("empresa") || "—"}`,
      `WhatsApp: ${data.get("whatsapp") || "—"}`,
      `E-mail: ${data.get("email") || "—"}`,
      `Tipo de projeto: ${data.get("tipo")}`,
      `Previsão de produção: ${data.get("previsao") || "—"}`,
      "",
      `Sobre o projeto: ${data.get("mensagem")}`,
    ].join("\n");

    if (isWhatsappConfigured) {
      const link = whatsappLink(message);
      if (link) window.open(link, "_blank", "noreferrer");
    } else if (isEmailConfigured && contact.email) {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        "Novo projeto — site Creative"
      )}&body=${encodeURIComponent(message)}`;
    }

    setSent(true);
    form.reset();
  }

  if (!canSubmit) {
    return (
      <p className="max-w-md text-lg text-charcoal/70">
        O formulário está pronto, mas nenhum canal de envio foi configurado
        ainda. Adicione um WhatsApp ou e-mail em{" "}
        <code className="bg-charcoal/10 px-1.5 py-0.5">config/contact.ts</code>{" "}
        para ativá-lo.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <fieldset className="flex flex-col gap-5 border-t border-charcoal/15 pt-7">
        <legend className="eyebrow bg-paper pr-4 text-charcoal/45">
          Sobre você
        </legend>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Nome" name="nome" required autoComplete="name" />
          <Field label="Empresa / Marca" name="empresa" autoComplete="organization" />
          <Field
            label="WhatsApp"
            name="whatsapp"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(00) 00000-0000"
          />
          <Field label="E-mail" name="email" type="email" autoComplete="email" />
        </div>
      </fieldset>

      <fieldset className="mt-10 flex flex-col gap-4 border-t border-charcoal/15 pt-7">
        <legend className="eyebrow bg-paper pr-4 text-charcoal/45">
          Tipo de projeto
        </legend>

        <div className="flex flex-wrap gap-2.5">
          {PROJECT_TYPES.map((type, i) => (
            <label key={type} className="cursor-pointer">
              <input
                type="radio"
                name="tipo"
                value={type}
                required
                defaultChecked={i === 0}
                className="peer sr-only"
              />
              <span className="eyebrow block border border-charcoal/20 px-4 py-2.5 transition-colors hover:border-charcoal/45 peer-checked:border-wine peer-checked:bg-wine peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-wine">
                {type}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-10 flex flex-col gap-5 border-t border-charcoal/15 pt-7">
        <legend className="eyebrow bg-paper pr-4 text-charcoal/45">
          Sobre o projeto
        </legend>

        <label className="flex flex-col gap-2">
          <span className="eyebrow text-charcoal/55">
            Conte um pouco sobre o projeto <Req />
          </span>
          <textarea
            name="mensagem"
            required
            rows={5}
            className={fieldClass}
            placeholder="O que você vende, para quem, e o que precisa acontecer depois que a pessoa assistir."
          />
        </label>

        <Field
          label="Quando pretende produzir?"
          name="previsao"
          placeholder="Opcional — mês, prazo ou data de veiculação"
        />
      </fieldset>

      <div className="mt-10 flex flex-col gap-4 border-t border-charcoal/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group flex items-center justify-center gap-3 bg-wine px-8 py-4 text-paper transition-colors hover:bg-wine-deep sm:justify-start"
        >
          <span className="font-display text-lg leading-none">Enviar projeto</span>
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </button>

        <p className="max-w-xs text-sm leading-relaxed text-charcoal/55">
          {sent ? (
            <span className="text-wine" role="status">
              {isWhatsappConfigured
                ? "Abrimos seu WhatsApp com a mensagem pronta — é só tocar em enviar."
                : "Abrimos seu e-mail com a mensagem pronta — é só tocar em enviar."}
            </span>
          ) : isWhatsappConfigured ? (
            "Ao enviar, abrimos o WhatsApp da Creative com a sua mensagem já escrita."
          ) : (
            "Ao enviar, abrimos seu e-mail com a mensagem já escrita."
          )}
        </p>
      </div>
    </form>
  );
}

function Req() {
  return (
    <span aria-hidden className="text-wine">
      *
    </span>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
  ...rest
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-2">
      <span className="eyebrow text-charcoal/55">
        {label} {required && <Req />}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className={fieldClass}
        {...rest}
      />
    </label>
  );
}
