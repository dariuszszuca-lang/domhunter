"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Container } from "@/components/ui/container";

const faqs = [
  {
    q: "Czy obsługujecie tylko Gdańsk, czy całe Trójmiasto?",
    a: "Pracujemy w całym Trójmieście i okolicach — Gdańsk, Gdynia, Sopot, Rumia, Reda, Wejherowo. Biuro mamy w Gdańsku, ale na pokazy jeździmy wszędzie.",
  },
  {
    q: "Jak długo trwa sprzedaż mieszkania?",
    a: "Średnio 4-6 tygodni od podpisania umowy z nami do aktu notarialnego. Czas zależy od ceny rynkowej, stanu mieszkania i lokalizacji. Wycena na początku ustala realny harmonogram.",
  },
  {
    q: "Co to są oferty off-market?",
    a: "Oferty, których nie ma na portalach jak Otodom czy Morizon. Sprzedający z różnych powodów nie chcą publicznej publikacji — chcą dyskrecji, sprzedają w gronie znanych pośredników. Mamy do nich dostęp przez sieć NSL (1600+ agentów w Polsce).",
  },
  {
    q: "Czy darmowa wycena rzeczywiście jest darmowa?",
    a: "Tak. Nie pobieramy opłat za wycenę. Wycena jest oparta na faktach — porównujemy ostatnie transakcje w dzielnicy, sprawdzamy stan techniczny i lokalny popyt. Bez zobowiązań do dalszej współpracy.",
  },
  {
    q: "Jaką prowizję pobieracie?",
    a: "Prowizja zależy od typu transakcji i wartości nieruchomości. Wszystko ustalamy na pierwszym spotkaniu, spisujemy w umowie. Bez ukrytych kosztów.",
  },
  {
    q: "Pomagacie z kredytem hipotecznym?",
    a: "Tak. Współpracujemy z niezależnymi pośrednikami kredytowymi. Sprawdzimy Twoją zdolność kredytową, porównamy oferty banków. Pośrednik opłacany przez bank, dla Ciebie bezpłatny.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32">
      <Container size="wide">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-surface-muted border border-border text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">
              Pomoc
            </div>
            <h2 className="font-sans font-bold uppercase text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
              Najczęstsze pytania
            </h2>
            <p className="mt-7 text-foreground-muted leading-relaxed max-w-md">
              Nie znalazłeś odpowiedzi? Zadzwoń, odpowiemy w&nbsp;30 minut w&nbsp;godzinach pracy biura.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-border border-y border-border">
              {faqs.map((f, i) => {
                const isOpen = openIdx === i;
                return (
                  <div key={f.q}>
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-6 py-6 lg:py-7 text-left group"
                    >
                      <span className="font-sans font-semibold text-lg lg:text-xl text-foreground group-hover:text-brand transition-colors">
                        {f.q}
                      </span>
                      <span
                        className={`shrink-0 inline-flex items-center justify-center size-9 rounded-full border border-border transition-all ${
                          isOpen ? "bg-brand border-brand text-white" : "bg-surface text-foreground"
                        }`}
                      >
                        {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
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
                          <p className="pb-6 lg:pb-7 pr-12 text-base text-foreground-muted leading-relaxed">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
