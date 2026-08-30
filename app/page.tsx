import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

const newsroom = [
  {
    image: '/img/news-dassault.webp',
    alt: 'Zephyra Dynamics and Dassault Systèmes',
    href: 'https://www.linkedin.com/company/zephyradynamics/',
  },
  {
    image: '/img/news-nvidia.webp',
    alt: 'Zephyra Dynamics and the NVIDIA Inception Program',
    href: 'https://www.linkedin.com/posts/zephyradynamics_zephyradynamics-kestrelx2-evtol-activity-7431284149686067200-RzlU?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFuCngBz8eI5C1Z50qNwu-RFTP_iQCi5LQ',
  },
];

function Tag({ children }: { children: React.ReactNode }) {
  return <p className="tag mb-6">{children}</p>;
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* ---------- THE AIRSPACE ---------- */}
      <section className="bg-canvas py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-[72px]">
            <div>
              <Tag>The airspace</Tag>
              <h2 className="text-section text-ink">Every aircraft needs an airspace.</h2>
              <p className="mt-6 max-w-[46ch] text-lede text-ink-soft">
                LAMINAR is our cloud platform for urban air traffic management. It gives an operator
                a single live picture of everything moving above a city, from aircraft and routes to
                vertiports, with an AI co-pilot to help keep it all running safely.
              </p>
              <Link
                href="/laminar"
                className="mt-8 inline-flex h-[50px] items-center bg-signal px-[30px] text-sm font-medium text-plate transition-colors hover:bg-signal-dark"
              >
                Discover LAMINAR
              </Link>
            </div>

            <div className="border border-rule-strong bg-plate p-2.5">
              <Image
                src="/image/laminar_full_route_view.png"
                alt="LAMINAR full route view for urban air traffic management"
                width={1919}
                height={1079}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- NEWSROOM ---------- */}
      <section className="border-t border-rule bg-plate py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <div className="mb-11 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-[40px] leading-[1.06] font-bold tracking-[-0.032em] text-ink">
              Newsroom
            </h2>
            <a
              href="https://www.linkedin.com/company/zephyradynamics/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-signal transition-colors hover:text-signal-dark"
            >
              Follow on LinkedIn
            </a>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {newsroom.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-rule bg-canvas transition-colors hover:border-signal"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={1000}
                  height={522}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="h-auto w-full"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </>
  );
}
