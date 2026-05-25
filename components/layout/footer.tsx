import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

const footerNav = {
  oferta: [
    { label: "Wszystkie oferty", href: "/oferty" },
    { label: "Mieszkania", href: "/oferty?typ=mieszkanie" },
    { label: "Domy", href: "/oferty?typ=dom" },
    { label: "Działki", href: "/oferty?typ=dzialka" },
    { label: "Komercja", href: "/komercja" },
  ],
  firma: [
    { label: "O nas", href: "/o-nas" },
    { label: "Zespół", href: "/zespol" },
    { label: "Darmowa wycena", href: "/wycena" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  formalne: [
    { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
    { label: "Polityka cookies", href: "/polityka-cookies" },
    { label: "Regulamin", href: "/regulamin" },
  ],
};

export function Footer() {
  return (
    <footer className="mt-24 bg-surface-cream border-t border-border">
      <Container size="wide">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-10 gap-x-8 py-16 lg:py-20">
          {/* Brand + opis */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="font-display text-2xl tracking-tight text-foreground">
              {siteConfig.name}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted max-w-xs">
              {siteConfig.tagline}. Sprzedaż, kupno, wynajem i komercja w Trójmieście i okolicach.
            </p>

            {siteConfig.partners.nsl.url && (
              <Link
                href={siteConfig.partners.nsl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-xs uppercase tracking-[0.18em] text-brand font-semibold hover:text-brand-deep transition-colors"
              >
                Partner: {siteConfig.partners.nsl.name} →
              </Link>
            )}
          </div>

          {/* Oferta */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground mb-4">Oferta</h4>
            <ul className="space-y-2.5">
              {footerNav.oferta.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="text-sm text-foreground-muted hover:text-brand transition-colors">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Firma */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground mb-4">Firma</h4>
            <ul className="space-y-2.5">
              {footerNav.firma.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="text-sm text-foreground-muted hover:text-brand transition-colors">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div className="col-span-2 md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.contact.phones[0].href}
                  className="inline-flex items-center gap-3 text-sm text-foreground hover:text-brand transition-colors"
                >
                  <Phone className="size-4 text-brand" />
                  {siteConfig.contact.phones[0].displayValue}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-3 text-sm text-foreground hover:text-brand transition-colors break-all"
                >
                  <Mail className="size-4 text-brand" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground-muted">
                <MapPin className="size-4 text-brand" />
                {siteConfig.address.city}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-foreground-subtle">
            © {new Date().getFullYear()} {siteConfig.name}. Wszystkie prawa zastrzeżone.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            {footerNav.formalne.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-foreground-subtle hover:text-foreground transition-colors">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
