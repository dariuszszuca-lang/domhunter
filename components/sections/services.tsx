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
    <section id="why-us" className="py-20 lg:py-28">
      <Container size="full" className="max-w-[1680px] lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-14 max-w-4xl text-center lg:mb-20"
        >
          <div className="mb-5 inline-flex items-center rounded-full border border-border bg-surface px-5 py-1.5 text-base font-medium tracking-normal text-foreground">
            Dlaczego my
          </div>
          <h2 className="font-sans font-bold uppercase text-[clamp(2rem,4.1vw,3.45rem)] leading-[1.05] tracking-normal text-foreground">
            Eksperckie usługi nieruchomościowe w&nbsp;Trójmieście
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group min-h-[310px] rounded-[34px] bg-[#F0F0F0] p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-surface-muted lg:min-h-[330px] lg:p-12"
              >
                <span className="mb-20 inline-flex size-16 items-center justify-center rounded-full bg-white text-foreground transition-colors group-hover:bg-foreground group-hover:text-background lg:mb-24">
                  <Icon className="size-8" strokeWidth={1.8} />
                </span>
                <h3 className="mb-4 font-sans text-2xl font-bold tracking-normal text-foreground lg:text-3xl">
                  {s.title}
                </h3>
                <p className="max-w-md text-lg leading-snug text-foreground-muted lg:text-xl">{s.body}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
