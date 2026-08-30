import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import Image from "next/image";

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
            label: 'Discover Kestrel X2',
            href: '/kestrel-x2',
            variant: 'primary'
          }
        ]}
        overlayOpacity={0.4}
      />

      {/* SECTION 1.5: KEY HIGHLIGHTS */}
      <section className="bg-deep-space py-20 px-6 lg:px-24 relative overflow-hidden">
        {/* Adjusted background number positioning to prevent side-clipping */}
        <div className="absolute top-24 left-4 opacity-[0.08] text-8xl md:text-9xl font-light pointer-events-none z-0">01</div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-widest text-cloud-white mb-16 text-center">
            What We&apos;re Building
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-horizon-cyan/10 to-transparent border border-horizon-cyan/30 rounded-lg p-8 backdrop-blur-sm transition-all duration-300 hover:border-horizon-cyan/50 flex flex-col">
              <h3 className="font-heading text-2xl font-bold text-horizon-cyan uppercase tracking-wide mb-4">Introducing Kestrel X2</h3>
              <p className="text-stratosphere-silver text-base leading-relaxed text-justify font-body flex-grow">
                The Aircraft Built for One. Most aircraft are built for many. Kestrel X2 is built for you. A single-passenger eVTOL engineered from first principles where every gram, every watt, and every aerodynamic decision serves one purpose: getting one person there, reliably and safely.
              </p>
              <Link href="/kestrel-x2" className="inline-block text-horizon-cyan hover:text-cloud-white transition-colors text-sm font-semibold uppercase tracking-wider mt-4">
                Explore Full Specifications →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-horizon-cyan/10 to-transparent border border-horizon-cyan/30 rounded-lg p-8 backdrop-blur-sm transition-all duration-300 hover:border-horizon-cyan/50 flex flex-col">
              <h3 className="font-heading text-2xl font-bold text-horizon-cyan uppercase tracking-wide mb-4">Our Team</h3>
              <p className="text-stratosphere-silver text-base leading-relaxed text-justify font-body flex-grow">
                Founded on academic excellence and aerospace expertise. Our lean, highly motivated team combines cutting-edge first-principles engineering with direct mentorship from experienced aerospace faculty. We work on real-world aerospace systems, building the future of autonomous flight with precision and purpose.
              </p>
              <Link href="/about#team" className="inline-block text-horizon-cyan hover:text-cloud-white transition-colors text-sm font-semibold uppercase tracking-wider mt-4">
                Meet the Team →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LAMINAR SOFTWARE */}
      <section className="bg-orbital-blue py-20 px-6 lg:px-24 relative overflow-hidden border-y border-horizon-cyan/20">
        <div className="absolute top-12 right-4 opacity-[0.08] text-8xl md:text-9xl font-light pointer-events-none z-0">02</div>
        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div>
            <p className="text-stratosphere-silver text-xs font-bold uppercase tracking-widest mb-4">
              Software for autonomous urban airspace
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest text-cloud-white mb-6">
              LAMINAR UTM AI Co-Pilot
            </h2>
            <p className="text-stratosphere-silver text-base leading-relaxed text-justify mb-6">
              India&apos;s first cloud-based urban air traffic management platform with an integrated AI co-pilot.
            </p>
            <Link href="/laminar" className="inline-flex items-center px-8 py-3 border border-cloud-white text-cloud-white font-semibold uppercase tracking-wider rounded hover:bg-cloud-white hover:text-deep-space transition-colors">
              Read More
            </Link>
          </div>

          <Link
            href="/laminar"
            className="block border border-horizon-cyan/30 rounded-lg overflow-hidden bg-deep-space/50 shadow-2xl shadow-black/30 hover:border-horizon-cyan transition-colors"
          >
            <Image
              src="/laminar_dashboard.png"
              alt="LAMINAR UTM AI Co-Pilot dashboard map"
              width={1920}
              height={1080}
              className="w-full aspect-[16/9] object-cover object-left-top"
            />
          </Link>
        </div>
      </section>

      {/* SECTION 2: NEWS */}
      <section className="bg-deep-space py-20 px-6 lg:px-24 relative overflow-hidden">
        {/* Adjusted background number positioning to prevent side-clipping */}
        <div className="absolute top-12 right-4 opacity-[0.08] text-8xl md:text-9xl font-light pointer-events-none z-0">03</div>
        
        <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-widest text-cloud-white mb-12 text-center relative z-10">
          Newsroom
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch max-w-4xl mx-auto relative z-10">
          <a
            href="https://www.linkedin.com/posts/zephyradynamics_zephyradynamics-kestrelx2-evtol-activity-7431284149686067200-RzlU?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFuCngBz8eI5C1Z50qNwu-RFTP_iQCi5LQ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-horizon-cyan/30 rounded-lg overflow-hidden cursor-pointer hover:border-horizon-cyan transition-all duration-300 hover:shadow-lg hover:shadow-horizon-cyan/20"
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
            className="flex-1 border border-horizon-cyan/30 rounded-lg overflow-hidden cursor-pointer hover:border-horizon-cyan transition-all duration-300 hover:shadow-lg hover:shadow-horizon-cyan/20"
          >
            <img
              src="/inv.png"
              alt="Zephyra Dynamics News"
              className="w-full h-full object-cover"
            />
          </a>
        </div>
      </section>

      {/* SECTION 4: INDIA FOCUS */}
      <section className="bg-orbital-blue py-20 px-6 lg:px-24 relative overflow-hidden border-y border-horizon-cyan/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-stratosphere-silver text-xs font-bold uppercase tracking-widest mb-4 text-center">Built for India. Ready for the World.</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest text-cloud-white mb-8 text-center">
            India&apos;s Urban Sky is Open
          </h2>
          <p className="text-stratosphere-silver text-base leading-relaxed max-w-3xl mx-auto text-justify">
            India has 54 cities with populations exceeding one million. Its metropolitan areas rank among the most congested on Earth. The ground is full. The sky above every Indian city remains largely unclaimed.
          </p>
          <p className="text-cloud-white text-base leading-relaxed max-w-3xl mx-auto mt-6 text-justify">
            Zephyra Dynamics was conceived in India, for India with the scale, the regulatory landscape, and the density of Indian cities as the primary design constraint. Kestrel X2 is not a product adapted for India. It is a product that could only have come from India.
          </p>
        </div>
      </section>

      {/* SECTION 5: FINAL HOME CTA */}
      <section className="bg-deep-space py-16 px-6 lg:px-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-cloud-white mb-8">
            Be Part of What Comes Next
          </h2>
          <p className="text-stratosphere-silver text-base mb-10">
            Kestrel X2 is accepting expressions of interest from early access partners, institutional collaborators, and potential operators. The era of urban air mobility in India begins with a single seat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#footer" className="px-8 py-3 bg-horizon-cyan text-deep-space font-semibold uppercase tracking-wider rounded hover:bg-horizon-cyan/90 transition-colors">
              Request Early Access
            </Link>
            <Link href="/#footer" className="px-8 py-3 border border-horizon-cyan text-horizon-cyan font-semibold uppercase tracking-wider rounded hover:bg-horizon-cyan/10 transition-colors">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <ContactForm />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
