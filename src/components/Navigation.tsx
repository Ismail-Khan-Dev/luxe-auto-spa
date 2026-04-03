import { useEffect, useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import MagneticButton from './MagneticButton';

interface NavigationProps {
  onBookClick: () => void;
}

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navigation({ onBookClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate nav on scroll
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    if (isScrolled) {
      gsap.to(nav, {
        backgroundColor: 'rgba(11, 12, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        paddingTop: '12px',
        paddingBottom: '12px',
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(nav, {
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
        paddingTop: '24px',
        paddingBottom: '24px',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isScrolled]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] px-6 lg:px-12 py-6"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-heading font-bold text-luxury-text tracking-[0.08em] text-sm lg:text-base hover:text-luxury-accent transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            data-cursor="pointer"
          >
            LUXE AUTO SPA
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="font-mono text-label text-luxury-text-secondary hover:text-luxury-text transition-colors duration-200 relative group"
                data-cursor="pointer"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-luxury-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <MagneticButton
              onClick={onBookClick}
              className="bg-luxury-accent text-white font-heading font-semibold text-xs tracking-[0.08em] px-6 py-2.5 rounded-pill"
              strength={0.3}
            >
              Book Now
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-luxury-text p-2 hover:text-luxury-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            data-cursor="pointer"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-luxury-bg/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="font-heading font-bold text-3xl text-luxury-text hover:text-luxury-accent transition-all duration-300"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(30px)',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
              data-cursor="pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onBookClick();
            }}
            className="mt-6 bg-luxury-accent text-white font-heading font-semibold text-sm tracking-[0.08em] px-10 py-4 rounded-pill"
            style={{
              transitionDelay: isMobileMenuOpen ? '250ms' : '0ms',
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(30px)',
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
            data-cursor="pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}
