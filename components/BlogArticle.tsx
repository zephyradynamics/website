import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import BlogInteractions from '@/components/BlogInteractions';
import { getPost, posts } from '@/lib/posts';

export default function BlogArticle({ slug, children }: { slug: string; children: React.ReactNode }) {
  const { category, title, summary, image, imageAlt, minutes, published } = getPost(slug);
  const articlePath = `/blogs/${slug}`;
  const more = posts.filter((p) => p.slug !== slug).slice(0, 2);
  const articleUrl = `https://www.zephyradynamics.com${articlePath}`;
  const articleImage = image.startsWith('http')
    ? image
    : `https://www.zephyradynamics.com${image}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: summary,
    image: articleImage,
    datePublished: published,
    dateModified: published,
    inLanguage: 'en-IN',
    mainEntityOfPage: articleUrl,
    author: {
      '@type': 'Organization',
      name: 'Zephyra Dynamics',
      url: 'https://www.zephyradynamics.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zephyra Dynamics',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.zephyradynamics.com/img/logo-ink.png',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.zephyradynamics.com' },
      { '@type': 'ListItem', position: 2, name: 'Writing', item: 'https://www.zephyradynamics.com/blogs' },
      { '@type': 'ListItem', position: 3, name: title, item: articleUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]).replace(/</g, '\\u003c') }}
      />
      <article className="border-b border-rule bg-plate py-[clamp(48px,6vw,76px)]">
        <div className="mx-auto max-w-[1080px] px-(--spacing-gutter)">
          <div>
            <header className="mx-auto flex max-w-[920px] items-center justify-between gap-5 pb-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist">
                  <Image
                    src="/logo.ico"
                    alt=""
                    width={32}
                    height={32}
                    className="h-7 w-7 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">Zephyra Dynamics</p>
                  <p className="meta mt-0.5"><span className="text-signal">{category}</span> · {minutes} min read</p>
                </div>
              </div>
              
            </header>

            <div className="mx-auto max-w-[920px] py-7 sm:py-9">
              <h1 className="font-wide max-w-[22ch] text-balance text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.04] tracking-[-0.03em] text-carbon">
                {title}
              </h1>
            </div>

            <div className="mx-auto max-w-[920px] overflow-hidden rounded-[18px]">
              <Image
                src={image}
                alt={imageAlt}
                width={1600}
                height={900}
                priority
                sizes="(min-width: 1024px) 920px, 100vw"
                className="h-auto w-full"
              />
            </div>

            <div className="mx-auto max-w-[720px] py-8 sm:py-10">
              <p className="max-w-[62ch] text-[17px] leading-[1.75] text-ink-soft">{summary}</p>

              <BlogInteractions articlePath={articlePath} title={title} />
            </div>

            <div className="mx-auto max-w-[720px] border-t border-rule py-9 sm:py-11">
              <div className="space-y-6 text-[16px] leading-[1.82] text-ink-soft [&_h2]:pt-6 [&_h2]:font-display [&_h2]:text-[26px] [&_h2]:leading-tight [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_p]:max-w-none [&_strong]:font-medium [&_strong]:text-ink">
                {children}
              </div>

              <div className="mt-14 border-t border-rule-strong pt-7">
                <p className="meta">Written by the Zephyra Dynamics team in Bengaluru.</p>
              </div>

              <nav aria-label="More writing" className="mt-12">
                <p className="kicker">Keep reading</p>
                <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {more.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blogs/${p.slug}`} className="group block rounded-xl bg-cloud p-5 ring-1 ring-line hover:ring-line-strong">
                        <span className="tag">{p.category}</span>
                        <span className="font-semiwide mt-2 block text-[19px] text-carbon group-hover:text-kestrel">{p.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
