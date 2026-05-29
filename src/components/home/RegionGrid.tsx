import Link from "next/link";
import { useTranslations } from "next-intl";
import { Region } from "@prisma/client";

const REGION_META: Record<
  Region,
  { emoji: string; slug: string; highlight: string }
> = {
  NORTH_AMERICA:      { emoji: "🗽", slug: "north-america",      highlight: "bg-blue-50 border-blue-200" },
  LATIN_AMERICA:      { emoji: "🌿", slug: "latin-america",      highlight: "bg-green-50 border-green-200" },
  EUROPE:             { emoji: "🏛️", slug: "europe",             highlight: "bg-indigo-50 border-indigo-200" },
  MIDDLE_EAST_AFRICA: { emoji: "🏜️", slug: "middle-east-africa", highlight: "bg-orange-50 border-orange-200" },
  SOUTH_ASIA:         { emoji: "🕌", slug: "south-asia",         highlight: "bg-yellow-50 border-yellow-200" },
  SOUTHEAST_ASIA:     { emoji: "🌴", slug: "southeast-asia",     highlight: "bg-teal-50 border-teal-200" },
  EAST_ASIA:          { emoji: "⛩️", slug: "east-asia",          highlight: "bg-red-50 border-red-200" },
  OCEANIA:            { emoji: "🌊", slug: "oceania",            highlight: "bg-cyan-50 border-cyan-200" },
};

type Props = {
  regionCounts: Partial<Record<Region, number>>;
};

export default function RegionGrid({ regionCounts }: Props) {
  const t = useTranslations("regions");

  const regions = Object.entries(REGION_META) as [Region, typeof REGION_META[Region]][];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">Browse by Region</h2>
          <p className="mt-2 text-stone-500">Find your next solo adventure anywhere in the world.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {regions.map(([region, meta]) => {
            const count = regionCounts[region] ?? 0;
            return (
              <Link
                key={region}
                href={`/regions/${meta.slug}`}
                className={`group flex flex-col gap-2 p-5 rounded-2xl border ${meta.highlight} hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
              >
                <span className="text-3xl">{meta.emoji}</span>
                <div>
                  <p className="font-semibold text-stone-800 group-hover:text-stone-900 text-sm leading-snug">
                    {t(region)}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {count} {count === 1 ? "city" : "cities"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
