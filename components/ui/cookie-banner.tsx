"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "dh-cookie-consent";

type View = "hidden" | "banner" | "icon";

export function CookieBanner() {
  const [view, setView] = useState<View>("hidden");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      setView(saved ? "icon" : "banner");
    } catch {
      setView("banner");
    }
  }, []);

  const decide = (value: "accepted" | "essential" | "dismissed") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* brak dostępu do pamięci, pomijamy */
    }
    setView("icon");
  };

  if (view === "hidden") return null;

  if (view === "icon") {
    return (
      <button
        type="button"
        onClick={() => setView("banner")}
        aria-label="Ustawienia plików cookies"
        className="fixed bottom-5 left-5 z-[60] inline-flex size-12 items-center justify-center rounded-full border border-border bg-surface text-brand shadow-[0_14px_30px_-12px] shadow-foreground/40 transition-all hover:-translate-y-0.5 hover:border-brand"
      >
        <Cookie className="size-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 left-5 z-[60] w-[calc(100vw-2.5rem)] max-w-sm rounded-[22px] border border-border bg-surface p-5 shadow-[0_28px_70px_-24px] shadow-foreground/35">
      <button
        type="button"
        onClick={() => decide("dismissed")}
        aria-label="Zamknij"
        className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full text-foreground-subtle transition-colors hover:bg-surface-muted hover:text-foreground"
      >
        <X className="size-4" />
      </button>

      <div className="flex items-start gap-3 pr-6">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Cookie className="size-5" />
        </span>
        <div>
          <p className="font-display text-lg leading-tight text-foreground">Szanujemy Twoją prywatność</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            Używamy plików cookies, żeby strona działała poprawnie i była wygodniejsza w użyciu. Szczegóły znajdziesz w{" "}
            <Link href="/polityka-cookies" className="font-medium text-brand underline underline-offset-2">
              polityce cookies
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => decide("accepted")}
          className="flex-1 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          Akceptuję
        </button>
        <button
          type="button"
          onClick={() => decide("essential")}
          className="flex-1 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand"
        >
          Tylko niezbędne
        </button>
      </div>
    </div>
  );
}
