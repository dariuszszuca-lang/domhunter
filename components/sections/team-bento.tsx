"use client";

import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { MemberPhoto } from "@/components/team/member-photo";
import { motion } from "framer-motion";
import { getAllMembersSorted, type TeamMember } from "@/lib/team";
import { ArrowUpRight, Phone, Mail, X } from "lucide-react";

export function TeamBento() {
  const members = getAllMembersSorted().slice(0, 5);
  const [active, setActive] = useState<TeamMember | null>(null);

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
              Doświadczeni agenci z Trójmiasta, każdy ze swoją specjalizacją i rejonem. Kliknij
              agenta, żeby poznać go bliżej i zobaczyć dane kontaktowe.
            </p>
          </div>
          <Link
            href="/zespol"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-brand/40 hover:bg-brand/5"
          >
            Cały zespół
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* Bento: 1 duża + 4 mniejsze */}
        <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {members.map((member, index) => {
            const isFeatured = index === 0;
            const colSpan = isFeatured ? "lg:col-span-6 lg:row-span-2" : "lg:col-span-3";

            return (
              <button
                key={member.slug}
                type="button"
                onClick={() => setActive(member)}
                className={`group relative flex flex-col overflow-hidden rounded-[28px] border border-border bg-surface text-left shadow-[0_2px_8px_-2px_rgba(20,21,21,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_28px_64px_-26px_rgba(20,21,21,0.4)] ${colSpan}`}
              >
                <MemberPhoto
                  member={member}
                  sizes={isFeatured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                  className={isFeatured ? "aspect-[4/3] w-full lg:aspect-[5/4]" : "aspect-[4/3] w-full"}
                />
                <div className="relative flex flex-1 flex-col p-5 lg:p-6">
                  <h3
                    className={`font-display font-normal leading-tight text-foreground ${
                      isFeatured ? "text-2xl lg:text-[2rem]" : "text-lg"
                    }`}
                  >
                    {member.fullName}
                  </h3>
                  <p className={`mt-1.5 leading-relaxed text-foreground-muted ${isFeatured ? "text-base" : "text-xs"}`}>
                    {member.role}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 text-xs font-medium">
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
              </button>
            );
          })}
        </div>
      </Container>

      {active && <AgentModal member={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function AgentModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const telHref = member.phone ? `tel:${member.phone.replace(/\s/g, "")}` : undefined;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[32px] border border-border bg-surface shadow-[0_50px_140px_-40px_rgba(20,21,21,0.45)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Zamknij"
          className="absolute right-4 top-4 z-20 inline-flex size-10 items-center justify-center rounded-full bg-surface/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-brand hover:text-white"
        >
          <X className="size-4" />
        </button>

        <div className="grid sm:grid-cols-[44%_1fr]">
          <div className="relative bg-surface-muted">
            <MemberPhoto
              member={member}
              sizes="360px"
              className="aspect-[4/5] w-full sm:h-full sm:aspect-auto"
            />
          </div>

          <div className="flex flex-col p-7 lg:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              Pośrednik Dom Hunter
            </p>
            <h3 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-normal leading-[1.05] text-foreground">
              {member.fullName}
            </h3>
            <p className="mt-1 text-sm text-foreground-muted">{member.role}</p>

            <div className="my-6 h-px w-full bg-border" />

            <div className="space-y-3 text-[0.95rem] leading-relaxed text-foreground-muted">
              {member.bioParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-7 space-y-2.5">
              {telHref && (
                <a
                  href={telHref}
                  className="flex items-center gap-3 rounded-2xl bg-brand px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
                >
                  <Phone className="size-4" />
                  Zadzwoń: {member.phoneDisplay ?? member.phone}
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-3 break-all rounded-2xl border border-border px-5 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  <Mail className="size-4 shrink-0 text-brand" />
                  {member.email}
                </a>
              )}
            </div>

            <Link
              href={`/zespol/${member.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-all hover:gap-2.5"
            >
              Pełny profil
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
