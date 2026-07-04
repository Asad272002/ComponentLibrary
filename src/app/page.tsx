import {
  ArrowRight,
  Blocks,
  Compass,
  Library,
  Play,
  Sparkles,
  SwatchBook,
  Zap,
} from "lucide-react";

import { LibrarySidebar } from "@/components/library-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const spotlightCards = [
  {
    title: "Animated cards",
    description:
      "Card patterns with hover shifts, depth, glow, and layered motion for product showcases.",
    accent:
      "bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.35),_transparent_48%),linear-gradient(135deg,#0f172a,#1e293b)]",
  },
  {
    title: "Hero sections",
    description:
      "Big first impressions with confident typography, staggered content, and conversion-minded CTAs.",
    accent:
      "bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_42%),linear-gradient(135deg,#111827,#172554)]",
  },
  {
    title: "UI interactions",
    description:
      "Small details that make a UI feel expensive: toggles, highlights, loaders, and micro feedback.",
    accent:
      "bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.35),_transparent_38%),linear-gradient(135deg,#0b1120,#1f2937)]",
  },
];

const collectionCards = [
  { title: "Landing Pages", count: "28 layouts", icon: Compass },
  { title: "App Surfaces", count: "19 sections", icon: Blocks },
  { title: "Design Tokens", count: "Colors & spacing", icon: SwatchBook },
  { title: "Pattern Sets", count: "12 curated groups", icon: Library },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8f5ef_0%,#f6f7fb_42%,#eef2ff_100%)] px-4 py-4 text-slate-950 md:px-6 md:py-6">
      <div className="mx-auto grid max-w-[1600px] gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
        <LibrarySidebar />

        <section className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/75 p-5 shadow-[0_24px_80px_rgba(148,163,184,0.18)] backdrop-blur md:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.16),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_30%)]" />

          <div className="relative space-y-6">
            <header className="flex flex-col gap-5 rounded-[28px] border border-slate-200/70 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.92))] p-6 text-white lg:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-white/10 text-white hover:bg-white/10">
                  Curated UI library
                </Badge>
                <Badge className="bg-amber-300 text-slate-950 hover:bg-amber-300">
                  Next.js + shadcn
                </Badge>
              </div>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div>
                  <p className="mb-3 text-sm tracking-[0.28em] text-white/45 uppercase">
                    Browse modern components
                  </p>
                  <h1 className="max-w-3xl font-heading text-4xl leading-tight font-semibold text-balance md:text-5xl">
                    Build pages from components that already feel shipped.
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
                    This starter layout is set up like a real component gallery:
                    categories on the left, previews and collections on the
                    right, and room to grow into docs, demos, and copy-paste UI.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button className="rounded-xl bg-amber-300 text-slate-950 hover:bg-amber-200">
                      Start browsing
                      <ArrowRight className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                    >
                      <Play className="size-4" />
                      Preview flow
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Card className="border-white/10 bg-white/6 text-white ring-0">
                    <CardHeader>
                      <CardDescription className="text-white/60">
                        Ready for growth
                      </CardDescription>
                      <CardTitle className="text-white">
                        Docs, previews, categories, and future detail pages
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl bg-white/8 p-3">
                        <p className="text-white/55">Sections</p>
                        <p className="mt-2 font-heading text-2xl text-white">
                          4
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white/8 p-3">
                        <p className="text-white/55">Spotlights</p>
                        <p className="mt-2 font-heading text-2xl text-white">
                          3
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </header>

            <section className="grid gap-4 md:grid-cols-3">
              {spotlightCards.map((card) => (
                <Card
                  key={card.title}
                  className="overflow-hidden border-slate-200/70 bg-white/85 shadow-none"
                >
                  <div className={`m-3 h-44 rounded-[22px] ${card.accent} p-4`}>
                    <div className="flex h-full flex-col justify-between rounded-[18px] border border-white/10 bg-white/6 p-4 text-white backdrop-blur-sm">
                      <Badge className="w-fit bg-white/10 text-white hover:bg-white/10">
                        Preview
                      </Badge>
                      <div className="space-y-2">
                        <div className="h-2 w-16 rounded-full bg-white/60" />
                        <div className="h-2 w-28 rounded-full bg-white/35" />
                        <div className="h-16 rounded-[18px] border border-white/10 bg-white/10" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </section>

            <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <Card className="border-slate-200/70 bg-white/90 shadow-none">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle>Featured collection</CardTitle>
                      <CardDescription>
                        A clean foundation for organizing categories, previews,
                        tags, and eventually individual component pages.
                      </CardDescription>
                    </div>
                    <Badge variant="outline">Professional shell</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {collectionCards.map(({ title, count, icon: Icon }) => (
                      <div
                        key={title}
                        className="rounded-[24px] border border-slate-200/70 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:bg-white"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                            <Icon className="size-5" />
                          </div>
                          <Sparkles className="size-4 text-amber-500" />
                        </div>
                        <h3 className="mt-5 font-heading text-xl font-semibold text-slate-950">
                          {title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">{count}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200/70 bg-[linear-gradient(180deg,#fffdf7_0%,#ffffff_100%)] shadow-none">
                <CardHeader>
                  <CardTitle>Next up</CardTitle>
                  <CardDescription>
                    The structure is ready for us to add actual component demos
                    category by category.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm font-medium text-amber-950">
                      Suggested first additions
                    </p>
                    <p className="mt-2 text-sm leading-6 text-amber-900/80">
                      Buttons, animated cards, navbars, pricing sections, and
                      hero blocks would fit this layout immediately.
                    </p>
                  </div>
                  <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                        <Zap className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-950">
                          Setup complete
                        </p>
                        <p className="text-sm text-slate-500">
                          Ready for component pages and previews.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
