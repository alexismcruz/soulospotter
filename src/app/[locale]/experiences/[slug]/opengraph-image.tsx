import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CATEGORY_LABEL: Record<string, string> = {
  OUTDOOR_ADVENTURE:    "Outdoor & Adventure",
  FOOD_DRINK:           "Food & Drink",
  ARTS_CULTURE:         "Arts & Culture",
  WELLNESS_MINDFULNESS: "Wellness & Mindfulness",
  NIGHTLIFE_SOCIAL:     "Nightlife & Social",
  DAY_TRIPS:            "Day Trips",
  PHOTOGRAPHY_WALKS:    "Photography Walks",
  FITNESS_SPORTS:       "Fitness & Sports",
};

const CATEGORY_EMOJI: Record<string, string> = {
  OUTDOOR_ADVENTURE:    "🥾",
  FOOD_DRINK:           "🍜",
  ARTS_CULTURE:         "🎨",
  WELLNESS_MINDFULNESS: "🧘",
  NIGHTLIFE_SOCIAL:     "🌙",
  DAY_TRIPS:            "🚌",
  PHOTOGRAPHY_WALKS:    "📸",
  FITNESS_SPORTS:       "🥊",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;

  const exp = await prisma.experience.findUnique({
    where: { slug },
    select: {
      name: true,
      category: true,
      price: true,
      duration: true,
      city: { select: { name: true, country: { select: { name: true, flagEmoji: true } } } },
    },
  });

  const name = exp?.name ?? "Solo Travel Experience";
  const cityName = exp?.city.name ?? "";
  const countryName = exp?.city.country.name ?? "";
  const flagEmoji = exp?.city.country.flagEmoji ?? "🌍";
  const price = exp?.price ?? 0;
  const duration = exp?.duration ?? "";
  const catLabel = exp ? (CATEGORY_LABEL[exp.category] ?? exp.category) : "Experience";
  const catEmoji = exp ? (CATEGORY_EMOJI[exp.category] ?? "🎯") : "🎯";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0f1f35 0%, #1a3050 60%, #0f1f35 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(212,168,83,0.07)", display: "flex" }} />

        {/* Top — branding + category */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "28px" }}>🧭</span>
            <span style={{ fontSize: "20px", color: "#94a3b8", fontFamily: "sans-serif", letterSpacing: "0.05em" }}>SOULOSPOTTER</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(212,168,83,0.15)", border: "1px solid rgba(212,168,83,0.3)", borderRadius: "24px", padding: "8px 18px" }}>
            <span style={{ fontSize: "22px" }}>{catEmoji}</span>
            <span style={{ fontSize: "16px", color: "#d4a853", fontFamily: "sans-serif", fontWeight: "600", display: "flex" }}>{catLabel}</span>
          </div>
        </div>

        {/* Middle — experience name */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ fontSize: "48px", fontWeight: "bold", color: "#ffffff", lineHeight: 1.15, maxWidth: "900px", display: "flex", flexWrap: "wrap" }}>
            {name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
            <span style={{ fontSize: "28px" }}>{flagEmoji}</span>
            <span style={{ fontSize: "24px", color: "#94a3b8", fontFamily: "sans-serif", display: "flex" }}>{cityName}, {countryName}</span>
          </div>
        </div>

        {/* Bottom — price + duration + solo badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "36px", fontWeight: "bold", color: "#d4a853", fontFamily: "sans-serif", display: "flex" }}>${price}</span>
            <span style={{ fontSize: "14px", color: "#64748b", fontFamily: "sans-serif", marginTop: "2px", display: "flex" }}>per person</span>
          </div>
          {duration && (
            <>
              <div style={{ width: "1px", height: "50px", background: "#1e3a5f", display: "flex" }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "24px", fontWeight: "600", color: "#ffffff", fontFamily: "sans-serif", display: "flex" }}>{duration}</span>
                <span style={{ fontSize: "14px", color: "#64748b", fontFamily: "sans-serif", marginTop: "2px", display: "flex" }}>duration</span>
              </div>
            </>
          )}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px", background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.2)", borderRadius: "24px", padding: "8px 16px" }}>
            <span style={{ fontSize: "16px", color: "#2dd4bf", fontFamily: "sans-serif", fontWeight: "600", display: "flex" }}>✓ Solo-friendly</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
