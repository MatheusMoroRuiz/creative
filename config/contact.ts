/**
 * Canais de contato reais da Creative.
 *
 * - `instagram` e `whatsapp` vêm da bio pública do Instagram
 *   (@creative_filmesaudiovisual): api.whatsapp.com/send?phone=5514996183380
 * - `email` NÃO foi informado em nenhum material recebido. Deixe `null`
 *   até que a Creative forneça um endereço real — o site não deve inventar
 *   nem exibir um botão de e-mail enquanto este campo estiver vazio.
 *
 * Para adicionar e-mail no futuro, basta preencher `email` abaixo.
 * Para trocar o número de WhatsApp, edite `whatsapp` (formato E.164 sem
 * "+", ex: 55DDDNUMERO).
 */
export const contact = {
  instagram: {
    handle: "@creative_filmesaudiovisual",
    url: "https://www.instagram.com/creative_filmesaudiovisual",
  },
  whatsapp: "5514996183380" as string | null,
  email: null as string | null,
  city: null as string | null,
};

export function whatsappLink(prefilledMessage?: string) {
  if (!contact.whatsapp) return null;
  const base = `https://api.whatsapp.com/send?phone=${contact.whatsapp}`;
  if (!prefilledMessage) return base;
  return `${base}&text=${encodeURIComponent(prefilledMessage)}`;
}

export const isWhatsappConfigured = Boolean(contact.whatsapp);
export const isEmailConfigured = Boolean(contact.email);
