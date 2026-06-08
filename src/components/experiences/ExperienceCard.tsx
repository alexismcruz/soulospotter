import Link from "next/link";
import Image from "next/image";
import { ExperienceCategory } from "@prisma/client";
import FlagImage from "@/components/ui/FlagImage";

interface ExperienceCardProps {
  slug: string;
  name: string;
  city: { name: string; country: { code: string; name?: string } };
  category: ExperienceCategory;
  price: number;
  groupSizeMin: number;
  groupSizeMax: number;
  duration: string;
  photoUrl?: string;
  isFeatured: boolean;
}

const CATEGORY_DISPLAY: Record<ExperienceCategory, { label: string; icon: string }> = {
  OUTDOOR_ADVENTURE: { label: "Outdoor & Adventure", icon: "🥾" },
  FOOD_DRINK: { label: "Food & Drink", icon: "🍜" },
  ARTS_CULTURE: { label: "Arts & Culture", icon: "🎨" },
  WELLNESS_MINDFULNESS: { label: "Wellness & Mindfulness", icon: "🧘" },
  NIGHTLIFE_SOCIAL: { label: "Nightlife & Social", icon: "🌙" },
  DAY_TRIPS: { label: "Day Trips", icon: "🚌" },
  PHOTOGRAPHY_WALKS: { label: "Photography Walks", icon: "📸" },
  FITNESS_SPORTS: { label: "Fitness & Sports", icon: "🥊" },
};

export default function ExperienceCard({
  slug,
  name,
  city,
  category,
  price,
  groupSizeMin,
  groupSizeMax,
  duration,
  photoUrl,
  isFeatured,
}: ExperienceCardProps) {
  const categoryInfo = CATEGORY_DISPLAY[category];
  const fallbackImage =
    "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80";
  const imgSrc = photoUrl || fallbackImage;

  return (
    <Link href={`/experiences/${slug}`}>
      <div className={`rounded-2xl overflow-hidden border transition-shadow hover:shadow-lg cursor-pointer h-full flex flex-col ${
        isFeatured ? "border-soulo-gold ring-2 ring-soulo-gold" : "border-soulo-border"
      }`}>
        {/* Photo */}
        <div className="relative w-full h-48 overflow-hidden bg-soulo-linen">
          <Image
            src={imgSrc}
            alt={`${name} — ${categoryInfo.label} in ${city.name}`}
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {isFeatured && (
            <div className="absolute top-3 right-3 bg-soulo-gold text-soulo-dark px-3 py-1 rounded-full text-xs font-bold">
              ⭐ Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Title */}
          <h3 className="font-display font-bold text-soulo-dark text-lg mb-2 line-clamp-2">
            {name}
          </h3>

          {/* City + Flag */}
          <div className="flex items-center gap-2 mb-3">
            <FlagImage code={city.country.code} name={city.country.name ?? city.name} size="sm" />
            <p className="text-sm text-soulo-grey">{city.name}</p>
          </div>

          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-soulo-linen text-soulo-dark text-xs font-semibold">
              <span>{categoryInfo.icon}</span>
              {categoryInfo.label}
            </span>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
            <div>
              <p className="text-xs text-soulo-mist uppercase font-semibold">Price</p>
              <p className="text-soulo-dark font-bold">${price}</p>
            </div>
            <div>
              <p className="text-xs text-soulo-mist uppercase font-semibold">Duration</p>
              <p className="text-soulo-dark font-bold text-sm">{duration}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-soulo-mist uppercase font-semibold">Group Size</p>
              <p className="text-soulo-dark font-bold text-sm">
                {groupSizeMin}-{groupSizeMax} people
              </p>
            </div>
          </div>

          {/* Solo-Friendly Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-soulo-teal text-soulo-dark text-xs font-semibold">
              ✓ Solo-friendly
            </span>
          </div>

          {/* Book Button */}
          <button
            className="mt-auto px-4 py-2.5 bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold rounded-xl transition-colors text-sm w-full"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            View & Book →
          </button>
        </div>
      </div>
    </Link>
  );
}
