"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TiltCardProps = {
  title: string;
  description?: string;
  price?: string;
  badgeLabel?: string;
  badgeVariant?: "success" | "warning";
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  className?: string;
  children?: ReactNode;
};

export function TiltCard({
  title,
  description,
  price,
  badgeLabel,
  badgeVariant = "success",
  imageSrc,
  imageAlt = "",
  href,
  className,
  children,
}: TiltCardProps) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const rotateX = useSpring(0, { stiffness: 220, damping: 20, mass: 0.6 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 20, mass: 0.6 });
  const glow = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(255,255,255,0.24), rgba(255,255,255,0.02) 35%, transparent 65%)`;

  const Wrapper = href ? motion.a : motion.div;
  const badgeTone =
    badgeVariant === "warning"
      ? "bg-amber-500/15 text-amber-700"
      : "bg-emerald-500/15 text-emerald-700";

  return (
    <Wrapper
      href={href}
      className={cn(
        "group relative block overflow-hidden rounded-[30px] border border-white/70 bg-white/75 p-6 text-slate-900 shadow-[0_30px_80px_rgba(79,70,229,0.16)]",
        className
      )}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        mouseX.set(x);
        mouseY.set(y);
        rotateY.set(((x - 50) / 50) * 9);
        rotateX.set(-((y - 50) / 50) * 9);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
        mouseX.set(50);
        mouseY.set(50);
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(79,70,229,0.10),transparent_35%,rgba(14,165,233,0.10))]" />

      <div className="relative flex h-full min-h-[320px] flex-col justify-between [transform:translateZ(40px)]">
        <div className="flex items-start justify-between gap-3">
          {(price || badgeLabel) ? (
            <div className="inline-flex overflow-hidden rounded-full border border-white/70">
              {price ? (
                <span className="bg-slate-900 px-3 py-1.5 text-sm font-medium text-white">
                  {price}
                </span>
              ) : null}
              {badgeLabel ? (
                <span className={cn("px-3 py-1.5 text-sm font-medium", badgeTone)}>
                  {badgeLabel}
                </span>
              ) : null}
            </div>
          ) : <span />}

          {href ? (
            <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/70 bg-white/70 text-slate-700">
              <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          ) : null}
        </div>

        <div className="mt-8 max-w-[70%]">
          <h3 className="font-[family:var(--font-heading)] text-3xl font-semibold tracking-tight">
            {title}
          </h3>
          {description ? (
            <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
          ) : null}
          {children ? <div className="mt-5">{children}</div> : null}
        </div>

        {imageSrc ? (
          <motion.div
            className="pointer-events-none absolute -right-8 top-[4.5rem] h-52 w-72 overflow-hidden rounded-[26px] border border-white/70 shadow-[0_28px_70px_rgba(79,70,229,0.28)]"
            style={{ rotate: -5 }}
            whileHover={{ rotate: -3, y: -4 }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="288px"
              className="object-cover"
            />
          </motion.div>
        ) : null}
      </div>
    </Wrapper>
  );
}
