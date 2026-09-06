import Image from "next/image";
import { AutoplayVideo } from "@/components/AutoplayVideo";
import { FilmPlayer } from "@/components/FilmPlayer";
import { PlaceholderFrame } from "@/components/PlaceholderFrame";
import { cn } from "@/lib/cn";

type MediaFrameProps = {
  video?: string | null;
  image?: string | null;
  poster?: string | null;
  alt: string;
  number?: string;
  label?: string;
  sub?: string | null;
  tone?: "wine" | "charcoal" | "paper";
  className?: string;
  sizes?: string;
  priority?: boolean;
  playVideo?: boolean;
  /** `contain` mostra o frame inteiro, sem corte. */
  fit?: "cover" | "contain";
  /** Controles nativos do player (case do projeto). */
  controls?: boolean;
};

export function MediaFrame({
  video,
  image,
  poster,
  alt,
  number,
  label,
  sub,
  tone = "wine",
  className,
  sizes = "100vw",
  priority = false,
  playVideo = true,
  fit = "cover",
  controls = false,
}: MediaFrameProps) {
  if (video && playVideo) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden", className)}>
        {controls ? (
          <FilmPlayer src={video} poster={poster ?? undefined} fit={fit} />
        ) : (
          <AutoplayVideo src={video} poster={poster ?? undefined} fit={fit} />
        )}
      </div>
    );
  }

  if (image) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden", className)}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={fit === "contain" ? "object-contain" : "object-cover"}
        />
      </div>
    );
  }

  return (
    <PlaceholderFrame
      number={number}
      label={label}
      sub={sub}
      tone={tone}
      className={className}
    />
  );
}
