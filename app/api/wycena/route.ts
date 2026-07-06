import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const valuationSchema = z.object({
  adres: z.string().trim().min(3).max(300),
  metraz: z.coerce.number().positive().max(100000),
  pokoje: z.coerce.number().int().positive().max(100),
  telefon: z.string().trim().min(6).max(40),
});

type ValuationPayload = z.infer<typeof valuationSchema>;

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = valuationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  try {
    await sendValuationLead(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Wycena form email failed:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 503 });
  }
}

async function sendValuationLead(payload: ValuationPayload) {
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
  const subject = "Nowe zgloszenie wyceny z domhunter.pl";
  const html = buildEmailHtml(payload);
  const text = buildEmailText(payload);

  if (process.env.RESEND_API_KEY) {
    await sendViaResend({ to, subject, html, text });
    return;
  }

  if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const { sendEmail } = await import("@/lib/email/send");
    await sendEmail({ to, subject, html, text });
    return;
  }

  throw new Error("email_not_configured");
}

async function sendViaResend({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const from = process.env.CONTACT_FROM_EMAIL || `DomHunter <${siteConfig.contact.email}>`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`resend_failed_${response.status}`);
  }
}

function buildEmailText({ adres, metraz, pokoje, telefon }: ValuationPayload) {
  return [
    "Nowe zgloszenie wyceny z domhunter.pl",
    "",
    `Adres nieruchomosci: ${adres}`,
    `Metraz: ${metraz} m2`,
    `Pokoje: ${pokoje}`,
    `Telefon: ${telefon}`,
    "",
    "Zrodlo: https://domhunter.pl/wycena",
  ].join("\n");
}

function buildEmailHtml(payload: ValuationPayload) {
  const rows = [
    ["Adres nieruchomosci", payload.adres],
    ["Metraz", `${payload.metraz} m2`],
    ["Pokoje", String(payload.pokoje)],
    ["Telefon", payload.telefon],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #161616; line-height: 1.5;">
      <h1 style="font-size: 20px; margin: 0 0 16px;">Nowe zgloszenie wyceny z domhunter.pl</h1>
      <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 8px 12px; border: 1px solid #e5e0da; font-weight: 700;">${escapeHtml(label)}</td>
                  <td style="padding: 8px 12px; border: 1px solid #e5e0da;">${escapeHtml(value)}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
      <p style="margin-top: 16px; color: #666;">Zrodlo: https://domhunter.pl/wycena</p>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
