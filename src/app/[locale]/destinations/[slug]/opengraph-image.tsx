import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;

  const city = await prisma.city.findUnique({
    where: { slug },
    select: {
      name: true,
      description: true,
      country: { select: { name: true, flagEmoji: true } },
      _count: { select: { spots: { where: { published: true } } } },
    },
  });

  const cityName = city?.name ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const countryName = city?.country.name ?? "";
  const flagEmoji = city?.country.flagEmoji ?? "🌍";
  const spotCount = city?._count.spots ?? 0;

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
        {/* Decorative circle */}
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(212,168,83,0.07)", display: "flex" }} />

        {/* Top — branding */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "32px" }}>🧭</span>
          <span style={{ fontSize: "22px", color: "#94a3b8", fontFamily: "sans-serif", letterSpacing: "0.05em" }}>
            SOULOSPOTTER
          </span>
        </div>

        {/* Middle — city */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ fontSize: "22px", color: "#d4a853", fontFamily: "sans-serif", fontWeight: "600", letterSpacing: "0.08em", display: "flex" }}>
            SOLO TRAVEL GUIDE
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "56px" }}>{flagEmoji}</span>
            <span style={{ fontSize: "72px", fontWeight: "bold", color: "#ffffff", lineHeight: 1, display: "flex" }}>
              {cityName}
            </span>
          </div>
          <div style={{ fontSize: "28px", color: "#94a3b8", fontFamily: "sans-serif", display: "flex" }}>
            {countryName}
          </div>
        </div>

        {/* Bottom — stats */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "36px", fontWeight: "bold", color: "#d4a853", fontFamily: "sans-serif" }}>{spotCount}</span>
            <span style={{ fontSize: "16px", color: "#64748b", fontFamily: "sans-serif", marginTop: "2px" }}>curated spots</span>
          </div>
          <div style={{ width: "1px", height: "50px", background: "#1e3a5f", display: "flex" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "36px", fontWeight: "bold", color: "#d4a853", fontFamily: "sans-serif", display: "flex" }}>✓</span>
            <span style={{ fontSize: "16px", color: "#64748b", fontFamily: "sans-serif", marginTop: "2px", display: "flex" }}>solo-friendly</span>
          </div>
          <div style={{ marginLeft: "auto", fontSize: "18px", color: "#475569", fontFamily: "sans-serif", display: "flex" }}>
            soulospotter.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
