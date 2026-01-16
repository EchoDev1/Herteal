import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PromoBanner from "@/components/layout/PromoBanner";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import LuxuryEffects from "@/components/ui/LuxuryEffects";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProductsProvider } from "@/contexts/ProductsContext";

// House of CB Inspired Fonts
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Legacy fonts (keep for backwards compatibility)
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-variable",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Herteals - Luxury Women's Tailoring | Premium Nigerian Fashion",
    template: "%s | Herteals - Luxury Tailoring",
  },
  description:
    "Discover exquisite women's tailored clothing for the modern Nigerian woman. From elegant dresses to sophisticated suits and refined blouses, each piece celebrates African elegance with meticulous craftsmanship and premium fabrics.",
  keywords: [
    "luxury tailoring Nigeria",
    "women's suits Nigeria",
    "designer dresses Lagos",
    "custom blouses Abuja",
    "Nigerian fashion",
    "African elegance",
    "premium tailoring",
    "women's formal wear",
    "bespoke clothing Nigeria",
    "luxury fashion Nigeria",
    "made-to-measure suits",
    "high-end women's fashion",
  ],
  authors: [{ name: "Herteals" }],
  creator: "Herteals",
  publisher: "Herteals",
  metadataBase: new URL("https://herteals.com"),
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://herteals.com",
    siteName: "Herteals",
    title: "Herteals - Luxury Women's Tailoring | Premium Nigerian Fashion",
    description:
      "Exquisite women's tailored clothing celebrating the modern Nigerian woman's sophistication. Premium fabrics, expert craftsmanship, timeless elegance.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Herteals Luxury Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Herteals - Luxury Women's Tailoring",
    description:
      "Exquisite women's tailored clothing for the modern Nigerian woman.",
    images: ["/images/twitter-image.jpg"],
    creator: "@herteals",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://herteals.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#15803d" />
      </head>
      <body
        className={`${playfair.variable} ${montserrat.variable} ${cormorantGaramond.variable} ${inter.variable} antialiased flex flex-col min-h-screen relative overflow-x-hidden`}
      >
        <AuthProvider>
          <ProductsProvider>
            <LuxuryEffects />
            <Header />
            <main className="flex-grow relative z-10">{children}</main>
            <Footer />
            <WhatsAppButton />
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
