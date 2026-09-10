import type { Metadata } from "next";
import { Anton, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Poppins cobre todo o texto fora dos títulos grandes: subtítulos,
// corpo, rótulos e formulários.
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Creative — Filmes Publicitários com Linguagem de Cinema",
    template: "%s — Creative",
  },
  description:
    "Produtora audiovisual especializada em filmes publicitários, animação 3D e vídeo 360°. Roteiro criativo e direção visual a serviço da venda.",
  keywords: [
    "filmes publicitários",
    "produtora audiovisual",
    "comercial publicitário",
    "produção audiovisual",
    "vídeo publicitário",
    "animação 3D publicitária",
    "roteiro publicitário",
    "vídeo 360°",
  ],
  openGraph: {
    title: "Creative — Filmes Publicitários com Linguagem de Cinema",
    description:
      "Roteiro, direção visual e narrativa a serviço da venda. Conheça os filmes da Creative.",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative — Filmes Publicitários com Linguagem de Cinema",
    description:
      "Roteiro, direção visual e narrativa a serviço da venda. Conheça os filmes da Creative.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      // Avisa o Next que a rolagem suave é intencional, para ele não
      // atrapalhar a troca de páginas.
      data-scroll-behavior="smooth"
      className={`${anton.variable} ${poppins.variable}`}
    >
      <body className="flex min-h-svh flex-col bg-paper text-charcoal">
        <a
          href="#conteudo"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-wine px-4 py-2 text-paper transition-transform focus-visible:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <div className="grain-overlay" aria-hidden />
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
