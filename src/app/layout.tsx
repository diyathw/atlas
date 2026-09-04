import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
});

const SITE_URL = "https://www.atlasmaint.com";
const TITLE =
  "Atlas Maintenance Solutions | Commercial Janitorial — Phoenix, AZ";
const DESCRIPTION =
  "Contract cleaning for offices, clinics, schools and light industrial sites across the Valley. Documented scopes, trained W-2 crews, and a supervisor who signs off on every visit.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Atlas Maintenance Solutions",
  },
  description: DESCRIPTION,
  keywords: [
    "commercial janitorial Phoenix",
    "office cleaning Phoenix AZ",
    "medical facility cleaning",
    "school janitorial services",
    "warehouse cleaning Arizona",
    "commercial cleaning contractor",
  ],
  authors: [{ name: "Atlas Maintenance Solutions Inc" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Atlas Maintenance Solutions",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/atlas-media/atlas-photo-04.webp",
        width: 1200,
        height: 900,
        alt: "Atlas crew servicing a client facility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/atlas-media/atlas-photo-04.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Atlas Maintenance Solutions Inc",
  description: DESCRIPTION,
  telephone: "+1-602-555-0148",
  email: "bids@atlasmaint.com",
  areaServed: {
    "@type": "City",
    name: "Phoenix",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Phoenix",
    addressRegion: "AZ",
    addressCountry: "US",
  },
  foundingDate: "2004",
  url: SITE_URL,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F6F4EC] text-[#14170F] font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
