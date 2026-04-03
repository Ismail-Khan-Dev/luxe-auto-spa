import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface CoverageSectionProps {
  className?: string;
}

const locations = [
  'Downtown / Financial District',
  'Midtown / Design District',
  'Airport / Corporate Campuses',
];

export default function CoverageSection({ className = '' }: CoverageSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const card = cardRef.current;
    const label = labelRef.current;
    const title = titleRef.current;
    const body = bodyRef.current;
    const locationsEl = locationsRef.current;
    const cta = ctaRef.current;

    if (!section || !bg || !card || !label || !title || !body || !locationsEl || !cta) return;

    const locationItems = locationsEl.querySelectorAll('.location-item');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Phase 1 (0%-30%): Entrance
      scrollTl.fromTo(bg,
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(card,
        { x: '55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(label,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      scrollTl.fromTo(title,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.08
      );

      scrollTl.fromTo(body,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.12
      );

      scrollTl.fromTo(locationItems,
        { x: 24, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
        0.15
      );

      scrollTl.fromTo(cta,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.22
      );

      // Phase 2 (30%-70%): Settle

      // Phase 3 (70%-100%): Exit
      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '40vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(bg,
        { opacity: 1, scale: 1 },
        { opacity: 0.65, scale: 1.04, ease: 'power2.in' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="coverage"
      className={`pinned-section ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/aerial_city_night.jpg"
          alt="Aerial city view at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-luxury-bg/70 via-luxury-bg/30 to-luxury-bg/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-end px-6 lg:px-[6vw]">
        {/* Coverage Card */}
        <div
          ref={cardRef}
          className="process-card w-full max-w-[42vw] min-h-[58vh] p-8 lg:p-10 animate-card-breathe max-lg:max-w-[88vw] max-lg:mx-auto max-lg:mt-[12vh]"
        >
          {/* Label */}
          <span
            ref={labelRef}
            className="font-mono text-label text-luxury-accent block mb-4"
          >
            SERVICE AREA
          </span>

          {/* Title */}
          <h2
            ref={titleRef}
            className="font-heading font-black text-section text-luxury-text uppercase mb-6"
          >
            COVERAGE MAP
          </h2>

          {/* Body */}
          <p
            ref={bodyRef}
            className="text-luxury-text-secondary leading-relaxed mb-8"
          >
            We operate across the metro with fully equipped vans. Same-week availability in most zones.
          </p>

          {/* Locations */}
          <div ref={locationsRef} className="space-y-4 mb-10">
            {locations.map((location, index) => (
              <div
                key={index}
                className="location-item flex items-center gap-3 text-luxury-text"
              >
                <MapPin className="w-4 h-4 text-luxury-accent flex-shrink-0" />
                <span className="font-medium">{location}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef}>
            <Button
              onClick={scrollToContact}
              variant="outline"
              className="border-luxury-text/20 text-luxury-text hover:bg-luxury-text hover:text-luxury-bg font-heading font-semibold text-xs tracking-[0.08em] px-6 py-2.5 rounded-pill btn-luxury group"
            >
              Check My Address
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
