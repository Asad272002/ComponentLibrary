"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

type StackItem = {
  title: string;
  subtitle: string;
  src: string;
  accent: string;
};

type StackCardProps = {
  item: StackItem;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
};

function StackCard({ item, index, progress, range, targetScale }: StackCardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex items-center justify-center">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${index * 20 + 250}px)`,
        }}
        className="relative -top-1/4 flex h-[320px] w-[min(840px,92vw)] origin-top flex-col overflow-hidden rounded-[30px] border border-white/70 bg-white/80 shadow-[0_30px_90px_rgba(79,70,229,0.20)]"
      >
        <div className="grid h-full gap-4 p-5 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col justify-between rounded-[26px] border border-white/70 bg-white/70 p-6">
            <div>
              <p className="text-[11px] tracking-[0.24em] text-slate-500 uppercase">Project {index + 1}</p>
              <h3 className="mt-4 font-[family:var(--font-heading)] text-4xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">{item.subtitle}</p>
            </div>

            <div
              className="mt-6 rounded-[24px] border border-white/70 px-5 py-4 text-sm text-slate-700"
              style={{ background: item.accent }}
            >
              Scroll-driven stack scaling with smooth layered transforms.
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[26px] border border-white/70 bg-white/60">
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

type CardStackScrollProps = {
  items: StackItem[];
};

export function CardStackScroll({ items }: CardStackScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: contentRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={scrollContainerRef}
      className="h-[82vh] min-h-[720px] overflow-y-auto overscroll-y-contain rounded-[30px] border border-white/10 bg-black/10 [scrollbar-gutter:stable] [scroll-behavior:smooth]"
    >
      <main
        ref={contentRef}
        className="relative flex w-full flex-col items-center justify-center pb-[100vh] pt-[50vh]"
      >
        <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:-translate-x-1/2 after:bg-gradient-to-b after:from-white/20 after:to-white after:content-['']">
            scroll down to see card stack
          </span>
        </div>

        {items.map((item, index) => (
          <StackCard
            key={`${item.title}-${index}`}
            item={item}
            index={index}
            progress={scrollYProgress}
            range={[index * 0.25, 1]}
            targetScale={Math.max(0.5, 1 - (items.length - index - 1) * 0.1)}
          />
        ))}
      </main>
    </div>
  );
}
