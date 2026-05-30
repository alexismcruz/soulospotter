import Link from "next/link";
import { CostLevel } from "@prisma/client";

const COST_LABEL: Record<CostLevel, { label: string; color: string }> = {
  BUDGET:    { label: "$",   color: "text-green-600 bg-green-50" },
  MID_RANGE: { label: "$$",  color: "text-amber-600 bg-amber-50" },
  EXPENSIVE: { label: "$$$", color: "text-red-600 bg-red-50" },
};

import { CITY_IMAGES, FALLBACK_IMAGE } from "@/lib/cityImages";

type CityWithRelations = {
  id: string;
  name: string;
  slug: string;
  region: string;
  costLevel: CostLevel | null;
  safetyScore: number | null;
  description: string | null;
  country: { name: string; flagEmoji: string | null };
  tags: { tag: string }[];
  _count: { spots: number };
};

type Props = {
  cities: CityWithRelations[];
};

export default function FeaturedCities({ cities }: Props) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">Featured Destinations</h2>
            <p className="mt-2 text-stone-500">Hand-picked cities for the solo traveler.</p>
          </div>
          <Link
            href="/destinations"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cities.map((city) => {
            const imgSrc = CITY_IMAGES[city.slug] ?? FALLBACK_IMAGE;
            const cost = city.costLevel ? COST_LABEL[city.costLevel] : null;

            return (
              <Link
                key={city.id}
                href={`/destinations/${city.slug}`}
                className="group rounded-2xl overflow-hidden border border-stone-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {cost && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cost.color}`}>
                        {cost.label}
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
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-stone-900 group-hover:text-amber-600 transition-colors">
                        {city.name}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {city.country.flagEmoji} {city.country.name}
                      </p>
                    </div>
                    <span className="text-xs text-stone-400 whitespace-nowrap mt-0.5">
                      {city._count.spots} spots
                    </span>
                  </div>

                  {city.description && (
                    <p className="mt-2 text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {city.description}
                    </p>
                  )}

                  {/* Tags */}
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
          })}
        </div>

        {/* Mobile view all */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            View all destinations
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
