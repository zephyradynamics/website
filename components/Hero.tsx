import Link from 'next/link';
import Image from 'next/image';

/**
 * Landing hero. One still, no video.
 * The previous hero.mp4 was 20 MB; this render is around 60 KB.
 */
export default function Hero() {
  return (
    <section className="border-b border-rule bg-plate">
      <div className="mx-auto max-w-[1440px] px-(--spacing-gutter) pt-20 lg:pt-[92px]">
        <p className="tag mb-7">Sustainable Air Mobility for Modern Cities in India</p>

        <h1 className="max-w-[18ch] text-display text-ink">
          Shaping the Future of{' '}
          <span className="text-signal">Urban Air Mobility</span>
        </h1>

        <div className="mt-9">
          <Link
            href="/kestrel-x2"
            className="inline-flex h-[50px] items-center bg-signal px-[30px] text-sm font-medium text-plate transition-colors hover:bg-signal-dark"
          >
            Explore Kestrel X2
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-(--spacing-gutter) pt-10 pb-(--spacing-section) lg:pt-14">
        <Image
          src="/img/kestrel-side-view.webp"
          alt="Kestrel X2, a single-seat autonomous eVTOL, shown in three-quarter view"
          width={1800}
          height={764}
          priority
          sizes="(min-width: 1440px) 1328px, 100vw"
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
