/**
 * JSON-LD structured data builders for SouloSpotter.
 * All schema.org types chosen for maximum Google rich-result eligibility.
 */

const BASE = "https://soulospotter.com";

// ── Breadcrumb ────────────────────────────────────────────────────────────────
export type BreadcrumbItem = { name: string; url: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ── WebSite (homepage — enables Google Sitelinks Search Box) ──────────────────
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SouloSpotter",
    url: BASE,
    description:
      "The global directory for solo travelers. Curated cafes, coworking spaces, accommodation, and experiences in 19 cities worldwide.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/destinations?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SouloSpotter",
    url: BASE,
    logo: `${BASE}/logo.png`,
    description: "Curated solo travel directory for cities worldwide.",
    sameAs: [
      "https://instagram.com/soulospotter",
      "https://twitter.com/soulospotter",
    ],
  };
}

// ── City / TravelDestination ──────────────────────────────────────────────────
export function citySchema({
  name,
  slug,
  description,
  countryName,
  countryCode,
  imageUrl,
}: {
  name: string;
  slug: string;
  description: string | null;
  countryName: string;
  countryCode: string;
  imageUrl?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TravelDestination",
    name,
    description: description ?? `Solo travel guide for ${name}, ${countryName}.`,
    url: `${BASE}/destinations/${slug}`,
    ...(imageUrl ? { image: imageUrl.startsWith("/") ? `${BASE}${imageUrl}` : imageUrl } : {}),
    containedInPlace: {
      "@type": "Country",
      name: countryName,
      identifier: countryCode,
    },
    touristType: {
      "@type": "Audience",
      audienceType: "Solo traveler",
    },
  };
}

// ── Spot / Place ──────────────────────────────────────────────────────────────
// Maps our SpotCategory enum → best-fit Schema.org type
const CATEGORY_SCHEMA_TYPE: Record<string, string> = {
  ACCOMMODATION:   "LodgingBusiness",
  CAFE:            "CafeOrCoffeeShop",
  RESTAURANT:      "Restaurant",
  COWORKING:       "LocalBusiness",
  ARTS_CULTURE:    "TouristAttraction",
  CULTURAL_SITE:   "TouristAttraction",
  ATTRACTION:      "TouristAttraction",
  OUTDOOR:         "TouristAttraction",
  NATURE:          "TouristAttraction",
  WELLNESS:        "HealthAndBeautyBusiness",
  NIGHTLIFE:       "BarOrPub",
  SHOPPING:        "Store",
  FOOD_DRINK:      "Restaurant",
  DAY_TRIP:        "TouristAttraction",
};

export function spotSchema({
  name,
  slug,
  category,
  description,
  address,
  cityName,
  citySlug,
  countryName,
  countryCode,
  imageUrl,
  website,
  categorySlug,
}: {
  name: string;
  slug: string;
  category: string;
  description: string | null;
  address: string | null;
  cityName: string;
  citySlug: string;
  countryName: string;
  countryCode: string;
  imageUrl?: string | null;
  website?: string | null;
  categorySlug: string;
}) {
  const schemaType = CATEGORY_SCHEMA_TYPE[category] ?? "LocalBusiness";
  const pageUrl = `${BASE}/destinations/${citySlug}/${categorySlug}/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    name,
    description: description ?? `${name} is a solo-travel-friendly spot in ${cityName}.`,
    url: pageUrl,
    ...(imageUrl ? { image: imageUrl.startsWith("/") ? `${BASE}${imageUrl}` : imageUrl } : {}),
    ...(website ? { sameAs: website } : {}),
    address: {
      "@type": "PostalAddress",
      ...(address ? { streetAddress: address } : {}),
      addressLocality: cityName,
      addressCountry: countryCode,
    },
    containedInPlace: {
      "@type": "City",
      name: cityName,
    },
    touristType: {
      "@type": "Audience",
      audienceType: "Solo traveler",
    },
  };
}

// ── Experience / TouristTrip ──────────────────────────────────────────────────
export function experienceSchema({
  name,
  slug,
  description,
  price,
  duration,
  cityName,
  countryName,
  imageUrl,
}: {
  name: string;
  slug: string;
  description: string;
  price: number;
  duration: string;
  cityName: string;
  countryName: string;
  imageUrl?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name,
    description,
    url: `${BASE}/experiences/${slug}`,
    ...(imageUrl ? { image: imageUrl.startsWith("/") ? `${BASE}${imageUrl}` : imageUrl } : {}),
    touristType: {
      "@type": "Audience",
      audienceType: "Solo traveler",
    },
    itinerary: {
      "@type": "ItemList",
      name: cityName,
    },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
      url: `${BASE}/experiences/${slug}`,
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "Organization",
      name: "SouloSpotter",
      url: BASE,
    },
    duration,
    locationCreated: {
      "@type": "City",
      name: cityName,
      containedInPlace: {
        "@type": "Country",
        name: countryName,
      },
    },
  };
}
