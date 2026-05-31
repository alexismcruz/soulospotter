import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name:     z.string().min(2).max(100),
  email:    z.string().email(),
  business: z.string().min(2).max(100),
  city:     z.string().min(2).max(100),
  tier:     z.enum(["featured", "spotlight", "homepage"]),
  message:  z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await prisma.advertiseInquiry.create({ data });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data", issues: err.issues }, { status: 400 });
    }
    console.error("Advertise inquiry error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
