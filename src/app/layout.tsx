import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL in production so OG/Twitter images resolve absolutely.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "X1T — FPS Patcher Studio & Universal Downloader",
  description:
    "Two local-first Windows tools for creators: FPS Patcher Studio rewrites MP4/MOV container timing without re-encoding, and Universal Downloader pulls media from 15 sites into one queue.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "X1T — FPS Patcher Studio & Universal Downloader",
    description:
      "Patch container timing without re-encoding. Download media from 15 sites. Both run on your PC.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "X1T — FPS Patcher Studio & Universal Downloader",
    description:
      "Patch container timing without re-encoding. Download media from 15 sites. Both run on your PC.",
    images: ["/og.png"],
  },
};

const init = `(() => {
  try {
    const accents = ["crimson", "violet", "cyan", "emerald", "amber"];
    const saved = localStorage.getItem("x1t-accent");
    document.documentElement.dataset.accent = accents.includes(saved) ? saved : "crimson";
    const lang = localStorage.getItem("x1t-lang");
    document.documentElement.lang = lang === "en" ? "en" : "th";
  } catch {}
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: init }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "SoftwareApplication",
                  name: "FPS Patcher Studio",
                  applicationCategory: "MultimediaApplication",
                  operatingSystem: "Windows 10, Windows 11",
                  softwareVersion: "1.2.0",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                  url: "https://github.com/x1Swimzft/FPS-Patcher-Studio",
                },
                {
                  "@type": "SoftwareApplication",
                  name: "Universal Downloader",
                  applicationCategory: "MultimediaApplication",
                  operatingSystem: "Windows 10, Windows 11",
                  softwareVersion: "1.0.0",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                  url: "https://github.com/x1Swimzft/universal-downloader",
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
