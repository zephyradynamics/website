import type { Metadata } from 'next';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FlightLab',
  description:
    'FlightLab is Zephyra Dynamics integrated environment for repeatable aircraft simulation, testing and engineering review.',
  alternates: { canonical: '/flightlab' },
};

const stages = [
  {
    number: '01',
    title: 'Aircraft model',
    body: 'A representative aircraft model supports controlled evaluation before physical flight testing.',
  },
  {
    number: '02',
    title: 'Scenario setup',
    body: 'Repeatable scenarios allow the team to review missions and operating conditions consistently.',
  },
  {
    number: '03',
    title: 'Review and analysis',
    body: 'Each session captures observations and outcomes for structured engineering review.',
  },
];

export default function FlightLabPage() {
  return (
    <>
      <section className="border-b border-rule bg-plate pt-12 pb-(--spacing-section) lg:pt-16">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-(--spacing-gutter) lg:grid-cols-[0.78fr_1.22fr] lg:gap-[72px]">
          <div>
            <p className="tag mb-7">FlightLab</p>
            <h1 className="max-w-[16ch] text-display text-ink">
              Validation before <span className="text-signal">first flight.</span>
            </h1>
            <p className="mt-7 max-w-[50ch] text-lede text-ink-soft">
              FlightLab gives our engineering team a controlled environment for evaluating aircraft
              behaviour, mission scenarios and operating conditions before physical flight testing.
            </p>
          </div>

          <div className="relative aspect-[16/9] overflow-hidden border border-rule-strong bg-canvas">
            <Image
              src="/image/Flight Lab (1).png"
              alt="FlightLab simulation and validation platform"
              fill
              priority
              sizes="(min-width: 1024px) 57vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-canvas py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <p className="tag mb-6">Connected validation</p>
          <h2 className="max-w-[20ch] text-section text-ink">A consistent process from setup to review.</h2>

          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-3">
            {stages.map((stage) => (
              <article key={stage.number} className="border-t border-rule-strong pt-5">
                <p className="meta text-signal">{stage.number}</p>
                <h3 className="mt-3 text-[22px] font-medium tracking-tight text-ink">{stage.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{stage.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-plate py-(--spacing-section)">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-(--spacing-gutter) lg:grid-cols-2 lg:gap-[72px]">
          <div>
            <p className="tag mb-6">Test evidence</p>
            <h2 className="max-w-[18ch] text-section text-ink">Every flight becomes structured engineering evidence.</h2>
            <p className="mt-6 max-w-[50ch] text-lede text-ink-soft">
              Each simulation records the test setup, observed behaviour and outcome in a consistent
              format. The resulting report supports engineering decisions, follow-up work and the
              careful development of reviewable evidence.
            </p>
          </div>

          <div className="border border-rule-strong bg-canvas p-7 sm:p-9">
            <p className="meta text-signal">Flight review report</p>
            <div className="mt-7 space-y-5">
              {['Test objective and setup', 'Scenario and operating conditions', 'Observed behaviour and key events', 'Review notes and follow-up actions'].map((item) => (
                <div key={item} className="flex items-center gap-4 border-b border-rule pb-4 last:border-0 last:pb-0">
                  <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-signal" />
                  <p className="text-sm text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-canvas py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <p className="tag mb-6">Progress</p>
          <h2 className="max-w-[20ch] text-section text-ink">Building experience through repeatable simulation.</h2>
          <div className="mt-10 grid max-w-[720px] grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="border-t border-rule-strong pt-5">
              <p className="text-[42px] font-bold tracking-tight text-ink">50+</p>
              <p className="meta mt-2">Simulation flights completed</p>
            </div>
            <div className="border-t border-rule-strong pt-5">
              <p className="text-[42px] font-bold tracking-tight text-ink">20+</p>
              <p className="meta mt-2">Simulation hours completed</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
