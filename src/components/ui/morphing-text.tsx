"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type MorphingTextProps = {
  texts: string[];
  className?: string;
  intervalMs?: number;
};

export function MorphingText({
  texts,
  className,
  intervalMs = 1800,
}: MorphingTextProps) {
  const safeTexts = useMemo(
    () => (texts.length ? texts : [""]),
    [texts]
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (safeTexts.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % safeTexts.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [intervalMs, safeTexts]);

  return (
    <div className={cn("relative flex min-h-[1.2em] items-center justify-center", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={`${safeTexts[index]}-${index}`}
          initial={{ opacity: 0, filter: "blur(10px)", y: 18, scale: 0.96 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", y: -18, scale: 1.04 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="block"
        >
          {safeTexts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
