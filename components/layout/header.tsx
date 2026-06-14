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
  { label: "Kup", href: "/oferty?typ=sprzedaz" },
  { label: "Wynajmij", href: "/oferty?typ=wynajem" },
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
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-border shadow-[0_6px_24px_-16px_rgba(20,21,21,0.5)]"
          : "bg-background/70 backdrop-blur-md border-border/50"
      )}
    >
      <Container size="wide">
        <div className="flex h-[68px] lg:h-[76px] items-center justify-between gap-4">
          {/* Logo → strona główna */}
          <Link href="/" className="inline-flex items-center shrink-0" aria-label="Dom Hunter Nieruchomości — strona główna">
            <Image
              src="/images/logo/dom-hunter-bez-sygnetu.png"
              alt="Dom Hunter Nieruchomości"
              width={210}
              height={44}
              priority
              className="h-7 lg:h-9 w-auto"
            />
          </Link>

          {/* Nav desktop — editorial, podkreślenie na hover */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative text-[0.92rem] tracking-[0.005em] py-1 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-brand after:transition-all after:duration-300",
                    active
                      ? "text-foreground after:w-full"
                      : "text-foreground-muted hover:text-foreground after:w-0 hover:after:w-full"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA telefon */}
          <a
            href={siteConfig.contact.phones[0].href}
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-brand text-white pl-4 pr-5 py-2.5 text-sm font-semibold hover:bg-brand-hover transition-colors shrink-0"
          >
            <Phone className="size-3.5" />
            {siteConfig.contact.phones[0].displayValue}
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
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col gap-1 rounded-2xl border border-border bg-surface/95 backdrop-blur-xl p-3 shadow-[0_12px_32px_-12px_rgba(20,21,21,0.25)]">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-base transition-colors",
                      active ? "bg-foreground text-background" : "text-foreground hover:bg-surface-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href={siteConfig.contact.phones[0].href}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand text-white px-4 py-3.5 text-sm font-semibold hover:bg-brand-hover transition-colors"
              >
                <Phone className="size-4" />
                {siteConfig.contact.phones[0].displayValue}
              </a>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
