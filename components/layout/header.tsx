"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

// Jednolite menu — identyczne na każdej podstronie. Bez "Home" (logo wraca na główną).
const navItems = [
  { label: "Kup", href: "/oferty?transakcja=sprzedaz" },
  { label: "Wynajmij", href: "/oferty?transakcja=najem" },
  { label: "Komercja", href: "/komercja" },
  { label: "Wycena", href: "/wycena" },
  { label: "O firmie", href: "/o-nas" },
  { label: "Kredyty", href: "/kredyty" },
  { label: "Praca", href: "/praca" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    const base = href.split("?")[0];
    return base !== "/" && pathname.startsWith(base);
  };

  return (
    <header className="relative z-50">
      <Container size="wide" className="pt-3 lg:pt-4">
        <div
          className={cn(
            "flex items-center justify-between gap-2 rounded-full border transition-all duration-300",
            scrolled
              ? "bg-surface/85 backdrop-blur-xl border-border shadow-[0_10px_34px_-16px_rgba(20,21,21,0.45)] px-3 lg:px-4 py-2"
              : "bg-surface/70 backdrop-blur-md border-border/60 px-3 lg:px-4 py-2.5"
          )}
        >
          {/* Logo → strona główna */}
          <Link
            href="/"
            className="inline-flex items-center shrink-0 pl-1.5"
            aria-label="Dom Hunter Nieruchomości — strona główna"
          >
            <Image
              src="/images/logo/dom-hunter-bez-sygnetu.png"
              alt="Dom Hunter Nieruchomości"
              width={235}
              height={80}
              priority
              className="h-10 lg:h-12 w-auto"
            />
          </Link>

          {/* Nav desktop — pigułki */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[0.875rem] font-medium transition-colors",
                    active
                      ? "bg-brand/10 text-brand"
                      : "text-foreground-muted hover:text-foreground hover:bg-foreground/[0.05]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA telefon */}
          <a
            href="tel:+48571309209"
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-brand text-white pl-4 pr-5 py-2.5 text-sm font-semibold hover:bg-brand-hover transition-colors shrink-0"
          >
            <Phone className="size-3.5" />
            571 309 209
          </a>

          {/* Mobile burger */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center size-10 rounded-full bg-foreground text-background hover:bg-brand transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 rounded-3xl border border-border bg-surface/95 backdrop-blur-xl p-3 shadow-[0_12px_32px_-12px_rgba(20,21,21,0.25)]">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-2xl text-base transition-colors",
                      active ? "bg-brand/10 text-brand font-medium" : "text-foreground hover:bg-surface-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href="tel:+48571309209"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand text-white px-4 py-3.5 text-sm font-semibold hover:bg-brand-hover transition-colors"
              >
                <Phone className="size-4" />
                571 309 209
              </a>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
