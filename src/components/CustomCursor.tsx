import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(checkTouch);
    if (checkTouch) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'none',
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 1,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 0,
        duration: 0.3,
      });
    };

    // Hover detection for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [data-cursor="pointer"], input, textarea, select');
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mousemove', handleElementHover, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-[width,height] duration-200 ${
          isHovering ? 'w-16 h-16' : 'w-8 h-8'
        }`}
        style={{ opacity: 0 }}
      >
        <div
          className={`w-full h-full rounded-full border transition-all duration-200 ${
            isHovering
              ? 'border-luxury-accent/60 bg-luxury-accent/10'
              : 'border-luxury-text/40'
          }`}
        />
      </div>
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0 }}
      >
        <div
          className={`rounded-full bg-luxury-accent transition-all duration-150 ${
            isHovering ? 'w-1.5 h-1.5' : 'w-1 h-1'
          }`}
        />
      </div>
    </>
  );
}
