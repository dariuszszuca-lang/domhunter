"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/container";

const propertyTypes = [
  { value: "wszystkie", label: "Wszystkie" },
  { value: "mieszkanie", label: "Mieszkania" },
  { value: "dom", label: "Domy" },
  { value: "dzialka", label: "Działki" },
  { value: "komercja", label: "Komercja" },
];

const transactions = [
  { value: "wszystkie", label: "Wszystkie" },
  { value: "sprzedaz", label: "Sprzedaż" },
  { value: "najem", label: "Wynajem" },
];

const locations = [
  { value: "wszystkie", label: "Cały Trójmiasto" },
  { value: "gdansk", label: "Gdańsk" },
  { value: "gdynia", label: "Gdynia" },
  { value: "sopot", label: "Sopot" },
];

export function SearchBar() {
  const router = useRouter();
  const [typ, setTyp] = useState("wszystkie");
  const [transakcja, setTransakcja] = useState("wszystkie");
  const [lokalizacja, setLokalizacja] = useState("wszystkie");
  const [cenaMax, setCenaMax] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (typ !== "wszystkie") params.set("typ", typ);
    if (transakcja !== "wszystkie") params.set("transakcja", transakcja);
    if (lokalizacja !== "wszystkie") params.set("lokalizacja", lokalizacja);
    if (cenaMax) params.set("cena_max", cenaMax);
    router.push(`/oferty?${params.toString()}`);
  }

  return (
    <section className="pb-16 lg:pb-20">
      <Container size="wide">
        <form
          onSubmit={handleSearch}
          className="bg-surface rounded-2xl border border-border shadow-soft p-5 lg:p-7"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
            <Select label="Typ nieruchomości" value={typ} options={propertyTypes} onChange={setTyp} />
            <Select label="Transakcja" value={transakcja} options={transactions} onChange={setTransakcja} />
            <Select label="Lokalizacja" value={lokalizacja} options={locations} onChange={setLokalizacja} />
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle">
                Cena do (zł)
              </label>
              <input
                type="number"
                value={cenaMax}
                onChange={(e) => setCenaMax(e.target.value)}
                placeholder="np. 800 000"
                className="h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-transparent select-none">
                Szukaj
              </label>
              <button
                type="submit"
                className="h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand-hover transition"
              >
                <Search className="size-4" />
                Szukaj
              </button>
            </div>
          </div>
        </form>
      </Container>
    </section>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition appearance-none cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
