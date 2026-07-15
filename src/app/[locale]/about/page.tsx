import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageHero from "@/components/layout/PageHero";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  // Brand is structural in this title — use `absolute` to keep it appearing once.
  title: { absolute: "About SouloSpotter — Travel alone. Travel Soulo. Find yourself." },
  description:
    "SouloSpotter is the global directory for solo travelers who seek more than a destination. We curate the best spots, cities, and resources for people who travel alone — and love it.",
  alternates: { canonical: "https://soulospotter.com/about" },
  openGraph: {
    title: "About SouloSpotter",
    description: "The global solo travel directory — built for people who travel alone and love it.",
  },
};

export default async function AboutPage() {
  const [cityCount, spotCount, regionCount] = await Promise.all([
    prisma.city.count({ where: { published: true } }),
    prisma.spot.count({ where: { published: true } }),
    prisma.city.groupBy({ by: ["region"], where: { published: true } }).then((r) => r.length),
  ]);
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">

        {/* Hero */}
        <PageHero imageKey="about" imageAlt="Solo traveler overlooking a mountain vista">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <nav className="flex items-center gap-2 text-sm text-soulo-mist mb-8">
              <Link href="/" className="hover:text-soulo-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-soulo-white">About</span>
            </nav>
            <p className="text-soulo-gold font-semibold text-sm uppercase tracking-widest mb-4">Our story</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-6 text-soulo-white">
              Built for the solo traveler.<br />
              <span className="text-soulo-gold italic">By someone who gets it.</span>
            </h1>
            <p className="text-soulo-mist text-lg leading-relaxed max-w-2xl">
              SouloSpotter exists because solo travel deserves its own directory. Not a general travel site with a "solo travel" filter — a place built specifically for people who choose to go alone, and love what they find when they do.
            </p>
          </div>
        </PageHero>

        {/* The philosophy */}
        <div className="bg-soulo-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl font-bold text-soulo-dark mb-5">
                  What does "Soulo" mean?
                </h2>
                <p className="text-soulo-grey leading-relaxed mb-4">
                  Soulo is solo + soul. It's the belief that the people who travel alone aren't avoiding connection — they're seeking something deeper. A different pace. Time to think. The freedom to change plans at noon because the mountains looked different than expected.
                </p>
                <p className="text-soulo-grey leading-relaxed mb-4">
                  Solo travel has a way of returning you to yourself. You make every decision. You eat when you're hungry, sleep when you're tired, and wake up in cities where nobody knows your name. It's uncomfortable and liberating in equal measure.
                </p>
                <p className="text-soulo-grey leading-relaxed">
                  SouloSpotter is the directory for that kind of traveler. Not just where to go — but where to <em>be</em>.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: "🌍", stat: `${cityCount}`,      label: "Cities curated" },
                  { emoji: "🗺️", stat: `${regionCount}`,    label: "Global regions" },
                  { emoji: "📍", stat: `${spotCount}+`,     label: "Spots verified" },
                  { emoji: "🌐", stat: "5",                  label: "Target markets" },
                ].map((item) => (
                  <div key={item.label} className="bg-soulo-linen rounded-2xl p-5 border border-soulo-border text-center">
                    <span className="text-3xl">{item.emoji}</span>
                    <p className="font-display text-3xl font-bold text-soulo-dark mt-2">{item.stat}</p>
                    <p className="text-xs text-soulo-grey mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* What we curate */}
        <div className="bg-soulo-linen py-16 border-t border-soulo-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-soulo-dark mb-3">What we curate</h2>
            <p className="text-soulo-grey mb-10 max-w-2xl">
              Every spot on SouloSpotter is chosen with one question in mind: <em>would a solo traveler feel at home here?</em>
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { emoji: "☕", title: "Work-friendly cafés", desc: "Good WiFi, laptop culture, no side-eye if you stay three hours." },
                { emoji: "🏨", title: "Accommodation", desc: "Hostels with social energy, guesthouses with local soul — not just a bed." },
                { emoji: "💻", title: "Coworking spaces", desc: "For the remote workers and digital nomads who travel on their own terms." },
                { emoji: "🧘", title: "Wellness & retreats", desc: "Yoga drop-ins, meditation centres, spa days — the inner journey alongside the outer one." },
                { emoji: "🏔️", title: "Nature & outdoors", desc: "Solo hikes, sunrise trails, beaches where you can exist without being bothered." },
                { emoji: "🤝", title: "Community spots", desc: "The meetup hubs, expat corners, and open-mic nights where solo travelers become not-so-solo." },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-5 border border-soulo-border">
                  <span className="text-2xl">{item.emoji}</span>
                  <h3 className="font-display font-semibold text-soulo-dark mt-3 mb-1">{item.title}</h3>
                  <p className="text-sm text-soulo-grey leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Who we serve */}
        <div className="bg-soulo-white py-16 border-t border-soulo-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-soulo-dark mb-3">Who SouloSpotter is for</h2>
            <p className="text-soulo-grey mb-10 max-w-2xl">
              We built this for every kind of solo traveler — not just one type.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { emoji: "💼", title: "The digital nomad", desc: "Moving between cities with a laptop and a one-way ticket. You need coworking, fast WiFi, and a city that makes sense to live in for a month." },
                { emoji: "🎒", title: "The backpacker", desc: "Budget-first, experience-forward. You want the $4 bowl of noodles that locals eat, not the tourist version. We find those spots." },
                { emoji: "🌿", title: "The wellness seeker", desc: "You travel to reset — retreats, yoga, meditation, long walks with no destination. Solo travel as a practice, not just a trip." },
                { emoji: "✈️", title: "The first-time solo", desc: "You've never done this before and you're slightly terrified. Good. We'll make it less terrifying and more extraordinary." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 bg-soulo-linen rounded-2xl border border-soulo-border">
                  <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                  <div>
                    <h3 className="font-display font-semibold text-soulo-dark mb-1">{item.title}</h3>
                    <p className="text-sm text-soulo-grey leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How we work */}
        <div className="bg-soulo-linen py-16 border-t border-soulo-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-soulo-dark mb-3">How we work</h2>
            <p className="text-soulo-grey mb-10 max-w-2xl">
              No paid placements in organic results. No listing that appears just because someone paid for it. Every spot is reviewed before it goes live.
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { step: "01", title: "We research", desc: "Our team scours each city for spots that solo travelers actually use — not the tourist traps." },
                { step: "02", title: "We verify", desc: "Every listing is checked for accuracy. Address, category, what makes it worth visiting." },
                { step: "03", title: "Community adds more", desc: "Travelers submit spots they've discovered. We review every submission before it goes live." },
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-2xl p-6 border border-soulo-border">
                  <p className="font-display text-4xl font-bold text-soulo-gold mb-3">{item.step}</p>
                  <h3 className="font-display font-semibold text-soulo-dark mb-2">{item.title}</h3>
                  <p className="text-sm text-soulo-grey leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transparency on affiliates */}
        <div className="bg-soulo-white py-12 border-t border-soulo-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-soulo-linen rounded-2xl p-7 border border-soulo-border">
              <h3 className="font-display font-semibold text-soulo-dark mb-2">A note on how we're funded</h3>
              <p className="text-sm text-soulo-grey leading-relaxed max-w-2xl">
                SouloSpotter is free to use. We earn a small commission when you book through affiliate links on our resource pages (travel insurance, eSIMs, tours). These commissions never influence which spots appear in the directory — those are editorially independent. We only recommend products we'd use ourselves.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-soulo-slate py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl font-bold text-soulo-white mb-4">Ready to explore?</h2>

            <p className="text-soulo-mist mb-8 max-w-lg mx-auto">
              {cityCount} cities, {regionCount} regions, and {spotCount}+ curated spots — built for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/destinations"
                className="px-7 py-3.5 bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold rounded-2xl transition-colors"
              >
                Browse destinations
              </Link>
              <Link
                href="/submit"
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-soulo-white font-semibold rounded-2xl transition-colors border border-white/20"
              >
                Submit a spot
              </Link>
            </div>
          </div>
        </div>

      </main>
      <SiteFooter />
    </div>
  );
}
