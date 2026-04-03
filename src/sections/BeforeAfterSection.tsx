import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveHorizontal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BeforeAfterSectionProps {
  className?: string;
}

export default function BeforeAfterSection({ className = '' }: BeforeAfterSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        container,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleMove = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  return (
    <section
      ref={sectionRef}
      className={`relative bg-luxury-bg py-20 lg:py-28 ${className}`}
    >
      <div className="relative z-10 px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-label text-luxury-accent block mb-4">
            SEE THE DIFFERENCE
          </span>
          <h2 className="font-heading font-black text-section text-luxury-text uppercase mb-4">
            BEFORE & AFTER
          </h2>
          <p className="text-lg text-luxury-text-secondary max-w-md mx-auto">
            Drag to reveal the transformation. Our meticulous process restores your vehicle&apos;s finish to showroom condition.
          </p>
        </div>

        {/* Comparison Slider */}
        <div
          ref={containerRef}
          className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden cursor-ew-resize select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* After Image (Full) */}
          <div className="relative aspect-video">
            <img
              src="/hood_closeup_water.jpg"
              alt="After detailing - pristine finish"
              className="w-full h-full object-cover"
              draggable={false}
            />

            {/* Before Image (Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="relative w-full h-full">
                <img
                  src="/before_after_paint.jpg"
                  alt="Before detailing"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {/* Darken the "before" side */}
                <div className="absolute inset-0 bg-luxury-bg/30" />
              </div>
            </div>

            {/* Slider Line */}
            <div
              ref={sliderRef}
              className="absolute top-0 bottom-0 w-1 bg-luxury-accent cursor-ew-resize"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Slider Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-luxury-accent flex items-center justify-center shadow-glow">
                <MoveHorizontal className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Labels */}
            <div
              className="absolute top-4 left-4 bg-luxury-bg/80 backdrop-blur-sm px-4 py-2 rounded-full transition-opacity duration-300"
              style={{ opacity: sliderPosition > 15 ? 1 : 0 }}
            >
              <span className="font-mono text-label text-luxury-text">BEFORE</span>
            </div>
            <div
              className="absolute top-4 right-4 bg-luxury-accent/90 backdrop-blur-sm px-4 py-2 rounded-full transition-opacity duration-300"
              style={{ opacity: sliderPosition < 85 ? 1 : 0 }}
            >
              <span className="font-mono text-label text-white">AFTER</span>
            </div>
          </div>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {['Swirl Removal', 'Deep Gloss', 'Paint Protection', 'Ceramic Coating'].map(
            (feature) => (
              <span
                key={feature}
                className="px-4 py-2 rounded-full bg-luxury-bg-secondary border border-luxury-text/10 text-luxury-text-secondary text-sm"
              >
                {feature}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
