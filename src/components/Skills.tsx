import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';

const skillCategories = [
  {
    category: 'Frontend',
    icon: '◈',
    description: 'Crafting beautiful, responsive user interfaces',
    skills: [
      { name: 'React / Next.js', level: 95, color: '#61DAFB' },
      { name: 'TypeScript', level: 92, color: '#3178C6' },
      { name: 'Three.js / WebGL', level: 88, color: '#000000' },
      { name: 'Tailwind CSS', level: 95, color: '#06B6D4' },
      { name: 'Framer Motion', level: 90, color: '#FF0055' },
    ],
  },
  {
    category: 'Backend',
    icon: '◇',
    description: 'Building robust, scalable server architectures',
    skills: [
      { name: 'Node.js', level: 90, color: '#339933' },
      { name: 'Python', level: 85, color: '#3776AB' },
      { name: 'PostgreSQL', level: 88, color: '#336791' },
      { name: 'GraphQL', level: 82, color: '#E10098' },
      { name: 'REST APIs', level: 95, color: '#009688' },
    ],
  },
  {
    category: 'Tools & Infrastructure',
    icon: '○',
    description: 'Modern development workflows and cloud services',
    skills: [
      { name: 'Git / GitHub', level: 95, color: '#F05032' },
      { name: 'Docker', level: 80, color: '#2496ED' },
      { name: 'AWS / Cloud', level: 78, color: '#FF9900' },
      { name: 'CI/CD', level: 85, color: '#40BE46' },
      { name: 'Testing', level: 88, color: '#99425B' },
    ],
  },
];

const technologies = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Node.js',
  'Python', 'Three.js', 'WebGL', 'GraphQL', 'PostgreSQL', 'MongoDB',
  'Redis', 'Docker', 'AWS', 'Git', 'Tailwind', 'Figma',
];

function SkillBar({ skill, index, isInView }: { skill: typeof skillCategories[0]['skills'][0]; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: index * 0.5 }}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: skill.color }}
          />
          <span className="text-silver/90 text-sm font-medium group-hover:text-platinum transition-colors">
            {skill.name}
          </span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 + index * 0.1 }}
          className="text-silver/60 text-xs font-mono"
        >
          {skill.level}%
        </motion.span>
      </div>

      <div className="relative h-2 bg-charcoal/50 rounded-full overflow-hidden">
        {/* Background glow */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: skill.color, opacity: 0 }}
        />

        {/* Progress bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: `${skill.level}%`, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: `linear-gradient(90deg, ${skill.color}40, ${skill.color})`,
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 shimmer" />

          {/* End dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 1.5 + index * 0.1 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-obsidian"
            style={{ backgroundColor: skill.color }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function SkillCard({ category, index, isInView }: { category: typeof skillCategories[0]; index: number; isInView: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { damping: 25, stiffness: 400 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { damping: 25, stiffness: 400 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group perspective-1000"
    >
      <div className="card-mega relative overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between mb-8" style={{ transform: 'translateZ(20px)' }}>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl text-silver/40">{category.icon}</span>
              <h3 className="text-2xl font-semibold text-platinum">{category.category}</h3>
            </div>
            <p className="text-silver/60 text-sm">{category.description}</p>
          </div>

          <motion.div
            animate={{ rotate: isInView ? 360 : 0 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center"
          >
            <TrendingUp className="w-5 h-5 text-silver" />
          </motion.div>
        </div>

        {/* Skills */}
        <div className="space-y-6" style={{ transform: 'translateZ(15px)' }}>
          {category.skills.map((skill, skillIndex) => (
            <SkillBar key={skill.name} skill={skill} index={skillIndex} isInView={isInView} />
          ))}
        </div>

        {/* Bottom gradient line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 + index * 0.15 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left"
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-silver/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-platinum/5 rounded-full blur-3xl"
        />
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
            <span className="text-silver/80 text-sm font-mono tracking-widest uppercase">Expertise</span>
          </motion.div>

          <h2 className="section-title mb-6">
            Skills & Technologies
          </h2>
          <p className="section-subtitle">
            Mastery of modern tools and frameworks to deliver exceptional digital products.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid lg:grid-cols-3 gap-10 mb-20">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.category} category={category} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Technologies Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="card-mega p-12">
            <h3 className="text-center text-xl font-semibold text-platinum mb-10">
              Technology Stack
            </h3>

            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 1 + index * 0.05,
                    type: 'spring',
                    stiffness: 200
                  }}
                  whileHover={{
                    scale: 1.15,
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  className="px-5 py-3 text-sm font-mono text-silver/80 glass rounded-xl cursor-default hover:text-platinum transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Hover shine effect */}
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">{tech}</span>
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
