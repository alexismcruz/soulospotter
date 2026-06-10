import Link from "next/link";
import SouloLogo from "@/components/ui/SouloLogo";

export default function SiteFooter() {
  return (
    <footer className="bg-soulo-slate text-soulo-mist">

      {/* Newsletter bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-soulo-white font-display font-bold text-lg">Get the solo travel newsletter</p>
              <p className="text-sm text-soulo-mist mt-1">New destinations, curated spots, and honest guides — no spam.</p>
            </div>
            <form
              action="https://app.us14.list-manage.com/subscribe/post"
              method="GET"
              target="_blank"
              className="flex gap-2 w-full sm:w-auto"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                name="EMAIL"
                required
                placeholder="your@email.com"
                className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-soulo-white placeholder-soulo-mist text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-soulo-gold hover:bg-amber-400 text-soulo-dark text-sm font-bold rounded-xl transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-4">
              <SouloLogo linkClassName="inline-flex" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-5">
              The global directory for solo travelers who seek more than a destination. Find your next city, your next cafe, your next adventure.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/soulospotter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-soulo-gold hover:text-soulo-dark text-soulo-mist flex items-center justify-center transition-colors"
                aria-label="SouloSpotter on Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@soulospotter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-soulo-gold hover:text-soulo-dark text-soulo-mist flex items-center justify-center transition-colors"
                aria-label="SouloSpotter on TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.78a4.85 4.85 0 01-1.02-.09z" />
                </svg>
              </a>
              <a
                href="https://x.com/soulospotter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-soulo-gold hover:text-soulo-dark text-soulo-mist flex items-center justify-center transition-colors"
                aria-label="SouloSpotter on X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold text-soulo-white uppercase tracking-wider mb-4">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/destinations" className="hover:text-soulo-white transition-colors">All Destinations</Link></li>
              <li><Link href="/regions/asia" className="hover:text-soulo-white transition-colors">Asia</Link></li>
              <li><Link href="/regions/europe" className="hover:text-soulo-white transition-colors">Europe</Link></li>
              <li><Link href="/regions/latin-america" className="hover:text-soulo-white transition-colors">Latin America</Link></li>
              <li><Link href="/regions/oceania" className="hover:text-soulo-white transition-colors">Oceania</Link></li>
              <li><Link href="/experiences" className="hover:text-soulo-white transition-colors">Experiences</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold text-soulo-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/resources/travel-insurance" className="hover:text-soulo-white transition-colors">Travel Insurance</Link></li>
              <li><Link href="/resources/esims" className="hover:text-soulo-white transition-colors">eSIMs for Travel</Link></li>
              <li><Link href="/resources/tours" className="hover:text-soulo-white transition-colors">Solo Tours</Link></li>
              <li><Link href="/submit" className="hover:text-soulo-white transition-colors">Submit a Spot</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-soulo-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-soulo-white transition-colors">About</Link></li>
              <li><Link href="/advertise" className="hover:text-soulo-white transition-colors">Advertise with Us</Link></li>
              <li><Link href="/experiences/list-your-experience" className="hover:text-soulo-white transition-colors">List an Experience</Link></li>
              <li><Link href="/privacy" className="hover:text-soulo-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-soulo-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        {/* Trust signals + copyright */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} SouloSpotter. All rights reserved.</p>
          <div className="flex items-center gap-4 text-soulo-mist">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-soulo-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Editorially independent
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-soulo-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No pay-to-rank listings
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
