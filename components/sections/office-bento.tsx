import { Container } from "@/components/ui/container";
import { ArrowUpRight, MapPin, Phone, Mail, Clock } from "lucide-react";

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
            <span className="italic text-brand">Gdańsk Wrzeszcz.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-muted lg:text-lg">
            Nowoczesna przestrzeń w sercu Wrzeszcza. Świeżo, jasno, bez korpo. Pierwsza kawa
            na nasz koszt.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Mapa */}
          <div className="overflow-hidden rounded-[28px] border border-border bg-surface">
            <iframe
              title="Mapa — Dom Hunter, Grunwaldzka 82, Gdańsk Wrzeszcz"
              src="https://www.google.com/maps?q=Grunwaldzka%2082%20Gda%C5%84sk&output=embed"
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
                ul. Grunwaldzka 82
                <br />
                80-244 Gdańsk Wrzeszcz
              </p>
              <a
                href="https://maps.google.com/?q=Grunwaldzka+82+Gda%C5%84sk"
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
                href="tel:+48530100207"
                className="font-display text-xl font-normal text-foreground transition-colors hover:text-brand"
              >
                530 100 207
              </a>
              <p className="mt-1 text-xs text-foreground-subtle">SMS, WhatsApp OK</p>
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
                href="mailto:biuro@domhunter.pl"
                className="break-all font-display text-lg font-normal text-foreground transition-colors hover:text-brand"
              >
                biuro@domhunter.pl
              </a>
            </div>

            {/* Godziny */}
            <div className="flex flex-col rounded-[28px] border border-border bg-surface p-6 sm:col-span-2">
              <span className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <Clock className="size-5" strokeWidth={2} />
              </span>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                Godziny otwarcia
              </p>
              <div className="space-y-1.5 text-sm text-foreground">
                <div className="flex justify-between gap-3">
                  <span className="text-foreground-muted">poniedziałek – piątek</span>
                  <span className="font-semibold">9:00 – 18:00</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-foreground-muted">sobota</span>
                  <span className="font-semibold">10:00 – 14:00</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-foreground-muted">niedziela</span>
                  <span className="font-semibold text-foreground-subtle">na umówienie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
