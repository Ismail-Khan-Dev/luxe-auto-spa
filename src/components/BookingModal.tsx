import { useState, useRef, useLayoutEffect } from 'react';
import { X, Calendar, Car, User, Mail, Phone, MessageSquare, Check, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import MagneticButton from './MagneticButton';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  {
    id: 'essential',
    name: 'Essential',
    price: '$59',
    description: 'Exterior 4-stage wash',
    features: ['Hand wash', 'Wheel clean', 'Dry & detail'],
    icon: Sparkles,
  },
  {
    id: 'signature',
    name: 'Signature',
    price: '$89',
    description: 'Exterior + Interior',
    features: ['Full exterior', 'Interior detail', 'Glass cleaning'],
    icon: Car,
    popular: true,
  },
  {
    id: 'concierge',
    name: 'Concierge',
    price: '$129',
    description: 'Full detail + Protection',
    features: ['Everything', 'Ceramic coating', 'Priority booking'],
    icon: Check,
  },
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    service: 'signature',
    date: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  useLayoutEffect(() => {
    if (!isOpen) {
      setStep(1);
      return;
    }

    const content = contentRef.current;
    if (!content) return;

    gsap.fromTo(
      content,
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
    );
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        vehicle: '',
        service: 'signature',
        date: '',
        message: '',
      });
      setStep(1);
    }, 2500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={contentRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-luxury-bg-secondary rounded-3xl border border-luxury-text/10 shadow-2xl"
        style={{ opacity: 0 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-luxury-bg-secondary/95 backdrop-blur-md border-b border-luxury-text/10 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="font-heading font-bold text-2xl text-luxury-text tracking-[0.02em]">
              {isSubmitted ? 'Booking Confirmed' : 'Book Your Detail'}
            </h2>
            {!isSubmitted && (
              <p className="font-mono text-label text-luxury-text-secondary mt-1">
                Step {step} of 2 — We&apos;ll confirm within 2 hours
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-luxury-text-secondary hover:text-luxury-text transition-colors p-2 hover:bg-luxury-text/5 rounded-full"
            aria-label="Close modal"
            data-cursor="pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-luxury-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-luxury-accent" />
              </div>
              <h3 className="font-heading font-bold text-xl text-luxury-text mb-3">
                Request Received
              </h3>
              <p className="text-luxury-text-secondary max-w-sm mx-auto">
                We&apos;ll be in touch within 2 hours to confirm your appointment details.
              </p>
            </div>
          ) : step === 1 ? (
            // Step 1: Service Selection
            <div className="space-y-4">
              <p className="text-luxury-text-secondary mb-6">
                Select the service that best fits your needs:
              </p>
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleChange('service', service.id)}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                    formData.service === service.id
                      ? 'border-luxury-accent bg-luxury-accent/10'
                      : 'border-luxury-text/10 hover:border-luxury-text/30 bg-luxury-bg'
                  }`}
                  data-cursor="pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          formData.service === service.id
                            ? 'bg-luxury-accent text-white'
                            : 'bg-luxury-text/10 text-luxury-text-secondary'
                        }`}
                      >
                        <service.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-lg text-luxury-text">
                            {service.name}
                          </span>
                          {service.popular && (
                            <span className="px-2 py-0.5 bg-luxury-accent/20 text-luxury-accent text-[10px] font-mono uppercase tracking-wider rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-luxury-text-secondary text-sm">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-heading font-black text-2xl text-luxury-text">
                        {service.price}
                      </span>
                      <span className="text-luxury-text-secondary text-sm">/wash</span>
                    </div>
                  </div>
                  {formData.service === service.id && (
                    <div className="mt-4 pt-4 border-t border-luxury-text/10 flex gap-3">
                      {service.features.map((feature, i) => (
                        <span
                          key={i}
                          className="text-xs text-luxury-text-secondary flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-luxury-accent" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              ))}
              <MagneticButton
                onClick={() => setStep(2)}
                className="w-full bg-luxury-accent text-white font-heading font-semibold text-sm tracking-[0.08em] py-4 rounded-pill mt-6"
                strength={0.2}
              >
                Continue
              </MagneticButton>
            </div>
          ) : (
            // Step 2: Contact Details
            <form onSubmit={handleSubmit} className="space-y-5">
              <button
                onClick={() => setStep(1)}
                className="text-luxury-accent text-sm hover:underline mb-4"
                data-cursor="pointer"
              >
                ← Back to services
              </button>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-mono text-label text-luxury-text-secondary flex items-center gap-1">
                    <User size={12} />
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full bg-luxury-bg border border-luxury-text/10 rounded-xl px-4 py-3 text-luxury-text placeholder:text-luxury-text-secondary/50 focus:border-luxury-accent focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-label text-luxury-text-secondary flex items-center gap-1">
                    <Phone size={12} />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full bg-luxury-bg border border-luxury-text/10 rounded-xl px-4 py-3 text-luxury-text placeholder:text-luxury-text-secondary/50 focus:border-luxury-accent focus:outline-none transition-colors"
                    placeholder="(555) 000-0000"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-label text-luxury-text-secondary flex items-center gap-1">
                  <Mail size={12} />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-luxury-bg border border-luxury-text/10 rounded-xl px-4 py-3 text-luxury-text placeholder:text-luxury-text-secondary/50 focus:border-luxury-accent focus:outline-none transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-label text-luxury-text-secondary flex items-center gap-1">
                  <Car size={12} />
                  Vehicle
                </label>
                <input
                  type="text"
                  value={formData.vehicle}
                  onChange={(e) => handleChange('vehicle', e.target.value)}
                  className="w-full bg-luxury-bg border border-luxury-text/10 rounded-xl px-4 py-3 text-luxury-text placeholder:text-luxury-text-secondary/50 focus:border-luxury-accent focus:outline-none transition-colors"
                  placeholder="e.g., 2024 BMW M3"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-label text-luxury-text-secondary flex items-center gap-1">
                  <Calendar size={12} />
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full bg-luxury-bg border border-luxury-text/10 rounded-xl px-4 py-3 text-luxury-text focus:border-luxury-accent focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-label text-luxury-text-secondary flex items-center gap-1">
                  <MessageSquare size={12} />
                  Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className="w-full bg-luxury-bg border border-luxury-text/10 rounded-xl px-4 py-3 text-luxury-text placeholder:text-luxury-text-secondary/50 focus:border-luxury-accent focus:outline-none transition-colors min-h-[100px] resize-none"
                  placeholder="Any special requests or details..."
                />
              </div>

              <MagneticButton
                type="submit"
                className="w-full bg-luxury-accent text-white font-heading font-semibold text-sm tracking-[0.08em] py-4 rounded-pill"
                strength={0.2}
              >
                Request Booking
              </MagneticButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
