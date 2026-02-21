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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 text-white ${
        isScrolled 
          ? 'backdrop-blur-md !bg-black/30 border-b border-white/10' 
          : '!bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 py-1">
        <div className="flex items-center justify-between h-12">
          {/* Logo/Brand - Left side */}
          <div className="flex items-center justify-start">
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

          {/* Desktop Navigation - Right side */}
          <nav className="hidden md:flex items-center justify-end space-x-10 desktop-nav">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
              >
                {item.dropdownItems ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    className="hover:text-[#0F62FE] transition-colors duration-300 text-sm font-medium tracking-[0.2em] flex items-center gap-1"
                  >
                    {item.label}
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-[#0F62FE] transition-colors duration-300 text-sm font-medium tracking-[0.2em] flex items-center gap-1"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown menu for items with sub-items */}
                {item.dropdownItems && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 bg-[#0A0A0A] text-white rounded shadow-lg min-w-[140px] z-50 opacity-0 animate-fadeIn border border-white/10">
                    <div className="py-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block px-3 py-1.5 hover:text-[#0F62FE] transition-colors text-xs tracking-wide"
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
            className="md:hidden p-2 hover:text-[#0F62FE] transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 border-t border-white/10 pt-6 bg-[#0A0A0A]/95 -mx-6 px-6" role="navigation" aria-label="Mobile navigation">
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block py-2 hover:text-[#0F62FE] transition-colors text-base font-medium tracking-[0.2em] flex items-center gap-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                    {item.dropdownItems && <ChevronDown size={16} />}
                  </Link>

                  {/* Mobile dropdown items */}
                  {item.dropdownItems && (
                    <div className="ml-4 mt-3 space-y-3">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block py-1 text-xs text-[#BFC5CC] hover:text-[#0F62FE] transition-colors tracking-wide"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
