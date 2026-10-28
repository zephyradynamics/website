import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Footer from '@/components/Footer';
import LoopVideo from '@/components/LoopVideo';
import LaminarConsole from '@/components/LaminarConsole';
import Image from 'next/image';
import { Button, Container, Heading } from '@/components/ui';

export const metadata: Metadata = pageMeta({
  title: 'LAMINAR urban air traffic management',
  description:
    'LAMINAR plans every corridor over the city, keeps aircraft safely apart and schedules every rooftop landing pad in real time. Accelerated on NVIDIA GPUs.',
  path: '/laminar',
});

const capabilities = [
  {
    title: 'Plan every corridor',
    body: 'Routes are drawn as three-dimensional corridors between vertiports, clear of buildings and restricted airspace, before an aircraft leaves the pad.',
  },
  {
    title: 'Keep every aircraft apart',
    body: 'Each aircraft flies inside a separation bubble. LAMINAR looks ahead for conflicts and resolves them before they reach the aircraft.',
  },
  {
    title: 'Run every vertiport',
    body: 'Departure and landing slots are scheduled across the network, so an aircraft never arrives at a pad that is not ready for it.',
  },
  {
    title: 'Test the whole city',
    body: 'Fleets are simulated on NVIDIA GPUs, so every what-if, from a storm cell to a closed pad, is tested before it happens.',
  },
];

export default function LaminarPage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="bg-sky pt-[clamp(48px,8vh,96px)] pb-(--spacing-section)">
        <Container>
          <div className="rise mb-5 flex items-center gap-3">
            <Image src="/brand/laminar-logo.png" alt="LAMINAR logo" width={56} height={56} className="h-14 w-14" priority />
            <p className="kicker">LAMINAR · Urban air traffic management</p>
          </div>
          <h1 className="font-wide rise max-w-[22ch] text-display text-balance text-carbon">Every aircraft over the city follows a safe, planned route.</h1>
          <p className="rise rise-2 mt-7 max-w-[52ch] text-lede text-slate">
            LAMINAR is our urban air traffic management platform. It plans each route through
            the city sky, keeps every aircraft safely apart and coordinates every landing pad, in real time.
          </p>
          <div className="rise rise-3 mt-14">
            <LaminarConsole />
            <p className="caption mt-3">Drag the map, switch to satellite or toggle layers. Map: OpenStreetMap via OpenFreeMap; satellite: Sentinel-2 cloudless by EOX. Traffic and airspace are illustrative.</p>
          </div>
        </Container>
      </section>

      {/* ---------- CAPABILITIES ---------- */}
      <section className="border-t border-line bg-cloud py-(--spacing-section)">
        <Container>
          <Heading
            kicker="What it does"
            title="Everything a city needs to run many flights at the same time."
            className="max-w-[820px]"
          />
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c.title} className="border-t border-line-strong pt-6">
                <h3 className="font-semiwide text-[24px] tracking-tight text-carbon">{c.title}</h3>
                <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-slate">{c.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- FLEET FILM ---------- */}
      <section className="relative isolate h-[min(84svh,860px)] min-h-[480px] overflow-hidden">
        <LoopVideo name="laminar-fleet" label="A fleet of Kestrel X2 aircraft crossing Bengaluru in daylight on separate LAMINAR corridors" className="absolute inset-0 -z-10" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-sky/85 to-transparent" />
        <Container className="pt-[clamp(40px,8vh,96px)]">
          <p className="font-wide max-w-[24ch] text-section text-balance text-carbon">One aircraft is a single journey. A network of them can change how a whole city moves.</p>
        </Container>
      </section>

      {/* ---------- NVIDIA ---------- */}
      <section className="bg-sky py-(--spacing-section)">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Heading
              kicker="Accelerated on NVIDIA GPUs"
              title="We test every situation we can imagine before it happens in the real sky."
              lede="LAMINAR simulates whole fleets at city scale on NVIDIA GPUs. Corridors are planned, separation is checked and vertiport schedules are stress-tested long before a single aircraft is in the air."
            />
            <p className="mt-8 text-[14px] text-slate">Zephyra Dynamics is a member of NVIDIA Inception.</p>
          </div>
          <figure>
            <div className="aspect-video overflow-hidden rounded-[18px] bg-haze">
              <LoopVideo name="laminar-corridors" label="Many LAMINAR corridors and aircraft simulated together over Bengaluru" />
            </div>
            <figcaption className="caption mt-3">City-scale LAMINAR simulation over Bengaluru.</figcaption>
          </figure>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="border-t border-line bg-cloud py-[clamp(64px,8vw,112px)]">
        <Container className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="font-wide max-w-[26ch] text-section text-balance text-carbon">Planning landing pads or city airspace? We would like to work with you.</p>
          <Button href="/#contact" className="w-fit">Contact the team</Button>
        </Container>
      </section>

      <Footer />
    </>
  );
}
