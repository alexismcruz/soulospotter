import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SouloSpotter collects, uses, and protects your personal information.",
  alternates: { canonical: "https://soulospotter.com/privacy" },
  robots: { index: false },
};

const LAST_UPDATED = "June 10, 2026";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-soulo-slate text-soulo-white py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-soulo-gold text-sm font-semibold uppercase tracking-wider mb-3">Legal</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-soulo-mist">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">1. Who We Are</h2>
            <p className="text-soulo-grey leading-relaxed">
              SouloSpotter (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is a solo travel directory operated at{" "}
              <a href="https://soulospotter.com" className="text-soulo-gold hover:text-amber-500 transition-colors">
                soulospotter.com
              </a>
              . We help solo travelers discover cities, spots, and experiences around the world.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">2. Information We Collect</h2>
            <p className="text-soulo-grey leading-relaxed mb-4">
              We collect only what we need to operate the site:
            </p>
            <ul className="space-y-3 text-soulo-grey">
              <li className="flex gap-3">
                <span className="text-soulo-gold font-bold mt-0.5">·</span>
                <div>
                  <strong className="text-soulo-dark">Spot submissions:</strong> If you submit a spot, we collect your name, email address, and the details of the venue you submit. Your personal details are never published — they&apos;re used only for review follow-up.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-soulo-gold font-bold mt-0.5">·</span>
                <div>
                  <strong className="text-soulo-dark">Newsletter sign-ups:</strong> If you subscribe to our newsletter, your email is passed to Mailchimp for delivery. You can unsubscribe at any time via the link in any email.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-soulo-gold font-bold mt-0.5">·</span>
                <div>
                  <strong className="text-soulo-dark">Analytics:</strong> We use Vercel Analytics to understand aggregate traffic patterns (pages visited, referrer sources, device types). This data is anonymised and does not track individual users across sessions. No cookies are set by our analytics.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-soulo-gold font-bold mt-0.5">·</span>
                <div>
                  <strong className="text-soulo-dark">Server logs:</strong> Our hosting provider (Vercel) automatically logs standard server access data (IP addresses, request times, response codes). These logs are retained for up to 30 days for security and debugging purposes.
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">3. Affiliate Links</h2>
            <p className="text-soulo-grey leading-relaxed">
              SouloSpotter earns a small commission when you click affiliate links (e.g. SafetyWing, Airalo, GetYourGuide, Hostelworld) and make a purchase. This comes at no extra cost to you. Our editorial recommendations are never influenced by affiliate relationships — we only link to services we consider genuinely useful for solo travelers. Affiliate links are marked with{" "}
              <code className="text-xs bg-soulo-linen px-1.5 py-0.5 rounded font-mono">rel=&quot;sponsored&quot;</code>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">4. How We Use Your Information</h2>
            <ul className="space-y-2 text-soulo-grey">
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>To review and respond to spot submissions</span></li>
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>To send the newsletter you opted into (you can unsubscribe any time)</span></li>
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>To understand how the site is used so we can improve it</span></li>
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>To detect and prevent abuse or spam</span></li>
            </ul>
            <p className="text-soulo-grey leading-relaxed mt-4">
              We do not sell your personal information to third parties. We do not use it for advertising targeting. We do not build user profiles.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">5. Third-Party Services</h2>
            <p className="text-soulo-grey leading-relaxed mb-4">
              The following third-party services may process data when you use SouloSpotter:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-soulo-grey border-collapse">
                <thead>
                  <tr className="border-b border-soulo-border">
                    <th className="text-left py-2 pr-6 font-semibold text-soulo-dark">Service</th>
                    <th className="text-left py-2 pr-6 font-semibold text-soulo-dark">Purpose</th>
                    <th className="text-left py-2 font-semibold text-soulo-dark">Privacy policy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-soulo-border">
                  {[
                    { name: "Vercel", purpose: "Hosting & analytics", url: "https://vercel.com/legal/privacy-policy" },
                    { name: "Mailchimp", purpose: "Newsletter delivery", url: "https://mailchimp.com/legal/privacy/" },
                    { name: "Unsplash", purpose: "Stock photography", url: "https://unsplash.com/privacy" },
                  ].map((s) => (
                    <tr key={s.name}>
                      <td className="py-2.5 pr-6 font-medium text-soulo-dark">{s.name}</td>
                      <td className="py-2.5 pr-6">{s.purpose}</td>
                      <td className="py-2.5">
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-soulo-gold hover:text-amber-500 transition-colors">
                          View →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">6. Your Rights</h2>
            <p className="text-soulo-grey leading-relaxed mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="space-y-2 text-soulo-grey">
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>Access the personal data we hold about you</span></li>
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>Request correction of inaccurate data</span></li>
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>Request deletion of your data</span></li>
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>Opt out of marketing communications at any time</span></li>
            </ul>
            <p className="text-soulo-grey leading-relaxed mt-4">
              To exercise any of these rights, email us at{" "}
              <a href="mailto:hello@soulospotter.com" className="text-soulo-gold hover:text-amber-500 transition-colors">
                hello@soulospotter.com
              </a>
              . We aim to respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">7. Data Retention</h2>
            <p className="text-soulo-grey leading-relaxed">
              Spot submission data (name and email) is retained for 12 months after the submission is reviewed, then deleted. Newsletter subscriber data is retained until you unsubscribe. Analytics data is aggregate and not personally identifiable.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">8. Cookies</h2>
            <p className="text-soulo-grey leading-relaxed">
              SouloSpotter does not use tracking cookies or advertising cookies. We do not display cookie consent banners because we do not set non-essential cookies. Some third-party services linked from our site (e.g. affiliate partners) may set their own cookies when you navigate to their sites.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">9. Changes to This Policy</h2>
            <p className="text-soulo-grey leading-relaxed">
              We may update this policy from time to time. Material changes will be noted with an updated &quot;Last updated&quot; date at the top. Continued use of SouloSpotter after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">10. Contact</h2>
            <p className="text-soulo-grey leading-relaxed">
              Questions about this policy? Email{" "}
              <a href="mailto:hello@soulospotter.com" className="text-soulo-gold hover:text-amber-500 transition-colors">
                hello@soulospotter.com
              </a>
              .
            </p>
          </section>

          {/* Nav to terms */}
          <div className="pt-6 border-t border-soulo-border flex items-center gap-6 text-sm">
            <Link href="/terms" className="text-soulo-gold hover:text-amber-500 transition-colors font-medium">
              Terms of Use →
            </Link>
            <Link href="/" className="text-soulo-grey hover:text-soulo-dark transition-colors">
              ← Back to SouloSpotter
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
