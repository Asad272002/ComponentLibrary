"use client";

import { useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

export type InfiniteSliderItem =
  | string
  | {
      label: string;
      href?: string;
      iconPath?: string;
      iconColor?: string;
      iconViewBox?: string;
    };

type InfiniteSliderProps = {
  items: InfiniteSliderItem[];
  className?: string;
  itemClassName?: string;
  speed?: number;
  gap?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
};

export function InfiniteSlider({
  items,
  className,
  itemClassName,
  speed = 24,
  gap = 16,
  reverse = false,
  pauseOnHover = true,
}: InfiniteSliderProps) {
  const prefersReducedMotion = useReducedMotion();
  const loopItems = [...items, ...items];
  const animationStyle: CSSProperties = prefersReducedMotion
    ? { gap }
    : {
        gap,
        animationName: "infinite-slider-marquee",
        animationDuration: `${speed}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationDirection: reverse ? "reverse" : "normal",
      };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-full border border-white/60 bg-white/55 px-4 py-3",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white/95 via-white/55 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white/95 via-white/55 to-transparent" />

      <div
        className={cn(
          "flex w-max items-center will-change-transform",
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : undefined
        )}
        style={animationStyle}
      >
        {loopItems.map((item, index) => (
          typeof item === "string" ? (
            <span
              key={`${item}-${index}`}
              className={cn(
                "shrink-0 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-medium text-slate-800",
                itemClassName
              )}
            >
              {item}
            </span>
          ) : (
            <a
              key={`${item.label}-${index}`}
              href={item.href ?? "#"}
              className={cn(
                "inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/70 bg-white/75 px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:border-indigo-200/80 hover:bg-white/90",
                itemClassName
              )}
            >
              {item.iconPath ? (
                <span className="flex size-7 items-center justify-center rounded-full bg-white shadow-[0_4px_10px_rgba(79,70,229,0.08)]">
                  <svg
                    viewBox={item.iconViewBox ?? "0 0 24 24"}
                    className="size-4"
                    aria-hidden="true"
                    fill={item.iconColor ?? "currentColor"}
                  >
                    <path d={item.iconPath} />
                  </svg>
                </span>
              ) : null}
              <span className="font-medium tracking-[0.01em]">{item.label}</span>
            </a>
          )
        ))}
      </div>
    </div>
  );
}
