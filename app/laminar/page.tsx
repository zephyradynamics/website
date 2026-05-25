import { Activity, Building2, Cloud, Gauge, Map, PlugZap, RadioTower, Route, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const capabilities = [
  {
    title: 'Cloud UTM Platform',
    description: 'Manage urban aircraft, vertiports, corridors, advisories, and operator workflows from a cloud-based traffic management layer.',
    icon: Cloud,
  },
  {
    title: 'AI Conflict Resolution',
    description: 'Detect separation conflicts, evaluate safe options, and auto-resolve traffic conflicts through the integrated AI co-pilot.',
    icon: ShieldCheck,
  },
  {
    title: 'Easy Infrastructure Onboarding',
    description: 'Bring eVTOL aircraft, vertiports, and other urban air mobility infrastructure into the network with a scalable onboarding model.',
    icon: PlugZap,
  },
];

export default function LaminarPage() {
  return (
    <div className="font-body bg-deep-space text-cloud-white">
      <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-28 pb-16 lg:px-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,174,239,0.18),transparent_34%),linear-gradient(135deg,#050D14_0%,#0A1628_48%,#0D2B55_100%)]" />
        <div className="absolute inset-0 bg-deep-space/30" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 items-center">
          <div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-widest leading-tight mb-6">
              LAMINAR UTM AI Co-Pilot
            </h1>
            <p className="text-stratosphere-silver text-base md:text-lg leading-relaxed text-justify mb-8 max-w-2xl">
              LAMINAR is India&apos;s first urban air traffic management cloud-based platform by Zephyra Dynamics. It is integrated with an AI co-pilot that detects conflicts and automatically resolves them, while making it easy to onboard urban air infrastructure including eVTOL aircraft and vertiports.
            </p>
          </div>

          <div className="border border-horizon-cyan/30 rounded-lg overflow-hidden bg-deep-space/70 shadow-2xl shadow-black/40">
            <Image
              src="/laminar_dashboard.png"
              alt="LAMINAR live fleet dashboard over Bengaluru"
              width={1920}
              height={1080}
              className="w-full aspect-[16/9] object-cover object-left-top"
            />
          </div>
        </div>
      </section>

      <section className="bg-deep-space py-20 px-6 lg:px-24 relative overflow-hidden">
        <div className="absolute top-12 left-4 opacity-[0.08] text-8xl md:text-9xl font-light pointer-events-none">01</div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest text-cloud-white mb-12 text-center">
            Built For Airspace Operators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map(({ title, description, icon: Icon }) => (
              <div key={title} className="bg-gradient-to-br from-horizon-cyan/10 to-transparent border border-horizon-cyan/30 rounded-lg p-7 backdrop-blur-sm">
                <div className="w-11 h-11 rounded border border-horizon-cyan/40 bg-horizon-cyan/10 flex items-center justify-center text-horizon-cyan mb-6">
                  <Icon size={22} />
                </div>
                <h3 className="font-heading text-xl font-bold text-horizon-cyan uppercase tracking-wide mb-4">{title}</h3>
                <p className="text-stratosphere-silver text-sm leading-relaxed text-justify">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-orbital-blue py-20 px-6 lg:px-24 border-y border-horizon-cyan/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="border border-horizon-cyan/30 rounded-lg overflow-hidden bg-deep-space/60 shadow-2xl shadow-black/30">
            <Image
              src="/laminar_traffic.png"
              alt="LAMINAR traffic advisory interface"
              width={1920}
              height={1080}
              className="w-full aspect-[16/9] object-cover object-left-top"
            />
          </div>
          <div>
            <p className="text-stratosphere-silver text-xs font-bold uppercase tracking-widest mb-4">
              From infrastructure to airspace
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest text-cloud-white mb-6">
              Built To Onboard The Urban Sky
            </h2>
            <p className="text-stratosphere-silver text-base leading-relaxed text-justify mb-6">
              LAMINAR is designed as the operating layer for future Indian cities where aircraft, vertiports, corridors, and operators need to connect into one coordinated traffic management system. It gives Zephyra a software foundation that can scale beyond one vehicle and support the wider urban air mobility network.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Activity className="mt-1 text-horizon-cyan" size={18} />
                <p className="text-cloud-white text-sm leading-relaxed">Live operational views for aircraft, routes, statuses, and advisory events.</p>
              </div>
              <div className="flex items-start gap-3">
                <Gauge className="mt-1 text-horizon-cyan" size={18} />
                <p className="text-cloud-white text-sm leading-relaxed">AI-backed decision metrics for timing, altitude, speed, and severity.</p>
              </div>
              <div className="flex items-start gap-3">
                <RadioTower className="mt-1 text-horizon-cyan" size={18} />
                <p className="text-cloud-white text-sm leading-relaxed">Designed for control rooms, operators, and future vertiport networks.</p>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="mt-1 text-horizon-cyan" size={18} />
                <p className="text-cloud-white text-sm leading-relaxed">Structured onboarding for eVTOL aircraft, vertiports, and city-scale infrastructure.</p>
              </div>
              <div className="flex items-start gap-3">
                <Map className="mt-1 text-horizon-cyan" size={18} />
                <p className="text-cloud-white text-sm leading-relaxed">Corridor-aware traffic management for dense urban movement.</p>
              </div>
              <div className="flex items-start gap-3">
                <Route className="mt-1 text-horizon-cyan" size={18} />
                <p className="text-cloud-white text-sm leading-relaxed">Resolution paths for climb, speed, and route-offset decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-deep-space py-16 px-6 lg:px-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-cloud-white mb-6">
            Partner With Us
          </h2>
          <p className="text-stratosphere-silver text-base mb-10">
            Collaborate with Zephyra Dynamics to help shape the next generation of urban air traffic management.
          </p>
          <a
            href="https://forms.gle/eVopJbt9MQWX99MU7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 border border-cloud-white text-cloud-white font-semibold uppercase tracking-wider rounded hover:bg-cloud-white hover:text-deep-space transition-colors"
          >
            Partner With Us
          </a>
        </div>
      </section>
    </div>
  );
}
