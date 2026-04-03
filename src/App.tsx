import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import HeroSection from './sections/HeroSection';
import ProcessSection from './sections/ProcessSection';
import InteriorSection from './sections/InteriorSection';
import ProtectionSection from './sections/ProtectionSection';
import StatsSection from './sections/StatsSection';
import BeforeAfterSection from './sections/BeforeAfterSection';
import PricingSection from './sections/PricingSection';
import CoverageSection from './sections/CoverageSection';
import TestimonialsSection from './sections/TestimonialsSection';
import FAQSection from './sections/FAQSection';
import ContactSection from './sections/ContactSection';
import Navigation from './components/Navigation';
import BookingModal from './components/BookingModal';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preloader animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Get all pinned sections for snap
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap configuration
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.4 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBookingOpen]);

  return (
    <>
      {/* Preloader */}
      <div
        className={`fixed inset-0 z-[9999] bg-luxury-bg flex items-center justify-center transition-opacity duration-700 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="text-center">
          <div className="font-heading font-black text-2xl text-luxury-text tracking-[0.1em] mb-4">
            LUXE AUTO SPA
          </div>
          <div className="w-32 h-0.5 bg-luxury-text/10 rounded-full overflow-hidden">
            <div className="h-full bg-luxury-accent animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Main Content */}
      <div ref={mainRef} className="relative bg-luxury-bg">
        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* Navigation */}
        <Navigation onBookClick={() => setIsBookingOpen(true)} />

        {/* Main content */}
        <main className="relative">
          <HeroSection className="z-10" onBookClick={() => setIsBookingOpen(true)} />
          <ProcessSection className="z-20" />
          <InteriorSection className="z-30" />
          <ProtectionSection className="z-40" />
          <StatsSection className="z-50" />
          <BeforeAfterSection className="z-[55]" />
          <PricingSection className="z-[60]" />
          <CoverageSection className="z-[70]" />
          <TestimonialsSection className="z-[80]" />
          <FAQSection className="z-[90]" />
          <ContactSection className="z-[100]" />
        </main>

        {/* Booking Modal */}
        <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      </div>
    </>
  );
}

export default App;
