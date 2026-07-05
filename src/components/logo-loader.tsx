"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoLoaderProps = {
  text?: string;
  fullscreen?: boolean;
  className?: string;
};

export function LogoLoader({
  text = "Starting engine...",
  fullscreen = true,
  className,
}: LogoLoaderProps) {
  return (
    <div
      className={cn(
        "logo-loader",
        fullscreen ? "logo-loader--fullscreen" : "logo-loader--inline",
        className
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="logo-loader__background" aria-hidden="true">
        <span className="logo-loader__beam logo-loader__beam--one" />
        <span className="logo-loader__beam logo-loader__beam--two" />
        <span className="logo-loader__grid" />
      </div>

      <div className="logo-loader__stage">
        <div className="logo-loader__badge">Premium Loader</div>

        <div className="logo-loader__scene" aria-hidden="true">
          <span className="logo-loader__halo" />
          <span className="logo-loader__shadow" />
          <div className="logo-loader__plate">
            <span className="logo-loader__plate-sheen" />
            <div className="logo-loader__logo-frame">
              <Image
                src="/logo.svg"
                alt="Automotive brand logo"
                className="logo-loader__logo"
                width={220}
                height={220}
              />
            </div>
          </div>
        </div>

        <div className="logo-loader__copy">
          <p className="logo-loader__text">{text}</p>
          <div className="logo-loader__status-line" aria-hidden="true">
            <span className="logo-loader__status-dot" />
            <span className="logo-loader__status-track" />
          </div>
        </div>
      </div>
    </div>
  );
}
