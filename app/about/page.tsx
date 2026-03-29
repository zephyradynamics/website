import Footer from "@/components/Footer";

const team = [
  {
    name: "Sadiq Ali Mir",
    role: "Founder & CEO",
    image: "/Sadiq Ali Mir (Founder).jpeg",
    linkedIn: "https://www.linkedin.com/in/sadiqalimir/",
  },
  {
    name: "Dr. Promio Charles F",
    role: "Advisor",
    image: "/promio.png",
    linkedIn: "https://www.linkedin.com/in/dr-promio-charles-194a6b32/",
  },
  {
    name: "Dr. Ravindra S Kulkarni",
    role: "Advisor",
    image: "/ravindra.png",
    linkedIn: "https://www.linkedin.com/in/dr-ravindra-s-kulkarni-90181ab0/",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col font-body bg-[#0A0A0A] text-white min-h-screen">

      {/* ABOUT ZEPHYRA DYNAMICS PANEL */}
      <section className="px-6 lg:px-24 py-20 max-w-7xl mx-auto w-full">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest text-white">
            About Zephyra Dynamics
          </h1>
        </div>

        {/* Content and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-[#BFC5CC] text-lg leading-relaxed text-justify">
              Zephyra Dynamics is India's emerging aerospace startup pioneering the development of electric vertical take-off and landing (eVTOL) aircraft for sustainable urban air mobility. Our mission is to transform intra-city transportation by engineering certifiable, fully autonomous electric aircraft platforms grounded in first principles aerospace engineering.
            </p>
            <p className="text-[#BFC5CC] text-lg leading-relaxed text-justify">
              Founded on academic excellence and rigorous engineering methodology, we blend cutting-edge aerospace innovation with direct mentorship from experienced aerospace faculty. Our lean, highly motivated team focuses on solving one of the most critical challenges: enabling safe, scalable, and autonomous urban air mobility for India.
            </p>
          </div>

          {/* Image */}
          <div className="w-full bg-[#0A0A0A] border border-[#0F62FE]/30 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src="/about_section.png"
              alt="Zephyra Dynamics"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#0F62FE] to-transparent mx-auto max-w-5xl"></div>

      {/* OUR VISION PANEL */}
      <section className="px-6 lg:px-24 py-20 max-w-7xl mx-auto w-full">
        <div className="space-y-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-widest text-[#0F62FE]">
            Our Vision
          </h2>
          <p className="text-[#BFC5CC] text-lg leading-relaxed text-justify max-w-4xl mx-auto">
            To redefine Urban Air Mobility in India through first principles aerospace engineering, AI native autonomous aircraft, clean electric propulsion systems, and certification aligned development.
          </p>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#0F62FE] to-transparent mx-auto max-w-5xl"></div>

      {/* OUR MISSION PANEL */}
      <section className="px-6 lg:px-24 py-20 max-w-7xl mx-auto w-full">
        <div className="space-y-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-widest text-[#0F62FE]">
            Our Mission
          </h2>
          <p className="text-[#BFC5CC] text-lg leading-relaxed text-justify max-w-4xl mx-auto">
            To engineer certifiable, fully autonomous electric aircraft platforms from first principles and enable scalable Urban Air Mobility in India. We are committed to developing advanced eVTOL technology that meets the highest safety and certification standards, while creating sustainable solutions for modern urban transportation challenges.
          </p>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#0F62FE] to-transparent mx-auto max-w-5xl"></div>

      {/* TEAM */}
      <section id="team" className="px-6 lg:px-24 py-20 max-w-7xl mx-auto w-full">
        <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-widest text-white text-center mb-16">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <div
              key={index}
              className="space-y-4"
            >
              {/* Square Image Box - Clickable */}
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full aspect-square bg-[#0A0A0A] border border-[#0F62FE]/30 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer group block hover:border-[#0F62FE]/70 hover:scale-105 transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:opacity-80 transition-opacity duration-300"
                />
              </a>
              <div className="text-center space-y-2">
                <h3 className="font-heading text-lg font-bold text-white tracking-wide">
                  {member.name}
                </h3>
                <p className="text-[#0F62FE] text-sm font-semibold uppercase tracking-wider">
                  {member.role}
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
