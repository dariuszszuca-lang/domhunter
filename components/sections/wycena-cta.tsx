"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";

export function WycenaCta() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSending(false);
  }

  return (
    <section className="py-24 lg:py-32">
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-foreground via-foreground to-brand-deep text-background"
        >
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-brand-soft/30 blur-[100px]"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"
          />

          <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-16 p-8 lg:p-16">
            {/* Lewa — copy */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-[11px] font-semibold uppercase tracking-[0.18em] text-white mb-7">
                <Sparkles className="size-3.5" />
                Darmowa wycena
              </div>
              <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]">
                Sprawdź, ile warta jest
                <br />
                <span className="italic opacity-80">Twoja nieruchomość.</span>
              </h2>
              <p className="mt-7 text-lg text-white/75 leading-[1.55] max-w-md">
                Wycena oparta na faktach. Porównujemy ostatnie transakcje w&nbsp;dzielnicy, sprawdzamy stan techniczny i&nbsp;lokalny popyt. Bez zobowiązań, odpowiadamy w&nbsp;24 godziny.
              </p>

              <ul className="mt-8 space-y-3.5">
                {[
                  "Wycena rynkowa, nie życzeniowa",
                  "Porównanie z faktycznymi transakcjami w okolicy",
                  "Telefoniczna rozmowa, bez automatu",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white">
                    <span className="inline-flex items-center justify-center size-5 rounded-full bg-white/15 mt-0.5">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Prawa — formularz */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-white/95 backdrop-blur p-7 lg:p-9 text-foreground shadow-2xl">
                {submitted ? (
                  <div className="flex flex-col items-center text-center py-10">
                    <span className="inline-flex items-center justify-center size-14 rounded-full bg-brand text-white mb-5">
                      <Check className="size-6" strokeWidth={2.5} />
                    </span>
                    <h3 className="font-display font-bold text-2xl text-foreground mb-2">Dziękujemy</h3>
                    <p className="text-foreground-muted">Oddzwonimy w&nbsp;ciągu 24 godzin z&nbsp;wstępną wyceną.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <Field label="Adres nieruchomości" name="adres" required placeholder="np. ul. Wajdeloty 12, Gdańsk Wrzeszcz" />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Metraż (m²)" name="metraz" type="number" required placeholder="65" />
                      <Field label="Pokoje" name="pokoje" type="number" required placeholder="3" />
                    </div>
                    <Field label="Telefon" name="telefon" type="tel" required placeholder="+48 600 000 000" />

                    <button
                      type="submit"
                      disabled={sending}
                      className="mt-2 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-brand transition disabled:opacity-60"
                    >
                      {sending ? "Wysyłanie…" : (
                        <>
                          <Send className="size-4" />
                          Wyślij zgłoszenie
                        </>
                      )}
                    </button>
                    <p className="text-xs text-foreground-subtle leading-relaxed">
                      Wysyłając, zgadzasz się na kontakt telefoniczny w&nbsp;celu omówienia wyceny.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-subtle">
        {label}{required && <span className="text-brand"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition"
      />
    </div>
  );
}
