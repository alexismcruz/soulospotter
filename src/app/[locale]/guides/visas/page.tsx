import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, itemListSchema, faqSchema } from "@/lib/jsonld";
import { COUNTRY_GUIDES, COUNTRY_GUIDE_SLUGS } from "@/lib/countryGuides";
import VisaChecker from "@/components/guides/VisaChecker";

export const revalidate = 86400; // ISR: refresh daily

const BASE = "https://soulospotter.com";

export const metadata: Metadata = {
  title: "Do I Need a Visa? Visa Requirements for Solo Travelers",
  description:
    "Do you need a visa to travel? Check visa-free, visa-on-arrival and e-Visa requirements by country, get answers to common visa questions, and use our free visa checker before you book.",
  alternates: { canonical: `${BASE}/guides/visas` },
};

const VISA_FAQS = [
  {
    question: "What's the difference between visa-free entry, a visa on arrival, and an e-Visa?",
    answer:
      "Visa-free entry means you can enter without applying for anything in advance — just your passport, and sometimes proof of onward travel or funds. A visa on arrival is issued at the airport or border for a fee, usually with minimal paperwork. An e-Visa is applied for online before you travel and is linked electronically to your passport, so there's no physical stamp or sticker to arrange beforehand. Which one applies to you depends entirely on your passport and the destination.",
  },
  {
    question: "Does my passport need extra validity to enter a country?",
    answer:
      "Many countries require your passport to stay valid for a set period beyond your trip — six months past your departure date is the most common rule, though it varies by destination. Check this alongside the visa requirement: an otherwise visa-free entry can still be refused if your passport is expiring too soon.",
  },
  {
    question: "Do solo travelers need a different visa than group travelers?",
    answer:
      "No — visa requirements are based on your passport, destination, and purpose of travel, not on whether you're travelling alone or in a group. The practical difference for solo travelers is that visa-on-arrival counters sometimes ask for proof of accommodation or an onward ticket, and there's no group leader handling that paperwork for you, so have it ready yourself.",
  },
  {
    question: "What if I'm only transiting through a country, not stopping there?",
    answer:
      "Many countries offer visa-free or simplified transit rules if you stay airside or leave within a set number of hours, but this isn't universal — some destinations require a transit visa even if you never leave the airport. Always check the transit rule separately from the standard tourist visa rule for that country.",
  },
  {
    question: "How far in advance should I apply for a visa?",
    answer:
      "If a destination requires an e-Visa or a visa arranged in advance, apply as soon as your dates are fixed — processing can take anywhere from a few hours to several weeks depending on the country and the season. Don't leave it until the week before you fly.",
  },
  {
    question: "Where can I check the exact requirement for my passport?",
    answer:
      "Use the visa checker on this page for a quick pointer, then get your exact requirement from iVisa (linked in every result) or the destination's official government immigration portal before you book anything. Requirements can change with little notice, so the official source is always the final word.",
  },
];

export default async function VisaGuidesIndexPage() {
  // All destination countries we cover — the checker's "Going to" list should
  // span everywhere on the site, not just the countries with a written guide.
  const allCountries = await prisma.country.findMany({
    select: { slug: true, name: true, flagEmoji: true },
    orderBy: { name: "asc" },
  });
  const flagBySlug = Object.fromEntries(allCountries.map((c) => [c.slug, c.flagEmoji]));

  const guides = COUNTRY_GUIDE_SLUGS.map((slug) => COUNTRY_GUIDES[slug]);

  const jsonLd = [
    breadcrumbSchema([
      { name: "Home",         url: BASE },
      { name: "Guides",       url: `${BASE}/guides` },
      { name: "Visa Guides",  url: `${BASE}/guides/visas` },
    ]),
    itemListSchema({
      name: "Visa requirements by country",
      items: guides.map((g) => ({ name: g.countryName, url: `${BASE}/guides/${g.countrySlug}#visa` })),
    }),
    faqSchema(VISA_FAQS),
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main className="flex-1 bg-soulo-white">
        <section className="bg-soulo-slate text-soulo-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <nav className="flex items-center gap-2 text-sm text-soulo-mist mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
              <span>/</span>
              <span className="text-white">Visa Guides</span>
            </nav>
            <p className="text-soulo-gold font-semibold text-sm uppercase tracking-widest mb-3">Visa Guides</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
              Do You Need a Visa? Quick Reference by Country
            </h1>
            <p className="text-soulo-mist text-lg leading-relaxed max-w-2xl mb-7">
              A fast overview of entry requirements for solo travelers — visa-free, visa on arrival, or apply
              online first. Click through to each country for the full breakdown by passport, plus a link to the
              official source.
            </p>
            <VisaChecker
              destinations={allCountries.map((c) => ({ slug: c.slug, name: c.name, flag: c.flagEmoji }))}
              triggerLabel="🛂 Check my visa requirement"
            />
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {guides.length === 0 ? (
            <p className="text-soulo-grey">Visa guides are on the way — check back soon.</p>
          ) : (
            <div className="space-y-4">
              {guides.map((g) => (
                <Link
                  key={g.countrySlug}
                  href={`/guides/${g.countrySlug}#visa`}
                  className="group block p-6 rounded-2xl border border-soulo-border bg-white hover:border-soulo-gold hover:-translate-y-0.5 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="text-2xl" aria-hidden>{flagBySlug[g.countrySlug]}</span>
                        <h2 className="font-display text-xl font-bold text-soulo-dark group-hover:text-soulo-gold transition-colors">
                          {g.countryName}
                        </h2>
                      </div>
                      <p className="text-sm text-soulo-grey leading-relaxed max-w-2xl">{g.visa.summary}</p>
                      <p className="text-xs text-soulo-mist mt-2">Reviewed {g.visa.updated}</p>
                    </div>
                    <span className="flex-shrink-0 text-sm font-bold text-soulo-gold whitespace-nowrap mt-1">
                      Full breakdown →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* General visa FAQ — genuine, stable explainer content (not tied to any
              one country), matched by the FAQPage schema above */}
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold text-soulo-dark mb-6">Visa questions solo travelers ask</h2>
            <div className="space-y-6">
              {VISA_FAQS.map((f) => (
                <div key={f.question} className="border-b border-soulo-border pb-6 last:border-0">
                  <h3 className="font-display text-base font-bold text-soulo-dark mb-2">{f.question}</h3>
                  <p className="text-sm text-soulo-grey leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sources & methodology — same wording used in the visa checker modal */}
          <div className="mt-10 border-t border-soulo-border pt-6 space-y-2">
            <p className="text-xs text-soulo-mist">
              <strong className="text-soulo-grey">Source:</strong> Written and reviewed by the SouloSpotter team
              using each destination's official government immigration and e-Visa portals (linked throughout this
              page and in every country guide), cross-referenced with the{" "}
              <a href="https://www.iatatravelcentre.com/" target="_blank" rel="noopener noreferrer" className="text-soulo-gold hover:underline">
                IATA Travel Centre
              </a>
              , a widely used travel-document reference. For your exact, personal requirement, use the visa checker
              above (it links to iVisa) or the destination's official portal. Requirements can change without
              notice — always confirm on the official source before you book.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
