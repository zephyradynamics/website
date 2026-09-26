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

const family = [
  {
    name: 'Kestrel X2',
    status: 'Personal urban mobility',
    description:
      'A single-seat electric aircraft created for direct journeys across busy cities. Vertical takeoff and landing allow it to operate from compact urban locations without a runway.',
    image: '/image/kestral_front-white.png',
  },
  {
    name: 'Kestrel Air Ambulance',
    status: 'Emergency medical transport',
    description:
      'A medical transport configuration designed to support faster movement during time-sensitive situations, particularly where road access is slow or limited.',
    image: '/image/kESTREL Air Ambulance.png',
  },
  {
    name: 'Kestrel Defence Aircraft',
    status: 'Specialised mission support',
    description:
      'A mission-focused configuration designed for observation, logistics and operations that benefit from rapid access and a compact operating footprint.',
    image: '/image/kESTREL Defence.png',
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
          <div className="relative mx-auto h-[430px] w-full max-w-[1360px] sm:h-[520px] lg:h-auto lg:py-16">
            <Image
              src="/image/kestral_front-white.png"
              alt="Front elevation of Kestrel X2"
              width={1672}
              height={941}
              priority
              sizes="(min-width: 1024px) 850px, 100vw"
              className="absolute top-1/2 left-1/2 h-auto w-[46%] -translate-x-1/2 -translate-y-1/2 sm:w-[50%] lg:static lg:mx-auto lg:w-[62%] lg:translate-x-0 lg:translate-y-0"
            />

            {callouts.map((callout) => (
              <div
                key={callout.label}
                className={`absolute block w-[25%] sm:w-[170px] lg:w-[190px] ${callout.top} ${
                  callout.side === 'left' ? 'left-0 text-right' : 'right-0'
                }`}
              >
                <p className="meta text-[9px] leading-tight sm:text-[11px] lg:text-[12px]">{callout.label}</p>
                <p className="mt-1 text-[13px] leading-snug font-medium tracking-tight text-ink sm:text-[15px] lg:text-[18px]">
                  {callout.value}
                </p>
                <span
                  aria-hidden="true"
                  className={`absolute top-3 hidden h-px w-[54px] bg-signal lg:block ${
                    callout.side === 'left' ? '-right-[62px]' : '-left-[62px]'
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute top-[9px] hidden h-[7px] w-[7px] rounded-full border border-signal bg-plate lg:block ${
                    callout.side === 'left' ? '-right-[66px]' : '-left-[66px]'
                  }`}
                />
              </div>
            ))}

            <p className="meta absolute bottom-2 left-1/2 -translate-x-1/2">
              Kestrel X2
            </p>
          </div>
        </div>
      </section>

      {/* ---------- KESTREL FAMILY ---------- */}
      <section className="bg-canvas py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <p className="tag mb-6">The Kestrel family</p>
          <h2 className="max-w-[24ch] text-section text-ink">One platform. More missions ahead.</h2>
          <p className="mt-4 max-w-[62ch] text-lede text-ink-soft">
            Kestrel X2 establishes the foundation of the Kestrel aircraft family. Additional
            configurations are being developed around the platform for future mission requirements.
          </p>

          <div className="mt-12 space-y-8">
            {family.map((aircraft, index) => (
              <article
                key={aircraft.name}
                className="grid grid-cols-1 overflow-hidden rounded-[28px] border border-rule bg-plate lg:grid-cols-2"
              >
                <div
                  className={`relative min-h-[300px] bg-white sm:min-h-[390px] ${
                    index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Image
                    src={aircraft.image}
                    alt={`${aircraft.name} aircraft`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain p-4 sm:p-7"
                  />
                </div>
                <div
                  className={`flex flex-col justify-center border-t border-rule p-8 sm:p-12 lg:border-t-0 ${
                    index % 2 === 1
                      ? 'lg:order-2 lg:border-l'
                      : 'lg:order-1 lg:border-r'
                  }`}
                >
                  <p className="tag mb-5">{aircraft.status}</p>
                  <h3 className="text-[32px] leading-tight font-medium tracking-tight text-ink sm:text-[38px]">
                    {aircraft.name}
                  </h3>
                  <p className="mt-5 max-w-[48ch] text-lede text-ink-soft">{aircraft.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
