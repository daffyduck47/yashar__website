import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Layout, Zap, Users, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Clean Architecture',
    description: 'Building scalable and maintainable codebases with modern best practices and design patterns.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Layout,
    title: 'Pixel-Perfect Design',
    description: 'Crafting visually stunning interfaces with meticulous attention to every detail.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: Zap,
    title: 'Performance First',
    description: 'Optimizing for speed and efficiency without compromising quality.',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: Users,
    title: 'User-Centric',
    description: 'Creating intuitive experiences that delight users and drive engagement.',
    gradient: 'from-rose-500/20 to-pink-500/20',
  },
];

function FeatureCard({ feature, index, isInView }: { feature: typeof features[0]; index: number; isInView: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: 'preserve-3d',
      }}
      className="relative group perspective-1000"
    >
      <div className="card-mega relative overflow-hidden">
        {/* Animated gradient background on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 shimmer" />
        </div>

        {/* Icon container with glow */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-2xl transition-all duration-500"
          style={{ transform: 'translateZ(30px)' }}
        >
          <feature.icon className="w-8 h-8 text-silver group-hover:text-platinum transition-colors" />
          <div className="absolute inset-0 rounded-2xl bg-white/5 animate-pulse-soft" />
        </motion.div>

        <div style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-xl font-semibold text-platinum mb-3 group-hover:text-white transition-colors">
            {feature.title}
          </h3>
          <p className="text-silver/70 text-sm leading-relaxed group-hover:text-silver/90 transition-colors">
            {feature.description}
          </p>
        </div>

        {/* Corner accent */}
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-silver/3 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-platinum/3 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '-6s' }} />
      </div>

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
            <span className="text-silver/80 text-sm font-mono tracking-widest uppercase">About Me</span>
          </motion.div>

          <h2 className="section-title mb-6">
            Passionate About Building
          </h2>
          <p className="section-subtitle">
            Transforming ideas into elegant digital solutions with technical expertise and creative vision.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotateY: 15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-square max-w-xl mx-auto perspective-1000">
              {/* Main card */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="card-mega h-full flex flex-col items-center justify-center"
              >
                {/* Center content */}
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
                    className="relative mb-6"
                  >
                    <span className="text-9xl font-bold bg-gradient-to-br from-white via-platinum to-silver bg-clip-text text-transparent">
                      5+
                    </span>
                    <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-full -z-10" />
                  </motion.div>

                  <p className="text-silver/70 text-lg tracking-widest uppercase font-light">Years Experience</p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-8 left-8 w-20 h-20 glass rounded-xl flex items-center justify-center animate-float-slow opacity-60">
                  <span className="text-2xl font-bold text-platinum">JS</span>
                </div>

                <div className="absolute bottom-8 right-8 w-16 h-16 glass rounded-xl flex items-center justify-center animate-float-slow opacity-60" style={{ animationDelay: '-4s' }}>
                  <span className="text-xl font-bold text-silver">TS</span>
                </div>

                <div className="absolute top-1/2 -right-6 w-12 h-12 glass rounded-lg flex items-center justify-center animate-float-slow opacity-40" style={{ animationDelay: '-2s' }}>
                  <span className="text-sm font-bold text-silver/70">3D</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Features */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-silver/80 text-lg leading-relaxed mb-10"
            >
              With expertise spanning frontend development, UI/UX design, and full-stack engineering,
              I bring a holistic approach to every project, blending cutting-edge technology
              with timeless design principles.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} isInView={isInView} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
