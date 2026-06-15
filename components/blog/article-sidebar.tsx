import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Phone, MapPin, ScrollText } from "lucide-react";
import { siteConfig } from "@/lib/site";
import type { BlogPost } from "@/lib/blog";

type ArticleSidebarProps = {
  /** Inne wpisy do sekcji "Polecane wpisy" (bez bieżącego artykułu). */
  relatedPosts: BlogPost[];
};

// Agentka prowadząca klienta, spójna z opiniami i resztą strony.
const agent = { name: "Sylwia Wróblewska", phoneHref: "tel:+48571309209", phone: "571 309 209" };

// Krótka lista odnośników do głównych podstron (tylko istniejące trasy).
const uslugi = [
  { label: "Bezpłatna wycena", href: "/wycena" },
  { label: "Aktualne oferty", href: "/oferty" },
  { label: "Poznaj nasz zespół", href: "/zespol" },
  { label: "O biurze Dom Hunter", href: "/o-nas" },
];

export function ArticleSidebar({ relatedPosts }: ArticleSidebarProps) {
  return (
    <aside className="mt-14 flex flex-col gap-6 lg:mt-0">
      {/* 1. Baner wyceny, wyróżniony magenta */}
      <div className="overflow-hidden rounded-[20px] bg-brand p-7 text-white shadow-[0_24px_55px_-30px] shadow-brand/60 lg:sticky lg:top-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
          Bezpłatnie
        </p>
        <h3 className="mt-3 font-display text-[1.55rem] font-normal leading-[1.15]">
          Wycena Twojej <span className="italic">nieruchomości.</span>
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-white/85">
          Sprawdzimy, ile realnie warte jest Twoje mieszkanie albo dom na rynku w Gdańsku i
          całym Trójmieście. Bez zobowiązań.
        </p>
        <Link
          href="/wycena"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand transition-transform hover:-translate-y-0.5"
        >
          Zamów wycenę
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      {/* 2. Kontakt z agentem */}
      <div className="rounded-[20px] border border-border bg-surface p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
          Porozmawiaj z agentem
        </p>
        <div className="mt-5 flex items-center gap-3.5">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/10 font-display text-xl text-brand">
            {agent.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="font-display text-lg leading-none text-foreground">{agent.name}</p>
            <p className="mt-1.5 text-xs text-foreground-subtle">Agentka nieruchomości</p>
          </div>
        </div>
        <p className="mt-5 text-[0.95rem] leading-relaxed text-foreground-muted">
          Doradzimy konkretnie, na podstawie realnego rynku. Pierwsza rozmowa nic nie kosztuje.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={agent.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-hover"
          >
            <Phone className="size-4" />
            Zadzwoń: {agent.phone}
          </a>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
          >
            Napisz do nas
          </Link>
        </div>
      </div>

      {/* 3. Polecane wpisy */}
      {relatedPosts.length > 0 && (
        <div className="rounded-[20px] border border-border bg-surface p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Polecane wpisy
          </p>
          <ul className="mt-5 flex flex-col gap-5">
            {relatedPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-center gap-4"
                >
                  <span className="relative block size-16 shrink-0 overflow-hidden rounded-[14px]">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="64px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="font-display text-[1.02rem] leading-[1.3] text-foreground transition-colors group-hover:text-brand">
                    {post.cardTitle ?? post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 4. Baner ofert */}
      <div className="rounded-[20px] border border-border bg-surface-muted p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
          Szukasz mieszkania?
        </p>
        <h3 className="mt-3 font-display text-[1.4rem] font-normal leading-[1.2] text-foreground">
          Zobacz nasze aktualne <span className="italic text-brand">oferty.</span>
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground-muted">
          Mieszkania, domy i działki w Gdańsku, Gdyni i Sopocie. Także oferty spoza portali
          ogłoszeniowych.
        </p>
        <Link
          href="/oferty"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all hover:gap-2.5"
        >
          Zobacz oferty
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      {/* 5. Lista usług */}
      <div className="rounded-[20px] border border-border bg-surface p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
          W czym pomagamy
        </p>
        <ul className="mt-5 flex flex-col divide-y divide-border">
          {uslugi.map((u) => (
            <li key={u.href}>
              <Link
                href={u.href}
                className="group flex items-center justify-between gap-3 py-3 text-[0.98rem] text-foreground transition-colors hover:text-brand"
              >
                <span className="inline-flex items-center gap-2.5">
                  <ScrollText className="size-4 text-brand" strokeWidth={1.8} />
                  {u.label}
                </span>
                <ArrowUpRight className="size-4 text-foreground-subtle transition-colors group-hover:text-brand" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 6. Partner NSL */}
      <div className="rounded-[20px] border border-border bg-surface p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
          Współpracujemy z
        </p>
        <div className="mt-4 flex items-start gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
            <MapPin className="size-5" strokeWidth={1.8} />
          </span>
          <div>
            <p className="font-display text-[1.15rem] leading-tight text-foreground">
              {siteConfig.partners.nsl.name}
            </p>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-foreground-muted">
              {siteConfig.partners.nsl.description}.
            </p>
            <a
              href={siteConfig.partners.nsl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all hover:gap-2"
            >
              Zobacz sieć
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
