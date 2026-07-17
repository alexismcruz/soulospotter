import Link from "next/link";
import Image from "next/image";
import { CostLevel, Region, SoloLevel } from "@prisma/client";
import { CITY_IMAGES, FALLBACK_IMAGE } from "@/lib/cityImages";
import FlagImage from "@/components/ui/FlagImage";

const COST_BADGE: Record<CostLevel, { symbol: string; color: string }> = {
  BUDGET:    { symbol: "$",   color: "text-soulo-dark bg-soulo-gold" },
  MID_RANGE: { symbol: "$$",  color: "text-soulo-dark bg-amber-200" },
  EXPENSIVE: { symbol: "$$$", color: "text-white bg-purple-500" },
};

const SOLO_LEVEL_BADGE: Record<SoloLevel, { label: string; color: string }> = {
  BEGINNER:     { label: "Solo Friendly", color: "bg-emerald-100 text-emerald-800" },
  INTERMEDIATE: { label: "Confident Solo", color: "bg-amber-100 text-amber-800" },
  ADVANCED:     { label: "Experienced Solo", color: "bg-rose-100 text-rose-800" },
};

type City = {
  id: string;
  name: string;
  slug: string;
  region: Region;
  costLevel: CostLevel | null;
  soloLevel: SoloLevel | null;
  safetyScore: number | null;
  description: string | null;
  imageUrl: string | null;
  country: { name: string; code: string; flagEmoji: string | null };
  tags: { tag: string }[];
  _count: { spots: number };
};

export default function CityCard({ city }: { city: City }) {
  // DB imageUrl takes priority, then hardcoded map, then fallback
  const imgSrc = city.imageUrl ?? CITY_IMAGES[city.slug] ?? FALLBACK_IMAGE;
  const cost = city.costLevel ? COST_BADGE[city.costLevel] : null;
  const solo = city.soloLevel ? SOLO_LEVEL_BADGE[city.soloLevel] : null;

  return (
    <Link
      href={`/destinations/${city.slug}`}
      className="group rounded-2xl overflow-hidden border border-soulo-border bg-white hover:shadow-lg hover:border-soulo-gold transition-all duration-200 hover:-translate-y-1 flex flex-col"
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          src={imgSrc}
          alt={`Solo travel in ${city.name}, ${city.country.name}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {cost && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cost.color}`}>
              {cost.symbol}
            </span>
          )}
          {city.safetyScore && city.safetyScore >= 9 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-soulo-teal text-soulo-dark">
              Very Safe
            </span>
          )}
        </div>
        {solo && (
          <div className="absolute bottom-3 left-3">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${solo.color}`}>
              {solo.label}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-display font-semibold text-soulo-dark group-hover:text-soulo-slate transition-colors leading-snug">
              {city.name}
            </h3>
            <p className="text-xs text-soulo-mist mt-0.5">
              <FlagImage code={city.country.code} name={city.country.name} /> {city.country.name}
            </p>
          </div>
          <span className="text-xs text-soulo-mist whitespace-nowrap mt-0.5">
            {city._count.spots} spots
          </span>
        </div>

        {city.description && (
          <p className="text-xs text-soulo-grey line-clamp-2 leading-relaxed flex-1">
            {city.description}
          </p>
        )}

        {city.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {city.tags.slice(0, 3).map((t) => (
              <span
                key={t.tag}
                className="text-xs px-2 py-0.5 rounded-full bg-soulo-linen text-soulo-grey border border-soulo-border"
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
