import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";
import { getAllSlugs, getPost, type Block } from "@/lib/blog";

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

      {/* Nagłówek z gradientowym paskiem zamiast zdjęcia */}
      <header className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-hover py-16 lg:py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 right-6 select-none font-display text-[12rem] italic leading-none text-white/10 sm:text-[16rem]"
        >
          &bdquo;
        </span>
        <Container size="default">
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

      {/* Treść artykułu */}
      <Container size="default" className="pt-12 lg:pt-16">
        <div
          className="
            max-w-3xl
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
        <section className="mt-16 max-w-3xl border-t border-border pt-12">
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
        <section className="mt-14 max-w-3xl overflow-hidden rounded-[26px] bg-brand p-8 text-white shadow-[0_30px_70px_-34px] shadow-brand/60 sm:p-10">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-normal leading-[1.15]">
            Masz pytania o swoją nieruchomość?
          </h2>
          <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-white/85">
            Zadzwoń albo napisz do nas. Doradzimy konkretnie, na podstawie realnego rynku w
            Gdańsku i całym Trójmieście. Pierwsza rozmowa i wycena są bezpłatne.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={phone.href}
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand transition-transform hover:-translate-y-0.5"
            >
              <Phone className="size-4" />
              Zadzwoń: {phone.displayValue}
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Napisz do nas
            </Link>
          </div>
        </section>

        {/* Powrót do bloga */}
        <div className="mt-10 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground-muted transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-4" />
            Wróć do wszystkich wpisów
          </Link>
        </div>
      </Container>
    </article>
  );
}
