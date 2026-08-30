'use client';

import Link from 'next/link';
import { Linkedin, Instagram, MapPin } from 'lucide-react';

// Custom X (Twitter) Icon Component
const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="inline-block"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer id="footer" className="bg-deep-space text-cloud-white w-full border-t border-horizon-cyan/20 relative overflow-hidden">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-horizon-cyan to-transparent"></div>

      {/* Content */}
      <div className="py-12 px-6 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div>
              <img
                src="/logo.png"
                alt="Zephyra Dynamics"
                className="h-10 w-auto object-contain"
              />
              <p className="text-stratosphere-silver text-xs font-semibold mt-2">Shaping the Future of Urban Air Mobility</p>
            </div>
            {/* Partners */}
            <div>
              <p className="text-stratosphere-silver text-[10px] font-semibold mb-2">Supported by</p>
              <div className="flex items-center gap-4">
                <img
                  src="/3DS_Corp_Logotype_White_RGB-1.png"
                  alt="Dassault Systèmes"
                  className="h-8 w-auto object-contain hover:scale-110 transition-transform duration-300"
                />
                <img
                  src="/nvidia.png"
                  alt="NVIDIA"
                  className="h-8 w-auto object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-cloud-white uppercase tracking-widest">Product</h3>
            <div className="flex flex-col gap-3">
              <Link href="/kestrel-x2" className="text-stratosphere-silver hover:text-horizon-cyan transition-colors text-sm">
                Kestrel X2
              </Link>
              <Link href="/laminar" className="text-stratosphere-silver hover:text-horizon-cyan transition-colors text-sm">
                LAMINAR
              </Link>
            </div>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-cloud-white uppercase tracking-widest">Company</h3>
            <div className="flex flex-col gap-3">
              <Link href="/about" className="text-stratosphere-silver hover:text-horizon-cyan transition-colors text-sm">
                About
              </Link>
              <Link href="/careers" className="text-stratosphere-silver hover:text-horizon-cyan transition-colors text-sm">
                Careers
              </Link>
            </div>
          </div>

          {/* Column 4: Connect */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-cloud-white uppercase tracking-widest">Connect</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-stratosphere-silver text-sm">
                {/* Changed className from text-horizon-cyan to text-cloud-white */}
                <MapPin size={16} className="text-cloud-white" />
                <span>Srinagar, India</span>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <a href="https://www.linkedin.com/company/zephyradynamics/" target="_blank" rel="noopener noreferrer" className="text-stratosphere-silver hover:text-horizon-cyan transition-colors">
                  <Linkedin size={16} />
                </a>
                <a href="https://x.com/Zephyrdynamics" target="_blank" rel="noopener noreferrer" className="text-stratosphere-silver hover:text-horizon-cyan transition-colors">
                  <XIcon size={16} />
                </a>
                <a href="https://www.instagram.com/zephyradynamics/" target="_blank" rel="noopener noreferrer" className="text-stratosphere-silver hover:text-horizon-cyan transition-colors">
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-horizon-cyan/20 pt-8 text-center">
          <p className="text-stratosphere-silver/70 text-xs">
            © 2025 Zephyra Dynamics. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
