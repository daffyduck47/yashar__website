import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Hero3D } from './components/Hero3D';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { Loader } from './components/Loader';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%']);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div ref={containerRef} className="relative bg-obsidian min-h-screen overflow-x-hidden">
      {/* Ambient background gradient */}
      <motion.div
        style={{ y: backgroundY }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        <div className="absolute inset-0 bg-gradient-radial from-charcoal/20 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-platinum/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-silver/5 rounded-full blur-3xl" />
      </motion.div>

      <Navigation />

      <main className="relative z-10">
        <Hero3D />

        <motion.div style={{ y: textY }} className="relative">
          <About />
          <Projects />
          <Skills />
          <Contact />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-charcoal/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-silver/60 text-sm tracking-wide">
              Crafted with precision and modern technology
            </p>
            <p className="text-silver/40 text-sm font-mono">
              © 2024 All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
