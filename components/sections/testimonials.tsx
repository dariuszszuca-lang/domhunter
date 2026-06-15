"use client";

import { Star, ArrowUpRight, BadgeCheck } from "lucide-react";
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

// Dwa pasy — ten sam realny zestaw w innej kolejności (zero zmyślonych opinii).
const rowA = [0, 1, 2, 3, 4];
const rowB = [4, 2, 0, 3, 1];

type Review = (typeof reviews)[number];

function Card({ r, featured }: { r: Review; featured: boolean }) {
  return (
    <article
      className={`relative mr-5 flex w-[320px] shrink-0 flex-col overflow-hidden rounded-[26px] p-7 sm:w-[372px] sm:p-8 ${
        featured
          ? "bg-brand text-white shadow-[0_24px_60px_-28px] shadow-brand/50"
          : "border border-border bg-surface text-foreground"
      }`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-3 right-5 select-none font-display text-[6.5rem] italic leading-none ${
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
        className={`relative mt-5 line-clamp-4 flex-1 text-[1.02rem] leading-relaxed ${
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
}

export function Testimonials() {
  return (
    <section className="overflow-hidden bg-surface-muted py-20 lg:py-28">
      <style>{`
        @keyframes dh-marquee-l { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes dh-marquee-r { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .dh-track { animation-duration: 48s; animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform; }
        .dh-track-l { animation-name: dh-marquee-l; }
        .dh-track-r { animation-name: dh-marquee-r; }
        @media (hover: hover) and (pointer: fine) {
          .dh-marquee:hover .dh-track { animation-play-state: paused; }
        }
        .dh-marquee {
          -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
        }
      `}</style>

      <Container size="wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Opinie
            </p>
            <h2 className="font-display font-normal text-[clamp(2rem,4vw,3.3rem)] leading-[1.04] tracking-[-0.01em] text-foreground">
              Co mówią o nas <span className="italic text-brand">klienci.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-10">
            {/* Ocena */}
            <div>
              <div className="flex items-end gap-3">
                <span className="font-display text-[clamp(3rem,6vw,4.4rem)] font-normal leading-[0.85] text-brand tabular-nums">
                  5,8
                </span>
                <div className="pb-1">
                  <span className="font-display text-xl leading-none text-foreground-muted">/ 6,0</span>
                  <span className="mt-2 flex gap-0.5 text-brand">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </span>
                </div>
              </div>
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-foreground-muted">
                <BadgeCheck className="size-4 text-brand" strokeWidth={2} />
                72 zweryfikowane opinie
              </p>
            </div>

            {/* Przyciski — primary magenta + outline */}
            <div className="flex flex-wrap gap-3">
              <a
                href={TROJMIASTO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-12px] shadow-brand/60 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-12px] hover:shadow-brand/70"
              >
                Wszystkie opinie
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href={GOOGLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-brand hover:text-brand"
              >
                Opinie w Google
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Dwa pasy — same płyną, przeciwne kierunki */}
      <div className="dh-marquee mt-14 flex flex-col gap-5">
        <div className="flex">
          <div className="dh-track dh-track-l flex w-max">
            {[...rowA, ...rowA].map((idx, i) => (
              <Card key={`a-${i}`} r={reviews[idx]} featured={i % rowA.length === 0} />
            ))}
          </div>
        </div>
        <div className="flex">
          <div className="dh-track dh-track-r flex w-max">
            {[...rowB, ...rowB].map((idx, i) => (
              <Card key={`b-${i}`} r={reviews[idx]} featured={i % rowB.length === 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
