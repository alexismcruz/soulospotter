"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function SiteHeader() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🧭</span>
            <span className="font-bold text-xl tracking-tight text-stone-900 group-hover:text-amber-600 transition-colors">
              SouloSpotter
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/destinations"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              {t("destinations")}
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              {t("categories")}
            </Link>
            <Link
              href="/resources"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              {t("resources")}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              {t("about")}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
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
        <div className="md:hidden border-t border-stone-100 bg-white">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {[
              { href: "/destinations", label: t("destinations") },
              { href: "/categories", label: t("categories") },
              { href: "/resources", label: t("resources") },
              { href: "/about", label: t("about") },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
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
