import type { Metadata } from 'next';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'LAMINAR',
  description:
    'LAMINAR is an urban air traffic management platform for monitoring aircraft, planning routes and coordinating vertiport operations.',
  alternates: { canonical: '/laminar' },
};

const capabilities = [
  {
    title: 'Live airspace view',
    description: 'See aircraft, routes, traffic status and operational information in one place.',
  },
  {
    title: 'Traffic coordination',
    description: 'Plan movements and identify potential conflicts before they affect a flight.',
  },
  {
    title: 'Connected operations',
    description: 'Coordinate aircraft, vertiports and operators through a shared digital platform.',
  },
];

export default function LaminarPage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="border-b border-rule bg-plate">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter) pt-20 lg:pt-[92px]">
          <p className="tag mb-7">Urban air traffic management</p>
          <h1 className="max-w-[19ch] text-display text-ink">
            One clear view of the <span className="text-signal">urban sky.</span>
          </h1>
        </div>

        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter) pt-10 pb-(--spacing-section) lg:pt-14">
          <div className="border border-rule-strong bg-canvas p-2.5">
            <Image
              src="/image/laminar_hero.png"
              alt="LAMINAR airspace management dashboard showing live aircraft activity"
              width={1919}
              height={1079}
              priority
              quality={90}
              sizes="(min-width: 1440px) 1328px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <p className="meta mt-4 text-center">LAMINAR</p>
        </div>
      </section>

      {/* ---------- CAPABILITIES ---------- */}
      <section className="border-b border-rule bg-canvas py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <p className="tag mb-6">Platform</p>
          <h2 className="max-w-[22ch] text-section text-ink">Built for everyday airspace operations.</h2>
          <p className="mt-5 max-w-[62ch] text-lede text-ink-soft">
            LAMINAR gives operators the information they need to understand activity and coordinate
            each movement safely.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {capabilities.map((capability, index) => (
              <div key={capability.title} className="border-t border-rule-strong pt-5">
                <p className="meta text-signal">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 text-[22px] font-medium tracking-tight text-ink">
                  {capability.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- VERTIPORTS ---------- */}
      <section className="bg-plate py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:gap-[72px]">
            <div className="border border-rule-strong bg-canvas p-2.5">
              <Image
                src="/image/laminar_vertiport_view.png"
                alt="LAMINAR vertiport operations view"
                width={1919}
                height={1079}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="h-auto w-full"
              />
            </div>

            <div>
              <p className="tag mb-6">Vertiport view</p>
              <h2 className="max-w-[18ch] text-section text-ink">Plan each vertiport in context.</h2>
              <p className="mt-6 max-w-[46ch] text-lede text-ink-soft">
                LAMINAR places vertiports alongside routes and surrounding airspace, giving
                operators a clear view for planning arrivals and departures.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
