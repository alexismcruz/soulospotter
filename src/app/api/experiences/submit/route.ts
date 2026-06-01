import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ExperienceCategory } from "@prisma/client";

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Experience submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
