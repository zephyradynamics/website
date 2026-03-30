import Footer from "@/components/Footer";

const team = [
  {
    name: "Sadiq Ali Mir",
    role: "Founder & Chief Executive Officer",
    image: "/Sadiq Ali Mir (Founder).jpeg",
    linkedIn: "https://www.linkedin.com/in/sadiqalimir/",
    bio: "Sadiq founded Zephyra Dynamics with a singular insight: that India's urban mobility crisis is fundamentally an aerospace problem. As CEO, he drives strategic direction, engineering philosophy, partnership strategy, and uncompromising execution standards.",
  },
  {
    name: "Dr. Promio Charles F",
    role: "Mentor & Senior Aerospace Advisor",
    image: "/promio.png",
    linkedIn: "https://www.linkedin.com/in/dr-promio-charles-194a6b32/",
    bio: "Dr. Charles brings decades of aerospace research and engineering leadership. His expertise spans advanced propulsion systems, flight dynamics, and certification-aligned development. He works directly on Kestrel X2's technical architecture.",
  },
  {
    name: "Dr. Ravindra S Kulkarni",
    role: "Mentor & Technical Advisor",
    image: "/ravindra.png",
    linkedIn: "https://www.linkedin.com/in/dr-ravindra-s-kulkarni-90181ab0/",
    bio: "Dr. RSK provides deep technical mentorship across systems engineering and programme management. His guidance on system integration, safety architecture, and development methodology is embedded in every stage of Kestrel X2.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col font-body bg-deep-space text-cloud-white min-h-screen">

      {/* ABOUT ZEPHYRA DYNAMICS PANEL */}
      <section className="px-6 lg:px-24 py-20 max-w-7xl mx-auto w-full relative overflow-hidden">
        <div className="absolute top-12 left-0 opacity-[0.08] text-9xl font-light pointer-events-none -ml-12">01</div>
        {/* Heading */}
        <div className="text-center mb-12 relative z-10">
          <p className="text-stratosphere-silver text-xs font-bold uppercase tracking-widest mb-4">Our Company</p>
          <h1 className="font-sans text-4xl md:text-6xl font-bold tracking-wide leading-tight drop-shadow-2xl text-white">
            Built by Believers
          </h1>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto relative z-10 text-center space-y-6">
          <p className="text-stratosphere-silver text-lg leading-relaxed text-center">
            Zephyra Dynamics was founded on the conviction that India's urban mobility crisis is fundamentally an aerospace problem. The most important constraint on urban air mobility in India is not technology, it is conviction. The conviction to build something genuinely new, to subject it to the highest engineering standards, and to bring it to market with absolute integrity.
          </p>
          <p className="text-stratosphere-silver text-lg leading-relaxed text-center">
            Our team is small, deliberately. Every individual at Zephyra Dynamics was selected not for what they have done, but for what they are capable of building. We combine cutting-edge first-principles aerospace engineering with direct mentorship from experienced aerospace faculty to build the future of autonomous flight.
          </p>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-horizon-cyan to-transparent mx-auto max-w-5xl"></div>

      {/* OUR VISION PANEL */}
      <section className="px-6 lg:px-24 py-20 max-w-7xl mx-auto w-full relative overflow-hidden">
        <div className="absolute top-12 right-0 opacity-[0.08] text-9xl font-light pointer-events-none -mr-20">02</div>
        <div className="space-y-4 text-center relative z-10">
          <h2 className="font-sans text-4xl md:text-6xl font-bold tracking-wide leading-tight drop-shadow-2xl text-horizon-cyan">
            Our Vision
          </h2>
          <p className="text-stratosphere-silver text-lg leading-relaxed text-center max-w-4xl mx-auto">
            The ground is full. The sky is not. India's urban air mobility ecosystem is nascent, which means it can be built correctly from the start. We are building the machine that carries a single person safely, silently, and swiftly above it all.
          </p>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-horizon-cyan to-transparent mx-auto max-w-5xl"></div>

      {/* OUR MISSION PANEL */}
      <section className="px-6 lg:px-24 py-20 max-w-7xl mx-auto w-full relative overflow-hidden">
        <div className="absolute bottom-12 left-0 opacity-[0.08] text-9xl font-light pointer-events-none -ml-12">03</div>
        <div className="space-y-4 text-center relative z-10">
          <h2 className="font-sans text-4xl md:text-6xl font-bold tracking-wide leading-tight drop-shadow-2xl text-horizon-cyan">
            Our Mission
          </h2>
          <p className="text-stratosphere-silver text-lg leading-relaxed text-center max-w-4xl mx-auto">
            To engineer and deliver India's first purpose-engineered single-passenger eVTOL aircraft, Kestrel X2, from first principles. We are committed to developing a certifiable, fully autonomous electric aircraft that meets the highest safety and engineering standards, while enabling scalable urban air mobility solutions for modern Indian cities.
          </p>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-horizon-cyan to-transparent mx-auto max-w-5xl"></div>

      {/* TEAM */}
      <section id="team" className="px-6 lg:px-24 py-20 max-w-7xl mx-auto w-full relative overflow-hidden">
        <div className="absolute bottom-20 right-0 opacity-[0.08] text-9xl font-light pointer-events-none -mr-24">04</div>
        <h2 className="font-sans text-4xl md:text-6xl font-bold tracking-wide leading-tight drop-shadow-2xl text-white text-center mb-4 relative z-10">
          Leadership & Advisors
        </h2>
        <p className="text-center text-stratosphere-silver text-base max-w-2xl mx-auto mb-16 relative z-10">
          World-class aerospace expertise guiding Kestrel X2 development
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {team.map((member, index) => (
            <div
              key={index}
              className="space-y-4 group"
            >
              {/* Square Image Box - Clickable */}
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full aspect-square bg-orbital-blue/20 border border-horizon-cyan/30 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer block hover:border-horizon-cyan hover:shadow-lg hover:shadow-horizon-cyan/20 transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:opacity-80 transition-opacity duration-300"
                />
              </a>
              {/* Changed alignment to text-center for the team details */}
              <div className="space-y-3 text-center">
                <div>
                  <h3 className="font-heading text-lg font-bold text-cloud-white tracking-wide">
                    {member.name}
                  </h3>
                  <p className="text-horizon-cyan text-xs font-semibold uppercase tracking-wider mt-1">
                    {member.role}
                  </p>
                </div>
                <p className="text-stratosphere-silver text-sm leading-relaxed text-center">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}