import Link from "next/link";
import { Container } from "@/components/ui/container";
import { MemberPhoto } from "@/components/team/member-photo";
import { getAllMembersSorted } from "@/lib/team";
import { ArrowUpRight, Phone } from "lucide-react";

export function TeamBento() {
  const members = getAllMembersSorted();

  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Nasz zespół
            </p>
            <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
              Ludzie, którym możesz
              <br />
              <span className="italic text-brand">zaufać.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-muted lg:text-lg">
              Doświadczeni agenci z Trójmiasta, każdy ze swoją specjalizacją i rejonem.
              Kliknij agenta, żeby poznać go bliżej i zobaczyć dane kontaktowe.
            </p>
          </div>
          <Link
            href="/o-nas#zespol"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-brand/40 hover:bg-brand/5"
          >
            Cały zespół
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* Grid 3 x 2 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {members.map((member) => (
            <Link
              key={member.slug}
              href={`/zespol/${member.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-[28px] border border-border bg-surface text-left shadow-[0_2px_8px_-2px_rgba(20,21,21,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_28px_64px_-26px_rgba(20,21,21,0.4)]"
            >
              <MemberPhoto
                member={member}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[4/5] w-full"
              />
              <div className="relative flex flex-1 flex-col p-5 lg:p-6">
                <h3 className="font-display text-xl font-normal leading-tight text-foreground">
                  {member.fullName}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                  {member.role}
                </p>
                {member.specializations && member.specializations.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {member.specializations.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-brand-light px-2.5 py-1 text-[11px] font-medium text-brand"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto flex items-center justify-between pt-5 text-xs font-medium">
                  {member.phoneDisplay ? (
                    <span className="inline-flex items-center gap-1.5 text-foreground">
                      <Phone className="size-3 text-brand" />
                      {member.phoneDisplay}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="inline-flex items-center gap-1 text-brand transition-all group-hover:gap-2">
                    Poznaj
                    <ArrowUpRight className="size-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
