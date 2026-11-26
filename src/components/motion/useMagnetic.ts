"use client";

import { useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent } from "react";

const SPRING = { stiffness: 220, damping: 20, mass: 0.5 };

/**
 * Tërheqje magnetike drejt kursorit, e kufizuar në `max` piksel.
 * Pozicioni normalizohet sipas kufijve të elementit që merr eventet,
 * kështu që funksionon njësoj për një buton të vogël ose një rresht të gjerë.
 */
export function useMagnetic(max = 6) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 2 * max);
  };
  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { style: { x, y }, handlers: { onPointerMove, onPointerLeave } };
}
