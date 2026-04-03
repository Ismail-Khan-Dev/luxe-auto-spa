import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
  onBookClick: () => void;
}

export default function HeroSection({ className = '', onBookClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const microCtaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const microCta = microCtaRef.current;
    const cta = ctaRef.current;
    const badge = badgeRef.current;

    if (!section || !bg || !headline || !subheadline || !microCta || !cta || !badge) return;

    const ctx = gsap.context(() => {
      // Split headline into characters for dramatic reveal
      const text = headline.innerText;
      headline.innerHTML = text
        .split('')
        .map((char) =>
          char === ' '
            ? '<span class="inline-block">&nbsp;</span>'
            : `<span class="char inline-block overflow-hidden"><span class="char-inner inline-block">${char}</span></span>`
        )
        .join('');
      const charElements = headline.querySelectorAll('.char-inner');

      // Auto-play entrance animation timeline
      const entranceTl = gsap.timeline({ delay: 0.3 });

      // Background entrance with parallax
      entranceTl.fromTo(
        bg,
        { opacity: 0, scale: 1.1, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power2.out' },
        0
      );

      // Badge entrance
      entranceTl.fromTo(
        badge,
        { y: -20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        0.3
      );

      // Character-by-character headline reveal
      entranceTl.fromTo(
        charElements,
        { y: '100%', opacity: 0, rotateX: -90 },
        {
          y: '0%',
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power3.out',
        },
        0.4
      );

      // Subheadline entrance
      entranceTl.fromTo(
        subheadline,
        { y: 30, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
        0.9
      );

      // CTA button entrance
      entranceTl.fromTo(
        cta,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
        1.1
      );

      // Micro CTA entrance
      entranceTl.fromTo(
        microCta,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        1.3
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.8,
          onLeaveBack: () => {
            // Reset elements when scrolling back to top
            gsap.set([headline, subheadline, cta, microCta, badge], { opacity: 1, y: 0, x: 0 });
            gsap.set(bg, { opacity: 1, scale: 1, y: 0 });
          },
        },
      });

      // Phase 3 (70%-100%): Exit with staggered motion
      scrollTl.fromTo(
        headline,
        { y: 0, opacity: 1 },
        { y: '-25vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        badge,
        { y: 0, opacity: 1 },
        { y: '-15vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        subheadline,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        cta,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.76
      );

      scrollTl.fromTo(
        microCta,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.78
      );

      scrollTl.fromTo(
        bg,
        { scale: 1, opacity: 1, y: 0 },
        { scale: 1.08, opacity: 0.6, y: '-5vh', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`pinned-section ${className}`}>
      {/* Background Image with parallax */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0 }}>
        <img
          src="/hero_car_front.jpg"
          alt="Luxury car showroom finish"
          className="w-full h-full object-cover"
        />
        {/* Multi-layer gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, rgba(11,12,15,0.3) 0%, rgba(11,12,15,0) 30%, rgba(11,12,15,0) 70%, rgba(11,12,15,0.7) 100%),
              radial-gradient(ellipse at center, transparent 0%, rgba(11,12,15,0.4) 100%)
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        {/* Trust Badge */}
        <div
          ref={badgeRef}
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full bg-luxury-accent/10 border border-luxury-accent/30"
          style={{ opacity: 0 }}
        >
          <Sparkles className="w-4 h-4 text-luxury-accent" />
          <span className="font-mono text-label text-luxury-accent">
            PREMIUM MOBILE DETAILING
          </span>
        </div>

        {/* Headline with character animation */}
        <h1
          ref={headlineRef}
          className="font-heading font-black text-hero text-luxury-text uppercase text-center max-w-[85vw]"
          style={{ perspective: '1000px' }}
        >
          SHOWROOM FINISH
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-8 text-lg lg:text-xl text-luxury-text-secondary text-center max-w-[min(52vw,640px)] leading-relaxed"
          style={{ opacity: 0 }}
        >
          Premium mobile detailing at your home or office. No tunnels. No scratches. Just gloss.
        </p>

        {/* CTA Button */}
        <div ref={ctaRef} className="mt-10" style={{ opacity: 0 }}>
          <MagneticButton
            onClick={onBookClick}
            className="bg-luxury-accent text-white font-heading font-semibold text-sm tracking-[0.08em] px-10 py-4 rounded-pill"
            strength={0.4}
          >
            Book Now
          </MagneticButton>
        </div>

        {/* Micro CTA */}
        <div
          ref={microCtaRef}
          className="absolute bottom-[12vh] flex flex-col items-center gap-3"
          style={{ opacity: 0 }}
        >
          <span className="font-mono text-label text-luxury-text-secondary/70">
            Scroll to explore
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-luxury-text-secondary/30 flex items-start justify-center p-2">
            <ChevronDown className="w-3 h-3 text-luxury-text-secondary/50 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
