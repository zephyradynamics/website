import type { Metadata } from 'next';
import BlogArticle from '@/components/BlogArticle';
import { getPost } from '@/lib/posts';
import { pageMeta } from '@/lib/seo';

const post = getPost('uam-fundamentals-india');

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
        Mention urban air mobility to most people and they picture a science fiction film. Mention it
        to engineers and they start asking about batteries. The truth sits somewhere in between. This
        is our attempt at a plain explanation.
      </p>

      <h2>What an eVTOL actually is</h2>
      <p>
        eVTOL stands for electric vertical take-off and landing. It is an aircraft that lifts straight
        up like a helicopter, flies forward to where it is going and comes straight down again. The
        difference from a helicopter is how it is powered. A helicopter usually relies on one large
        rotor driven by an engine. An eVTOL spreads its lift across several smaller electric rotors.
      </p>
      <p>That change has three big consequences.</p>
      <p>
        <strong>It is quieter.</strong> Several smaller electric rotors are generally much quieter
        than one large rotor and an engine, which matters a great deal for an aircraft that lands on
        rooftops near homes.
      </p>
      <p>
        <strong>It is simpler.</strong> Electric motors have far fewer moving parts than engines and
        gearboxes, so there is less to wear out and less to go wrong.
      </p>
      <p>
        <strong>It can keep flying after a fault.</strong> Losing one of several motors is a very
        different situation from losing the only engine. Kestrel X2, for example, has eight rotors in
        four pairs, and each pair can carry the load if one of its motors stops.
      </p>

      <h2>The airspace matters as much as the aircraft</h2>
      <p>
        One eVTOL is a novelty. Hundreds of them over a city need a system that plans their routes,
        keeps them apart and manages where they land. This is usually called urban air traffic
        management. It is the part people tend to forget, and it is the part that decides whether any
        of this works at scale. Our version is called LAMINAR.
      </p>

      <h2>Who it is for, at first</h2>
      <p>
        The first services will be short, frequent trips: journeys of a few tens of kilometres that
        take an hour or more by road but only minutes by air. Whitefield to Electronic City is about
        17 km in a straight line. At rush hour, that can easily take well over an hour by road. In
        Kestrel X2, it would be a flight of around ten minutes, including take-off and
        landing.
      </p>

      <h2>Where India stands</h2>
      <p>
        India’s aviation regulator, the DGCA, has begun publishing guidance for this new class of
        aircraft and for the vertiports they will use. India also has experience managing drones
        through national digital systems, which gives the country a useful head start on coordinating
        low-level aircraft digitally.
      </p>
      <p>
        There is still a long way to go. Rules for passenger operations, rooftop landing pads in
        crowded neighbourhoods, noise limits and insurance all still need to be worked out. None of
        that will happen overnight, and it shouldn’t.
      </p>

      <h2>An honest timeline</h2>
      <p>
        Some companies abroad are close to starting commercial services. In India, the first passenger
        flights are still some years away. We would rather say that plainly than pretend otherwise.
      </p>
      <p>
        What we can say is that the engineering is real, the need is obvious to anyone who has sat in
        Bengaluru traffic, and the work of bringing the two together has started.
      </p>
    </BlogArticle>
  );
}
