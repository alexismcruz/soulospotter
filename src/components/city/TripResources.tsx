import Link from "next/link";

type Props = {
  citySlug?: string;
};

const AFFILIATE_ID = "CDE4NF2";

// GetYourGuide URL map for cities
const GYG_CITY_MAP: Record<string, string> = {
  "new-york-city": "https://www.getyourguide.com/new-york-city-l18/?partner_id=" + AFFILIATE_ID,
  "portland": "https://www.getyourguide.com/portland-l29/?partner_id=" + AFFILIATE_ID,
  "mexico-city": "https://www.getyourguide.com/mexico-city-l43/?partner_id=" + AFFILIATE_ID,
  "medellin": "https://www.getyourguide.com/medellin-l122/?partner_id=" + AFFILIATE_ID,
  "rio-de-janeiro": "https://www.getyourguide.com/rio-de-janeiro-l101/?partner_id=" + AFFILIATE_ID,
  "lisbon": "https://www.getyourguide.com/lisbon-l46/?partner_id=" + AFFILIATE_ID,
  "tbilisi": "https://www.getyourguide.com/tbilisi-l148/?partner_id=" + AFFILIATE_ID,
  "barcelona": "https://www.getyourguide.com/barcelona-l25/?partner_id=" + AFFILIATE_ID,
  "berlin": "https://www.getyourguide.com/berlin-l23/?partner_id=" + AFFILIATE_ID,
  "marrakech": "https://www.getyourguide.com/marrakech-l133/?partner_id=" + AFFILIATE_ID,
  "rishikesh": "https://www.getyourguide.com/rishikesh-l209/?partner_id=" + AFFILIATE_ID,
  "kathmandu": "https://www.getyourguide.com/kathmandu-l75/?partner_id=" + AFFILIATE_ID,
  "chiang-mai": "https://www.getyourguide.com/chiang-mai-l67/?partner_id=" + AFFILIATE_ID,
  "hoi-an": "https://www.getyourguide.com/hoi-an-l192/?partner_id=" + AFFILIATE_ID,
  "bali": "https://www.getyourguide.com/bali-l128/?partner_id=" + AFFILIATE_ID,
  "siargao": "https://www.getyourguide.com/siargao-l329/?partner_id=" + AFFILIATE_ID,
  "kyoto": "https://www.getyourguide.com/kyoto-l104/?partner_id=" + AFFILIATE_ID,
  "seoul": "https://www.getyourguide.com/seoul-l57/?partner_id=" + AFFILIATE_ID,
  "melbourne": "https://www.getyourguide.com/melbourne-l125/?partner_id=" + AFFILIATE_ID,
  "queenstown": "https://www.getyourguide.com/queenstown-l144/?partner_id=" + AFFILIATE_ID,
  "byron-bay": "https://www.getyourguide.com/byron-bay-l211/?partner_id=" + AFFILIATE_ID,
};

export default function TripResources({ citySlug }: Props) {
  const toursHref = citySlug && GYG_CITY_MAP[citySlug] ? GYG_CITY_MAP[citySlug] : "/resources/tours";
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
