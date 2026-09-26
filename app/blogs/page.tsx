import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Writing from Zephyra Dynamics on urban air mobility, engineering and company progress.',
  alternates: { canonical: '/blogs' },
};

const articles = [
  {
    label: 'Urban Air Mobility',
    title: 'The fundamentals of urban air mobility and where India stands',
    summary: "A practical introduction to eVTOL aircraft, airspace systems and India's developing UAM ecosystem.",
    href: '/blogs/uam-fundamentals-india',
    image: '/image/Blog.png',
    width: 1672,
    height: 941,
  },
  {
    label: 'Our Story',
    title: 'Why we exist: the Zephyra Dynamics vision',
    summary: 'How one difficult commute became an aerospace question and then a company built to answer it.',
    href: '/blogs/zephyra-vision',
    image: '/image/kestrel_hero.png',
    width: 6400,
    height: 3906,
  },
  {
    label: 'Flight Validation',
    title: 'FlightLab: building a traceable simulation platform',
    summary: 'How FlightLab brings repeatable simulation, testing and engineering evidence into one workflow.',
    href: '/blogs/flightlab',
    image: '/image/Flight Lab (1).png',
    width: 1672,
    height: 941,
  },
];

export default function BlogsPage() {
  return (
    <>
      <section className="border-b border-rule bg-plate py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <p className="tag mb-7">Blogs</p>
          <h1 className="max-w-[18ch] text-display text-ink">
            Notes from the <span className="text-signal">workshop.</span>
          </h1>
          <p className="mt-7 max-w-[58ch] text-lede text-ink-soft">
            Explore our writing on aircraft, airspace, validation and the work behind Zephyra Dynamics.
          </p>
        </div>
      </section>

      <section className="bg-canvas py-(--spacing-section)">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-(--spacing-gutter) md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-rule-strong bg-plate transition-transform duration-200 hover:-translate-y-1 hover:border-signal"
            >
              <div className="aspect-[16/9] overflow-hidden bg-canvas">
                <Image
                  src={article.image}
                  alt=""
                  width={article.width}
                  height={article.height}
                  sizes="(min-width: 1280px) 31vw, (min-width: 768px) 46vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="tag">{article.label}</p>
                <h2 className="mt-4 text-[24px] leading-tight font-bold tracking-[-0.025em] text-ink">
                  {article.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{article.summary}</p>
                <p className="mt-auto pt-6 text-sm font-medium text-signal">Read full article</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
