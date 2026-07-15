import Link from "next/link";
import { gygCityToursUrl } from "@/lib/affiliates";

type Props = {
  citySlug?: string;
};

export default function TripResources({ citySlug }: Props) {
  const cityTours = citySlug ? gygCityToursUrl(citySlug) : null;
  const toursHref = cityTours ?? "/resources/tours";
  const isExternalLink = toursHref.startsWith("http");

  const RESOURCES = [
    {
      href: "/resources/travel-insurance",
      emoji: "🛡️",
      label: "Travel Insurance",
      sublabel: "SafetyWing & World Nomads",
      border: "border-soulo-teal/30 hover:border-soulo-teal",
      badge: "bg-soulo-teal/10 text-soulo-teal",
    },
    {
      href: "/resources/esims",
      emoji: "📱",
      label: "eSIM for this trip",
      sublabel: "Stay connected from $5",
      border: "border-soulo-gold/30 hover:border-soulo-gold",
      badge: "bg-soulo-gold/10 text-soulo-dark",
    },
    {
      href: toursHref,
      emoji: "🗺️",
      label: "Solo-friendly tours",
      sublabel: "Group tours on GetYourGuide",
      border: "border-soulo-grey/20 hover:border-soulo-grey",
      badge: "bg-soulo-linen text-soulo-grey",
      external: isExternalLink,
    },
  ];
  return (
    <div className="my-10 p-6 bg-soulo-linen rounded-2xl border border-soulo-border">
      <h2 className="font-display text-base font-bold text-soulo-dark mb-4">📋 Resources for your trip</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {RESOURCES.map((r) => {
          const Wrapper = r.external ? "a" : Link;
          const wrapperProps = r.external
            ? { href: r.href, target: "_blank", rel: "noopener noreferrer sponsored" }
            : { href: r.href };

          return (
            <Wrapper
              key={r.href}
              {...wrapperProps}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border bg-white transition-all ${r.border}`}
            >
              <span className="text-2xl flex-shrink-0">{r.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-soulo-dark leading-snug">{r.label}</p>
                <p className="text-xs text-soulo-mist mt-0.5">{r.sublabel}</p>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
