"use client";

import { useSyncExternalStore } from "react";
import { content, schedule } from "@/data/restaurantData";
import { cn } from "@/lib/cn";
import { useLanguage } from "../LanguageProvider";

/* Ora "tik-tak" çdo minutë — vlerë e qëndrueshme për useSyncExternalStore. */
const subscribeMinute = (cb: () => void) => {
  const id = window.setInterval(cb, 30_000);
  return () => window.clearInterval(id);
};
const getMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => null;

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Dita (0–6) dhe minuta e ditës sipas orës së Shqipërisë. */
function nowInTirana(epochMinute: number) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: schedule.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(epochMinute * 60_000));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

type Status =
  | { kind: "openNow" }
  | { kind: "opensToday" }
  | { kind: "opensTomorrow" }
  | { kind: "opensOn"; day: number };

function getStatus(epochMinute: number): Status {
  const { day, minutes } = nowInTirana(epochMinute);
  const open = toMinutes(schedule.open);
  const close = toMinutes(schedule.close);
  const isOpenDay = (d: number) => !schedule.closedDays.includes(d);

  if (isOpenDay(day) && minutes >= open && minutes < close) return { kind: "openNow" };
  if (isOpenDay(day) && minutes < open) return { kind: "opensToday" };

  for (let offset = 1; offset <= 7; offset++) {
    const next = (day + offset) % 7;
    if (isOpenDay(next)) return offset === 1 ? { kind: "opensTomorrow" } : { kind: "opensOn", day: next };
  }
  return { kind: "opensToday" };
}

export function OpenStatus({ className }: { className?: string }) {
  const { t, lang } = useLanguage();
  const minute = useSyncExternalStore(subscribeMinute, getMinute, getServerMinute);

  // Në server (dhe para hidratimit) nuk dimë orën e vizitorit — rezervojmë vendin.
  if (minute === null) return <span className={cn("invisible", className)}>·</span>;

  const status = getStatus(minute);
  const isOpen = status.kind === "openNow";
  const time = isOpen ? schedule.close : schedule.open;
  const day = status.kind === "opensOn" ? content.weekdays[lang][status.day] : "";
  const text = t(content.hero.status[status.kind]).replace("{time}", time).replace("{day}", day);

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span aria-hidden="true" className="relative flex size-1.5">
        {isOpen && (
          <span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-60 [animation-duration:2.4s]" />
        )}
        <span className={cn("relative size-1.5 rounded-full", isOpen ? "bg-gold" : "bg-muted")} />
      </span>
      {text}
    </span>
  );
}
