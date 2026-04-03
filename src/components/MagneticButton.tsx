import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  onClick?: () => void;
  strength?: number;
  type?: 'button' | 'submit' | 'reset';
}

export default function MagneticButton({
  children,
  className,
  variant = 'default',
  onClick,
  strength = 0.3,
  type = 'button',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      const content = contentRef.current;
      if (!button || !content) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(content, {
        x: deltaX * 0.5,
        y: deltaY * 0.5,
        duration: 0.3,
        ease: 'power2.out',
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const button = buttonRef.current;
    const content = contentRef.current;
    if (!button || !content) return;

    gsap.to([button, content], {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  return (
    <Button
      ref={buttonRef}
      type={type}
      variant={variant}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative overflow-hidden transition-shadow duration-300',
        variant === 'default' && 'hover:shadow-glow',
        className
      )}
      data-cursor="pointer"
    >
      <span ref={contentRef} className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {variant === 'default' && (
        <span className="absolute inset-0 bg-gradient-to-r from-luxury-accent to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
    </Button>
  );
}
