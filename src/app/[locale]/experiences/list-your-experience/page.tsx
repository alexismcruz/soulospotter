import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import ExperienceSubmissionForm from "@/components/experiences/ExperienceSubmissionForm";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "List Your Experience — SouloSpotter",
  description:
    "Reach solo travelers from 30+ countries. List your activity, tour, or experience with SouloSpotter. Two simple pricing tiers: Basic $29/mo or Featured $79/mo.",
  alternates: { canonical: "https://soulospotter.com/experiences/list-your-experience" },
};

export default async function ListExperiencePage() {
  // Fetch published cities for the form
  const cities = await prisma.city.findMany({
    where: { published: true },
    select: { slug: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <PageHero imageKey="list-experience" imageAlt="List your experience with SouloSpotter">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <nav className="flex items-center gap-2 text-sm text-soulo-mist mb-8">
              <Link href="/" className="hover:text-soulo-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/experiences" className="hover:text-soulo-white transition-colors">
                Experiences
              </Link>
              <span>/</span>
              <span className="text-soulo-white">List Your Experience</span>
            </nav>

            <div className="mb-10">
              <p className="text-soulo-gold font-semibold text-sm uppercase tracking-widest mb-4">
                Reach solo travelers
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-6">
                Get your experience<br />
                <span className="text-soulo-gold">in front of thousands</span>
              </h1>
              <p className="text-soulo-mist text-lg leading-relaxed max-w-2xl">
                List your tour, activity, or experience and reach solo travelers from 30+ countries. Choose Basic to get started, or go Featured to stand out.
              </p>
            </div>

            {/* Pricing Preview */}
            <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-soulo-gold border-opacity-30">
              <div>
                <p className="text-soulo-gold font-bold text-2xl">$29/mo</p>
                <p className="text-soulo-mist text-sm mt-1">Basic Listing</p>
                <ul className="mt-3 space-y-1.5 text-sm text-soulo-mist">
                  <li>✓ Listed in city + category</li>
                  <li>✓ External booking link</li>
                  <li>✓ Standard card design</li>
                </ul>
              </div>
              <div className="border-l border-soulo-gold border-opacity-30 pl-6">
                <p className="text-soulo-gold font-bold text-2xl">$79/mo</p>
                <p className="text-soulo-mist text-sm mt-1">Featured Experience ⭐</p>
                <ul className="mt-3 space-y-1.5 text-sm text-soulo-mist">
                  <li>✓ Everything in Basic</li>
                  <li>✓ Featured badge + priority</li>
                  <li>✓ Photo on card</li>
                </ul>
              </div>
            </div>
          </div>
        </PageHero>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10">
            <h2 className="font-display text-2xl font-bold text-soulo-dark mb-2">
              Tell us about your experience
            </h2>
            <p className="text-soulo-grey">
              Fill in the form below. We'll review within 5 business days.
            </p>
          </div>

          <ExperienceSubmissionForm cities={cities} />
        </div>

        {/* FAQ Section */}
        <div className="bg-soulo-linen py-16 border-t border-soulo-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-soulo-dark mb-8">
              Questions?
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-soulo-dark mb-2">
                  How do I handle bookings?
                </h3>
                <p className="text-soulo-grey">
                  You provide your external booking URL (GetYourGuide, Viator, your own website, etc.) and handle all bookings through your own platform. SouloSpotter simply links to you.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-soulo-dark mb-2">
                  What's the difference between Basic and Featured?
                </h3>
                <p className="text-soulo-grey">
                  Basic listings appear in the city and category pages. Featured listings get a special badge, appear at the top of listings, and include your photo on the card. Featured is 2.7x more visible.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-soulo-dark mb-2">
                  Can I change or cancel?
                </h3>
                <p className="text-soulo-grey">
                  You can upgrade, downgrade, or cancel anytime. Changes take effect at the next billing cycle.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-soulo-dark mb-2">
                  How do you verify experiences?
                </h3>
                <p className="text-soulo-grey">
                  Every submission is reviewed by our team. We verify that the experience is genuine and meets SouloSpotter's quality standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
