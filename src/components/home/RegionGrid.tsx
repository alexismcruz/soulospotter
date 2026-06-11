import Link from "next/link";
import { Region } from "@prisma/client";
import { REGIONS } from "@/lib/regions";

// Representative Unsplash photos per region
const REGION_PHOTOS: Record<Region, string> = {
  ASIA:               "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80&auto=format&fit=crop",
  EUROPE:             "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80&auto=format&fit=crop",
  LATIN_AMERICA:      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80&auto=format&fit=crop",
  NORTH_AMERICA:      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80&auto=format&fit=crop",
  OCEANIA:            "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80&auto=format&fit=crop",
  AFRICA:    "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80&auto=format&fit=crop",
  CARIBBEAN: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80&auto=format&fit=crop",
};

type Props = {
  regionCounts: Partial<Record<Region, number>>;
};

export default function RegionGrid({ regionCounts }: Props) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-soulo-linen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-soulo-dark">Browse by Region</h2>
          <p className="mt-2 text-soulo-grey">Pick a corner of the world and start exploring solo.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {REGIONS.map((meta) => {
            const count = regionCounts[meta.region] ?? 0;
            const photo = REGION_PHOTOS[meta.region];

            return (
              <Link
                key={meta.region}
                href={`/regions/${meta.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[3/2] border border-soulo-border hover:border-soulo-gold transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Background photo */}
                <img
                  src={photo}
                  alt={meta.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <p className="font-display font-bold text-white text-base sm:text-lg leading-tight">
                        {meta.label}
                      </p>
                      <p className="text-xs text-white/70 mt-0.5">
                        {count} {count === 1 ? "city" : "cities"}
                      </p>
                    </div>
                    <span className="text-xl opacity-90">{meta.emoji}</span>
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-soulo-gold text-soulo-dark rounded-full w-7 h-7 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
