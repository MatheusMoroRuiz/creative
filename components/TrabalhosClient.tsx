"use client";

import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { WorksList } from "@/components/WorksList";
import { CategoryFilter, type CategoryFilterValue } from "@/components/CategoryFilter";
import { Reveal } from "@/components/Reveal";

export function TrabalhosClient() {
  const [filter, setFilter] = useState<CategoryFilterValue>("todos");

  const list = useMemo(
    () => (filter === "todos" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div className="container-edit pb-20 pt-28 sm:pt-36">
      <Reveal>
        <span className="eyebrow text-charcoal/50">Trabalhos</span>
        <h1 className="font-display mt-3 text-[10vw] leading-[0.9] sm:text-[5vw] lg:text-[3.75rem]">
          Filmes que fazem
          <br />a marca ser vista.
        </h1>
      </Reveal>

      <div className="mt-10 border-b border-charcoal/15 pb-8 sm:mt-12">
        <CategoryFilter value={filter} onChange={setFilter} />
      </div>

      {list.length === 0 ? (
        <p className="mt-20 text-lg text-charcoal/60">
          Nenhum projeto nesta categoria ainda.
        </p>
      ) : (
        <div className="mt-4">
          <WorksList projects={list} />
        </div>
      )}
    </div>
  );
}
