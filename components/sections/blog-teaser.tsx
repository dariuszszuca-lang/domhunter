import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getAllPosts } from "@/lib/blog";

export function BlogTeaser() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className="bg-surface-muted py-20 lg:py-28">
      <Container size="wide">
        {/* Nagłówek sekcji */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Blog
            </p>
            <h2 className="font-display font-normal text-[clamp(2rem,4vw,3.3rem)] leading-[1.04] tracking-[-0.01em] text-foreground">
              Poradnik <span className="italic text-brand">nieruchomości.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-muted lg:text-lg">
              Sprzedaż, kupno i wynajem w Gdańsku oraz całym Trójmieście. Wiedza, którą na co
              dzień przekazujemy klientom.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-brand hover:text-brand"
          >
            Zobacz wszystkie wpisy
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* Grid 3 boxów */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-[26px] border border-border bg-surface transition-all hover:-translate-y-1 hover:border-brand hover:shadow-[0_24px_60px_-30px] hover:shadow-brand/40"
            >
              {/* Zdjęcie tematyczne artykułu */}
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Lekka ciemna nakładka, żeby badge był czytelny */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent"
                />
                <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  Poradnik
                </span>
              </div>

              {/* Treść karty */}
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-[1.35rem] font-normal leading-[1.18] text-foreground transition-colors group-hover:text-brand">
                  {post.cardTitle ?? post.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-[0.95rem] leading-relaxed text-foreground-muted">
                  {post.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                  <span className="inline-flex items-center gap-1.5 text-xs text-foreground-subtle">
                    <Clock className="size-3.5" strokeWidth={1.8} />
                    {post.dateLabel}
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
