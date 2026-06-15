/* Hallmark redesign · statement footer (był: 4-col SaaS footer)
 * statement Marcellus + prominentny kontakt + linki organicznie */
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
    { label: "Nasz zespół", href: "/o-nas" },
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
        {/* Statement + kontakt */}
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
          {/* Lewa: statement */}
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold tracking-wide text-brand">
              {siteConfig.name} · Nieruchomości
            </p>
            <p className="mt-4 max-w-xl font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.06] text-foreground">
              Porozmawiajmy o Twojej nieruchomości.
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-foreground-muted">
              {siteConfig.tagline}. Sprzedaż, kupno, wynajem i komercja w Trójmieście i okolicach.
            </p>
            {siteConfig.partners.nsl.url && (
              <Link
                href={siteConfig.partners.nsl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-block text-xs font-semibold uppercase tracking-wide text-foreground hover:text-brand transition-colors"
              >
                Partner: {siteConfig.partners.nsl.name} →
              </Link>
            )}
          </div>

          {/* Prawa: kontakt prominentny + nawigacja */}
          <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-border">
            <a
              href="tel:+48571309209"
              className="group inline-flex items-center gap-3 font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-none text-foreground hover:text-brand transition-colors"
            >
              <Phone className="size-6 text-brand" strokeWidth={1.8} />
              571 309 209
            </a>
            <p className="mt-2.5 text-sm text-foreground-muted">
              Sylwia Wróblewska · {siteConfig.name}
            </p>
            <div className="mt-5 space-y-3">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-sm text-foreground hover:text-brand transition-colors break-all"
              >
                <Mail className="size-4 text-brand" />
                {siteConfig.contact.email}
              </a>
              <p className="flex items-center gap-3 text-sm text-foreground-muted">
                <MapPin className="size-4 text-brand" />
                {siteConfig.address.city}
              </p>
            </div>

            {/* Nawigacja — dwie zwarte grupy, nie sztywne kolumny SaaS */}
            <div className="mt-9 flex flex-wrap gap-x-12 gap-y-6">
              <nav className="flex flex-col gap-2.5">
                {footerNav.oferta.map((i) => (
                  <Link key={i.href} href={i.href} className="text-sm text-foreground-muted hover:text-brand transition-colors">
                    {i.label}
                  </Link>
                ))}
              </nav>
              <nav className="flex flex-col gap-2.5">
                {footerNav.firma.map((i) => (
                  <Link key={i.href} href={i.href} className="text-sm text-foreground-muted hover:text-brand transition-colors">
                    {i.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Dolny pas */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-border py-6 md:flex-row md:items-center">
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
