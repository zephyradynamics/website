import Image from 'next/image';
import Footer from '@/components/Footer';
import BlogInteractions from '@/components/BlogInteractions';

interface BlogArticleProps {
  category: string;
  title: string;
  summary: string;
  articlePath: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  children: React.ReactNode;
}

export default function BlogArticle({
  category,
  title,
  summary,
  articlePath,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  children,
}: BlogArticleProps) {
  return (
    <>
      <article className="border-b border-rule bg-plate py-[clamp(48px,6vw,76px)]">
        <div className="mx-auto max-w-[1080px] px-(--spacing-gutter)">
          <div>
            <header className="mx-auto flex max-w-[920px] items-center justify-between gap-5 pb-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-rule bg-canvas">
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
                  <p className="meta mt-0.5 text-signal">{category}</p>
                </div>
              </div>
              <span className="meta shrink-0">Article</span>
            </header>

            <div className="mx-auto max-w-[920px] overflow-hidden">
              <Image
                src={image}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                priority
                sizes="(min-width: 1024px) 920px, 100vw"
                className="h-auto w-full"
              />
            </div>

            <div className="mx-auto max-w-[720px] py-8 sm:py-10">
              <p className="tag mb-4">{category}</p>
              <h1 className="max-w-[24ch] text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.08] font-bold tracking-[-0.035em] text-ink">
                {title}
              </h1>
              <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.7] text-ink-soft">{summary}</p>

              <BlogInteractions articlePath={articlePath} title={title} />
            </div>

            <div className="mx-auto max-w-[720px] border-t border-rule py-9 sm:py-11">
              <div className="space-y-6 text-[16px] leading-[1.82] text-ink-soft [&_h2]:pt-6 [&_h2]:text-[26px] [&_h2]:leading-tight [&_h2]:font-bold [&_h2]:tracking-[-0.025em] [&_h2]:text-ink [&_p]:max-w-none [&_strong]:font-medium [&_strong]:text-ink">
                {children}
              </div>

              <div className="mt-14 border-t border-rule-strong pt-7">
                <p className="meta">Team Zephyra Dynamics</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
