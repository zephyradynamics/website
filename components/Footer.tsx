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
    heading: 'Technology',
    links: [
      { label: 'Kestrel X2', href: '/kestrel-x2' },
      { label: 'LAMINAR', href: '/laminar' },
      { label: 'FlightLab', href: '/flightlab' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Writing', href: '/blogs' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'info@zephyradynamics.com', href: 'mailto:info@zephyradynamics.com' },
      { label: 'career@zephyradynamics.com', href: 'mailto:career@zephyradynamics.com' },
      { label: 'Send a message', href: '/#contact' },
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
    <footer id="footer" className="border-t border-line bg-cloud">
      <div className="mx-auto max-w-[1440px] px-(--spacing-gutter) pt-20 pb-10">
        {/* tagline on the left, the two ways to join in on the right: the line does a job instead of floating alone */}
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-[1.25fr_1fr] md:gap-16">
          <p className="font-wide max-w-[18ch] text-balance text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.04] text-carbon">
            Shaping the future of Urban Air Mobility in India.
          </p>
          <div className="md:pb-1.5">
            <p className="max-w-[44ch] text-[16px] leading-relaxed text-slate">
              We are building Kestrel X2, LAMINAR and FlightLab in Bengaluru. Partners, cities and engineers
              are welcome to come along.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#contact" className="label-mono inline-flex h-11 items-center rounded-full bg-kestrel px-5 font-bold text-white transition-colors hover:bg-kestrel-deep">
                Partner with us
              </Link>
              <Link href="/careers" className="label-mono inline-flex h-11 items-center rounded-full px-5 font-bold text-carbon ring-1 ring-line-strong transition-colors hover:bg-mist">
                Join the team
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-line pt-12 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Image
              src="/img/logo-ink.png"
              alt="Zephyra Dynamics"
              width={430}
              height={151}
              sizes="140px"
              className="-ml-1.5 h-auto w-[140px] object-contain"
            />
            <address className="mt-5 text-[15px] leading-relaxed text-slate not-italic">
              Department of Aerospace Engineering
              <br />
              RV College of Engineering
              <br />
              Bengaluru 560059, Karnataka, India
            </address>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.heading} className="flex min-w-0 flex-col gap-3">
                <p className="text-[15px] font-semibold text-carbon">{column.heading}</p>
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="break-words text-[15px] text-slate transition-colors hover:text-kestrel"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-5 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-[13px] text-slate">
            &copy; {new Date().getFullYear()} Zephyra Dynamics. Made in Bengaluru.
          </p>
          <div className="flex items-center gap-5">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Zephyra Dynamics on ${label}`}
                className="-m-2 p-2 text-slate transition-colors hover:text-kestrel"
              >
                <Icon size={19} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
