"use client";

import { motion } from "framer-motion";
import { Bike, Compass, Search, Sparkles, Stars } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type ComponentId =
  | "smart-animate-text"
  | "orbital-image-wheel"
  | "card-stack-scroll"
  | "morphing-text"
  | "tilt-card"
  | "inverted-perspective-carousel"
  | "infinite-slider"
  | "hero-sections"
  | "feature-grids"
  | "spec-cards";

export type ComponentOption = {
  id: ComponentId;
  label: string;
  description: string;
  group: "Featured" | "Concepts";
  status: "Live" | "Soon";
  metric: string;
};

type LibrarySidebarProps = {
  activeId: ComponentId | null;
  options: ComponentOption[];
  onSelect: (id: ComponentId) => void;
  query: string;
  onQueryChange: (value: string) => void;
};

const groups = [
  {
    title: "Featured",
    icon: Sparkles,
  },
  {
    title: "Concepts",
    icon: Compass,
  },
];

export function LibrarySidebar({
  activeId,
  options,
  onSelect,
  query,
  onQueryChange,
}: LibrarySidebarProps) {
  return (
    <aside className="relative h-fit overflow-hidden rounded-[32px] border border-white/10 bg-white/6 shadow-[0_24px_80px_rgba(2,8,23,0.55)] backdrop-blur-2xl lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
      <div className="relative flex h-full flex-col p-5 lg:max-h-[calc(100vh-2rem)]">
        <div className="flex items-start gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-[0_12px_30px_rgba(255,255,255,0.22)]">
            <Bike className="size-5" />
          </div>
          <div>
            <p className="font-[family:var(--font-heading)] text-lg font-semibold tracking-tight text-white">
              Motion Atelier
            </p>
            <p className="mt-1 text-sm text-white/55">
              Component preview hub
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/6 p-3">
            <p className="text-[11px] tracking-[0.22em] text-white/35 uppercase">Live</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {options.filter((option) => option.status === "Live").length}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/6 p-3">
            <p className="text-[11px] tracking-[0.22em] text-white/35 uppercase">Mood</p>
            <p className="mt-2 text-2xl font-semibold text-white">A+</p>
          </div>
        </div>

        <div className="relative mt-5">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/35" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search components"
            className="h-11 rounded-2xl border-white/10 bg-white/6 pl-9 text-white placeholder:text-white/35 shadow-none"
          />
        </div>

        <Separator className="my-5 bg-white/10" />

        <nav className="flex-1 space-y-6 overflow-y-auto pr-1 lg:min-h-0">
          {groups.map((group) => {
            const Icon = group.icon;
            const items = options.filter((option) => option.group === group.title);

            if (!items.length) {
              return null;
            }

            return (
              <div key={group.title}>
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="size-4 text-cyan-300" />
                  <p className="text-xs font-medium tracking-[0.24em] text-white/35 uppercase">
                    {group.title}
                  </p>
                </div>

                <div className="space-y-2">
                  {items.map((item) => {
                    const isActive = item.id === activeId;

                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => onSelect(item.id)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.99 }}
                        className={cn(
                          "block w-full rounded-[22px] border px-3 py-3 text-left transition",
                          isActive
                            ? "border-cyan-300/40 bg-white/12 text-white shadow-[0_12px_40px_rgba(34,211,238,0.18)]"
                            : "border-white/10 bg-white/5 text-white/75 hover:border-white/20 hover:bg-white/8"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium">{item.label}</p>
                            <p
                              className={cn(
                                "mt-1 text-xs leading-5",
                                isActive ? "text-white/70" : "text-white/45"
                              )}
                            >
                              {item.description}
                            </p>
                          </div>
                          <span
                            className={cn(
                              "rounded-full px-2 py-1 text-[10px] font-medium tracking-[0.18em] uppercase",
                              item.status === "Live"
                                ? "bg-emerald-400/12 text-emerald-200"
                                : "bg-white/8 text-white/50"
                            )}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-white/35">{item.metric}</span>
                          {isActive ? (
                            <span className="inline-flex size-7 items-center justify-center rounded-full bg-white text-slate-950">
                              <Stars className="size-3.5" />
                            </span>
                          ) : null}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-4">
          <p className="text-sm font-medium text-white">Preview Flow</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Click", "Preview", "Compare", "Refine"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] tracking-[0.16em] text-white/60 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
