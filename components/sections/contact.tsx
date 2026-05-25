import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function Contact() {
  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand mb-4">
              Kontakt
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-foreground">
              Porozmawiajmy o Twojej nieruchomości.
            </h2>
            <p className="mt-5 text-lg text-foreground-muted leading-relaxed max-w-xl">
              Bezpłatna rozmowa, bez zobowiązań. Słuchamy najpierw, potem ustalamy plan działania.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={siteConfig.contact.phones[0].href}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand text-white text-sm font-semibold hover:bg-brand-hover transition"
              >
                <Phone className="size-4" />
                Zadzwoń teraz
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border-strong text-foreground text-sm font-semibold hover:bg-surface-muted hover:border-foreground transition"
              >
                Formularz kontaktowy
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="bg-surface-cream rounded-2xl p-8 lg:p-10 space-y-6">
            <ContactRow icon={Phone} label="Telefon" value={siteConfig.contact.phones[0].displayValue} href={siteConfig.contact.phones[0].href} />
            <ContactRow icon={Mail} label="E-mail" value={siteConfig.contact.email} href={`mailto:${siteConfig.contact.email}`} />
            <ContactRow icon={MapPin} label="Lokalizacja" value={siteConfig.address.city} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="inline-flex items-center justify-center size-11 rounded-xl bg-brand text-white shrink-0">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-subtle mb-1">{label}</p>
        <p className="text-lg text-foreground">{value}</p>
      </div>
    </>
  );
  return href ? (
    <a href={href} className="flex items-center gap-4 hover:opacity-85 transition">
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-4">{content}</div>
  );
}
