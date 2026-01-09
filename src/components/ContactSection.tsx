import { useState } from 'react';
import { Mail, Phone, Globe, Linkedin, Send, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sujalgiriiitp@gmail.com',
    href: 'mailto:sujalgiriiitp@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 6306601592',
    href: 'tel:+916306601592',
  },
  {
    icon: Globe,
    label: 'Portfolio',
    value: 'sujalgiriiitp-source.github.io',
    href: 'https://sujalgiriiitp-source.github.io/portfolio/',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Sujal Giri',
    href: 'https://www.linkedin.com/in/sujal-giri-9501253a0',
  },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || name.length > 100) {
      toast({
        title: 'Invalid name',
        description: 'Please enter a valid name (max 100 characters).',
        variant: 'destructive',
      });
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    if (!message || message.length > 1000) {
      toast({
        title: 'Invalid message',
        description: 'Please enter a message (max 1000 characters).',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_dgg9bko',
        'template_qm8i4c9',
        {
          from_name: name,
          from_email: email,
          message: message,
        },
        'QDOoCCVxVQppmfFU9'
      );

      toast({
        title: 'Message sent!',
        description: "Thanks for reaching out. I'll get back to you soon!",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: 'Failed to send',
        description: 'Something went wrong. Please try again or email me directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Got A Project? <span className="gradient-text">Let's Talk</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feel free to reach out for collaborations, internship opportunities, or just a friendly chat about technology!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card rounded-2xl p-5 border border-border hover-lift"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <info.icon size={22} className="text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{info.label}</span>
                      <p className="font-medium text-foreground mt-1 text-sm">{info.value}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Location Card */}
            <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <MapPin size={22} className="text-secondary" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Location</span>
                  <p className="font-medium text-foreground mt-1">India</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Available for remote internships and collaborations worldwide. Currently open to learning opportunities in Data Analytics and Web Development.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-card">
            <h3 className="text-xl font-bold text-foreground mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                  placeholder="Hi Sujal, I'd like to discuss..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse-soft">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
