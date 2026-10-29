import type { Metadata } from "next";
// Self-hosted type: Archivo for headlines, Inter for reading, Space Mono for labels and controls
import "@fontsource/archivo/latin-500.css";
import "@fontsource/archivo/latin-600.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/space-mono/latin-400.css";
import "@fontsource/space-mono/latin-700.css";
import "./globals.css";
import Header from "@/components/Header";


const tagline = "Shaping the future of Urban Air Mobility in India";

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
    "Zephyra Dynamics builds Kestrel X2, a single-seat autonomous electric aircraft, with LAMINAR airspace software and the FlightLab virtual twin, in Bengaluru.",
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
    title: `Zephyra Dynamics · ${tagline}`,
    description: tagline,
    url: "https://www.zephyradynamics.com",
    siteName: "Zephyra Dynamics",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Kestrel X2 by Zephyra Dynamics flying over Bengaluru at dawn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Zephyra Dynamics · ${tagline}`,
    description: tagline,
    images: ["/og.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.zephyradynamics.com/#organization",
      name: "Zephyra Dynamics",
      alternateName: "Zephyra",
      url: "https://www.zephyradynamics.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.zephyradynamics.com/brand/zephyra-logo-square.png",
        width: 600,
        height: 600,
      },
      image: "https://www.zephyradynamics.com/og.jpg",
      email: "info@zephyradynamics.com",
      founder: { "@type": "Person", name: "Sadiq Ali Mir", jobTitle: "Founder and Chief Executive Officer" },
      knowsAbout: ["Urban Air Mobility", "eVTOL aircraft", "Autonomous flight", "Airspace management", "Virtual twin simulation"],
      contactPoint: [
        { "@type": "ContactPoint", contactType: "customer support", email: "info@zephyradynamics.com", areaServed: "IN", availableLanguage: ["en"] },
        { "@type": "ContactPoint", contactType: "careers", email: "career@zephyradynamics.com", areaServed: "IN", availableLanguage: ["en"] },
      ],
      description:
        "Zephyra Dynamics builds aircraft, airspace and validation technology for Urban Air Mobility in India.",
      slogan: tagline,
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
      alternateName: ["Zephyra", "zephyradynamics.com"],
      publisher: { "@id": "https://www.zephyradynamics.com/#organization" },
      inLanguage: "en-IN",
    },
  ],
};

const navigationItems = [
  { label: "Kestrel X2", href: "/kestrel-x2" },
  { label: "LAMINAR", href: "/laminar" },
  { label: "FlightLab", href: "/flightlab" },
  { label: "Company", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Writing", href: "/blogs" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <body className="font-sans bg-sky text-carbon overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-carbon focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Header logoSrc="/img/logo-ink.png" navItems={navigationItems} />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
