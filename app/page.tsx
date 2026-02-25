import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

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

      {/* SECTION 2: ABOUT */}
      <section id="about" className="bg-[#0A0A0A] min-h-screen flex flex-col lg:flex-row items-center gap-16 px-6 lg:px-24 py-16">
        <div className="flex-1 space-y-8">
          <h2 className="font-heading text-4xl font-bold uppercase tracking-widest text-white">
            About Zephyra Dynamics
          </h2>
          <p className="text-[#BFC5CC] text-lg leading-relaxed max-w-xl">
            Zephyra Dynamics is India's emerging aerospace startup focused on electric vertical take-off and landing aircraft for intra-city mobility.
          </p>
          <p className="text-white text-xl font-medium border-l-4 border-[#0F62FE] pl-6">
            We are building the future of urban air transportation, which is safe, autonomous, and sustainable.
          </p>
        </div>
        <div className="flex-1 w-full aspect-square bg-[#0A0A0A] border border-gray-800 flex items-center justify-center overflow-hidden">
          <img 
            src="/about_section.png" 
            alt="Zephyra Dynamics Aircraft" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* SECTION 3: COMING SOON / PRE-BOOKING */}
      <section id="coming-soon" className="bg-[#0A0A0A] min-h-screen flex items-center justify-center px-6 lg:px-24 py-16 relative overflow-hidden">
        {/* Background Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#0F62FE]/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-[#0F62FE]/15 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-[#0F62FE]/8 rounded-full blur-2xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-[#0F62FE]/12 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Content Bubble */}
        <div className="max-w-4xl w-full relative z-10">
          <div className="bg-gradient-to-br from-[#0F62FE]/5 to-transparent backdrop-blur-sm border border-[#0F62FE]/20 rounded-3xl p-8 lg:p-12 shadow-2xl text-center">
            <div className="space-y-6 md:space-y-8">
              <h2 className="font-heading text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-widest text-white">
                Pre-Book
              </h2>
              
              <p className="text-white/90 text-lg md:text-2xl lg:text-3xl leading-relaxed max-w-3xl mx-auto">
                Be among the first to experience the future of urban air mobility.
              </p>
              
              <div className="inline-block px-8 py-3 font-semibold tracking-wider transition-all duration-300 border-2 border-white bg-transparent text-white">
                <span className="text-white">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}