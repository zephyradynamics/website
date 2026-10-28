import type { Metadata } from 'next';
import BlogArticle from '@/components/BlogArticle';
import { getPost } from '@/lib/posts';
import { pageMeta } from '@/lib/seo';

const post = getPost('laminar-airspace');

export const metadata: Metadata = pageMeta({
  title: post.title,
  description: post.summary,
  path: `/blogs/${post.slug}`,
  image: post.image,
  imageAlt: post.imageAlt,
  article: { published: post.published },
});

export default function Page() {
  return (
    <BlogArticle slug={post.slug}>
      <p>
        Picture one Kestrel X2 crossing Bengaluru on a clear morning. Keeping it safe is mostly about
        the aircraft itself. Now picture forty of them, along with delivery drones and helicopters
        heading to the airport, all sharing the same few hundred metres of sky. Safety is now about
        how all of them share that space.
      </p>
      <p>The second picture is the one we are building for. It is why LAMINAR exists.</p>

      <h2>Roads in the sky</h2>
      <p>
        LAMINAR plans every flight along a corridor, a defined path through the air, instead of
        letting aircraft fly wherever they like. Corridors are drawn to stay clear of restricted
        airspace and to prefer routes over places where fewer people are on the ground below.
      </p>
      <p>
        Corridors can also be layered by height, so aircraft heading in different directions are kept
        apart vertically as well as sideways. It is a familiar idea from roads: lanes, directions and
        junctions, applied to the air.
      </p>

      <h2>Keeping everyone apart</h2>
      <p>
        Every aircraft in LAMINAR has a protected space around it that no other aircraft may enter.
        LAMINAR watches all of them continuously. If two flights are heading for that space, it raises
        an advisory early, long before it becomes urgent, and adjusts a route, a height or a departure
        time.
      </p>

      <h2>A flight starts with somewhere to land</h2>
      <p>
        A flight isn’t finished until the aircraft has somewhere to put down. LAMINAR knows which
        rooftop pads are free, which are busy charging an aircraft and which are closed. A flight
        doesn’t leave until its landing slot is confirmed.
      </p>
      <p>
        That single rule removes a whole category of problems. Nobody circles over a city waiting for
        a pad to clear.
      </p>

      <h2>Built with the aircraft, not after it</h2>
      <p>
        Airspace software is usually designed separately from the aircraft it manages. We think that
        is backwards. Because we build Kestrel X2 and LAMINAR together, LAMINAR knows exactly how the
        aircraft climbs, turns and uses its battery, and the aircraft team knows exactly what LAMINAR
        will ask of it.
      </p>
      <p>
        FlightLab ties the two together. Routes planned by LAMINAR are flown by the virtual twin of
        Kestrel X2 in simulation before they are ever flown for real.
      </p>

      <h2>Working with the people who run the sky</h2>
      <p>
        The airspace over Indian cities already has people responsible for it: air traffic control,
        airport operators and the DGCA. LAMINAR is designed to share information with them, not to
        replace them. The rules for low-level flight over cities will be written over the next several
        years, and we want LAMINAR to be ready to follow them from the first day.
      </p>
      <p>
        If you would like to see it in action, the LAMINAR console on our website shows illustrative
        traffic over a real map of Bengaluru.
      </p>
    </BlogArticle>
  );
}
