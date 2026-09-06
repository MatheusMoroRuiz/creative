export type ProjectCategory = "realista" | "animacao-3d" | "360";

export type ProjectOrientation = "horizontal" | "vertical";

export type Project = {
  /** URL slug — usado em /trabalhos/[slug] */
  slug: string;
  /** Nome real do projeto. Use `null` até que o título verdadeiro seja confirmado. */
  title: string | null;
  category: ProjectCategory;
  orientation: ProjectOrientation;
  /** Ano de produção, quando confirmado. Não inventar. */
  year: number | null;
  /** Duração do filme, ex: "00:30". Não inventar. */
  duration: string | null;
  /** Nome do cliente/marca. NUNCA preencher sem confirmação explícita do proprietário. */
  client: string | null;
  /** Contexto curto do projeto. Deixe `null` enquanto não houver texto real. */
  description: string | null;
  /** Caminho em /public para thumbnail (grid). `null` = renderiza PlaceholderFrame. */
  thumbnail: string | null;
  /** Caminho em /public (ou URL) para o vídeo do projeto. `null` = sem player. */
  video: string | null;
  /** Poster do vídeo. `null` = usa PlaceholderFrame como poster. */
  poster: string | null;
  /** Aparece na seleção da home. */
  featured: boolean;
};

export const categoryLabel: Record<ProjectCategory, string> = {
  realista: "Filme Publicitário / Realista",
  "animacao-3d": "Animação / 3D",
  "360": "Vídeo 360°",
};

export const categoryNavLabel: Record<ProjectCategory, string> = {
  realista: "Realista",
  "animacao-3d": "3D / Animação",
  "360": "360°",
};

/**
 * Projetos reais, enviados pela Creative em 06/09/2026 (pasta
 * VideosProjetos). Título e cliente só foram preenchidos quando
 * identificados com certeza dentro do próprio vídeo (logo/placa/letreiro
 * visível em cena) — nunca por suposição. `year` fica `null`: os arquivos
 * não trazem data de produção confirmada.
 *
 * A categoria "360°" existe no filtro porque é um serviço oferecido, mas
 * ainda não há projeto publicado dela — o filtro mostra o estado vazio em
 * vez de um item de exemplo. Basta acrescentar o projeto aqui quando a
 * Creative enviar o material.
 */
export const projects: Project[] = [
  {
    slug: "snowmell",
    title: "Snowmell",
    category: "animacao-3d",
    orientation: "vertical",
    year: null,
    duration: "00:23",
    client: "Snowmell — Sorveteria Artesanal",
    description:
      "Filme publicitário em animação 3D para redes sociais, com personagem e cenário exclusivos criados para a marca.",
    thumbnail: "/images/projects/snowmell.webp",
    video: "/video/snowmell.mp4",
    poster: "/images/projects/snowmell.webp",
    featured: true,
  },
  {
    slug: "duque-padaria-confeitaria",
    title: "Duque Padaria & Confeitaria",
    category: "realista",
    orientation: "vertical",
    year: null,
    duration: "00:42",
    client: "Duque Padaria & Confeitaria",
    description:
      "Filme publicitário vertical com transição criativa em formato de fechadura, revelando a experiência da padaria.",
    thumbnail: "/images/projects/duque-padaria.webp",
    video: "/video/duque-padaria.mp4",
    poster: "/images/projects/duque-padaria.webp",
    featured: true,
  },
  {
    slug: "james-joyce-irish-pub",
    title: "James Joyce Irish Pub",
    category: "realista",
    orientation: "vertical",
    year: null,
    duration: "00:34",
    client: "James Joyce Irish Pub",
    description:
      "Filme publicitário vertical para redes sociais, apresentando a fachada e a atmosfera do ponto.",
    thumbnail: "/images/projects/james-joyce-pub.webp",
    video: "/video/james-joyce-pub.mp4",
    poster: "/images/projects/james-joyce-pub.webp",
    featured: true,
  },
  {
    slug: "experiencia-tematica-safari",
    title: "Experiência Temática Safari",
    category: "realista",
    orientation: "horizontal",
    year: null,
    duration: "00:21",
    client: null,
    description:
      "Cobertura em vídeo de uma experiência gastronômica temática, com personagem mascote e clientes reais.",
    thumbnail: "/images/projects/safari-restaurante.webp",
    video: "/video/safari-restaurante.mp4",
    poster: "/images/projects/safari-restaurante.webp",
    featured: true,
  },
  {
    slug: "quebre-seus-espelhos",
    title: "Quebre Seus Espelhos",
    category: "animacao-3d",
    orientation: "vertical",
    year: null,
    duration: "00:43",
    client: null,
    description:
      "Curta de animação 3D com roteiro autoral sobre coragem e autoimagem.",
    thumbnail: "/images/projects/quebre-seus-espelhos.webp",
    video: "/video/quebre-seus-espelhos.mp4",
    poster: "/images/projects/quebre-seus-espelhos.webp",
    featured: false,
  },
  {
    slug: "duque-paes-quentinhos",
    title: "Duque — Pães Quentinhos",
    category: "realista",
    orientation: "vertical",
    year: null,
    duration: "00:36",
    client: "Duque Padaria & Confeitaria",
    description:
      "Bastidores da produção do pão fresco, do forno à mesa, para redes sociais da padaria.",
    thumbnail: "/images/projects/duque-paes.webp",
    video: "/video/duque-paes.mp4",
    poster: "/images/projects/duque-paes.webp",
    featured: false,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length];
}
