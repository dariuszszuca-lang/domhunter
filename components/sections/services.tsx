/* Jasna, spójna sekcja usług — editorial lista (intro + rzędy), serif + magenta */
"use client";

import { motion } from "framer-motion";
import { Home, Users, Building, TrendingUp, Calculator, Handshake } from "lucide-react";
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
  return (
    <section id="why-us" className="py-20 lg:py-28">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Lewa kolumna — intro (sticky) */}
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
          </div>

          {/* Prawa kolumna — lista usług */}
          <div className="border-t border-border">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex gap-5 border-b border-border py-7 lg:gap-6 lg:py-8"
                >
                  <span className="w-6 shrink-0 pt-1.5 font-mono text-xs text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="shrink-0 pt-1 text-brand transition-transform duration-300 group-hover:translate-x-0.5">
                    <Icon className="size-6" strokeWidth={1.6} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[1.5rem] font-normal leading-[1.15] text-foreground transition-colors duration-300 group-hover:text-brand lg:text-[1.7rem]">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-base leading-relaxed text-foreground-muted">
                      {s.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
