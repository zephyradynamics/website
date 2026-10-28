import type { Metadata } from 'next';
import BlogArticle from '@/components/BlogArticle';
import { getPost } from '@/lib/posts';
import { pageMeta } from '@/lib/seo';

const post = getPost('zephyra-vision');

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
        Everyone who lives in Bengaluru has a Silk Board story. The bus that takes ninety minutes to
        cover nine kilometres. The exam you reach with two minutes to spare. The ambulance stuck three
        cars ahead of you, siren going, with nowhere for anyone to move. We collected plenty of these
        stories as students at RV College of Engineering.
      </p>
      <p>
        At some point the complaining turned into a question we couldn’t put down. The city keeps
        adding flyovers and metro lines, and it keeps filling them. The ground is full. The sky above
        it is almost empty. What would it take to use that space safely, every day, for ordinary
        journeys?
      </p>
      <p>
        That question started as a student research project. It grew into a team of more than 45
        engineers, and eventually into Zephyra Dynamics.
      </p>

      <h2>We were never trying to build a flying car</h2>
      <p>
        The phrase “flying car” has done this industry no favours. It makes people picture something
        from a film, and it makes engineers wince. What we are building is less glamorous and, we
        think, more useful: a small electric aircraft that takes off vertically from a rooftop pad,
        flies a short planned route across the city and lands on another rooftop. No runway and no
        pilot.
      </p>

      <h2>An aircraft on its own is only a demo</h2>
      <p>
        Early on, we made a decision that shaped everything after it. We would not build only an
        aircraft.
      </p>
      <p>
        To carry people across a city every day, you also need a way to plan routes through the sky,
        keep aircraft apart and know which landing pads are free. Before any of that, you need a way
        to test all of it without putting anyone at risk.
      </p>
      <p>
        So we build three things together. <strong>Kestrel X2</strong> is the aircraft.{' '}
        <strong>LAMINAR</strong> is the airspace software that plans and separates every flight.{' '}
        <strong>FlightLab</strong> is the virtual twin where every flight is tested in simulation
        before it happens for real. Each one shapes the others. If FlightLab shows that a route asks
        too much of the battery, LAMINAR plans a different one and the aircraft team learns something
        about the battery.
      </p>

      <h2>Why it has to be designed here</h2>
      <p>
        Many aircraft in this field are designed for wide suburbs and spacious business districts
        abroad, then offered to everyone else. Indian cities are different. Rooftops are smaller and
        closer together. Summers are hot, the monsoon is heavy and the air is often dusty. The
        airspace around our cities is busy and tightly controlled.
      </p>
      <p>
        We think the aircraft that works here has to be designed here, by people who live with these
        conditions every day. Bengaluru gives us that, along with some of the best engineering talent
        in the country.
      </p>

      <h2>Where we are, honestly</h2>
      <p>
        Kestrel X2 flies in simulation every day. The road from there to carrying passengers runs
        through prototypes, flight testing and certification with India’s regulator, the DGCA. It will
        take years, and it should. People will only step into an aircraft without a pilot if every
        step has been earned with evidence.
      </p>
      <p>
        That is the work in front of us. If it sounds like work you would enjoy, we would like to hear
        from you.
      </p>
    </BlogArticle>
  );
}
