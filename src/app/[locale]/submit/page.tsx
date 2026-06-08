import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import SubmitForm from "@/components/submit/SubmitForm";

export const metadata: Metadata = {
  title: "Submit a Listing — SouloSpotter",
  description:
    "Know a great spot for solo travelers? Submit it to SouloSpotter. We review every listing before it goes live.",
  alternates: { canonical: "https://soulospotter.com/submit" },
};

export default function SubmitPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-stone-50">
        <div className="bg-white border-b border-stone-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <nav className="flex items-center gap-2 text-sm text-stone-400 mb-4">
              <Link href="/" className="hover:text-stone-600 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-stone-700">Submit a Listing</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">Submit a Spot</h1>
            <p className="mt-3 text-stone-500 text-lg max-w-xl">
              Know a café, hostel, coworking space, or hidden gem that solo travelers would love? Tell us about it — we review every submission before it goes live.
            </p>

            {/* What happens next */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { step: "1", label: "You submit", desc: "Fill in the details below. Takes 2 minutes." },
                { step: "2", label: "We review", desc: "Our team checks every listing within 5 business days." },
                { step: "3", label: "It goes live", desc: "Approved spots appear on the city page immediately." },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center mx-auto mb-2">
                    {s.step}
                  </div>
                  <p className="text-sm font-semibold text-stone-800">{s.label}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SubmitForm />

          {/* Want faster placement? */}
          <div className="mt-8 p-5 rounded-2xl bg-amber-50 border border-amber-200">
            <p className="text-sm text-stone-700">
              <strong>Want guaranteed placement and a featured badge?</strong>{" "}
              Check out our{" "}
              <Link href="/advertise" className="text-amber-600 font-semibold hover:text-amber-700 underline underline-offset-2">
                advertising packages
              </Link>{" "}
              — starting at $29/month.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
