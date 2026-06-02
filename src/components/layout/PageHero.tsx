/**
 * PageHero — reusable full-bleed hero with background image + dark overlay.
 * Drop-in replacement for the plain `bg-soulo-slate` hero banners site-wide.
 */

// Curated Unsplash images per page context — all verified 200 OK
export const HERO_IMAGES = {
  // Regions
  "southeast-asia":    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&q=85", // Bali rice terraces
  "europe":            "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1400&q=85", // Lisbon
  "east-asia":         "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1400&q=85", // Kyoto
  "latin-america":     "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1400&q=85", // Rio
  "north-america":     "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1400&q=85", // NYC
  "south-asia":        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85", // Mountains
  "middle-east-africa":"https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400&q=85", // Marrakech
  "oceania":           "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1400&q=85", // Queenstown
  // Feature pages
  "destinations":      "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&q=85", // City at night
  "experiences":       "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85", // Cooking class
  "list-experience":   "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=85", // Beach/travel
  "resources":         "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=85", // Nature path
  "travel-insurance":  "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1400&q=85", // Chiang Mai temple
  "esims":             "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1400&q=85", // Siargao
  "tours":             "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1400&q=85", // Hoi An
  "about":             "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=85", // Solo traveler vista
  "advertise":         "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85", // Coworking
  "submit":            "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1400&q=85", // Tbilisi
} as const;

interface PageHeroProps {
  imageKey: keyof typeof HERO_IMAGES;
  imageAlt?: string;
  /** Extra overlay darkness 0-100, default 60 */
  overlayOpacity?: number;
  children: React.ReactNode;
  className?: string;
}

export default function PageHero({
  imageKey,
  imageAlt = "SouloSpotter",
  overlayOpacity = 60,
  children,
  className = "",
}: PageHeroProps) {
  const imgSrc = HERO_IMAGES[imageKey];
  return (
    <div className={`relative overflow-hidden bg-soulo-slate text-soulo-white ${className}`}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={imgSrc}
          alt={imageAlt}
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient: dark from left/top fading right + full fade to slate at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(31,45,61,${overlayOpacity / 100}) 0%, rgba(31,45,61,0.55) 60%, #1F2D3D 100%)`,
          }}
        />
      </div>
      {/* Content sits above the image */}
      <div className="relative">{children}</div>
    </div>
  );
}
