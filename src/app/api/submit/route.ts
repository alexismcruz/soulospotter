import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { SpotCategory } from "@prisma/client";

const schema = z.object({
  spotName:       z.string().min(2).max(100),
  category:       z.nativeEnum(SpotCategory),
  description:    z.string().min(20).max(1000),
  address:        z.string().min(5).max(200),
  website:        z.string().url().optional().or(z.literal("")),
  cityName:       z.string().min(2).max(100),
  countryName:    z.string().min(2).max(100),
  submitterName:  z.string().min(2).max(100),
  submitterEmail: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await prisma.submission.create({
      data: {
        ...data,
        website: data.website || null,
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
