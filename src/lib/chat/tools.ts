import type Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";
import { CATEGORY_SLUGS } from "@/lib/categoryUtils";
import { Region, SpotCategory, CostLevel } from "@prisma/client";

// ── Tool definitions sent to Claude ───────────────────────────────────────────
export const CHAT_TOOLS: Anthropic.Tool[] = [
  {
    name: "find_destinations",
    description:
      "Search SouloSpotter's curated solo-travel cities. Use this whenever the user asks where to go, for destination ideas, or to filter by region, budget, or safety. Returns real cities with links you should cite.",
    input_schema: {
      type: "object",
      properties: {
        region: {
          type: "string",
          enum: ["NORTH_AMERICA", "LATIN_AMERICA", "EUROPE", "MIDDLE_EAST_AFRICA", "ASIA", "OCEANIA"],
          description: "Filter to a world region.",
        },
        budget: {
          type: "string",
          enum: ["BUDGET", "MID_RANGE", "EXPENSIVE"],
          description: "Filter by typical cost level.",
        },
        minSafety: {
          type: "number",
          description: "Minimum safety score 0-10 (e.g. 9 for very safe).",
        },
        query: {
          type: "string",
          description: "Free-text match against city/country name (e.g. 'Japan', 'beach').",
        },
        limit: { type: "number", description: "Max results (default 6, max 12)." },
      },
    },
  },
  {
    name: "find_in_city",
    description:
      "Look up real spots (accommodation, cafes, food, culture, nature, nightlife, coworking, wellness) and solo-friendly experiences inside a specific SouloSpotter city. Use this once you know which city the user is interested in. Returns links you should cite.",
    input_schema: {
      type: "object",
      properties: {
        citySlug: {
          type: "string",
          description: "The city slug, e.g. 'tokyo', 'lisbon'. Get it from find_destinations if unsure.",
        },
        category: {
          type: "string",
          enum: ["ACCOMMODATION", "CAFE", "COWORKING", "FOOD", "WELLNESS", "COMMUNITY", "NATURE", "CULTURE", "NIGHTLIFE", "TRANSPORT"],
          description: "Optional: only return spots in this category.",
        },
        includeExperiences: {
          type: "boolean",
          description: "Whether to also return bookable experiences for the city (default true).",
        },
        limit: { type: "number", description: "Max spots to return (default 8, max 15)." },
      },
      required: ["citySlug"],
    },
  },
];

const clamp = (n: unknown, def: number, max: number) =>
  typeof n === "number" && n > 0 ? Math.min(Math.floor(n), max) : def;

// ── Executors ────────────────────────────────────────────────────────────────
async function findDestinations(input: Record<string, unknown>) {
  const where: {
    published: boolean;
    region?: Region;
    costLevel?: CostLevel;
    safetyScore?: { gte: number };
    OR?: object[];
  } = { published: true };

  if (typeof input.region === "string") where.region = input.region as Region;
  if (typeof input.budget === "string") where.costLevel = input.budget as CostLevel;
  if (typeof input.minSafety === "number") where.safetyScore = { gte: input.minSafety };
  if (typeof input.query === "string" && input.query.trim()) {
    const q = input.query.trim();
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { country: { is: { name: { contains: q, mode: "insensitive" } } } },
    ];
  }

  const cities = await prisma.city.findMany({
    where,
    select: {
      name: true, slug: true, region: true, costLevel: true, safetyScore: true,
      description: true, country: { select: { name: true } },
      _count: { select: { spots: true, experiences: true } },
    },
    orderBy: { safetyScore: "desc" },
    take: clamp(input.limit, 6, 12),
  });

  return cities.map((c) => ({
    name: c.name,
    country: c.country.name,
    region: c.region,
    cost: c.costLevel,
    safety: c.safetyScore,
    spots: c._count.spots,
    experiences: c._count.experiences,
    summary: c.description?.slice(0, 200) ?? null,
    url: `/destinations/${c.slug}`,
  }));
}

async function findInCity(input: Record<string, unknown>) {
  const citySlug = String(input.citySlug ?? "").trim();
  if (!citySlug) return { error: "citySlug is required" };

  const city = await prisma.city.findUnique({
    where: { slug: citySlug },
    select: { name: true, slug: true },
  });
  if (!city) return { error: `No SouloSpotter city found with slug '${citySlug}'.` };

  const spotWhere: { cityId?: string; published: boolean; category?: SpotCategory; city: { slug: string } } = {
    published: true,
    city: { slug: citySlug },
  };
  if (typeof input.category === "string") spotWhere.category = input.category as SpotCategory;

  const [spots, experiences] = await Promise.all([
    prisma.spot.findMany({
      where: spotWhere,
      select: { name: true, slug: true, category: true, description: true, priceRange: true },
      orderBy: { rating: "desc" },
      take: clamp(input.limit, 8, 15),
    }),
    input.includeExperiences === false
      ? Promise.resolve([])
      : prisma.experience.findMany({
          where: { isActive: true, city: { slug: citySlug } },
          select: { name: true, slug: true, category: true, price: true, duration: true },
          orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
          take: 6,
        }),
  ]);

  return {
    city: city.name,
    spots: spots.map((s) => ({
      name: s.name,
      category: s.category,
      price: s.priceRange,
      summary: s.description?.slice(0, 160) ?? null,
      url: `/destinations/${citySlug}/${CATEGORY_SLUGS[s.category]}/${s.slug}`,
    })),
    experiences: experiences.map((e) => ({
      name: e.name,
      category: e.category,
      price: `$${e.price}`,
      duration: e.duration,
      url: `/experiences/${e.slug}`,
    })),
  };
}

export async function runChatTool(name: string, input: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case "find_destinations": return findDestinations(input);
    case "find_in_city":      return findInCity(input);
    default:                  return { error: `Unknown tool: ${name}` };
  }
}
