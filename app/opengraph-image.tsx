import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "#6e1015",
        }}
      >
        <div style={{ display: "flex", color: "#ffffff", opacity: 0.75, fontSize: 22, letterSpacing: 6, marginBottom: 20 }}>
          AUDIOVISUAL PUBLICITÁRIO
        </div>
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 128,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 0.95,
          }}
        >
          CREATIVE
        </div>
        <div style={{ display: "flex", color: "#ffffff", opacity: 0.7, fontSize: 28, marginTop: 24 }}>
          Filmes publicitários com linguagem de cinema.
        </div>
      </div>
    ),
    { ...size }
  );
}
