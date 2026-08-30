import type { Metadata } from 'next';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Zephyra Dynamics, our mission, our approach to aerospace engineering and the people guiding our work.',
  alternates: { canonical: '/about' },
};

const team = [
  {
    name: 'Sadiq Ali Mir',
    role: 'Founder & Chief Executive Officer',
    image: '/sadiq-ali-mir-white.png',
    linkedIn: 'https://www.linkedin.com/in/sadiqalimir/',
  },
  {
    name: 'Dr. Promio Charles F',
    role: 'Mentor & Senior Aerospace Advisor',
    image: '/promio.png',
    linkedIn: 'https://www.linkedin.com/in/dr-promio-charles-194a6b32/',
  },
  {
    name: 'Dr. Ravindra S Kulkarni',
    role: 'Mentor & Technical Advisor',
    image: '/ravindra.png',
    linkedIn: 'https://www.linkedin.com/in/dr-ravindra-s-kulkarni-90181ab0/',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ---------- ORIGIN ---------- */}
      <section className="border-b border-rule bg-plate py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-[72px]">
            <div className="lg:order-2">
              <p className="tag mb-6">Origin</p>
              <h1 className="max-w-[18ch] text-display text-ink">Built in India, under one roof.</h1>
              <p className="mt-6 max-w-[46ch] text-lede text-ink-soft">
                Our aircraft are designed, built and tested at our facility in India, keeping
                engineering and hands-on development closely connected.
              </p>
            </div>

            <div className="lg:order-1">
              <Image
                src="/image/kestral_front-white.png"
                alt="Front view of the Kestrel X2 aircraft"
                width={1672}
                height={941}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- VISION ---------- */}
      <section className="border-b border-rule bg-canvas py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <p className="tag mb-6">Our vision</p>
          <h2 className="max-w-[20ch] text-section text-ink">A better way to move through growing cities.</h2>
          <p className="mt-6 max-w-[70ch] text-lede text-ink-soft">
            The ground is full. The sky is not. India&apos;s urban air mobility ecosystem is nascent,
            which means it can be built correctly from the start. We are building the machine that
            carries a single person safely, silently, and swiftly above it all.
          </p>
        </div>
      </section>

      {/* ---------- MISSION ---------- */}
      <section className="border-b border-rule bg-plate py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <p className="tag mb-6">Our mission</p>
          <h2 className="max-w-[22ch] text-section text-ink">Build the aircraft and the system around it.</h2>
          <p className="mt-6 max-w-[70ch] text-lede text-ink-soft">
            Our mission is to develop safe autonomous electric aircraft and the systems required to
            operate them. We apply rigorous engineering and a clear path to certification to make
            urban air mobility practical for modern cities.
          </p>
        </div>
      </section>

      {/* ---------- COMPANY ---------- */}
      <section className="border-b border-rule bg-canvas py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-[72px]">
            <div>
              <p className="tag mb-6">Our company</p>
              <h2 className="max-w-[16ch] text-section text-ink">Built by people who believe in the work.</h2>
            </div>
            <div className="space-y-5">
              <p className="text-lede text-ink-soft">
                Zephyra Dynamics was founded to develop urban air mobility technology for India from
                first principles. Our work brings aircraft engineering, autonomous systems and
                airspace software together within one company.
              </p>
              <p className="text-lede text-ink-soft">
                We are a focused team supported by experienced aerospace mentors and advisors. The
                close connection between design, analysis and testing helps us learn quickly and make
                informed engineering decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TEAM ---------- */}
      <section id="team" className="bg-plate py-(--spacing-section)">
        <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
          <p className="tag mb-6">Leadership and advisors</p>
          <h2 className="max-w-[20ch] text-section text-ink">The people guiding our work.</h2>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12">
            {team.map((member) => (
              <article key={member.name}>
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${member.name} on LinkedIn`}
                  className="group block aspect-square overflow-hidden border border-rule bg-canvas transition-colors hover:border-signal"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={720}
                    height={720}
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="h-full w-full object-cover object-top transition-opacity group-hover:opacity-90"
                  />
                </a>
                <h3 className="mt-5 text-[22px] font-medium tracking-tight text-ink">{member.name}</h3>
                <p className="meta mt-2 text-signal">{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
