import Link from "next/link";
import { Region } from "@prisma/client";
import { REGIONS } from "@/lib/regions";

const REGION_HIGHLIGHTS: Record<Region, string> = {
  NORTH_AMERICA:      "bg-blue-50 border-blue-200 hover:border-blue-400",
  LATIN_AMERICA:      "bg-green-50 border-green-200 hover:border-green-400",
  EUROPE:             "bg-indigo-50 border-indigo-200 hover:border-indigo-400",
  MIDDLE_EAST_AFRICA: "bg-orange-50 border-orange-200 hover:border-orange-400",
  ASIA:               "bg-teal-50 border-teal-200 hover:border-teal-400",
  OCEANIA:            "bg-cyan-50 border-cyan-200 hover:border-cyan-400",
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
          <p className="mt-2 text-soulo-grey">Find your next soulo adventure anywhere in the world.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {REGIONS.map((meta) => {
            const count = regionCounts[meta.region] ?? 0;
            const highlight = REGION_HIGHLIGHTS[meta.region];
            return (
              <Link
                key={meta.region}
                href={`/regions/${meta.slug}`}
                className={`group flex flex-col gap-2 p-5 rounded-2xl border ${highlight} transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
                style={{ borderColor: undefined }}
              >
                <span className="text-3xl">{meta.emoji}</span>
                <div>
                  <p className="font-semibold text-soulo-dark group-hover:text-soulo-slate text-sm leading-snug">
                    {meta.label}
                  </p>
                  <p className="text-xs text-soulo-grey mt-0.5">
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
