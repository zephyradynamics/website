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
  applicationName: "Zephyra Dynamics",
  authors: [{ name: "Zephyra Dynamics", url: "https://www.zephyradynamics.com" }],
  creator: "Zephyra Dynamics",
  publisher: "Zephyra Dynamics",
  title: {
    default: "Zephyra Dynamics",
    template: "%s | Zephyra Dynamics",
  },
  description:
    "Zephyra Dynamics develops Kestrel X2, LAMINAR airspace software and FlightLab validation technology as one integrated urban air mobility system.",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Zephyra Dynamics",
    description:
      "Aircraft, airspace and validation technology engineered as one urban air mobility system.",
    url: "https://www.zephyradynamics.com",
    siteName: "Zephyra Dynamics",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/image/kestrel_hero.png",
        width: 1200,
        height: 733,
        alt: "Zephyra Dynamics Kestrel aircraft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zephyra Dynamics",
    description:
      "Aircraft, airspace and validation technology engineered for urban air mobility.",
    images: ["/image/kestrel_hero.png"],
  },
  icons: { icon: "/logo.ico" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.zephyradynamics.com/#organization",
      name: "Zephyra Dynamics",
      url: "https://www.zephyradynamics.com",
      logo: "https://www.zephyradynamics.com/img/logo-ink.png",
      description:
        "Zephyra Dynamics develops aircraft, airspace and validation technology for urban air mobility.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Department of Aerospace Engineering, RV College of Engineering",
        postalCode: "560059",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      sameAs: [
        "https://www.linkedin.com/company/zephyradynamics/",
        "https://x.com/Zephyrdynamics",
        "https://www.instagram.com/zephyradynamics/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.zephyradynamics.com/#website",
      url: "https://www.zephyradynamics.com",
      name: "Zephyra Dynamics",
      publisher: { "@id": "https://www.zephyradynamics.com/#organization" },
      inLanguage: "en-IN",
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }}
        />
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
