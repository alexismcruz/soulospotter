import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ExperienceCategory } from "@prisma/client";
import { sendOwnerEmail, fieldsTable } from "@/lib/email";

// Prisma requires the Node.js runtime (not edge).
export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(3).max(100),
  city: z.string().min(1),
  category: z.nativeEnum(ExperienceCategory),
  description: z.string().min(50).max(500),
  price: z.number().positive(),
  groupSizeMin: z.number().int().positive(),
  groupSizeMax: z.number().int().positive(),
  duration: z.string().min(3).max(100),
  frequency: z.string().min(1),
  bookingUrl: z.string().url(),
  photoUrl: z.string().url().optional().or(z.literal("")),
  organizerName: z.string().min(2).max(100),
  organizerEmail: z.string().email(),
  package: z.enum(["basic", "featured"]),
  notes: z.string().max(500).optional(),
  // Honeypot: real users never see or fill this. Bots that autofill everything will.
  company: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid form data",
          issues: result.error.issues,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Honeypot tripped — respond 200 so the bot thinks it succeeded, but persist
    // nothing and notify no one.
    if (data.company && data.company.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    // Check if city exists
    const city = await prisma.city.findUnique({
      where: { slug: data.city },
    });

    if (!city) {
      return NextResponse.json(
        { error: "City not found" },
        { status: 400 }
      );
    }

    // Check if email already submitted
    const existingSubmission = await prisma.experienceSubmission.findUnique({
      where: { organizerEmail: data.organizerEmail },
    });

    if (existingSubmission) {
      return NextResponse.json(
        { error: "This email has already been submitted. Please use a different email." },
        { status: 409 }
      );
    }

    // Create submission
    await prisma.experienceSubmission.create({
      data: {
        name: data.name,
        city: data.city,
        category: data.category,
        description: data.description,
        price: data.price,
        groupSizeMin: data.groupSizeMin,
        groupSizeMax: data.groupSizeMax,
        duration: data.duration,
        frequency: data.frequency,
        bookingUrl: data.bookingUrl,
        photoUrl: data.photoUrl || null,
        organizerName: data.organizerName,
        organizerEmail: data.organizerEmail,
        package: data.package,
        notes: data.notes || null,
        status: "PENDING",
      },
    });

    // Best-effort owner notification (no-op unless RESEND_API_KEY is set).
    const emailRes = await sendOwnerEmail({
      subject: `New experience submission: ${data.name} (${data.city})`,
      replyTo: data.organizerEmail,
      html: `
        <h2 style="font-family:system-ui,sans-serif;color:#1A1A2E">New experience submission</h2>
        ${fieldsTable([
          ["Experience", data.name],
          ["City", data.city],
          ["Category", data.category],
          ["Package", data.package],
          ["Price", `$${data.price}`],
          ["Duration", data.duration],
          ["Group size", `${data.groupSizeMin}–${data.groupSizeMax}`],
          ["Booking URL", data.bookingUrl],
          ["Description", data.description],
          ["Organizer", `${data.organizerName} <${data.organizerEmail}>`],
          ["Notes", data.notes || null],
        ])}
        <p style="font-family:system-ui,sans-serif;color:#8AAAC0;font-size:12px;margin-top:16px">
          Saved to the ExperienceSubmission table with status PENDING.
        </p>`,
    });
    if (!emailRes.ok && "error" in emailRes) {
      console.error("[/api/experiences/submit] email notification failed:", emailRes.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Experience submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
