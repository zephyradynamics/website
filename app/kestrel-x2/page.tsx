import type { Metadata } from 'next';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Kestrel X2',
  description:
    'Kestrel X2 is a single-seat autonomous eVTOL: eight rotors in coaxial pairs, 35 to 40 km of range, under 65 dB at hover, engineered to ARP4754A for Indian cities.',
  alternates: { canonical: '/kestrel-x2' },
};

const callouts = [
  { label: 'MTOW', value: '292 kg', side: 'left', top: 'top-[24%]' },
  { label: 'Configuration', value: 'Multi-rotor', side: 'right', top: 'top-[24%]' },
  { label: 'Passenger capacity', value: '1', side: 'left', top: 'top-[50%]' },
  { label: 'Endurance', value: '25 minutes', side: 'right', top: 'top-[50%]' },
  { label: 'Range', value: '35 km', side: 'left', top: 'top-[76%]' },
  { label: 'Primary mode', value: 'Autonomous', side: 'right', top: 'top-[76%]' },
] as const;

const variants = [
  {
    name: 'Passenger transport',
    body: 'The standard configuration carries one passenger on short urban routes.',
  },
  {
    name: 'Emergency services',
    body: 'A planned configuration for medical support and other time sensitive response missions.',
  },
  {
    name: 'Survey and logistics',
    body: 'A planned configuration for aerial observation, inspection and light cargo transport.',
  },
];

export default function KestrelX2Page() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="border-b border-rule bg-plate">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter) pt-20 lg:pt-[92px]">
          <h1 className="max-w-[20ch] text-display text-ink">
            Engineered for one. <span className="text-signal">Perfected for all.</span>
          </h1>
        </div>

        {/* Annotated drawing. The figures are callouts on the aircraft, not a table. */}
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter) pb-(--spacing-section)">
          <div className="relative mx-auto w-full max-w-[1360px] py-10 lg:py-16">
            <Image
              src="/image/kestral_front-white.png"
              alt="Front elevation of Kestrel X2"
              width={1672}
              height={941}
              priority
              quality={90}
              sizes="(min-width: 1024px) 850px, 100vw"
              className="mx-auto h-auto w-full lg:w-[62%]"
            />

            {callouts.map((callout) => (
              <div
                key={callout.label}
                className={`absolute hidden w-[190px] lg:block ${callout.top} ${
                  callout.side === 'left' ? 'left-0 text-right' : 'right-0'
                }`}
              >
                <p className="meta">{callout.label}</p>
                <p className="mt-1 text-[18px] leading-snug font-medium tracking-tight text-ink">
                  {callout.value}
                </p>
                <span
                  aria-hidden="true"
                  className={`absolute top-3 h-px w-[54px] bg-signal ${
                    callout.side === 'left' ? '-right-[62px]' : '-left-[62px]'
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute top-[9px] h-[7px] w-[7px] rounded-full border border-signal bg-plate ${
                    callout.side === 'left' ? '-right-[66px]' : '-left-[66px]'
                  }`}
                />
              </div>
            ))}

            <p className="meta absolute bottom-2 left-1/2 hidden -translate-x-1/2 lg:block">
              Kestrel X2
            </p>
          </div>

          {/* Below 1024px the callouts stack under the drawing */}
          <div className="flex flex-col gap-5 lg:hidden">
            {callouts.map((callout) => (
              <div key={callout.label} className="border-t border-rule pt-3.5">
                <p className="meta">{callout.label}</p>
                <p className="mt-1 text-[19px] font-medium tracking-tight text-ink">{callout.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- MISSION PROFILE ---------- */}
      <section className="border-b border-rule bg-canvas py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <div className="mb-5 flex items-baseline gap-5">
            <p className="tag">Mission profile</p>
            <span aria-hidden="true" className="h-px flex-grow bg-rule" />
          </div>

          <h2 className="max-w-[22ch] text-section text-ink">Designed for a seamless journey.</h2>
          <p className="mt-4 max-w-[62ch] text-lede text-ink-soft">
            Kestrel X2 is a single seat autonomous aircraft designed for short urban journeys. It
            takes off and lands vertically, allowing it to operate without a runway.
          </p>

          <Image
            src="/img/mission-profile-gray.png"
            alt="Kestrel X2 mission profile: vertical ascent, cruise across the city skyline, descent and vertical landing"
            width={1800}
            height={1098}
            sizes="(min-width: 1024px) 1240px, 100vw"
            className="mx-auto mt-10 h-auto w-full max-w-[1240px]"
          />

        </div>
      </section>

      {/* ---------- VARIANTS ---------- */}
      <section className="bg-plate py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <p className="tag mb-6">Future variants</p>
          <h2 className="max-w-[24ch] text-section text-ink">Designed to adapt.</h2>
          <p className="mt-4 max-w-[62ch] text-lede text-ink-soft">
            Its flexible design allows the aircraft to be adapted for different operational needs.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {variants.map((variant) => (
              <div key={variant.name} className="border-t border-rule-strong pt-5">
                <p className="text-[22px] font-medium tracking-tight text-ink">{variant.name}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{variant.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
