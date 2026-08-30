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
      summary="How a difficult commute became a question about aerospace engineering, and how that question grew into Zephyra Dynamics."
      articlePath="/blogs/zephyra-vision"
      image="/image/kestrel_hero.png"
      imageAlt="Kestrel X2 aircraft displayed beneath the Indian flag"
      imageWidth={6400}
      imageHeight={3906}
    >
      <p>
        Traffic does not feel like a technology problem when you are stuck in it. It feels personal.
        It felt personal when our founder, Sadiq Ali Mir, arrived in Bengaluru from Kashmir to study
        aerospace engineering. Hours disappeared into journeys that should have taken minutes.
      </p>
      <p>
        That frustration became a question. If aerospace engineering exists to solve difficult
        movement problems, why was it not solving this one here, for people in Indian cities?
      </p>
      <p>
        The question led to Team AeroAstro, a student research group founded at RV College of
        Engineering. The group began with a simple idea that eVTOL technology was not science fiction,
        but an engineering problem that Indian talent could solve for Indian conditions. What began
        as a small student group grew into a research team of more than 45 members and became the
        foundation for Zephyra Dynamics.
      </p>

      <h2>Build the whole system</h2>
      <p>
        An aircraft cannot operate at scale without an airspace system that can manage it safely.
        Zephyra Dynamics is therefore developing both sides of the operation. Kestrel X2 is our
        autonomous single seat eVTOL, and LAMINAR is the platform designed to coordinate aircraft,
        routes and vertiports.
      </p>
      <p>
        Developing the aircraft and software together allows each to inform the other. Vehicle
        performance affects route planning, while operational requirements influence aircraft and
        system design. Treating them as one connected problem is central to our engineering approach.
      </p>

      <h2>Why we care</h2>
      <p>
        The congestion this company addresses is familiar to everyone on the early team. Long
        commutes take time away from study, work and family. Emergency vehicles lose critical minutes
        on roads that cannot always provide a clear path. These are daily problems with consequences
        for people and for the cities where they live.
      </p>
      <p>
        We believe they deserve a serious engineering response developed for the places where it will
        operate. That means understanding local infrastructure, regulation, climate and operating
        conditions rather than importing a system designed for a different market.
      </p>

      <h2>What we are building toward</h2>
      <p>
        Our long-term vision is a network of quiet autonomous aircraft moving people across Indian
        cities, coordinated by airspace software and connected through a practical vertiport network.
        Reaching that point requires more than a working prototype. It requires certification,
        reliable operations and trust from regulators, operators and the public.
      </p>
      <p>
        The work ahead is to turn validated engineering into a certified flying system. We began with
        one commute in one city that took too long. We are building Zephyra Dynamics because that
        experience is shared by millions of people.
      </p>
    </BlogArticle>
  );
}
