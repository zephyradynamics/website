import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import LoopVideo from '@/components/LoopVideo';
import LaminarConsole from '@/components/LaminarConsole';
import { Button, Container, Heading, Figure } from '@/components/ui';

const newsroom = [
  {
    image: '/img/news-nvidia.webp',
    title: 'Zephyra Dynamics joins the NVIDIA Inception program',
    source: 'LinkedIn',
    href: 'https://www.linkedin.com/posts/zephyradynamics_zephyradynamics-kestrelx2-evtol-activity-7431284149686067200-RzlU',
  },
  {
    image: '/img/news-dassault.webp',
    title: 'Zephyra Dynamics and Dassault Systèmes',
    source: 'LinkedIn',
    href: 'https://www.linkedin.com/company/zephyradynamics/',
  },
];

const system = [
  {
    name: 'Kestrel X2',
    role: 'The aircraft',
    body: 'A single-seat, fully autonomous electric aircraft. It takes off and lands vertically from a rooftop pad, so a city needs no runway to use it.',
    href: '/kestrel-x2',
    cta: 'Explore Kestrel X2',
    logo: '/brand/kestrel-icon.png',
  },
  {
    name: 'LAMINAR',
    role: 'The airspace',
    body: 'Urban air traffic management that plans every corridor, keeps every aircraft safely apart and runs every vertiport slot, in real time.',
    href: '/laminar',
    cta: 'See LAMINAR',
    logo: '/brand/laminar-logo.png',
  },
  {
    name: 'FlightLab',
    role: 'The proof',
    body: 'A virtual twin of Kestrel X2 with software and hardware in the loop. Every scenario is flown in simulation before it is flown for real.',
    href: '/flightlab',
    cta: 'Inside FlightLab',
    logo: '/brand/flightlab-icon.png',
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* ---------- BUILDING WITH ---------- */}
      <section aria-label="Building with" className="border-b border-line bg-cloud">
        <Container className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:gap-14">
          <p className="label-mono text-slate">Building with</p>
          <ul className="flex flex-wrap items-center gap-x-12 gap-y-5">
            {/* partner marks are used unaltered, at their own colours, with clear space around them */}
            <li className="flex items-center gap-4">
              <img src="/brand/nvidia-logo.svg" alt="NVIDIA" width={3027} height={1066} className="h-11 w-auto" />
              <span className="border-l border-line-strong pl-4 text-[14px] leading-tight text-slate">Member of<br />NVIDIA Inception</span>
            </li>
            <li className="flex items-center">
              <img src="/brand/dassault-systemes.svg" alt="Dassault Systèmes" width={108} height={33} className="h-11 w-auto" />
            </li>
          </ul>
        </Container>
      </section>

      {/* ---------- WHY ---------- */}
      <section className="bg-sky py-(--spacing-section)">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className="kicker mb-5">Why we exist</p>
            <p className="font-wide text-section text-balance text-carbon">
              Bengaluru writes software for the world, and still waits in its own traffic.
            </p>
            <p className="mt-7 max-w-[50ch] text-lede text-slate">
              The ground is full. The sky above Indian cities is almost empty. We are building
              the aircraft and the systems that let people use it, safely, from the start.
            </p>
          </div>
          <figure>
            <div className="aspect-[4/3] overflow-hidden rounded-[18px] bg-haze">
              <LoopVideo name="city-gridlock" label="Aerial view of gridlocked traffic at a Bengaluru junction" />
            </div>
            <figcaption className="caption mt-3">Silk Board junction, Bengaluru, at rush hour.</figcaption>
          </figure>
        </Container>
      </section>

      {/* ---------- THE SYSTEM ---------- */}
      <section className="border-t border-line bg-cloud py-(--spacing-section)">
        <Container>
          <Heading
            kicker="One system"
            title="We build the aircraft, the airspace it flies in, and the testing that proves it is safe."
            lede="Flying over a city only works when all three exist together. Building them in one company means each part is designed to work with the other two from day one."
            className="max-w-[900px]"
          />

          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[22px] bg-line ring-1 ring-line lg:grid-cols-3">
            {system.map((item) => (
              <Link key={item.name} href={item.href} className="group flex flex-col bg-cloud p-8 transition-colors hover:bg-sky sm:p-10">
                {/* fixed-height header row: the three titles line up across the cards */}
                <div className="flex h-10 items-center justify-between">
                  <p className="text-[14px] text-slate">{item.role}</p>
                  {'logo' in item && item.logo && (
                    <Image src={item.logo} alt="" width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />
                  )}
                </div>
                <h3 className="font-wide mt-2 text-[clamp(1.75rem,2.6vw,2.4rem)] leading-none tracking-[-0.03em] text-carbon">
                  {item.name}
                </h3>
                <p className="mt-6 text-[16px] leading-relaxed text-slate">{item.body}</p>
                <span className="mt-auto pt-10 text-[15px] font-semibold text-kestrel underline-offset-4 group-hover:underline">
                  {item.cta}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- KESTREL ---------- */}
      <section className="overflow-hidden bg-sky pt-(--spacing-section)">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading
              kicker="Kestrel X2"
              title="A single-seat electric aircraft that flies itself, from one rooftop to another."
              lede="Kestrel X2 carries one passenger across the city on eight electric rotors, with no pilot on board. It is small enough to land on a rooftop pad and has backup systems built in from the start."
            />
            <Button href="/kestrel-x2" variant="secondary" className="w-fit">Explore the aircraft</Button>
          </div>
        </Container>
        <div className="relative mx-auto mt-6 max-w-[1600px]">
          <Image
            src="/kestrel/kestrel-wide.webp"
            alt="Kestrel X2 in a white studio, three-quarter front view"
            width={2880}
            height={1200}
            sizes="(min-width: 1600px) 1600px, 100vw"
            className="h-auto w-full"
          />
        </div>
        <Container className="pb-(--spacing-section)">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            <Figure value="45" unit="km" label="Range" />
            <Figure value="135" unit="km/h" label="Cruise speed" />
            <Figure value="8" label="Rotors in four coaxial pairs" />
            <Figure value="1" label="Seat, fully autonomous" />
          </div>
        </Container>
      </section>

      {/* ---------- FULL BLEED FLIGHT ---------- */}
      <section className="relative isolate h-[min(80svh,820px)] min-h-[480px] overflow-hidden">
        <LoopVideo name="city-cruise" label="Kestrel X2 lifting off a rooftop vertiport and climbing over Bengaluru" className="absolute inset-0 -z-10" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-sky/85 to-transparent" />
        <Container className="pt-[clamp(40px,8vh,96px)]">
          <p className="font-wide max-w-[24ch] text-section text-balance text-carbon">
            Your journey starts on a rooftop and passes over the traffic, not through it.
          </p>
        </Container>
      </section>

      {/* ---------- LAMINAR ---------- */}
      <section className="bg-cloud py-(--spacing-section)">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading
              kicker="LAMINAR"
              title="Many aircraft, one city sky, and a system that keeps every flight safe."
              lede="LAMINAR plans the route for every aircraft, keeps each one at a safe distance from the others and reserves every landing pad before take-off, all in real time."
            />
            <Button href="/laminar" variant="secondary" className="w-fit">See LAMINAR</Button>
          </div>
          <div className="mt-14">
            <LaminarConsole />
            <p className="caption mt-3">LAMINAR operator view on a real map of Bengaluru. Traffic and airspace are illustrative.</p>
          </div>
        </Container>
      </section>

      {/* ---------- NVIDIA ---------- */}
      <section className="border-t border-line bg-sky py-(--spacing-section)">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <figure className="order-2 lg:order-1">
            <div className="aspect-video overflow-hidden rounded-[18px] bg-carbon">
              <LoopVideo name="flightlab-twin" label="Kestrel X2 virtual twin with thrust vectors and sensor fields in a virtual test bay" />
            </div>
            <figcaption className="caption mt-3">Kestrel X2 virtual twin: flight physics, sensors and environment.</figcaption>
          </figure>
          <div className="order-1 lg:order-2">
            <Heading
              kicker="Member of NVIDIA Inception"
              title="Before Kestrel X2 flies over a city, it flies here first, as a virtual twin."
              lede="We built a virtual twin of Kestrel X2 in NVIDIA Omniverse and Isaac Sim that behaves like the real aircraft. Routes, sudden gusts and equipment faults are all tested there first, and LAMINAR runs on NVIDIA GPUs to test whole fleets at once."
            />
            <Button href="/flightlab" className="mt-9">Inside FlightLab</Button>
          </div>
        </Container>
      </section>

      {/* ---------- NEWSROOM ---------- */}
      <section className="border-t border-line bg-cloud py-(--spacing-section)">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading kicker="Newsroom" title="News and announcements from Zephyra Dynamics." />
            <Button href="https://www.linkedin.com/company/zephyradynamics/" variant="quiet">Follow on LinkedIn</Button>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {newsroom.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-[18px] bg-sky ring-1 ring-line transition-shadow hover:shadow-[0_20px_50px_-25px_rgba(21,25,29,0.35)]"
              >
                <Image src={item.image} alt="" width={1000} height={522} sizes="(min-width: 768px) 45vw, 100vw" className="h-auto w-full" />
                <div className="p-6">
                  <p className="text-[13px] text-slate">{item.source}</p>
                  <p className="font-semiwide mt-1.5 text-[20px] leading-snug tracking-tight text-carbon group-hover:text-kestrel">{item.title}</p>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- CAREERS ---------- */}
      <section className="bg-carbon py-[clamp(64px,8vw,112px)] text-white">
        <Container className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-wide max-w-[24ch] text-section text-balance">Help us build a new kind of aircraft for India.</p>
            <p className="mt-5 max-w-[52ch] text-lede text-white/70">
              We are looking for engineers in systems, design and certification. You will join a small team working on hard problems and real hardware.
            </p>
          </div>
          <Button href="/careers" className="w-fit">See open roles</Button>
        </Container>
      </section>

      <ContactForm />
      <Footer />
    </>
  );
}
