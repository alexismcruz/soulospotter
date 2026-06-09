"use client";

import Link from "next/link";
import ExperienceCard from "@/components/experiences/ExperienceCard";
import { ExperienceCategory } from "@prisma/client";

export interface CityExperienceItem {
  id: string;
  slug: string;
  name: string;
  category: ExperienceCategory;
  price: number;
  groupSizeMin: number;
  groupSizeMax: number;
  duration: string;
  photoUrl?: string;
  isFeatured: boolean;
  city: {
    name: string;
    country: { code: string; name: string };
  };
}

interface CityExperiencesProps {
  experiences: CityExperienceItem[];
  cityName: string;
  citySlug: string;
}

export default function CityExperiences({ experiences, cityName, citySlug }: CityExperiencesProps) {
  // Graceful: render nothing when the city has no experiences.
  if (experiences.length === 0) return null;

  return (
    <section className="bg-soulo-linen border border-soulo-border rounded-2xl p-5 sm:p-6 mt-8">
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-soulo-dark">
            Things to do in {cityName}
          </h2>
          <p className="text-sm text-soulo-grey mt-0.5">
            Solo-friendly tours &amp; activities, hand-picked
          </p>
        </div>
        <Link
          href={`/experiences?city=${encodeURIComponent(citySlug)}`}
          className="text-sm font-semibold text-soulo-gold hover:text-amber-500 transition-colors whitespace-nowrap"
        >
          All experiences →
        </Link>
      </div>

      {/* Horizontal scroller — cards keep a fixed width and scroll-snap */}
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="snap-start shrink-0 w-[260px] sm:w-[280px]"
          >
            <ExperienceCard
              slug={exp.slug}
              name={exp.name}
              city={exp.city}
              category={exp.category}
              price={exp.price}
              groupSizeMin={exp.groupSizeMin}
              groupSizeMax={exp.groupSizeMax}
              duration={exp.duration}
              photoUrl={exp.photoUrl}
              isFeatured={exp.isFeatured}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
