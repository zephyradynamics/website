import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Image from 'next/image';
import Footer from '@/components/Footer';
import LoopVideo from '@/components/LoopVideo';
import { Button, Container, Heading } from '@/components/ui';

export const metadata: Metadata = pageMeta({
  title: 'About us, urban air mobility from Bengaluru',
  description:
    'Zephyra Dynamics is a Bengaluru aerospace company building Kestrel X2, LAMINAR and FlightLab to shape the future of Urban Air Mobility in India.',
  path: '/about',
});

const team = [
  {
    name: 'Sadiq Ali Mir',
    role: 'Founder and Chief Executive Officer',
    image: '/sadiq-ali-mir-white.png',
    linkedIn: 'https://www.linkedin.com/in/sadiqalimir/',
  },
  {
    name: 'Dr. Promio Charles F',
    role: 'Mentor and Senior Aerospace Advisor',
    image: '/promio.png',
    linkedIn: 'https://www.linkedin.com/in/dr-promio-charles-194a6b32/',
  },
  {
    name: 'Dr. Ravindra S Kulkarni',
    role: 'Mentor and Technical Advisor',
    image: '/ravindra.png',
    linkedIn: 'https://www.linkedin.com/in/dr-ravindra-s-kulkarni-90181ab0/',
  },
];

const principles = [
  {
    title: 'Build the whole system',
    body: 'An aircraft without an airspace is a demo. We design Kestrel X2, LAMINAR and FlightLab together, so each is built around the other two.',
  },
  {
    title: 'Prove it in software first',
    body: 'Every manoeuvre, gust and fault is flown in the virtual twin before it is flown for real. Evidence comes before claims.',
  },
  {
    title: 'Design for India',
    body: 'Dense cities, monsoon weather and rooftop landing pads. We start from the conditions Indian cities actually have.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="bg-sky pt-[clamp(48px,8vh,96px)] pb-(--spacing-section)">
        <Container>
          <p className="kicker rise mb-4">Company</p>
          <h1 className="font-wide rise max-w-[22ch] text-display text-balance text-carbon">Indian cities are running out of room on the ground. The sky above them is still open.</h1>
          <p className="rise rise-2 mt-7 max-w-[60ch] text-lede text-slate">
            Zephyra Dynamics was founded in Bengaluru to build Urban Air Mobility for India from
            first principles. India&apos;s ecosystem is still young, which means it can be built
            correctly from the start. We intend to help build it.
          </p>
        </Container>
      </section>

      <section className="relative isolate h-[min(70svh,720px)] min-h-[400px] overflow-hidden">
        <LoopVideo name="city-approach" label="Kestrel X2 approaching over the Bengaluru skyline" className="absolute inset-0 -z-10" />
      </section>

      {/* ---------- MISSION ---------- */}
      <section className="bg-cloud py-(--spacing-section)">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Heading kicker="Mission" title="We build safe, self-flying electric aircraft and everything needed to operate them." />
          <div className="space-y-6 text-lede text-slate lg:pt-12">
            <p>
              We develop safe, autonomous, electric aircraft and the systems required to operate
              them: airspace management, vertiport scheduling and a validation platform that
              produces evidence regulators can review.
            </p>
            <p>
              We are a focused team supported by experienced aerospace mentors. Design, analysis
              and testing sit side by side, so we learn quickly and decide on evidence.
            </p>
          </div>
        </Container>
      </section>

      {/* ---------- PRINCIPLES ---------- */}
      <section className="border-t border-line bg-sky py-(--spacing-section)">
        <Container>
          <Heading kicker="How we work" title="Three principles guide how we work." />
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="border-t border-line-strong pt-6">
                <h3 className="font-semiwide text-[24px] tracking-tight text-carbon">{p.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-slate">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- TEAM ---------- */}
      <section id="team" className="border-t border-line bg-cloud py-(--spacing-section)">
        <Container>
          <Heading kicker="Leadership and advisors" title="The people guiding our work." />
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <article key={member.name}>
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="group block aspect-[4/5] overflow-hidden rounded-[18px] bg-mist"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={720}
                    height={900}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </a>
                <h3 className="font-semiwide mt-5 text-[22px] tracking-tight text-carbon">{member.name}</h3>
                <p className="mt-1 text-[15px] text-slate">{member.role}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- WHERE ---------- */}
      <section className="border-t border-line bg-sky py-(--spacing-section)">
        <Container className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <Heading kicker="Where we are" title="We design and build in Bengaluru." />
            <address className="mt-6 text-lede text-slate not-italic">
              Department of Aerospace Engineering, RV College of Engineering
              <br />
              Bengaluru 560059, Karnataka, India
            </address>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/careers" variant="secondary">Join the team</Button>
            <Button href="/#contact">Contact us</Button>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
