export type Service = {
  number: string;
  title: string;
  description: string;
  /**
   * Still real de um trabalho da Creative, em /public/images/services.
   * `null` = ainda não há material publicado dessa frente (a seção mostra
   * um cartaz da marca com convite ao contato, em vez de uma imagem).
   */
  media: string | null;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Filmes Realistas",
    description:
      "Comerciais com pessoas e cenários reais, dirigidos com estética cinematográfica e narrativa publicitária — pensados para transmitir credibilidade e presença de marca.",
    media: "/images/services/filmes-realistas.webp",
  },
  {
    number: "02",
    title: "Animação & 3D",
    description:
      "Personagens exclusivos, cenários e universos criados em 3D para cada narrativa, quando a realidade não é o melhor caminho para contar a história.",
    media: "/images/services/animacao-3d.webp",
  },
  {
    number: "03",
    title: "Vídeo 360°",
    description:
      "Ambientes apresentados de forma imersiva, permitindo explorar um espaço como um tour visual cinematográfico.",
    media: null,
  },
  {
    number: "04",
    title: "Roteiro Criativo",
    description:
      "Ideia, narrativa e construção da mensagem antes do primeiro frame — o ponto de partida de todo filme da Creative.",
    media: "/images/services/roteiro-criativo.webp",
  },
];
