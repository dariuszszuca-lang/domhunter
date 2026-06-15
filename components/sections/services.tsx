/* Jasna, kreatywna sekcja usług — intro + zdjęcie (lewa) + rozwijany akordeon (prawa) */
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Users, Building, TrendingUp, Calculator, Handshake, Plus } from "lucide-react";
import { Container } from "@/components/ui/container";

const services = [
  { icon: Home, title: "Sprzedaż nieruchomości", body: "Profesjonalne przygotowanie oferty, dotarcie do kupujących, pełna obsługa do aktu notarialnego." },
  { icon: Users, title: "Reprezentacja kupującego", body: "Prowadzimy Cię przez proces zakupu, dbając o Twój interes na każdym etapie." },
  { icon: Building, title: "Zarządzanie najmem", body: "Zarządzamy najemcami, konserwacją i finansami, maksymalizujemy zwrot z najmu." },
  { icon: TrendingUp, title: "Strategie inwestycyjne", body: "Wskazujemy dzielnice z potencjałem wzrostu i przewidywanym zwrotem. Pomagamy wykorzystać okazje rynkowe." },
  { icon: Calculator, title: "Wycena nieruchomości", body: "Precyzyjna wycena na potrzeby sprzedaży, kupna lub inwestycji. Bezpłatnie." },
  { icon: Handshake, title: "Rozwiązania szyte na miarę", body: "Dopasowane usługi nieruchomościowe spójne z Twoimi celami i stylem życia." },
];

export function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="why-us" className="py-20 lg:py-28">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* Lewa — intro + zdjęcie (sticky) */}
          <div className="lg:sticky lg:top-10 lg:self-start">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Dlaczego my
            </p>
            <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
              Eksperckie usługi
              <br />
              <span className="italic text-brand">nieruchomościowe.</span>
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-foreground-muted lg:text-lg">
              Od wyceny po klucze. Każdą sprawę prowadzi jeden agent, który zna lokalny rynek
              Trójmiasta na pamięć.
            </p>

            <div className="relative mt-8 overflow-hidden rounded-[24px] border border-border">
              <div className="relative aspect-[5/4]">
                <Image
                  src="/images/who-we-are.jpg"
                  alt="Zespół Dom Hunter — biuro nieruchomości w Trójmieście"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-foreground/60 to-transparent"
              />
              <p className="absolute bottom-4 left-5 right-5 font-display text-lg leading-tight text-white">
                Zespół, który zna Trójmiasto na pamięć.
              </p>
            </div>
          </div>

          {/* Prawa — rozwijany akordeon usług */}
          <div className="border-t border-border">
            {services.map((s, i) => {
              const Icon = s.icon;
              const isOpen = open === i;
              return (
                <div key={s.title} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center gap-4 py-6 text-left lg:gap-5 lg:py-7"
                  >
                    <span className="w-6 shrink-0 font-mono text-xs text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 ${
                        isOpen ? "bg-brand text-white" : "bg-brand/10 text-brand"
                      }`}
                    >
                      <Icon className="size-5" strokeWidth={1.7} />
                    </span>
                    <span
                      className={`flex-1 font-display text-[1.4rem] font-normal leading-[1.15] transition-colors lg:text-[1.7rem] ${
                        isOpen ? "text-brand" : "text-foreground group-hover:text-brand"
                      }`}
                    >
                      {s.title}
                    </span>
                    <span
                      className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-brand bg-brand text-white"
                          : "border-border bg-surface text-foreground group-hover:border-brand"
                      }`}
                    >
                      <Plus className="size-3.5" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pl-[3.75rem] pr-6 text-base leading-relaxed text-foreground-muted">
                          {s.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
