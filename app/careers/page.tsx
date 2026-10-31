import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Footer from '@/components/Footer';
import CareerApplyModal from '@/components/CareerApplyModal';
import { Container, Heading } from '@/components/ui';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata: Metadata = pageMeta({
  title: 'Careers and aerospace internships',
  description:
    'Join Zephyra Dynamics. Remote internships in DGCA compliance, systems engineering and aircraft design, working on Kestrel X2 from the first week.',
  path: '/careers',
});

const positions = [
  {
    id: 1,
    title: 'DGCA & Compliance Intern',
    description:
      'Support regulatory research, certification strategy and compliance documentation aligned with aviation authorities.',
    responsibilities: [
      'Assist in understanding DGCA regulations and certification frameworks',
      'Support documentation for compliance and airworthiness',
      'Research global eVTOL certification standards including FAA and EASA',
      'Work with systems and design teams to support regulatory alignment',
    ],
    requirements: [
      'Background in aerospace, aviation or a related field',
      'Strong interest in aviation regulations and certification',
      'Attention to detail and structured documentation skills',
      'Ability to conduct independent research',
    ],
  },
  {
    id: 2,
    title: 'Systems Engineering Intern',
    description:
      'Support the systems-level design and integration of eVTOL aircraft, including architecture development and system analysis.',
    responsibilities: [
      'Assist in system architecture and requirement definition',
      'Support system modelling, analysis and trade studies',
      'Work on propulsion, control and avionics integration',
      'Contribute to technical documentation and reports',
    ],
    requirements: [
      'Aerospace or mechanical engineering background',
      'Understanding of systems engineering principles',
      'Familiarity with MATLAB, Simulink or similar tools is useful',
      'Strong analytical and problem-solving skills',
    ],
  },
  {
    id: 3,
    title: 'Design Intern',
    description:
      'Contribute to the conceptual and detailed design of aircraft components and structures for our eVTOL platforms.',
    responsibilities: [
      'Create and refine CAD models of aircraft components',
      'Support aerodynamic and structural design tasks',
      'Develop design iterations based on performance requirements',
      'Collaborate with systems and engineering teams',
    ],
    requirements: [
      'Experience with CAD tools, preferably SolidWorks',
      'Basic understanding of aerospace design principles',
      'Creativity and strong attention to detail',
      'Ability to translate concepts into practical designs',
    ],
  },
];

const workDetails = [
  { label: 'Location', value: 'Remote' },
  { label: 'Position type', value: 'Internship' },
];

function Bullets({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="label-mono text-slate">{title}</h4>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-slate">
            <span aria-hidden="true" className="mt-[11px] h-0.5 w-3 shrink-0 bg-kestrel" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CareersPage() {
  return (
    <>
      <BreadcrumbSchema name="Careers" path="/careers" />
      <section className="bg-sky pt-[clamp(48px,8vh,96px)] pb-(--spacing-section)">
        <Container>
          <p className="kicker rise mb-4">Careers</p>
          <h1 className="font-wide rise max-w-[22ch] text-display text-balance text-carbon">
            Help us build a new kind of aircraft for India.
          </h1>
          <p className="rise rise-2 mt-7 max-w-[60ch] text-lede text-slate">
            We are a team of engineers in Bengaluru working on electric aircraft, autonomy, airspace
            software and simulation. Our internships put you on real work from the first week.
          </p>
        </Container>
      </section>

      <section className="bg-cloud py-(--spacing-section)">
        <Container>
          <Heading kicker="Open positions" title="Internships open now." />

          <div className="mt-12 flex flex-col gap-6">
            {positions.map((position) => (
              <article key={position.id} className="rounded-[18px] bg-sky p-6 ring-1 ring-line sm:p-8 lg:p-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
                  <div className="max-w-[720px]">
                    <h3 className="font-semiwide text-[26px] text-carbon">{position.title}</h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-slate">{position.description}</p>
                  </div>
                  <CareerApplyModal position={position} />
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 border-t border-line pt-8 md:grid-cols-2 md:gap-12">
                  <Bullets title="What you will do" items={position.responsibilities} />
                  <Bullets title="What we look for" items={position.requirements} />
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sky py-(--spacing-section)">
        <Container>
          <Heading kicker="How internships work" title="Our internships are remote, so you can work with us from anywhere." />
          <dl className="mt-10 grid max-w-[720px] grid-cols-1 gap-7 sm:grid-cols-2">
            {workDetails.map((detail) => (
              <div key={detail.label} className="border-t border-line-strong pt-4">
                <dt className="label-mono text-slate">{detail.label}</dt>
                <dd className="font-semiwide mt-3 text-[24px] text-carbon">{detail.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Footer />
    </>
  );
}
