import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { posts } from '@/lib/posts';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata: Metadata = pageMeta({
  title: 'Writing on urban air mobility in India',
  description:
    'Notes from the Zephyra Dynamics team on building Kestrel X2, LAMINAR and FlightLab, and on what it will take to fly over Indian cities.',
  path: '/blogs',
});

export default function BlogsPage() {
  return (
    <>
      <BreadcrumbSchema name="Writing" path="/blogs" />
      <section className="bg-sky pt-[clamp(48px,8vh,96px)]">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <p className="kicker rise mb-4">Writing</p>
          <h1 className="font-wide rise max-w-[22ch] text-display text-balance text-carbon">What we are learning as we build urban air mobility for India.</h1>
          <p className="rise rise-2 mt-7 max-w-[54ch] text-lede text-slate">
            Notes from the team on why we are building Kestrel X2, LAMINAR and FlightLab, the decisions behind
            them and what it will take to fly over Indian cities.
          </p>
        </div>
      </section>

      <section className="bg-sky pt-14 pb-(--spacing-section)">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-(--spacing-gutter) md:grid-cols-2 xl:grid-cols-3">
          {posts.map((article) => (
            <Link
              key={article.slug}
              href={`/blogs/${article.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[18px] bg-cloud ring-1 ring-line transition-shadow hover:shadow-[0_20px_50px_-25px_rgba(21,25,29,0.35)]"
            >
              <div className="aspect-[16/9] overflow-hidden bg-canvas">
                <Image
                  src={article.image}
                  alt=""
                  width={1600}
                  height={900}
                  sizes="(min-width: 1280px) 31vw, (min-width: 768px) 46vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="meta"><span className="tag">{article.category}</span> · {article.minutes} min read</p>
                <h2 className="font-semiwide mt-3 text-[22px] leading-snug tracking-tight text-carbon group-hover:text-kestrel">
                  {article.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{article.summary}</p>
                <p className="mt-auto pt-6 text-[15px] font-semibold text-kestrel">Read the article</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
