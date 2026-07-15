import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { SpotCategory, SubmissionType, SubmissionStatus } from "@prisma/client";
import { sendOwnerEmail, fieldsTable } from "@/lib/email";

// Prisma requires the Node.js runtime (not edge).
export const runtime = "nodejs";

// Optional URL field that tolerates "", null, or undefined (the form sends
// `value.trim() || null` for blank optional inputs).
const optionalUrl = z.string().url().max(500).optional().or(z.literal("")).or(z.null());

const schema = z.object({
  type:           z.nativeEnum(SubmissionType).default("NEW"),
  spotId:         z.string().max(200).optional().or(z.literal("")).or(z.null()),
  spotName:       z.string().min(2).max(100),
  category:       z.nativeEnum(SpotCategory),
  description:    z.string().min(20).max(1000),
  address:        z.string().min(5).max(200),
  website:        optionalUrl,
  imageUrl:       optionalUrl,
  cityName:       z.string().min(2).max(100),
  countryName:    z.string().min(2).max(100),
  submitterName:  z.string().min(2).max(100),
  submitterEmail: z.string().email(),
  // Honeypot: real users never see or fill this. Bots that autofill everything will.
  company:        z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Honeypot tripped — respond 200 so the bot thinks it succeeded, but persist
    // nothing and notify no one.
    if (data.company && data.company.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    // Corrections are auto-approved (no spam risk), new listings need admin review
    const status = data.type === "CORRECTION" ? SubmissionStatus.APPROVED : SubmissionStatus.PENDING;

    await prisma.submission.create({
      data: {
        type:           data.type,
        spotId:         data.spotId || null,
        spotName:       data.spotName,
        category:       data.category,
        description:    data.description,
        address:        data.address,
        website:        data.website || null,
        imageUrl:       data.imageUrl || null,
        cityName:       data.cityName,
        countryName:    data.countryName,
        submitterName:  data.submitterName,
        submitterEmail: data.submitterEmail,
        status,
      },
    });

    // Best-effort owner notification (no-op unless RESEND_API_KEY is set).
    const emailRes = await sendOwnerEmail({
      subject: `New ${data.type === "CORRECTION" ? "correction" : "spot submission"}: ${data.spotName} (${data.cityName})`,
      replyTo: data.submitterEmail,
      html: `
        <h2 style="font-family:system-ui,sans-serif;color:#1A1A2E">New ${data.type === "CORRECTION" ? "correction" : "spot submission"}</h2>
        ${fieldsTable([
          ["Type", data.type],
          ["Spot", data.spotName],
          ["Category", data.category],
          ["City", data.cityName],
          ["Country", data.countryName],
          ["Address", data.address],
          ["Website", data.website || null],
          ["Photo URL", data.imageUrl || null],
          ["Existing venue (correction)", data.spotId || null],
          ["Description", data.description],
          ["Submitted by", `${data.submitterName} <${data.submitterEmail}>`],
          ["Review status", status],
        ])}
        <p style="font-family:system-ui,sans-serif;color:#8AAAC0;font-size:12px;margin-top:16px">
          Saved to the Submission table. ${status === "PENDING" ? "Awaiting review." : "Auto-approved (correction)."}
        </p>`,
    });
    if (!emailRes.ok && "error" in emailRes) {
      console.error("[/api/submit] email notification failed:", emailRes.error);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data", issues: err.issues }, { status: 400 });
    }
    console.error("Submit error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
