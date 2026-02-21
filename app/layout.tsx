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
  title: "Zephyra Dynamics",
  description: "Designing and Developing Next-Generation eVTOL Aircraft", // [cite: 40]
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
    label: 'About',
    href: '/#about'
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
        className={`${montserrat.variable} ${inter.variable} font-sans antialiased bg-[#0A0A0A] text-white overflow-x-hidden`}
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