"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, TreePine, Home } from "lucide-react";
import { Container } from "@/components/ui/container";

const solutions = [
  {
    num: "01",
    label: "Luksusowe rezydencje",
    icon: Building2,
    title: "Luksusowe rezydencje",
    body: "Apartamenty premium w sercu Trójmiasta — Oliwa, Stare Miasto, Sopot. Architektura z duszą, najwyższy standard wykończenia, prestiżowe adresy.",
    image: "/images/hero-luxury-3.jpg",
  },
  {
    num: "02",
    label: "Domy z naturą",
    icon: TreePine,
    title: "Domy z naturą",
    body: "Domy jednorodzinne i rezydencje pod miastem — Kowale, Banino, Kąpino. Z ogrodem, ciszą i&nbsp;dostępem do natury.",
    image: "/images/hero-luxury-2.jpg",
  },
  {
    num: "03",
    label: "Apartamenty wakacyjne",
    icon: Home,
    title: "Apartamenty wakacyjne",
    body: "Inwestycje pod wynajem krótkoterminowy — Sopot, Jelitkowo, Brzeźno. Z analizą opłacalności i&nbsp;przewidywanym zwrotem.",
    image: "/images/hero-luxury-1.jpg",
  },
];

export function SolutionsShowcase() {
  const [active, setActive] = useState(0);
  const current = solutions[active];

  return (
    <section className="py-24 lg:py-32">
      <Container size="wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-surface-muted border border-border text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">
            Oferta
          </div>
          <h2 className="font-sans font-bold uppercase text-[clamp(1.75rem,3.8vw,3rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
            Co dla Ciebie zrobimy
          </h2>
          <p className="mt-6 max-w-xl text-base lg:text-lg text-foreground-muted leading-[1.55]">
            Luksusowe rezydencje, domy z&nbsp;naturą i&nbsp;apartamenty pod wynajem. Każdy obszar ma dedykowany zespół.
          </p>
        </motion.div>

        {/* Showcase grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Lewa — opis aktualnego */}
          <div className="lg:col-span-3 flex flex-col justify-end order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <current.icon className="size-9 text-foreground mb-5" strokeWidth={1.5} />
                <h3 className="font-sans font-bold text-2xl lg:text-3xl tracking-tight text-foreground mb-4">
                  {current.title}
                </h3>
                <p
                  className="text-foreground-muted leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: current.body }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Środek — duże zdjęcie aktualnego */}
          <div className="lg:col-span-7 relative order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.image}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[5/4] rounded-3xl overflow-hidden bg-surface-muted"
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Active number badge - bottom right of image */}
            <div className="absolute -bottom-px -right-px bg-background rounded-tl-3xl px-6 pt-6">
              <div className="rounded-2xl bg-background px-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-sans font-bold text-4xl lg:text-5xl tabular-nums leading-none text-foreground">
                    {current.num}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">{current.label}</p>
              </div>
            </div>
          </div>

          {/* Prawa — tabs nawigacyjne */}
          <div className="lg:col-span-2 flex lg:flex-col gap-2 lg:gap-4 order-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {solutions.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group flex-shrink-0 lg:flex-1 flex items-start gap-3 lg:gap-4 p-4 lg:p-5 rounded-2xl text-left border transition-all min-w-[200px] ${
                    isActive
                      ? "bg-foreground text-background border-foreground"
                      : "bg-surface border-border hover:border-foreground"
                  }`}
                >
                  <span className={`font-sans font-bold text-2xl lg:text-3xl tabular-nums leading-none shrink-0 ${isActive ? "text-white" : "text-foreground-subtle"}`}>
                    {s.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isActive ? "text-white/80" : "text-foreground-muted"}`}>
                      {s.label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
