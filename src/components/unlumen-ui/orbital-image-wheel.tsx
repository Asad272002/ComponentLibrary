"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

import { cn } from "@/lib/utils";

export type OrbitalImageWheelImage = {
  src: string;
  alt?: string;
  label?: string;
  subtitle?: string;
};

type OrbitalImageWheelProps = {
  images: OrbitalImageWheelImage[];
  turns?: number;
  blur?: number;
  dim?: number;
  brightnessBoost?: number;
  darknessStrength?: number;
  minSaturation?: number;
  saturationStrength?: number;
  focusSpread?: number;
  scaleEffect?: number;
  scrollSensitivity?: number;
  itemWidth?: number;
  itemHeight?: number;
  wheelSize?: number;
  cropRatio?: number;
  scrollLength?: number;
  captionOffset?: number;
  showCaption?: boolean;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  className?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function OrbitalImageWheel({
  images,
  turns = 1.55,
  blur = 4,
  dim = 48,
  brightnessBoost = 30,
  darknessStrength = 1,
  minSaturation = 70,
  saturationStrength = 0.72,
  focusSpread = 0.34,
  scaleEffect = 0.1,
  scrollSensitivity = 0.56,
  itemWidth = 220,
  itemHeight = 300,
  wheelSize,
  cropRatio = 0.72,
  scrollLength = 185,
  captionOffset = 10,
  showCaption = true,
  scrollContainerRef,
  className,
}: OrbitalImageWheelProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const targetProgressRef = useRef(0);
  const renderedProgressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const scroller = scrollContainerRef?.current;
      let nextProgress = 0;

      if (scroller) {
        const sectionTop = section.offsetTop;
        const totalDistance = Math.max(section.offsetHeight - scroller.clientHeight, 1);
        nextProgress = clamp((scroller.scrollTop - sectionTop) / totalDistance, 0, 1);
      } else {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const totalDistance = Math.max(rect.height - viewportHeight, 1);
        nextProgress = clamp(-rect.top / totalDistance, 0, 1);
      }

      targetProgressRef.current = nextProgress;
    };

    updateProgress();

    let scrollFrame = 0;
    let animationFrame = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(updateProgress);
    };

    const animateProgress = () => {
      const nextValue =
        renderedProgressRef.current +
        (targetProgressRef.current - renderedProgressRef.current) * 0.1;
      const snappedValue =
        Math.abs(nextValue - targetProgressRef.current) < 0.0005
          ? targetProgressRef.current
          : nextValue;

      if (snappedValue !== renderedProgressRef.current) {
        renderedProgressRef.current = snappedValue;
        setProgress(snappedValue);
      }

      animationFrame = window.requestAnimationFrame(animateProgress);
    };

    animateProgress();

    const scroller = scrollContainerRef?.current;

    if (scroller) {
      scroller.addEventListener("scroll", onScroll, { passive: true });
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(animationFrame);
      if (scroller) {
        scroller.removeEventListener("scroll", onScroll);
      } else {
        window.removeEventListener("scroll", onScroll);
      }
      window.removeEventListener("resize", onScroll);
    };
  }, [scrollContainerRef]);

  const wheelDiameter = wheelSize ?? 1400;
  const centerY = wheelDiameter * cropRatio;
  const activeIndex = Math.round(progress * Math.max(images.length - 1, 0));

  const transformedImages = useMemo(() => {
    const focusAngle = -Math.PI / 2;

    return images.map((image, index) => {
      const t = images.length <= 1 ? 0 : index / images.length;
      const angle = focusAngle - progress * turns * Math.PI * 2 * scrollSensitivity + t * Math.PI * 2;
      const normalizedDistance =
        Math.abs(Math.atan2(Math.sin(angle - focusAngle), Math.cos(angle - focusAngle))) / Math.PI;
      const focus = clamp(1 - normalizedDistance / focusSpread, 0, 1);
      const x = Math.cos(angle) * (wheelDiameter / 2);
      const y = Math.sin(angle) * (wheelDiameter / 2);
      const brightness = dim + focus * brightnessBoost * darknessStrength;
      const saturation = minSaturation + focus * 100 * saturationStrength;
      const imageScale = 1 - (1 - focus) * scaleEffect;
      const imageBlur = (1 - focus) * blur;

      return {
        ...image,
        index,
        x,
        y,
        focus,
        brightness,
        saturation,
        imageScale,
        imageBlur,
      };
    });
  }, [
    blur,
    brightnessBoost,
    dim,
    focusSpread,
    images,
    minSaturation,
    progress,
    saturationStrength,
    scaleEffect,
    scrollSensitivity,
    turns,
    wheelDiameter,
    darknessStrength,
  ]);

  const activeImage =
    transformedImages.reduce<(typeof transformedImages)[number] | undefined>((best, image) => {
      if (!best || image.focus > best.focus) {
        return image;
      }
      return best;
    }, undefined) ?? transformedImages[activeIndex] ?? transformedImages[0];

  return (
    <section
      ref={sectionRef}
      className={cn("relative", className)}
      style={{ height: `${scrollLength}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.10),transparent_24%),linear-gradient(180deg,#0f172a,#050816)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_62%,rgba(255,255,255,0.08),transparent_15%),radial-gradient(circle_at_center,rgba(34,211,238,0.10),transparent_32%)]" />
        <div className="absolute inset-x-0 top-0 z-10 flex h-[42%] items-start justify-between px-6 pt-6 md:px-10">
          <div>
            <p className="text-xs font-medium tracking-[0.16em] text-white/35 uppercase">
              Orbital Image Wheel
            </p>
            <p className="mt-3 max-w-md text-2xl font-semibold tracking-tight text-white md:text-4xl">
              Product art in a floating orbit.
            </p>
          </div>
          <div className="hidden rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/55 md:block">
            Scroll to browse
          </div>
        </div>

        {showCaption && activeImage ? (
          <div
            className="absolute inset-x-0 z-20 flex flex-col items-center text-center"
            style={{ bottom: `${captionOffset}vh` }}
          >
            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-xl">
              {activeImage.label ?? activeImage.alt ?? `Bike ${activeIndex + 1}`}
            </div>
            <p className="mt-3 text-sm text-white/50">
              {activeImage.subtitle ?? activeImage.alt ?? "Visual Story"}
            </p>
          </div>
        ) : null}

        <div
          className="absolute left-1/2 bottom-0"
          style={{
            width: wheelDiameter,
            height: wheelDiameter,
            transform: `translateX(-50%) translateY(${centerY - wheelDiameter}px)`,
          }}
        >
          {transformedImages.map((image) => {
            const zIndex = Math.round(image.focus * 100);
            const opacity = 0.48 + image.focus * 0.52;
            const imageShadow = 24 + image.focus * 54;
            const borderOpacity = 0.1 + image.focus * 0.22;
            const yTilt = image.x / (wheelDiameter / 8);

            return (
              <div
                key={`${image.src}-${image.index}`}
                className="absolute top-1/2 left-1/2 overflow-hidden rounded-[28px] bg-white"
                style={{
                  width: itemWidth,
                  height: itemHeight,
                  zIndex,
                  opacity,
                  border: `1px solid rgba(255,255,255,${borderOpacity})`,
                  transform: `translate(${image.x - itemWidth / 2}px, ${image.y - itemHeight / 2}px) rotate(${yTilt}deg) scale(${image.imageScale})`,
                  filter: `blur(${image.imageBlur}px) brightness(${image.brightness}%) saturate(${image.saturation}%)`,
                  boxShadow: `0 ${imageShadow}px ${imageShadow * 2}px rgba(15,23,42,0.34)`,
                  transition:
                    "transform 160ms cubic-bezier(0.22,1,0.36,1), filter 160ms linear, opacity 160ms linear, box-shadow 160ms linear",
                }}
              >
                <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_18%,transparent_76%,rgba(15,23,42,0.16))]" />
                <Image
                  src={image.src}
                  alt={image.alt ?? image.label ?? "Bike showcase image"}
                  fill
                  sizes="(max-width: 1280px) 240px, 280px"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
