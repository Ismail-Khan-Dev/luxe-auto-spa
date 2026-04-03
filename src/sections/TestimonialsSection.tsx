import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialsSectionProps {
  className?: string;
}

const testimonials = [
  {
    quote: "They treat the car like it's their own. Zero swirl marks. Always on time.",
    name: 'A. R.',
    role: 'Collector',
    image: '/testimonial_car_01.jpg',
  },
  {
    quote: "Best mobile detail I've used. Booking takes 30 seconds.",
    name: 'M. S.',
    role: 'Product Manager',
    image: '/testimonial_car_02.jpg',
  },
  {
    quote: "Our fleet stays spotless without leaving the lot.",
    name: 'J. T.',
    role: 'Fleet Lead',
    image: '/testimonial_car_03.jpg',
  },
];

export default function TestimonialsSection({ className = '' }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const cardElements = cards.querySelectorAll('.testimonial-card');
    const images = cards.querySelectorAll('.testimonial-image');

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
        { y: 70, opacity: 0, rotateZ: -1 },
        {
          y: 0,
          opacity: 1,
          rotateZ: 0,
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

      // Images parallax
      images.forEach((img) => {
        gsap.fromTo(img,
          { y: 10 },
          {
            y: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-luxury-bg py-20 lg:py-28 ${className}`}
    >
      <div className="relative z-10 px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-heading font-black text-section text-luxury-text uppercase mb-4">
            TRUSTED BY OWNERS
          </h2>
          <p className="text-lg text-luxury-text-secondary max-w-md mx-auto">
            Fleet managers, collectors, and daily drivers.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card relative bg-luxury-bg-secondary border border-luxury-text/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-luxury-text/20"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-luxury-accent/30 mb-4" />

              {/* Quote text */}
              <p className="text-luxury-text leading-relaxed mb-8 min-h-[80px]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-heading font-bold text-luxury-text">
                    {testimonial.name}
                  </p>
                  <p className="font-mono text-label text-luxury-text-secondary">
                    {testimonial.role}
                  </p>
                </div>

                {/* Image */}
                <div className="testimonial-image w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name}'s vehicle`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
