"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Bike,
  ChevronLeft,
  CircleDashed,
  Compass,
  Layers3,
  Sparkles,
  WandSparkles,
  Zap,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
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
import { CardStackScroll } from "@/components/showcase/card-stack-scroll";
import { InvertedPerspectiveCarousel } from "@/components/showcase/inverted-perspective-carousel";
import { OrbitalImageWheel } from "@/components/unlumen-ui/orbital-image-wheel";
import { SmartAnimateText } from "@/components/unlumen-ui/smart-animate-text";
import { TiltCard } from "@/components/unlumen-ui/tilt-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { MorphingText } from "@/components/ui/morphing-text";

const components: ComponentOption[] = [
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
const landingMorphTexts = ["Browse", "Preview", "Animate", "Launch"];

const companyLogos = [
  { label: "Vercel", href: "https://vercel.com", iconPath: siVercel.path, iconColor: "#ffffff" },
  { label: "Framer", href: "https://framer.com", iconPath: siFramer.path, iconColor: `#${siFramer.hex}` },
  { label: "Supabase", href: "https://supabase.com", iconPath: siSupabase.path, iconColor: `#${siSupabase.hex}` },
  { label: "Stripe", href: "https://stripe.com", iconPath: siStripe.path, iconColor: `#${siStripe.hex}` },
  { label: "Figma", href: "https://figma.com", iconPath: siFigma.path, iconColor: `#${siFigma.hex}` },
  { label: "GitHub", href: "https://github.com", iconPath: siGithub.path, iconColor: "#ffffff" },
  { label: "Notion", href: "https://notion.so", iconPath: siNotion.path, iconColor: "#ffffff" },
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
    accent: "linear-gradient(135deg, rgba(244,114,182,0.2), rgba(15,23,42,0.18))",
  },
];

const landingHighlights = [
  { label: "Motion-first", value: "Fluid transitions" },
  { label: "Preview-ready", value: "Focused demos" },
  { label: "Design system", value: "Modern catalog" },
] as const;

function LandingHub({
  components,
  onSelect,
}: {
  components: ComponentOption[];
  onSelect: (id: ComponentId) => void;
}) {
  return (
    <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(145deg,rgba(9,14,26,0.96),rgba(15,23,42,0.82))] p-6 shadow-[0_30px_120px_rgba(2,8,23,0.55)] backdrop-blur-2xl md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(103,232,249,0.12),transparent_28%),radial-gradient(circle_at_90%_10%,rgba(168,85,247,0.15),transparent_24%)]" />
      <div className="relative space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-white/10 bg-white/6 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-white text-slate-950">
              <Layers3 className="size-4" />
            </div>
            <div>
              <p className="font-[family:var(--font-heading)] text-lg font-semibold text-white">
                Motion Atelier
              </p>
              <p className="text-sm text-white/45">Animated UI Library</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "Motion", "Gallery", "Text", "Commerce"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/60"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_560px] xl:items-center">
          <div>
            <Badge className="rounded-full bg-white text-slate-950">
              Browse components
            </Badge>
            <div className="mt-5 max-w-3xl">
              <p className="text-sm tracking-[0.28em] text-cyan-200 uppercase">Motion Atelier</p>
              <div className="mt-4">
                <MorphingText
                  texts={landingMorphTexts}
                  className="justify-start font-[family:var(--font-heading)] text-6xl font-semibold tracking-tight text-white md:text-7xl"
                />
              </div>
              <h1 className="mt-3 font-[family:var(--font-heading)] text-4xl font-semibold tracking-tight text-white md:text-5xl">
                UI components for modern interactive interfaces.
              </h1>
            </div>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/58">
              Explore interaction-ready components, open a preview, and inspect each piece like a real design system library.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Components", value: String(components.length).padStart(2, "0") },
                {
                  label: "Live previews",
                  value: String(
                    components.filter((component) => component.status === "Live").length
                  ).padStart(2, "0"),
                },
                { label: "Design tone", value: "Sleek" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-white/10 bg-white/6 p-4 backdrop-blur-xl"
                >
                  <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">{item.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.12),transparent_30%),linear-gradient(180deg,rgba(6,11,23,0.98),rgba(10,15,29,0.95))] p-6">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_30%,rgba(168,85,247,0.05))]" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Featured motion</p>
                <p className="mt-2 text-2xl font-semibold text-white">Built from your own components</p>
              </div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-white/8 text-cyan-200">
                <Compass className="size-5" />
              </div>
            </div>

            <div className="relative mt-8 space-y-4">
              <div className="rounded-[26px] border border-white/10 bg-white/6 p-5">
                <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Live text motion</p>
                <div className="mt-5 flex min-h-28 items-center justify-start">
                  <SmartAnimateText
                    value="Library"
                    className="text-6xl font-semibold tracking-tight text-white md:text-7xl"
                    digitClassName="font-[family:var(--font-heading)]"
                    direction="up"
                    enterBlur={28}
                    enterScale={0.82}
                  />
                </div>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-white/6 p-5">
                <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Rotating headline</p>
                <div className="mt-5 min-h-24">
                  <MorphingText
                    texts={["Elegant", "Interactive", "Modern", "Organized"]}
                    className="justify-start font-[family:var(--font-heading)] text-5xl font-semibold tracking-tight text-white md:text-6xl"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {landingHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] border border-white/10 bg-black/12 px-4 py-4"
                  >
                    <p className="text-[11px] tracking-[0.22em] text-white/35 uppercase">{item.label}</p>
                    <p className="mt-3 text-lg font-medium text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="grid gap-4 md:grid-cols-2">
            {components.map((component, index) => (
              <motion.button
                key={component.id}
                type="button"
                onClick={() => onSelect(component.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.99 }}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-5 text-left transition hover:border-white/20 hover:bg-white/8"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                    {index < 2 ? <WandSparkles className="size-4" /> : <CircleDashed className="size-4" />}
                  </div>
                  <span
                    className={
                      component.status === "Live"
                        ? "rounded-full bg-emerald-400/12 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-emerald-200 uppercase"
                        : "rounded-full bg-white/8 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-white/45 uppercase"
                    }
                  >
                    {component.status}
                  </span>
                </div>
                <h3 className="mt-5 font-[family:var(--font-heading)] text-2xl font-semibold text-white">
                  {component.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/52">{component.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/55">
                    {component.metric}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-white/70">
                    Open preview
                    <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-white/10 bg-white/6 p-5">
              <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Collections</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Animated text", "Image galleries", "Landing heroes", "Spec cards"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/6 p-5">
              <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Library Notes</p>
              <div className="mt-4 space-y-3">
                {[
                  "Built for browsing and quick visual comparison.",
                  "Each component opens into its own focused preview.",
                  "Typography and spacing tuned for a design-system feel.",
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
      <div className="rounded-[28px] border border-white/10 bg-white/6 p-5">
        <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Brand switch</p>
        <div className="mt-8 flex min-h-28 items-center justify-center rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_40%),rgba(255,255,255,0.04)] px-6 py-8">
          <SmartAnimateText
            value={brandValue}
            className="text-center text-5xl font-semibold tracking-tight text-white md:text-7xl"
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
                  ? "rounded-full border border-cyan-300/40 bg-cyan-300/14 px-4 py-2 text-sm font-medium text-cyan-100"
                  : "rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-white/65 transition hover:border-white/20 hover:bg-white/10"
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/6 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">ABS price motion</p>
            <p className="mt-2 text-sm text-white/55">Spec based up and down pricing.</p>
          </div>
          <span className="rounded-full bg-white/8 px-3 py-1.5 text-xs text-white/60">
            {activeSpec.detail}
          </span>
        </div>
        <div className="mt-8 flex min-h-32 items-center justify-center rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_42%),rgba(255,255,255,0.04)] px-6 py-8">
          <div className="text-center">
            <SmartAnimateText
              value={activeSpec.delta}
              className="justify-center text-6xl font-semibold tracking-tight text-white md:text-8xl"
              digitClassName="font-[family:var(--font-heading)]"
              direction="dynamic"
              enterBlur={30}
              enterScale={0.84}
            />
            <p className="mt-3 text-sm text-white/45">price change in thousands</p>
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
                  ? "rounded-full border border-violet-300/30 bg-violet-300/12 px-4 py-2 text-sm font-medium text-violet-100"
                  : "rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-white/65 transition hover:border-white/20 hover:bg-white/10"
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
      <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
        <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Morphing text</p>
        <div className="mt-6 flex min-h-[260px] items-center justify-center rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_35%),rgba(255,255,255,0.04)] p-6">
          <MorphingText
            texts={morphingTexts}
            className="font-[family:var(--font-heading)] text-6xl font-semibold tracking-tight text-white md:text-8xl"
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
      <div className="rounded-[28px] border border-white/10 bg-white/6 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Heavy bike gallery</p>
            <p className="mt-2 text-sm text-white/55">Only the component, fully visible, scroll to orbit.</p>
          </div>
          <span className="rounded-full bg-white/8 px-3 py-1.5 text-xs text-white/60">Stock images</span>
        </div>

        <div
          ref={wheelScrollRef}
          className="h-[80vh] min-h-[700px] overflow-y-auto overscroll-y-contain rounded-[28px] border border-white/10 bg-black/15 [scrollbar-gutter:stable] [scroll-behavior:smooth]"
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
        <ul className="space-y-1 text-sm text-white/60">
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
      <div className="rounded-[28px] border border-white/10 bg-white/6 p-5">
        <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Card stack scroll</p>
        <p className="mt-2 text-sm text-white/55">Scroll down to see the cards scale and stack.</p>
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
      <div className="rounded-[28px] border border-white/10 bg-white/6 p-5">
        <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Inverted perspective carousel</p>
        <p className="mt-2 text-sm text-white/55">Swipe visually with navigation and coverflow depth.</p>
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
      <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
        <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Infinite slider</p>
        <h3 className="mt-3 font-[family:var(--font-heading)] text-3xl font-semibold text-white">
          Trusted by modern product brands
        </h3>
        <p className="mt-2 text-sm text-white/55">
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
      className="rounded-[28px] border border-white/10 bg-white/6 p-8 text-center"
    >
      <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/6 text-cyan-200">
        <CircleDashed className="size-6" />
      </div>
      <h2 className="mt-6 font-[family:var(--font-heading)] text-4xl font-semibold text-white">
        {components.find((item) => item.id === activeId)?.label}
      </h2>
      <p className="mt-3 text-white/55">{comingSoonText[activeId]}</p>
    </motion.section>
  );
}

export function ComponentBrowser() {
  const [activeId, setActiveId] = useState<ComponentId | null>(null);
  const [query, setQuery] = useState("");
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
    <main className="relative min-h-screen overflow-x-hidden px-4 py-4 text-white md:px-6 md:py-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_22%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.16),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(244,114,182,0.10),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />

      <div className="relative mx-auto grid max-w-[1580px] items-start gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <LibrarySidebar
          activeId={activeId}
          options={filteredComponents}
          onSelect={setActiveId}
          query={query}
          onQueryChange={setQuery}
        />

        <section
          className={
            activeId === "card-stack-scroll"
              ? "overflow-visible rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 shadow-[0_30px_120px_rgba(2,8,23,0.55)] backdrop-blur-2xl md:p-5"
              : "overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 shadow-[0_30px_120px_rgba(2,8,23,0.55)] backdrop-blur-2xl md:p-5"
          }
        >
          {!selectedComponent ? (
            <LandingHub components={filteredComponents} onSelect={setActiveId} />
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-[26px] border border-white/10 bg-white/6 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-slate-950">
                    {selectedComponent.status === "Live" ? (
                      <Zap className="size-5" />
                    ) : (
                      <Bike className="size-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.24em] text-white/35 uppercase">Component Preview</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{selectedComponent.label}</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="h-11 rounded-full border-white/15 bg-white/6 px-5 text-white hover:bg-white/10"
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

                {activeId === "orbital-image-wheel" ? (
                  <OrbitalPreview wheelScrollRef={wheelScrollRef} />
                ) : null}

                {activeId === "morphing-text" ? <MorphingTextPreview /> : null}

                {activeId === "tilt-card" ? <TiltCardPreview /> : null}

                {activeId === "card-stack-scroll" ? <CardStackPreview /> : null}

                {activeId === "inverted-perspective-carousel" ? <CarouselPreview /> : null}

                {activeId === "infinite-slider" ? <InfiniteSliderPreview /> : null}

                {activeId &&
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

          <div className="mt-4 flex flex-wrap gap-2">
            {["library", "browse", "preview", "motion"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/55"
              >
                {tag}
              </span>
            ))}
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1.5 text-xs text-cyan-100">
              <Sparkles className="size-3.5" />
              Motion Atelier library
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
