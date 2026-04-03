import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Users, Car, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatItem({ icon: Icon, value, suffix, label, delay }: StatItemProps) {
  const [count, setCount] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useLayoutEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        item,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              if (hasAnimated.current) return;
              hasAnimated.current = true;
              // Animate the counter
              const obj = { val: 0 };
              gsap.to(obj, {
                val: value,
                duration: 2,
                delay: delay + 0.2,
                ease: 'power2.out',
                onUpdate: () => {
                  setCount(Math.floor(obj.val));
                },
              });
            },
          },
        }
      );
    }, item);

    return () => ctx.revert();
  }, [value, delay]);

  return (
    <div
      ref={itemRef}
      className="text-center p-8 rounded-2xl bg-luxury-bg-secondary/50 border border-luxury-text/5 hover:border-luxury-accent/30 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-luxury-accent/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-luxury-accent" />
      </div>
      <div className="font-heading font-black text-4xl lg:text-5xl text-luxury-text mb-2">
        {count}
        <span className="text-luxury-accent">{suffix}</span>
      </div>
      <p className="font-mono text-label text-luxury-text-secondary uppercase">
        {label}
      </p>
    </div>
  );
}

interface StatsSectionProps {
  className?: string;
}

const stats = [
  { icon: Star, value: 5000, suffix: '+', label: 'Cars Detailed' },
  { icon: Users, value: 2500, suffix: '+', label: 'Happy Clients' },
  { icon: Car, value: 15, suffix: '', label: 'Expert Detailers' },
  { icon: Award, value: 98, suffix: '%', label: 'Satisfaction Rate' },
];

export default function StatsSection({ className = '' }: StatsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-luxury-bg py-20 lg:py-28 ${className}`}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(45, 107, 255, 0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="font-mono text-label text-luxury-accent block mb-4">
            BY THE NUMBERS
          </span>
          <h2 className="font-heading font-black text-section text-luxury-text uppercase">
            TRUSTED EXCELLENCE
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
