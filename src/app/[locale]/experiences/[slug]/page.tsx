import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import FlagImage from "@/components/ui/FlagImage";
import AffiliateCTA from "@/components/resources/AffiliateCTA";
import JsonLd from "@/components/seo/JsonLd";
import { experienceSchema, breadcrumbSchema } from "@/lib/jsonld";

const BASE = "https://soulospotter.com";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

async function getExperience(slug: string) {
  return prisma.experience.findUnique({
    where: { slug },
    include: {
      city: { include: { country: true } },
      organizer: true,
    },
  });
}

export async function generateStaticParams() {
  const experiences = await prisma.experience.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperience(slug);
  if (!experience) return {};
  return {
    title: `${experience.name} in ${experience.city.name} — SouloSpotter`,
    description: experience.description.substring(0, 160),
    alternates: { canonical: `${BASE}/experiences/${slug}` },
    openGraph: {
      title: `${experience.name} | SouloSpotter`,
      description: experience.description.substring(0, 160),
    },
  };
}

const CATEGORY_DISPLAY: Record<string, { label: string; icon: string }> = {
  OUTDOOR_ADVENTURE:    { label: "Outdoor & Adventure",   icon: "🥾" },
  FOOD_DRINK:           { label: "Food & Drink",           icon: "🍜" },
  ARTS_CULTURE:         { label: "Arts & Culture",         icon: "🎨" },
  WELLNESS_MINDFULNESS: { label: "Wellness & Mindfulness", icon: "🧘" },
  NIGHTLIFE_SOCIAL:     { label: "Nightlife & Social",     icon: "🌙" },
  DAY_TRIPS:            { label: "Day Trips",              icon: "🚌" },
  PHOTOGRAPHY_WALKS:    { label: "Photography Walks",      icon: "📸" },
  FITNESS_SPORTS:       { label: "Fitness & Sports",       icon: "🥊" },
};

// Rough USD price benchmarks for common experience types
const PRICE_NOTES: Record<string, string> = {
  FOOD_DRINK:           "Typical range $20–$80 USD depending on city",
  OUTDOOR_ADVENTURE:    "Typical range $30–$120 USD depending on activity",
  WELLNESS_MINDFULNESS: "Drop-in classes often $10–$30 USD; retreats vary widely",
  FITNESS_SPORTS:       "1-session classes typically $15–$40 USD",
  ARTS_CULTURE:         "Workshops typically $25–$70 USD",
  DAY_TRIPS:            "Full-day trips typically $30–$100 USD",
  PHOTOGRAPHY_WALKS:    "Guided walks typically $30–$60 USD",
  NIGHTLIFE_SOCIAL:     "Events typically $15–$50 USD",
};

// Is it a placeholder/example organizer email?
function isPlaceholderEmail(email: string) {
  return email.includes(".example") || email.includes("@example") || email.includes("placeholder");
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const experience = await getExperience(slug);
  if (!experience) notFound();

  const categoryInfo = CATEGORY_DISPLAY[experience.category] || { label: experience.category, icon: "🎯" };

  const relatedExperiences = await prisma.experience.findMany({
    where: { cityId: experience.cityId, isActive: true, NOT: { id: experience.id } },
    include: { city: { include: { country: true } } },
    take: 3,
  });

  const fallbackPhoto = "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=85";
  const heroPhoto = experience.photoUrl
    ? experience.photoUrl.replace("w=600", "w=1200").replace("q=80", "q=85")
    : fallbackPhoto;

  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(experience.name + " " + experience.city.name)}`;
  const hasRealContact = !isPlaceholderEmail(experience.organizer.email);
  const isPlaceholderBooking = experience.bookingUrl === "https://www.getyourguide.com/" || experience.bookingUrl === "https://www.getyourguide.com";

  const jsonLd = [
    experienceSchema({
      name: experience.name,
      slug: experience.slug,
      description: experience.description,
      price: experience.price,
      duration: experience.duration,
      cityName: experience.city.name,
      countryName: experience.city.country.name,
      imageUrl: experience.photoUrl,
    }),
    breadcrumbSchema([
      { name: "Home",             url: BASE },
      { name: "Experiences",      url: `${BASE}/experiences` },
      { name: experience.name,    url: `${BASE}/experiences/${experience.slug}` },
    ]),
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main className="flex-1">

        {/* Full-bleed hero photo */}
        <div className="relative h-72 sm:h-96 overflow-hidden bg-soulo-slate">
          <img src={heroPhoto} alt={experience.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-soulo-dark/80 via-soulo-dark/30 to-transparent" />

          {/* Breadcrumb on photo */}
          <div className="absolute top-4 left-4 sm:left-8">
            <nav className="flex items-center gap-2 text-sm text-white/70">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/experiences" className="hover:text-white transition-colors">Experiences</Link>
              <span>/</span>
              <span className="text-white">{experience.name}</span>
            </nav>
          </div>

          {/* Title on photo */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="max-w-7xl mx-auto">
              {experience.isFeatured && (
                <span className="inline-block mb-2 bg-soulo-gold text-soulo-dark px-3 py-1 rounded-full text-xs font-bold">
                  ⭐ Featured
                </span>
              )}
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
                {experience.name}
              </h1>
              <div className="flex items-center gap-2">
                <FlagImage code={experience.city.country.code} name={experience.city.country.name} size="sm" />
                <p className="text-white/80">{experience.city.name}, {experience.city.country.name}</p>
                <span className="text-white/40">·</span>
                <span className="text-sm text-white/80">{categoryInfo.icon} {categoryInfo.label}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left — main info */}
            <div className="lg:col-span-2 space-y-10">

              {/* About */}
              <section>
                <h2 className="font-display text-2xl font-bold text-soulo-dark mb-4">
                  About this experience
                </h2>
                <p className="text-soulo-grey leading-relaxed text-lg whitespace-pre-wrap">
                  {experience.description}
                </p>
                {/* Solo-friendly */}
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-soulo-teal text-soulo-teal text-sm font-semibold">
                  ✓ Solo-friendly experience
                </div>
              </section>

              {/* Details */}
              <section className="pt-8 border-t border-soulo-border">
                <h3 className="font-display text-xl font-bold text-soulo-dark mb-6">Details</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-soulo-mist uppercase font-semibold mb-1">Price per person</p>
                    <p className="text-2xl font-bold text-soulo-gold">${experience.price}</p>
                    <p className="text-xs text-soulo-mist mt-1">{PRICE_NOTES[experience.category]}</p>
                  </div>
                  <div>
                    <p className="text-xs text-soulo-mist uppercase font-semibold mb-1">Duration</p>
                    <p className="text-lg font-semibold text-soulo-dark">{experience.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-soulo-mist uppercase font-semibold mb-1">Group size</p>
                    <p className="text-lg font-semibold text-soulo-dark">{experience.groupSizeMin}–{experience.groupSizeMax} people</p>
                  </div>
                  <div>
                    <p className="text-xs text-soulo-mist uppercase font-semibold mb-1">Frequency</p>
                    <p className="text-lg font-semibold text-soulo-dark capitalize">{experience.frequency}</p>
                  </div>
                </div>
              </section>

              {/* Location & Maps */}
              <section className="pt-8 border-t border-soulo-border">
                <h3 className="font-display text-xl font-bold text-soulo-dark mb-4">Location</h3>
                <div className="flex items-start gap-3 text-soulo-grey mb-4">
                  <span className="text-lg mt-0.5">📍</span>
                  <div>
                    <p className="font-semibold text-soulo-dark">{experience.city.name}, {experience.city.country.name}</p>
                    <p className="text-sm mt-0.5">Exact meeting point provided on booking</p>
                  </div>
                </div>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-2 text-soulo-gold hover:text-amber-500 font-semibold text-sm transition-colors"
                >
                  🗺️ View {experience.city.name} on Google Maps →
                </a>
              </section>

              {/* Organizer */}
              <section className="pt-8 border-t border-soulo-border">
                <h3 className="font-display text-xl font-bold text-soulo-dark mb-4">About the organizer</h3>
                <div className="bg-soulo-linen rounded-2xl p-5 border border-soulo-border">
                  <p className="font-bold text-soulo-dark text-lg mb-1">{experience.organizer.name}</p>
                  {hasRealContact ? (
                    <a
                      href={`mailto:${experience.organizer.email}`}
                      className="text-soulo-gold hover:text-amber-400 text-sm transition-colors"
                    >
                      ✉️ {experience.organizer.email}
                    </a>
                  ) : (
                    <p className="text-soulo-mist text-sm">Contact via booking link below</p>
                  )}
                </div>
              </section>

              {/* Disclaimer */}
              <p className="text-xs text-soulo-mist border-t border-soulo-border pt-6">
                Prices shown are estimates based on typical rates for this experience type in {experience.city.name}.
                Always confirm current pricing directly with the organizer before booking.
              </p>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Book CTA */}
              {isPlaceholderBooking ? (
                <div className="bg-soulo-linen border border-soulo-border rounded-2xl p-5 space-y-3">
                  <p className="text-soulo-dark font-semibold">Find &amp; Book This Experience</p>
                  <p className="text-soulo-mist text-sm">
                    Search GetYourGuide or Viator for this experience in {experience.city.name} — thousands of verified operators, free cancellation on most bookings.
                  </p>
                  <a
                    href={`https://www.getyourguide.com/s/?q=${encodeURIComponent(experience.name + " " + experience.city.name)}&partner_id=CDE4NF2`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold rounded-xl transition-colors text-sm"
                  >
                    Search on GetYourGuide →
                  </a>
                  <a
                    href={`https://www.viator.com/searchResults/all?text=${encodeURIComponent(experience.name + " " + experience.city.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-soulo-border text-soulo-grey hover:bg-white rounded-xl transition-colors text-sm font-medium"
                  >
                    Search on Viator →
                  </a>
                  {hasRealContact && (
                    <a
                      href={`mailto:${experience.organizer.email}`}
                      className="block w-full text-center text-xs text-soulo-mist hover:text-soulo-dark transition-colors pt-1"
                    >
                      Or email the organizer directly →
                    </a>
                  )}
                </div>
              ) : (
                <a
                  href={experience.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3.5 bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold text-center rounded-2xl transition-colors text-lg"
                >
                  Book Now →
                </a>
              )}

              {/* Quick info card */}
              <div className="bg-soulo-linen rounded-2xl p-6 border border-soulo-border">
                <h3 className="font-display font-bold text-soulo-dark mb-4">Quick info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-soulo-mist">Price</span>
                    <span className="text-soulo-dark font-bold">${experience.price}/person</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-soulo-mist">Duration</span>
                    <span className="text-soulo-dark font-bold">{experience.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-soulo-mist">Group size</span>
                    <span className="text-soulo-dark font-bold">{experience.groupSizeMin}–{experience.groupSizeMax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-soulo-mist">Available</span>
                    <span className="text-soulo-dark font-bold capitalize">{experience.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-soulo-mist">Category</span>
                    <span className="text-soulo-dark font-bold">{categoryInfo.icon} {categoryInfo.label}</span>
                  </div>
                </div>
              </div>

              {/* Maps link */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="block w-full px-4 py-3 border border-soulo-border rounded-xl text-center text-sm text-soulo-grey hover:bg-soulo-linen transition-colors font-medium"
              >
                🗺️ View on Google Maps
              </a>

              {/* Back link */}
              <Link
                href="/experiences"
                className="block text-center text-sm text-soulo-gold hover:text-amber-500 transition-colors"
              >
                ← All Experiences
              </Link>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-soulo-linen border-t border-soulo-border py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-soulo-dark mb-8 text-center">
              Plan your trip to {experience.city.name}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <AffiliateCTA href="https://safetywing.com/?referenceID=26538744&utm_source=26538744&utm_medium=Ambassador" label="Get travel insurance" sublabel="From $45/month" color="blue" />
              <AffiliateCTA href="https://breezesim.com?sca_ref=11468464.321pPwPKQ4" label="Get an eSIM" sublabel="200+ countries · From $5" color="teal" />
              <AffiliateCTA href="https://www.getyourguide.com/?partner_id=CDE4NF2" label="Browse more tours" sublabel="300,000+ experiences" color="amber" />
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedExperiences.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-soulo-border">
            <h2 className="font-display text-2xl font-bold text-soulo-dark mb-8">
              More experiences in {experience.city.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedExperiences.map((exp) => (
                <Link key={exp.id} href={`/experiences/${exp.slug}`}>
                  <div className="rounded-2xl overflow-hidden border border-soulo-border hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                    <div className="w-full h-40 bg-soulo-linen overflow-hidden">
                      <img
                        src={exp.photoUrl || fallbackPhoto}
                        alt={exp.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-display font-bold text-soulo-dark line-clamp-2 mb-2">{exp.name}</h3>
                      <p className="text-sm text-soulo-grey flex-1">{exp.duration}</p>
                      <p className="text-soulo-gold font-bold mt-2">${exp.price}/person</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
