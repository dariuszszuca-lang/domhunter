import { Container } from "@/components/ui/container";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";

export function OfficeBento() {
  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="mb-12 max-w-2xl lg:mb-16">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Nasze biuro
          </p>
          <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
            Wpadnij na kawę.
            <br />
            <span className="italic text-brand">Gdańsk, Jana Pawła II.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-muted lg:text-lg">
            Jasna, nowoczesna przestrzeń w Gdańsku. Świeżo, na luzie, bez korporacyjnej sztywności.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Mapa */}
          <div className="overflow-hidden rounded-[28px] border border-border bg-surface">
            <iframe
              title="Mapa, Dom Hunter, ul. Jana Pawła II 6e, Gdańsk"
              src="https://www.google.com/maps?q=Jana%20Paw%C5%82a%20II%206e%20Gda%C5%84sk&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full lg:h-full lg:min-h-[460px]"
            />
          </div>

          {/* Karty informacyjne */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Adres */}
            <div className="flex flex-col rounded-[28px] border border-border bg-surface p-6 sm:col-span-2 lg:p-7">
              <span className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <MapPin className="size-5" strokeWidth={2} />
              </span>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                Adres
              </p>
              <p className="font-display text-xl font-normal leading-snug text-foreground">
                ul. Jana Pawła II 6e/5
                <br />
                80-462 Gdańsk
              </p>
              <a
                href="https://maps.google.com/?q=Jana+Paw%C5%82a+II+6e+Gda%C5%84sk"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all hover:gap-3"
              >
                Otwórz w Mapach
                <ArrowUpRight className="size-4" />
              </a>
            </div>

            {/* Telefon */}
            <div className="flex flex-col rounded-[28px] border border-border bg-surface p-6">
              <span className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <Phone className="size-5" strokeWidth={2} />
              </span>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                Telefon
              </p>
              <a
                href="tel:+48571309209"
                className="font-display text-xl font-normal text-foreground transition-colors hover:text-brand"
              >
                571 309 209
              </a>
              <p className="mt-1 text-xs text-foreground-subtle">Sylwia Wróblewska</p>
            </div>

            {/* Email */}
            <div className="flex flex-col rounded-[28px] border border-border bg-surface p-6">
              <span className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <Mail className="size-5" strokeWidth={2} />
              </span>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                E-mail
              </p>
              <a
                href="mailto:kontakt@domhunter.pl"
                className="break-all font-display text-lg font-normal text-foreground transition-colors hover:text-brand"
              >
                kontakt@domhunter.pl
              </a>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
