/**
 * Vídeo de abertura da home. `showreel.mp4` é um recorte automático de
 * ~2,2s de cada projeto real (Snowmell, Duque, James Joyce, Safari,
 * Quebre Seus Espelhos), gerado com ffmpeg a partir dos arquivos
 * enviados pela Creative — não é um still de banco de imagens.
 * Substitua por um showreel editado manualmente quando houver um.
 */
export const hero = {
  video: "/video/showreel.mp4" as string | null,
  poster: "/images/projects/showreel-poster.webp" as string | null,
};
