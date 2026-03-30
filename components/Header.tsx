'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';

// TypeScript interfaces for Header component props
interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdownItems?: DropdownItem[];
}

interface HeaderProps {
  logoSrc?: string;
  brandName?: string;
  navItems: NavItem[];
}

export default function Header({
  logoSrc,
  brandName,
  navItems,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.desktop-nav')) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) setMobileActiveDropdown(null);
  };

  const toggleMobileDropdown = (label: string) => {
    setMobileActiveDropdown(mobileActiveDropdown === label ? null : label);
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 text-cloud-white ${
        isScrolled && !isMobileMenuOpen
          ? 'backdrop-blur-md !bg-deep-space/30 border-b border-horizon-cyan/20'
          : '!bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 py-1">
        <div className="flex items-center justify-between h-16 md:h-12 relative z-[60]">
          {/* Logo/Brand - Left side */}
          <div className="flex items-center justify-start h-full">
            <div className="flex items-center gap-3">
              {logoSrc ? (
                <Image 
                  src={logoSrc} 
                  alt="Zephyra Dynamics" 
                  width={200} 
                  height={65}
                  className="h-10 w-auto object-contain"
                  priority
                />
              ) : brandName ? (
                <span className="text-base font-semibold tracking-widest uppercase">{brandName}</span>
              ) : null}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-stretch justify-end space-x-1 desktop-nav h-full">
            {navItems.map((item) => (
              <div key={item.label} className="relative flex items-stretch">
                {item.dropdownItems ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    className={`px-5 h-full transition-colors duration-200 text-sm font-medium tracking-[0.2em] flex items-center gap-1 ${
                      activeDropdown === item.label 
                        ? 'bg-[#151515] text-cloud-white rounded-t-md' 
                        : 'hover:text-horizon-cyan text-cloud-white'
                    }`}
                  >
                    {item.label}
                    <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="px-5 h-full transition-colors duration-200 text-sm font-medium tracking-[0.2em] flex items-center gap-1 hover:text-horizon-cyan text-cloud-white"
                  >
                    {item.label}
                  </Link>
                )}

                {item.dropdownItems && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 w-full bg-[#151515] rounded-b-md shadow-2xl z-50 overflow-hidden border-t border-white/5">
                    <div className="py-2 flex flex-col">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block w-full px-5 py-3 hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white tracking-widest text-center"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 hover:text-horizon-cyan transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay - Full screen black blur including upper section */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[55] bg-black/90 backdrop-blur-2xl md:hidden flex flex-col animate-fadeIn">
            <nav className="flex flex-col pt-24 px-8 space-y-8 overflow-y-auto" role="navigation">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-white/10 pb-4">
                  {item.dropdownItems ? (
                    <button
                      className="w-full flex items-center justify-between py-2 text-white transition-colors text-xl font-medium tracking-[0.2em]"
                      onClick={() => toggleMobileDropdown(item.label)}
                    >
                      {item.label}
                      <ChevronDown 
                        size={20} 
                        className={`transition-transform duration-300 ${
                          mobileActiveDropdown === item.label ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-2 text-white transition-colors text-xl font-medium tracking-[0.2em]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Mobile dropdown items - Closed by default */}
                  {item.dropdownItems && mobileActiveDropdown === item.label && (
                    <div className="ml-4 mt-4 space-y-5 animate-fadeIn">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block text-stratosphere-silver hover:text-horizon-cyan transition-colors text-base tracking-widest"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}