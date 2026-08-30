import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import CareerApplyModal from '@/components/CareerApplyModal';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Explore aerospace engineering internships and career opportunities at Zephyra Dynamics.',
  alternates: { canonical: '/careers' },
};

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
  { label: 'Duration', value: 'Flexible' },
  { label: 'Commitment', value: 'Part time or full time' },
];

export default function CareersPage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="border-b border-rule bg-plate py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <p className="tag mb-7">Careers</p>
          <h1 className="max-w-[17ch] text-display text-ink">
            Build what comes <span className="text-signal">next.</span>
          </h1>
          <p className="mt-7 max-w-[62ch] text-lede text-ink-soft">
            Join a multidisciplinary team working on electric aircraft, autonomous systems and the
            infrastructure needed for urban air mobility.
          </p>
        </div>
      </section>

      {/* ---------- POSITIONS ---------- */}
      <section className="border-b border-rule bg-canvas py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <p className="tag mb-6">Open positions</p>
          <h2 className="max-w-[20ch] text-section text-ink">Find your place on the team.</h2>

          <div className="mt-12 flex flex-col gap-7">
            {positions.map((position, index) => (
              <article key={position.id} className="border border-rule bg-plate p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
                  <div className="max-w-[760px]">
                    <p className="meta text-signal">Position {String(index + 1).padStart(2, '0')}</p>
                    <h3 className="mt-3 text-[28px] font-medium leading-tight tracking-tight text-ink">
                      {position.title}
                    </h3>
                    <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                      {position.description}
                    </p>
                  </div>
                  <CareerApplyModal position={position} />
                </div>

                <div className="mt-9 grid grid-cols-1 gap-8 border-t border-rule pt-8 md:grid-cols-2 md:gap-12">
                  <div>
                    <h4 className="meta text-ink">Key responsibilities</h4>
                    <ul className="mt-4 space-y-3">
                      {position.responsibilities.map((item) => (
                        <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-ink-soft">
                          <span aria-hidden="true" className="mt-[10px] h-1 w-1 shrink-0 bg-signal" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="meta text-ink">Requirements</h4>
                    <ul className="mt-4 space-y-3">
                      {position.requirements.map((item) => (
                        <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-ink-soft">
                          <span aria-hidden="true" className="mt-[10px] h-1 w-1 shrink-0 bg-signal" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WORK DETAILS ---------- */}
      <section className="bg-plate py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <p className="tag mb-6">Work details</p>
          <h2 className="max-w-[20ch] text-section text-ink">How these roles work.</h2>

          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {workDetails.map((detail) => (
              <div key={detail.label} className="border-t border-rule-strong pt-4">
                <p className="meta">{detail.label}</p>
                <p className="mt-2 text-[19px] font-medium tracking-tight text-ink">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
