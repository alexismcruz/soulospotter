import Link from "next/link";
import { CostLevel, Region } from "@prisma/client";

const COST_BADGE: Record<CostLevel, { symbol: string; color: string }> = {
  BUDGET:    { symbol: "$",   color: "text-green-600 bg-green-50" },
  MID_RANGE: { symbol: "$$",  color: "text-amber-600 bg-amber-50" },
  EXPENSIVE: { symbol: "$$$", color: "text-red-500 bg-red-50" },
};

import { CITY_IMAGES, FALLBACK_IMAGE } from "@/lib/cityImages";

type City = {
  id: string;
  name: string;
  slug: string;
  region: Region;
  costLevel: CostLevel | null;
  safetyScore: number | null;
  description: string | null;
  country: { name: string; flagEmoji: string | null };
  tags: { tag: string }[];
  _count: { spots: number };
};

export default function CityCard({ city }: { city: City }) {
  const imgSrc = CITY_IMAGES[city.slug] ?? FALLBACK_IMAGE;
  const cost = city.costLevel ? COST_BADGE[city.costLevel] : null;

  return (
    <Link
      href={`/destinations/${city.slug}`}
      className="group rounded-2xl overflow-hidden border border-stone-200 bg-white hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={imgSrc}
          alt={city.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {cost && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cost.color}`}>
              {cost.symbol}
            </span>
          )}
          {city.safetyScore && city.safetyScore >= 9 && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              Very Safe
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-semibold text-stone-900 group-hover:text-amber-600 transition-colors leading-snug">
              {city.name}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {city.country.flagEmoji} {city.country.name}
            </p>
          </div>
          <span className="text-xs text-stone-400 whitespace-nowrap mt-0.5">
            {city._count.spots} spots
          </span>
        </div>

        {city.description && (
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed flex-1">
            {city.description}
          </p>
        )}

        {city.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {city.tags.slice(0, 3).map((t) => (
              <span
                key={t.tag}
                className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-500"
              >
                {t.tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
