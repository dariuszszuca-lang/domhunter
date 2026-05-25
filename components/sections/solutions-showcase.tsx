"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Building, Building2 } from "lucide-react";
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

  return (
    <section className="pb-24 pt-16 lg:pb-32 lg:pt-20">
      <Container size="wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12 lg:mb-16"
        >
          <div className="mb-5 inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-normal text-foreground">
            Oferta
          </div>
          <h2 className="font-sans font-bold uppercase text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.02] tracking-normal text-foreground">
            Co dla Ciebie zrobimy
          </h2>
          <p className="mt-5 max-w-xl text-base lg:text-lg text-foreground-muted leading-[1.55]">
            Trzy obszary, w&nbsp;których pomagamy klientom w&nbsp;Trójmieście.
          </p>
        </motion.div>

        {/* Showcase: duży obraz + vertical tabs po prawej */}
        <div className="relative grid grid-cols-12 gap-4 lg:gap-6">
          {/* Obraz (col 10) */}
          <div className="col-span-12 lg:col-span-10 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.image}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-surface-muted lg:aspect-[16/9] lg:rounded-[36px]"
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  sizes="(min-width: 1024px) 75vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Active number badge - bottom-right na obrazie (vista style) */}
            <div className="absolute bottom-0 right-0 hidden sm:block">
              {/* Cutout top */}
              <div className="absolute -top-5 right-0 w-5 h-5 pointer-events-none">
                <svg viewBox="0 0 20 20" className="w-full h-full">
                  <path d="M20 20L0 20C11.0457 20 20 11.0457 20 0L20 20Z" fill="var(--color-background)" />
                </svg>
              </div>
              {/* Cutout left */}
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
                  className="flex items-baseline gap-3 rounded-tl-[28px] bg-background px-6 py-5"
                >
                  <span className="font-sans font-bold text-3xl lg:text-4xl tabular-nums leading-none text-foreground">
                    {current.num}
                  </span>
                  <span className="font-sans font-semibold text-sm lg:text-base text-foreground">
                    {current.title}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Tabs (col 2) — aktywny prostokąt + nieaktywne rotated vertical labels */}
          <div className="col-span-12 lg:col-span-2 flex lg:flex-col gap-2 lg:gap-3">
            {solutions.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={s.label}
                  className={`group relative flex-1 lg:flex-none transition-all ${
                    isActive
                      ? "bg-foreground text-white rounded-2xl lg:rounded-2xl lg:aspect-square"
                      : "border-l border-border lg:rounded-none lg:bg-transparent lg:flex-1"
                  }`}
                >
                  {isActive ? (
                    // Active: poziomy układ z numerem + labelem
                    <div className="flex items-center justify-between gap-3 p-5 lg:p-6 h-full">
                      <span className="font-sans font-bold text-3xl lg:text-4xl tabular-nums leading-none">
                        {s.num}
                      </span>
                      <span className="text-right text-[10px] font-semibold uppercase tracking-normal lg:text-xs">
                        {s.label}
                      </span>
                    </div>
                  ) : (
                    // Inactive: numer góra + label vertical (rotated)
                    <div className="flex items-center justify-center lg:items-start lg:justify-center gap-2 p-3 lg:p-4 h-full hover:bg-surface-muted/50 transition-colors">
                      {/* Mobile: poziom */}
                      <div className="flex items-center gap-2 lg:hidden">
                        <span className="font-sans font-bold text-2xl tabular-nums leading-none text-foreground-subtle">
                          {s.num}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-normal text-foreground-subtle">
                          {s.label}
                        </span>
                      </div>
                      {/* Desktop: vertical rotated */}
                      <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-4 lg:h-full lg:py-4">
                        <span className="font-sans font-bold text-3xl tabular-nums leading-none text-foreground-subtle group-hover:text-foreground transition-colors">
                          {s.num}
                        </span>
                        <span
                          className="text-[11px] font-semibold uppercase tracking-normal text-foreground-subtle transition-colors group-hover:text-foreground"
                          style={{
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                          }}
                        >
                          {s.label}
                        </span>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Opis aktywnego — pod obrazem, full width 2-col grid */}
        <div className="mt-10 lg:mt-12 grid lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-2 lg:pl-2">
            <current.icon className="size-9 text-foreground" strokeWidth={1.5} />
          </div>
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.num + "-desc"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="mb-4 font-sans text-2xl font-bold tracking-normal text-foreground lg:text-3xl">
                  {current.title}
                </h3>
                <p
                  className="text-foreground-muted leading-relaxed text-base lg:text-lg"
                  dangerouslySetInnerHTML={{ __html: current.body }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
