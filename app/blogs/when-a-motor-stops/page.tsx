import type { Metadata } from 'next';
import BlogArticle from '@/components/BlogArticle';
import { getPost } from '@/lib/posts';
import { pageMeta } from '@/lib/seo';

const post = getPost('when-a-motor-stops');

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
        Ask an aircraft designer what keeps them up at night and the answer usually involves something
        failing at the worst possible moment. For an electric aircraft hovering above a rooftop, the
        obvious version of that question is simple: what happens if a motor stops?
      </p>
      <p>
        We decided to answer it first, before we decided almost anything else about Kestrel X2.
      </p>

      <h2>Eight rotors, arranged in pairs</h2>
      <p>
        Kestrel X2 has eight rotors in four coaxial pairs. Each arm carries two rotors stacked one
        above the other, spinning in opposite directions. The pairs are designed so that if one motor
        stops, its partner on the same arm can carry the load.
      </p>
      <p>
        That one decision means the loss of a motor is something the aircraft is built to handle,
        rather than an emergency it has to survive.
      </p>

      <h2>Thrust moves to where it’s needed</h2>
      <p>
        Losing a motor isn’t only about lost lift. It also upsets the balance of the aircraft, because
        the forces on each arm no longer match. When a motor stops, the flight computers redistribute
        thrust across the remaining motors automatically, keeping Kestrel X2 level and under control.
      </p>
      <p>
        Ideally, the passenger feels very little. The aircraft continues to a safe landing, and the
        fault is logged for the engineers to look at afterwards.
      </p>

      <h2>Two flight computers</h2>
      <p>
        The flight computer is the aircraft’s brain, and a brain that can fail needs a backup. Kestrel
        X2 carries two flight computers, so a single fault in one does not leave the aircraft without
        control.
      </p>

      <h2>Weight carried low</h2>
      <p>
        Where the weight goes matters as much as how much there is. Kestrel X2 carries its heaviest
        parts low, which keeps the centre of gravity low. That helps keep it stable, especially during
        the slow and careful moments of take-off and landing.
      </p>

      <h2>How we test it</h2>
      <p>
        We don’t wait for a real motor to fail to find out what happens. In FlightLab, our virtual
        twin of the aircraft, we stop motors on purpose: in the hover, in the climb, in cruise and in
        a crosswind. Each test has its pass criteria written down before it runs, and every run is
        recorded so another engineer can check it later.
      </p>
      <p>
        Simulation can’t prove everything. The real aircraft will have to show the same behaviour in
        physical testing. But it means that when it does, we will already know what to expect, and we
        will notice straight away if it does something else.
      </p>

      <h2>Why we started here</h2>
      <p>
        Redundancy is easy to build in at the start of a design and very hard to add later. By
        deciding early that no single motor or flight computer failure should bring the aircraft down,
        we let that rule shape everything that came after it.
      </p>
    </BlogArticle>
  );
}
