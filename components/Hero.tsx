import LoopVideo from '@/components/LoopVideo';
import { Button } from '@/components/ui';

/**
 * Landing hero: Kestrel X2 crossing Bengaluru at dawn, with the tagline
 * written into the sky above it. The only page-load motion on the site.
 * Phones get a portrait crop centred on Kestrel: tagline at the top, aircraft in the middle, actions at the bottom.
 */
export default function Hero() {
  return (
    <section className="relative isolate h-[min(94svh,980px)] min-h-[620px] overflow-hidden bg-[#DCD9DC]">
      <LoopVideo
        name="hero"
        mobileName="hero-mobile"
        eager
        label="Kestrel X2 flying over Bengaluru at dawn, the city still lit below"
        className="absolute inset-0 -z-10"
      />
      {/* keep the sky bright behind the type; the aircraft and city stay untouched */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[42%] bg-gradient-to-b from-sky/95 via-sky/70 to-transparent md:h-[62%] md:from-sky/85 md:via-sky/55"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[36%] bg-gradient-to-t from-sky/90 via-sky/55 to-transparent md:hidden" />

      <div className="mx-auto flex h-full max-w-[1440px] flex-col px-(--spacing-gutter) pt-[clamp(40px,9vh,110px)] pb-6 md:pb-8">
        <h1 className="font-wide rise max-w-[16ch] text-hero text-balance text-carbon">
          Shaping the future of Urban Air Mobility in India.
        </h1>
        {/* set straight on the image, no panel: the washes keep it readable */}
        <div className="rise rise-2 mt-auto max-w-[500px] md:mt-6">
          {/* phones show the tagline, the aircraft and the actions; the line stays for screen readers */}
          <p className="text-lede text-carbon max-md:sr-only">
            Zephyra Dynamics builds the aircraft, the airspace software and the virtual twin for
            electric, autonomous flight over Indian cities.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-7">
            <Button href="/kestrel-x2">Meet Kestrel X2</Button>
            <Button href="/#contact" variant="quiet">Partner with us</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
