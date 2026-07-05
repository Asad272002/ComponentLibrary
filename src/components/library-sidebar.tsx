"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bike, Compass, Search, Sparkles, Stars, X } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type ComponentId =
  | "smart-animate-text"
  | "logo-loader"
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
  mobileOpen: boolean;
  onToggleMobile: () => void;
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
  mobileOpen,
  onToggleMobile,
}: LibrarySidebarProps) {
  const [hovered, setHovered] = useState(false);
  const expanded = hovered;

  const track = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHovered(false);
        }
      }}
      className={cn(
        "sticky top-4 hidden h-[calc(100vh-2rem)] overflow-hidden rounded-[32px] border border-white/60 bg-white/65 shadow-[0_24px_80px_rgba(79,70,229,0.16)] backdrop-blur-2xl transition-[width,box-shadow] duration-300 lg:flex lg:flex-col",
        expanded ? "w-[320px]" : "w-[96px]",
        expanded
          ? "shadow-[0_30px_90px_rgba(79,70,229,0.22)]"
          : "shadow-[0_18px_50px_rgba(79,70,229,0.10)]"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.10),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.10),transparent_28%)]" />

      <div
        className={cn(
          "flex shrink-0 items-center gap-3 border-b border-white/60 p-4 transition-[justify-content] duration-300",
          expanded ? "justify-between" : "justify-center"
        )}
      >
        <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 text-white shadow-[0_12px_30px_rgba(79,70,229,0.35)]">
          <Bike className="size-5" />
        </div>
        {expanded ? (
          <div className="min-w-0 flex-1">
            <p className="truncate font-[family:var(--font-heading)] text-base font-semibold tracking-tight text-slate-900">
              Motion Atelier
            </p>
            <p className="truncate text-xs text-slate-500">Component preview hub</p>
          </div>
        ) : null}
        <button
          type="button"
          onClick={onToggleMobile}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white/70 text-slate-700 transition hover:bg-white/90 lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="size-4" />
        </button>
      </div>

      <div
        className={cn(
          "flex shrink-0 items-center gap-2 border-b border-white/60 p-4 transition-[padding] duration-300",
          expanded ? "justify-between" : "justify-center"
        )}
      >
        {expanded ? (
          <div className="grid flex-1 grid-cols-2 gap-2">
            <div className="rounded-2xl border border-white/70 bg-white/70 px-3 py-2">
              <p className="text-[10px] tracking-[0.22em] text-slate-500 uppercase">Live</p>
              <p className="mt-1 text-base font-semibold text-slate-900">
                {String(options.filter((option) => option.status === "Live").length).padStart(2, "0")}
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/70 px-3 py-2">
              <p className="text-[10px] tracking-[0.22em] text-slate-500 uppercase">Mode</p>
              <p className="mt-1 text-base font-semibold text-slate-900">Glass</p>
            </div>
          </div>
        ) : (
          <span className="rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] text-slate-600 uppercase">
            {String(options.filter((option) => option.status === "Live").length).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className={cn("relative shrink-0 px-4 pb-2 pt-3", !expanded && "hidden")}>
        <Search className="pointer-events-none absolute top-1/2 left-7 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search components"
          className="h-10 rounded-2xl border-white/70 bg-white/70 pl-9 text-slate-900 placeholder:text-slate-400 shadow-[0_10px_30px_rgba(79,70,229,0.06)]"
        />
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-3">
        {groups.map((group) => {
          const Icon = group.icon;
          const items = options.filter((option) => option.group === group.title);

          if (!items.length) {
            return null;
          }

          return (
            <div key={group.title}>
              {expanded ? (
                <div className="mb-2 flex items-center gap-2 px-1">
                  <Icon className="size-4 shrink-0 text-indigo-600" />
                  <p className="text-[11px] font-medium tracking-[0.24em] text-slate-500 uppercase">
                    {group.title}
                  </p>
                </div>
              ) : null}

              <div className={cn("space-y-2", expanded ? "" : "flex flex-col items-center")}>
                {items.map((item) => {
                  const isActive = item.id === activeId;

                  if (expanded) {
                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onSelect(item.id);
                          if (mobileOpen) {
                            onToggleMobile();
                          }
                        }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.99 }}
                        className={cn(
                          "block w-full rounded-[20px] border px-3 py-3 text-left transition",
                          isActive
                            ? "border-indigo-300/80 bg-white/85 text-slate-900 shadow-[0_12px_40px_rgba(79,70,229,0.18)]"
                            : "border-white/70 bg-white/55 text-slate-800 hover:border-indigo-200/80 hover:bg-white/80"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-medium">{item.label}</p>
                            <p
                              className={cn(
                                "mt-1 text-xs leading-5",
                                isActive ? "text-slate-700" : "text-slate-500"
                              )}
                            >
                              {item.description}
                            </p>
                          </div>
                          <span
                            className={cn(
                              "rounded-full px-2 py-1 text-[10px] font-medium tracking-[0.18em] uppercase",
                              item.status === "Live"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-200/70 text-slate-600"
                            )}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-slate-400">{item.metric}</span>
                          {isActive ? (
                            <span className="inline-flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-[0_8px_24px_rgba(79,70,229,0.35)]">
                              <Stars className="size-3.5" />
                            </span>
                          ) : null}
                        </div>
                      </motion.button>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelect(item.id)}
                      aria-label={item.label}
                      className={cn(
                        "flex size-11 items-center justify-center rounded-2xl border transition",
                        isActive
                          ? "border-indigo-300/80 bg-white text-indigo-700 shadow-[0_10px_28px_rgba(79,70,229,0.20)]"
                          : "border-white/70 bg-white/60 text-slate-700 hover:border-indigo-200/80 hover:bg-white/85"
                      )}
                    >
                      <Sparkles className="size-4" />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {expanded ? (
        <div className="shrink-0 border-t border-white/60 p-4">
          <p className="text-sm font-medium text-slate-900">Preview Flow</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Select", "Preview", "Inspect"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[11px] tracking-[0.16em] text-slate-600 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      {track}

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm lg:hidden"
            onClick={onToggleMobile}
          >
            <motion.div
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="h-full w-[min(88vw,340px)] p-3"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex h-full w-[300px] flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/65 shadow-[0_24px_80px_rgba(79,70,229,0.22)] backdrop-blur-2xl">
                <div className="flex items-center justify-between gap-3 border-b border-white/60 p-4">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 text-white shadow-[0_12px_30px_rgba(79,70,229,0.35)]">
                    <Bike className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-[family:var(--font-heading)] text-base font-semibold tracking-tight text-slate-900">
                      Motion Atelier
                    </p>
                    <p className="truncate text-xs text-slate-500">Component preview hub</p>
                  </div>
                  <button
                    type="button"
                    onClick={onToggleMobile}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white/70 text-slate-700 transition hover:bg-white/90"
                    aria-label="Close sidebar"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-3">
                  {groups.map((group) => {
                    const Icon = group.icon;
                    const items = options.filter((option) => option.group === group.title);
                    if (!items.length) return null;
                    return (
                      <div key={group.title} className="mb-4">
                        <div className="mb-2 flex items-center gap-2 px-1">
                          <Icon className="size-4 shrink-0 text-indigo-600" />
                          <p className="text-[11px] font-medium tracking-[0.24em] text-slate-500 uppercase">
                            {group.title}
                          </p>
                        </div>
                        <div className="space-y-2">
                          {items.map((item) => {
                            const isActive = item.id === activeId;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  onSelect(item.id);
                                  onToggleMobile();
                                }}
                                className={cn(
                                  "block w-full rounded-[20px] border px-3 py-3 text-left transition",
                                  isActive
                                    ? "border-indigo-300/80 bg-white/85 text-slate-900 shadow-[0_12px_40px_rgba(79,70,229,0.18)]"
                                    : "border-white/70 bg-white/55 text-slate-800 hover:border-indigo-200/80 hover:bg-white/80"
                                )}
                              >
                                <p className="text-sm font-medium">{item.label}</p>
                                <p className="mt-1 text-xs text-slate-500">{item.description}</p>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
