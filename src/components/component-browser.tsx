"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  ChevronLeft,
  CircleDashed,
  Layers3,
  PanelLeftOpen,
  WandSparkles,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  siFigma,
  siFramer,
  siGithub,
  siNotion,
  siShopify,
  siStripe,
  siSupabase,
  siVercel,
} from "simple-icons";

import {
  LibrarySidebar,
  type ComponentId,
  type ComponentOption,
} from "@/components/library-sidebar";
import { LogoLoader } from "@/components/logo-loader";
import { CardStackScroll } from "@/components/showcase/card-stack-scroll";
import { InvertedPerspectiveCarousel } from "@/components/showcase/inverted-perspective-carousel";
import { ShowcaseScene } from "@/components/showcase-scene";
import { OrbitalImageWheel } from "@/components/unlumen-ui/orbital-image-wheel";
import { SmartAnimateText } from "@/components/unlumen-ui/smart-animate-text";
import { TiltCard } from "@/components/unlumen-ui/tilt-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { MorphingText } from "@/components/ui/morphing-text";

const components: ComponentOption[] = [
  {
    id: "logo-loader",
    label: "Logo Loader",
    description: "Automotive-style loading overlay with premium 3D motion.",
    group: "Featured",
    status: "Live",
    metric: "Loader preview",
  },
  {
    id: "smart-animate-text",
    label: "Pulse Text",
    description: "Animated text swaps for specs, pricing, and labels.",
    group: "Featured",
    status: "Live",
    metric: "Text motion",
  },
  {
    id: "orbital-image-wheel",
    label: "Orbital Gallery",
    description: "Premium image storytelling with orbital motion.",
    group: "Featured",
    status: "Live",
    metric: "Image motion",
  },
  {
    id: "card-stack-scroll",
    label: "Card Stack Scroll",
    description: "Sticky cards with scroll-based scaling.",
    group: "Featured",
    status: "Live",
    metric: "Scroll stack",
  },
  {
    id: "morphing-text",
    label: "Morphing Text",
    description: "Smooth morph transitions between rotating words.",
    group: "Featured",
    status: "Live",
    metric: "Text morph",
  },
  {
    id: "tilt-card",
    label: "Tilt Card",
    description: "3D tilt card with floating image and shine.",
    group: "Featured",
    status: "Live",
    metric: "Hover depth",
  },
  {
    id: "inverted-perspective-carousel",
    label: "Inverted Perspective Carousel",
    description: "Coverflow-style carousel with deep 3D perspective.",
    group: "Featured",
    status: "Live",
    metric: "3D carousel",
  },
  {
    id: "infinite-slider",
    label: "Infinite Slider",
    description: "Continuous marquee slider for company logos or names.",
    group: "Featured",
    status: "Live",
    metric: "Logo rail",
  },
  {
    id: "hero-sections",
    label: "Hero Frames",
    description: "Reserved for the next build.",
    group: "Concepts",
    status: "Soon",
    metric: "Queued",
  },
  {
    id: "feature-grids",
    label: "Feature Matrix",
    description: "Reserved for structured layouts.",
    group: "Concepts",
    status: "Soon",
    metric: "Queued",
  },
  {
    id: "spec-cards",
    label: "Spec Tiles",
    description: "Reserved for compact product cards.",
    group: "Concepts",
    status: "Soon",
    metric: "Queued",
  },
];

const brandOptions = ["taro", "lifan", "hi speed", "superstar", "replicas"] as const;

const specOptions = [
  {
    id: "standard",
    label: "Standard",
    delta: "+00",
    detail: "Base spec",
  },
  {
    id: "non-abs",
    label: "Non ABS",
    delta: "-18",
    detail: "Price drops",
  },
  {
    id: "single-abs",
    label: "Single ABS",
    delta: "+12",
    detail: "Safer front setup",
  },
  {
    id: "dual-abs",
    label: "Dual ABS",
    delta: "+24",
    detail: "Full ABS upgrade",
  },
] as const;

const bikeImages = [
  {
    src: "https://images.pexels.com/photos/163789/sky-road-travel-trip-163789.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800&q=90",
    alt: "Cruiser motorcycle on an open road",
    label: "Road King",
    subtitle: "Open-road cruiser",
  },
  {
    src: "https://images.pexels.com/photos/296735/pexels-photo-296735.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800&q=90",
    alt: "Cruiser motorcycle in the middle of a street",
    label: "Street Titan",
    subtitle: "Urban heavyweight",
  },
  {
    src: "https://images.pexels.com/photos/2393821/pexels-photo-2393821.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800&q=90",
    alt: "Classic Royal Enfield motorcycle parked outdoors",
    label: "Royal Enfield",
    subtitle: "Classic heavy build",
  },
  {
    src: "https://images.pexels.com/photos/14397937/pexels-photo-14397937.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800&q=90",
    alt: "Detailed close-up of a custom cruiser motorcycle",
    label: "Custom Cruiser",
    subtitle: "Close-up detail",
  },
];

type ComingSoonId = "hero-sections" | "feature-grids" | "spec-cards";

const comingSoonText: Record<ComingSoonId, string> = {
  "hero-sections": "Hero Frames is queued next.",
  "feature-grids": "Feature Matrix is queued next.",
  "spec-cards": "Spec Tiles is queued next.",
};

const morphingTexts = ["Hello", "World", "Motion", "Library", "Showcase"];
const landingMorphTexts = ["Motion", "Glass", "Depth", "Preview"];

const companyLogos = [
  { label: "Vercel", href: "https://vercel.com", iconPath: siVercel.path, iconColor: "#1f2937" },
  { label: "Framer", href: "https://framer.com", iconPath: siFramer.path, iconColor: "#1f2937" },
  { label: "Supabase", href: "https://supabase.com", iconPath: siSupabase.path, iconColor: `#${siSupabase.hex}` },
  { label: "Stripe", href: "https://stripe.com", iconPath: siStripe.path, iconColor: `#${siStripe.hex}` },
  { label: "Figma", href: "https://figma.com", iconPath: siFigma.path, iconColor: `#${siFigma.hex}` },
  { label: "GitHub", href: "https://github.com", iconPath: siGithub.path, iconColor: "#1f2937" },
  { label: "Notion", href: "https://notion.so", iconPath: siNotion.path, iconColor: "#1f2937" },
  { label: "Shopify", href: "https://shopify.com", iconPath: siShopify.path, iconColor: `#${siShopify.hex}` },
] as const;

const stackProjects = [
  {
    title: "Project 1",
    subtitle: "Interactive sticky card stack with smooth scale transitions.",
    src: bikeImages[0].src,
    accent: "linear-gradient(135deg, rgba(34,211,238,0.18), rgba(15,23,42,0.18))",
  },
  {
    title: "Project 2",
    subtitle: "Layered card deck for storytelling-heavy portfolio sections.",
    src: bikeImages[1].src,
    accent: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(15,23,42,0.16))",
  },
  {
    title: "Project 3",
    subtitle: "Scroll-based scaling that keeps the stack feeling tactile.",
    src: bikeImages[2].src,
    accent: "linear-gradient(135deg, rgba(251,191,36,0.22), rgba(15,23,42,0.16))",
  },
  {
    title: "Project 4",
    subtitle: "Editorial layout for launches, case studies, and feature drops.",
    src: bikeImages[3].src,
    accent: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(15,23,42,0.18))",
  },
];

const landingHighlights = [
  { label: "Visual tone", value: "Glassmorphism" },
  { label: "Core", value: "Live previews" },
  { label: "Experience", value: "3D motion" },
] as const;

function LogoLoaderPreview() {
  const [isLoading, setIsLoading] = useState(true);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [cycleKey]);

  return (
    <motion.section
      key="logo-loader"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-white/10 bg-white/6 p-5">
        <div>
          <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Logo loader</p>
          <p className="mt-2 text-sm text-white/55">
            Preview the loading overlay, then watch it hand off into the main screen.
          </p>
        </div>
        <Button
          variant="outline"
          className="h-11 rounded-full border-white/15 bg-white/6 px-5 text-white hover:bg-white/10"
          onClick={() => {
            setIsLoading(true);
            setCycleKey((value) => value + 1);
          }}
        >
          Replay loader
        </Button>
      </div>

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(4,8,18,0.98),rgba(8,12,22,0.94))] shadow-[0_24px_80px_rgba(2,8,23,0.45)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_82%_12%,rgba(168,85,247,0.16),transparent_26%)]" />

        <motion.div
          animate={{
            scale: isLoading ? 0.975 : 1,
            filter: isLoading ? "blur(5px)" : "blur(0px)",
            opacity: isLoading ? 0.45 : 1,
          }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative z-0 min-h-[620px] p-5 md:p-7"
        >
          <div className="rounded-[26px] border border-white/10 bg-white/6 p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Main screen mock</p>
                <h3 className="mt-2 font-[family:var(--font-heading)] text-3xl font-semibold text-white">
                  Automotive UI system
                </h3>
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-200">
                Ready
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1.25fr_0.9fr]">
              <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5">
                <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Hero state</p>
                <div className="mt-5">
                  <MorphingText
                    texts={["Loaded", "Polished", "Interactive", "Premium"]}
                    className="justify-start font-[family:var(--font-heading)] text-5xl font-semibold tracking-tight text-white md:text-6xl"
                  />
                </div>
                <p className="mt-4 max-w-xl text-sm leading-6 text-white/55">
                  A simple entry preview showing how the loader clears and reveals the destination screen.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Overlay", value: "Full screen" },
                    { label: "Timing", value: "2.5s" },
                    { label: "Style", value: "3D luxury" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-[20px] border border-white/10 bg-black/10 p-4">
                      <p className="text-[11px] tracking-[0.22em] text-white/35 uppercase">{item.label}</p>
                      <p className="mt-3 text-lg font-medium text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                  <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Preview notes</p>
                  <div className="mt-4 space-y-3">
                    {[
                      "Uses /logo.svg from public.",
                      "Respects reduced motion.",
                      "Can run fullscreen or inline inside previews.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/58"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                  <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Status</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span
                      className={
                        isLoading
                          ? "inline-flex size-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.7)]"
                          : "inline-flex size-3 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.6)]"
                      }
                    />
                    <p className="text-sm text-white/65">
                      {isLoading ? "Loader active" : "Preview screen revealed"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence initial={false}>
          {isLoading ? (
            <motion.div
              key={`loader-overlay-${cycleKey}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0 z-20"
            >
              <LogoLoader fullscreen={false} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function LandingHub({
  components,
  onSelect,
  onOpenSidebar,
}: {
  components: ComponentOption[];
  onSelect: (id: ComponentId) => void;
  onOpenSidebar: () => void;
}) {
  const liveComponents = components.filter((component) => component.status === "Live");
  const featuredCards = liveComponents.slice(0, 6);

  return (
    <section className="relative overflow-hidden rounded-[40px] border border-white/40 bg-white/35 shadow-[0_40px_120px_rgba(124,58,237,0.18)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(79,70,229,0.20),transparent_38%),radial-gradient(circle_at_88%_22%,rgba(14,165,233,0.20),transparent_36%),radial-gradient(circle_at_78%_88%,rgba(217,119,6,0.16),transparent_40%),radial-gradient(circle_at_18%_88%,rgba(124,58,237,0.16),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(circle_at_30%_30%,black,transparent_72%)]" />

      <div className="relative flex min-h-[calc(100vh-2rem)] flex-col px-5 py-5 md:px-8 md:py-8">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[26px] border border-white/60 bg-white/55 px-4 py-3 shadow-[0_10px_30px_rgba(124,58,237,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)]">
              <Layers3 className="size-4" />
            </div>
            <div>
              <p className="font-[family:var(--font-heading)] text-lg font-semibold text-slate-900">Motion Atelier</p>
              <p className="text-sm text-slate-500">Interactive UI library</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onOpenSidebar}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 text-sm text-slate-700 shadow-[0_8px_24px_rgba(124,58,237,0.08)] backdrop-blur-xl transition hover:bg-white/90 lg:hidden"
            >
              <PanelLeftOpen className="size-4" />
              Open library
            </button>
            <span className="rounded-full border border-white/70 bg-white/70 px-3 py-2 text-xs tracking-[0.2em] text-slate-600 uppercase">
              {String(liveComponents.length).padStart(2, "0")} live previews
            </span>
          </div>
        </div>

        <div className="grid flex-1 gap-8 py-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-center xl:gap-10">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-violet-200/80 bg-white/70 px-4 py-1.5 text-violet-700 shadow-[0_10px_30px_rgba(124,58,237,0.12)]">
              <span className="mr-2 inline-block size-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500" />
              v2.0 · Glass Edition
            </Badge>
            <div className="mt-6">
              <MorphingText
                texts={landingMorphTexts}
                className="justify-start bg-gradient-to-r from-slate-900 via-violet-700 to-slate-900 bg-clip-text font-[family:var(--font-heading)] text-6xl font-semibold tracking-tight text-transparent md:text-7xl xl:text-8xl"
              />
            </div>
            <h1 className="mt-4 max-w-4xl font-[family:var(--font-heading)] text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl xl:text-6xl">
              A modern component library for cinematic 3D visuals, glassmorphism, and lively motion.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Ship interfaces users feel. Browse the catalog, pick a component, and watch it come alive in a focused preview.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className="h-12 rounded-full bg-slate-900 px-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.25)] hover:bg-slate-800"
                onClick={() => onSelect(featuredCards[0]?.id ?? "logo-loader")}
              >
                Get started
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-full border-white/70 bg-white/70 px-5 text-slate-800 shadow-[0_10px_30px_rgba(124,58,237,0.08)] backdrop-blur-xl hover:bg-white/90"
                onClick={onOpenSidebar}
              >
                <PanelLeftOpen className="size-4" />
                Browse library
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Components", value: String(components.length).padStart(2, "0") },
                { label: "Live previews", value: String(liveComponents.length).padStart(2, "0") },
                { label: "Theme", value: "Glass" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-white/70 bg-white/65 p-4 shadow-[0_18px_40px_rgba(124,58,237,0.06)] backdrop-blur-xl"
                >
                  <p className="text-[11px] tracking-[0.24em] text-slate-500 uppercase">{item.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[44px] bg-[radial-gradient(circle,rgba(124,58,237,0.22),transparent_60%)] blur-3xl" />
            <div className="rounded-[34px] border border-white/70 bg-white/55 p-4 shadow-[0_30px_80px_rgba(124,58,237,0.18)] backdrop-blur-2xl">
              <div className="mb-4 flex items-center justify-between gap-3 rounded-[22px] border border-white/70 bg-white/60 px-4 py-3">
                <div>
                  <p className="text-[11px] tracking-[0.24em] text-slate-500 uppercase">Centerpiece</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">3D brand motion</p>
                </div>
                <div className="rounded-full border border-white/70 bg-gradient-to-r from-indigo-500/15 to-sky-500/15 px-3 py-1.5 text-xs text-indigo-700">
                  built with three.js
                </div>
              </div>

              <ShowcaseScene />

              <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[24px] border border-white/70 bg-white/65 p-4 shadow-[0_10px_30px_rgba(124,58,237,0.06)]">
                  <p className="text-[11px] tracking-[0.24em] text-slate-500 uppercase">Animated intent</p>
                  <div className="mt-4 min-h-24">
                    <MorphingText
                      texts={["Browse fast", "Preview clean", "Feel depth", "Stay focused"]}
                      className="justify-start bg-gradient-to-r from-slate-900 via-indigo-700 to-slate-900 bg-clip-text font-[family:var(--font-heading)] text-4xl font-semibold tracking-tight text-transparent md:text-5xl"
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  {landingHighlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[22px] border border-white/70 bg-white/65 px-4 py-4 shadow-[0_10px_30px_rgba(124,58,237,0.06)]"
                    >
                      <p className="text-[11px] tracking-[0.22em] text-slate-500 uppercase">{item.label}</p>
                      <p className="mt-2 text-lg font-medium text-slate-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-white/50 pt-6 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-[28px] border border-white/70 bg-white/60 p-5 shadow-[0_18px_40px_rgba(124,58,237,0.08)] backdrop-blur-xl">
            <p className="text-[11px] tracking-[0.24em] text-slate-500 uppercase">Why this page</p>
            <h2 className="mt-3 font-[family:var(--font-heading)] text-3xl font-semibold text-slate-900">
              Less noise, faster browsing.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">
              The landing now reads like a proper front door: a clear identity, one central visual system, and quick access to the component library.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {featuredCards.map((component, index) => (
              <motion.button
                key={component.id}
                type="button"
                onClick={() => onSelect(component.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.99 }}
                className="group rounded-[26px] border border-white/70 bg-white/65 p-5 text-left shadow-[0_18px_40px_rgba(124,58,237,0.08)] backdrop-blur-xl transition hover:border-violet-200/80 hover:bg-white/80"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/15 to-sky-500/15 text-indigo-700">
                    {index < 2 ? <WandSparkles className="size-4" /> : <CircleDashed className="size-4" />}
                  </div>
                  <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[11px] tracking-[0.18em] text-slate-600 uppercase">
                    {component.metric}
                  </span>
                </div>
                <h3 className="mt-5 font-[family:var(--font-heading)] text-2xl font-semibold text-slate-900">
                  {component.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{component.description}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm text-violet-700">
                  Open preview
                  <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PulseTextPreview({
  brandValue,
  onBrandChange,
  specId,
  onSpecChange,
}: {
  brandValue: (typeof brandOptions)[number];
  onBrandChange: (value: (typeof brandOptions)[number]) => void;
  specId: (typeof specOptions)[number]["id"];
  onSpecChange: (value: (typeof specOptions)[number]["id"]) => void;
}) {
  const activeSpec = specOptions.find((option) => option.id === specId) ?? specOptions[0];

  return (
    <motion.section
      key="pulse-text"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-4"
    >
      <div className="rounded-[28px] border border-white/70 bg-white/65 p-5 shadow-[0_18px_40px_rgba(79,70,229,0.08)]">
        <p className="text-[11px] tracking-[0.24em] text-slate-500 uppercase">Brand switch</p>
        <div className="mt-8 flex min-h-28 items-center justify-center rounded-[26px] border border-white/70 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.14),transparent_40%),rgba(255,255,255,0.55)] px-6 py-8">
          <SmartAnimateText
            value={brandValue}
            className="text-center text-5xl font-semibold tracking-tight text-slate-900 md:text-7xl"
            digitClassName="font-[family:var(--font-heading)]"
            direction="dynamic"
            enterBlur={24}
            enterScale={0.84}
          />
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {brandOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onBrandChange(item)}
              className={
                item === brandValue
                  ? "rounded-full border border-indigo-300/80 bg-indigo-500/15 px-4 py-2 text-sm font-medium text-indigo-700"
                  : "rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-200/80 hover:bg-white/90"
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-white/70 bg-white/65 p-5 shadow-[0_18px_40px_rgba(79,70,229,0.08)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-[0.24em] text-slate-500 uppercase">ABS price motion</p>
            <p className="mt-2 text-sm text-slate-600">Spec based up and down pricing.</p>
          </div>
          <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs text-slate-600">
            {activeSpec.detail}
          </span>
        </div>
        <div className="mt-8 flex min-h-32 items-center justify-center rounded-[26px] border border-white/70 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_42%),rgba(255,255,255,0.55)] px-6 py-8">
          <div className="text-center">
            <SmartAnimateText
              value={activeSpec.delta}
              className="justify-center text-6xl font-semibold tracking-tight text-slate-900 md:text-8xl"
              digitClassName="font-[family:var(--font-heading)]"
              direction="dynamic"
              enterBlur={30}
              enterScale={0.84}
            />
            <p className="mt-3 text-sm text-slate-500">price change in thousands</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {specOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSpecChange(option.id)}
              className={
                option.id === specId
                  ? "rounded-full border border-sky-300/80 bg-sky-500/15 px-4 py-2 text-sm font-medium text-sky-700"
                  : "rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200/80 hover:bg-white/90"
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function MorphingTextPreview() {
  return (
    <motion.section
      key="morphing-text"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-4"
    >
      <div className="rounded-[28px] border border-white/70 bg-white/65 p-6 shadow-[0_18px_40px_rgba(79,70,229,0.08)]">
        <p className="text-[11px] tracking-[0.24em] text-slate-500 uppercase">Morphing text</p>
        <div className="mt-6 flex min-h-[260px] items-center justify-center rounded-[26px] border border-white/70 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.16),transparent_35%),rgba(255,255,255,0.55)] p-6">
          <MorphingText
            texts={morphingTexts}
            className="font-[family:var(--font-heading)] text-6xl font-semibold tracking-tight text-slate-900 md:text-8xl"
          />
        </div>
      </div>
    </motion.section>
  );
}

function OrbitalPreview({ wheelScrollRef }: { wheelScrollRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <motion.section
      key="orbital-gallery"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-4"
    >
      <div className="rounded-[28px] border border-white/70 bg-white/65 p-5 shadow-[0_18px_40px_rgba(79,70,229,0.08)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-[0.24em] text-slate-500 uppercase">Heavy bike gallery</p>
            <p className="mt-2 text-sm text-slate-600">Only the component, fully visible, scroll to orbit.</p>
          </div>
          <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs text-slate-600">Stock images</span>
        </div>

        <div
          ref={wheelScrollRef}
          className="h-[80vh] min-h-[700px] overflow-y-auto overscroll-y-contain rounded-[28px] border border-white/70 bg-slate-900/95 [scrollbar-gutter:stable] [scroll-behavior:smooth]"
        >
          <OrbitalImageWheel
            images={bikeImages}
            scrollContainerRef={wheelScrollRef}
            blur={0.8}
            dim={76}
            brightnessBoost={20}
            minSaturation={94}
            scaleEffect={0.08}
            scrollSensitivity={0.52}
            scrollLength={175}
            itemWidth={300}
            itemHeight={390}
            cropRatio={0.66}
          />
        </div>
      </div>
    </motion.section>
  );
}

function TiltCardPreview() {
  return (
    <motion.section
      key="tilt-card"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="grid gap-4 xl:grid-cols-2"
    >
      <TiltCard
        title="Starter Kit"
        description="Everything you need to ship fast."
        price="Free"
        badgeLabel="Popular"
        imageSrc={bikeImages[0].src}
        imageAlt={bikeImages[0].alt}
      />
      <TiltCard
        title="Pro Builder"
        description="Designed for richer product launches and premium UI systems."
        price="$49"
        badgeLabel="Best value"
        badgeVariant="warning"
        imageSrc={bikeImages[2].src}
        imageAlt={bikeImages[2].alt}
      >
        <ul className="space-y-1 text-sm text-slate-600">
          <li>+ Unlimited projects</li>
          <li>+ Motion presets</li>
          <li>+ Priority updates</li>
        </ul>
      </TiltCard>
    </motion.section>
  );
}

function CardStackPreview() {
  return (
    <motion.section
      key="card-stack-scroll"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-4 overflow-visible"
    >
      <div className="rounded-[28px] border border-white/70 bg-white/65 p-5 shadow-[0_18px_40px_rgba(79,70,229,0.08)]">
        <p className="text-[11px] tracking-[0.24em] text-slate-500 uppercase">Card stack scroll</p>
        <p className="mt-2 text-sm text-slate-600">Scroll down to see the cards scale and stack.</p>
      </div>
      <div className="overflow-visible">
        <CardStackScroll items={stackProjects} />
      </div>
    </motion.section>
  );
}

function CarouselPreview() {
  return (
    <motion.section
      key="inverted-perspective-carousel"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-4"
    >
      <div className="rounded-[28px] border border-white/70 bg-white/65 p-5 shadow-[0_18px_40px_rgba(79,70,229,0.08)]">
        <p className="text-[11px] tracking-[0.24em] text-slate-500 uppercase">Inverted perspective carousel</p>
        <p className="mt-2 text-sm text-slate-600">Swipe visually with navigation and coverflow depth.</p>
      </div>
      <InvertedPerspectiveCarousel images={bikeImages.map(({ src, alt }) => ({ src, alt }))} />
    </motion.section>
  );
}

function InfiniteSliderPreview() {
  return (
    <motion.section
      key="infinite-slider"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-4"
    >
      <div className="rounded-[28px] border border-white/70 bg-white/65 p-6 shadow-[0_18px_40px_rgba(79,70,229,0.08)]">
        <p className="text-[11px] tracking-[0.24em] text-slate-500 uppercase">Infinite slider</p>
        <h3 className="mt-3 font-[family:var(--font-heading)] text-3xl font-semibold text-slate-900">
          Trusted by modern product brands
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Seamless horizontal marquee for logo rails, trust sections, and partner bands.
        </p>
        <div className="mt-6 space-y-4">
          <InfiniteSlider items={[...companyLogos]} />
          <InfiniteSlider items={[...companyLogos].reverse()} reverse speed={28} />
        </div>
      </div>
    </motion.section>
  );
}

function ComingSoonPreview({ activeId }: { activeId: ComingSoonId }) {
  return (
    <motion.section
      key={activeId}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-[28px] border border-white/70 bg-white/65 p-8 text-center shadow-[0_18px_40px_rgba(79,70,229,0.08)]"
    >
      <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-white/70 bg-white/70 text-indigo-700">
        <CircleDashed className="size-6" />
      </div>
      <h2 className="mt-6 font-[family:var(--font-heading)] text-4xl font-semibold text-slate-900">
        {components.find((item) => item.id === activeId)?.label}
      </h2>
      <p className="mt-3 text-slate-600">{comingSoonText[activeId]}</p>
    </motion.section>
  );
}

export function ComponentBrowser() {
  const [activeId, setActiveId] = useState<ComponentId | null>(null);
  const [query, setQuery] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [brandValue, setBrandValue] = useState<(typeof brandOptions)[number]>("taro");
  const [specId, setSpecId] = useState<(typeof specOptions)[number]["id"]>("standard");
  const wheelScrollRef = useRef<HTMLDivElement>(null);

  const filteredComponents = useMemo(
    () =>
      components.filter((component) => {
        const searchTarget = `${component.label} ${component.description} ${component.metric}`;
        return searchTarget.toLowerCase().includes(query.trim().toLowerCase());
      }),
    [query]
  );

  const selectedComponent =
    components.find((component) => component.id === activeId) ?? null;

  return (
    <main className="relative min-h-screen overflow-x-hidden px-3 py-3 text-slate-900 md:px-5 md:py-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(79,70,229,0.18),transparent_38%),radial-gradient(circle_at_88%_22%,rgba(14,165,233,0.18),transparent_36%),radial-gradient(circle_at_78%_88%,rgba(56,189,248,0.18),transparent_40%)]" />

      <button
        type="button"
        onClick={() => setMobileSidebarOpen(true)}
        className="fixed top-4 left-4 z-40 inline-flex h-11 items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 text-sm text-slate-800 shadow-[0_18px_40px_rgba(124,58,237,0.16)] backdrop-blur-xl transition hover:bg-white/90 lg:hidden"
      >
        <PanelLeftOpen className="size-4" />
        Library
      </button>

      <div className="relative mx-auto flex max-w-[1600px] items-start gap-4">
        <LibrarySidebar
          activeId={activeId}
          options={filteredComponents}
          onSelect={setActiveId}
          query={query}
          onQueryChange={setQuery}
          mobileOpen={mobileSidebarOpen}
          onToggleMobile={() => setMobileSidebarOpen((value) => !value)}
        />
        <div className="min-w-0 flex-1">

        <section
          className={
            activeId === "card-stack-scroll"
              ? "overflow-visible rounded-[38px] border border-white/50 bg-white/45 p-3 shadow-[0_30px_120px_rgba(124,58,237,0.18)] backdrop-blur-2xl md:p-4"
              : "overflow-hidden rounded-[38px] border border-white/50 bg-white/45 p-3 shadow-[0_30px_120px_rgba(124,58,237,0.18)] backdrop-blur-2xl md:p-4"
          }
        >
          {!selectedComponent ? (
            <LandingHub
              components={filteredComponents}
              onSelect={setActiveId}
              onOpenSidebar={() => setMobileSidebarOpen(true)}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-[26px] border border-white/70 bg-white/65 px-5 py-4 shadow-[0_10px_30px_rgba(124,58,237,0.08)] backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)]">
                    {selectedComponent.status === "Live" ? (
                      <Zap className="size-5" />
                    ) : (
                      <Bike className="size-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.24em] text-slate-500 uppercase">Component Preview</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">{selectedComponent.label}</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="h-11 rounded-full border-white/70 bg-white/70 px-5 text-slate-800 shadow-[0_10px_30px_rgba(124,58,237,0.08)] backdrop-blur-xl hover:bg-white/90"
                  onClick={() => setActiveId(null)}
                >
                  <ChevronLeft className="size-4" />
                  Back to hub
                </Button>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {activeId === "smart-animate-text" ? (
                  <PulseTextPreview
                    brandValue={brandValue}
                    onBrandChange={setBrandValue}
                    specId={specId}
                    onSpecChange={setSpecId}
                  />
                ) : null}

                {activeId === "logo-loader" ? <LogoLoaderPreview /> : null}

                {activeId === "orbital-image-wheel" ? (
                  <OrbitalPreview wheelScrollRef={wheelScrollRef} />
                ) : null}

                {activeId === "morphing-text" ? <MorphingTextPreview /> : null}

                {activeId === "tilt-card" ? <TiltCardPreview /> : null}

                {activeId === "card-stack-scroll" ? <CardStackPreview /> : null}

                {activeId === "inverted-perspective-carousel" ? <CarouselPreview /> : null}

                {activeId === "infinite-slider" ? <InfiniteSliderPreview /> : null}

                {activeId &&
                activeId !== "logo-loader" &&
                activeId !== "smart-animate-text" &&
                activeId !== "orbital-image-wheel" &&
                activeId !== "morphing-text" &&
                activeId !== "tilt-card" &&
                activeId !== "card-stack-scroll" &&
                activeId !== "inverted-perspective-carousel" &&
                activeId !== "infinite-slider" ? (
                  <ComingSoonPreview activeId={activeId} />
                ) : null}
              </AnimatePresence>
            </div>
          )}
        </section>
        </div>
      </div>
    </main>
  );
}
