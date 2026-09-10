import type { Metadata } from "next";
import { TrabalhosClient } from "@/components/TrabalhosClient";

export const metadata: Metadata = {
  title: "Produções",
  description:
    "Filmes publicitários, animação 3D e vídeo 360° produzidos pela Creative.",
};

export default function TrabalhosPage() {
  return <TrabalhosClient />;
}
