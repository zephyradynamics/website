import type { Metadata } from 'next';
import BlogArticle from '@/components/BlogArticle';
import { getPost } from '@/lib/posts';
import { pageMeta } from '@/lib/seo';

const post = getPost('why-one-seat');

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
        The first thing most people say when they see Kestrel X2 is some version of “it’s smaller
        than I expected.” They’re right. It carries one person. There is no pilot and no second
        passenger.
      </p>
      <p>
        That was a deliberate choice, and probably the most important one we have made. Here is why.
      </p>

      <h2>Small aircraft fit real rooftops</h2>
      <p>
        Every extra seat adds weight, and weight adds everything else: larger rotors, a heavier
        battery, a bigger footprint on the landing pad. A larger aircraft needs a larger pad, and
        Indian cities don’t have many large, empty roofs.
      </p>
      <p>
        Keeping Kestrel X2 compact means it can use rooftops that already exist, instead of waiting
        for purpose-built vertiports on the edge of town, far from where people actually live and
        work.
      </p>

      <h2>Most of the trips that hurt are made alone</h2>
      <p>
        Look at the cars queued at any Bengaluru junction during rush hour and count the people
        inside. A great many of them carry just the driver. The journey that costs people the most
        time, the daily trip across the city, is usually made alone.
      </p>
      <p>
        With a range of 35 to 45 km and a cruise speed of 80 to 135 km/h, Kestrel X2 is sized for
        exactly that trip. Whitefield to Electronic City is about 17 km in a straight line, a flight
        of around a quarter of an hour including take-off and landing.
      </p>

      <h2>Without a pilot, the seat belongs to the passenger</h2>
      <p>
        In a conventional aircraft, the pilot takes a seat. Kestrel X2 is flown by its own flight
        computers, and it carries two of them, so the only seat goes to the person travelling. That
        is what lets the aircraft be small and still useful.
      </p>

      <h2>A simpler aircraft is easier to prove safe</h2>
      <p>
        This is the reason that matters most to us. Every system on an aircraft has to be understood,
        tested and shown to be safe. A smaller aircraft with fewer systems is easier to reason about,
        easier to test thoroughly in FlightLab and easier to explain to a regulator.
      </p>
      <p>
        We would rather prove a simple aircraft completely than half-prove a complicated one.
      </p>

      <h2>What one seat doesn’t mean</h2>
      <p>
        It doesn’t mean we will only ever build single-seat aircraft. It means we want to learn, test
        and certify on the simplest aircraft that does a genuinely useful job.
      </p>
      <p>
        Everything we learn from Kestrel X2 carries forward to whatever we build next: how autonomy
        behaves in a real city, how batteries cope with an Indian summer, how people feel about
        stepping into an aircraft on a rooftop.
      </p>
    </BlogArticle>
  );
}
