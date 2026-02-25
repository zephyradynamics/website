'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

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

  return (
    <footer id="footer" className="bg-[#0A0A0A] text-white w-full border-t border-white/10 relative">
      {/* Disclaimer Popup - Modal Style */}
      {showDisclaimer && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 z-50"
            onClick={() => setShowDisclaimer(false)}
          ></div>
          
          {/* Popup Window */}
          <div 
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-[#0A0A0A] border-2 border-[#0F62FE]/50 rounded-lg p-6 max-w-lg w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-white font-bold text-lg">Disclaimer - Future Variants (Kestrel X2)</h3>
              <button
                onClick={() => setShowDisclaimer(false)}
                className="text-[#BFC5CC] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-[#BFC5CC] leading-relaxed">
              All brand names and logos displayed in the Future Variants section are used for illustrative and conceptual purposes only. 
              They represent potential future applications and do not constitute official partnerships, endorsements, or affiliations with any organization.
            </p>
          </div>
        </>
      )}

      {/* Content */}
      <div className="py-8 px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Left: Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Zephyra Dynamics" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-[#BFC5CC] text-sm leading-relaxed">
               Shaping the Future of Urban Air Mobility.
            </p>
            {/* Supported By */}
            <div className="pt-4">
              <p className="text-[#6B7280] text-xs mb-2">Supported by</p>
              <a 
                href="https://www.3ds.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img 
                  src="/Dassault_Systèmes_logo.svg-removebg-preview.png" 
                  alt="Dassault Systèmes" 
                  className="h-8 w-auto object-contain hover:scale-110 transition-transform duration-300"
                />
              </a>
            </div>
          </div>

          {/* Middle: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-[#BFC5CC] hover:text-[#0F62FE] transition-colors">
                Home
              </Link>
              <Link href="/kestrel-x2" className="text-[#BFC5CC] hover:text-[#0F62FE] transition-colors">
                Kestrel X2
              </Link>
              <Link href="/#about" className="text-[#BFC5CC] hover:text-[#0F62FE] transition-colors">
                About
              </Link>
              <Link href="/#footer" className="text-[#BFC5CC] hover:text-[#0F62FE] transition-colors">
                Contact
              </Link>
              <button 
                onClick={() => setShowDisclaimer(true)}
                className="text-[#BFC5CC] hover:text-[#0F62FE] transition-colors text-left cursor-pointer"
              >
                Disclaimer
              </button>
            </div>
          </div>

          {/* Right: Contact Us */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="flex flex-col gap-4">
              {/* Email */}
              <a
                href="mailto:zephyradynamics@gmail.com"
                className="flex items-center gap-3 text-[#BFC5CC] hover:text-[#0F62FE] transition-colors"
              >
                <Mail size={20} />
                <span className="text-sm">zephyradynamics@gmail.com</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/zephyradynamics/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#BFC5CC] hover:text-[#0F62FE] transition-colors"
              >
                <Linkedin size={20} />
                <span className="text-sm">LinkedIn</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/zephyradynamics/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#BFC5CC] hover:text-[#0F62FE] transition-colors"
              >
                <Instagram size={20} />
                <span className="text-sm">Instagram</span>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/Zephyrdynamics"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#BFC5CC] hover:text-[#0F62FE] transition-colors"
              >
                <XIcon size={20} />
                <span className="text-sm">X</span>
              </a>

              {/* Location */}
              <a
                href="https://maps.google.com/?q=Srinagar,+Jammu+Kashmir,+India+191111"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#BFC5CC] hover:text-[#0F62FE] transition-colors"
              >
                <MapPin size={20} />
                <span className="text-sm">Srinagar, Jammu Kashmir, India</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-[#BFC5CC] text-sm">
            © 2025 Zephyra Dynamics:- All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
