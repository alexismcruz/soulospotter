import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import FlagImage from "@/components/ui/FlagImage";
import ExperienceGallery from "@/components/experiences/ExperienceGallery";
import AffiliateCTA from "@/components/resources/AffiliateCTA";

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
    openGraph: {
      title: `${experience.name} | SouloSpotter`,
      description: experience.description.substring(0, 160),
    },
  };
}

const CATEGORY_DISPLAY: Record<string, { label: string; icon: string }> = {
  OUTDOOR_ADVENTURE: { label: "Outdoor & Adventure", icon: "🥾" },
  FOOD_DRINK: { label: "Food & Drink", icon: "🍜" },
  ARTS_CULTURE: { label: "Arts & Culture", icon: "🎨" },
  WELLNESS_MINDFULNESS: { label: "Wellness & Mindfulness", icon: "🧘" },
  NIGHTLIFE_SOCIAL: { label: "Nightlife & Social", icon: "🌙" },
  DAY_TRIPS: { label: "Day Trips", icon: "🚌" },
  PHOTOGRAPHY_WALKS: { label: "Photography Walks", icon: "📸" },
  FITNESS_SPORTS: { label: "Fitness & Sports", icon: "🥊" },
};

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const experience = await getExperience(slug);

  if (!experience) notFound();

  const categoryInfo = CATEGORY_DISPLAY[experience.category] || {
    label: experience.category,
    icon: "🎯",
  };

  // Fetch related experiences in same city
  const relatedExperiences = await prisma.experience.findMany({
    where: {
      cityId: experience.cityId,
      isActive: true,
      NOT: { id: experience.id },
    },
    include: { city: { include: { country: true } } },
    take: 3,
  });

  const photos = experience.photoUrl ? [experience.photoUrl] : [];

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-soulo-white border-b border-soulo-border py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-soulo-grey">
              <Link href="/" className="hover:text-soulo-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/experiences" className="hover:text-soulo-gold transition-colors">
                Experiences
              </Link>
              <span>/</span>
              <span className="text-soulo-dark font-semibold">{experience.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero with Image */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title and Featured Badge */}
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="font-display text-4xl font-bold text-soulo-dark">
                      {experience.name}
                    </h1>
                    {experience.isFeatured && (
                      <span className="bg-soulo-gold text-soulo-dark px-3 py-1 rounded-full text-xs font-bold">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  {/* City with Flag */}
                  <div className="flex items-center gap-2 mb-4">
                    <FlagImage
                      code={experience.city.country.code}
                      name={experience.city.country.name}
                      size="sm"
                    />
                    <p className="text-lg text-soulo-grey">
                      {experience.city.name}, {experience.city.country.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-soulo-linen text-soulo-dark text-sm font-semibold">
                  <span>{categoryInfo.icon}</span>
                  {categoryInfo.label}
                </span>
              </div>

              {/* Photo Gallery */}
              {photos.length > 0 && <ExperienceGallery photos={photos} title={experience.name} />}

              {/* Description */}
              <div className="mt-10 prose prose-sm max-w-none">
                <h2 className="font-display text-2xl font-bold text-soulo-dark mb-4">
                  About this experience
                </h2>
                <p className="text-soulo-grey leading-relaxed whitespace-pre-wrap">
                  {experience.description}
                </p>
              </div>

              {/* Key Details */}
              <div className="mt-10 pt-10 border-t border-soulo-border">
                <h3 className="font-display text-xl font-bold text-soulo-dark mb-6">
                  Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-soulo-mist uppercase font-semibold mb-1">
                      Price per person
                    </p>
                    <p className="text-2xl font-bold text-soulo-gold">${experience.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-soulo-mist uppercase font-semibold mb-1">
                      Duration
                    </p>
                    <p className="text-lg font-semibold text-soulo-dark">
                      {experience.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-soulo-mist uppercase font-semibold mb-1">
                      Group size
                    </p>
                    <p className="text-lg font-semibold text-soulo-dark">
                      {experience.groupSizeMin}-{experience.groupSizeMax} people
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-soulo-mist uppercase font-semibold mb-1">
                      Frequency
                    </p>
                    <p className="text-lg font-semibold text-soulo-dark capitalize">
                      {experience.frequency}
                    </p>
                  </div>
                </div>
              </div>

              {/* About Organizer */}
              <div className="mt-10 pt-10 border-t border-soulo-border">
                <h3 className="font-display text-xl font-bold text-soulo-dark mb-4">
                  About the organizer
                </h3>
                <p className="text-soulo-grey">
                  <strong>{experience.organizer.name}</strong>
                  <br />
                  <a
                    href={`mailto:${experience.organizer.email}`}
                    className="text-soulo-gold hover:text-amber-400 transition-colors"
                  >
                    {experience.organizer.email}
                  </a>
                </p>
              </div>

              {/* Solo-friendly badge */}
              <div className="mt-10 pt-10 border-t border-soulo-border">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-soulo-teal bg-opacity-20 text-soulo-teal font-semibold">
                  ✓ Solo-friendly experience
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Book Button */}
              <a
                href={experience.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-3.5 bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold text-center rounded-2xl transition-colors text-lg mb-6"
              >
                Book Now →
              </a>

              {/* Info Card */}
              <div className="bg-soulo-linen rounded-2xl p-6 border border-soulo-border">
                <h3 className="font-semibold text-soulo-dark mb-4">Quick info</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-soulo-mist font-semibold mb-0.5">Price</p>
                    <p className="text-soulo-dark font-bold">${experience.price} per person</p>
                  </div>
                  <div>
                    <p className="text-soulo-mist font-semibold mb-0.5">Duration</p>
                    <p className="text-soulo-dark font-bold">{experience.duration}</p>
                  </div>
                  <div>
                    <p className="text-soulo-mist font-semibold mb-0.5">Group size</p>
                    <p className="text-soulo-dark font-bold">
                      {experience.groupSizeMin}-{experience.groupSizeMax} people
                    </p>
                  </div>
                  <div>
                    <p className="text-soulo-mist font-semibold mb-0.5">Available</p>
                    <p className="text-soulo-dark font-bold capitalize">
                      {experience.frequency}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Block */}
        <div className="bg-soulo-linen border-t border-soulo-border py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-soulo-dark mb-8 text-center">
              Helpful resources for your trip
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <AffiliateCTA
                href="https://safetywing.com/?referenceID=soulospotter"
                label="Get travel insurance"
                sublabel="From $45/month"
                color="blue"
              />
              <AffiliateCTA
                href="https://www.airalo.com/?referral=soulospotter"
                label="Get an eSIM"
                sublabel="200+ countries"
                color="teal"
              />
              <AffiliateCTA
                href="https://www.getyourguide.com/?partner_id=soulospotter"
                label="Browse more tours"
                sublabel="300,000+ experiences"
                color="amber"
              />
            </div>
          </div>
        </div>

        {/* Related Experiences */}
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
                        src={exp.photoUrl || "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80"}
                        alt={exp.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-display font-bold text-soulo-dark line-clamp-2 mb-2">
                        {exp.name}
                      </h3>
                      <p className="text-sm text-soulo-grey flex-1">{exp.duration}</p>
                      <p className="text-soulo-gold font-bold mt-2">${exp.price}</p>
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
