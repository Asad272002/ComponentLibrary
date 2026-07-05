"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CarouselImage = {
  src: string;
  alt: string;
};

type InvertedPerspectiveCarouselProps = {
  images: CarouselImage[];
  className?: string;
  autoplay?: boolean;
  intervalMs?: number;
  showNavigation?: boolean;
};

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

export function InvertedPerspectiveCarousel({
  images,
  className,
  autoplay = true,
  intervalMs = 2600,
  showNavigation = true,
}: InvertedPerspectiveCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!autoplay || images.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1, images.length));
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [autoplay, images.length, intervalMs]);

  const slides = useMemo(
    () =>
      images.map((image, index) => {
        const rawOffset = index - activeIndex;
        const offset =
          rawOffset > images.length / 2
            ? rawOffset - images.length
            : rawOffset < -images.length / 2
              ? rawOffset + images.length
              : rawOffset;

        return {
          ...image,
          index,
          offset,
          isActive: offset === 0,
        };
      }),
    [activeIndex, images]
  );

  return (
    <div className={cn("relative overflow-hidden rounded-[30px] border border-white/10 bg-black/15 p-6", className)}>
      <div className="relative h-[430px] perspective-[1800px]">
        {slides.map((slide) => {
          const absOffset = Math.abs(slide.offset);
          const visible = absOffset < 3;
          if (!visible) {
            return null;
          }

          return (
            <motion.button
              key={`${slide.src}-${slide.index}`}
              type="button"
              onClick={() => setActiveIndex(slide.index)}
              className="absolute inset-y-4 left-1/2 block w-[320px] overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_26px_80px_rgba(2,8,23,0.36)]"
              initial={false}
              animate={{
                x: `calc(-50% + ${slide.offset * 210}px)`,
                scale: slide.isActive ? 1 : 0.82 - absOffset * 0.06,
                rotateY: slide.offset * -36,
                rotateZ: slide.offset * -2,
                y: absOffset * 16,
                opacity: slide.isActive ? 1 : 0.42,
                zIndex: 20 - absOffset,
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),transparent_18%,transparent_70%,rgba(15,23,42,0.22))]" />
              <div className="relative h-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      {showNavigation ? (
        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="rounded-full border-white/70 bg-white/70 text-slate-700 shadow-[0_10px_30px_rgba(79,70,229,0.08)] hover:bg-white/90"
              onClick={() => setActiveIndex((current) => wrapIndex(current - 1, images.length))}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-white/70 bg-white/70 text-slate-700 shadow-[0_10px_30px_rgba(79,70,229,0.08)] hover:bg-white/90"
              onClick={() => setActiveIndex((current) => wrapIndex(current + 1, images.length))}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "size-2.5 rounded-full transition",
                  index === activeIndex ? "bg-slate-900" : "bg-slate-300"
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
