import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-soulo-slate text-soulo-mist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🧭</span>
              <span className="font-display font-bold text-xl text-soulo-white">SouloSpotter</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Travel alone. Travel Soulo. Find yourself. The global directory for solo travelers who seek more than a destination.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold text-soulo-white uppercase tracking-wider mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/destinations" className="hover:text-soulo-white transition-colors">Destinations</Link></li>
              <li><Link href="/regions/asia" className="hover:text-soulo-white transition-colors">Asia</Link></li>
              <li><Link href="/regions/europe" className="hover:text-soulo-white transition-colors">Europe</Link></li>
              <li><Link href="/regions/oceania" className="hover:text-soulo-white transition-colors">Oceania</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold text-soulo-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/resources/travel-insurance" className="hover:text-soulo-white transition-colors">Travel Insurance</Link></li>
              <li><Link href="/resources/esims" className="hover:text-soulo-white transition-colors">eSIMs for Travel</Link></li>
              <li><Link href="/resources/tours" className="hover:text-soulo-white transition-colors">Solo Tours</Link></li>
              <li><Link href="/submit" className="hover:text-soulo-white transition-colors">Submit a Listing</Link></li>
              <li><Link href="/advertise" className="hover:text-soulo-white transition-colors">Advertise with Us</Link></li>
              <li><Link href="/about" className="hover:text-soulo-white transition-colors">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} SouloSpotter. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-soulo-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-soulo-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
