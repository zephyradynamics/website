import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="flex flex-col font-body">
      
      {/* HERO SECTION */}
      <Hero 
        videoSrc="/hero.mp4"
        heading="Shaping the Future of Urban Air Mobility"
        subheading="Sustainable Air Mobility for Modern Cities in India"
        ctaButtons={[
          {
            label: 'Explore Kestrel X2',
            href: '/kestrel-x2',
            variant: 'primary'
          }
        ]}
        overlayOpacity={0.4}
      />

      {/* SECTION 1.5: KEY HIGHLIGHTS */}
      <section className="bg-[#0A0A0A] py-20 px-6 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-widest text-white mb-16 text-center">
            What We're Building
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#0F62FE]/5 to-transparent border border-[#0F62FE]/20 rounded-lg p-8 space-y-4">
              <h3 className="font-heading text-2xl font-bold text-[#0F62FE] uppercase tracking-wide">Kestrel X2</h3>
              <p className="text-[#BFC5CC] text-sm leading-relaxed text-justify">
                Our flagship single-passenger eVTOL prototype represents years of rigorous aerospace engineering. From advanced aerodynamics to autonomous control systems, discover what makes Kestrel X2 the foundation of India's urban air mobility future.
              </p>
              <a href="/kestrel-x2" className="inline-block text-[#0F62FE] hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider mt-4">
                Explore Kestrel X2 →
              </a>
            </div>

            <div className="bg-gradient-to-br from-[#0F62FE]/5 to-transparent border border-[#0F62FE]/20 rounded-lg p-8 space-y-4">
              <h3 className="font-heading text-2xl font-bold text-[#0F62FE] uppercase tracking-wide">Our Team</h3>
              <p className="text-[#BFC5CC] text-sm leading-relaxed text-justify">
                Founded on academic excellence and aerospace expertise. Our lean, highly motivated team combines cutting-edge first-principles engineering with direct mentorship from experienced aerospace faculty to build the future of autonomous flight.
              </p>
              <a href="/about#team" className="inline-block text-[#0F62FE] hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider mt-4">
                Meet the Team →
              </a>
            </div>
          </div>
        </div>
      </section>

{/* SECTION 2: NEWS */}
      <section className="bg-[#0A0A0A] py-16 px-6 lg:px-24">
        <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-widest text-white mb-10 text-center">
          News From Zephyra Dynamics
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch max-w-4xl mx-auto">
          <a
            href="https://www.linkedin.com/posts/zephyradynamics_zephyradynamics-kestrelx2-evtol-activity-7431284149686067200-RzlU?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFuCngBz8eI5C1Z50qNwu-RFTP_iQCi5LQ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:border-[#0F62FE]/50 hover:scale-[1.02] transition-all duration-300"
          >
            <img
              src="/das.png"
              alt="Zephyra Dynamics News"
              className="w-full h-full object-cover"
            />
          </a>
          <a
            href="https://www.linkedin.com/posts/zephyradynamics_zephyradynamics-kestrelx2-evtol-activity-7431284149686067200-RzlU?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFuCngBz8eI5C1Z50qNwu-RFTP_iQCi5LQ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:border-[#0F62FE]/50 hover:scale-[1.02] transition-all duration-300"
          >
            <img
              src="/inv.png"
              alt="Zephyra Dynamics News"
              className="w-full h-full object-cover"
            />
          </a>
        </div>
      </section>

      {/* CONTACT FORM */}
      <ContactForm />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}