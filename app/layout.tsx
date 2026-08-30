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
    "Kestrel X2 is a single-seat autonomous eVTOL engineered from first principles for Indian cities, paired with LAMINAR, our cloud urban air traffic management platform.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Zephyra Dynamics",
    description:
      "A single-seat autonomous eVTOL for Indian cities, and the airspace software that keeps a fleet of them apart.",
    url: "https://www.zephyradynamics.com",
    siteName: "Zephyra Dynamics",
    type: "website",
  },
  icons: { icon: "/logo.ico" },
};

const navigationItems = [
  { label: "Home", href: "/" },
  {
    label: "Product",
    href: "#",
    dropdownItems: [
      { label: "Kestrel X2", href: "/kestrel-x2" },
      { label: "LAMINAR", href: "/laminar" },
    ],
  },
  {
    label: "Company",
    href: "#",
    dropdownItems: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    label: "Blogs",
    href: "#",
    dropdownItems: [
      { label: "Urban Air Mobility", href: "/blogs/uam-fundamentals-india" },
      { label: "Our Story", href: "/blogs/zephyra-vision" },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
