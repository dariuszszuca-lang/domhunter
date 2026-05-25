"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Home, Building, Building2 } from "lucide-react";
import { Container } from "@/components/ui/container";

const solutions = [
  {
    num: "01",
    label: "Mieszkania",
    icon: Home,
    title: "Mieszkania",
    body: "Sprzedaż i&nbsp;kupno mieszkań w&nbsp;Trójmieście. Apartamenty, lokale w&nbsp;kamienicach, mieszkania w&nbsp;nowych inwestycjach. Pomagamy też w&nbsp;wynajmie.",
    image: "/images/hero-luxury-3.jpg",
  },
  {
    num: "02",
    label: "Domy i działki",
    icon: Building2,
    title: "Domy i działki",
    body: "Domy jednorodzinne i&nbsp;działki budowlane w&nbsp;Gdańsku i&nbsp;okolicach. Zarówno na sprzedaż, jak i&nbsp;na wynajem długoterminowy.",
    image: "/images/hero-luxury-2.jpg",
  },
  {
    num: "03",
    label: "Komercja",
    icon: Building,
    title: "Komercja",
    body: "Biura, lokale handlowe, magazyny i&nbsp;pensjonaty. Dedykowany agent dla każdego segmentu, znajomość lokalnego rynku.",
    image: "/images/hero-luxury-1.jpg",
  },
];

export function SolutionsShowcase() {
  const [active, setActive] = useState(0);
  const current = solutions[active];
  const inactive = solutions.filter((_, i) => i !== active);

  return (
    <section id="service" className="pb-20 pt-16 lg:pb-28 lg:pt-20">
      <Container size="wide" className="max-w-[1360px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <div className="mb-5 inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-normal text-foreground">
            Co oferujemy
          </div>
          <h2 className="font-sans font-bold uppercase text-[clamp(1.75rem,3.5vw,3.05rem)] leading-[1.04] tracking-normal text-foreground">
            Kompleksowe rozwiązania dla nieruchomości
          </h2>
          <p className="mt-5 max-w-xl text-base lg:text-lg text-foreground-muted leading-[1.55]">
            Pomagamy przy sprzedaży, zakupie, wynajmie i&nbsp;nieruchomościach komercyjnych w&nbsp;Trójmieście.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[0.8fr_1.5fr_0.7fr] lg:items-end lg:gap-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${current.num}-copy`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 lg:order-1 lg:pb-2"
            >
              <div className="mb-5 inline-flex size-14 items-center justify-center text-foreground">
                <current.icon className="size-12" strokeWidth={1.6} />
              </div>
              <h3 className="mb-5 font-sans text-2xl font-bold tracking-normal text-foreground lg:text-3xl">
                {current.title}
              </h3>
              <p
                className="max-w-md text-base leading-relaxed text-foreground-muted lg:text-lg"
                dangerouslySetInnerHTML={{ __html: current.body }}
              />
            </motion.div>
          </AnimatePresence>

          <div className="relative order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.image}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[1.2/1] overflow-hidden rounded-[28px] bg-surface-muted sm:aspect-[16/10] lg:aspect-[1.42/1] lg:rounded-[32px]"
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 right-0 hidden sm:block">
              <div className="absolute -top-5 right-0 w-5 h-5 pointer-events-none">
                <svg viewBox="0 0 20 20" className="w-full h-full">
                  <path d="M20 20L0 20C11.0457 20 20 11.0457 20 0L20 20Z" fill="var(--color-background)" />
                </svg>
              </div>
              <div className="absolute bottom-0 -left-5 w-5 h-5 pointer-events-none">
                <svg viewBox="0 0 20 20" className="w-full h-full">
                  <path d="M0 0L20 0C8.95431 0 0 8.95431 0 20L0 0Z" fill="var(--color-background)" />
                </svg>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.num}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex min-w-[250px] items-end gap-3 rounded-tl-[32px] bg-background px-7 py-5"
                >
                  <span className="font-sans text-5xl font-normal leading-none text-foreground tabular-nums">
                    {current.num}
                  </span>
                  <span className="pb-1 font-sans text-base font-bold leading-tight text-foreground">
                    {current.title}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="order-3 flex gap-2 lg:hidden">
            {solutions.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`min-h-14 flex-1 rounded-2xl border px-3 text-left transition-colors ${
                    isActive ? "border-foreground bg-foreground text-background" : "border-border bg-surface text-foreground"
                  }`}
                >
                  <span className="block text-lg font-semibold tabular-nums">{s.num}</span>
                  <span className="block text-xs font-semibold uppercase leading-tight">{s.label}</span>
                </button>
              );
            })}
          </div>

          <div className="order-3 hidden h-full min-h-[500px] grid-cols-2 lg:grid">
            {inactive.map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setActive(solutions.findIndex((item) => item.num === s.num))}
                className="group relative flex h-full flex-col items-center justify-between border-l border-border px-7 py-2 text-foreground-subtle transition-colors hover:text-foreground last:border-r"
                aria-label={`Pokaż: ${s.label}`}
              >
                <ArrowLeft className="mt-1 size-7 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
                <span
                  className="text-3xl font-bold uppercase tracking-normal text-current"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {s.label}
                </span>
                <span className="font-sans text-5xl font-normal leading-none text-current tabular-nums">
                  {s.num}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
