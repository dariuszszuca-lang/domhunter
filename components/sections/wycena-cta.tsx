/* Jasna, kreatywna sekcja darmowej wyceny — opis + proces w krokach + co dostajesz + formularz */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Check,
  Phone,
  ClipboardList,
  MapPinHouse,
  FileText,
  Clock,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Container } from "@/components/ui/container";

const PHONE_HREF = "tel:+48571309209";
const PHONE_DISPLAY = "571 309 209";

const steps = [
  {
    icon: ClipboardList,
    title: "Zgłoszenie",
    body: "Zostawiasz adres, metraż i numer telefonu. Zajmuje to minutę, niczego nie podpisujesz.",
  },
  {
    icon: MapPinHouse,
    title: "Analiza i oględziny",
    body: "Sprawdzamy ostatnie transakcje w okolicy, stan techniczny i lokalny popyt. W razie potrzeby umawiamy oględziny.",
  },
  {
    icon: FileText,
    title: "Raport z ceną",
    body: "Dostajesz orientacyjną wartość rynkową wraz z uzasadnieniem i wskazówkami, co realnie podnosi cenę.",
  },
];

const benefits = [
  {
    icon: Wallet,
    title: "Orientacyjna wartość rynkowa",
    body: "Widełki cenowe oparte na faktycznych transakcjach w Twojej dzielnicy, a nie na życzeniowym oszacowaniu.",
  },
  {
    icon: FileText,
    title: "Uzasadnienie ceny",
    body: "Tłumaczymy, skąd taka wartość: co podbija cenę, a co ją obniża i jak to wygląda na tle okolicy.",
  },
  {
    icon: Phone,
    title: "Doradztwo bez zobowiązań",
    body: "Rozmowa z agentem, który zna Trójmiasto. Podpowiemy następny krok, nawet jeśli nie zdecydujesz się na sprzedaż.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export function WycenaCta() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSending(false);
  }

  return (
    <section className="bg-surface-cream py-20 lg:py-28">
      <Container size="wide">
        {/* Nagłówek + opis */}
        <motion.div {...fadeUp} className="max-w-3xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Zgłoś nieruchomość
          </p>
          <h2 className="font-display font-normal text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.04] tracking-[-0.01em] text-foreground">
            Masz nieruchomość na sprzedaż?
            <br />
            <span className="italic text-brand">Zgłoś ją nam.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
            Zgłoś swoje mieszkanie, dom albo działkę, a my zajmiemy się resztą. Zaczynamy od
            bezpłatnej wyceny opartej na realnych transakcjach w okolicy, przygotowujemy ofertę
            i prowadzimy całą sprzedaż, od pierwszego kontaktu aż po akt notarialny. Bez kosztów
            na starcie i bez zobowiązań.
          </p>
        </motion.div>

        {/* Pasek wyróżników: 0 zł / 24h / bez zobowiązań */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="mt-10 grid gap-4 sm:grid-cols-3"
        >
          <Highlight
            icon={Wallet}
            big="0 zł"
            label="Wycena bezpłatna, płacisz dopiero przy sprzedaży."
          />
          <Highlight
            icon={Clock}
            big="24 h"
            label="Tyle zajmuje nam odezwanie się z pierwszą wyceną."
          />
          <Highlight
            icon={ShieldCheck}
            big="0"
            label="Zero zobowiązań. Wycena Cię do niczego nie zmusza."
          />
        </motion.div>

        {/* Proces w krokach */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-16 lg:mt-20"
        >
          <h3 className="font-display text-2xl font-normal text-foreground lg:text-3xl">
            Jak to wygląda <span className="italic text-brand">krok po kroku.</span>
          </h3>

          <div className="relative mt-8 grid gap-6 md:grid-cols-3">
            {/* Linia łącząca kroki (desktop) */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-brand/30 via-brand/30 to-transparent md:block"
            />
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="relative rounded-[24px] border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_50px_-30px] hover:shadow-brand/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand text-white">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>
                    <span className="font-display text-5xl italic leading-none text-brand/15">
                      {i + 1}
                    </span>
                  </div>
                  <h4 className="mt-5 font-display text-xl font-normal text-foreground">
                    {s.title}
                  </h4>
                  <p className="mt-2 text-[0.97rem] leading-relaxed text-foreground-muted">
                    {s.body}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Co dostajesz + formularz */}
        <div className="mt-16 grid gap-8 lg:mt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Lewa — co dostajesz */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }}>
            <h3 className="font-display text-2xl font-normal text-foreground lg:text-3xl">
              Co dostajesz <span className="italic text-brand">w raporcie.</span>
            </h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-foreground-muted">
              Krótki, czytelny dokument plus rozmowa z agentem. Odpowiadamy w ciągu 24 godzin.
            </p>

            <ul className="mt-7 space-y-4">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <li
                    key={b.title}
                    className="flex gap-4 rounded-[20px] border border-border bg-surface p-5"
                  >
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="font-display text-lg font-normal text-foreground">{b.title}</p>
                      <p className="mt-1 text-[0.95rem] leading-relaxed text-foreground-muted">
                        {b.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Telefon do bezpośredniego kontaktu */}
            <div className="mt-7 flex flex-col gap-4 rounded-[20px] bg-surface-blush p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Wolisz porozmawiać od razu?</p>
                <p className="mt-1 font-display text-xl text-foreground">
                  Zadzwoń, pomożemy bez czekania.
                </p>
              </div>
              <a
                href={PHONE_HREF}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-brand bg-surface px-6 py-3.5 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white"
              >
                <Phone className="size-4" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>

          {/* Prawa — formularz */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <div className="rounded-[24px] border border-border bg-surface p-7 shadow-[0_30px_70px_-50px] shadow-brand/40 lg:p-9 lg:sticky lg:top-10">
              {submitted ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <span className="mb-5 inline-flex size-14 items-center justify-center rounded-full bg-brand text-white">
                    <Check className="size-6" strokeWidth={2.5} />
                  </span>
                  <h3 className="mb-2 font-display text-2xl text-foreground">Dziękujemy</h3>
                  <p className="text-foreground-muted">
                    Odezwiemy się w ciągu 24 godzin i omówimy szczegóły.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                      Bezpłatnie
                    </span>
                    <p className="text-sm text-foreground-muted">Zgłoś nieruchomość w minutę.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <Field
                      label="Adres nieruchomości"
                      name="adres"
                      required
                      placeholder="np. ul. Wajdeloty 12, Gdańsk Wrzeszcz"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Metraż (m²)" name="metraz" type="number" required placeholder="65" />
                      <Field label="Pokoje" name="pokoje" type="number" required placeholder="3" />
                    </div>
                    <Field label="Telefon" name="telefon" type="tel" required placeholder="571 309 209" />

                    <button
                      type="submit"
                      disabled={sending}
                      className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand text-sm font-semibold text-white transition hover:bg-brand-hover disabled:opacity-60"
                    >
                      {sending ? (
                        "Wysyłanie..."
                      ) : (
                        <>
                          <Send className="size-4" />
                          Zgłoś nieruchomość
                        </>
                      )}
                    </button>
                    <p className="text-xs leading-relaxed text-foreground-subtle">
                      Wysyłając, zgadzasz się na kontakt telefoniczny w celu omówienia zgłoszenia.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function Highlight({
  icon: Icon,
  big,
  label,
}: {
  icon: typeof Wallet;
  big: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[20px] border border-border bg-surface p-5">
      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        <Icon className="size-5" strokeWidth={1.8} />
      </span>
      <div>
        <p className="font-display text-2xl leading-none text-foreground">{big}</p>
        <p className="mt-1.5 text-sm leading-snug text-foreground-muted">{label}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-subtle"
      >
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-11 rounded-xl border border-border bg-background px-4 text-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15"
      />
    </div>
  );
}
