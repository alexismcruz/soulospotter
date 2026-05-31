"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function SiteHeader() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);

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
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/destinations", label: t("destinations") },
              { href: "/regions/southeast-asia", label: t("categories") },
              { href: "/resources", label: t("resources") },
              { href: "/about", label: t("about") },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-soulo-mist hover:text-soulo-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/advertise"
              className="text-sm font-semibold px-4 py-1.5 rounded-full bg-soulo-gold text-soulo-dark hover:bg-amber-400 transition-colors"
            >
              Advertise
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
              { href: "/destinations", label: t("destinations") },
              { href: "/resources", label: t("resources") },
              { href: "/submit", label: "Submit a Spot" },
              { href: "/advertise", label: "Advertise" },
              { href: "/about", label: t("about") },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-soulo-mist hover:text-soulo-white hover:bg-white/5 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
