"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Direction = "dynamic" | "up" | "down";

type SmartAnimateTextProps = {
  value: string;
  gap?: number;
  className?: string;
  digitClassName?: string;
  staggerDelay?: number;
  enterStiffness?: number;
  enterDamping?: number;
  direction?: Direction;
  enterY?: number;
  enterBlur?: number;
  enterScale?: number;
};

type CharacterState = {
  key: string;
  next: string;
  prev: string | null;
  animate: boolean;
};

const ANIMATION_MS = 520;

function isAnimatableCharacter(char: string) {
  return /^[A-Za-z0-9]$/.test(char);
}

function inferDirection(previous: string, next: string, direction: Direction) {
  if (direction !== "dynamic") {
    return direction;
  }

  const previousNumber = Number(previous);
  const nextNumber = Number(next);

  if (!Number.isNaN(previousNumber) && !Number.isNaN(nextNumber)) {
    return nextNumber >= previousNumber ? "up" : "down";
  }

  return "up";
}

export function SmartAnimateText({
  value,
  gap = 2,
  className,
  digitClassName,
  staggerDelay = 0.04,
  enterStiffness = 170,
  enterDamping = 10,
  direction = "dynamic",
  enterY = 32,
  enterBlur = 52,
  enterScale = 0.7,
}: SmartAnimateTextProps) {
  const previousValueRef = useRef(value);
  const [resolvedDirection, setResolvedDirection] = useState<"up" | "down">(
    direction === "down" ? "down" : "up"
  );
  const [displayValue, setDisplayValue] = useState<CharacterState[]>(() =>
    value.split("").map((char, index) => ({
      key: `${index}-${char}-initial`,
      next: char,
      prev: null,
      animate: false,
    }))
  );

  useEffect(() => {
    const previousValue = previousValueRef.current;
    const nextCharacters = value.split("");
    const previousCharacters = previousValue.split("");

    setResolvedDirection(inferDirection(previousValue, value, direction));

    const nextDisplay = nextCharacters.map((char, index) => {
      const previousCharacter = previousCharacters[index] ?? null;
      const shouldAnimate =
        isAnimatableCharacter(char) &&
        previousCharacter !== char &&
        (isAnimatableCharacter(previousCharacter ?? "") || previousCharacter === null);
      const isNewCharacter = isAnimatableCharacter(char) && previousCharacter === null;

      return {
        key: `${index}-${char}-${Date.now()}`,
        next: char,
        prev: shouldAnimate ? previousCharacter : null,
        animate: shouldAnimate || isNewCharacter,
      };
    });

    setDisplayValue(nextDisplay);
    previousValueRef.current = value;

    const timeout = window.setTimeout(() => {
      setDisplayValue((current) =>
        current.map((item) => ({
          ...item,
          prev: null,
          animate: false,
        }))
      );
    }, ANIMATION_MS);

    return () => window.clearTimeout(timeout);
  }, [direction, value]);

  let staggerIndex = 0;

  return (
    <div
      className={cn("inline-flex items-end", className)}
      style={{ gap: `${gap}px` }}
    >
      {displayValue.map((item, index) => {
        const character = item.next;
        const animatable = isAnimatableCharacter(character);

        if (!animatable) {
          return (
            <span key={item.key} className={cn("inline-block", digitClassName)}>
              {character}
            </span>
          );
        }

        const hasAnimation = item.animate;
        const currentStagger = hasAnimation ? staggerIndex++ : -1;
        const delay = hasAnimation ? currentStagger * staggerDelay : 0;
      const offset = resolvedDirection === "down" ? -Math.abs(enterY) : Math.abs(enterY);
      const transitionDuration = `${Math.max(0.3, enterDamping * 0.05)}s`;
        const transitionTiming = `cubic-bezier(0.22, ${Math.min(
          1,
          enterStiffness / 250
        )}, 0.2, 1)`;

        return (
          <span
            key={`${item.key}-${index}`}
            className={cn(
              "relative inline-flex h-[1em] overflow-hidden align-bottom",
              digitClassName
            )}
            style={{ minWidth: "0.62em" }}
          >
            {item.prev ? (
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  animationName: resolvedDirection === "down" ? "sat-leave-down" : "sat-leave-up",
                  animationDuration: transitionDuration,
                  animationDelay: `${delay}s`,
                  animationTimingFunction: transitionTiming,
                  animationFillMode: "forwards",
                  ["--sat-enter-y" as string]: `${offset}px`,
                  ["--sat-enter-blur" as string]: `${enterBlur}px`,
                  ["--sat-enter-scale" as string]: `${enterScale}`,
                }}
              >
                {item.prev}
              </span>
            ) : null}

            <span
              className="relative flex items-center justify-center"
              style={
                hasAnimation
                  ? {
                      animationName:
                        resolvedDirection === "down" ? "sat-enter-down" : "sat-enter-up",
                      animationDuration: transitionDuration,
                      animationDelay: `${delay}s`,
                      animationTimingFunction: transitionTiming,
                      animationFillMode: "both",
                      ["--sat-enter-y" as string]: `${offset}px`,
                      ["--sat-enter-blur" as string]: `${enterBlur}px`,
                      ["--sat-enter-scale" as string]: `${enterScale}`,
                    }
                  : undefined
              }
            >
              {character}
            </span>
          </span>
        );
      })}
    </div>
  );
}
