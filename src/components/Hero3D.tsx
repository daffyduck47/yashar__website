import { useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export function Hero3D() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Spline 3D Scene */}
      <div className="absolute inset-0 z-0">
        <div className={`${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 h-full`}>
          <Spline
            scene="https://prod.spline.design/qqMzrJU6CGtvSs5P/scene.splinecode"
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* Loading state */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-silver/30 border-t-platinum rounded-full animate-spin" />
              <p className="text-silver/60 text-sm font-mono tracking-widest">Loading 3D</p>
            </div>
          </div>
        )}
      </div>

      {/* Gradient overlays for better text readability */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-obsidian/40" />
      </div>

      {/* Text Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full mb-6">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-silver/80 text-sm font-mono tracking-widest uppercase">
                Available for Projects
              </span>
            </div>
            <p className="text-silver/70 text-lg md:text-xl font-light tracking-wide">
              Web Developer & Creative Technologist
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 80, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 perspective-1000"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="block text-gradient bg-gradient-to-r from-white via-platinum to-silver bg-clip-text text-transparent text-shadow-2xl mb-2">
              Crafting Digital
            </span>
            <span className="block text-platinum drop-shadow-2xl">
              Experiences
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-silver/80 text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          >
            Building immersive web interfaces with precision engineering,
            <br className="hidden md:block" />
            modern architecture, and cinematic detail
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center pointer-events-auto"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl font-semibold tracking-wide transition-all duration-500 overflow-hidden backdrop-blur-xl"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative text-platinum">View Projects</span>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 border-2 border-silver/30 rounded-2xl font-semibold tracking-wide transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-silver/0 group-hover:bg-silver/10 transition-colors duration-500" />
              <span className="relative text-silver group-hover:text-platinum transition-colors">
                Get in Touch
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-silver/50 text-xs font-mono tracking-widest uppercase">Scroll to explore</span>
          <div className="w-8 h-14 border-2 border-silver/20 rounded-full flex justify-center pt-3 backdrop-blur-xl">
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-silver/60 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Ambient particles */}
      <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0
            }}
            animate={{
              y: [null, '-20%'],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </section>
  );
}
