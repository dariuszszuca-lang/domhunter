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
    <section className="py-24 lg:py-32">
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 lg:mb-20"
        >
          <div className="mb-5 inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-normal text-foreground">
            Co robimy
          </div>
          <h2 className="font-sans font-bold uppercase text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.02] tracking-normal text-foreground">
            Pełen zakres usług
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-[28px] border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-card lg:p-9"
              >
                <span className="mb-7 inline-flex size-14 items-center justify-center rounded-full bg-surface-muted text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                  <Icon className="size-5" strokeWidth={1.8} />
                </span>
                <h3 className="mb-3 font-sans text-xl font-bold tracking-normal text-foreground lg:text-2xl">
                  {s.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed">{s.body}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
