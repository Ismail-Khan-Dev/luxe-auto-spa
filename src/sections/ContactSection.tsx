import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Clock, Calendar, Car, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
  onBookClick?: () => void;
}

const contactInfo = [
  { icon: Mail, text: 'hello@luxeautospa.com' },
  { icon: Phone, text: '(555) 014-2277' },
  { icon: Clock, text: 'Mon–Sat: 8am–8pm' },
];

export default function ContactSection({ className = '' }: ContactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    service: '',
    date: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const form = formRef.current;

    if (!section || !left || !form) return;

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(left,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Form animation
      gsap.fromTo(form,
        { x: 50, opacity: 0, rotateY: -8 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        vehicle: '',
        service: '',
        date: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative bg-luxury-bg-secondary border-t border-luxury-text/6 py-20 lg:py-28 ${className}`}
    >
      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <div ref={leftRef}>
            <h2 className="font-heading font-black text-section text-luxury-text uppercase mb-6">
              BOOK YOUR DETAIL
            </h2>
            <p className="text-lg text-luxury-text-secondary leading-relaxed mb-10">
              Tell us where and when. We&apos;ll confirm within 2 hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-5">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-luxury-accent/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-luxury-accent" />
                  </div>
                  <span className="text-luxury-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Column */}
          <div 
            ref={formRef}
            className="bg-luxury-bg border border-luxury-text/10 rounded-2xl p-8"
            style={{ perspective: '1000px' }}
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-luxury-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-luxury-accent" />
                </div>
                <h3 className="font-heading font-bold text-lg text-luxury-text mb-2">
                  Request Received
                </h3>
                <p className="text-luxury-text-secondary">
                  We&apos;ll be in touch shortly to confirm your appointment.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-mono text-label text-luxury-text-secondary">
                      <User size={12} className="inline mr-1" />
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="bg-luxury-bg-secondary border-luxury-text/10 text-luxury-text placeholder:text-luxury-text-secondary/50"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-mono text-label text-luxury-text-secondary">
                      <Phone size={12} className="inline mr-1" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="bg-luxury-bg-secondary border-luxury-text/10 text-luxury-text placeholder:text-luxury-text-secondary/50"
                      placeholder="(555) 000-0000"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-mono text-label text-luxury-text-secondary">
                    <Mail size={12} className="inline mr-1" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="bg-luxury-bg-secondary border-luxury-text/10 text-luxury-text placeholder:text-luxury-text-secondary/50"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle" className="font-mono text-label text-luxury-text-secondary">
                    <Car size={12} className="inline mr-1" />
                    Vehicle
                  </Label>
                  <Input
                    id="vehicle"
                    value={formData.vehicle}
                    onChange={(e) => handleChange('vehicle', e.target.value)}
                    className="bg-luxury-bg-secondary border-luxury-text/10 text-luxury-text placeholder:text-luxury-text-secondary/50"
                    placeholder="e.g., 2024 BMW M3"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-mono text-label text-luxury-text-secondary">
                      Service
                    </Label>
                    <Select onValueChange={(value) => handleChange('service', value)}>
                      <SelectTrigger className="bg-luxury-bg-secondary border-luxury-text/10 text-luxury-text">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-luxury-bg border-luxury-text/10">
                        <SelectItem value="essential">Essential</SelectItem>
                        <SelectItem value="signature">Signature</SelectItem>
                        <SelectItem value="concierge">Concierge</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date" className="font-mono text-label text-luxury-text-secondary">
                      <Calendar size={12} className="inline mr-1" />
                      Preferred Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className="bg-luxury-bg-secondary border-luxury-text/10 text-luxury-text"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-mono text-label text-luxury-text-secondary">
                    <MessageSquare size={12} className="inline mr-1" />
                    Message (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="bg-luxury-bg-secondary border-luxury-text/10 text-luxury-text placeholder:text-luxury-text-secondary/50 min-h-[80px]"
                    placeholder="Any special requests or details..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-luxury-accent hover:bg-luxury-accent/90 text-white font-heading font-semibold text-sm tracking-[0.08em] py-3 rounded-pill btn-luxury"
                >
                  Request a Booking
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-luxury-text/10 text-center">
          <p className="font-mono text-label text-luxury-text-secondary">
            © LUXE AUTO SPA. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
