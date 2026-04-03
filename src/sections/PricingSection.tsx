import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface PricingSectionProps {
  className?: string;
}

const tiers = [
  {
    name: 'Essential',
    price: '$59',
    unit: '/ wash',
    description: 'Exterior 4-stage',
    features: [
      'Pre-rinse & snow foam',
      'Two-bucket hand wash',
      'Wheel & tire cleaning',
      'Dry & detail finish',
    ],
    cta: 'Choose Essential',
    popular: false,
  },
  {
    name: 'Signature',
    price: '$89',
    unit: '/ wash',
    description: 'Exterior + interior',
    features: [
      'Everything in Essential',
      'Interior vacuum & wipe',
      'Glass & mirror cleaning',
      'Dashboard & console detail',
    ],
    cta: 'Choose Signature',
    popular: true,
  },
  {
    name: 'Concierge',
    price: '$129',
    unit: '/ wash',
    description: 'Full detail + protection',
    features: [
      'Everything in Signature',
      'Polymer sealant application',
      'Leather conditioning',
      'Priority scheduling',
    ],
    cta: 'Choose Concierge',
    popular: false,
  },
];

export default function PricingSection({ className = '' }: PricingSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const cardElements = cards.querySelectorAll('.pricing-card');

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards animation
      gsap.fromTo(cardElements,
        { y: 60, opacity: 0, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
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
      id="pricing"
      className={`relative bg-luxury-bg py-20 lg:py-28 ${className}`}
    >
      {/* Subtle radial gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(45, 107, 255, 0.06) 0%, transparent 60%)'
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-heading font-black text-section text-luxury-text uppercase mb-4">
            MEMBERSHIP TIERS
          </h2>
          <p className="text-lg text-luxury-text-secondary max-w-md mx-auto">
            Weekly care, locked-in pricing, priority scheduling.
          </p>
        </div>

        {/* Pricing Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card relative bg-luxury-bg-secondary border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                tier.popular 
                  ? 'border-luxury-accent/40 shadow-glow' 
                  : 'border-luxury-text/10 hover:border-luxury-text/20'
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-luxury-accent text-white font-mono text-[10px] tracking-[0.14em] px-3 py-1 rounded-pill">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Tier name */}
              <h3 className="font-heading font-bold text-xl text-luxury-text uppercase tracking-[0.04em] mb-2">
                {tier.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-heading font-black text-4xl text-luxury-text">
                  {tier.price}
                </span>
                <span className="text-luxury-text-secondary text-sm">
                  {tier.unit}
                </span>
              </div>

              {/* Description */}
              <p className="text-luxury-text-secondary text-sm mb-6">
                {tier.description}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-luxury-text/10 mb-6" />

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-luxury-accent mt-0.5 flex-shrink-0" />
                    <span className="text-luxury-text-secondary text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={scrollToContact}
                className={`w-full font-heading font-semibold text-xs tracking-[0.08em] py-3 rounded-pill btn-luxury group ${
                  tier.popular
                    ? 'bg-luxury-accent hover:bg-luxury-accent/90 text-white'
                    : 'bg-transparent border border-luxury-text/20 text-luxury-text hover:bg-luxury-text hover:text-luxury-bg'
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
