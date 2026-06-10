import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json([]);

  const cities = await prisma.city.findMany({
    where: {
      published: true,
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { country: { name: { contains: q, mode: "insensitive" } } },
      ],
    },
    select: {
      name: true,
      slug: true,
      country: { select: { name: true, code: true } },
      region: true,
    },
    orderBy: { name: "asc" },
    take: 8,
  });

  return NextResponse.json(cities);
}
