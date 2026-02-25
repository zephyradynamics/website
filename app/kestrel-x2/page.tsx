'use client';

import { useState, useEffect, useRef } from 'react';

const backgroundImages = [
  {
    image: '/ambulance.png',
    title: 'Air Ambulance',
    description: 'Emergency medical response'
  },
  {
    image: '/uber.png',
    title: 'Urban Air Taxi',
    description: 'On-demand passenger transport'
  },
  {
    image: '/personal.png',
    title: 'Personal Vehicle',
    description: 'Individual urban mobility solution'
  }
];

export default function KestrelX2Page() {
  const [showTitle, setShowTitle] = useState(true);
  const [showArrow, setShowArrow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const lines = [
    '> TECHNICAL_SPECIFICATIONS.SYS',
    '',
    '[GENERAL]',
    'MTOW........................292 kg',
    'Configuration...........Multi-rotor',
    'Passenger_Capacity..............1',
    '',
    '[PERFORMANCE]',
    'Endurance..............25 minutes',
    'Range.......................35 km',
    'Operational_Envelope........Urban',
    '',
    '[CONTROL_SYSTEM]',
    'Primary_Mode....Autonomous Flight',
    'Backup.....Emergency Manual Ctrl',
    'Power.....Redundant Distribution',
    '',
    '> System initialized successfully_'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false);
      setShowArrow(true);
    }, 5000);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowArrow(false);
      } else if (window.scrollY <= 50) {
        setTimeout(() => {
          if (window.scrollY <= 50) {
            setShowArrow(true);
          }
        }, 0);
      }

      // Trigger typewriter animation when scrolling to Technical Specifications
      const techSpecSection = document.getElementById('tech-specs');
      if (techSpecSection) {
        const rect = techSpecSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !hasAnimated) {
          setHasAnimated(true);
        } else if (!isVisible && hasAnimated) {
          // Reset animation when scrolling away
          setHasAnimated(false);
          setTypedText('');
          setCurrentLineIndex(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex(() => {
        // Generate random index from 0 to 2 (3 images)
        return Math.floor(Math.random() * backgroundImages.length);
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(imageInterval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!hasAnimated) return;

    if (currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];
      const currentText = typedText.split('\n')[currentLineIndex] || '';

      if (currentText.length < currentLine.length) {
        const timeout = setTimeout(() => {
          const newChar = currentLine[currentText.length];
          const allLines = typedText.split('\n');
          allLines[currentLineIndex] = (allLines[currentLineIndex] || '') + newChar;
          setTypedText(allLines.join('\n'));
        }, 50); // 50ms per character for slower typing

        return () => clearTimeout(timeout);
      } else {
        // Move to next line after a brief pause
        const timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setTypedText(prev => prev + '\n');
        }, 200);

        return () => clearTimeout(timeout);
      }
    }
  }, [hasAnimated, typedText, currentLineIndex, lines]);

  return (
    <div className="relative min-h-screen font-body bg-[#0A0A0A] text-white">
      
      {/* FIXED HERO SECTION */}
      <section className="fixed inset-0 flex items-center justify-center text-center overflow-hidden z-0">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/overview.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/75"></div>

        {/* Title Content - Fades out after 5 seconds */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
            showTitle ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative z-10 max-w-5xl px-6">
            <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-widest mb-6">
              KESTREL X2
            </h1>
            <p className="text-xl md:text-2xl text-[#BFC5CC] tracking-wide">
              Single Passenger Multi-Rotor eVTOL Prototype
            </p>
          </div>
        </div>

        {/* Animated Down Arrow - Appears after title fades */}
        <div 
          className={`absolute bottom-20 left-0 right-0 z-10 flex justify-center transition-opacity duration-1000 ${
            showArrow ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="animate-bounce">
            <svg 
              className="w-12 h-12 text-white drop-shadow-[0_0_15px_rgba(15,98,254,0.8)]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ filter: 'drop-shadow(0 0 10px rgba(15, 98, 254, 0.6)) drop-shadow(0 0 20px rgba(15, 98, 254, 0.4))' }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* SCROLLABLE CONTENT */}
      <div className="relative">
        {/* Spacer to push content down */}
        <div className="h-screen"></div>

        {/* OVERVIEW SECTION - Sticky */}
        <section className="sticky top-0 z-20 bg-gradient-to-b from-transparent via-[#0A0A0A]/95 to-[#0A0A0A] py-12 md:py-20 px-6 lg:px-24 min-h-screen flex items-start md:items-center overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full my-auto">
            {/* Overview Title - Unique Placement */}
            <div className="flex items-center justify-between mb-12 md:mb-20">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#0F62FE] to-transparent"></div>
              <h2 className="font-heading text-3xl md:text-6xl font-bold uppercase tracking-[0.3em] px-4 md:px-8 text-center">
                Overview
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#0F62FE] to-transparent"></div>
            </div>

            {/* Key Highlights - Centered Fade In/Out */}
            <div className="flex items-start justify-center min-h-[300px] mt-8">
              <div className="relative w-full max-w-2xl">
                <div className="absolute inset-0 flex items-start justify-center pt-12 animate-fade-loop delay-100">
                  <div className="text-center">
                    <h3 className="text-[#0F62FE] uppercase text-sm tracking-widest mb-2">Capacity</h3>
                    <p className="text-2xl md:text-3xl font-heading font-bold">Single Passenger</p>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-start justify-center pt-12 animate-fade-loop delay-200">
                  <div className="text-center">
                    <h3 className="text-[#0F62FE] uppercase text-sm tracking-widest mb-2">MTOW</h3>
                    <p className="text-2xl md:text-3xl font-heading font-bold">292 kg</p>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-start justify-center pt-12 animate-fade-loop delay-300">
                  <div className="text-center">
                    <h3 className="text-[#0F62FE] uppercase text-sm tracking-widest mb-2">Range</h3>
                    <p className="text-2xl md:text-3xl font-heading font-bold">35 km</p>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-start justify-center pt-12 animate-fade-loop delay-400">
                  <div className="text-center">
                    <h3 className="text-[#0F62FE] uppercase text-sm tracking-widest mb-2">Endurance</h3>
                    <p className="text-2xl md:text-3xl font-heading font-bold">25 minutes</p>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-start justify-center pt-12 animate-fade-loop delay-500">
                  <div className="text-center">
                    <h3 className="text-[#0F62FE] uppercase text-sm tracking-widest mb-2">Flight Mode</h3>
                    <p className="text-lg md:text-xl font-heading font-bold">Autonomous Flight Capability</p>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-start justify-center pt-12 animate-fade-loop delay-600">
                  <div className="text-center">
                    <h3 className="text-[#0F62FE] uppercase text-sm tracking-widest mb-2">Safety</h3>
                    <p className="text-lg md:text-xl font-heading font-bold">Emergency Manual Override</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* TECHNICAL SPECIFICATIONS - Sticky */}
      <section id="tech-specs" className="sticky top-0 z-30 py-20 px-6 lg:px-24 min-h-screen flex items-center relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/Zephyr One Rendered.jpg.jpeg')" }}
        ></div>
        
        {/* Dark Overlay to reduce brightness */}
        <div className="absolute inset-0 bg-black/85"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="font-mono text-sm text-white whitespace-pre-wrap">
            {typedText}
            {currentLineIndex < lines.length && (
              <span className="animate-pulse">█</span>
            )}
          </div>
        </div>
      </section>

      {/* FUTURE VARIANTS - Sticky */}
      <section className="sticky top-0 z-40 min-h-screen flex flex-col relative overflow-hidden">
        {/* Solid Background Base */}
        <div className="absolute inset-0 bg-[#0A0A0A]"></div>
        
        {/* Background Images - Rotating - Full Cover */}
        {backgroundImages.map((item, index) => (
          <div
            key={item.image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${item.image}')` }}
          />
        ))}
        
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Title at Top Center - Fixed */}
        <div className="relative z-10 pt-20 pb-8 flex justify-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest text-center text-white">
            Future Variants
          </h2>
        </div>

        {/* Spacer to push content */}
        <div className="flex-1"></div>
        
        {/* Tagline at Bottom - Associated with Image */}
        <div className="relative z-10 pb-12 px-6">
          {backgroundImages[currentImageIndex] && (
            <div className="text-center space-y-1">
              <h3 className="text-xl md:text-2xl font-heading font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {backgroundImages[currentImageIndex].title}
              </h3>
              <p className="text-base md:text-lg text-[#BFC5CC] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {backgroundImages[currentImageIndex].description}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* APPLICATIONS - Sticky - Reduced Size */}
      <section id="applications-section" className="sticky top-0 z-50 h-screen flex flex-col relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/application.png')" }}
        ></div>
        
        {/* Dark Overlay to reduce brightness */}
        <div className="absolute inset-0 bg-black/85"></div>

        {/* Fixed Title at Top */}
        <div className="relative z-10 pt-20 pb-6 flex justify-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-widest text-center text-white">
            Applications
          </h2>
        </div>

        {/* Scrolling Content Container */}
        <div className="relative z-10 flex-1 overflow-hidden flex items-center justify-center">
          {/* Applications - Fade In/Out like Overview */}
          <div className="relative w-full max-w-2xl min-h-[300px]">
            <div className="absolute inset-0 flex items-start justify-center pt-12 animate-fade-loop-app delay-100">
              <div className="text-center px-6">
                <h3 className="text-[#0F62FE] text-xl md:text-2xl font-heading font-bold mb-2">Personal Air Vehicle</h3>
                <p className="text-sm md:text-base text-[#BFC5CC] leading-relaxed">
                  Individual urban Mobility solution for personal transportation needs. 
                  Experience the freedom of point to point travel without traffic constraints.
                </p>
              </div>
            </div>

            <div className="absolute inset-0 flex items-start justify-center pt-12 animate-fade-loop-app delay-200">
              <div className="text-center px-6">
                <h3 className="text-[#0F62FE] text-xl md:text-2xl font-heading font-bold mb-2">Urban Air Taxi</h3>
                <p className="text-sm md:text-base text-[#BFC5CC] leading-relaxed">
                  On demand passenger transport service for efficient city commuting.
                  Revolutionizing urban transportation with autonomous aerial Mobility.
                </p>
              </div>
            </div>

            <div className="absolute inset-0 flex items-start justify-center pt-12 animate-fade-loop-app delay-300">
              <div className="text-center px-6">
                <h3 className="text-[#0F62FE] text-xl md:text-2xl font-heading font-bold mb-2">Air Ambulance Variant</h3>
                <p className="text-sm md:text-base text-[#BFC5CC] leading-relaxed">
                  Emergency medical response system for rapid patient transport.
                  Saving lives through swift aerial emergency medical services.
                </p>
              </div>
            </div>

            <div className="absolute inset-0 flex items-start justify-center pt-12 animate-fade-loop-app delay-400">
              <div className="text-center px-6">
                <h3 className="text-[#0F62FE] text-xl md:text-2xl font-heading font-bold mb-2">Special Mission Configurations</h3>
                <p className="text-sm md:text-base text-[#BFC5CC] leading-relaxed">
                  Customized platforms for defense, surveillance, and specialized operations.
                  Adaptable solutions for mission critical aerial requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
