/* Premium ciemna sekcja usług — editorial row-list na ink, serif + magenta */
"use client";

import { motion } from "framer-motion";
import { Home, Users, Building, TrendingUp, Calculator, Handshake } from "lucide-react";
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
    <section id="why-us" className="bg-foreground text-foreground-on-dark py-24 lg:py-32">
      <Container size="wide" className="max-w-[1360px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-3xl lg:mb-20"
        >
          <span className="text-sm font-semibold tracking-wide text-brand-soft">Dlaczego my</span>
          <h2 className="mt-4 font-display font-normal text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.04] text-foreground-on-dark">
            Eksperckie usługi nieruchomościowe w&nbsp;Trójmieście
          </h2>
        </motion.div>

        <div className="border-t border-white/12">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group grid grid-cols-1 gap-3 border-b border-white/12 py-7 md:grid-cols-12 md:items-center md:gap-8 lg:py-9"
              >
                <div className="md:col-span-1">
                  <span className="font-mono text-sm text-brand-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-5 flex items-start gap-4">
                  <span className="mt-1 inline-flex shrink-0 items-center justify-center text-brand-soft transition-transform duration-300 group-hover:translate-x-0.5">
                    <Icon className="size-7" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display font-normal text-[1.7rem] leading-[1.1] text-foreground-on-dark transition-colors duration-300 group-hover:text-brand-soft lg:text-[2.05rem]">
                    {s.title}
                  </h3>
                </div>
                <div className="md:col-span-6 md:border-l md:border-white/12 md:pl-8">
                  <p className="max-w-xl text-base leading-relaxed text-foreground-on-dark-muted lg:text-lg">
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
