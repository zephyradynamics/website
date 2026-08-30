import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram } from 'lucide-react';

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Kestrel X2', href: '/kestrel-x2' },
      { label: 'LAMINAR', href: '/laminar' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    heading: 'Blog',
    links: [
      { label: 'Urban Air Mobility', href: '/blogs/uam-fundamentals-india' },
      { label: 'Our Story', href: '/blogs/zephyra-vision' },
    ],
  },
];

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/zephyradynamics/', Icon: Linkedin },
  { label: 'X', href: 'https://x.com/Zephyrdynamics', Icon: XIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/zephyradynamics/', Icon: Instagram },
];

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-rule bg-canvas">
      <div className="mx-auto max-w-[1440px] px-(--spacing-gutter) pt-14 pb-10">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div>
            <Image
              src="/img/logo-ink.png"
              alt="Zephyra Dynamics"
              width={430}
              height={151}
              sizes="104px"
              className="h-8 w-auto object-contain"
            />
            <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-ink-soft">
              Shaping the future of urban air mobility.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 lg:gap-[72px]">
            {columns.map((column) => (
              <div key={column.heading} className="flex flex-col gap-[11px]">
                <p className="meta mb-1">{column.heading}</p>
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-ink-soft transition-colors hover:text-signal"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-rule pt-6 sm:flex-row sm:items-center">
          <p className="meta normal-case tracking-[0.06em]">
            &copy; 2025 Zephyra Dynamics
          </p>
          <div className="flex items-center gap-6">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="-m-2 p-2 text-ink-soft transition-colors duration-200 hover:text-signal"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
