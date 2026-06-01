import Link from "next/link";
import { CostLevel, Region } from "@prisma/client";

const REGION_LABELS: Record<Region, string> = {
  NORTH_AMERICA: "North America",
  LATIN_AMERICA: "Latin America",
  EUROPE: "Europe",
  MIDDLE_EAST_AFRICA: "Middle East & Africa",
  SOUTH_ASIA: "South Asia",
  SOUTHEAST_ASIA: "Southeast Asia",
  EAST_ASIA: "East Asia",
  OCEANIA: "Oceania",
};

const COST_LABELS: Record<CostLevel, string> = {
  BUDGET: "Budget-friendly",
  MID_RANGE: "Mid-range",
  EXPENSIVE: "Higher cost",
};

import { CITY_IMAGE_LG, FALLBACK_IMAGE } from "@/lib/cityImages";
import FlagImage from "@/components/ui/FlagImage";
import { CATEGORY_META } from "@/lib/categoryUtils";
import { SpotCategory } from "@prisma/client";

type CityWithRelations = {
  name: string;
  slug: string;
  description: string | null;
  region: Region;
  costLevel: CostLevel | null;
  safetyScore: number | null;
  currency: string | null;
  language: string | null;
  timezone: string | null;
  country: { name: string; code: string; flagEmoji: string | null };
  tags: { tag: string }[];
  spots: unknown[];
};

export default function CityHero({
  city,
  activeCategory,
}: {
  city: CityWithRelations;
  activeCategory?: SpotCategory;
}) {
  const imgSrc = CITY_IMAGE_LG[city.slug] ?? FALLBACK_IMAGE;

  return (
    <div className="relative h-72 sm:h-96 overflow-hidden">
      <img
        src={imgSrc}
        alt={city.name}
        className="w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent" />

      {/* Breadcrumb */}
      <div className="absolute top-4 left-4 sm:left-8">
        <nav className="flex items-center gap-2 text-sm text-white/70">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
          <span>/</span>
          {activeCategory ? (
            <>
              <Link href={`/destinations/${city.slug}`} className="hover:text-white transition-colors">
                {city.name}
              </Link>
              <span>/</span>
              <span className="text-white">
                {CATEGORY_META[activeCategory].emoji} {CATEGORY_META[activeCategory].label}
              </span>
            </>
          ) : (
            <span className="text-white">{city.name}</span>
          )}
        </nav>
      </div>

      {/* City info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-sm text-amber-400 font-medium">{REGION_LABELS[city.region]}</span>
            {city.costLevel && (
              <>
                <span className="text-white/40">·</span>
                <span className="text-sm text-white/70">{COST_LABELS[city.costLevel]}</span>
              </>
            )}
            {city.safetyScore && city.safetyScore >= 9 && (
              <>
                <span className="text-white/40">·</span>
                <span className="text-sm text-emerald-400">✓ Very Safe for Solo Travel</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            <span className="inline-flex items-center gap-2"><FlagImage code={city.country.code} name={city.country.name} size="md" /> {city.name}</span>
          </h1>
          <p className="mt-1 text-white/60 text-sm">{city.country.name}</p>

          {/* Tags */}
          {city.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {city.tags.map((t) => (
                <span
                  key={t.tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 border border-white/10"
                >
                  {t.tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
