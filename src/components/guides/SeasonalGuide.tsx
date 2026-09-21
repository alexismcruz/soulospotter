import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import JsonLd from "@/components/seo/JsonLd";
import AffiliateCTA from "@/components/resources/AffiliateCTA";
import { breadcrumbSchema, itemListSchema, faqSchema } from "@/lib/jsonld";
import { SEASONAL_GUIDES, type SeasonalGuide } from "@/lib/seasonalGuides";
import { breezeSimUrl, safetyWingUrl, bookingStaysPath } from "@/lib/affiliates";

const BASE = "https://soulospotter.com";

const OTHER: Record<SeasonalGuide["slug"], { slug: SeasonalGuide["slug"]; label: string }> = {
  "escape-winter": { slug: "winter-wonderland", label: "❄️ Prefer to enjoy winter? Christmas markets, snow & cosy cities" },
  "winter-wonderland": { slug: "escape-winter", label: "☀️ Want to escape the cold? Warm places for November to February" },
};

export function seasonalMetadata(slug: SeasonalGuide["slug"]): Metadata {
  const g = SEASONAL_GUIDES[slug];
  const year = new Date().getFullYear();
  return {
    title: g.metaTitle.replace("{year}", String(year)),
    description: g.metaDescription,
    alternates: { canonical: `${BASE}/guides/${slug}` },
    openGraph: { title: g.h1, description: g.metaDescription },
  };
}

export default async function SeasonalGuidePage({ slug }: { slug: SeasonalGuide["slug"] }) {
  const g = SEASONAL_GUIDES[slug];

  const allSlugs = g.groups.flatMap((grp) => grp.picks.map((p) => p.city));
  const cities = await prisma.city.findMany({
    where: { slug: { in: allSlugs }, published: true },
    select: { slug: true, name: true, country: { select: { name: true, flagEmoji: true } } },
  });
  const cityBySlug = Object.fromEntries(cities.map((c) => [c.slug, c]));

  const url = `${BASE}/guides/${slug}`;
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", url: BASE },
      { name: "Guides", url: `${BASE}/guides` },
      { name: g.h1, url },
    ]),
    itemListSchema({
      name: g.h1,
      items: allSlugs
        .filter((s) => cityBySlug[s])
        .map((s) => ({ name: cityBySlug[s].name, url: `${BASE}/destinations/${s}` })),
    }),
    faqSchema(g.faqs),
  ];

  const other = OTHER[slug];

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main className="flex-1 bg-soulo-white">
        <section className="bg-soulo-slate text-soulo-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-soulo-mist mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
              <span>/</span>
              <span className="text-white">{slug === "escape-winter" ? "Escape the Winter" : "Winter Wonderland"}</span>
            </nav>
            <p className="text-soulo-gold font-semibold text-sm uppercase tracking-widest mb-3">{g.kicker}</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">{g.h1}</h1>
            <p className="text-soulo-mist text-lg leading-relaxed max-w-3xl">{g.intro}</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
          {g.groups.map((grp) => {
            const picks = grp.picks.filter((p) => cityBySlug[p.city]);
            if (picks.length === 0) return null;
            return (
              <section key={grp.heading}>
                <h2 className="font-display text-2xl font-bold text-soulo-dark mb-2">{grp.heading}</h2>
                <p className="text-soulo-grey leading-relaxed mb-5">{grp.blurb}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {picks.map((p) => {
                    const c = cityBySlug[p.city];
                    return (
                      <article key={p.city} className="flex flex-col gap-2 p-5 rounded-2xl border border-soulo-border bg-white">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xl" aria-hidden>{c.country.flagEmoji}</span>
                          <h3 className="font-display text-lg font-bold text-soulo-dark">
                            <Link href={`/destinations/${p.city}`} className="hover:text-soulo-gold transition-colors">{c.name}</Link>
                          </h3>
                          <span className="text-xs text-soulo-mist">{c.country.name}</span>
                        </div>
                        <p className="text-sm text-soulo-grey leading-relaxed">{p.why}</p>
                        {p.watch && (
                          <p className="text-xs text-amber-900 bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1.5 leading-snug">
                            <span aria-hidden>⚠️ </span>{p.watch}
                          </p>
                        )}
                        <div className="mt-auto pt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                          <Link href={`/destinations/${p.city}`} className="text-soulo-gold hover:underline">Explore {c.name} →</Link>
                          <a
                            href={bookingStaysPath(p.city)}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="text-soulo-grey hover:text-soulo-dark hover:underline"
                          >
                            🏨 Find a place to stay
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {g.thinkTwice && (
            <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
              <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">{g.thinkTwice.heading}</h2>
              <ul className="space-y-3">
                {g.thinkTwice.items.map((i) => (
                  <li key={i.place} className="text-sm text-soulo-grey leading-relaxed">
                    <strong className="text-soulo-dark">{i.place}.</strong> {i.note}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="font-display text-2xl font-bold text-soulo-dark mb-5">Planning tips</h2>
            <div className="space-y-5">
              {g.tips.map((t) => (
                <div key={t.heading}>
                  <h3 className="font-display text-base font-bold text-soulo-dark mb-1">{t.heading}</h3>
                  <p className="text-sm text-soulo-grey leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <AffiliateCTA href={breezeSimUrl()} label="Get an eSIM" sublabel="📱 Data the moment you land — from $5" color="teal" />
              <AffiliateCTA href={safetyWingUrl()} label="Get travel insurance" sublabel="🛡️ Cover for the unexpected — from $45/mo" color="blue" />
            </div>
            <p className="mt-3 text-sm text-soulo-grey">
              Not sure about entry rules?{" "}
              <Link href="/guides/visas" className="text-soulo-gold font-semibold hover:underline">Check visa requirements by country →</Link>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-soulo-dark mb-6">Frequently asked questions</h2>
            <div className="space-y-6">
              {g.faqs.map((f) => (
                <div key={f.question} className="border-b border-soulo-border pb-6 last:border-0">
                  <h3 className="font-display text-base font-bold text-soulo-dark mb-2">{f.question}</h3>
                  <p className="text-sm text-soulo-grey leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <Link
            href={`/guides/${other.slug}`}
            className="block p-5 rounded-2xl bg-soulo-linen border border-soulo-border hover:border-soulo-gold transition-colors text-soulo-dark font-semibold"
          >
            {other.label} →
          </Link>

          <p className="text-xs text-soulo-mist border-t border-soulo-border pt-5">
            Seasons and weather patterns vary from year to year, so treat the timings above as a guide and check the forecast
            before you book. Some links on this page are affiliate links — we may earn a commission if you book, at no extra
            cost to you.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
