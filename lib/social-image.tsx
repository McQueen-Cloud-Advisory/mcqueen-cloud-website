import { ImageResponse } from "next/og";

type SocialImageSize = {
  width: number;
  height: number;
};

export function createSocialImage(size: SocialImageSize) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #020617 0%, #0f172a 58%, #172554 100%)",
          color: "#ffffff",
          padding: "64px 72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            McQueen Cloud Advisory
          </div>

          <div
            style={{
              display: "flex",
              border: "1px solid rgba(96, 165, 250, 0.45)",
              borderRadius: 999,
              padding: "10px 18px",
              color: "#93c5fd",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            Built on Google Cloud
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#60a5fa",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Analytics · Automation · Architecture
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 62,
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            Practical cloud systems for organizations outgrowing manual work.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#cbd5e1",
            fontSize: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            Turning data into action. Turning action into impact.
          </div>

          <div
            style={{
              display: "flex",
              color: "#93c5fd",
              fontWeight: 700,
            }}
          >
            mcqueencloud.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
