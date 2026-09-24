import { ImageResponse } from "next/og";

type SocialImageSize = { width: number; height: number };

export function createSocialImage(size: SocialImageSize) {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#111820", color: "#f5f7fa", padding: "48px 64px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 24, borderBottom: "1px solid #354252" }}>
        <div style={{ display: "flex", fontSize: 25, letterSpacing: "-0.04em", fontWeight: 700 }}>McQueen Cloud Advisory</div>
        <div style={{ display: "flex", fontSize: 15, color: "#bbc6d2" }}>ANALYTICS / AUTOMATION / ARCHITECTURE</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.06em" }}>
          <div style={{ display: "flex" }}>Complex</div>
          <div style={{ display: "flex" }}>operations.</div>
          <div style={{ display: "flex", color: "#9fc2ff" }}>Clear systems.</div>
        </div>
        <svg width="420" height="350" viewBox="0 0 420 350" fill="none">
          <path d="m30 213 180-97 180 97v16l-180 97-180-97Z" fill="#18222f" stroke="#5d7899" />
          <path d="m30 213 180 97 180-97M75 213l135 73 135-73M120 213l90 49 90-49" stroke="#537398" />
          <path d="m30 145 180-97 180 97v16l-180 97-180-97Z" fill="#203959" stroke="#8cb8ff" />
          <path d="m30 145 180 97 180-97M100 145l110-60 110 60-110 60Z" stroke="#8cb8ff" />
          <path d="M100 145v75m220-75v75m-110-15v57" stroke="#8cb8ff" strokeDasharray="4 5" />
          <path d="m135 93 75-40 75 40v12l-75 40-75-40Z" fill="#18222f" stroke="#bdd6ff" />
          <path d="m135 93 75 40 75-40m-75-40v80" stroke="#bdd6ff" />
          <circle cx="210" cy="262" r="4" fill="#bdd6ff" />
        </svg>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#bbc6d2", paddingTop: 24, borderTop: "1px solid #354252" }}>
        <div style={{ display: "flex" }}>Thoughtful architecture. Dependable systems.</div>
        <div style={{ display: "flex", color: "#9fc2ff" }}>mcqueencloud.com</div>
      </div>
    </div>,
    size,
  );
}
