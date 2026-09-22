import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0f1f35 0%, #1e3a5f 60%, #0f1f35 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(212,168,83,0.08)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: "-120px", left: "-60px", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(212,168,83,0.05)", display: "flex" }} />

        {/* Compass emoji */}
        <div style={{ fontSize: "72px", marginBottom: "24px", display: "flex" }}>🧭</div>

        {/* Site name */}
        <div style={{ fontSize: "56px", fontWeight: "bold", color: "#ffffff", letterSpacing: "-1px", marginBottom: "12px", display: "flex" }}>
          SouloSpotter
        </div>

        {/* Gold divider */}
        <div style={{ width: "80px", height: "3px", background: "#d4a853", borderRadius: "2px", marginBottom: "20px", display: "flex" }} />

        {/* Tagline */}
        <div style={{ fontSize: "28px", color: "#94a3b8", textAlign: "center", maxWidth: "700px", lineHeight: 1.4, display: "flex" }}>
          Travel alone. Travel Soulo. Find yourself.
        </div>

        {/* URL */}
        <div style={{ position: "absolute", bottom: "36px", fontSize: "18px", color: "#64748b", display: "flex" }}>
          soulospotter.com
        </div>
      </div>
    ),
    { ...size }
  );
}
