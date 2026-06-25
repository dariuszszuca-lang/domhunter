import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { team, getMemberBySlug } from "@/lib/team";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getMemberBySlug(slug);
  if (!m) return { title: "Agent, Dom Hunter" };
  return {
    title: `${m.fullName}, ${m.role} — Dom Hunter`,
    description: m.bio,
    alternates: { canonical: `${siteConfig.url}/zespol/${m.slug}` },
  };
}

export default async function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) notFound();

  return (
    <div className="pt-10 lg:pt-16">
      <section className="py-12 lg:py-20">
        <Container size="wide">
          <Link
            href="/o-nas#zespol"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-foreground-muted transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-4" />
            Nasz zespół
          </Link>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-14">
            {/* Zdjęcie */}
            <div className="overflow-hidden rounded-[28px] border border-border bg-surface">
              <div className="relative aspect-[4/5] w-full">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.fullName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 360px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-brand-light font-display text-6xl text-brand">
                    {member.firstName[0]}
                    {member.lastName[0]}
                  </div>
                )}
              </div>
            </div>

            {/* Treść */}
            <div className="flex flex-col">
              {member.isOwner && (
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                  Właścicielka biura
                </p>
              )}
              <h1 className="font-display font-normal text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.04] tracking-[-0.01em] text-foreground">
                {member.fullName}
              </h1>
              <p className="mt-3 text-lg text-foreground-muted">{member.role}</p>

              <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-foreground-muted lg:text-base">
                {member.bioParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {(member.specializations?.length || member.languages?.length) && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {member.specializations?.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-foreground-muted"
                    >
                      {s}
                    </span>
                  ))}
                  {member.languages?.map((l) => (
                    <span
                      key={l}
                      className="rounded-full bg-brand-light px-3.5 py-1.5 text-sm text-brand"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              )}

              {/* Kontakt */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-4 rounded-[20px] border border-border bg-surface p-5 transition-colors hover:border-brand"
                  >
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <Phone className="size-5" strokeWidth={2} />
                    </span>
                    <span>
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-subtle">
                        Telefon
                      </span>
                      <span className="font-display text-lg text-foreground">
                        {member.phoneDisplay ?? member.phone}
                      </span>
                    </span>
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-4 rounded-[20px] border border-border bg-surface p-5 transition-colors hover:border-brand"
                  >
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <Mail className="size-5" strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-subtle">
                        E-mail
                      </span>
                      <span className="block truncate font-display text-lg text-foreground">
                        {member.email}
                      </span>
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
