'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';

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

export default function Header({ logoSrc, brandName, navItems }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);

  const navRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (activeDropdown) setActiveDropdown(null);
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeDropdown, isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const panel = mobilePanelRef.current;
    if (!panel) return;
    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    );
    focusables[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener('keydown', onKeyDown);
    return () => panel.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  const closeMobile = useCallback(() => {
    setIsMobileMenuOpen(false);
    setMobileActiveDropdown(null);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rule bg-canvas">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-(--spacing-gutter)">
        <Link href="/" aria-label="Zephyra Dynamics, home" className="flex items-center">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt="Zephyra Dynamics"
              width={430}
              height={151}
              sizes="112px"
              priority
              className="h-[38px] w-auto object-contain"
            />
          ) : brandName ? (
            <span className="text-lg font-medium tracking-tight">{brandName}</span>
          ) : null}
        </Link>

        <nav ref={navRef} aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isOpen = activeDropdown === item.label;
            return (
              <div key={item.label} className="relative">
                {item.dropdownItems ? (
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-controls={`menu-${item.label}`}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${
                      isOpen ? 'text-ink' : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <Link href={item.href} className="text-sm text-ink-soft transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                )}

                {item.dropdownItems && isOpen && (
                  <div
                    id={`menu-${item.label}`}
                    className="absolute top-[calc(100%+18px)] left-0 min-w-[170px] border border-rule bg-plate"
                  >
                    {item.dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.label}
                        href={dropdownItem.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block border-b border-rule px-5 py-3 text-sm text-ink-soft transition-colors last:border-b-0 hover:bg-canvas hover:text-ink"
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/#contact"
            className="inline-flex h-[34px] items-center border border-signal px-[18px] text-xs font-medium text-signal transition-colors hover:bg-signal hover:text-plate"
          >
            Get in touch
          </Link>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          className="-mr-2 p-2 text-ink md:hidden"
        >
          {isMobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" ref={mobilePanelRef} className="fixed inset-0 top-[76px] z-40 bg-canvas md:hidden">
          <nav aria-label="Mobile" className="flex flex-col px-(--spacing-gutter) pt-6">
            {navItems.map((item) => {
              const isOpen = mobileActiveDropdown === item.label;
              return (
                <div key={item.label} className="border-b border-rule py-5">
                  {item.dropdownItems ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setMobileActiveDropdown(isOpen ? null : item.label)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between text-xl font-medium tracking-tight text-ink"
                      >
                        {item.label}
                        <ChevronDown
                          size={18}
                          aria-hidden="true"
                          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="mt-4 flex flex-col gap-4 pl-4">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.label}
                              href={dropdownItem.href}
                              onClick={closeMobile}
                              className="text-base text-ink-soft"
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} onClick={closeMobile} className="block text-xl font-medium tracking-tight text-ink">
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
            <Link
              href="/#contact"
              onClick={closeMobile}
              className="mt-8 inline-flex h-12 items-center justify-center bg-signal text-sm font-medium text-plate"
            >
              Get in touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
