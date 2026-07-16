import { approxPlus } from "@/lib/stats";
import { TESTIMONIALS, VALUE_PROPS } from "@/lib/testimonials";

type Props = {
  cityCount: number;
  spotCount: number;
  regionCount: number;
};

export default function TestimonialsSection({ cityCount, spotCount, regionCount }: Props) {
  const hasTestimonials = TESTIMONIALS.length > 0;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-soulo-white border-t border-soulo-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {hasTestimonials ? (
            <>
              <p className="text-soulo-gold font-semibold text-sm uppercase tracking-widest mb-2">From the community</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-soulo-dark">
                Solo travelers who found their next home base here
              </h2>
            </>
          ) : (
            <>
              <p className="text-soulo-gold font-semibold text-sm uppercase tracking-widest mb-2">Why it works</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-soulo-dark">
                Why solo travelers use SouloSpotter
              </h2>
            </>
          )}
        </div>

        {hasTestimonials ? (
          /* Real, attributable testimonials */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => {
              const isLink = t.source.startsWith("http");
              return (
                <div
                  key={t.name}
                  className="relative bg-soulo-linen rounded-2xl p-7 border border-soulo-border flex flex-col"
                >
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
                      <p className="text-xs text-soulo-mist">
                        {isLink ? (
                          <a href={t.source} target="_blank" rel="noopener noreferrer" className="hover:text-soulo-grey underline underline-offset-2">
                            {t.detail}
                          </a>
                        ) : (
                          t.detail
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Honest editorial value-prop band (shown until real testimonials exist) */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUE_PROPS.map((v) => (
              <div
                key={v.title}
                className="bg-soulo-linen rounded-2xl p-7 border border-soulo-border flex flex-col"
              >
                <span className="text-3xl mb-4" aria-hidden>{v.emoji}</span>
                <h3 className="font-display text-lg font-bold text-soulo-dark mb-2">{v.title}</h3>
                <p className="text-soulo-grey leading-relaxed text-sm">{v.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* Social proof numbers (live, from the DB) */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { stat: approxPlus(cityCount, 100), label: "Cities worldwide" },
            { stat: approxPlus(spotCount, 100), label: "Curated spots" },
            { stat: String(regionCount), label: "Regions covered" },
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
