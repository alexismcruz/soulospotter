import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { SpotCategory, SubmissionType } from "@prisma/client";

const schema = z.object({
  type:           z.nativeEnum(SubmissionType).default("NEW"),
  spotId:         z.string().optional().or(z.literal("")).or(z.null()),
  spotName:       z.string().min(2).max(100),
  category:       z.nativeEnum(SpotCategory),
  description:    z.string().min(20).max(1000),
  address:        z.string().min(5).max(200),
  website:        z.string().url().optional().or(z.literal("")),
  imageUrl:       z.string().url().optional().or(z.literal("")).or(z.null()),
  cityName:       z.string().min(2).max(100),
  countryName:    z.string().min(2).max(100),
  submitterName:  z.string().min(2).max(100),
  submitterEmail: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Corrections are auto-approved (no spam risk), new listings need admin review
    const status = data.type === "CORRECTION" ? "APPROVED" : "PENDING";

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
        status:         status as any,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data", issues: err.issues }, { status: 400 });
    }
    console.error("Submit error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
