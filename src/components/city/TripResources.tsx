import Link from "next/link";

const RESOURCES = [
  {
    href: "/resources/travel-insurance",
    emoji: "🛡️",
    label: "Travel Insurance",
    sublabel: "SafetyWing & World Nomads",
    color: "bg-blue-50 border-blue-200 hover:border-blue-400",
  },
  {
    href: "/resources/esims",
    emoji: "📱",
    label: "eSIM for this trip",
    sublabel: "Stay connected from $5",
    color: "bg-teal-50 border-teal-200 hover:border-teal-400",
  },
  {
    href: "/resources/tours",
    emoji: "🗺️",
    label: "Solo-friendly tours",
    sublabel: "Group tours on GetYourGuide",
    color: "bg-amber-50 border-amber-200 hover:border-amber-400",
  },
];

export default function TripResources() {
  return (
    <div className="my-10 p-6 bg-stone-50 rounded-2xl border border-stone-200">
      <h2 className="text-base font-bold text-stone-800 mb-4">📋 Resources for your trip</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {RESOURCES.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${r.color}`}
          >
            <span className="text-2xl flex-shrink-0">{r.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-stone-800 leading-snug">{r.label}</p>
              <p className="text-xs text-stone-500 mt-0.5">{r.sublabel}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
