"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { TypewriterStage } from "@/components/TypewriterStage";
import { SectionHeading } from "@/components/SectionHeading";
import { CategoryFilter, type CategoryFilterValue } from "@/components/CategoryFilter";

export function ProjectsSection() {
  const [filter, setFilter] = useState<CategoryFilterValue>("todos");

  const featured = useMemo(() => {
    const base = projects.filter((p) => p.featured);
    return filter === "todos" ? base : base.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="trabalhos" className="section-pad bg-paper">
      <div className="container-edit">
        <SectionHeading
          number="Produções"
          title={
            <>
              Filmes que fazem
              <br />a marca ser vista.
            </>
          }
          action={<CategoryFilter value={filter} onChange={setFilter} />}
        />

        {featured.length > 0 ? (
          <TypewriterStage projects={featured} />
        ) : (
          <p className="text-lg text-charcoal/60">Nenhum projeto nesta categoria ainda.</p>
        )}

        <div className="mt-14 flex justify-end sm:mt-16">
          <Link href="/trabalhos" className="link-edit eyebrow text-lg">
            Ver todas as produções →
            <span className="link-edit__line" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
