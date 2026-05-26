import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Contact } from "@/components/sections/contact";
import { MemberPhoto } from "@/components/team/member-photo";
import { getAllMembersSorted } from "@/lib/team";
import { Phone, Mail, ArrowUpRight, Languages, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Zespół DomHunter — agenci nieruchomości w Trójmieście",
  description:
    "Poznaj zespół DomHunter. 8 doświadczonych pośredników nieruchomości w Gdańsku, Gdyni, Sopocie i Pomorskim. Premium, komercja, najem, działki, rynek pierwotny.",
};

export default function ZespolPage() {
  const members = getAllMembersSorted();

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 lg:pt-44 pb-12 lg:pb-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(153,26,117,0.10),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(196,48,119,0.06),transparent_60%)]"
        />
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">
              Zespół
            </p>
            <h1 className="font-sans font-bold text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.025em] text-foreground">
              Ludzie, którzy
              <br />
              <span className="italic text-brand">znają Trójmiasto.</span>
            </h1>
            <p className="mt-7 text-lg lg:text-xl text-foreground-muted leading-[1.55] max-w-2xl">
              8 doświadczonych agentów. Specjalizacje od mieszkań premium w Sopocie, przez komercję
              i rynek pierwotny, po działki rekreacyjne na Mierzei. Lokalna wiedza, świeże podejście.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-brand text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-hover transition-colors"
              >
                Skontaktuj się
                <ArrowUpRight className="size-4" />
              </Link>
              <a
                href="tel:+48530100207"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground hover:border-brand/40 transition-colors"
              >
                <Phone className="size-4" />
                530 100 207
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* BENTO TEAM GRID */}
      <section className="pb-24 lg:pb-32">
        <Container size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 auto-rows-[minmax(240px,auto)]">
            {members.map((member, index) => {
              // Bento sizing: właściciele i indeksy 0/3 większe, reszta mniejsze
              const isLarge = member.isOwner || index === 3;
              const colSpan = isLarge ? "lg:col-span-6" : "lg:col-span-4";
              const rowSpan = isLarge ? "lg:row-span-2" : "";

              return (
                <Link
                  key={member.slug}
                  href={`/zespol/${member.slug}`}
                  className={`group relative overflow-hidden rounded-[28px] bg-surface border border-border shadow-[0_2px_8px_-2px_rgba(25,25,25,0.06)] hover:border-brand/40 hover:shadow-[0_24px_60px_-20px_rgba(153,26,117,0.18)] hover:-translate-y-1 transition-all duration-400 flex flex-col ${colSpan} ${rowSpan}`}
                >
                  <MemberPhoto
                    member={member}
                    sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                    className={isLarge ? "aspect-[5/4] w-full" : "aspect-[4/3] w-full"}
                  />
                  <div className="relative p-6 lg:p-7 flex-1 flex flex-col">
                    {member.shortRole && (
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand mb-2">
                        {member.shortRole}
                      </div>
                    )}
                    <h3 className="font-bold text-xl lg:text-2xl leading-tight tracking-tight text-foreground">
                      {member.fullName}
                    </h3>
                    <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                      {member.role}
                    </p>

                    {member.specializations && member.specializations.length > 0 && (
                      <div className="mt-4 flex items-start gap-2 text-xs text-foreground-subtle">
                        <Briefcase className="size-3.5 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          {member.specializations.join(" · ")}
                        </span>
                      </div>
                    )}

                    {member.languages && member.languages.length > 0 && (
                      <div className="mt-2 flex items-start gap-2 text-xs text-foreground-subtle">
                        <Languages className="size-3.5 shrink-0 mt-0.5" />
                        <span>{member.languages.join(", ")}</span>
                      </div>
                    )}

                    <div className="mt-auto pt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
                      {member.phoneDisplay && (
                        <span className="inline-flex items-center gap-1.5 text-foreground">
                          <Phone className="size-3.5 text-brand" />
                          {member.phoneDisplay}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-brand group-hover:gap-2.5 transition-all">
                        Zobacz profil
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <Contact />
    </>
  );
}
