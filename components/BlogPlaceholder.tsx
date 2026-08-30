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
          <h1 className="max-w-[20ch] text-display text-ink">
            {headline} <span className="text-signal">{accent}</span>
          </h1>
          <p className="mt-8 max-w-[52ch] text-lede text-ink-soft">{body}</p>
          <div className="mt-9">
            <Link
              href="/#contact"
              className="inline-flex h-[50px] items-center bg-signal px-[30px] text-sm font-medium text-plate transition-colors hover:bg-signal-dark"
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
