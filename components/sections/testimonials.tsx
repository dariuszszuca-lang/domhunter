"use client";

import { useEffect, useRef, useState } from "react";
import { Star, ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";

// Realne, najnowsze opinie klientów (źródło: trojmiasto.pl, ocena 5,8/6 z 72 opinii).
const reviews = [
  {
    name: "Magda",
    date: "maj 2026",
    text: "Z pełnym przekonaniem polecam współpracę z Dom Hunter. To już drugi raz, kiedy miałam przyjemność korzystać z ich wsparcia przy sprzedaży mieszkania.",
  },
  {
    name: "Aleksandra",
    date: "kwiecień 2026",
    text: "Serdecznie polecam współpracę z p. Sylwią Wróblewską. Sprawnie, profesjonalnie i w miłej atmosferze przeprowadziła nas przez proces poszukiwania mieszkania.",
  },
  {
    name: "Piotr Radomski",
    date: "czerwiec 2025",
    text: "Pełen profesjonalizm i podejście do klienta. Jestem bardzo zadowolony. Gorąco polecam biuro i współpracę z panią Agnieszką.",
  },
  {
    name: "Paskal",
    date: "maj 2025",
    text: "Gorąco polecam współpracę z Panią Sylwią. Profesjonalna, przemiła i niezwykle pomocna.",
  },
  {
    name: "Magdalena Frel",
    date: "sierpień 2024",
    text: "Bardzo polecam usługi biura Dom Hunter, w szczególności dziękuję Pani Agnieszce i Pani Sylwii za zaangażowanie i owocną pomoc w wynajmie naszego domu.",
  },
];

const TROJMIASTO_URL = "https://www.trojmiasto.pl/Dom-Hunter-o58701.html";
const GOOGLE_URL =
  "https://www.google.com/search?q=Dom+Hunter+nieruchomo%C5%9Bci+Gda%C5%84sk+opinie";

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, []);

  const scroll = (dir: number) =>
    ref.current?.scrollBy({ left: dir * 420, behavior: "smooth" });

  return (
    <section className="overflow-hidden bg-surface-muted py-20 lg:py-28">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
          {/* LEWA — sticky panel: nagłówek + ocena jako hero-liczba + nawigacja + linki */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Opinie
            </p>
            <h2 className="font-display font-normal text-[clamp(2rem,4vw,3.3rem)] leading-[1.04] tracking-[-0.01em] text-foreground">
              Co mówią o nas <span className="italic text-brand">klienci.</span>
            </h2>

            {/* Ocena — hero-liczba */}
            <div className="mt-9 flex items-end gap-4">
              <span className="font-display text-[clamp(3.4rem,7vw,5rem)] font-normal leading-[0.85] text-brand tabular-nums">
                5,8
              </span>
              <div className="pb-1.5">
                <span className="font-display text-2xl leading-none text-foreground-muted">
                  / 6,0
                </span>
                <span className="mt-2 flex gap-0.5 text-brand">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </span>
              </div>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-foreground-muted">
              <BadgeCheck className="size-4 text-brand" strokeWidth={2} />
              72 zweryfikowane opinie na trojmiasto.pl
            </p>

            {/* Nawigacja slidera */}
            <div className="mt-9 flex items-center gap-3">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Poprzednie opinie"
                className="inline-flex size-12 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-all hover:border-brand hover:bg-brand hover:text-white"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Następne opinie"
                className="inline-flex size-12 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-all hover:border-brand hover:bg-brand hover:text-white"
              >
                <ArrowRight className="size-4" />
              </button>

              {/* Pasek postępu */}
              <div className="ml-2 hidden h-[3px] flex-1 overflow-hidden rounded-full bg-border sm:block">
                <div
                  className="h-full rounded-full bg-brand transition-[width] duration-150 ease-out"
                  style={{ width: `${Math.max(progress * 100, 12)}%` }}
                />
              </div>
            </div>

            {/* Linki do źródeł */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={TROJMIASTO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-brand/45 hover:bg-brand/5"
              >
                Wszystkie opinie
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href={GOOGLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-brand/45 hover:bg-brand/5"
              >
                Opinie w Google
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          {/* PRAWA — slider kart */}
          <div
            ref={ref}
            onScroll={updateProgress}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((r, i) => {
              const featured = i === 0;
              return (
                <article
                  key={`${r.name}-${r.date}`}
                  className={`group relative flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-[26px] p-7 transition-all duration-300 hover:-translate-y-1 sm:w-[376px] sm:p-8 ${
                    featured
                      ? "bg-brand text-white shadow-[0_24px_60px_-24px] shadow-brand/50"
                      : "border border-border bg-surface text-foreground hover:border-brand/40 hover:shadow-[0_24px_60px_-30px] hover:shadow-foreground/25"
                  }`}
                >
                  {/* Wielki cudzysłów dekoracyjny */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -top-4 right-5 select-none font-display text-[7rem] italic leading-none ${
                      featured ? "text-white/20" : "text-brand/15"
                    }`}
                  >
                    &bdquo;
                  </span>

                  <div className={`flex gap-0.5 ${featured ? "text-white" : "text-brand"}`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-4 fill-current" />
                    ))}
                  </div>

                  <p
                    className={`relative mt-5 flex-1 text-[1.05rem] leading-relaxed ${
                      featured ? "text-white" : "text-foreground"
                    }`}
                  >
                    {r.text}
                  </p>

                  <div
                    className={`mt-7 flex items-center gap-3 border-t pt-5 ${
                      featured ? "border-white/25" : "border-border"
                    }`}
                  >
                    {/* Monogram */}
                    <span
                      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full font-display text-lg ${
                        featured ? "bg-white text-brand" : "bg-brand/10 text-brand"
                      }`}
                    >
                      {r.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p className={`font-display text-lg leading-none ${featured ? "text-white" : "text-foreground"}`}>
                        {r.name}
                      </p>
                      <p
                        className={`mt-1.5 inline-flex items-center gap-1.5 text-xs ${
                          featured ? "text-white/75" : "text-foreground-subtle"
                        }`}
                      >
                        <BadgeCheck className="size-3.5" strokeWidth={2} />
                        {r.date} · trojmiasto.pl
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
