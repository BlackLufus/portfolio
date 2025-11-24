import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/general.css";
import "../styles/loader.css";
import "../styles/main.css"
import "../styles/theme-settings.css"
import "../styles/components/frame.css"
import "../styles/components/nav.css";
import "../styles/components/numberdetector.css";
import "../styles/components/overview.css";
import "../styles/components/about_me.css";
import "../styles/components/skills.css";
import "../styles/components/project.css";
import "../styles/components/education.css";
import "../styles/components/contact.css";
import "../styles/components/footer.css";
import "../styles/components/form.css";
import "../styles/widgets/custom_scroll_bar.css";

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
