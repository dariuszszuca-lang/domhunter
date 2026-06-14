import Link from "next/link";
import { Container } from "@/components/ui/container";
import { MemberPhoto } from "@/components/team/member-photo";
import { getAllMembersSorted } from "@/lib/team";
import { ArrowUpRight, Phone } from "lucide-react";

export function TeamBento() {
  const members = getAllMembersSorted().slice(0, 5);

  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-4">
              Nasz zespół
            </p>
            <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
              Ludzie z Trójmiasta,
              <br />
              <span className="italic text-brand">a nie z portali.</span>
            </h2>
            <p className="mt-5 text-base lg:text-lg text-foreground-muted leading-relaxed">
              Agenci z Trójmiasta. Każdy zna swój rejon lepiej niż Google Maps i prowadzi Cię
              osobiście od pierwszego telefonu po klucze.
            </p>
          </div>
          <Link
            href="/zespol"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground hover:border-brand/40 hover:bg-brand/5 transition-all shrink-0"
          >
            Cały zespół
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* Bento grid: 1 large + 4 small */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 auto-rows-[minmax(240px,auto)]">
          {members.map((member, index) => {
            const isFeatured = index === 0;
            const colSpan = isFeatured ? "lg:col-span-6 lg:row-span-2" : "lg:col-span-3";

            return (
              <Link
                key={member.slug}
                href={`/zespol/${member.slug}`}
                className={`group relative overflow-hidden rounded-[28px] bg-surface border border-border shadow-[0_2px_8px_-2px_rgba(25,25,25,0.06)] hover:border-brand/40 hover:shadow-[0_24px_60px_-20px_rgba(153,26,117,0.18)] hover:-translate-y-1 transition-all duration-400 flex flex-col ${colSpan}`}
              >
                <MemberPhoto
                  member={member}
                  sizes={isFeatured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                  className={isFeatured ? "aspect-[4/3] lg:aspect-[5/4] w-full" : "aspect-[4/3] w-full"}
                />
                <div className="relative p-5 lg:p-6 flex-1 flex flex-col">
                  {member.shortRole && (
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand mb-1.5">
                      {member.shortRole}
                    </div>
                  )}
                  <h3 className={`font-display font-normal leading-tight tracking-tight text-foreground ${isFeatured ? "text-2xl lg:text-3xl" : "text-lg"}`}>
                    {member.fullName}
                  </h3>
                  <p className={`mt-1.5 text-foreground-muted leading-relaxed ${isFeatured ? "text-base" : "text-xs"}`}>
                    {member.role}
                  </p>
                  {isFeatured && member.specializations && (
                    <p className="mt-3 text-sm text-foreground-subtle leading-relaxed">
                      {member.specializations.join(" · ")}
                    </p>
                  )}
                  <div className="mt-auto pt-4 flex items-center justify-between text-xs font-medium">
                    {member.phoneDisplay ? (
                      <span className="inline-flex items-center gap-1.5 text-foreground">
                        <Phone className="size-3 text-brand" />
                        {member.phoneDisplay}
                      </span>
                    ) : <span />}
                    <span className="inline-flex items-center gap-1 text-brand group-hover:gap-2 transition-all">
                      Profil
                      <ArrowUpRight className="size-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
