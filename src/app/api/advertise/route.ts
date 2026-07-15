import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendOwnerEmail, fieldsTable } from "@/lib/email";

// Prisma requires the Node.js runtime (not edge).
export const runtime = "nodejs";

const TIER_LABELS: Record<string, string> = {
  featured:  "Featured Listing — $29/month",
  spotlight: "City Spotlight — $79/month",
  homepage:  "Homepage Feature — $149/month",
};

const schema = z.object({
  name:     z.string().min(2).max(100),
  email:    z.string().email(),
  business: z.string().min(2).max(100),
  city:     z.string().min(2).max(100),
  tier:     z.enum(["featured", "spotlight", "homepage"]),
  message:  z.string().max(1000).optional(),
  // Honeypot: real users never see or fill this. Bots that autofill everything will.
  company:  z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, ...data } = schema.parse(body);

    // Honeypot tripped — respond 200 so the bot thinks it succeeded, but persist
    // nothing and notify no one.
    if (company && company.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    // `data` no longer contains the honeypot, so it maps 1:1 to AdvertiseInquiry.
    await prisma.advertiseInquiry.create({ data });

    // Best-effort owner notification (no-op unless RESEND_API_KEY is set).
    const emailRes = await sendOwnerEmail({
      subject: `New advertising inquiry: ${data.business} (${TIER_LABELS[data.tier] ?? data.tier})`,
      replyTo: data.email,
      html: `
        <h2 style="font-family:system-ui,sans-serif;color:#1A1A2E">New advertising inquiry</h2>
        ${fieldsTable([
          ["Business", data.business],
          ["City", data.city],
          ["Package", TIER_LABELS[data.tier] ?? data.tier],
          ["Contact", `${data.name} <${data.email}>`],
          ["Message", data.message || null],
        ])}
        <p style="font-family:system-ui,sans-serif;color:#8AAAC0;font-size:12px;margin-top:16px">
          Saved to the AdvertiseInquiry table.
        </p>`,
    });
    if (!emailRes.ok && "error" in emailRes) {
      console.error("[/api/advertise] email notification failed:", emailRes.error);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data", issues: err.issues }, { status: 400 });
    }
    console.error("Advertise inquiry error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
