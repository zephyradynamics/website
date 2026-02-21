import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col font-body">
      
      {/* HERO SECTION */}
      <Hero 
        videoSrc="/hero.mp4"
        heading="Shaping the Future of Urban air mobility"
        subheading="Sustainable Air Mobility for Modern Cities"
        ctaButtons={[
          {
            label: 'Explore Estral X2',
            href: '/estral-x2',
            variant: 'primary'
          }
        ]}
        overlayOpacity={0.4}
      />

      {/* ABOUT AND FOOTER CONTAINER */}
      <div className="relative">
        {/* SECTION 2: ABOUT - Fixed/Static Background */}
        <section id="about" className="sticky top-0 bg-[#0A0A0A] h-screen flex flex-col lg:flex-row items-center gap-16 px-6 lg:px-24">
          <div className="flex-1 space-y-8">
            <h2 className="font-heading text-4xl font-bold uppercase tracking-widest">
              About Zephyra Dynamics {/* [cite: 44] */}
            </h2>
            <p className="text-[#BFC5CC] text-lg leading-relaxed max-w-xl">
              Zephyra Dynamics is India's emerging aerospace startup focused on electric vertical take-off and landing aircraft for intra-city mobility. {/* [cite: 45] */}
            </p>
            <p className="text-white text-xl font-medium border-l-4 border-[#0F62FE] pl-6">
              We are building the future of urban air transportation—safe, autonomous, and sustainable. {/* [cite: 46] */}
            </p>
          </div>
          <div className="flex-1 w-full aspect-square bg-[#0A0A0A] border border-gray-800 flex items-center justify-center overflow-hidden">
             <img 
               src="/Zephyr One Rendered.png" 
               alt="Zephyra Dynamics Aircraft" 
               className="w-full h-full object-cover"
             />
          </div>
        </section>

        {/* Spacer to push footer down */}
        <div className="h-screen"></div>

        {/* FOOTER - Scrolls over About section */}
        <div className="relative z-20">
          <Footer />
        </div>
      </div>
    </div>
  );
}