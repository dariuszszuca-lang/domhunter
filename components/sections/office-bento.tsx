import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowUpRight, MapPin, Phone, Mail, Clock, Coffee, Building } from "lucide-react";

export function OfficeBento() {
  return (
    <section className="py-20 lg:py-28 bg-surface-cream">
      <Container size="wide">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-4">
            Nasze biuro
          </p>
          <h2 className="font-sans font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.04] tracking-[-0.02em] text-foreground">
            Wpadnij na kawę.
            <br />
            <span className="italic text-brand">Gdańsk Wrzeszcz.</span>
          </h2>
          <p className="mt-5 text-base lg:text-lg text-foreground-muted leading-relaxed">
            Nowoczesna przestrzeń w sercu Wrzeszcza. Świeżo, jasno, bez korpo. Spotkania
            na osobnym piętrze, kawa z lokalnej palarni, sala konferencyjna dla 8 osób.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 auto-rows-[minmax(180px,auto)]">
          {/* DUŻY: foto biura (placeholder gradient) */}
          <div className="relative overflow-hidden rounded-[28px] lg:col-span-7 lg:row-span-2 aspect-[16/10] lg:aspect-auto bg-gradient-to-br from-[#3a3530] via-[#56463a] to-[#7a604c] flex items-center justify-center">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(153,26,117,0.20),transparent_55%)]"
            />
            <div className="relative text-center px-6">
              <Building className="size-12 lg:size-16 text-white/80 mx-auto mb-4" />
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">
                Zdjęcie biura
              </p>
              <p className="text-xl lg:text-2xl font-bold text-white/90 tracking-tight">
                Wnętrze, recepcja,<br />sala spotkań
              </p>
              <p className="mt-3 text-xs text-white/50">
                placeholder · podmień na realne zdjęcia
              </p>
            </div>
          </div>

          {/* Adres */}
          <div className="relative overflow-hidden rounded-[28px] lg:col-span-5 bg-surface border border-border p-6 lg:p-7 flex flex-col">
            <div className="size-10 rounded-xl bg-brand/15 text-brand flex items-center justify-center mb-4">
              <MapPin className="size-5" strokeWidth={2.2} />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand mb-2">
              Adres
            </div>
            <p className="text-lg lg:text-xl font-bold text-foreground leading-snug">
              ul. Grunwaldzka 82
              <br />
              80-244 Gdańsk Wrzeszcz
            </p>
            <a
              href="https://maps.google.com/?q=Grunwaldzka+82+Gdańsk"
              target="_blank"
              rel="noopener"
              className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all"
            >
              Otwórz w Mapach
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          {/* Telefon */}
          <div className="relative overflow-hidden rounded-[28px] lg:col-span-3 bg-surface border border-border p-6 flex flex-col">
            <div className="size-10 rounded-xl bg-brand/15 text-brand flex items-center justify-center mb-4">
              <Phone className="size-5" strokeWidth={2.2} />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand mb-2">
              Telefon
            </div>
            <a href="tel:+48530100207" className="text-lg font-bold text-foreground hover:text-brand transition-colors">
              530 100 207
            </a>
            <p className="mt-1 text-xs text-foreground-subtle">SMS, WhatsApp OK</p>
          </div>

          {/* Email */}
          <div className="relative overflow-hidden rounded-[28px] lg:col-span-2 bg-brand/[0.08] border border-brand/25 p-6 flex flex-col">
            <div className="size-10 rounded-xl bg-brand/25 text-brand flex items-center justify-center mb-4">
              <Mail className="size-5" strokeWidth={2.2} />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand mb-2">
              Email
            </div>
            <a href="mailto:biuro@domhunter.pl" className="text-sm font-bold text-foreground hover:text-brand transition-colors break-all">
              biuro@domhunter.pl
            </a>
          </div>

          {/* Godziny */}
          <div className="relative overflow-hidden rounded-[28px] lg:col-span-4 bg-surface border border-border p-6 flex flex-col">
            <div className="size-10 rounded-xl bg-brand/15 text-brand flex items-center justify-center mb-4">
              <Clock className="size-5" strokeWidth={2.2} />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand mb-2">
              Godziny
            </div>
            <div className="text-sm leading-relaxed text-foreground space-y-1">
              <div className="flex justify-between gap-3">
                <span className="text-foreground-muted">pon. — pt.</span>
                <span className="font-semibold">9:00 — 18:00</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-foreground-muted">sobota</span>
                <span className="font-semibold">10:00 — 14:00</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-foreground-muted">niedziela</span>
                <span className="font-semibold text-foreground-subtle">na umówienie</span>
              </div>
            </div>
          </div>

          {/* Coffee invitation */}
          <div className="relative overflow-hidden rounded-[28px] lg:col-span-3 bg-foreground text-white p-6 flex flex-col">
            <div className="size-10 rounded-xl bg-white/15 text-white flex items-center justify-center mb-4">
              <Coffee className="size-5" strokeWidth={2.2} />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60 mb-2">
              Zapraszamy
            </div>
            <p className="text-base font-semibold leading-snug">
              Pierwsza kawa
              <br />
              <span className="text-brand-soft">na nasz koszt.</span>
            </p>
            <Link
              href="/kontakt"
              className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:gap-3 transition-all"
            >
              Umów spotkanie
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
