/* Hallmark redesign · editorial row-list (był: 3-col icon-tile grid)
 * nagłówki Marcellus, ikona inline, asymetria, jeden reveal */
"use client";

import { motion } from "framer-motion";
import {
  Home,
  Users,
  Building,
  TrendingUp,
  Calculator,
  Handshake,
} from "lucide-react";
import { Container } from "@/components/ui/container";

const services = [
  { icon: Home, title: "Sprzedaż nieruchomości", body: "Profesjonalne przygotowanie oferty, dotarcie do kupujących, pełna obsługa do aktu notarialnego." },
  { icon: Users, title: "Reprezentacja kupującego", body: "Prowadzimy Cię przez proces zakupu, dbając o Twój interes na każdym etapie." },
  { icon: Building, title: "Zarządzanie najmem", body: "Zarządzamy najemcami, konserwacją i finansami, maksymalizujemy zwrot z najmu." },
  { icon: TrendingUp, title: "Strategie inwestycyjne", body: "Pomagamy wykorzystać okazje rynkowe. Wskazujemy dzielnice z potencjałem wzrostu i przewidywanym zwrotem." },
  { icon: Calculator, title: "Wycena nieruchomości", body: "Precyzyjna wycena na potrzeby sprzedaży, kupna lub inwestycji. Bezpłatnie." },
  { icon: Handshake, title: "Rozwiązania szyte na miarę", body: "Dopasowane usługi nieruchomościowe spójne z Twoimi celami i stylem życia." },
];

export function Services() {
  return (
    <section id="why-us" className="py-16 lg:py-28">
      <Container size="wide" className="max-w-[1360px]">
        {/* Nagłówek — bias w lewo, Marcellus */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-3xl lg:mb-16"
        >
          <span className="text-sm font-semibold tracking-wide text-brand">
            Dlaczego my
          </span>
          <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.8rem)] leading-[1.04] text-foreground">
            Eksperckie usługi nieruchomościowe w&nbsp;Trójmieście
          </h2>
        </motion.div>

        {/* Lista usług — rzędy z hairline, asymetryczne kolumny */}
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
                className="group grid grid-cols-1 gap-2 border-b border-border py-7 md:grid-cols-12 md:gap-8 lg:py-9"
              >
                {/* Lewa kolumna: ikona inline + nagłówek Marcellus */}
                <div className="md:col-span-5 flex items-start gap-4">
                  <span className="mt-1 inline-flex shrink-0 items-center justify-center text-brand transition-transform duration-300 group-hover:translate-x-0.5">
                    <Icon className="size-7" strokeWidth={1.6} />
                  </span>
                  <h3 className="font-display text-[1.6rem] leading-[1.1] text-foreground lg:text-[2rem]">
                    {s.title}
                  </h3>
                </div>
                {/* Prawa kolumna: opis */}
                <div className="md:col-span-7 md:pl-8 md:border-l md:border-border/60">
                  <p className="max-w-xl text-base leading-relaxed text-foreground-muted lg:text-lg">
                    {s.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
