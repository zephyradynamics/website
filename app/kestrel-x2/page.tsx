import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Image from 'next/image';
import Footer from '@/components/Footer';
import LoopVideo from '@/components/LoopVideo';
import { Button, Container, Heading, Figure } from '@/components/ui';

export const metadata: Metadata = pageMeta({
  title: 'Kestrel X2, a single-seat autonomous eVTOL',
  description:
    'Kestrel X2 is a single-seat, fully autonomous electric eVTOL for Indian cities: eight rotors in four coaxial pairs, 45 km range and 135 km/h cruise.',
  path: '/kestrel-x2',
});

const callouts = [
  { label: 'Rear-hinged canopy', x: '44%', y: '30%', side: 'left' },
  { label: 'LED signature line', x: '55.5%', y: '50%', side: 'right' },
  { label: 'Coaxial rotor pair', x: '29%', y: '42%', side: 'left' },
  { label: 'Skid landing gear', x: '59%', y: '70%', side: 'right' },
] as const;

const engineered = [
  {
    video: 'engineered-reveal',
    title: 'Light, stiff, simple',
    body: 'A smooth carbon composite body, shaped for low drag and built to be as light and stiff as it can be, with its weight carried low for stability.',
    label: 'The red Kestrel X2 body turns to frosted blue glass, with the cabin seat softly visible inside',
  },
  {
    video: 'propulsion',
    title: 'Distributed electric propulsion',
    body: 'Eight motors on four folding arms. Each coaxial pair can carry the load if its partner stops, and thrust is redistributed automatically.',
    label: 'Kestrel X2 under a frosted blue skin, turning in the studio with all eight rotors spinning',
  },
  {
    video: 'kestrel-canopy',
    title: 'A cabin for one',
    body: 'No controls to learn. Choose a destination, sit back, and watch the city pass beneath a wide canopy.',
    label: 'A close look at the Kestrel X2 nose and its wide tinted canopy',
  },
  {
    video: 'redundancy',
    title: 'Redundant by design',
    body: 'Dual flight computers, layered sensing and protection built in layer by layer. Proven first in the FlightLab virtual twin.',
    label: 'The dual flight computers, seen softly through the frosted Kestrel X2 skin',
  },
];

const routes = [
  { from: 'Whitefield', to: 'Outer Ring Road tech park', km: 15 },
  { from: 'HSR Layout', to: 'Electronic City', km: 12 },
  { from: 'Central Bengaluru', to: 'Kempegowda International Airport', km: 33 },
];

export default function KestrelX2Page() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="overflow-hidden bg-sky pt-[clamp(48px,8vh,96px)]">
        <Container>
          <p className="kicker rise mb-4">Single-seat autonomous eVTOL</p>
          <h1 className="font-wide caps rise text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.88] tracking-[-0.055em] text-carbon">Kestrel X2</h1>
          <p className="rise rise-2 mt-6 max-w-[44ch] text-lede text-slate">
            A fully autonomous, all-electric aircraft designed from the ground up to carry one person across an Indian city, from one rooftop to another.
          </p>
        </Container>
        <div className="relative mx-auto mt-4 max-w-[1700px]">
          <Image
            src="/kestrel/kestrel-hero.webp"
            alt="Kestrel X2, three-quarter front view in a white studio"
            width={2400}
            height={1350}
            priority
            sizes="(min-width: 1700px) 1700px, 100vw"
            className="h-auto w-full"
          />
        </div>
        <Container className="pb-(--spacing-section)">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            <Figure value="45" unit="km" label="Range" />
            <Figure value="135" unit="km/h" label="Cruise speed" />
            <Figure value="8" label="Rotors in four coaxial pairs" />
            <Figure value="1" label="Seat, no pilot required" />
          </div>
        </Container>
      </section>

      {/* ---------- ANATOMY (studio film) ---------- */}
      {/* tablet and up: dark type top left on a soft wash over the film; phones: the line sits above it,
          because the band is too short to hold both without covering the aircraft */}
      <section className="relative isolate overflow-hidden bg-cloud">
        <Container className="relative pt-12 pb-6 md:absolute md:inset-x-0 md:top-0 md:z-10 md:pt-[clamp(40px,8vh,96px)] md:pb-0">
          <p className="font-wide max-w-[22ch] text-section text-balance text-carbon">
            Every part of Kestrel X2 is designed for flying over a city.
          </p>
        </Container>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-1/2 bg-gradient-to-b from-cloud/90 to-transparent md:block" />
        <div className="aspect-[16/9] w-full lg:aspect-[21/9]">
          <LoopVideo name="kestrel-studio" label="Kestrel X2 hovering in a bright studio with rotors spinning" />
        </div>
      </section>

      {/* ---------- FRONT DRAWING ---------- */}
      <section className="bg-cloud py-(--spacing-section)">
        <Container>
          <Heading
            kicker="Design"
            title="Small enough to take off and land on a city rooftop."
            lede="The cabin is shaped around a single passenger. Four arms hold the eight rotors well away from the body, and simple skids let it settle on any flat landing pad."
            className="max-w-[860px]"
          />
          <div className="relative mt-14">
            <Image
              src="/kestrel/kestrel-front.webp"
              alt="Kestrel X2 front elevation"
              width={2400}
              height={1350}
              sizes="(min-width: 1440px) 1328px, 100vw"
              className="h-auto w-full rounded-[22px] bg-sky"
            />
            {callouts.map((c) => (
              <div
                key={c.label}
                className="absolute hidden md:flex md:items-center md:gap-2"
                style={{ left: c.x, top: c.y, transform: c.side === 'left' ? 'translate(calc(-100% + 5px), -50%)' : 'translate(-5px, -50%)', flexDirection: c.side === 'left' ? 'row-reverse' : 'row' }}
              >
                <span className="h-2.5 w-2.5 rounded-full border-2 border-kestrel bg-cloud" aria-hidden="true" />
                <span className="h-px w-10 bg-kestrel" aria-hidden="true" />
                <span className="rounded-full bg-cloud px-3 py-1 text-[13px] font-semibold text-carbon shadow-sm ring-1 ring-line">{c.label}</span>
              </div>
            ))}
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-3 text-[14px] text-slate md:hidden">
            {callouts.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-kestrel" aria-hidden="true" />
                {c.label}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------- ON THE PAD ---------- */}
      <section className="relative isolate overflow-hidden bg-haze">
        <Image
          src="/kestrel/kestrel-rooftop-dawn.webp"
          alt="Kestrel X2 parked on a rooftop vertiport in Whitefield, Bengaluru, at first light"
          width={2880}
          height={1200}
          sizes="100vw"
          // Kestrel sits right of centre; on narrow crops keep it in frame
          className="h-[min(78svh,760px)] min-h-[420px] w-full object-cover object-[74%_50%] md:object-center"
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-sky/85 to-transparent" />
        <Container className="absolute inset-x-0 top-0 pt-[clamp(40px,8vh,96px)]">
          <p className="font-wide max-w-[24ch] text-section text-balance text-carbon">
            A rooftop pad is all Kestrel X2 needs to start a journey.
          </p>
        </Container>
      </section>

      {/* ---------- ENGINEERED ---------- */}
      <section className="border-t border-line bg-sky py-(--spacing-section)">
        <Container>
          <Heading
            kicker="Engineered"
            title="Built simply wherever possible, with backups wherever safety depends on it."
            className="max-w-[900px]"
          />
          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
            {engineered.map((item) => (
              <article key={item.title}>
                <div className="aspect-video overflow-hidden rounded-[18px] bg-carbon">
                  <LoopVideo name={item.video} label={item.label} />
                </div>
                <h3 className="font-semiwide mt-6 text-[24px] tracking-tight text-carbon">{item.title}</h3>
                <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-slate">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- A DAY IN THE SKY ---------- */}
      <section className="bg-carbon py-(--spacing-section) text-white">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="mb-5 text-[15px] font-semibold text-[#FF6A5C]">A day in the sky</p>
            <h2 className="font-wide text-section text-balance">Everyday journeys across Bengaluru, from one rooftop to another.</h2>
            <p className="mt-6 max-w-[48ch] text-lede text-white/70">
              These are real Bengaluru routes we fly in simulation, from the morning commute to the last flight home at night. Every one of them is well within Kestrel X2&apos;s range.
            </p>
            <ul className="mt-10 divide-y divide-white/15 border-y border-white/15">
              {routes.map((r) => (
                <li key={r.from} className="flex items-baseline justify-between gap-6 py-4">
                  <span className="text-[16px]">
                    {r.from} <span className="text-white/50">to</span> {r.to}
                  </span>
                  <span className="font-semiwide tabular shrink-0 text-[18px]">~{r.km} <span className="normal-case">km</span></span>
                </li>
              ))}
            </ul>
          </div>
          <figure>
            <div className="aspect-video overflow-hidden rounded-[18px] bg-black">
              <LoopVideo name="day-montage" label="One Kestrel X2 through a day in Bengaluru: dawn on the rooftop, a daytime cruise, an afternoon landing and a night flight home" />
            </div>
            <figcaption className="caption mt-3 !text-white/60">Dawn to night over Bengaluru.</figcaption>
          </figure>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-cloud py-[clamp(64px,8vw,112px)]">
        <Container className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="font-wide max-w-[24ch] text-section text-balance text-carbon">Are you an operator, a city or an investor? We would like to hear from you.</p>
          <Button href="/#contact" className="w-fit">Register interest</Button>
        </Container>
      </section>

      <Footer />
    </>
  );
}
