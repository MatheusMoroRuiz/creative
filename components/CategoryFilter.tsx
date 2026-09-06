"use client";

import { cn } from "@/lib/cn";
import type { ProjectCategory } from "@/data/projects";
import { categoryNavLabel } from "@/data/projects";

export type CategoryFilterValue = "todos" | ProjectCategory;

const OPTIONS: { value: CategoryFilterValue; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "realista", label: categoryNavLabel.realista },
  { value: "animacao-3d", label: categoryNavLabel["animacao-3d"] },
  { value: "360", label: categoryNavLabel["360"] },
];

export function CategoryFilter({
  value,
  onChange,
}: {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}) {
  return (
    <div
      className="flex flex-wrap items-center gap-x-6 gap-y-3"
      role="tablist"
      aria-label="Filtrar projetos por categoria"
    >
      {OPTIONS.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "eyebrow relative pb-1 transition-colors",
              active ? "text-charcoal" : "text-charcoal/40 hover:text-charcoal/70"
            )}
          >
            {opt.label}
            <span
              className={cn(
                "absolute inset-x-0 -bottom-0.5 h-px bg-wine transition-transform duration-300 origin-left",
                active ? "scale-x-100" : "scale-x-0"
              )}
              aria-hidden
            />
          </button>
        );
      })}
    </div>
  );
}
