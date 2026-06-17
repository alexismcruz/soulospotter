"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { SpotCategory, PriceRange, AffiliateProvider } from "@prisma/client";
import { CATEGORY_SLUGS, CATEGORY_META } from "@/lib/categoryUtils";

const PRICE_LABELS: Record<PriceRange, { label: string; color: string }> = {
  FREE:   { label: "Free",   color: "text-emerald-600 bg-emerald-50" },
  BUDGET: { label: "$",      color: "text-soulo-dark bg-soulo-gold" },
  MID:    { label: "$$",     color: "text-soulo-dark bg-amber-200" },
  HIGH:   { label: "$$$",    color: "text-white bg-purple-500" },
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
  imageUrl: string | null;
  priceRange: PriceRange | null;
  rating: number | null;
  meetPeople: boolean;
  comfortableAlone: boolean;
  tags: SpotTag[];
  affiliateLinks: AffiliateLink[];
};

type Props = {
  spots: Spot[];
  allSpots: Spot[];
  categories: SpotCategory[];
  activeCategory: SpotCategory | undefined;
  citySlug: string;
  cityName: string;
};

export default function SpotList({ spots, allSpots, categories, activeCategory, citySlug, cityName }: Props) {
  const [filterMeet, setFilterMeet] = useState(false);
  const [filterAlone, setFilterAlone] = useState(false);

  const filtered = useMemo(() => {
    return spots.filter((s) => {
      if (filterMeet && !s.meetPeople) return false;
      if (filterAlone && !s.comfortableAlone) return false;
      return true;
    });
  }, [spots, filterMeet, filterAlone]);

  const meetCount = spots.filter((s) => s.meetPeople).length;
  const aloneCount = spots.filter((s) => s.comfortableAlone).length;

  return (
    <div>
      {/* Category filter tabs */}
      <div className="sticky top-16 z-20 bg-soulo-white/95 backdrop-blur-sm border-b border-soulo-border -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-3 pb-3 mb-8 flex items-center gap-2 overflow-x-auto scrollbar-hide">
        <Link
          href={`/destinations/${citySlug}`}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !activeCategory
              ? "bg-soulo-slate text-white"
              : "bg-soulo-linen text-soulo-grey hover:bg-soulo-linen"
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
              href={`/destinations/${citySlug}/${CATEGORY_SLUGS[cat]}`}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-soulo-slate text-white"
                  : "bg-soulo-linen text-soulo-grey hover:bg-soulo-linen"
              }`}
            >
              <span>{meta.emoji}</span>
              <span>{meta.label}</span>
              <span className="text-xs opacity-60">({count})</span>
            </Link>
          );
        })}
      </div>

      {/* Section heading */}
      <h2 className="font-display text-2xl font-bold text-soulo-dark mb-2">
        {activeCategory
          ? `Best ${CATEGORY_META[activeCategory].label} in ${cityName} for Solo Travelers`
          : `Top Spots in ${cityName} for Solo Travelers`}
      </h2>

      {/* Solo filter toggles */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs text-soulo-mist font-medium uppercase tracking-wide">Solo filters:</span>
        <button
          onClick={() => setFilterMeet((v) => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            filterMeet
              ? "bg-violet-600 text-white border-violet-600"
              : "bg-white border-soulo-border text-soulo-grey hover:bg-soulo-linen"
          }`}
        >
          <span>🤝</span>
          Meet People
          <span className={`text-xs ${filterMeet ? "opacity-75" : "text-soulo-mist"}`}>({meetCount})</span>
        </button>
        <button
          onClick={() => setFilterAlone((v) => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            filterAlone
              ? "bg-soulo-gold text-soulo-dark border-soulo-gold"
              : "bg-white border-soulo-border text-soulo-grey hover:bg-soulo-linen"
          }`}
        >
          <span>🧘</span>
          Comfortable Alone
          <span className={`text-xs ${filterAlone ? "opacity-60" : "text-soulo-mist"}`}>({aloneCount})</span>
        </button>
        {(filterMeet || filterAlone) && (
          <button
            onClick={() => { setFilterMeet(false); setFilterAlone(false); }}
            className="text-xs text-soulo-mist hover:text-soulo-grey underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Spot count */}
      <p className="text-sm text-soulo-grey mb-6">
        Showing <strong className="text-soulo-dark">{filtered.length}</strong>{" "}
        {filtered.length === 1 ? "spot" : "spots"}
        {activeCategory && ` in ${CATEGORY_META[activeCategory].label}`}
        {(filterMeet || filterAlone) && ` matching your solo filters`}
      </p>

      {/* Spot cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-soulo-mist">
          <p className="text-4xl mb-3">🗺️</p>
          <p className="font-medium">No spots match your filters.</p>
          <button
            onClick={() => { setFilterMeet(false); setFilterAlone(false); }}
            className="mt-3 text-sm text-soulo-gold hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((spot) => {
            const meta = CATEGORY_META[spot.category];
            const price = spot.priceRange ? PRICE_LABELS[spot.priceRange] : null;
            const spotUrl = `/destinations/${citySlug}/${CATEGORY_SLUGS[spot.category]}/${spot.slug}`;

            return (
              <Link
                key={spot.id}
                href={spotUrl}
                className="bg-white rounded-2xl border border-soulo-border hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden flex flex-col group"
              >
                {/* Photo */}
                {spot.imageUrl && (
                  <div className="relative w-full h-48 bg-soulo-linen overflow-hidden">
                    <Image
                      src={spot.imageUrl.startsWith("http") ? `/api/img?url=${encodeURIComponent(spot.imageUrl)}` : spot.imageUrl}
                      alt={`${spot.name} — ${meta.label} in ${cityName}`}
                      fill
                      loading="lazy"
                      unoptimized={spot.imageUrl.startsWith("http")}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Card header */}
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{meta.emoji}</span>
                      <div>
                        <h3 className="font-semibold text-soulo-dark leading-snug group-hover:text-soulo-gold transition-colors">{spot.name}</h3>
                        <p className="text-xs text-soulo-mist mt-0.5">{meta.label}</p>
                      </div>
                    </div>
                    {price && (
                      <span className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${price.color}`}>
                        {price.label}
                      </span>
                    )}
                  </div>

                  {spot.description && (
                    <p className="text-sm text-soulo-grey leading-relaxed line-clamp-3">
                      {spot.description}
                    </p>
                  )}

                  {spot.address && (
                    <p className="mt-3 text-xs text-soulo-mist flex items-start gap-1">
                      <span className="mt-0.5">📍</span>
                      <span>{spot.address}</span>
                    </p>
                  )}

                  {/* Solo badges */}
                  {(spot.meetPeople || spot.comfortableAlone) && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {spot.meetPeople && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 font-medium">
                          🤝 Meet People
                        </span>
                      )}
                      {spot.comfortableAlone && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium">
                          🧘 Solo Friendly
                        </span>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {spot.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {spot.tags.slice(0, 4).map((t) => (
                        <span
                          key={t.tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-soulo-linen text-soulo-grey"
                        >
                          {t.tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card footer — CTAs */}
                {(spot.website || spot.affiliateLinks.length > 0) && (
                  <div className="px-5 pb-4 pt-3 border-t border-soulo-border flex flex-wrap gap-2">
                    {spot.affiliateLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-lg bg-soulo-gold hover:bg-amber-400 text-soulo-dark transition-colors"
                      >
                        {link.label ?? AFFILIATE_LABELS[link.provider] ?? "Book Now"}
                      </a>
                    ))}
                    {spot.website && (
                      <a
                        href={spot.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-center text-xs font-medium px-3 py-2 rounded-lg border border-soulo-border text-soulo-grey hover:bg-soulo-linen transition-colors"
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
