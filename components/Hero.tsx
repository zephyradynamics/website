'use client';

import Link from 'next/link';

interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface HeroProps {
  videoSrc: string;
  heading: string;
  subheading?: string;
  ctaButtons?: CTAButton[];
  overlayOpacity?: number;
  minHeight?: string;
}

export default function Hero({
  videoSrc,
  heading,
  subheading,
  ctaButtons,
  overlayOpacity = 0.5,
  minHeight = '100vh',
}: HeroProps) {
  const handleButtonClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      className="relative flex flex-col items-center justify-center text-center px-6"
      style={{ minHeight }}
    >
      {/* Video Background with reduced brightness */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20 brightness-50"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Dark Overlay for text readability */}
      <div 
        className="absolute inset-0 bg-black -z-10"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl">
        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white">
          {heading}
        </h1>
        
        {subheading && (
          <p className="mt-8 text-lg md:text-xl lg:text-2xl font-body font-normal tracking-wider max-w-3xl mx-auto text-white/95 leading-relaxed">
            {subheading}
          </p>
        )}

        {/* CTA Buttons */}
        {ctaButtons && ctaButtons.length > 0 && (
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center cta-buttons">
            {ctaButtons.map((button, index) => (
              button.href.startsWith('#') ? (
                <button
                  key={index}
                  onClick={() => handleButtonClick(button.href)}
                  className={`
                    px-8 py-3 font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer
                    ${button.variant === 'primary' 
                      ? 'border-2 border-white bg-transparent text-white hover:bg-white/10 animate-pulseGlow hover:border-[#0F62FE]' 
                      : 'border-2 border-white text-white hover:bg-white hover:text-black'
                    }
                  `}
                >
                  {button.label}
                </button>
              ) : (
                <Link
                  key={index}
                  href={button.href}
                  className={`
                    px-8 py-3 font-semibold tracking-wider uppercase transition-all duration-300
                    ${button.variant === 'primary' 
                      ? 'border-2 border-white bg-transparent text-white hover:bg-white/10 animate-pulseGlow hover:border-[#0F62FE]' 
                      : 'border-2 border-white text-white hover:bg-white hover:text-black'
                    }
                  `}
                >
                  {button.label}
                </Link>
              )
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
