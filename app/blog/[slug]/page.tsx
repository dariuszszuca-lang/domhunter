import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ArticleSidebar } from "@/components/blog/article-sidebar";
import { siteConfig } from "@/lib/site";
import { getAllPosts, getAllSlugs, getPost, type Block } from "@/lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: string }[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Artykuł nie znaleziony" };
  }

  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.date,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: post.title }],
    },
  };
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={i}>{block.text}</h2>;
    case "p":
      return <p key={i}>{block.text}</p>;
    case "ul":
      return (
        <ul key={i}>
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  // Telefon kontaktowy do CTA (spójny z nagłówkiem, stopką i stroną kontaktu).
  const phone = { href: "tel:+48571309209", displayValue: "571 309 209" };

  // Polecane wpisy do sidebara: inne artykuły bez bieżącego, maksymalnie trzy.
  const relatedPosts = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // JSON-LD: Article + FAQPage (struktura pytań i odpowiedzi z artykułu).
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "pl-PL",
    author: { "@type": "Organization", name: siteConfig.fullName },
    publisher: {
      "@type": "Organization",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    image: `${siteConfig.url}${siteConfig.ogImage}`,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article className="pb-20 lg:pb-28">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Nagłówek ze zdjęciem tematycznym i ciemną nakładką dla czytelności */}
      <header className="relative overflow-hidden py-16 lg:py-24">
        {/* Zdjęcie w tle */}
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Nakładka: ciemna u dołu plus delikatny odcień marki, żeby biały tekst był czytelny */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-brand/55"
        />
        <Container size="default" className="relative">
          <nav className="flex items-center gap-2 text-sm text-white/80">
            <Link href="/blog" className="inline-flex items-center gap-1.5 hover:text-white">
              <ArrowLeft className="size-3.5" />
              Blog
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white/60">Artykuł</span>
          </nav>

          <h1 className="mt-6 max-w-3xl font-display font-normal text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.05] tracking-[-0.01em] text-white">
            {post.title.replace(post.accent, "").trim()}{" "}
            <span className="italic text-white/85">{post.accent}</span>
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span aria-hidden className="text-white/40">
              &middot;
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" strokeWidth={1.8} />
              {post.readingTime}
            </span>
          </div>
        </Container>
      </header>

      {/* Treść artykułu plus sidebar. Na desktopie dwie kolumny, na mobile stos. */}
      <Container size="default" className="pt-12 lg:pt-16">
        <div className="grid grid-cols-1 gap-x-12 gap-y-0 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Kolumna główna z treścią */}
          <div className="min-w-0">
            <div
              className="
                [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:font-normal
                [&_h2]:text-[clamp(1.5rem,3vw,2.1rem)] [&_h2]:leading-[1.15]
                [&_h2]:tracking-[-0.01em] [&_h2]:text-foreground
                [&_p]:mt-5 [&_p]:text-[1.05rem] [&_p]:leading-[1.75] [&_p]:text-foreground-muted
                [&_ul]:mt-5 [&_ul]:space-y-2.5 [&_ul]:pl-1
                [&_li]:relative [&_li]:pl-7 [&_li]:text-[1.05rem]
                [&_li]:leading-[1.7] [&_li]:text-foreground-muted
                [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.6em]
                [&_li]:before:size-2 [&_li]:before:rounded-full [&_li]:before:bg-brand
                [&_>_p:first-child]:mt-0
              "
            >
              {post.content.map((block, i) => renderBlock(block, i))}
            </div>

            {/* Sekcja FAQ */}
            <section className="mt-16 border-t border-border pt-12">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                Najczęstsze pytania
              </p>
              <h2 className="font-display font-normal text-[clamp(1.7rem,3.5vw,2.4rem)] leading-[1.1] tracking-[-0.01em] text-foreground">
                Pytania i <span className="italic text-brand">odpowiedzi.</span>
              </h2>

              <dl className="mt-8 space-y-7">
                {post.faq.map((f) => (
                  <div key={f.q} className="border-b border-border pb-7 last:border-b-0">
                    <dt className="font-display text-[1.3rem] font-normal leading-[1.25] text-foreground">
                      {f.q}
                    </dt>
                    <dd className="mt-3 text-[1.02rem] leading-[1.7] text-foreground-muted">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* CTA na końcu */}
            <section className="mt-14 overflow-hidden rounded-[26px] border border-brand/30 bg-surface-cream p-8 sm:p-10">
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-normal leading-[1.15] text-foreground">
                Masz pytania o swoją <span className="italic text-brand">nieruchomość?</span>
              </h2>
              <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-foreground-muted">
                Zadzwoń albo napisz do nas. Doradzimy konkretnie, na podstawie realnego rynku w
                Gdańsku i całym Trójmieście. Pierwsza rozmowa i wycena są bezpłatne.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={phone.href}
                  className="inline-flex items-center gap-2.5 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-hover"
                >
                  <Phone className="size-4" />
                  Zadzwoń: {phone.displayValue}
                </a>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2.5 rounded-full border border-border-strong px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  Napisz do nas
                </Link>
              </div>
            </section>

            {/* Powrót do bloga */}
            <div className="mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground-muted transition-colors hover:text-brand"
              >
                <ArrowLeft className="size-4" />
                Wróć do wszystkich wpisów
              </Link>
            </div>
          </div>

          {/* Sidebar na całą długość artykułu */}
          <ArticleSidebar relatedPosts={relatedPosts} />
        </div>
      </Container>
    </article>
  );
}
