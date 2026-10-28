import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Footer from '@/components/Footer';
import LoopVideo from '@/components/LoopVideo';
import FlightLabConsole from '@/components/FlightLabConsole';
import Image from 'next/image';
import { Button, Container, Heading, Figure } from '@/components/ui';

export const metadata: Metadata = pageMeta({
  title: 'FlightLab virtual twin and flight testing',
  description:
    'FlightLab is our virtual twin of Kestrel X2, built on NVIDIA Omniverse and Isaac Sim. Every flight is tested in simulation before it happens for real.',
  path: '/flightlab',
});

const steps = [
  {
    title: 'Build the virtual twin',
    body: 'A virtual Kestrel X2 that runs its real flight software, with the virtual twin in NVIDIA Omniverse and Isaac Sim adding its sensors and the city around it. LAMINAR plans the routes it flies.',
  },
  {
    title: 'Fly the scenarios',
    body: 'We set the weather, payload and centre of gravity, then fly mission presets or inject failures such as a lost motor. The same tests run with real flight hardware on the bench.',
  },
  {
    title: 'Record the evidence',
    body: 'Every run is saved with its exact configuration and result in an evidence ledger organised around India’s DGCA, with EASA and FAA references alongside.',
  },
];

export default function FlightLabPage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="bg-sky pt-[clamp(48px,8vh,96px)] pb-(--spacing-section)">
        <Container>
          <div className="rise mb-5 flex items-center gap-3">
            <Image src="/brand/flightlab-icon.png" alt="FlightLab logo" width={48} height={48} className="h-12 w-12 rounded-xl" priority />
            <p className="kicker">FlightLab · Simulation and validation</p>
          </div>
          <h1 className="font-wide rise max-w-[22ch] text-display text-balance text-carbon">Every flight is tested in simulation before Kestrel X2 leaves the ground.</h1>
          <p className="rise rise-2 mt-7 max-w-[52ch] text-lede text-slate">
            In FlightLab, Kestrel X2 faces strong winds, equipment faults and night landings long
            before it meets them in the real sky. Choose a scenario below to watch a test run.
          </p>
          <div className="rise rise-3 mt-14">
            <FlightLabConsole />
            <p className="caption mt-3">Zephyra FlightLab, redrawn for the web. Choose a test or open Missions and Evidence. Illustrative values.</p>
          </div>
        </Container>
      </section>

      {/* ---------- PROCESS ---------- */}
      <section className="border-t border-line bg-cloud py-(--spacing-section)">
        <Container>
          <Heading kicker="How it works" title="Three steps take every idea from a model to evidence we can trust." className="max-w-[820px]" />
          <ol className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-line-strong pt-6">
                <p className="tabular text-[14px] font-semibold text-kestrel">Step {i + 1}</p>
                <h3 className="font-semiwide mt-2 text-[26px] tracking-tight text-carbon">{s.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-slate">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---------- TWIN FILM ---------- */}
      <section className="bg-carbon py-(--spacing-section) text-white">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <figure>
            <div className="aspect-video overflow-hidden rounded-[18px] bg-black">
              <LoopVideo name="flightlab-twin" label="Kestrel X2 virtual twin with thrust vectors and sensor fields of view" />
            </div>
            <figcaption className="caption mt-3 !text-white/60">Kestrel X2’s virtual twin in its test bay.</figcaption>
          </figure>
          <div>
            <p className="mb-5 text-[15px] font-semibold text-[#FF6A5C]">Built with NVIDIA Omniverse and Isaac Sim</p>
            <h2 className="font-wide text-section text-balance">A virtual twin that behaves like the real aircraft.</h2>
            <p className="mt-6 max-w-[46ch] text-lede text-white/70">
              Thrust on all eight rotors, airflow, sensor fields and the city itself. Because the twin
              behaves like the real Kestrel, we can also use it to train people for flight, virtually.
            </p>
          </div>
        </Container>
      </section>

      {/* ---------- PROGRESS ---------- */}
      <section className="bg-sky py-(--spacing-section)">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Heading kicker="Progress" title="Our simulation experience grows with every test we run." />
          <div className="grid grid-cols-2 gap-6">
            <Figure value="50+" label="Simulated flights" />
            <Figure value="20+" label="Simulation hours" />
          </div>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="border-t border-line bg-cloud py-[clamp(64px,8vw,112px)]">
        <Container className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="font-wide max-w-[20ch] text-section text-balance text-carbon">Are you a research or testing partner? We would like to work with you.</p>
          <Button href="/#contact" className="w-fit">Contact the team</Button>
        </Container>
      </section>

      <Footer />
    </>
  );
}
