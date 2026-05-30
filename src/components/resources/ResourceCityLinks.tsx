import Link from "next/link";
import { CITY_IMAGES, FALLBACK_IMAGE } from "@/lib/cityImages";

// City display names keyed by slug
const CITY_NAMES: Record<string, { name: string; country: string; flag: string }> = {
  "bali":           { name: "Bali",           country: "Indonesia",    flag: "🇮🇩" },
  "chiang-mai":     { name: "Chiang Mai",      country: "Thailand",     flag: "🇹🇭" },
  "lisbon":         { name: "Lisbon",          country: "Portugal",     flag: "🇵🇹" },
  "kyoto":          { name: "Kyoto",           country: "Japan",        flag: "🇯🇵" },
  "tbilisi":        { name: "Tbilisi",         country: "Georgia",      flag: "🇬🇪" },
  "barcelona":      { name: "Barcelona",       country: "Spain",        flag: "🇪🇸" },
  "mexico-city":    { name: "Mexico City",     country: "Mexico",       flag: "🇲🇽" },
  "medellin":       { name: "Medellín",        country: "Colombia",     flag: "🇨🇴" },
  "hoi-an":         { name: "Hội An",          country: "Vietnam",      flag: "🇻🇳" },
  "marrakech":      { name: "Marrakech",       country: "Morocco",      flag: "🇲🇦" },
  "seoul":          { name: "Seoul",           country: "South Korea",  flag: "🇰🇷" },
  "melbourne":      { name: "Melbourne",       country: "Australia",    flag: "🇦🇺" },
  "berlin":         { name: "Berlin",          country: "Germany",      flag: "🇩🇪" },
  "rishikesh":      { name: "Rishikesh",       country: "India",        flag: "🇮🇳" },
  "kathmandu":      { name: "Kathmandu",       country: "Nepal",        flag: "🇳🇵" },
  "siargao":        { name: "Siargao",         country: "Philippines",  flag: "🇵🇭" },
  "new-york-city":  { name: "New York City",   country: "USA",          flag: "🇺🇸" },
  "portland":       { name: "Portland",        country: "USA",          flag: "🇺🇸" },
  "rio-de-janeiro": { name: "Rio de Janeiro",  country: "Brazil",       flag: "🇧🇷" },
  "byron-bay":      { name: "Byron Bay",       country: "Australia",    flag: "🇦🇺" },
  "queenstown":     { name: "Queenstown",      country: "New Zealand",  flag: "🇳🇿" },
};

type Props = {
  title: string;
  slugs: string[];
};

export default function ResourceCityLinks({ title, slugs }: Props) {
  return (
    <section>
      <h2 className="text-xl font-bold text-stone-900 mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {slugs.map((slug) => {
          const city = CITY_NAMES[slug];
          if (!city) return null;
          const img = CITY_IMAGES[slug] ?? FALLBACK_IMAGE;
          return (
            <Link
              key={slug}
              href={`/destinations/${slug}`}
              className="group relative h-24 rounded-xl overflow-hidden border border-stone-200"
            >
              <img src={img} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-2.5">
                <p className="text-white text-xs font-semibold leading-tight">{city.flag} {city.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
