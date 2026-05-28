import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight, Sparkles } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Neural Interface Platform',
    description: 'A cutting-edge web application featuring real-time data visualization, machine learning integration, and responsive 3D modeling capabilities.',
    tags: ['React', 'Three.js', 'Python', 'TensorFlow'],
    image: 'https://images.pexels.com/photos/8386443/pexels-photo-8386443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
    github: '#',
    color: '#60A5FA',
  },
  {
    id: 2,
    title: 'Quantum Commerce Engine',
    description: 'High-performance e-commerce platform with advanced product management, secure payment processing, and intelligent inventory systems.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    image: 'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
    github: '#',
    color: '#34D399',
  },
  {
    id: 3,
    title: 'Synthesis Dashboard',
    description: 'Executive-level analytics dashboard with real-time metrics, predictive insights, and comprehensive reporting tools.',
    tags: ['Vue.js', 'D3.js', 'GraphQL', 'AWS'],
    image: 'https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
    github: '#',
    color: '#F59E0B',
  },
  {
    id: 4,
    title: 'Apex Wellness App',
    description: 'Mobile-first wellness platform featuring personalized health tracking, adaptive workout plans, and social community features.',
    tags: ['React Native', 'Firebase', 'TensorFlow Lite', 'HealthKit'],
    image: 'https://images.pexels.com/photos/3756100/pexels-photo-3756100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
    github: '#',
    color: '#F472B6',
  },
];

function ProjectCard({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-300, 300], [15, -15]), { damping: 20, stiffness: 300 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-15, 15]), { damping: 20, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative group perspective-1000 cursor-pointer"
    >
      {/* Glow effect */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute -inset-4 rounded-3xl blur-2xl opacity-0"
        style={{ backgroundColor: project.color + '20' }}
      />

      <div className="card-mega overflow-hidden h-[480px] relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
            style={{
              backgroundImage: `url(${project.image})`,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/30" />
          <motion.div
            animate={{ opacity: isHovered ? 0.9 : 0.7 }}
            className="absolute inset-0 bg-obsidian/70"
          />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-10">
          {/* Top section - Tags */}
          <div className="flex flex-wrap gap-2" style={{ transform: 'translateZ(30px)' }}>
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                className="px-4 py-2 text-xs font-mono text-silver/80 glass rounded-full"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Bottom section - Title and description */}
          <div style={{ transform: 'translateZ(40px)' }}>
            <motion.h3
              animate={{ y: isHovered ? -8 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl font-bold text-platinum mb-4 leading-tight"
            >
              {project.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="text-silver/80 text-sm leading-relaxed mb-6"
            >
              {project.description}
            </motion.p>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex gap-4"
            >
              <motion.a
                href={project.link}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 glass rounded-xl text-sm font-medium"
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </motion.a>

              <motion.a
                href={project.github}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
              >
                <Github size={16} />
                <span>Code</span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Accent border on hover */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 2px ${project.color}40`,
          }}
        />
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-charcoal/20 to-obsidian pointer-events-none" />

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
            <span className="text-silver/80 text-sm font-mono tracking-widest uppercase">Portfolio</span>
          </motion.div>

          <h2 className="section-title mb-6">
            Featured Projects
          </h2>
          <p className="section-subtitle">
            A curated collection showcasing innovation, craftsmanship, and technical excellence.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05, x: 10 }}
            className="inline-flex items-center gap-3 px-8 py-4 glass rounded-2xl font-medium text-silver hover:text-platinum transition-colors group"
          >
            <span>View All Projects</span>
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight size={20} />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
