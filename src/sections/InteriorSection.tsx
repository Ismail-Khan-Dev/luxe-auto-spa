import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface InteriorSectionProps {
  className?: string;
}

const features = [
  'Steam & extract carpets & upholstery',
  'Leather clean + conditioner',
  'Vents, crevices, glass, scent',
];

export default function InteriorSection({ className = '' }: InteriorSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const card = cardRef.current;
    const label = labelRef.current;
    const title = titleRef.current;
    const featuresEl = featuresRef.current;
    const cta = ctaRef.current;

    if (!section || !bg || !card || !label || !title || !featuresEl || !cta) return;

    const featureItems = featuresEl.querySelectorAll('.feature-item');

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
        { x: '-12vw', opacity: 0, scale: 1.06 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
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

      scrollTl.fromTo(featureItems,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
        0.12
      );

      scrollTl.fromTo(cta,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.20
      );

      // Phase 2 (30%-70%): Settle

      // Phase 3 (70%-100%): Exit
      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '40vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(bg,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0.7, ease: 'power2.in' },
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
      id="services"
      className={`pinned-section ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/interior_driver_seat.jpg"
          alt="Luxury car interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-luxury-bg/60 via-transparent to-luxury-bg/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-end px-6 lg:px-[6vw]">
        {/* Interior Card */}
        <div
          ref={cardRef}
          className="process-card w-full max-w-[42vw] min-h-[58vh] p-8 lg:p-10 animate-card-breathe max-lg:max-w-[88vw] max-lg:mx-auto max-lg:mt-[12vh]"
        >
          {/* Label */}
          <span
            ref={labelRef}
            className="font-mono text-label text-luxury-accent block mb-4"
          >
            INSIDE OUT
          </span>

          {/* Title */}
          <h2
            ref={titleRef}
            className="font-heading font-black text-section text-luxury-text uppercase mb-8"
          >
            INTERIOR REVIVAL
          </h2>

          {/* Features */}
          <div ref={featuresRef} className="space-y-5 mb-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-item flex items-start gap-4 text-luxury-text-secondary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-luxury-accent mt-2 flex-shrink-0" />
                <span className="font-medium">{feature}</span>
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
              Add Interior
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
