import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Sparkles, ArrowRight } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@portfolio.dev',
    href: 'mailto:hello@portfolio.dev',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: '#',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
];

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub', color: '#333' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0077B5' },
  { icon: Twitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
];

function ContactCard({ item, index, isInView }: { item: typeof contactInfo[0]; index: number; isInView: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-50, 50], [5, -5]), { damping: 25, stiffness: 400 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-5, 5]), { damping: 25, stiffness: 400 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  return (
    <motion.a
      key={item.label}
      href={item.href}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group flex items-center gap-5 p-6 glass rounded-2xl perspective-1000 block relative overflow-hidden"
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="w-14 h-14 glass rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
        <item.icon className="w-6 h-6 text-silver group-hover:text-platinum transition-colors" />
        <div className="absolute inset-0 rounded-xl shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="relative z-10">
        <p className="text-silver/50 text-xs font-mono uppercase tracking-wider mb-1">{item.label}</p>
        <p className="text-platinum font-medium text-lg">{item.value}</p>
      </div>

      <ArrowRight className="absolute right-6 w-5 h-5 text-silver/30 group-hover:text-platinum group-hover:translate-x-1 transition-all" />
    </motion.a>
  );
}

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormState({ name: '', email: '', subject: '', message: '' });
    alert('Message sent successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-charcoal/10 to-obsidian pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-silver" />
            <span className="text-silver/80 text-sm font-mono tracking-widest uppercase">Get in Touch</span>
          </motion.div>

          <h2 className="section-title mb-6">
            Let's Work Together
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let's create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item, index) => (
              <ContactCard key={item.label} item={item} index={index} isInView={isInView} />
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="pt-4"
            >
              <p className="text-silver/60 text-sm mb-6 font-mono tracking-wider uppercase">Connect with me</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    whileHover={{
                      scale: 1.15,
                      y: -5,
                      boxShadow: `0 10px 30px ${social.color}30`
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 glass rounded-xl flex items-center justify-center group relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                      style={{ backgroundColor: social.color }}
                    />
                    <social.icon className="w-6 h-6 text-silver group-hover:text-platinum transition-colors relative z-10" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="card-mega p-10 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid sm:grid-cols-2 gap-7">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-silver/80 text-sm font-medium mb-3" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-charcoal/30 border border-silver/20 rounded-xl text-platinum placeholder-silver/50 focus:border-silver/40 focus:outline-none focus:ring-2 focus:ring-silver/20 transition-all backdrop-blur-sm"
                      placeholder="John Doe"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-silver/80 text-sm font-medium mb-3" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-charcoal/30 border border-silver/20 rounded-xl text-platinum placeholder-silver/50 focus:border-silver/40 focus:outline-none focus:ring-2 focus:ring-silver/20 transition-all backdrop-blur-sm"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-silver/80 text-sm font-medium mb-3" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-charcoal/30 border border-silver/20 rounded-xl text-platinum placeholder-silver/50 focus:border-silver/40 focus:outline-none focus:ring-2 focus:ring-silver/20 transition-all backdrop-blur-sm"
                    placeholder="Project Inquiry"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-silver/80 text-sm font-medium mb-3" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-4 bg-charcoal/30 border border-silver/20 rounded-xl text-platinum placeholder-silver/50 focus:border-silver/40 focus:outline-none focus:ring-2 focus:ring-silver/20 transition-all resize-none backdrop-blur-sm"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-silver/30 border-t-platinum rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
