"use client";

import { useRef } from "react";
import { Star, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
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
  const scroll = (dir: number) =>
    ref.current?.scrollBy({ left: dir * 384, behavior: "smooth" });

  return (
    <section className="bg-surface-muted py-20 lg:py-28">
      <Container size="wide">
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Opinie
            </p>
            <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
              Co mówią o nas <span className="italic text-brand">klienci.</span>
            </h2>
            <p className="mt-4 inline-flex items-center gap-2 text-base text-foreground-muted">
              <span className="inline-flex gap-0.5 text-brand">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </span>
              Ocena 5,8/6 w 72 opiniach na trojmiasto.pl
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 lg:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Poprzednie opinie"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Następne opinie"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((r) => (
            <article
              key={`${r.name}-${r.date}`}
              className="flex w-[300px] shrink-0 snap-start flex-col rounded-[24px] border border-border bg-surface p-7 sm:w-[368px]"
            >
              <div className="flex gap-0.5 text-brand">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 flex-1 text-[1.05rem] leading-relaxed text-foreground">
                &bdquo;{r.text}&rdquo;
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-display text-lg leading-none text-foreground">{r.name}</p>
                <p className="mt-1.5 text-xs text-foreground-subtle">{r.date}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={TROJMIASTO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-brand/45 hover:bg-brand/5"
          >
            Wszystkie opinie na trojmiasto.pl
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
      </Container>
    </section>
  );
}
