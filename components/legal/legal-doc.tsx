import * as React from "react";

type LegalDocProps = {
  eyebrow?: string;
  title: string;
  updated: string;
  children: React.ReactNode;
};

/* Wspólny wrapper stron prawnych Dom Hunter.
   Nagłówek (eyebrow + tytuł + data) + ostylowana kolumna treści.
   Dzieci (zwykły JSX: h2, p, ul, strong, a) ostylowane przez arbitralne selektory. */
export function LegalDoc({ eyebrow, title, updated, children }: LegalDocProps) {
  return (
    <section className="bg-surface-cream">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-6 lg:py-28">
        {eyebrow ? (
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="font-display font-normal text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
          {title}
        </h1>

        <p className="mt-5 text-sm text-foreground-subtle">
          Ostatnia aktualizacja: {updated}
        </p>

        <div className="mt-12 text-[1.02rem] leading-[1.75] text-foreground-muted [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mb-3 [&_h2]:mt-11 [&_h2]:font-display [&_h2]:text-[1.5rem] [&_h2]:font-normal [&_h2]:text-foreground [&_li]:mt-2 [&_p]:mt-4 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </section>
  );
}
