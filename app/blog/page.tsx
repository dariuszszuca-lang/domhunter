import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog i poradnik nieruchomości",
  description:
    "Poradnik Dom Hunter: jak sprzedać, kupić i wynająć mieszkanie w Gdańsku i całym Trójmieście. Konkretne wskazówki krok po kroku, bez lania wody.",
  openGraph: {
    title: "Blog i poradnik nieruchomości | DomHunter",
    description:
      "Poradnik Dom Hunter: jak sprzedać, kupić i wynająć mieszkanie w Gdańsku i całym Trójmieście. Konkretne wskazówki krok po kroku.",
    type: "website",
    url: "https://domhunter.pl/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        {/* Nagłówek strony */}
        <div className="max-w-2xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Blog
          </p>
          <h1 className="font-display font-normal text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.04] tracking-[-0.01em] text-foreground">
            Poradnik <span className="italic text-brand">nieruchomości.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-muted lg:text-lg">
            Praktyczna wiedza o sprzedaży, kupnie i wynajmie mieszkań w Gdańsku i całym
            Trójmieście. Piszemy konkretnie, tak jak tłumaczymy to klientom przy stole.
          </p>
        </div>

        {/* Grid artykułów */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-[26px] border border-border bg-surface transition-all hover:-translate-y-1 hover:border-brand hover:shadow-[0_24px_60px_-30px] hover:shadow-brand/40"
            >
              {/* Pasek nagłówkowy zamiast zdjęcia */}
              <div
                aria-hidden
                className="relative h-40 overflow-hidden bg-gradient-to-br from-brand to-brand-hover"
              >
                <span className="pointer-events-none absolute -bottom-6 right-4 select-none font-display text-[7rem] italic leading-none text-white/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  Poradnik
                </span>
              </div>

              {/* Treść karty */}
              <div className="flex flex-1 flex-col p-7">
                <h2 className="font-display text-[1.4rem] font-normal leading-[1.18] text-foreground transition-colors group-hover:text-brand">
                  {post.cardTitle ?? post.title}
                </h2>
                <p className="mt-3 line-clamp-3 flex-1 text-[0.95rem] leading-relaxed text-foreground-muted">
                  {post.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                  <span className="inline-flex items-center gap-1.5 text-xs text-foreground-subtle">
                    <Clock className="size-3.5" strokeWidth={1.8} />
                    {post.readingTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Czytaj
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
