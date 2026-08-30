'use client';

import { useState, useEffect } from 'react';

const backgroundImages = [
  {
    image: '/ambulance.png',
    title: 'Air Ambulance',
    description: 'Emergency medical response'
  },
  // Removed the urban air taxi (uber.png) variant as requested
  {
    image: '/personal.png',
    title: 'Personal Vehicle',
    description: 'Individual urban mobility solution'
  }
];

// Restored your original technical data into the bubble layout
const keySpecs = [
  {
    label: 'MTOW',
    value: '292 kg',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
  },
  {
    label: 'Configuration',
    value: 'Multi-rotor',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
  },
  {
    label: 'Passenger Capacity',
    value: '1',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  },
  {
    label: 'Endurance',
    value: '25 minutes',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  },
  {
    label: 'Range',
    value: '35 km',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
  },
  {
    label: 'Primary Mode',
    value: 'Autonomous',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  }
];

export default function KestrelX2Page() {
  const [showTitle, setShowTitle] = useState(true);
  const [showArrow, setShowArrow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        // Generate random index based on array length
        return Math.floor(Math.random() * backgroundImages.length);
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(imageInterval);
  }, []);

  return (
    <div className="relative font-body bg-deep-space text-cloud-white">
      {/* NORMAL FLOW HERO SECTION */}
      <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
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
        
        {/* Dark Overlay - Set to 80% to reduce brightness for text visibility */}
        <div className="absolute inset-0 bg-deep-space/80"></div>

        {/* Title Content - Fades out after 5 seconds */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
            showTitle ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative z-10 max-w-5xl px-6">
            {/* Updated to match the home page style: font-body, text-4xl/6xl, normal case */}
            <h1 className="font-body text-4xl md:text-6xl font-bold tracking-wide mb-6 leading-tight drop-shadow-2xl text-white">
              Engineered for One<br />Perfected for All
            </h1>
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
              className="w-12 h-12 text-cloud-white drop-shadow-[0_0_15px_rgba(0,174,239,0.8)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ filter: 'drop-shadow(0 0 10px rgba(0, 174, 239, 0.6)) drop-shadow(0 0 20px rgba(0, 174, 239, 0.4))' }}
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

      {/* SCROLLABLE CONTENT CONTAINER */}
      <div className="relative w-full">

        {/* TECHNICAL SPECIFICATIONS (NEW BUBBLE DESIGN) */}
        <section id="tech-specs" className="w-full py-24 px-6 lg:px-12 min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-deep-space font-sans">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/Zephyr One Rendered.jpg.jpeg')" }}
          ></div>
          
          {/* Dark Overlay - Set to 80% to reduce brightness for text visibility */}
          <div className="absolute inset-0 bg-deep-space/80"></div>

          <div className="w-full max-w-screen-2xl mx-auto relative z-10 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center tracking-wide drop-shadow-lg">
              Key Specifications
            </h2>

            {/* Bubble Grid Container - Expanded full width and increased gap */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 w-full">
              {keySpecs.map((spec, index) => (
                <div 
                  key={index}
                  className="bg-white/5 hover:bg-white/10 transition-colors duration-300 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center space-x-5 shadow-2xl"
                >
                  {/* Icon Box */}
                  <div className="bg-white/10 p-4 rounded-xl flex-shrink-0 text-gray-200">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {spec.icon}
                    </svg>
                  </div>
                  
                  {/* Text Details */}
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-semibold mb-1">
                      {spec.label}
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                      {spec.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FUTURE VARIANTS */}
        <section className="w-full min-h-screen flex flex-col relative overflow-hidden bg-deep-space">
          {/* Solid Background Base */}
          <div className="absolute inset-0 bg-deep-space"></div>

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

          {/* Dark Overlay - Set to 80% to reduce brightness for text visibility */}
          <div className="absolute inset-0 bg-deep-space/80"></div>

          {/* Title at Top Center - Fixed */}
          <div className="relative z-10 pt-20 pb-8 flex justify-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest text-center text-cloud-white drop-shadow-lg">
              Future Variants
            </h2>
          </div>

          {/* Spacer to push content */}
          <div className="flex-1"></div>

          {/* Tagline at Bottom - Associated with Image */}
          <div className="relative z-10 pb-12 px-6">
            {backgroundImages[currentImageIndex] && (
              <div className="text-center space-y-1">
                <h3 className="text-xl md:text-2xl font-heading font-semibold text-cloud-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                  {backgroundImages[currentImageIndex].title}
                </h3>
                <p className="text-base md:text-lg text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                  {backgroundImages[currentImageIndex].description}
                </p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}