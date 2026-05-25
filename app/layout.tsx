import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.zephyradynamics.com'),
  title: {
    default: "Zephyra Dynamics",
    template: "%s | Zephyra Dynamics",
  },
  description: "Zephyra Dynamics is building next-generation eVTOL aircraft and urban air traffic management software for India's future air mobility network.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Zephyra Dynamics",
    description: "Next-generation eVTOL aircraft and urban air traffic management software for India's future air mobility network.",
    url: 'https://www.zephyradynamics.com',
    siteName: 'Zephyra Dynamics',
    type: 'website',
  },
  icons: {
    icon: '/logo.ico',
  },
};

// Navigation configuration
const navigationItems = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Product',
    href: '#',
    dropdownItems: [
      {
        label: 'Kestrel X2',
        href: '/kestrel-x2'
      },
      {
        label: 'LAMINAR',
        href: '/laminar'
      }
    ]
  },
  {
    label: 'Company',
    href: '#',
    dropdownItems: [
      {
        label: 'About',
        href: '/about'
      },
      {
        label: 'Careers',
        href: '/careers'
      }
    ]
  },
  {
    label: 'Contact',
    href: '/#footer'
  }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${inter.variable} font-sans antialiased bg-deep-space text-cloud-white overflow-x-hidden`}
      >
        <Header 
          logoSrc="/logo.png"
          navItems={navigationItems}
        />
        {children}
      </body>
    </html>
  );
}
