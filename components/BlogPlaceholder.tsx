import Link from 'next/link';
import Footer from '@/components/Footer';

interface BlogPlaceholderProps {
  tag: string;
  headline: string;
  accent: string;
  body: string;
}

export default function BlogPlaceholder({ tag, headline, accent, body }: BlogPlaceholderProps) {
  return (
    <>
      <section className="border-b border-rule bg-plate py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <p className="tag mb-7">{tag}</p>
          <h1 className="max-w-[20ch] font-wide text-display text-balance text-carbon">
            {headline} {accent}
          </h1>
          <p className="mt-8 max-w-[52ch] text-lede text-ink-soft">{body}</p>
          <div className="mt-9">
            <Link
              href="/#contact"
              className="inline-flex h-12 items-center rounded-full bg-kestrel px-6 text-[15px] font-semibold text-white transition-colors hover:bg-kestrel-deep"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
