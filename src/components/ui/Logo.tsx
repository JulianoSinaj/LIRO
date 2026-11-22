import { useId } from "react";
import { restaurant } from "@/data/restaurantData";
import { cn } from "@/lib/cn";

/**
 * Ikona e logos: kapaku i shërbimit (cloche) me pirun e thikë dhe avull sipër,
 * e vizatuar me gradient metalik ari.
 */
export function LogoMark({ className }: { className?: string }) {
  const gradientId = `logo-gold-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke={`url(#${gradientId})`}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="8"
          y1="4"
          x2="56"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#F3E0B5" />
          <stop offset="0.45" stopColor="#DFBE82" />
          <stop offset="1" stopColor="#B88B4A" />
        </linearGradient>
      </defs>
      {/* avulli */}
      <path d="M24 16c-1.6-1.5-1.6-3 0-4.5s1.6-3 0-4.5" />
      <path d="M32 15.5c-1.6-1.5-1.6-3 0-4.5s1.6-3 0-4.5" />
      <path d="M40 16c-1.6-1.5-1.6-3 0-4.5s1.6-3 0-4.5" />
      {/* doreza */}
      <circle cx="32" cy="21.5" r="2.2" />
      {/* kupola */}
      <path d="M9 47a23 23 0 0 1 46 0" />
      {/* buzët dhe pjata */}
      <path d="M5 47h54" />
      <path d="M11 52.5h42" />
      {/* piruni */}
      <path d="M24.5 30v5M27 30v5M29.5 30v5" />
      <path d="M24.5 35c0 1.7 1.1 2.8 2.5 2.8s2.5-1.1 2.5-2.8" />
      <path d="M27 37.8V43" />
      {/* thika */}
      <path d="M35.5 30c2.6 1.1 3.6 4.2 3.6 8.2h-3.6V30z" />
      <path d="M37.3 38.2V43" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  size?: "md" | "lg";
};

/** Logoja e plotë: ikona + "TAVERNA LI-RO" + "PANAJA • VLORË". */
export function Logo({ className, size = "md" }: LogoProps) {
  const lg = size === "lg";
  return (
    <span className={cn("inline-flex items-center gap-2.5 sm:gap-3", className)}>
      <LogoMark className={cn("shrink-0", lg ? "size-14" : "size-9 sm:size-11")} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-semibold whitespace-nowrap text-ivory uppercase",
            lg
              ? "text-[1.7rem] tracking-[0.14em]"
              : "text-[1.05rem] tracking-[0.1em] sm:text-[1.35rem] sm:tracking-[0.12em]",
          )}
        >
          Taverna{" "}
          <span className="text-gold-soft">
            {/* Viza e Bodoni-t është shumë e hollë — përdorim vizën e Jost-it */}
            Li<span className="font-sans font-medium">-</span>Ro
          </span>
        </span>
        <span
          className={cn(
            "mt-1.5 font-sans font-medium whitespace-nowrap text-gold/75 uppercase",
            lg
              ? "text-[11px] tracking-[0.42em]"
              : "text-[8.5px] tracking-[0.34em] sm:text-[9px] sm:tracking-[0.38em]",
          )}
        >
          {restaurant.location}
        </span>
      </span>
    </span>
  );
}
