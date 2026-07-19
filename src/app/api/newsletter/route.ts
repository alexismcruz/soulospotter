import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const BREVO_CONTACTS_ENDPOINT = "https://api.brevo.com/v3/contacts";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(200),
  // Honeypot: real users never see or fill this. Bots that autofill everything will.
  company: z.string().optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid email" },
      { status: 400 },
    );
  }
  const { email, company } = parsed.data;

  // Honeypot tripped — pretend success so the bot doesn't learn, subscribe nobody.
  if (company && company.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  // Fail loudly rather than pretending to subscribe. A silent fake-success is how
  // the previous Mailchimp form lost every signup.
  if (!apiKey || !listId) {
    console.error("[/api/newsletter] BREVO_API_KEY or BREVO_LIST_ID is not set — signup not captured:", email);
    return NextResponse.json(
      { error: "Newsletter signup is temporarily unavailable. Please email hello@soulospotter.com and we'll add you." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(BREVO_CONTACTS_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [Number(listId)],
        updateEnabled: true, // re-subscribing updates instead of erroring
      }),
    });

    // 201 = created, 204 = updated. Brevo returns 400 "Contact already exist" when
    // updateEnabled can't apply — treat an existing contact as success either way.
    if (res.ok) {
      return NextResponse.json({ success: true });
    }

    const detail = await res.json().catch(() => ({}));
    const code = (detail as { code?: string })?.code;
    if (code === "duplicate_parameter") {
      return NextResponse.json({ success: true, alreadySubscribed: true });
    }

    console.error("[/api/newsletter] Brevo error:", res.status, JSON.stringify(detail).slice(0, 300));
    return NextResponse.json(
      { error: "We couldn't sign you up just now. Please try again shortly." },
      { status: 502 },
    );
  } catch (err) {
    console.error("[/api/newsletter] request failed:", err);
    return NextResponse.json(
      { error: "We couldn't sign you up just now. Please try again shortly." },
      { status: 502 },
    );
  }
}
