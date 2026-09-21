import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookingStaysUrl } from "@/lib/affiliates";

// Never cache: the destination depends on the visitor's country, per request.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * "Where to stay" redirect. City pages are statically cached, so they can't know the
 * visitor's country — this route can. It picks the Booking.com CJ program matching the
 * visitor's country (audience), builds the tracked deep link to a Booking.com search for
 * this city, and 302s there. Blocked in robots.txt (/api/).
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let city: { name: string; country: { name: string } } | null = null;
  try {
    city = await prisma.city.findFirst({
      where: { slug, published: true },
      select: { name: true, country: { select: { name: true } } },
    });
  } catch (err) {
    console.error("[/api/stays] city lookup failed:", err);
  }

  // Unknown city (or DB hiccup): send them somewhere useful rather than a dead end.
  if (!city) {
    return NextResponse.redirect(new URL(`/destinations/${encodeURIComponent(slug)}`, req.url), 302);
  }

  // Vercel sets this at the edge in production. `?country=XX` overrides it in dev only.
  const override = process.env.NODE_ENV !== "production" ? req.nextUrl.searchParams.get("country") : null;
  const visitorCountry = override ?? req.headers.get("x-vercel-ip-country");

  const res = NextResponse.redirect(
    bookingStaysUrl({ cityName: city.name, countryName: city.country.name, citySlug: slug, visitorCountry }),
    302,
  );
  res.headers.set("Cache-Control", "no-store");
  return res;
}
