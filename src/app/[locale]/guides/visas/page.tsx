import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, itemListSchema, faqSchema } from "@/lib/jsonld";
import {
  getCountryGuide,
  getVisaNotes,
  VISA_NOTES_SLUGS,
  type VisaCase,
  type VisaInfo,
} from "@/lib/countryGuides";
import { visahqUrl, visahqHomeUrl } from "@/lib/affiliates";

export const revalidate = 86400; // ISR: refresh daily

const BASE = "https://soulospotter.com";

export const metadata: Metadata = {
  title: "Do I Need a Visa? Visa Requirements for Solo Travelers",
  description:
    "Visa requirements at a glance for US, UK, EU, Canadian and Australian passport holders — visa-free, eVisa or visa needed — for popular solo travel destinations, with official sources and answers to common visa questions.",
  alternates: { canonical: `${BASE}/guides/visas` },
};

type VisaFaq = {
  question: string;
  answer: string;
  /** Optional word in `answer` to render as a sponsored VisaHQ link (schema keeps plain text). */
  visahqLinkText?: string;
};

const VISA_FAQS: VisaFaq[] = [
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
      "Use the table on this page for a quick pointer, then confirm your exact requirement on the destination's official government immigration portal (linked in every row) or through VisaHQ before you book anything. Requirements can change with little notice, so the official source is always the final word.",
    visahqLinkText: "VisaHQ",
  },
];

function FaqAnswer({ faq }: { faq: VisaFaq }) {
  const word = faq.visahqLinkText;
  const idx = word ? faq.answer.indexOf(word) : -1;
  if (!word || idx === -1) return <>{faq.answer}</>;
  return (
    <>
      {faq.answer.slice(0, idx)}
      <a
        href={visahqHomeUrl()}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="text-soulo-gold font-medium hover:underline"
      >
        {word}
      </a>
      {faq.answer.slice(idx + word.length)}
    </>
  );
}

// Passports shown as columns. The EU column is represented by Germany's code:
// every EU/Schengen row lists all member states in its matchCodes.
const PASSPORT_COLUMNS = [
  { code: "US", flag: "🇺🇸", label: "US" },
  { code: "GB", flag: "🇬🇧", label: "UK" },
  { code: "DE", flag: "🇪🇺", label: "EU" },
  { code: "CA", flag: "🇨🇦", label: "Canada" },
  { code: "AU", flag: "🇦🇺", label: "Australia" },
] as const;

// A passport holder visiting their own country has no visa question.
const HOME_PASSPORT: Record<string, string> = { "united-states": "US" };

type Tone = NonNullable<VisaCase["tone"]>;

const TONE_CLASSES: Record<Tone, string> = {
  free: "bg-emerald-50 text-emerald-800",
  auth: "bg-amber-50 text-amber-800",
  visa: "bg-rose-50 text-rose-800",
  varies: "bg-slate-100 text-slate-700",
};

const LEGEND: { tone: Tone; label: string }[] = [
  { tone: "free", label: "Visa-free" },
  { tone: "auth", label: "Online authorisation / visa on arrival / eVisa" },
  { tone: "visa", label: "Visa required in advance" },
  { tone: "varies", label: "Varies — check the official source" },
];

/** The case explicitly listing this passport. Never falls back to the catch-all row. */
function caseFor(visa: VisaInfo, code: string): VisaCase | null {
  return visa.cases.find((c) => c.matchCodes?.includes(code)) ?? null;
}

export default async function VisaGuidesIndexPage() {
  // Every country we have visa data for — NOT just the ones with a full
  // written guide. Visa notes are tracked independently (src/lib/countryGuides.ts)
  // so coverage can grow much faster than full editorial guides.
  const countries = await prisma.country.findMany({
    where: { slug: { in: VISA_NOTES_SLUGS } },
    select: { slug: true, name: true, flagEmoji: true },
  });
  const countryBySlug = Object.fromEntries(countries.map((c) => [c.slug, c]));

  const visaCountries = VISA_NOTES_SLUGS
    .map((slug) => {
      const country = countryBySlug[slug];
      const visa = getVisaNotes(slug);
      if (!country || !visa) return null;
      return {
        slug,
        name: country.name,
        flag: country.flagEmoji,
        visa,
        hasFullGuide: !!getCountryGuide(slug),
      };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null)
    .sort((a, b) => a.name.localeCompare(b.name));

  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", url: BASE },
      { name: "Guides", url: `${BASE}/guides` },
      { name: "Visa Guides", url: `${BASE}/guides/visas` },
    ]),
    itemListSchema({
      name: "Visa requirements by country",
      items: visaCountries.map((c) => ({
        name: c.name,
        url: `${BASE}/guides/visas#${c.slug}`,
      })),
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
            <p className="text-soulo-mist text-lg leading-relaxed max-w-2xl">
              Entry requirements for tourists at a glance — find your passport, find your destination, and see
              straight away whether it&apos;s visa-free, needs an online authorisation, or needs a visa in advance.
              Each row links to the official source.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {visaCountries.length === 0 ? (
            <p className="text-soulo-grey">Visa guides are on the way — check back soon.</p>
          ) : (
            <>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs text-soulo-grey" aria-label="Colour key">
                {LEGEND.map((l) => (
                  <li key={l.tone} className="flex items-center gap-1.5">
                    <span
                      className={`inline-block w-3 h-3 rounded border border-soulo-border ${TONE_CLASSES[l.tone].split(" ")[0]}`}
                      aria-hidden
                    />
                    {l.label}
                  </li>
                ))}
              </ul>
              <p className="sm:hidden text-xs text-soulo-mist mb-2">Swipe sideways to see every passport →</p>

              <div className="overflow-x-auto rounded-2xl border border-soulo-border bg-white">
                <table className="w-full min-w-[820px] border-collapse text-sm">
                  <caption className="sr-only">
                    Tourist visa requirements by destination for US, UK, EU, Canadian and Australian passport holders
                  </caption>
                  <thead>
                    <tr className="bg-soulo-linen text-left">
                      <th
                        scope="col"
                        className="sticky left-0 z-10 bg-soulo-linen px-4 py-3 font-display font-bold text-soulo-dark min-w-[170px]"
                      >
                        Destination
                      </th>
                      {PASSPORT_COLUMNS.map((col) => (
                        <th key={col.code} scope="col" className="px-3 py-3 font-semibold text-soulo-dark whitespace-nowrap">
                          <span aria-hidden>{col.flag}</span> {col.label} passport
                        </th>
                      ))}
                      <th scope="col" className="px-3 py-3 font-semibold text-soulo-dark whitespace-nowrap">
                        Need a visa?
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {visaCountries.map((c) => (
                      <tr key={c.slug} id={c.slug} className="border-t border-soulo-border align-top scroll-mt-24">
                        <th scope="row" className="sticky left-0 z-10 bg-white px-4 py-3 text-left font-normal">
                          <div className="flex items-center gap-2">
                            <span className="text-xl" aria-hidden>{c.flag}</span>
                            <span className="font-display font-bold text-soulo-dark">{c.name}</span>
                          </div>
                          <div className="mt-1 flex flex-col gap-0.5 text-xs">
                            <a
                              href={c.visa.officialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-soulo-gold hover:underline"
                            >
                              Official source ↗
                            </a>
                            {c.hasFullGuide && (
                              <Link href={`/guides/${c.slug}#visa`} className="text-soulo-gold hover:underline">
                                Full {c.name} guide →
                              </Link>
                            )}
                            <span className="text-soulo-mist">Reviewed {c.visa.updated}</span>
                          </div>
                        </th>
                        {PASSPORT_COLUMNS.map((col) => {
                          const isHome = HOME_PASSPORT[c.slug] === col.code;
                          const match = isHome ? null : caseFor(c.visa, col.code);
                          return (
                            <td key={col.code} className="px-3 py-3">
                              {isHome ? (
                                <span className="text-soulo-mist">—</span>
                              ) : (
                                <span
                                  className={`inline-block rounded-lg px-2.5 py-1.5 text-xs font-semibold leading-snug ${TONE_CLASSES[match?.tone ?? "varies"]}`}
                                >
                                  {match?.short ?? "Check official source"}
                                </span>
                              )}
                            </td>
                          );
                        })}
                        <td className="px-3 py-3">
                          <a
                            href={visahqUrl(c.name)}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="inline-block whitespace-nowrap rounded-lg bg-soulo-gold px-3 py-1.5 text-xs font-bold text-soulo-dark hover:bg-amber-400 transition-colors"
                          >
                            Apply via VisaHQ →
                          </a>
                          <p className="mt-1 text-xs text-soulo-mist">Other passport? Check it here.</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-xs text-soulo-mist">
                We&apos;re adding more countries regularly. Don&apos;t see your destination? Check the country&apos;s
                official immigration portal or look it up on VisaHQ. The VisaHQ links are affiliate links — we may
                earn a commission at no extra cost to you.
              </p>
            </>
          )}

          {/* General visa FAQ — genuine, stable explainer content (not tied to any
              one country), matched by the FAQPage schema above */}
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold text-soulo-dark mb-6">Visa questions solo travelers ask</h2>
            <div className="space-y-6">
              {VISA_FAQS.map((f) => (
                <div key={f.question} className="border-b border-soulo-border pb-6 last:border-0">
                  <h3 className="font-display text-base font-bold text-soulo-dark mb-2">{f.question}</h3>
                  <p className="text-sm text-soulo-grey leading-relaxed"><FaqAnswer faq={f} /></p>
                </div>
              ))}
            </div>
          </section>

          {/* Sources & methodology */}
          <div className="mt-10 border-t border-soulo-border pt-6 space-y-2">
            <p className="text-xs text-soulo-mist">
              <strong className="text-soulo-grey">Source:</strong> Written and reviewed by the SouloSpotter team
              using each destination&apos;s official government immigration and e-Visa portals (linked in every row
              of the table and in each country guide), cross-referenced with the{" "}
              <a href="https://www.iatatravelcentre.com/" target="_blank" rel="noopener noreferrer" className="text-soulo-gold hover:underline">
                IATA Travel Centre
              </a>
              , a widely used travel-document reference. For your exact, personal requirement, use the official
              source linked in each row or a visa service such as VisaHQ. Requirements can change without
              notice — always confirm on the official source before you book.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
