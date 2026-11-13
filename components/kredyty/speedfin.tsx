"use client";

/* Kalkulatory kredytowe SpeedFin (Finance Development Sp. z o.o.) w wyglądzie Dom Hunter.
 * Instalacja manualna wg https://kalkulator-hipoteczny.online/dokumentacja-techniczna/
 * - konfiguracja klienta z serwera SpeedFin (SPEEDFIN_KLIENT), wygląd nasz (kalkulator.css),
 * - sendType = "toHostFunction": klik „Umów się” nie wysyła danych do SpeedFin, tylko otwiera
 *   nasz formularz (LeadModal), który wysyła zapytanie mailem do biura (/api/kredyt-lead). */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Check, Loader2, ShieldCheck } from "lucide-react";
import "./kalkulator.css";

// Konfiguracja Dom Huntera po stronie SpeedFin jeszcze nie istnieje (13.11.2026).
// Do czasu jej założenia: publiczna konfiguracja demonstracyjna „default” (tylko do liczenia rat).
export const SPEEDFIN_KLIENT = process.env.NEXT_PUBLIC_SPEEDFIN_KLIENT || "default";
const BAZA = "https://hipoteka.kalkulator-hipoteczny.online";
export const ZDARZENIE_LEADU = "dh-kredyt-lead";

type SfLead = {
  campaignId?: string;
  filters?: { creditValue?: number; secureValue?: number; creditPeriod?: number; creditClientAge?: number };
  productItem?: { bank?: string | null; title?: string | null };
};

declare global {
  interface Window {
    widgetConfig?: Record<string, unknown>;
    sfShowModal?: (data: SfLead) => void;
    __dhSpeedfin?: Promise<void>;
  }
}

function zaladujSkrypt(src: string, modul = false) {
  return new Promise<void>((ok, blad) => {
    const s = document.createElement("script");
    s.src = src;
    if (modul) s.type = "module";
    s.onload = () => ok();
    s.onerror = () => blad(new Error("Nie wczytano " + src));
    document.head.appendChild(s);
  });
}

function zaladujSpeedfin() {
  if (window.__dhSpeedfin) return window.__dhSpeedfin;
  window.__dhSpeedfin = (async () => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `${BAZA}/css/app.css`;
    document.head.appendChild(css);
    await zaladujSkrypt(`${BAZA}/assets/config/${SPEEDFIN_KLIENT}.js`);
    window.widgetConfig = { ...(window.widgetConfig || {}), sendType: "toHostFunction", sendUrlPath: "" };
    window.sfShowModal = (data) => window.dispatchEvent(new CustomEvent(ZDARZENIE_LEADU, { detail: data }));
    await zaladujSkrypt(`${BAZA}/js/app.js`, true);
  })();
  return window.__dhSpeedfin;
}

export function useSpeedfin(html: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [stan, setStan] = useState<"laduje" | "gotowy" | "blad">("laduje");
  useEffect(() => {
    let zyje = true;
    if (ref.current) ref.current.innerHTML = html;
    zaladujSpeedfin()
      .then(() => zyje && setStan("gotowy"))
      .catch(() => zyje && setStan("blad"));
    return () => {
      zyje = false;
    };
  }, [html]);
  return { ref, stan };
}

export const attr = (v: string | number) => String(v).replace(/"/g, "&quot;");

/** Pełny kalkulator: filtry + lista ofert banków. */
export function KalkulatorPelny() {
  const { ref, stan } = useSpeedfin(
    `<speedfin-widget mode="full" title="" contact-title="" filter-button="Pokaż oferty banków" result-button="Umów rozmowę" campaign-id="domhunter-kredyty"></speedfin-widget>`
  );

  // Od razu pokaż oferty banków (raz po wczytaniu), żeby wynik był widoczny bez klikania.
  useEffect(() => {
    if (stan !== "gotowy" || !ref.current) return;
    let proby = 0;
    const t = window.setInterval(() => {
      const el = ref.current;
      const btn = el?.querySelector<HTMLButtonElement>(".sf-mortgageCheckBtn");
      if (btn && !el?.querySelector(".productContainer")) {
        btn.click();
        window.clearInterval(t);
      } else if (el?.querySelector(".productContainer") || ++proby > 40) {
        window.clearInterval(t);
      }
    }, 250);
    return () => window.clearInterval(t);
  }, [stan, ref]);

  // Pusta lista po „Pokaż oferty banków”: SpeedFin nic nie pisze, więc mówimy sami, co poprawić.
  const [pusto, setPusto] = useState<string | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t: number | undefined;
    const klik = (e: Event) => {
      const cel = e.target as HTMLElement;
      if (!cel.closest?.(".sf-mortgageCheckBtn") || !el.contains(cel)) return;
      setPusto(null);
      window.clearInterval(t);
      let n = 0;
      t = window.setInterval(() => {
        // Pierwsze 2 s czekamy: stara lista banków znika dopiero, gdy SpeedFin odpowie.
        if (++n < 8) return;
        if (el.querySelector(".productContainer")) return window.clearInterval(t);
        if (el.querySelector(".sf-mortgageCheckBtn.is-loading, .lds-facebook") && n < 40) return;
        window.clearInterval(t);
        const liczba = (sel: string) => Number(el.querySelector<HTMLInputElement>(sel)?.value || 0);
        const kwota = liczba(".sf-f1 input");
        const wartosc = liczba(".sf-f4 input");
        setPusto(
          kwota && wartosc && kwota > wartosc
            ? "Kwota kredytu jest wyższa niż wartość nieruchomości. Banki nie pożyczają więcej, niż jest warta nieruchomość, zwykle do 80 lub 90% jej wartości. Zmniejsz kwotę kredytu albo zwiększ wartość nieruchomości."
            : "Dla tych ustawień kalkulator nie znalazł ofert. Zmień kwotę, okres albo wartość nieruchomości. Możesz też zadzwonić, policzymy to razem."
        );
      }, 250);
    };
    document.addEventListener("click", klik, true); // capture na dokumencie: SpeedFin zatrzymuje kliknięcie
    return () => {
      document.removeEventListener("click", klik, true);
      window.clearInterval(t);
    };
  }, [ref]);

  // Przyjście z małego kalkulatora (parametry w adresie): przewiń do kalkulatora.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("creditValue")) {
      document.getElementById("kalkulator")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="dh-sf dh-sf-pelny">
      {stan === "laduje" && <Szkielet />}
      {stan === "blad" && (
        <p className="py-10 text-center text-foreground-muted">
          Kalkulator chwilowo się nie wczytał. Odśwież stronę albo zadzwoń: {""}
          <a className="font-semibold text-brand" href="tel:+48585334323">58 533 43 23</a>.
        </p>
      )}
      <div ref={ref} />
      {pusto && (
        <div role="status" className="mt-6 rounded-[20px] border border-brand/30 bg-brand-light px-5 py-4 text-[15px] leading-relaxed text-foreground">
          <b className="font-semibold text-brand-deep">Brak ofert banków. </b>
          {pusto}{" "}
          <a href="tel:+48585334323" className="font-semibold text-brand underline underline-offset-2">58 533 43 23</a>
        </div>
      )}
    </div>
  );
}

/** Mały kalkulator przy ofercie: liczba ofert banków, rata minimalna i maksymalna. */
export function RataPrzyOfercie({ cena }: { cena: number }) {
  const { ref, stan } = useSpeedfin(
    `<speedfin-widget mode="mini" secure-value="${attr(Math.round(cena))}" check-path-url="https://domhunter.pl/kredyty" campaign-id="domhunter-oferta"></speedfin-widget>`
  );
  return (
    <div className="dh-sf dh-sf-mini">
      {stan !== "gotowy" && <div className="h-[220px] animate-pulse rounded-2xl bg-brand-light" />}
      <div ref={ref} />
    </div>
  );
}

function Szkielet() {
  return (
    <div className="grid gap-4 sm:grid-cols-3" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-[88px] animate-pulse rounded-2xl bg-brand-light" />
      ))}
    </div>
  );
}

const zl = (n?: number) => (typeof n === "number" ? new Intl.NumberFormat("pl-PL").format(n) + " zł" : "");

/** Formularz po kliknięciu „Umów rozmowę” przy banku. Zapytanie idzie do biura Dom Hunter. */
export function LeadModal() {
  const [dane, setDane] = useState<SfLead | null>(null);
  const [stan, setStan] = useState<"formularz" | "wysylam" | "wyslane" | "blad">("formularz");

  useEffect(() => {
    const h = (e: Event) => {
      setDane((e as CustomEvent<SfLead>).detail || {});
      setStan("formularz");
    };
    window.addEventListener(ZDARZENIE_LEADU, h);
    return () => window.removeEventListener(ZDARZENIE_LEADU, h);
  }, []);

  useEffect(() => {
    if (!dane) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setDane(null);
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [dane]);

  if (!dane) return null;
  const f = dane.filters || {};
  const bank = dane.productItem?.bank || dane.productItem?.title || "";

  async function wyslij(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStan("wysylam");
    try {
      const r = await fetch("/api/kredyt-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imie: fd.get("imie"),
          telefon: fd.get("telefon"),
          email: fd.get("email"),
          wiadomosc: fd.get("wiadomosc"),
          zgoda: fd.get("zgoda") === "on",
          strona: fd.get("strona"),
          kalkulacja: {
            bank,
            kwotaKredytu: f.creditValue,
            wartoscNieruchomosci: f.secureValue,
            okresLat: f.creditPeriod,
            wiek: f.creditClientAge,
          },
        }),
      });
      setStan(r.ok ? "wyslane" : "blad");
    } catch {
      setStan("blad");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#141515]/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={() => setDane(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dh-lead-tytul"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[28px] bg-surface p-7 shadow-2xl sm:rounded-[28px] sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setDane(null)}
          className="absolute right-5 top-5 inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-brand hover:text-brand"
          aria-label="Zamknij"
        >
          <X className="size-4" />
        </button>

        {stan === "wyslane" ? (
          <div className="py-6 text-center">
            <span className="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-full bg-brand text-white">
              <Check className="size-6" strokeWidth={2.4} />
            </span>
            <h3 id="dh-lead-tytul" className="font-display text-3xl text-foreground">Dziękujemy!</h3>
            <p className="mt-3 text-foreground-muted">Mamy Twoje zapytanie. Oddzwonimy, żeby porozmawiać o kredycie i kolejnych krokach.</p>
            <button onClick={() => setDane(null)} className="mt-7 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white hover:bg-brand-hover">
              Wracam do kalkulatora
            </button>
          </div>
        ) : (
          <form onSubmit={wyslij}>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Rozmowa o kredycie</p>
            <h3 id="dh-lead-tytul" className="pr-10 font-display text-[1.9rem] leading-[1.08] text-foreground">
              Zostaw numer, <span className="italic text-brand">oddzwonimy.</span>
            </h3>

            {(bank || f.creditValue) && (
              <dl className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-surface-cream p-4 text-sm">
                {bank && (
                  <div className="col-span-2">
                    <dt className="text-foreground-subtle">Wybrany bank</dt>
                    <dd className="font-semibold text-foreground">{bank}</dd>
                  </div>
                )}
                {f.creditValue && (
                  <div>
                    <dt className="text-foreground-subtle">Kwota kredytu</dt>
                    <dd className="font-semibold text-foreground">{zl(f.creditValue)}</dd>
                  </div>
                )}
                {f.creditPeriod && (
                  <div>
                    <dt className="text-foreground-subtle">Okres</dt>
                    <dd className="font-semibold text-foreground">{f.creditPeriod} lat</dd>
                  </div>
                )}
              </dl>
            )}

            <div className="mt-6 space-y-3">
              <Pole name="imie" label="Imię i nazwisko" autoComplete="name" required />
              <Pole name="telefon" label="Telefon" type="tel" autoComplete="tel" required />
              <Pole name="email" label="E-mail (opcjonalnie)" type="email" autoComplete="email" />
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">Wiadomość (opcjonalnie)</span>
                <textarea name="wiadomosc" rows={3} className="w-full rounded-xl border border-border-strong bg-surface px-4 py-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20" />
              </label>
              <input type="text" name="strona" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <label className="flex items-start gap-3 pt-1 text-sm leading-relaxed text-foreground-muted">
                <input type="checkbox" name="zgoda" required className="mt-1 size-4 shrink-0 accent-[#d31ec0]" />
                <span>
                  Zgadzam się na kontakt Dom Hunter w sprawie kredytu i przetwarzanie moich danych w tym celu.{" "}
                  <Link href="/polityka-prywatnosci" className="underline underline-offset-2 hover:text-brand">Polityka prywatności</Link>
                </span>
              </label>
            </div>

            {stan === "blad" && (
              <p className="mt-4 rounded-xl bg-brand-light px-4 py-3 text-sm text-brand-deep">
                Nie udało się wysłać. Spróbuj jeszcze raz albo zadzwoń: <a href="tel:+48585334323" className="font-semibold">58 533 43 23</a>.
              </p>
            )}

            <button
              type="submit"
              disabled={stan === "wysylam"}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-hover disabled:opacity-70"
            >
              {stan === "wysylam" ? <Loader2 className="size-4 animate-spin" /> : null}
              Wyślij zapytanie
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-foreground-subtle">
              <ShieldCheck className="size-3.5" /> Dane trafiają tylko do biura Dom Hunter.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Pole({ label, ...p }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <input
        {...p}
        className="w-full rounded-xl border border-border-strong bg-surface px-4 py-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}
