"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock, House, Minus, Pencil, Phone, Plus, Trees, Users } from "lucide-react";
import {
  content,
  dateNames,
  images,
  openingHours,
  reservationSettings,
  restaurant,
  seatingOptions,
  type Lang,
} from "@/data/restaurantData";
import { cn } from "@/lib/cn";
import { EASE_LUXE } from "@/lib/motion";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { ShimmerBorder } from "../motion/ShimmerBorder";
import { AccentText } from "../ui/AccentText";
import { AmbientGlow } from "../ui/Atmosphere";
import { ButtonArrow, buttonClasses } from "../ui/Button";
import { WhatsAppIcon } from "../ui/icons";
import { SectionHeading } from "../ui/SectionHeading";

/* -------------------------------------------------------------------------- */
/*  Ndihmës                                                                    */
/* -------------------------------------------------------------------------- */

const pad = (n: number) => String(n).padStart(2, "0");

function buildTimeSlots() {
  const toMinutes = (value: string) => {
    const [h, m] = value.split(":").map(Number);
    return h * 60 + m;
  };
  const slots: string[] = [];
  const end = toMinutes(reservationSettings.lastSlot);
  for (
    let minutes = toMinutes(reservationSettings.firstSlot);
    minutes <= end;
    minutes += reservationSettings.intervalMinutes
  ) {
    slots.push(`${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`);
  }
  return slots;
}

const timeSlots = buildTimeSlots();

/* Data e sotme (YYYY-MM-DD) — vetëm në klient, për të shmangur mospërputhjet. */
const noopSubscribe = () => () => {};
function getToday() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
const useToday = () => useSyncExternalStore(noopSubscribe, getToday, () => "");

/* "2026-12-24" → "E enjte, 24 dhjetor 2026" / "Thursday, 24 December 2026" */
function formatDate(iso: string, lang: Lang) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const weekday = new Date(y, m - 1, d).getDay();
  const names = dateNames[lang];
  return `${names.weekdays[weekday]}, ${d} ${names.months[m - 1]} ${y}`;
}

const seatingIcons = { indoor: House, garden: Trees };

/* -------------------------------------------------------------------------- */
/*  Forma                                                                      */
/* -------------------------------------------------------------------------- */

type FormState = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seating: string;
  notes: string;
};

type ErrorKey = keyof typeof content.reservation.errors;
type Errors = Partial<Record<"name" | "phone" | "date" | "time", ErrorKey>>;

const initialForm: FormState = {
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: 2,
  seating: "",
  notes: "",
};

function validate(form: FormState, today: string): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "required";

  const digits = form.phone.replace(/\D/g, "");
  if (!form.phone.trim()) errors.phone = "required";
  else if (!/^[+\d\s()./-]+$/.test(form.phone) || digits.length < 8 || digits.length > 15)
    errors.phone = "phone";

  if (!form.date) errors.date = "required";
  else if (today && form.date < today) errors.date = "pastDate";

  if (!form.time) errors.time = "required";
  return errors;
}

const inputClass = (hasError: boolean) =>
  cn(
    "w-full rounded-xl border bg-ink/55 px-4 py-3.5 text-[15px] text-ivory outline-none transition-[border-color,box-shadow,background-color] duration-300 [color-scheme:dark] placeholder:text-muted/45 focus:border-gold/70 focus:bg-ink/75 focus:shadow-[0_0_0_4px_rgb(212_175_114/0.12),0_0_24px_-6px_rgb(212_175_114/0.35)]",
    hasError ? "border-red-400/60" : "border-gold/15 hover:border-gold/35",
  );

const labelClass =
  "mb-2.5 flex items-baseline gap-2 text-[11px] font-semibold tracking-[0.18em] text-gold/85 uppercase";

function Field({
  id,
  label,
  error,
  optional,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {optional && (
          <span className="font-normal tracking-normal text-muted normal-case">({optional})</span>
        )}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden text-xs text-red-300"
          >
            <span className="block pt-1.5">{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Shenja "✓" që vizatohet. */
function AnimatedCheck() {
  return (
    <svg viewBox="0 0 64 64" className="size-16" aria-hidden="true">
      <motion.circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke="url(#check-gold)"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: EASE_LUXE }}
      />
      <motion.path
        d="M20 33l8 8 16-17"
        fill="none"
        stroke="url(#check-gold)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.6, ease: EASE_LUXE }}
      />
      <defs>
        <linearGradient
          id="check-gold"
          x1="0"
          y1="0"
          x2="64"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F3E0B5" />
          <stop offset="1" stopColor="#B88B4A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Seksioni                                                                   */
/* -------------------------------------------------------------------------- */

export function Reservation() {
  const { t, lang } = useLanguage();
  const r = content.reservation;
  const today = useToday();
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;

  const [form, setForm] = useState<FormState>(initialForm);
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /* Kur shfaqet konfirmimi: fokus te titulli dhe, nëse karta s'duket mirë
   * (p.sh. në celular), sille në pamje. Thirret kur titulli montohet. */
  const onSuccessShown = useCallback((heading: HTMLHeadingElement | null) => {
    if (!heading) return;
    heading.focus({ preventScroll: true });
    const top = (cardRef.current ?? heading).getBoundingClientRect().top;
    if (top < 80 || top > window.innerHeight * 0.5) {
      window.scrollBy({ top: top - 96, behavior: "smooth" });
    }
  }, []);

  /* Gabimet shfaqen vetëm pas tentativës së parë për ta dërguar formën. */
  const errors: Errors = attempted ? validate(form, today) : {};

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const changeGuests = (delta: number) =>
    setForm((prev) => ({
      ...prev,
      guests: Math.min(reservationSettings.maxGuests, Math.max(1, prev.guests + delta)),
    }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(form, today);
    setAttempted(true);
    const firstInvalid = (["name", "phone", "date", "time"] as const).find((key) => found[key]);
    if (firstInvalid) document.getElementById(fieldId(firstInvalid))?.focus();
    else setSubmitted(true);
  };

  const errorText = (key?: ErrorKey) => (key ? t(r.errors[key]) : undefined);
  const describedBy = (name: keyof Errors) => (errors[name] ? `${fieldId(name)}-error` : undefined);

  const guestsLabel = (n: number) => `${n} ${t(n === 1 ? r.guestUnit.one : r.guestUnit.many)}`;
  const seating = seatingOptions.find((s) => s.id === form.seating);

  /* Përmbledhja dhe mesazhi për WhatsApp */
  const summary: { label: string; value: string }[] = [
    { label: t(r.fields.name), value: form.name.trim() },
    { label: t(r.fields.phone), value: form.phone.trim() },
    { label: t(r.fields.date), value: formatDate(form.date, lang) },
    { label: t(r.fields.time), value: form.time },
    { label: t(r.fields.guests), value: guestsLabel(form.guests) },
    {
      label: t(r.fields.seatingSummary),
      value: t(seating ? seating.label : r.fields.noPreference),
    },
    ...(form.notes.trim() ? [{ label: t(r.fields.notes), value: form.notes.trim() }] : []),
  ];

  const whatsappText = [
    t(r.whatsappMessage.greeting),
    "",
    ...summary.map((row) => `• ${row.label}: ${row.value}`),
    "",
    t(r.whatsappMessage.thanks),
  ].join("\n");
  const whatsappHref = `https://wa.me/${restaurant.contact.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
  const firstName = form.name.trim().split(/\s+/)[0] ?? "";

  const info = [
    {
      icon: Clock,
      label: t(r.hoursLabel),
      value: openingHours.map((h) => `${t(h.days)} · ${h.time}`).join("\n"),
    },
    {
      icon: Phone,
      label: t(r.phoneLabel),
      value: restaurant.contact.phoneDisplay,
      href: restaurant.contact.phoneHref,
    },
    {
      icon: WhatsAppIcon,
      label: t(r.whatsappLabel),
      value: t(r.whatsappText),
      href: `https://wa.me/${restaurant.contact.whatsappNumber}`,
      external: true,
    },
  ];

  return (
    <section
      id="reservation"
      data-nav=""
      className="relative isolate overflow-x-clip py-24 sm:py-32"
    >
      {/* Sfondi: tarracë në mbrëmje, shumë e errësuar */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={images.reservation.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink via-ink/80 to-ink" />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/60 to-ink/90" />
      </div>
      <AmbientGlow className="-right-40 top-1/4 size-[46rem]" />

      <div className="relative mx-auto grid max-w-[88rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        {/* Informacioni */}
        <div className="lg:col-span-5 lg:pt-4">
          <SectionHeading
            eyebrow={t(r.eyebrow)}
            title={t(r.title)}
            subtitle={t(r.subtitle)}
            align="left"
          />

          <FadeUp delay={0.25}>
            <ul className="mt-10 divide-y divide-gold/12 border-y border-gold/12">
              {info.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label} className="flex items-center gap-5 py-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.04] text-gold-soft">
                    <Icon className="size-5" strokeWidth={1.3} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.22em] text-muted uppercase">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="mt-1 inline-block font-serif text-xl text-ivory transition-colors hover:text-gold-light"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 font-serif text-xl whitespace-pre-line text-ivory">
                        {value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.35}>
            <p className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-muted">
              <Users
                className="mt-0.5 size-4 shrink-0 text-gold"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              {t(r.groupsNote)}
            </p>
          </FadeUp>
        </div>

        {/* Karta e formës */}
        <FadeUp delay={0.15} className="lg:col-span-7" y={40}>
          <ShimmerBorder className="rounded-3xl bg-bronze/72 shadow-[0_50px_100px_-40px_rgb(0_0_0/1)] backdrop-blur-xl">
            <div ref={cardRef} className="relative p-6 sm:p-10 lg:p-12">
              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.6, ease: EASE_LUXE }}
                  >
                    <AnimatedCheck />
                    <h3
                      ref={onSuccessShown}
                      tabIndex={-1}
                      className="mt-6 font-serif text-4xl leading-tight text-ivory outline-none sm:text-5xl"
                    >
                      <AccentText text={t(r.success.title).replace("{name}", firstName)} />
                    </h3>
                    <p className="mt-4 leading-relaxed text-muted">{t(r.success.text)}</p>

                    <div className="mt-8 rounded-2xl border border-gold/15 bg-ink/50 p-5 sm:p-7">
                      <p className="text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
                        {t(r.success.summaryTitle)}
                      </p>
                      <dl className="mt-4">
                        {summary.map((row, i) => (
                          <motion.div
                            key={row.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: EASE_LUXE }}
                            className="flex flex-col gap-0.5 border-b border-gold/10 py-3 last:border-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                          >
                            <dt className="text-sm text-muted">{row.label}</dt>
                            <dd className="text-ivory sm:text-right">{row.value}</dd>
                          </motion.div>
                        ))}
                      </dl>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonClasses({ className: "flex-1" })}
                      >
                        <WhatsAppIcon className="size-5" />
                        {t(r.success.whatsapp)}
                      </a>
                      <a
                        href={restaurant.contact.phoneHref}
                        className={buttonClasses({ variant: "glass", className: "flex-1" })}
                      >
                        <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
                        {t(r.success.call)}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mx-auto mt-6 flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold-light"
                    >
                      <Pencil className="size-3.5" aria-hidden="true" />
                      {t(r.success.edit)}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={onSubmit}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.6, ease: EASE_LUXE }}
                    className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-6"
                  >
                    <Field
                      id={fieldId("name")}
                      label={t(r.fields.name)}
                      error={errorText(errors.name)}
                      className="sm:col-span-3"
                    >
                      <input
                        id={fieldId("name")}
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder={t(r.fields.namePlaceholder)}
                        aria-invalid={!!errors.name}
                        aria-describedby={describedBy("name")}
                        className={inputClass(!!errors.name)}
                      />
                    </Field>

                    <Field
                      id={fieldId("phone")}
                      label={t(r.fields.phone)}
                      error={errorText(errors.phone)}
                      className="sm:col-span-3"
                    >
                      <input
                        id={fieldId("phone")}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder={t(r.fields.phonePlaceholder)}
                        aria-invalid={!!errors.phone}
                        aria-describedby={describedBy("phone")}
                        className={inputClass(!!errors.phone)}
                      />
                    </Field>

                    <Field
                      id={fieldId("date")}
                      label={t(r.fields.date)}
                      error={errorText(errors.date)}
                      className="sm:col-span-2"
                    >
                      <input
                        id={fieldId("date")}
                        type="date"
                        min={today || undefined}
                        value={form.date}
                        onChange={(e) => update("date", e.target.value)}
                        aria-invalid={!!errors.date}
                        aria-describedby={describedBy("date")}
                        className={cn(inputClass(!!errors.date), "min-h-[3.25rem] appearance-none")}
                      />
                    </Field>

                    <Field
                      id={fieldId("time")}
                      label={t(r.fields.time)}
                      error={errorText(errors.time)}
                      className="sm:col-span-2"
                    >
                      <div className="relative">
                        <select
                          id={fieldId("time")}
                          value={form.time}
                          onChange={(e) => update("time", e.target.value)}
                          aria-invalid={!!errors.time}
                          aria-describedby={describedBy("time")}
                          className={cn(
                            inputClass(!!errors.time),
                            "min-h-[3.25rem] cursor-pointer appearance-none pr-10",
                            !form.time && "text-muted/60",
                          )}
                        >
                          <option value="" disabled>
                            {t(r.fields.timePlaceholder)}
                          </option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot} className="bg-ink text-ivory">
                              {slot}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-gold/80"
                          aria-hidden="true"
                        />
                      </div>
                    </Field>

                    <div className="sm:col-span-2">
                      <span id={fieldId("guests")} className={cn(labelClass, "block")}>
                        {t(r.fields.guests)}
                      </span>
                      <div
                        role="group"
                        aria-labelledby={fieldId("guests")}
                        className="flex min-h-[3.25rem] items-center justify-between rounded-xl border border-gold/15 bg-ink/55 p-1.5"
                      >
                        <button
                          type="button"
                          onClick={() => changeGuests(-1)}
                          disabled={form.guests <= 1}
                          aria-label={t(r.decreaseGuests)}
                          className="flex size-10 items-center justify-center rounded-lg text-gold-light transition-colors hover:bg-gold/10 disabled:pointer-events-none disabled:opacity-30"
                        >
                          <Minus className="size-4" aria-hidden="true" />
                        </button>
                        <output
                          aria-live="polite"
                          className="font-serif text-lg text-ivory tabular-nums lining-nums"
                        >
                          {guestsLabel(form.guests)}
                        </output>
                        <button
                          type="button"
                          onClick={() => changeGuests(1)}
                          disabled={form.guests >= reservationSettings.maxGuests}
                          aria-label={t(r.increaseGuests)}
                          className="flex size-10 items-center justify-center rounded-lg text-gold-light transition-colors hover:bg-gold/10 disabled:pointer-events-none disabled:opacity-30"
                        >
                          <Plus className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <fieldset className="sm:col-span-6">
                      <legend className={labelClass}>
                        {t(r.fields.seating)}
                        <span className="font-normal tracking-normal text-muted normal-case">
                          ({t(r.fields.optional)})
                        </span>
                      </legend>
                      <div className="grid grid-cols-2 gap-3">
                        {seatingOptions.map((option) => {
                          const Icon = seatingIcons[option.id];
                          return (
                            <label key={option.id} className="cursor-pointer">
                              <input
                                type="radio"
                                name={fieldId("seating")}
                                value={option.id}
                                checked={form.seating === option.id}
                                onChange={() => update("seating", option.id)}
                                className="peer sr-only"
                              />
                              <span className="flex h-full items-center gap-3 rounded-xl border border-gold/15 bg-ink/55 px-3 py-3.5 text-muted transition-[border-color,background-color,color,box-shadow] duration-300 peer-checked:border-gold/70 peer-checked:bg-gold/10 peer-checked:text-gold-light peer-checked:shadow-[0_0_24px_-8px_rgb(212_175_114/0.45)] peer-focus-visible:outline-[1.5px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold hover:border-gold/35 hover:text-ivory sm:gap-4 sm:px-5">
                                <Icon
                                  className="size-5 shrink-0"
                                  strokeWidth={1.3}
                                  aria-hidden="true"
                                />
                                <span className="min-w-0">
                                  <span className="block font-serif text-base leading-tight sm:text-lg">
                                    {t(option.label)}
                                  </span>
                                  <span className="mt-0.5 hidden text-xs text-muted sm:block">
                                    {t(option.hint)}
                                  </span>
                                </span>
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    <Field
                      id={fieldId("notes")}
                      label={t(r.fields.notes)}
                      optional={t(r.fields.optional)}
                      className="sm:col-span-6"
                    >
                      <textarea
                        id={fieldId("notes")}
                        rows={3}
                        value={form.notes}
                        onChange={(e) => update("notes", e.target.value)}
                        placeholder={t(r.fields.notesPlaceholder)}
                        className={cn(inputClass(false), "resize-none")}
                      />
                    </Field>

                    <div className="pt-2 sm:col-span-6">
                      <button
                        type="submit"
                        className={buttonClasses({ className: "w-full py-[1.1rem]" })}
                      >
                        {t(r.submit)}
                        <ButtonArrow />
                      </button>
                      <p className="mt-4 text-center text-xs text-muted">{t(r.submitHint)}</p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ShimmerBorder>
        </FadeUp>
      </div>
    </section>
  );
}
