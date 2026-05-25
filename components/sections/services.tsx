"use client";

import Link from "next/link";
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
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-surface-muted border border-border text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">
            Co robimy
          </div>
          <h2 className="font-sans font-bold uppercase text-[clamp(1.75rem,3.8vw,3rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
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
                className="p-7 lg:p-9 rounded-3xl bg-surface-muted hover:bg-brand-light transition-colors duration-500"
              >
                <span className="inline-flex items-center justify-center size-14 rounded-full bg-white text-foreground mb-7">
                  <Icon className="size-5" strokeWidth={1.8} />
                </span>
                <h3 className="font-sans font-bold text-xl lg:text-2xl tracking-[-0.015em] text-foreground mb-3">
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
