/**
 * Best-effort transactional email via Resend's REST API (raw fetch — no SDK
 * dependency). If RESEND_API_KEY is not configured, this is a no-op and returns
 * { skipped: true } so callers can still succeed on the strength of their DB write.
 *
 * To enable email notifications:
 *   1. Create a Resend account + verify the soulospotter.com domain
 *   2. Set env vars on Vercel (and locally in .env):
 *        RESEND_API_KEY=re_xxx
 *        EMAIL_FROM="SouloSpotter <notifications@soulospotter.com>"   (optional)
 *        OWNER_EMAIL="hello@soulospotter.com"                          (optional)
 */

type SendArgs = {
  subject: string;
  html: string;
  replyTo?: string;
};

type SendResult =
  | { ok: true; id: string }
  | { ok: false; skipped: true }
  | { ok: false; error: string };

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export async function sendOwnerEmail({ subject, html, replyTo }: SendArgs): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Email not configured — caller relies on the DB record instead.
    return { ok: false, skipped: true };
  }

  const from = process.env.EMAIL_FROM ?? "SouloSpotter <notifications@soulospotter.com>";
  const to = process.env.OWNER_EMAIL ?? "hello@soulospotter.com";

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `Resend ${res.status}: ${text.slice(0, 200)}` };
    }
    const json = (await res.json()) as { id?: string };
    return { ok: true, id: json.id ?? "unknown" };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "email send failed" };
  }
}

/** Minimal HTML escaping for interpolating user input into notification emails. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Render a labelled field list as an HTML table for the notification email. */
export function fieldsTable(rows: [string, string | null | undefined][]): string {
  const cells = rows
    .filter(([, v]) => v != null && v !== "")
    .map(
      ([label, v]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#4A6278;vertical-align:top;white-space:nowrap">${escapeHtml(
          label,
        )}</td><td style="padding:6px 12px;color:#1A1A2E">${escapeHtml(String(v))}</td></tr>`,
    )
    .join("");
  return `<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">${cells}</table>`;
}
