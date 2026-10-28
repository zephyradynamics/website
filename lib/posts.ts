/** Every article on the Writing page. Each post's body lives in app/blogs/<slug>/page.tsx. */
export type Post = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  minutes: number;
  /** ISO date this version of the post went live */
  published: string;
};

export const posts: Post[] = [
  {
    slug: 'zephyra-vision',
    category: 'Our story',
    title: 'Why we started building aircraft in Bengaluru',
    summary:
      'Most of us met as students who spent too much of our lives in traffic. This is how that turned into a company that builds aircraft.',
    image: '/blog/silk-board.jpg',
    imageAlt: 'Silk Board junction in Bengaluru seen from above at rush hour, every lane full',
    minutes: 5,
    published: '2026-10-28',
  },
  {
    slug: 'why-one-seat',
    category: 'Kestrel X2',
    title: 'Why our first aircraft has only one seat',
    summary:
      'People ask why Kestrel X2 is so small. Starting with one seat was the most important decision we have made, and here is our reasoning.',
    image: '/blog/one-seat.jpg',
    imageAlt: 'Kestrel X2 from the front, showing its single-seat canopy and eight rotors',
    minutes: 5,
    published: '2026-10-28',
  },
  {
    slug: 'when-a-motor-stops',
    category: 'Safety',
    title: 'What happens when a motor stops',
    summary:
      'Every aircraft has to answer this question. Here is how Kestrel X2 answers it, and why we designed for it before anything else.',
    image: '/blog/propulsion.jpg',
    imageAlt: 'Kestrel X2 on the ground with all eight rotors spinning',
    minutes: 6,
    published: '2026-10-28',
  },
  {
    slug: 'laminar-airspace',
    category: 'LAMINAR',
    title: 'A city sky needs traffic rules before it needs traffic',
    summary:
      'One aircraft is easy to keep safe. A hundred over the same city is not. This is why we build the airspace software alongside the aircraft.',
    image: '/blog/corridors.jpg',
    imageAlt: 'Kestrel X2 aircraft flying along parallel LAMINAR corridors over Bengaluru',
    minutes: 6,
    published: '2026-10-28',
  },
  {
    slug: 'flightlab',
    category: 'FlightLab',
    title: 'Why every Kestrel flight happens in simulation first',
    summary:
      'Before Kestrel X2 leaves the ground, it has already flown the same mission many times in software. Here is how that works and what it can and cannot tell us.',
    image: '/blog/digital-twin.jpg',
    imageAlt: 'Virtual twin of Kestrel X2 showing thrust and sensor fields in a virtual test bay',
    minutes: 6,
    published: '2026-10-28',
  },
  {
    slug: 'uam-fundamentals-india',
    category: 'Explainer',
    title: 'Urban air mobility, explained without the hype',
    summary:
      'What an eVTOL actually is, why the airspace matters as much as the aircraft, and where India stands today.',
    image: '/blog/rooftop-pad.jpg',
    imageAlt: 'Kestrel X2 resting on a rooftop landing pad in Whitefield, Bengaluru',
    minutes: 7,
    published: '2026-10-28',
  },
];

export function getPost(slug: string): Post {
  const post = posts.find((p) => p.slug === slug);
  if (!post) throw new Error(`Unknown post: ${slug}`);
  return post;
}
