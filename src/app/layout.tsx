import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUX Motion — Cinematic Automotive Experience",
  description:
    "A premium scroll-driven automotive landing page built with Next.js, GSAP ScrollTrigger, and Tailwind CSS. Experience cinematic motion design.",
  keywords: ["automotive", "GSAP", "scroll animation", "Next.js", "Tailwind CSS", "motion design"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white`}
      >
        {/* Film-grain noise overlay for premium feel */}
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
