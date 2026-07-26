"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Home, Building2, TreePine, Key, Hash, SlidersHorizontal, ChevronDown, X, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { OfferFilters, OfferMarket, OfferTransaction, OfferType } from "@/lib/esti/types";
import { cn } from "@/lib/utils";

const types = [
  { value: "wszystkie", label: "Wszystkie", icon: LayoutGrid },
  { value: "mieszkanie", label: "Mieszkanie", icon: Home },
  { value: "dom", label: "Dom", icon: Building2 },
  { value: "dzialka", label: "Działka", icon: TreePine },
  { value: "lokal", label: "Lokal", icon: Building2 },
  { value: "najem", label: "Wynajem", icon: Key },
] as const;

type TabValue = typeof types[number]["value"];
type TypeValue = OfferType | "wszystkie";
type TransactionValue = OfferTransaction | "wszystkie";

// Fallback, gdy serwer nie poda listy (np. brak danych ofert).
// Normalnie lista miast przychodzi propem `cities` z realnych ofert (store.getCityOptions).
const cityOptionsFallback = [
  "Gdańsk",
  "Gdynia",
  "Sopot",
  "Pruszcz Gdański",
];

const roomOptions = ["1", "2", "3", "4", "5+"];
const transactionOptions: { value: TransactionValue; label: string }[] = [
  { value: "wszystkie", label: "Wszystkie" },
  { value: "sprzedaz", label: "Sprzedaż" },
  { value: "najem", label: "Wynajem" },
];
const marketOptions: { value: OfferMarket | "wszystkie"; label: string }[] = [
  { value: "wszystkie", label: "Wszystkie" },
  { value: "wtorny", label: "Wtórny" },
  { value: "pierwotny", label: "Pierwotny" },
];
const stateOptionsFallback = [
  "do wprowadzenia",
];

export function QuickSearch({
  variant = "overlay",
  cities,
  states,
  initialFilters,
}: {
  variant?: "overlay" | "embed";
  cities?: string[];
  states?: string[];
  initialFilters?: OfferFilters;
} = {}) {
  const router = useRouter();
  const cityList = cities && cities.length > 0 ? cities : cityOptionsFallback;
  const stateOptions = states && states.length > 0 ? states : stateOptionsFallback;
  const [type, setType] = useState<TypeValue>(initialFilters?.type ?? "wszystkie");
  const [transaction, setTransaction] = useState<TransactionValue>(
    initialFilters?.transaction ?? "wszystkie"
  );
  const [advanced, setAdvanced] = useState(
    Boolean(
      initialFilters?.transaction ||
      initialFilters?.market ||
      initialFilters?.areaMin ||
      initialFilters?.areaMax ||
      initialFilters?.rooms?.length ||
      initialFilters?.roomsMin ||
      initialFilters?.floorMin !== undefined ||
      initialFilters?.floorMax !== undefined ||
      initialFilters?.yearMin ||
      initialFilters?.state?.length ||
      initialFilters?.offerId
    )
  );

  const [city, setCity] = useState(initialFilters?.city ?? "");
  const [district, setDistrict] = useState(initialFilters?.district ?? "");
  const [market, setMarket] = useState(initialFilters?.market ?? "wszystkie");
  const [priceMin, setPriceMin] = useState(
    initialFilters?.priceMin !== undefined ? String(initialFilters.priceMin) : ""
  );
  const [priceMax, setPriceMax] = useState(
    initialFilters?.priceMax !== undefined ? String(initialFilters.priceMax) : ""
  );
  const [areaMin, setAreaMin] = useState(
    initialFilters?.areaMin !== undefined ? String(initialFilters.areaMin) : ""
  );
  const [areaMax, setAreaMax] = useState(
    initialFilters?.areaMax !== undefined ? String(initialFilters.areaMax) : ""
  );
  const [rooms, setRooms] = useState<string[]>([
    ...(initialFilters?.rooms?.map(String) ?? []),
    ...(initialFilters?.roomsMin !== undefined ? [`${initialFilters.roomsMin}+`] : []),
  ]);
  const [floorMin, setFloorMin] = useState(
    initialFilters?.floorMin !== undefined ? String(initialFilters.floorMin) : ""
  );
  const [floorMax, setFloorMax] = useState(
    initialFilters?.floorMax !== undefined ? String(initialFilters.floorMax) : ""
  );
  const [yearMin, setYearMin] = useState(
    initialFilters?.yearMin !== undefined ? String(initialFilters.yearMin) : ""
  );
  const [state, setState] = useState<string[]>(initialFilters?.state ?? []);
  const [offerId, setOfferId] = useState(initialFilters?.offerId ?? "");

  const toggleArr = (arr: string[], v: string, set: (a: string[]) => void) =>
    arr.includes(v) ? set(arr.filter((x) => x !== v)) : set([...arr, v]);

  const params = new URLSearchParams();
  if (type !== "wszystkie") params.set("typ", type);
  if (transaction !== "wszystkie") params.set("transakcja", transaction);
  if (city) params.set("miasto", city);
  if (district) params.set("dzielnica", district);
  if (market && market !== "wszystkie") params.set("rynek", market);
  if (priceMin) params.set("cena_min", priceMin);
  if (priceMax) params.set("cena_max", priceMax);
  if (areaMin) params.set("metraz_min", areaMin);
  if (areaMax) params.set("metraz_max", areaMax);
  if (rooms.length) params.set("pokoje", rooms.join(","));
  if (floorMin) params.set("pietro_min", floorMin);
  if (floorMax) params.set("pietro_max", floorMax);
  if (yearMin) params.set("rok_min", yearMin);
  if (state.length) params.set("stan", state.join(","));
  if (offerId) params.set("id", offerId);

  const handleTypeTab = (value: TabValue) => {
    if (value === "wszystkie") {
      setType("wszystkie");
      setTransaction("wszystkie");
    } else if (value === "najem") {
      setType("wszystkie");
      setTransaction("najem");
    } else {
      setType(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = params.toString();
    router.push(query ? `/oferty?${query}` : "/oferty");
  };

  const resetAll = () => {
    setType("wszystkie");
    setTransaction("wszystkie");
    setCity("");
    setDistrict("");
    setMarket("wszystkie");
    setPriceMin("");
    setPriceMax("");
    setAreaMin("");
    setAreaMax("");
    setRooms([]);
    setFloorMin("");
    setFloorMax("");
    setYearMin("");
    setState([]);
    setOfferId("");
    if (variant === "embed") router.push("/oferty");
  };

  const activeCount =
    [city, district, priceMin, priceMax, areaMin, areaMax, floorMin, floorMax, yearMin, offerId]
      .filter(Boolean).length +
    rooms.length +
    state.length +
    (market !== "wszystkie" ? 1 : 0) +
    (type !== "wszystkie" ? 1 : 0) +
    (transaction !== "wszystkie" ? 1 : 0);

  const sectionCls =
    variant === "overlay"
      ? "relative z-10 pt-2 lg:pt-4"
      : "relative pt-10 lg:pt-16 pb-4 lg:pb-6";

  return (
    <section className={sectionCls}>
      <Container size="default">
        <div className="relative">
          {/* Poświata pod panelem (wow) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-3 -z-10 rounded-[40px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(211,30,192,0.22),transparent_62%)] blur-2xl"
          />
          <div className="overflow-hidden rounded-[28px] border border-brand/25 bg-surface shadow-[0_44px_100px_-34px_rgba(20,21,21,0.62)] ring-1 ring-inset ring-foreground/[0.05]">
            {/* Akcentowy pasek na górze */}
            <div aria-hidden className="h-1.5 w-full bg-gradient-to-r from-brand via-[#e84ed8] to-brand" />
            <form className="p-5 lg:p-7" onSubmit={handleSubmit}>
          {/* Nagłówek panelu */}
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <Search className="size-5" strokeWidth={2} />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                Wyszukiwarka ofert
              </p>
              <p className="font-display text-xl leading-tight text-foreground">
                Znajdź swoje miejsce w Trójmieście
              </p>
            </div>
          </div>

          {/* Type tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {types.map((t) => {
              const Icon = t.icon;
              const active =
                t.value === "wszystkie"
                  ? type === "wszystkie" && transaction === "wszystkie"
                  : t.value === "najem"
                    ? type === "wszystkie" && transaction === "najem"
                    : type === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => handleTypeTab(t.value)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border",
                    active
                      ? "bg-brand text-foreground-on-dark border-brand"
                      : "bg-transparent text-foreground-muted border-border hover:border-brand hover:text-foreground"
                  )}
                  aria-pressed={active}
                >
                  <Icon className="size-4" />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Quick row: location + price + button */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            <FieldWrap label="Miasto" colSpan="md:col-span-3">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-select"
              >
                <option value="">Dowolne</option>
                {cityList.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </FieldWrap>
            <FieldWrap label="Dzielnica / lokalizacja" colSpan="md:col-span-3">
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Np. Orłowo, Wzgórze, Letnica"
                className="form-input"
              />
            </FieldWrap>
            <FieldWrap label="Cena od (zł)" colSpan="md:col-span-2">
              <input
                type="number"
                inputMode="numeric"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                placeholder="0"
                className="form-input"
              />
            </FieldWrap>
            <FieldWrap label="Cena do (zł)" colSpan="md:col-span-2">
              <input
                type="number"
                inputMode="numeric"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder="bez limitu"
                className="form-input"
              />
            </FieldWrap>
            <div className="md:col-span-2 flex items-end">
              <Button type="submit" variant="primary" size="lg" className="w-full h-12">
                <Search />
                Szukaj
              </Button>
            </div>
          </div>

          {/* Toggle advanced + counter + reset */}
          <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setAdvanced((v) => !v)}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand transition-colors"
              aria-expanded={advanced}
            >
              <SlidersHorizontal className="size-4" />
              Więcej filtrów
              {activeCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-brand text-brand-deep text-[10px] font-bold tabular-nums">
                  {activeCount}
                </span>
              )}
              <ChevronDown
                className={cn(
                  "size-3.5 opacity-60 transition-transform",
                  advanced && "rotate-180"
                )}
              />
            </button>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors"
              >
                <X className="size-3.5" />
                Wyczyść filtry
              </button>
            )}
          </div>

          {/* Advanced filters */}
          {advanced && (
            <div className="mt-5 pt-5 border-t border-border space-y-5">
              {/* Rodzaj transakcji */}
              <div>
                <p className="text-xs font-medium text-foreground-muted mb-2">
                  Rodzaj transakcji
                </p>
                <div className="flex flex-wrap gap-2">
                  {transactionOptions.map((option) => (
                    <Pill
                      key={option.value}
                      active={transaction === option.value}
                      onClick={() => setTransaction(option.value)}
                    >
                      {option.label}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Rynek */}
              <div>
                <p className="text-xs font-medium text-foreground-muted mb-2">Rynek</p>
                <div className="flex flex-wrap gap-2">
                  {marketOptions.map((m) => (
                    <Pill
                      key={m.value}
                      active={market === m.value}
                      onClick={() => setMarket(m.value)}
                    >
                      {m.label}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Pokoje */}
              {type !== "dzialka" && (
                <div>
                  <p className="text-xs font-medium text-foreground-muted mb-2">
                    Liczba pokoi
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {roomOptions.map((r) => (
                      <Pill
                        key={r}
                        active={rooms.includes(r)}
                        onClick={() => toggleArr(rooms, r, setRooms)}
                      >
                        {r}
                      </Pill>
                    ))}
                  </div>
                </div>
              )}

              {/* Metraż */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
                <FieldWrap label="Metraż od (m²)" colSpan="md:col-span-3">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={areaMin}
                    onChange={(e) => setAreaMin(e.target.value)}
                    placeholder="0"
                    className="form-input"
                  />
                </FieldWrap>
                <FieldWrap label="Metraż do (m²)" colSpan="md:col-span-3">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={areaMax}
                    onChange={(e) => setAreaMax(e.target.value)}
                    placeholder="bez limitu"
                    className="form-input"
                  />
                </FieldWrap>
                {type === "mieszkanie" && (
                  <>
                    <FieldWrap label="Piętro od" colSpan="md:col-span-2">
                      <input
                        type="number"
                        inputMode="numeric"
                        value={floorMin}
                        onChange={(e) => setFloorMin(e.target.value)}
                        placeholder="0"
                        className="form-input"
                      />
                    </FieldWrap>
                    <FieldWrap label="Piętro do" colSpan="md:col-span-2">
                      <input
                        type="number"
                        inputMode="numeric"
                        value={floorMax}
                        onChange={(e) => setFloorMax(e.target.value)}
                        placeholder="bez limitu"
                        className="form-input"
                      />
                    </FieldWrap>
                  </>
                )}
                <FieldWrap label="Rok bud. od" colSpan="md:col-span-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={yearMin}
                    onChange={(e) => setYearMin(e.target.value)}
                    placeholder="np. 2010"
                    className="form-input"
                  />
                </FieldWrap>
              </div>

              {/* Stan */}
              {type !== "dzialka" && transaction !== "najem" && (
                <div>
                  <p className="text-xs font-medium text-foreground-muted mb-2">Stan</p>
                  <div className="flex flex-wrap gap-2">
                    {stateOptions.map((s) => (
                      <Pill
                        key={s}
                        active={state.includes(s)}
                        onClick={() => toggleArr(state, s, setState)}
                      >
                        {s}
                      </Pill>
                    ))}
                  </div>
                </div>
              )}

              {/* Offer ID */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-end pt-2 border-t border-border">
                <FieldWrap label="Znasz numer oferty?" colSpan="md:col-span-4">
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground-subtle" />
                    <input
                      type="text"
                      value={offerId}
                      onChange={(e) => setOfferId(e.target.value)}
                      placeholder="np. SB12345"
                      className="form-input pl-9"
                    />
                  </div>
                </FieldWrap>
                <p className="md:col-span-8 text-xs text-foreground-subtle pb-3">
                  Podaj numer oferty, jeśli widziałeś ją gdzieś indziej i chcesz przejść
                  od razu do szczegółów.
                </p>
              </div>
            </div>
          )}

          <p className="text-xs text-foreground-subtle mt-4 leading-relaxed">
            Przeszukaj mieszkania, domy, działki i lokale na sprzedaż oraz wynajem w Gdańsku, Gdyni, Sopocie i okolicy. Wyszukiwarka pobiera oferty bezpośrednio z naszego systemu CRM (EstiCRM) i aktualizuje je co godzinę, więc ceny i dostępność są zawsze aktualne.
          </p>
            </form>
          </div>
        </div>
      </Container>

      <style>{`
        .form-input,
        .form-select {
          width: 100%;
          height: 3rem;
          padding: 0 1rem;
          border-radius: 0.75rem;
          background: var(--gray-50);
          border: 1px solid var(--border);
          color: var(--foreground);
          font-size: 0.9rem;
          outline: none;
          transition: all 0.15s ease;
          appearance: none;
          -webkit-appearance: none;
        }
        .form-input::placeholder { color: var(--foreground-subtle); }
        .form-input:focus,
        .form-select:focus {
          background: var(--surface);
          border-color: var(--brand);
          box-shadow: 0 0 0 3px rgba(211, 30, 192, 0.18);
        }
        .form-select {
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23737373' stroke-width='2'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='m6 9 6 6 6-6'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 16px;
          padding-right: 36px;
        }
      `}</style>
    </section>
  );
}

function FieldWrap({
  label,
  colSpan,
  children,
}: {
  label: string;
  colSpan?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", colSpan)}>
      <span className="block text-xs font-medium text-foreground-muted mb-1.5 px-1">
        {label}
      </span>
      {children}
    </label>
  );
}

function Pill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-full text-xs font-medium border transition-all",
        active
          ? "bg-brand text-foreground-on-dark border-brand"
          : "bg-transparent text-foreground border-border hover:border-brand"
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
