import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  title: "UBTA - United Boda Transport Association | Nairobi Kenya",
  description: "CBD United Boda Transport Co-Operative Society Limited. Register your boda boda membership, get your certificate and join thousands of riders in Nairobi Kenya. Stronger Together. Safer Together. Growing Together.",
  keywords: "boda boda nairobi, ubta, united boda transport, boda registration kenya, boda sacco nairobi, CBD sacco, boda boda sacco kenya",
  metadataBase: new URL("https://www.ubta.co.ke"),
  openGraph: {
    title: "UBTA - United Boda Transport Association | Nairobi Kenya",
    description: "Register your boda boda membership in Nairobi Kenya. Join CBD United Boda Transport Co-Operative Society Limited.",
    url: "https://www.ubta.co.ke",
    siteName: "UBTA",
    images: [{ url: "https://www.ubta.co.ke/logo.jpeg", width: 800, height: 800, alt: "UBTA Logo" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "UBTA - United Boda Transport Association",
    description: "Register your boda boda membership in Nairobi Kenya.",
    images: ["https://www.ubta.co.ke/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F37121" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${inter.className} bg-[#121318] antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
