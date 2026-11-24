import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import brand from "@/brand/brand-system.json";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-brand-v2.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-brand-v2.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mcqueencloud.com";

const siteDescription = brand.strategy.positioning;
const socialTitle = `${brand.strategy.headline} | ${brand.meta.name}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "McQueen Cloud Advisory",
    template: "%s | McQueen Cloud Advisory",
  },

  description: siteDescription,

  other: {
    "google-adsense-account": "ca-pub-4166370175402297",
  },

  applicationName: "McQueen Cloud Advisory",

  creator: "McQueen Cloud Advisory",
  publisher: "McQueen Cloud Advisory",

  openGraph: {
    title: socialTitle,
    description: siteDescription,
    siteName: "McQueen Cloud Advisory",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>

        <Header />

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 focus:outline-none"
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
