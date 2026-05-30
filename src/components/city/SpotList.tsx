import Link from "next/link";
import { SpotCategory, PriceRange, AffiliateProvider } from "@prisma/client";

const CATEGORY_META: Record<SpotCategory, { emoji: string; label: string }> = {
  ACCOMMODATION: { emoji: "🏨", label: "Accommodation" },
  CAFE:          { emoji: "☕", label: "Cafes" },
  COWORKING:     { emoji: "💻", label: "Coworking" },
  FOOD:          { emoji: "🍜", label: "Food & Drink" },
  WELLNESS:      { emoji: "🧘", label: "Wellness" },
  COMMUNITY:     { emoji: "🤝", label: "Community" },
  NATURE:        { emoji: "🏔️", label: "Nature" },
  CULTURE:       { emoji: "🏛️", label: "Culture" },
  NIGHTLIFE:     { emoji: "🌙", label: "Nightlife" },
  TRANSPORT:     { emoji: "✈️", label: "Transport" },
};

const PRICE_LABELS: Record<PriceRange, { label: string; color: string }> = {
  FREE:   { label: "Free",   color: "text-emerald-600 bg-emerald-50" },
  BUDGET: { label: "$",      color: "text-green-600 bg-green-50" },
  MID:    { label: "$$",     color: "text-amber-600 bg-amber-50" },
  HIGH:   { label: "$$$",    color: "text-red-500 bg-red-50" },
};

const AFFILIATE_LABELS: Partial<Record<AffiliateProvider, string>> = {
  BOOKING_COM:   "Book on Booking.com",
  HOSTELWORLD:   "Book on Hostelworld",
  AIRBNB:        "Book on Airbnb",
  SAFETYWING:    "Get Travel Insurance",
  WORLD_NOMADS:  "Get Travel Insurance",
  AIRALO:        "Get an eSIM",
  GETYOURGUIDE:  "Book a Tour",
  VIATOR:        "Book on Viator",
  OTHER:         "Learn More",
};

type AffiliateLink = {
  id: string;
  provider: AffiliateProvider;
  url: string;
  label: string | null;
};

type SpotTag = { tag: string };

type Spot = {
  id: string;
  name: string;
  slug: string;
  category: SpotCategory;
  description: string | null;
  address: string | null;
  website: string | null;
  priceRange: PriceRange | null;
  rating: number | null;
  tags: SpotTag[];
  affiliateLinks: AffiliateLink[];
};

type Props = {
  spots: Spot[];
  allSpots: Spot[];
  categories: SpotCategory[];
  activeCategory: SpotCategory | undefined;
  citySlug: string;
};

export default function SpotList({ spots, allSpots, categories, activeCategory, citySlug }: Props) {
  return (
    <div>
      {/* Category filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        <Link
          href={`/destinations/${citySlug}`}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !activeCategory
              ? "bg-stone-900 text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          All ({allSpots.length})
        </Link>
        {categories.map((cat) => {
          const meta = CATEGORY_META[cat];
          const count = allSpots.filter((s) => s.category === cat).length;
          return (
            <Link
              key={cat}
              href={`/destinations/${citySlug}?category=${cat}`}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              <span>{meta.emoji}</span>
              <span>{meta.label}</span>
              <span className="text-xs opacity-60">({count})</span>
            </Link>
          );
        })}
      </div>

      {/* Spot count */}
      <p className="text-sm text-stone-500 mb-6">
        Showing <strong className="text-stone-800">{spots.length}</strong>{" "}
        {spots.length === 1 ? "spot" : "spots"}
        {activeCategory && ` in ${CATEGORY_META[activeCategory].label}`}
      </p>

      {/* Spot cards */}
      {spots.length === 0 ? (
        <div className="text-center py-16 text-stone-400">
          <p className="text-4xl mb-3">🗺️</p>
          <p className="font-medium">No spots in this category yet.</p>
          <p className="text-sm mt-1">Check back soon or browse all spots.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spots.map((spot) => {
            const meta = CATEGORY_META[spot.category];
            const price = spot.priceRange ? PRICE_LABELS[spot.priceRange] : null;

            return (
              <div
                key={spot.id}
                className="bg-white rounded-2xl border border-stone-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden flex flex-col"
              >
                {/* Card header */}
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{meta.emoji}</span>
                      <div>
                        <h3 className="font-semibold text-stone-900 leading-snug">{spot.name}</h3>
                        <p className="text-xs text-stone-400 mt-0.5">{meta.label}</p>
                      </div>
                    </div>
                    {price && (
                      <span className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${price.color}`}>
                        {price.label}
                      </span>
                    )}
                  </div>

                  {spot.description && (
                    <p className="text-sm text-stone-500 leading-relaxed line-clamp-3">
                      {spot.description}
                    </p>
                  )}

                  {spot.address && (
                    <p className="mt-3 text-xs text-stone-400 flex items-start gap-1">
                      <span className="mt-0.5">📍</span>
                      <span>{spot.address}</span>
                    </p>
                  )}

                  {/* Tags */}
                  {spot.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {spot.tags.slice(0, 4).map((t) => (
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

                {/* Card footer — CTAs */}
                {(spot.website || spot.affiliateLinks.length > 0) && (
                  <div className="px-5 pb-4 pt-3 border-t border-stone-100 flex flex-wrap gap-2">
                    {spot.affiliateLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-900 transition-colors"
                      >
                        {link.label ?? AFFILIATE_LABELS[link.provider] ?? "Book Now"}
                      </a>
                    ))}
                    {spot.website && (
                      <a
                        href={spot.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-xs font-medium px-3 py-2 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
