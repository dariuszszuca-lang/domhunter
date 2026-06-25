"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function WspolpracaForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");

  const mailto = () => {
    const subject = encodeURIComponent("Współpraca z Dom Hunter");
    const body = encodeURIComponent(
      `Imię i nazwisko: ${name}\nTelefon: ${phone}\nE-mail: ${email}\n\nKilka słów o sobie:\n${about}`
    );
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full rounded-2xl border border-border bg-surface px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground-subtle focus:border-brand";

  return (
    <div className="rounded-[28px] border border-border bg-surface p-6 lg:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className={field}
          placeholder="Imię i nazwisko"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={field}
          placeholder="Telefon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <input
        className={`${field} mt-4`}
        placeholder="E-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        className={`${field} mt-4 min-h-[120px] resize-y`}
        placeholder="Napisz kilka słów o sobie — gdzie pracujesz, co lubisz w tej robocie."
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <button
        type="button"
        onClick={mailto}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-all hover:gap-3 hover:bg-brand-hover"
      >
        Zostaw dane
        <ArrowUpRight className="size-4" />
      </button>
      <p className="mt-4 text-xs text-foreground-subtle">
        Wolisz bezpośrednio? Napisz na {siteConfig.contact.email} albo zadzwoń, oddzwaniamy w 30 minut.
      </p>
    </div>
  );
}
