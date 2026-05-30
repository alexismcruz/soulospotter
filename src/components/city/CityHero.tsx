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

const CITY_IMAGES: Record<string, string> = {
  "bali":           "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=85",
  "chiang-mai":     "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200&q=85",
  "lisbon":         "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=85",
  "kyoto":          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=85",
  "tbilisi":        "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&q=85",
  "barcelona":      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
  "mexico-city":    "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=1200&q=85",
  "medellin":       "https://images.unsplash.com/photo-1614894775893-2e934f6ce5e3?w=1200&q=85",
  "hoi-an":         "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&q=85",
  "marrakech":      "https://images.unsplash.com/photo-1597212618440-806262de4f2b?w=1200&q=85",
  "seoul":          "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=1200&q=85",
  "melbourne":      "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=1200&q=85",
  "berlin":         "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200&q=85",
  "rishikesh":      "https://images.unsplash.com/photo-1590123552938-7cc5e66cf5f7?w=1200&q=85",
  "kathmandu":      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&q=85",
  "siargao":        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=85",
  "new-york-city":  "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=85",
  "portland":       "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85",
  "rio-de-janeiro": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1200&q=85",
  "byron-bay":      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85",
  "queenstown":     "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1200&q=85",
};

const FALLBACK = "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=85";

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
  country: { name: string; flagEmoji: string | null };
  tags: { tag: string }[];
  spots: unknown[];
};

export default function CityHero({ city }: { city: CityWithRelations }) {
  const imgSrc = CITY_IMAGES[city.slug] ?? FALLBACK;

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
          <span className="text-white">{city.name}</span>
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
            {city.country.flagEmoji} {city.name}
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
