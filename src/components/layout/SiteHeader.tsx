"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";

// ─── Mega-menu definitions ─────────────────────────────────────────────────

const MENUS = {
  destinations: {
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
    imageAlt: "Solo traveler overlooking mountains",
    heading: "Find your next city",
    description: "21 cities across 8 regions, curated for solo travelers.",
    links: [
      { href: "/destinations", label: "All Destinations" },
      { href: "/regions/southeast-asia", label: "Southeast Asia" },
      { href: "/regions/europe", label: "Europe" },
      { href: "/regions/east-asia", label: "East Asia" },
      { href: "/regions/latin-america", label: "Latin America" },
      { href: "/regions/south-asia", label: "South Asia" },
    ],
    cta: { href: "/destinations", label: "Browse all cities →" },
  },
  experiences: {
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&q=80",
    imageAlt: "Solo traveler with backpack in mountains",
    heading: "Do something unforgettable",
    description: "Cooking classes, hiking tours, photography walks and more.",
    links: [
      { href: "/experiences", label: "All Experiences" },
      { href: "/experiences?category=FOOD_DRINK", label: "Food & Drink 🍜" },
      { href: "/experiences?category=OUTDOOR_ADVENTURE", label: "Outdoor & Adventure 🥾" },
      { href: "/experiences?category=WELLNESS_MINDFULNESS", label: "Wellness 🧘" },
      { href: "/experiences?category=ARTS_CULTURE", label: "Arts & Culture 🎨" },
      { href: "/experiences/list-your-experience", label: "List your experience" },
    ],
    cta: { href: "/experiences", label: "Browse all experiences →" },
  },
  categories: {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    imageAlt: "Coworking space for nomads",
    heading: "Find the right kind of spot",
    description: "Every spot is tagged so you know exactly what you're walking into.",
    links: [
      { href: "/destinations/bali/cafes", label: "☕ Cafés" },
      { href: "/destinations/bali/coworking", label: "💻 Coworking" },
      { href: "/destinations/bali/accommodation", label: "🏨 Accommodation" },
      { href: "/destinations/bali/food-drink", label: "🍜 Food & Drink" },
      { href: "/destinations/bali/wellness", label: "🧘 Wellness" },
      { href: "/destinations/bali/nightlife", label: "🌙 Nightlife" },
    ],
    cta: { href: "/destinations", label: "Explore by city →" },
  },
  resources: {
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80",
    imageAlt: "Solo traveler resources",
    heading: "Travel smarter, solo",
    description: "Everything you need before you go — insurance, eSIMs, and tours.",
    links: [
      { href: "/resources", label: "All Resources" },
      { href: "/resources/travel-insurance", label: "🛡️ Travel Insurance" },
      { href: "/resources/esims", label: "📱 eSIMs" },
      { href: "/resources/tours", label: "🗺️ Group Tours" },
    ],
    cta: { href: "/resources", label: "View all resources →" },
  },
  about: {
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
    imageAlt: "Solo road trip",
    heading: "Built for people who go alone",
    description: "SouloSpotter exists because solo travel deserves its own directory.",
    links: [
      { href: "/about", label: "Our Story" },
      { href: "/submit", label: "Submit a Spot" },
      { href: "/advertise", label: "Advertise with us" },
    ],
    cta: { href: "/about", label: "Read our story →" },
  },
};

type MenuKey = keyof typeof MENUS;

export default function SiteHeader() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<MenuKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(key);
  };

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const navItems: { key: MenuKey; href: string; label: string }[] = [
    { key: "destinations", href: "/destinations", label: t("destinations") },
    { key: "experiences",  href: "/experiences",  label: "Experiences" },
    { key: "categories",   href: "/regions/southeast-asia", label: t("categories") },
    { key: "resources",    href: "/resources",    label: t("resources") },
    { key: "about",        href: "/about",        label: t("about") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-soulo-slate border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🧭</span>
            <span className="font-display font-bold text-xl tracking-tight text-soulo-white group-hover:text-soulo-gold transition-colors">
              SouloSpotter
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const menu = MENUS[item.key];
              const isOpen = activeDropdown === item.key;
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => openDropdown(item.key)}
                  onMouseLeave={closeDropdown}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                      isOpen ? "text-soulo-white" : "text-soulo-mist hover:text-soulo-white"
                    }`}
                  >
                    {item.label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Mega dropdown */}
                  {isOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-soulo-dark rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                      onMouseEnter={() => openDropdown(item.key)}
                      onMouseLeave={closeDropdown}
                    >
                      {/* Tip triangle */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-soulo-dark rotate-45 border-l border-t border-white/10" />

                      <div className="flex">
                        {/* Image panel */}
                        <div className="w-48 flex-shrink-0 relative">
                          <img
                            src={menu.image}
                            alt={menu.imageAlt}
                            className="w-full h-full object-cover"
                            style={{ minHeight: "220px" }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-soulo-dark/60" />
                        </div>

                        {/* Content panel */}
                        <div className="flex-1 p-5">
                          <h3 className="font-display font-bold text-soulo-white text-base mb-1">
                            {menu.heading}
                          </h3>
                          <p className="text-xs text-soulo-mist mb-4 leading-relaxed">
                            {menu.description}
                          </p>
                          <ul className="space-y-1.5 mb-4">
                            {menu.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className="text-sm text-soulo-mist hover:text-soulo-gold transition-colors"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={menu.cta.href}
                            className="text-xs font-bold text-soulo-gold hover:text-amber-400 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {menu.cta.label}
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Advertise CTA — pitched at businesses */}
            <Link
              href="/advertise"
              className="group relative text-sm font-semibold px-4 py-1.5 rounded-full bg-soulo-gold text-soulo-dark hover:bg-amber-400 transition-colors"
            >
              Reach Travelers
              {/* Tooltip */}
              <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-soulo-dark text-soulo-mist text-xs px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                List your business from $29/mo
              </span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-soulo-mist hover:text-soulo-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-soulo-slate">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {[
              { href: "/destinations",  label: "🌍 Destinations" },
              { href: "/experiences",   label: "🎯 Experiences" },
              { href: "/regions/southeast-asia", label: "🗂️ Categories" },
              { href: "/resources",     label: "🛡️ Resources" },
              { href: "/submit",        label: "📍 Submit a Spot" },
              { href: "/about",         label: "✨ About" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-soulo-mist hover:text-soulo-white hover:bg-white/5 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/advertise"
              className="mt-2 mx-3 py-2.5 text-center rounded-xl text-sm font-bold bg-soulo-gold text-soulo-dark hover:bg-amber-400 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Reach Travelers — List from $29/mo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
