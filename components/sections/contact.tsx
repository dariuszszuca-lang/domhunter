"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, PenLine } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Contact() {
  return (
    <section className="bg-surface-cream py-24 lg:py-32">
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Kontakt
          </p>
          <h2 className="font-display font-normal text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.03] tracking-[-0.01em] text-foreground">
            Zadzwoń lub <span className="italic text-brand">napisz.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-[1.55] text-foreground-muted">
            Najprościej, jak się da. Odezwij się, a resztą zajmiemy się my.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="tel:+48571309209"
              className="group inline-flex items-center gap-2.5 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-white shadow-[0_16px_34px_-14px] shadow-brand/60 transition-all hover:-translate-y-0.5"
            >
              <Phone className="size-4" />
              Zadzwoń
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2.5 rounded-full border border-border-strong px-7 py-4 text-sm font-semibold text-foreground transition-all hover:border-brand hover:text-brand"
            >
              <PenLine className="size-4" />
              Napisz
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
