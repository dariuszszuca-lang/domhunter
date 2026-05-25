"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <Container size="wide">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-bold text-xl lg:text-2xl tracking-tight text-foreground hover:text-brand transition-colors"
          >
            DomHunter
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    active ? "text-brand" : "text-foreground-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={siteConfig.contact.phones[0].href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-brand text-white hover:bg-brand-hover transition-colors"
            >
              <Phone className="size-4" />
              {siteConfig.contact.phones[0].displayValue}
            </a>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center size-10 rounded-full border border-border"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-6 border-t border-border bg-background">
            <nav className="flex flex-col gap-1 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-3 text-base font-medium text-foreground hover:bg-surface-muted rounded-lg"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={siteConfig.contact.phones[0].href}
                className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold bg-brand text-white"
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
