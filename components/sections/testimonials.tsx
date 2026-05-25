"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";

const testimonials = [
  { author: "Anna M.", role: "Sprzedaż mieszkania, Oliwa", stars: 5, quote: "Sprzedaż mieszkania w Oliwie zajęła nam 3 tygodnie zamiast pół roku. Profesjonalne podejście od pierwszej rozmowy.", initials: "AM" },
  { author: "Marek S.", role: "Kupno domu, Suchanino", stars: 5, quote: "Znaleźli mi dom z ogrodem, który nigdy nie trafił do portali. Negocjacje za mnie, ja podpisałem akt.", initials: "MS" },
  { author: "Tomek K.", role: "Najem lokalu", stars: 5, quote: "Pomogli przy wyborze lokalu na biuro startupu. Znali parametry, ceny rynkowe, mieli kontakty do właściciela.", initials: "TK" },
  { author: "Joanna P.", role: "Wynajem, Wrzeszcz", stars: 5, quote: "Znaleźli mi mieszkanie w Wrzeszczu w 5 dni. Sprawdzili umowę, ostrzegli o pułapkach. Polecam.", initials: "JP" },
  { author: "Krzysztof B.", role: "Sprzedaż apartamentu", stars: 5, quote: "Sprzedali apartament na Przymorzu o 8% powyżej średniej dzielnicowej. Wycena była bardzo trafna.", initials: "KB" },
  { author: "Magda W.", role: "Kupno pierwszego mieszkania", stars: 5, quote: "Pierwsze mieszkanie kupowałam stresowo. Tłumaczyli wszystko krok po kroku, byli przy każdym dokumencie.", initials: "MW" },
  { author: "Paweł L.", role: "Inwestycja apartament", stars: 5, quote: "Kupiłem apartament pod wynajem. Pokazali analizę zwrotu, znaleźli najemcę w tydzień po remoncie.", initials: "PL" },
  { author: "Ewa Z.", role: "Sprzedaż domu, Banino", stars: 5, quote: "Dom sprzedaliśmy w 4 tygodnie. Sesja zdjęciowa, plan 2D, pokazy — wszystko wzięli na siebie.", initials: "EZ" },
  { author: "Michał R.", role: "Najem komercja", stars: 5, quote: "Wynajęcie magazynu w Kowalach. Znaleźli najemcę, sprawdzili firmę, podpisali umowę. Stabilny dochód.", initials: "MR" },
  { author: "Karolina O.", role: "Kupno mieszkania", stars: 5, quote: "Pokazali off-market w Sopocie, którego nie było w portalach. Świetna oferta, szybka decyzja.", initials: "KO" },
  { author: "Jakub D.", role: "Sprzedaż, Stare Miasto", stars: 5, quote: "Wycena była realistyczna, nie życzeniowa. Mieszkanie sprzedane w 3 tygodnie, bez negocjacji w dół.", initials: "JD" },
  { author: "Aleksandra T.", role: "Wynajem, Sopot", stars: 5, quote: "Znaleźli idealne mieszkanie blisko plaży. Umowa najmu okazjonalnego, wszystko bezpiecznie.", initials: "AT" },
];

// Podziel na 3 kolumny po 4 opinie
const col1 = testimonials.slice(0, 4);
const col2 = testimonials.slice(4, 8);
const col3 = testimonials.slice(8, 12);

export function Testimonials() {
  return (
    <section id="opinie" className="relative overflow-hidden bg-brand-light py-20 text-foreground lg:py-28">
      <Container size="wide" className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-3xl text-center lg:mb-16"
        >
          <div className="mb-5 inline-flex items-center rounded-full border border-brand-soft/25 bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-normal text-foreground shadow-soft backdrop-blur">
            Opinie
          </div>
          <h2 className="font-sans font-bold uppercase text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.04] tracking-normal text-foreground">
            Co mówią o nas klienci
          </h2>
          <a
            href="https://www.google.com/search?q=domhunter+nieruchomo%C5%9Bci+gda%C5%84sk+opinie"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:bg-brand-soft hover:text-foreground"
          >
            <GoogleIcon />
            Zobacz wszystkie opinie
            <span className="inline-flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs">5.0</span>
            </span>
          </a>
        </motion.div>

        {/* Vertical scrolling 3 columns */}
        <div className="relative h-[680px] overflow-hidden lg:h-[620px]">
          {/* Top fade */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-brand-light to-transparent" />
          {/* Bottom fade */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-brand-light to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 h-full">
            <ScrollColumn items={col1} direction="up" duration={40} />
            <ScrollColumn items={col2} direction="down" duration={48} className="hidden md:block" />
            <ScrollColumn items={col3} direction="up" duration={44} className="hidden lg:block" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ScrollColumn({
  items,
  direction,
  duration,
  className = "",
}: {
  items: typeof testimonials;
  direction: "up" | "down";
  duration: number;
  className?: string;
}) {
  // Duplikacja contentu dla seamless loop
  const looped = [...items, ...items, ...items];
  const animClass = direction === "up" ? "animate-scroll-up" : "animate-scroll-down";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`flex flex-col gap-4 lg:gap-5 ${animClass}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {looped.map((t, i) => (
          <TestimonialCard key={`${t.author}-${i}`} t={t} />
        ))}
      </div>

      <style>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.333%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-33.333%); }
          100% { transform: translateY(0); }
        }
        .animate-scroll-up {
          animation-name: scroll-up;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-scroll-down {
          animation-name: scroll-down;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-up, .animate-scroll-down {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <article className="shrink-0 rounded-2xl border border-border/70 bg-white/75 p-6 shadow-soft backdrop-blur lg:p-7">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex size-10 items-center justify-center rounded-full border border-brand-soft/30 bg-brand-blush text-sm font-semibold text-foreground">
          {t.initials}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-sans text-sm font-semibold leading-tight text-foreground">{t.author}</p>
          <p className="mt-0.5 text-xs text-foreground-muted">{t.role}</p>
        </div>
        <GoogleIcon className="shrink-0" />
      </div>
      <div className="flex items-center gap-0.5 mb-3">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} className="size-3.5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-sm leading-[1.6] text-foreground-muted lg:text-[15px]">{t.quote}</p>
    </article>
  );
}

function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`size-4 text-brand ${className}`} aria-hidden>
      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
