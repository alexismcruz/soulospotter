import Link from "next/link";
import { gygCityToursUrl, bookingStaysUrl } from "@/lib/affiliates";

type Props = {
  citySlug?: string;
  /** Needed for the "Where to stay" (Booking.com) link; omit to hide it. */
  cityName?: string;
  countryName?: string;
  countryCode?: string;
  region?: string;
};

export default function TripResources({ citySlug, cityName, countryName, countryCode, region }: Props) {
  const cityTours = citySlug ? gygCityToursUrl(citySlug) : null;
  const toursHref = cityTours ?? "/resources/tours";
  const isExternalLink = toursHref.startsWith("http");

  // Null when Booking.com has no CJ program for this region yet -> button hidden.
  const staysHref =
    citySlug && cityName && countryName && countryCode && region
      ? bookingStaysUrl({ citySlug, cityName, countryName, countryCode, region })
      : null;

  const RESOURCES = [
    ...(staysHref
      ? [
          {
            href: staysHref,
            emoji: "🏨",
            label: `Where to stay in ${cityName}`,
            sublabel: "Hotels & stays on Booking.com",
            border: "border-soulo-slate/30 hover:border-soulo-slate",
            badge: "bg-soulo-slate/10 text-soulo-slate",
            external: true,
          },
        ]
      : []),
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
  const gridCols = RESOURCES.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3";

  return (
    <div className="my-10 p-6 bg-soulo-linen rounded-2xl border border-soulo-border">
      <h2 className="font-display text-base font-bold text-soulo-dark mb-4">📋 Resources for your trip</h2>
      <div className={`grid grid-cols-1 ${gridCols} gap-3`}>
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
      <p className="mt-3 text-xs text-soulo-mist">
        Some of these are affiliate links — we may earn a commission if you book, at no extra cost to you.
      </p>
    </div>
  );
}
