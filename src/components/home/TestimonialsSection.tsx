const TESTIMONIALS = [
  {
    quote: "I used SouloSpotter to plan my first solo trip to Lisbon and found every single cafe and hostel in my itinerary here. It felt like getting tips from someone who actually traveled alone — not a generic guide.",
    name: "Maya R.",
    detail: "Solo trip to Lisbon, Portugal",
    avatar: "M",
    color: "bg-soulo-gold text-soulo-dark",
  },
  {
    quote: "As a digital nomad I've tried every directory out there. SouloSpotter is the only one that understands what solo travelers actually need — coworking, community, and places where you won't feel weird eating alone.",
    name: "James T.",
    detail: "Digital nomad, 14 countries",
    avatar: "J",
    color: "bg-soulo-teal text-soulo-dark",
  },
  {
    quote: "The safety scores genuinely helped me decide between cities. I'm a solo female traveler and having that data in one place made planning so much less stressful. I found spots I never would have discovered otherwise.",
    name: "Sofia K.",
    detail: "Solo trip through Southeast Asia",
    avatar: "S",
    color: "bg-amber-400 text-soulo-dark",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-soulo-white border-t border-soulo-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-soulo-gold font-semibold text-sm uppercase tracking-widest mb-2">From the community</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-soulo-dark">
            Solo travelers who found their next home base here
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="relative bg-soulo-linen rounded-2xl p-7 border border-soulo-border flex flex-col"
            >
              {/* Quote mark */}
              <span className="absolute top-5 right-6 text-5xl font-serif text-soulo-border leading-none select-none" aria-hidden>
                &ldquo;
              </span>

              <p className="text-soulo-grey leading-relaxed text-sm flex-1 mb-6 relative z-10">
                {t.quote}
              </p>

              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${t.color}`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-soulo-dark">{t.name}</p>
                  <p className="text-xs text-soulo-mist">{t.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof numbers */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { stat: "100+", label: "Cities worldwide" },
            { stat: "1,000+", label: "Curated spots" },
            { stat: "6", label: "Regions covered" },
            { stat: "Free", label: "Always free to browse" },
          ].map((item) => (
            <div key={item.label} className="py-4 border-t-2 border-soulo-gold">
              <p className="font-display text-2xl font-bold text-soulo-dark">{item.stat}</p>
              <p className="text-xs text-soulo-grey mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
