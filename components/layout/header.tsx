"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Oferty", href: "/oferty" },
  { label: "Komercja", href: "/komercja" },
  { label: "O nas", href: "/o-nas" },
  { label: "Zespół", href: "/zespol" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <Container size="wide" className="pt-4 lg:pt-6">
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-3 rounded-full transition-all duration-300 border",
            scrolled
              ? "bg-background/85 backdrop-blur-xl border-border shadow-[0_8px_32px_-8px_rgba(25,25,25,0.12)] px-4 lg:px-5 py-2 lg:py-2.5"
              : "bg-background/70 backdrop-blur-md border-border/60 px-4 lg:px-5 py-2.5 lg:py-3"
          )}
        >
          {/* Logo: custom mark */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-foreground"
          >
            <span className="relative inline-flex size-9 lg:size-10 items-center justify-center rounded-full bg-foreground text-background transition-colors group-hover:bg-brand">
              <span className="font-sans text-[15px] lg:text-base font-bold tracking-tighter">
                D
              </span>
              <span
                aria-hidden
                className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-brand group-hover:bg-white transition-colors"
              />
            </span>
            <span className="font-sans text-base lg:text-lg font-bold tracking-tight">
              <span className="text-foreground">Dom</span>
              <span className="text-brand">Hunter</span>
            </span>
          </Link>

          {/* Nav desktop - pill links */}
          <nav className="hidden lg:flex items-center gap-1 mx-2">
            {navItems.map((item) => {
              const active =
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-all",
                    active
                      ? "bg-foreground text-background"
                      : "text-foreground-muted hover:text-foreground hover:bg-surface"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA desktop */}
          <a
            href={siteConfig.contact.phones[0].href}
            className="hidden lg:inline-flex group items-center gap-2.5 rounded-full bg-brand text-white pl-4 pr-1.5 py-1.5 text-sm font-semibold hover:bg-brand-hover transition-all"
          >
            <Phone className="size-3.5" />
            <span className="hidden xl:inline">{siteConfig.contact.phones[0].displayValue}</span>
            <span className="xl:hidden">Zadzwoń</span>
            <span className="inline-flex items-center justify-center size-7 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:rotate-12 transition-all">
              <ArrowUpRight className="size-3.5" />
            </span>
          </a>

          {/* Mobile burger */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center size-9 rounded-full bg-foreground text-background hover:bg-brand transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {/* Mobile menu - rozwijany pod barem */}
        {mobileOpen && (
          <div className="pointer-events-auto lg:hidden mt-2 rounded-[24px] border border-border bg-background/95 backdrop-blur-xl shadow-[0_12px_32px_-12px_rgba(25,25,25,0.18)] p-3">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active =
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-2xl text-base font-medium transition-colors",
                      active
                        ? "bg-foreground text-background"
                        : "text-foreground hover:bg-surface-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href={siteConfig.contact.phones[0].href}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand text-white px-4 py-3.5 text-sm font-semibold hover:bg-brand-hover transition-colors"
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
