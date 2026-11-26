"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Shkëndija zjarri që ngjiten ngadalë nga zgara — sfondi i hero-s.
 * "Tullë, dru dhe zjarr": pak grimca ari, lëvizje e butë, dridhje e lehtë drite.
 *
 * • Ndalet kur hero nuk duket ose skeda është e fshehur (kursen bateri).
 * • Me "reduce motion" nuk vizatohet fare.
 */

type Ember = {
  x: number;
  y: number;
  r: number; // rrezja (px)
  vy: number; // shpejtësia e ngjitjes (px/s)
  drift: number; // amplituda e lëkundjes anësore (px)
  phase: number;
  freq: number;
  life: number; // 0 → 1
  span: number; // jetëgjatësia (s)
  flicker: number;
  hue: number; // 0 = ar i ngrohtë, 1 = portokalli zjarri
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export function Embers({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let embers: Ember[] = [];
    let frame = 0;
    let last = 0;
    let visible = true;

    const spawn = (anywhere: boolean): Ember => ({
      x: rand(0, width),
      // Shumica lindin në pjesën e poshtme — si nga thëngjijtë.
      y: anywhere ? rand(height * 0.2, height) : height + rand(0, 40),
      r: rand(0.6, 1.9),
      vy: rand(14, 38),
      drift: rand(8, 28),
      phase: rand(0, Math.PI * 2),
      freq: rand(0.3, 0.9),
      life: anywhere ? rand(0, 0.7) : 0,
      span: rand(7, 14),
      flicker: rand(0, Math.PI * 2),
      hue: Math.random(),
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Dendësi e ulët: ~1 shkëndijë për 28 000 px², maksimumi 55.
      const count = Math.min(55, Math.max(18, Math.round((width * height) / 28000)));
      embers = Array.from({ length: count }, () => spawn(true));
    };

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life += dt / e.span;
        e.y -= e.vy * dt;
        e.phase += e.freq * dt;
        e.flicker += dt * 6;
        if (e.life >= 1 || e.y < -20) {
          embers[i] = spawn(false);
          continue;
        }

        const x = e.x + Math.sin(e.phase) * e.drift;
        // Shfaqet butë, zbehet ngadalë teksa ngjitet.
        const fade = Math.min(e.life / 0.15, 1) * (1 - e.life) ** 1.4;
        const alpha = fade * (0.55 + 0.45 * Math.sin(e.flicker)) * 0.9;
        if (alpha <= 0.01) continue;

        // Ari i shampanjës (#dfbe82) → portokalli i thëngjillit.
        const g = Math.round(190 - e.hue * 70);
        const b = Math.round(130 - e.hue * 90);
        const glow = e.r * 6;
        const grad = ctx.createRadialGradient(x, e.y, 0, x, e.y, glow);
        grad.addColorStop(0, `rgba(255, ${g + 40}, ${b + 40}, ${alpha})`);
        grad.addColorStop(0.18, `rgba(223, ${g}, ${b}, ${alpha * 0.6})`);
        grad.addColorStop(1, "rgba(223, 140, 60, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, e.y, glow, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (!visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(draw);
    };

    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", start);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", start);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
