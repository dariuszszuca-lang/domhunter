"use client";

/* „Ile chcesz płacić miesięcznie?”: suwak raty + prawdziwe oferty Dom Huntera.
 * Ratę każdej oferty liczy SpeedFin (widget mode="button", secure-value = cena oferty,
 * 20% wkładu, 30 lat). Liczbę czytamy z tekstu przycisku i porównujemy z budżetem. */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Check } from "lucide-react";
import { useSpeedfin, attr } from "./speedfin";

export type OfertaKarta = {
  id: string;
  tytul: string;
  cena: number;
  metraz?: number;
  pokoje?: number;
  miejsce: string;
  zdjecie: string;
};

const MIN = 1000;
const MAX = 8000;
const zl = (n: number) => new Intl.NumberFormat("pl-PL").format(n) + " zł";

/** Licznik jak tablica odlotów: każda cyfra przewija się w swojej kolumnie. */
function Licznik({ wartosc }: { wartosc: number }) {
  const znaki = new Intl.NumberFormat("pl-PL").format(wartosc).replace(/\s/g, " ").split("");
  return (
    <span className="inline-flex items-end font-display leading-none tabular-nums" aria-label={zl(wartosc)}>
      {znaki.map((z, i) => {
        const klucz = znaki.length - i;
        if (!/\d/.test(z)) return <span key={"s" + klucz} className="w-[0.25em]" />;
        const d = Number(z);
        return (
          <span key={klucz} className="relative inline-block h-[1.15em] w-[0.6em] overflow-hidden" aria-hidden>
            <span
              className="absolute left-0 top-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateY(-${d * 1.15}em)` }}
            >
              {Array.from({ length: 10 }).map((_, n) => (
                <span key={n} className="flex h-[1.15em] items-center justify-center">{n}</span>
              ))}
            </span>
          </span>
        );
      })}
      <span className="mb-[0.22em] ml-3 text-[0.3em] font-sans font-semibold text-foreground-muted">zł / mies.</span>
    </span>
  );
}

function Karta({ o, budzet, onRata, rata }: { o: OfertaKarta; budzet: number; onRata: (id: string, r: number) => void; rata?: number }) {
  const { ref } = useSpeedfin(
    `<speedfin-widget mode="button" secure-value="${attr(Math.round(o.cena))}" check-path-url="https://domhunter.pl/kredyty" prepend-text-button="Rata od " append-text-button=" / mies." campaign-id="domhunter-oferta"></speedfin-widget>`
  );

  // Rata z tekstu przycisku SpeedFin, np. „RATA OD 2 852 ZŁ / MIES.”
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const czytaj = () => {
      const m = (el.textContent || "").match(/(\d[\d\s ]*)\s*zł/i);
      if (m) {
        const r = Number(m[1].replace(/[\s ]/g, ""));
        onRata(o.id, r > 0 ? r : -1); // 0 zł = SpeedFin nie policzył tej oferty
      }
    };
    const obs = new MutationObserver(czytaj);
    obs.observe(el, { childList: true, subtree: true, characterData: true });
    czytaj();
    return () => obs.disconnect();
  }, [ref, o.id, onRata]);

  const brak = rata === -1;
  const znana = typeof rata === "number" && !brak;
  const pasuje = znana && rata! <= budzet;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[24px] border bg-surface transition-all duration-500 ${
        !znana ? "border-border" : pasuje ? "border-brand/50 shadow-[0_24px_60px_-34px_rgba(211,30,192,0.6)]" : "border-border opacity-45 grayscale-[0.7]"
      }`}
    >
      <Link href={`/oferty/${o.id}`} className="relative block aspect-[4/3] overflow-hidden bg-foreground/5">
        <Image src={o.zdjecie} alt={o.tytul} fill sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        {pasuje && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold text-white">
            <Check className="size-3" strokeWidth={3} /> W budżecie
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="flex items-center gap-1 text-[11px] text-foreground-subtle">
          <MapPin className="size-3" /> {o.miejsce}
        </p>
        <Link href={`/oferty/${o.id}`} className="mt-1 line-clamp-1 font-display text-lg text-foreground hover:text-brand">
          {o.tytul}
        </Link>
        <p className="mt-0.5 text-sm text-foreground-muted">
          <b className="font-semibold text-foreground">{zl(o.cena)}</b>
          {o.metraz ? ` · ${o.metraz} m²` : ""}
          {o.pokoje ? ` · ${o.pokoje} pok.` : ""}
        </p>
        <div className="dh-sf dh-sf-przycisk mt-3">
          {!znana && !brak && <div className="h-[42px] animate-pulse rounded-full bg-brand-light" />}
          {brak && (
            <a href="#kalkulator" className="block rounded-full border border-brand/30 px-4 py-[11px] text-center text-sm font-semibold text-brand hover:bg-brand hover:text-white">
              Policz ratę w kalkulatorze
            </a>
          )}
          <div ref={ref} className={brak ? "hidden" : undefined} />
        </div>
      </div>
    </article>
  );
}

export function OfertyWBudzecie({ oferty }: { oferty: OfertaKarta[] }) {
  const [budzet, setBudzet] = useState(3000);
  const [raty, setRaty] = useState<Record<string, number>>({});
  const onRata = useMemo(
    () => (id: string, r: number) => setRaty((p) => (p[id] === r ? p : { ...p, [id]: r })),
    []
  );

  const znane = Object.keys(raty).length;
  const policzone = Object.values(raty).filter((r) => r > 0);
  const pasuje = oferty.filter((o) => (raty[o.id] ?? 0) > 0 && raty[o.id] <= budzet).length;
  const najtansza = policzone.length ? Math.min(...policzone) : null;

  // Kolejność: najpierw te w budżecie, potem nieznane, na końcu za drogie (CSS order, bez ruszania DOM).
  const kolejnosc = (o: OfertaKarta) => {
    const r = raty[o.id];
    if (r === undefined) return 1;
    return r > 0 && r <= budzet ? 0 : 2;
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-12">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Twój budżet</p>
        <h2 className="font-display font-normal text-[clamp(2rem,4vw,3.1rem)] leading-[1.04] tracking-[-0.01em] text-foreground">
          Ile chcesz płacić <span className="italic text-brand">miesięcznie?</span>
        </h2>
        <div className="mt-8 rounded-[26px] border border-brand/20 bg-surface p-6 shadow-[0_30px_70px_-45px_rgba(109,19,84,0.6)] sm:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-subtle">Rata do</p>
          <div className="mt-2 text-[clamp(3.2rem,7vw,4.6rem)] text-foreground">
            <Licznik wartosc={budzet} />
          </div>
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={100}
            value={budzet}
            onChange={(e) => setBudzet(Number(e.target.value))}
            aria-label="Maksymalna rata miesięczna"
            className="dh-suwak mt-6 w-full"
            style={{ ["--p" as string]: `${((budzet - MIN) / (MAX - MIN)) * 100}%` }}
          />
          <div className="mt-2 flex justify-between text-xs text-foreground-subtle">
            <span>{zl(MIN)}</span>
            <span>{zl(MAX)}</span>
          </div>
          <div className="mt-6 rounded-2xl bg-brand-light px-4 py-3 text-sm text-foreground">
            {znane < oferty.length ? (
              <>Liczę raty dla {oferty.length} ofert… ({znane}/{oferty.length})</>
            ) : (
              <>
                W Twoim budżecie mieści się{" "}
                <b className="font-semibold text-brand">
                  {pasuje} z {policzone.length}
                </b>{" "}
                ofert.
                {pasuje === 0 && najtansza ? <> Najniższa rata to {zl(najtansza)}.</> : null}
              </>
            )}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-foreground-subtle">
            Rata od najkorzystniejszej oferty banku przy 20% wkładu własnego i 30 latach spłaty. Liczy SpeedFin, na
            żywo. Kliknij ratę, żeby zobaczyć wszystkie banki.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {oferty.map((o) => (
          <div key={o.id} style={{ order: kolejnosc(o) }}>
            <Karta o={o} budzet={budzet} onRata={onRata} rata={raty[o.id]} />
          </div>
        ))}
      </div>
    </div>
  );
}
