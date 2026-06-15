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
  { label: "Nasz zespół", href: "/o-nas" },
  { label: "Kontakt", href: "/kontakt" },
];

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/DomHunterPolska/", Icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/domhunter_nieruchomosci/", Icon: InstagramIcon },
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

          {/* Social + CTA telefon */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <Icon className="size-[18px]" />
              </a>
            ))}
            <a
              href="tel:+48571309209"
              className="inline-flex items-center gap-2 rounded-full bg-brand text-white pl-4 pr-5 py-2.5 text-sm font-semibold hover:bg-brand-hover transition-colors"
            >
              <Phone className="size-3.5" />
              571 309 209
            </a>
          </div>

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
              <div className="mt-3 flex items-center justify-center gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
