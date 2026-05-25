"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { Container } from "@/components/ui/container";

export function WycenaCta() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    // TODO: API endpoint /api/wycena
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSending(false);
  }

  return (
    <section className="py-20 lg:py-28 bg-surface-cream">
      <Container size="wide">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-forest mb-4">
              Darmowa wycena
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-foreground">
              Sprawdź, ile warta jest <span className="italic text-foreground-muted">Twoja nieruchomość.</span>
            </h2>
            <p className="mt-5 text-lg text-foreground-muted leading-relaxed">
              Wycena oparta na faktach: porównujemy ostatnie transakcje w dzielnicy, sprawdzamy stan techniczny i lokalny popyt. Bez zobowiązań, w ciągu 24 godzin.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Wycena rynkowa, nie życzeniowa",
                "Porównanie z faktycznymi transakcjami w okolicy",
                "Telefoniczna rozmowa, bez automatu",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-foreground">
                  <Check className="size-5 shrink-0 text-brand-forest mt-0.5" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Formularz */}
          <div className="bg-surface rounded-2xl border border-border shadow-soft p-7 lg:p-9">
            {submitted ? (
              <div className="flex flex-col items-center text-center py-8">
                <span className="inline-flex items-center justify-center size-14 rounded-full bg-brand-forest text-white mb-5">
                  <Check className="size-6" strokeWidth={2.5} />
                </span>
                <h3 className="font-display font-bold text-2xl text-foreground mb-2">Dziękujemy</h3>
                <p className="text-foreground-muted">Oddzwonimy w ciągu 24 godzin z wstępną wyceną.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <Field label="Adres nieruchomości" name="adres" required placeholder="np. ul. Wajdeloty 12, Gdańsk Wrzeszcz" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Metraż (m²)" name="metraz" type="number" required placeholder="65" />
                  <Field label="Pokoje" name="pokoje" type="number" required placeholder="3" />
                </div>
                <Field label="Telefon" name="telefon" type="tel" required placeholder="+48 600 000 000" />
                <Field label="E-mail" name="email" type="email" placeholder="opcjonalnie" />

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-2 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-brand-forest text-white text-sm font-semibold hover:bg-brand-forest-hover transition disabled:opacity-60"
                >
                  {sending ? "Wysyłanie…" : (
                    <>
                      <Send className="size-4" />
                      Wyślij zgłoszenie
                    </>
                  )}
                </button>

                <p className="text-xs text-foreground-subtle leading-relaxed">
                  Wysyłając formularz, zgadzasz się na kontakt telefoniczny w celu omówienia wyceny. Twoje dane są bezpieczne.
                </p>
              </form>
            )}
          </div>
        </div>
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
      <label htmlFor={name} className="text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle">
        {label}{required && <span className="text-brand-forest"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/15 transition"
      />
    </div>
  );
}
