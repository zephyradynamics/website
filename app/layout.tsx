import type { Metadata } from "next";
import { Chivo, Chivo_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zephyradynamics.com"),
  title: {
    default: "Zephyra Dynamics",
    template: "%s | Zephyra Dynamics",
  },
  description:
    "Zephyra Dynamics develops Kestrel X2, LAMINAR airspace software and FlightLab validation technology as one integrated urban air mobility system.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Zephyra Dynamics",
    description:
      "Aircraft, airspace and validation technology engineered as one urban air mobility system.",
    url: "https://www.zephyradynamics.com",
    siteName: "Zephyra Dynamics",
    type: "website",
  },
  icons: { icon: "/logo.ico" },
};

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Kestrel", href: "/kestrel-x2" },
  { label: "LAMINAR", href: "/laminar" },
  { label: "FlightLab", href: "/flightlab" },
  { label: "Blogs", href: "/blogs" },
  { label: "Careers", href: "/careers" },
  { label: "About Us", href: "/about" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${chivo.variable} ${chivoMono.variable} font-sans bg-canvas text-ink overflow-x-hidden`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-canvas"
        >
          Skip to content
        </a>
        <Header logoSrc="/img/logo-ink.png" navItems={navigationItems} />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
