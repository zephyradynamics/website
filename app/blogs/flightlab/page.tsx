import type { Metadata } from 'next';
import BlogArticle from '@/components/BlogArticle';
import { getPost } from '@/lib/posts';
import { pageMeta } from '@/lib/seo';

const post = getPost('flightlab');

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
        The first flight of a new aircraft is a nervous moment for everyone involved. We would like
        ours to be a slightly boring one. The way to get there is to have flown it already, many
        times, somewhere nothing can go wrong. For us, that place is FlightLab.
      </p>

      <h2>A virtual twin of Kestrel X2</h2>
      <p>
        FlightLab runs a virtual twin of Kestrel X2: a model of the aircraft’s weight, rotors, motors,
        battery and sensors, flown by the same flight software that will fly the real aircraft. When
        we change that software, we fly it in FlightLab first. When we want to know how the aircraft
        behaves in a strong crosswind or with a heavier passenger, we ask FlightLab before we ask the
        real aircraft.
      </p>
      <p>
        Most of this happens purely in software. As the programme moves forward, the same tests run
        with the real flight computers connected, so we can check the hardware as well as the code.
        FlightLab also connects to LAMINAR, so the twin flies the same routes that LAMINAR plans.
      </p>

      <h2>Tests, not demos</h2>
      <p>
        It’s easy to make a simulation look good. Choose a calm day, fly a gentle route and keep the
        nicest clip. That kind of run tells you almost nothing.
      </p>
      <p>
        So FlightLab is organised around test procedures instead. Each one states what it is trying
        to prove, the exact steps to follow and the pass criteria, all written down before the test
        runs. The procedures follow the structure of the flight tests an aircraft goes through for
        certification with the DGCA, so the habits we build now are the ones we will need later.
      </p>

      <h2>Every run leaves a record</h2>
      <p>
        When a test finishes, FlightLab keeps everything about it: the software version, the
        conditions, the data and the result. If someone asks us in six months why we believe the
        aircraft handles a motor failure in a crosswind, we can show them the run instead of simply
        telling them it passed.
      </p>

      <h2>What simulation can’t tell us</h2>
      <p>
        We try hard not to over-trust our own tools. A simulation is only as good as its model, and a
        model is always a simplification of the real aircraft. A passed test in FlightLab means the
        twin behaved correctly in that situation. It doesn’t prove the real aircraft will, and it
        doesn’t replace physical testing or a formal safety assessment.
      </p>
      <p>
        What it does is make physical testing much better. We arrive at every real test knowing what
        we expect to see, so we notice immediately when something is different. When the real aircraft
        surprises us, we feed that back into the twin, and it becomes a little more accurate each
        time.
      </p>

      <h2>Why it matters</h2>
      <p>
        An aircraft without a pilot has to earn trust in a way no other vehicle does. We think that
        trust starts with being able to show, clearly and honestly, every test the aircraft has been
        through. FlightLab is where that record begins.
      </p>
    </BlogArticle>
  );
}
