// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Logo from '../../public/rivo-logo.jpg'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://rivo.vercel.app"
  ),

  title: {
    default: "RIVO",
    template: "%s | RIVO",
  },

  description:
    "RIVO — Premium specialty coffee. Order online, explore branches, and enjoy real cafe vibes.",

  icons: {
    icon: Logo.src,
    shortcut: Logo.src,
    apple: Logo.src,
  },

  openGraph: {
    title: "RIVO — Specialty Coffee",
    description:
      "Premium coffee, easy ordering, and great cafe vibes.",
    siteName: "RIVO",
    images: [
      {
        url: Logo.src,
        width: 1200,
        height: 630,
        alt: "RIVO Logo",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "RIVO — Specialty Coffee",
    description:
      "Premium coffee, easy ordering, and great cafe vibes.",
    images: Logo.src,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen overflow-x-hidden mt-20">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
