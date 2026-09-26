import type { Metadata } from 'next';
import BlogArticle from '@/components/BlogArticle';

export const metadata: Metadata = {
  title: 'Why We Exist: The Zephyra Dynamics Vision',
  description:
    'The origin of Zephyra Dynamics and our approach to building autonomous urban air mobility technology for India.',
  alternates: { canonical: '/blogs/zephyra-vision' },
};

export default function ZephyraVisionPage() {
  return (
    <BlogArticle
      category="Our Story"
      title="Why we exist: the Zephyra Dynamics vision"
      summary="Shaping the future of urban air mobility in India."
      articlePath="/blogs/zephyra-vision"
      image="/image/kestrel_hero.png"
      imageAlt="Kestrel X2 aircraft displayed beneath the Indian flag"
      imageWidth={6400}
      imageHeight={3906}
    >
      <p>
        Traffic does not feel like a technology problem when you are stuck in it. It feels personal,
        and it is a daily reality for millions of people across Indian cities. Hours disappear into
        journeys that should take minutes. Emergency vehicles lose critical time on roads that cannot
        always provide a clear path. Commutes take time away from work, study and family. These are
        not abstract inefficiencies. They are lived costs, repeated every day in every major city in
        the country.
      </p>
      <p>
        Zephyra Dynamics exists because we believe this problem deserves a serious engineering
        response, and one built specifically for the places where it will operate.
      </p>

      <h2>An engineering problem, not a science fiction one</h2>
      <p>
        Urban air mobility is often treated as a distant idea, more concept than reality. We see it
        differently. eVTOL technology is an engineering problem, and one that Indian talent is well
        positioned to solve for Indian conditions. That means designing around local infrastructure,
        regulation, climate and operating environments, rather than adapting a system built for a
        different market and hoping it transfers.
      </p>
      <p>
        This conviction shaped Zephyra Dynamics from the outset. What began as a small student
        research initiative at RV College of Engineering grew into a team of more than 45 engineers,
        and became the foundation for the company we are building today.
      </p>

      <h2>Building the whole system</h2>
      <p>
        An aircraft cannot operate at scale without an airspace system capable of managing it safely.
        That is why Zephyra Dynamics is developing both sides of the operation together.
      </p>
      <p>
        <strong>Kestrel X2</strong> is our autonomous, single seat eVTOL aircraft. <strong>LAMINAR</strong>{' '}
        is the platform designed to coordinate aircraft, routes and vertiports across a network.
      </p>
      <p>
        We treat these as one connected engineering problem rather than two separate products. Vehicle
        performance shapes what is possible in route planning. Operational requirements, in turn,
        shape aircraft and system design. Developing them in parallel, with each informing the other,
        is central to how we work.
      </p>

      <h2>What we are building toward</h2>
      <p>
        Our long-term vision is a network of quiet, autonomous aircraft moving people across Indian
        cities, coordinated by airspace software and supported by a practical vertiport network. That
        vision does not stop at a working prototype. It requires certification, reliable day to day
        operations and earned trust from regulators, operators and the public.
      </p>
      <p>
        The work ahead is to turn validated engineering into a certified flying system, built step by
        step, with evidence at every stage.
      </p>

      <h2>Why it matters</h2>
      <p>
        The congestion we are addressing is not hypothetical. It is familiar to everyone who has sat
        in it. It costs time, it costs opportunity and, at times, it costs more than that. We are
        building Zephyra Dynamics because that experience is shared by millions of people across the
        country, and because we believe urban air mobility, built for India by people who understand
        India, is the right answer.
      </p>
    </BlogArticle>
  );
}
