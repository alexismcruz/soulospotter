import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms and conditions that govern your use of SouloSpotter.",
  alternates: { canonical: "https://soulospotter.com/terms" },
  robots: { index: false },
};

const LAST_UPDATED = "June 10, 2026";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-soulo-slate text-soulo-white py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-soulo-gold text-sm font-semibold uppercase tracking-wider mb-3">Legal</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Terms of Use</h1>
            <p className="text-soulo-mist">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">1. Acceptance of Terms</h2>
            <p className="text-soulo-grey leading-relaxed">
              By accessing or using SouloSpotter (&quot;the Site&quot;), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site. SouloSpotter is operated by Alexis Cruz and accessible at{" "}
              <a href="https://soulospotter.com" className="text-soulo-gold hover:text-amber-500 transition-colors">
                soulospotter.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">2. What SouloSpotter Is</h2>
            <p className="text-soulo-grey leading-relaxed">
              SouloSpotter is an editorial directory for solo travelers. We curate information about cities, spots, and experiences that we believe are well-suited to people traveling alone. Listings on SouloSpotter are not endorsements or guarantees — they are recommendations based on publicly available information and community submissions. We do not operate, manage, or have any formal relationship with any venue listed on the Site unless explicitly stated.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">3. Accuracy of Information</h2>
            <p className="text-soulo-grey leading-relaxed">
              We make reasonable efforts to keep information current, but we cannot guarantee that all details (prices, hours, availability, safety conditions) are accurate at the time you read them. Always verify critical information directly with a venue or service provider before relying on it. Safety scores on SouloSpotter are editorial estimates based on publicly available sources and should not substitute for your own research and judgment.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">4. Affiliate Links & Sponsored Content</h2>
            <p className="text-soulo-grey leading-relaxed">
              SouloSpotter participates in affiliate programs. When you click certain links and make purchases, we may earn a small commission at no additional cost to you. Affiliate relationships do not influence our editorial rankings or recommendations. Affiliate links are identified with{" "}
              <code className="text-xs bg-soulo-linen px-1.5 py-0.5 rounded font-mono">rel=&quot;sponsored&quot;</code>{" "}
              in our markup. We do not accept payment for placement in organic search results or city guides.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">5. User Submissions</h2>
            <p className="text-soulo-grey leading-relaxed mb-4">
              By submitting a spot to SouloSpotter, you confirm that:
            </p>
            <ul className="space-y-2 text-soulo-grey">
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>The venue is real and the information you provide is accurate to the best of your knowledge</span></li>
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>You have no undisclosed commercial interest in the venue (or you have disclosed that you do)</span></li>
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>Any photo URL you provide links to an image you have the right to share</span></li>
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>You grant SouloSpotter a non-exclusive, royalty-free licence to publish and display the submitted content on the Site</span></li>
            </ul>
            <p className="text-soulo-grey leading-relaxed mt-4">
              We reserve the right to accept, reject, edit, or remove any submission at our sole discretion without obligation to explain our decision.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">6. Prohibited Use</h2>
            <p className="text-soulo-grey leading-relaxed mb-4">You agree not to:</p>
            <ul className="space-y-2 text-soulo-grey">
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>Submit false, misleading, or spam listings</span></li>
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>Scrape or crawl the Site in a way that disrupts its operation</span></li>
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>Attempt to reverse-engineer or copy the Site&apos;s database or proprietary content</span></li>
              <li className="flex gap-3"><span className="text-soulo-gold font-bold mt-0.5">·</span><span>Use the Site in any way that violates applicable laws or regulations</span></li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">7. Intellectual Property</h2>
            <p className="text-soulo-grey leading-relaxed">
              The SouloSpotter name, logo, and original written content are our intellectual property. Photography from Unsplash is used under the Unsplash License. City data and spot descriptions compiled by SouloSpotter may not be reproduced for commercial purposes without permission. If you wish to license our content, contact{" "}
              <a href="mailto:hello@soulospotter.com" className="text-soulo-gold hover:text-amber-500 transition-colors">
                hello@soulospotter.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">8. Disclaimer of Warranties</h2>
            <p className="text-soulo-grey leading-relaxed">
              The Site and its content are provided &quot;as is&quot; without warranties of any kind, express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of harmful components. We disclaim all liability for decisions made based on information published on SouloSpotter, including but not limited to travel, safety, accommodation, or financial decisions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">9. Limitation of Liability</h2>
            <p className="text-soulo-grey leading-relaxed">
              To the maximum extent permitted by law, SouloSpotter and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or reliance on its content. Our total liability for any claim shall not exceed the amount you paid us (if any) in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">10. Changes to These Terms</h2>
            <p className="text-soulo-grey leading-relaxed">
              We may update these Terms from time to time. Continued use of the Site after changes are posted constitutes acceptance. Material changes will be noted with an updated &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">11. Governing Law</h2>
            <p className="text-soulo-grey leading-relaxed">
              These Terms are governed by the laws of the Philippines. Any disputes arising from use of SouloSpotter shall be subject to the exclusive jurisdiction of the courts of the Philippines.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">12. Contact</h2>
            <p className="text-soulo-grey leading-relaxed">
              Questions about these Terms? Email{" "}
              <a href="mailto:hello@soulospotter.com" className="text-soulo-gold hover:text-amber-500 transition-colors">
                hello@soulospotter.com
              </a>
              .
            </p>
          </section>

          {/* Nav to privacy */}
          <div className="pt-6 border-t border-soulo-border flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-soulo-gold hover:text-amber-500 transition-colors font-medium">
              Privacy Policy →
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
