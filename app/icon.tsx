import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Ícone da aba: marca da Creative (rolo de filme) em branco sobre vinho. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6e1015",
        }}
      >
        <svg width="52" height="52" viewBox="0 0 120 120">
          <mask id="m" maskUnits="userSpaceOnUse">
            <rect width="120" height="120" fill="black" />
            <circle cx="56" cy="60" r="46" fill="white" />
            <circle cx="56" cy="60" r="30" fill="black" />
            <path d="M56 60 L130 2 L130 118 Z" fill="black" />
            <circle cx="56" cy="60" r="22" fill="white" />
            <circle cx="56" cy="60" r="4.6" fill="black" />
            <circle cx="56" cy="48" r="4.6" fill="black" />
            <circle cx="66.4" cy="54" r="4.6" fill="black" />
            <circle cx="66.4" cy="66" r="4.6" fill="black" />
            <circle cx="56" cy="72" r="4.6" fill="black" />
            <circle cx="45.6" cy="66" r="4.6" fill="black" />
            <circle cx="45.6" cy="54" r="4.6" fill="black" />
          </mask>
          <rect width="120" height="120" fill="#ffffff" mask="url(#m)" />
          <path d="M96 32 L104 46 L88 46 Z" fill="#ffffff" />
          <rect x="88" y="49" width="16" height="38" fill="#ffffff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
