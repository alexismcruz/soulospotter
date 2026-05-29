import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🧭</span>
              <span className="font-bold text-xl text-white">SouloSpotter</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Travel alone. Travel Soulo. Find yourself. The global directory for solo travelers who seek more than a destination.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/regions/southeast-asia" className="hover:text-white transition-colors">Southeast Asia</Link></li>
              <li><Link href="/regions/europe" className="hover:text-white transition-colors">Europe</Link></li>
              <li><Link href="/regions/oceania" className="hover:text-white transition-colors">Oceania</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/resources/travel-insurance" className="hover:text-white transition-colors">Travel Insurance</Link></li>
              <li><Link href="/resources/esims" className="hover:text-white transition-colors">eSIMs for Travel</Link></li>
              <li><Link href="/resources/tours" className="hover:text-white transition-colors">Solo Tours</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} SouloSpotter. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
