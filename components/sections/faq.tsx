"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

const faqs = [
  {
    q: "Czy obsługujecie tylko Gdańsk, czy całe Trójmiasto?",
    a: "Pracujemy w całym Trójmieście i okolicach: Gdańsk, Gdynia, Sopot, Rumia, Reda, Wejherowo. Biuro mamy w Gdańsku, ale na pokazy jeździmy wszędzie.",
  },
  {
    q: "Jak długo trwa sprzedaż mieszkania?",
    a: "Średnio 4-6 tygodni od podpisania umowy z nami do aktu notarialnego. Czas zależy od ceny rynkowej, stanu mieszkania i lokalizacji. Wycena na początku ustala realny harmonogram.",
  },
  {
    q: "Co to są oferty off-market?",
    a: "Oferty, których nie ma na portalach jak Otodom czy Morizon. Sprzedający z różnych powodów chcą dyskrecji i sprzedają w gronie znanych pośredników. Mamy do nich dostęp przez sieć NSL (2000+ agentów w Polsce).",
  },
  {
    q: "Czy darmowa wycena rzeczywiście jest darmowa?",
    a: "Tak. Nie pobieramy opłat za wycenę. Opieramy ją na faktach: porównujemy ostatnie transakcje w dzielnicy, sprawdzamy stan techniczny i lokalny popyt. Bez zobowiązań do dalszej współpracy.",
  },
  {
    q: "Jaką prowizję pobieracie?",
    a: "Prowizja zależy od typu transakcji i wartości nieruchomości. Wszystko ustalamy na pierwszym spotkaniu i spisujemy w umowie. Bez ukrytych kosztów.",
  },
  {
    q: "Pomagacie z kredytem hipotecznym?",
    a: "Tak. Współpracujemy z niezależnymi doradcami kredytowymi. Sprawdzimy Twoją zdolność i porównamy oferty banków. Doradca jest opłacany przez bank, dla Ciebie bezpłatny.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Lewa — intro sticky */}
          <div className="lg:sticky lg:top-10 lg:self-start">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Pomoc
            </p>
            <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
              Najczęstsze
              <br />
              <span className="italic text-brand">pytania.</span>
            </h2>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-foreground-muted">
              Nie znalazłeś odpowiedzi? Zadzwoń, oddzwonimy w 30 minut w godzinach pracy.
            </p>
            <a
              href={siteConfig.contact.phones[0].href}
              className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              <Phone className="size-4" />
              {siteConfig.contact.phones[0].displayValue}
            </a>
          </div>

          {/* Prawa — akordeon */}
          <div>
            {faqs.map((f, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={f.q} className="border-b border-border first:border-t">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="group flex w-full items-start gap-4 py-6 text-left lg:gap-5 lg:py-7"
                  >
                    <span className="w-6 shrink-0 pt-2 font-mono text-xs text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 font-display text-[1.3rem] font-normal leading-[1.2] transition-colors lg:text-[1.55rem] ${
                        isOpen ? "text-brand" : "text-foreground group-hover:text-brand"
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      className={`mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-brand bg-brand text-white"
                          : "border-border bg-surface text-foreground group-hover:border-brand"
                      }`}
                    >
                      <Plus className="size-4" />
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
                        <p className="pb-7 pl-10 pr-10 text-base leading-relaxed text-foreground-muted lg:pl-11">
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
      </Container>
    </section>
  );
}
