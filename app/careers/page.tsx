'use client';

import Footer from "@/components/Footer";
import CareerApplyModal from "@/components/CareerApplyModal";
import { Rocket, Users, Zap, Wifi, TrendingUp, Globe } from "lucide-react";

const benefits = [
  {
    icon: Rocket,
    title: "Real Aerospace Projects",
    description: "Work on real-world aerospace projects from day one"
  },
  {
    icon: Users,
    title: "Talented Team",
    description: "Collaborate with a driven, multidisciplinary engineering team"
  },
  {
    icon: Zap,
    title: "Hands-On Experience",
    description: "Gain hands-on experience in eVTOL design and systems"
  },
  {
    icon: Wifi,
    title: "Remote Work",
    description: "Flexible, fully remote work environment"
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Opportunity to grow into full-time roles"
  },
  {
    icon: Globe,
    title: "Aerospace Revolution",
    description: "Be part of India's aerospace revolution"
  }
];

const positions = [
  {
    id: 1,
    title: "DGCA & Compliance Intern",
    description: "Support regulatory research, certification strategy, and compliance documentation aligned with aviation authorities.",
    responsibilities: [
      "Assist in understanding DGCA regulations and certification frameworks",
      "Support documentation for compliance and airworthiness",
      "Research global eVTOL certification standards (FAA, EASA, etc.)",
      "Work closely with systems and design teams to ensure regulatory alignment"
    ],
    requirements: [
      "Background in aerospace, aviation, or related field",
      "Strong interest in aviation regulations and certification",
      "Attention to detail and structured documentation skills",
      "Self-driven and capable of independent research"
    ]
  },
  {
    id: 2,
    title: "Systems Engineering Intern",
    description: "Involved in the systems-level design and integration of eVTOL aircraft, contributing to architecture development and system analysis.",
    responsibilities: [
      "Assist in system architecture and requirement definition",
      "Support system modeling, analysis, and trade studies",
      "Work on subsystem integration (propulsion, control, avionics)",
      "Contribute to technical documentation and reports"
    ],
    requirements: [
      "Aerospace or mechanical engineering background",
      "Understanding of systems engineering principles",
      "Familiarity with tools like MATLAB, Simulink, or similar is a plus",
      "Strong analytical and problem-solving skills"
    ]
  },
  {
    id: 3,
    title: "Design Intern",
    description: "Contribute to the conceptual and detailed design of aircraft components and structures for our eVTOL platforms.",
    responsibilities: [
      "Create and refine CAD models of aircraft components",
      "Support aerodynamic and structural design tasks",
      "Work on design iterations based on performance requirements",
      "Collaborate with systems and engineering teams"
    ],
    requirements: [
      "Experience with CAD tools (SolidWorks preferred)",
      "Basic understanding of aerospace design principles",
      "Creativity with strong attention to detail",
      "Ability to translate concepts into practical designs"
    ]
  }
];

export default function CareersPage() {
  return (
    <div className="flex flex-col bg-deep-space text-cloud-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 md:py-40">
        <div className="relative z-10 max-w-4xl">
          <p className="text-stratosphere-silver text-sm font-bold uppercase tracking-widest mb-4">Join Our Team</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-wide text-cloud-white mb-6">
            Careers at Zephyra Dynamics
          </h1>
          <p className="text-lg md:text-xl text-stratosphere-silver leading-relaxed max-w-3xl mx-auto">
            Build the future of urban air mobility. Join a fast-growing team of engineers and innovators working on Kestrel X2 and next-generation eVTOL systems.
          </p>
        </div>
      </section>

      {/* WHY JOIN US SECTION */}
      {/* Removed overflow-hidden from section to prevent modal clipping */}
      <section className="px-6 lg:px-24 py-20 max-w-6xl mx-auto w-full relative">
        {/* Safely contained background number */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-12 -left-12 opacity-[0.08] text-9xl font-light">01</div>
        </div>

        <div className="relative z-10 text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest text-cloud-white mb-4">
            Why Join Us
          </h2>
          <p className="text-stratosphere-silver text-lg max-w-2xl mx-auto">
            We are a fast-growing, ambitious team driven by engineering excellence, bold ideas, and a passion for aviation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-horizon-cyan/10 to-transparent border border-horizon-cyan/30 rounded-xl p-7 backdrop-blur-sm hover:border-horizon-cyan/60 transition-all duration-300 hover:shadow-lg hover:shadow-horizon-cyan/10 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-horizon-cyan/30 to-horizon-cyan/10 rounded-lg flex items-center justify-center mb-4 group-hover:from-horizon-cyan/40 group-hover:to-horizon-cyan/20 transition-all duration-300">
                  <IconComponent size={28} className="text-horizon-cyan" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg font-bold text-cloud-white mb-2 group-hover:text-horizon-cyan transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-stratosphere-silver text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-horizon-cyan to-transparent mx-auto max-w-5xl"></div>

      {/* OPEN POSITIONS */}
      {/* Removed overflow-hidden from section to prevent modal clipping */}
      <section className="px-6 lg:px-24 py-20 max-w-6xl mx-auto w-full relative">
        {/* Safely contained background number */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-12 -right-12 opacity-[0.08] text-9xl font-light">02</div>
        </div>

        <div className="relative z-10 text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest text-cloud-white mb-4">
            Open Positions
          </h2>
        </div>

        <div className="space-y-8 relative z-10">
          {positions.map((position, index) => (
            // Removed backdrop-blur-sm and added dynamic focus-within/hover z-indexes
            <div 
              key={position.id} 
              className="relative z-10 bg-orbital-blue/10 border border-horizon-cyan/30 rounded-xl p-8 lg:p-10 hover:border-horizon-cyan/50 transition-all duration-300 hover:z-[100] focus-within:z-[100]"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-8 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-horizon-cyan font-bold text-sm uppercase tracking-wider">Position {index + 1}</span>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-cloud-white mb-3">
                    {position.title}
                  </h3>
                  <p className="text-stratosphere-silver text-base leading-relaxed">
                    {position.description}
                  </p>
                </div>
                {/* Added massive CSS overrides to force constraints:
                  - Center the fixed container & add top padding (!pt-24) to clear the header
                  - Constrain the form bubble height (!max-h-[80vh]) and allow scrolling (!overflow-y-auto)
                  - Force z-index to 999999 so it covers the navbar
                */}
                <div className="mt-4 lg:mt-0 relative z-[999999] [&>button]:bg-horizon-cyan [&>button]:text-deep-space [&>button]:px-6 [&>button]:py-3 [&>button]:rounded-lg [&>button]:font-bold [&>button]:uppercase [&>button]:tracking-wide [&>button]:hover:bg-cyan-400 [&>button]:transition-colors [&>button]:shadow-lg [&_.fixed]:!z-[999999] [&_.fixed]:!flex [&_.fixed]:!flex-col [&_.fixed]:!items-center [&_.fixed]:!justify-center [&_.fixed]:!pt-24 [&_.fixed]:!pb-8 [&_.fixed_>_*]:!max-h-[80vh] [&_.fixed_>_*]:!overflow-y-auto [&_.fixed_>_*]:!w-full [&_.fixed_>_*]:!max-w-2xl">
                  <CareerApplyModal position={position} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-horizon-cyan font-bold uppercase text-sm tracking-wider mb-4">Key Responsibilities</h4>
                  <ul className="space-y-2">
                    {position.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex gap-3 text-stratosphere-silver text-sm">
                        <span className="text-horizon-cyan mt-1">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-horizon-cyan font-bold uppercase text-sm tracking-wider mb-4">Requirements</h4>
                  <ul className="space-y-2">
                    {position.requirements.map((req, idx) => (
                      <li key={idx} className="flex gap-3 text-stratosphere-silver text-sm">
                        <span className="text-horizon-cyan mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WORK MODE SECTION */}
      {/* Removed overflow-hidden from section to prevent modal clipping */}
      <section className="px-6 lg:px-24 py-20 max-w-6xl mx-auto w-full relative">
        {/* Safely contained background number */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-12 -left-12 opacity-[0.08] text-9xl font-light">03</div>
        </div>

        <div className="bg-gradient-to-br from-horizon-cyan/10 to-transparent border border-horizon-cyan/30 rounded-xl p-8 lg:p-12 backdrop-blur-sm relative z-10">
          <h2 className="font-heading text-3xl font-bold text-cloud-white mb-8">Work Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-horizon-cyan font-bold uppercase text-xs tracking-wider mb-2">Location</p>
              <p className="text-cloud-white text-lg">Remote</p>
            </div>
            <div>
              <p className="text-horizon-cyan font-bold uppercase text-xs tracking-wider mb-2">Position Type</p>
              <p className="text-cloud-white text-lg">Internship</p>
            </div>
            <div>
              <p className="text-horizon-cyan font-bold uppercase text-xs tracking-wider mb-2">Duration</p>
              <p className="text-cloud-white text-lg">Flexible</p>
            </div>
            <div>
              <p className="text-horizon-cyan font-bold uppercase text-xs tracking-wider mb-2">Commitment</p>
              <p className="text-cloud-white text-lg">Part-time/Full-time</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}