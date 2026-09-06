/**
 * Domínio real do site. Defina NEXT_PUBLIC_SITE_URL no ambiente de produção
 * (ex: Vercel) assim que o domínio da Creative for definido. Enquanto isso,
 * sitemap/robots usam um valor local para não travar o build.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
