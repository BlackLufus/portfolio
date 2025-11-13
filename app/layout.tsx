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
  title: "Portfolio von Michael Reischl",
  description: "Softwareentwickler mit Fokus auf Fullstack-Lösungen.",
  openGraph: {
    title: "Michael Reischl - Portfolio",
    description: "Erfahre mehr über meine Projekte und Skills.",
    url: "https://michaelreischl.de",
    siteName: "Portfolio von Michael Reischl",
    images: [
      {
        url: "https://michaelreischl.de/images/data/portfolio/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Vorschau von Michael Reischls Portfolio",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
