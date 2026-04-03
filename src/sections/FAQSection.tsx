import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        item,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, item);

    return () => ctx.revert();
  }, [index]);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (isOpen) {
      gsap.to(content, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className={`border-b border-luxury-text/10 transition-colors duration-300 ${
        isOpen ? 'border-luxury-accent/30' : ''
      }`}
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
        data-cursor="pointer"
      >
        <span
          className={`font-heading font-semibold text-lg pr-8 transition-colors duration-300 ${
            isOpen ? 'text-luxury-accent' : 'text-luxury-text group-hover:text-luxury-accent'
          }`}
        >
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'bg-luxury-accent text-white rotate-0'
              : 'bg-luxury-text/10 text-luxury-text group-hover:bg-luxury-accent/20'
          }`}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <div ref={contentRef} className="overflow-hidden h-0 opacity-0">
        <p className="pb-6 text-luxury-text-secondary leading-relaxed pr-12">
          {answer}
        </p>
      </div>
    </div>
  );
}

interface FAQSectionProps {
  className?: string;
}

const faqs = [
  {
    question: 'How long does a full detail take?',
    answer:
      'A complete detail typically takes 3-5 hours depending on the vehicle size and condition. Our Signature package averages 4 hours, while the Concierge package with ceramic coating can take up to 6 hours. We\'ll provide a precise estimate when you book.',
  },
  {
    question: 'Do you need access to water or electricity?',
    answer:
      'No! Our fully-equipped mobile vans carry everything we need—water tanks, generators, premium products, and professional-grade equipment. We can detail your vehicle anywhere: your driveway, office parking, or even at the airport.',
  },
  {
    question: 'What\'s the difference between wax and ceramic coating?',
    answer:
      'Traditional wax lasts 1-3 months and provides basic protection. Our ceramic coating forms a permanent bond with your paint, lasting 6-12 months with proper maintenance. It offers superior hydrophobic properties, UV protection, and resistance to chemical etching.',
  },
  {
    question: 'How often should I get my car detailed?',
    answer:
      'For daily drivers, we recommend our Essential package monthly to maintain that showroom finish. For garage-kept vehicles, every 2-3 months is sufficient. Our membership plans make regular maintenance convenient and cost-effective.',
  },
  {
    question: 'Are your products safe for all paint types?',
    answer:
      'Absolutely. We use pH-neutral, biodegradable products that are safe for all factory and aftermarket finishes—including matte, satin, and PPF (Paint Protection Film). Our two-bucket method and microfiber towels prevent swirl marks.',
  },
  {
    question: 'What areas do you service?',
    answer:
      'We cover the entire metro area including Downtown, Financial District, Midtown, Design District, and major corporate campuses. Same-week availability in most zones. Contact us to confirm service to your specific location.',
  },
];

export default function FAQSection({ className = '' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
    <section id="faq" className={`relative bg-luxury-bg py-20 lg:py-28 ${className}`}>
      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-12">
            <span className="font-mono text-label text-luxury-accent block mb-4">
              GOT QUESTIONS?
            </span>
            <h2 className="font-heading font-black text-section text-luxury-text uppercase mb-4">
              FREQUENTLY ASKED
            </h2>
            <p className="text-lg text-luxury-text-secondary max-w-md mx-auto">
              Everything you need to know about our mobile detailing services.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="border-t border-luxury-text/10">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                index={index}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-luxury-text-secondary mb-4">
              Still have questions?
            </p>
            <a
              href="tel:5550142277"
              className="inline-flex items-center gap-2 text-luxury-accent hover:text-luxury-text transition-colors duration-200 font-heading font-semibold"
              data-cursor="pointer"
            >
              Call us at (555) 014-2277
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
