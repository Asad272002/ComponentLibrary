import {
  AppWindow,
  Blend,
  Boxes,
  Layers3,
  LayoutGrid,
  MenuSquare,
  PanelLeftOpen,
  ScanSearch,
  Sparkles,
  Stars,
  WandSparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type SidebarSection = {
  title: string;
  items: {
    label: string;
    count: number;
    active?: boolean;
  }[];
};

const sections: SidebarSection[] = [
  {
    title: "Discover",
    items: [
      { label: "Featured", count: 18, active: true },
      { label: "New this week", count: 7 },
      { label: "Most saved", count: 24 },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Buttons", count: 26 },
      { label: "Cards", count: 34 },
      { label: "Hero sections", count: 12 },
      { label: "Navigation", count: 16 },
      { label: "Pricing", count: 9 },
      { label: "Testimonials", count: 11 },
      { label: "Forms", count: 14 },
      { label: "Backgrounds", count: 10 },
    ],
  },
  {
    title: "Motion Lab",
    items: [
      { label: "Hover reveals", count: 8 },
      { label: "Scroll transforms", count: 5 },
      { label: "Text animations", count: 9 },
      { label: "Micro interactions", count: 17 },
    ],
  },
  {
    title: "Collections",
    items: [
      { label: "SaaS", count: 13 },
      { label: "Dashboards", count: 8 },
      { label: "Portfolios", count: 6 },
      { label: "Ecommerce", count: 7 },
    ],
  },
];

const sectionIcons = [Sparkles, LayoutGrid, WandSparkles, Layers3];

export function LibrarySidebar() {
  return (
    <aside className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white/80 p-4 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)]">
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.22),_transparent_68%)]" />

      <div className="relative flex h-full flex-col gap-4">
        <div className="flex items-center justify-between rounded-[22px] bg-slate-950 px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-white/10">
              <Blend className="size-5" />
            </div>
            <div>
              <p className="font-heading text-sm font-semibold tracking-wide">
                Motionboard
              </p>
              <p className="text-xs text-white/60">Component browser</p>
            </div>
          </div>
          <Badge className="bg-amber-300 text-slate-950 hover:bg-amber-300">
            Beta
          </Badge>
        </div>

        <div className="rounded-[22px] border border-slate-200/80 bg-white/75 p-3">
          <div className="relative">
            <ScanSearch className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search components"
              className="h-11 rounded-2xl border-slate-200 bg-slate-50 pl-9 shadow-none"
            />
          </div>
          <div className="mt-3 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 rounded-xl">
              <Boxes className="size-4" />
              Browse
            </Button>
            <Button size="sm" className="flex-1 rounded-xl bg-slate-950">
              <Stars className="size-4" />
              Random
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-[20px] border border-slate-200/80 bg-white/70 p-3">
            <p className="text-xs text-slate-500">Total</p>
            <p className="mt-2 font-heading text-xl font-semibold text-slate-950">
              146
            </p>
          </div>
          <div className="rounded-[20px] border border-slate-200/80 bg-white/70 p-3">
            <p className="text-xs text-slate-500">Animated</p>
            <p className="mt-2 font-heading text-xl font-semibold text-slate-950">
              42
            </p>
          </div>
          <div className="rounded-[20px] border border-slate-200/80 bg-white/70 p-3">
            <p className="text-xs text-slate-500">Free</p>
            <p className="mt-2 font-heading text-xl font-semibold text-slate-950">
              118
            </p>
          </div>
        </div>

        <Separator />

        <nav className="flex-1 space-y-5 overflow-y-auto pr-1">
          {sections.map((section, index) => {
            const Icon = sectionIcons[index];

            return (
              <div key={section.title}>
                <div className="mb-3 flex items-center gap-2 px-1">
                  <Icon className="size-4 text-slate-500" />
                  <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
                    {section.title}
                  </p>
                </div>

                <div className="space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.label}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm transition",
                        item.active
                          ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                      )}
                    >
                      <span>{item.label}</span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs",
                          item.active
                            ? "bg-white/10 text-white/80"
                            : "bg-slate-100 text-slate-500"
                        )}
                      >
                        {item.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="rounded-[24px] bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_55%,#334155_100%)] p-4 text-white">
          <div className="flex items-center justify-between">
            <p className="font-heading text-base font-semibold">Starter pack</p>
            <PanelLeftOpen className="size-4 text-white/70" />
          </div>
          <p className="mt-2 text-sm leading-6 text-white/70">
            A ready-made base for docs, previews, categories, and future component pages.
          </p>
          <Button
            size="sm"
            className="mt-4 w-full rounded-xl bg-amber-300 text-slate-950 hover:bg-amber-200"
          >
            <AppWindow className="size-4" />
            Open workspace
          </Button>
        </div>

        <div className="flex items-center gap-3 rounded-[20px] border border-slate-200/80 bg-white/70 px-3 py-2.5">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <MenuSquare className="size-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-950">Layout ready</p>
            <p className="text-xs text-slate-500">
              Tell me the next component section and I’ll slot it in.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
