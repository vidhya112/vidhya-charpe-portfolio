import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/constants';
import { MagneticButton } from '../common/MagneticButton';
import { TechBadge } from '../common/TechBadge';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Hero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  const titles = [
    'Software Engineer',
    'React Developer',
    'Frontend Engineer',
    'UI Architect',
    'Problem Solver',
  ];

  // Mouse reactive glow values
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(300);

  const springConfig = { damping: 30, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const titleTimer = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2800);

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      clearInterval(titleTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, prefersReducedMotion, titles.length]);

  const floatingBadges = [
    { name: 'React 19', x: '10%', y: '25%', delay: 0 },
    { name: 'TypeScript', x: '82%', y: '22%', delay: 0.2 },
    { name: 'Redux Toolkit', x: '88%', y: '68%', delay: 0.4 },
    { name: 'Material UI', x: '8%', y: '72%', delay: 0.6 },
    { name: 'Tailwind CSS', x: '78%', y: '45%', delay: 0.8 },
    { name: 'Jest / RTL', x: '14%', y: '48%', delay: 1.0 },
    { name: 'REST APIs', x: '45%', y: '88%', delay: 1.2 },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-28 pb-20 overflow-hidden bg-background bg-grid-pattern"
    >
      {/* Dynamic Cursor Reactive Glow (Desktop) */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none fixed z-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-brand-violet/15 to-brand-cyan/10 blur-[120px] -translate-x-1/2 -translate-y-1/2"
          style={{ x: smoothX, y: smoothY }}
        />
      )}

      {/* Atmospheric Radial Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-brand-violet/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle floating background tech badges (Desktop) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-10">
        {floatingBadges.map((badge, idx) => (
          <motion.div
            key={badge.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5 + idx,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: badge.delay,
            }}
            style={{
              position: 'absolute',
              left: badge.x,
              top: badge.y,
            }}
            className="pointer-events-auto"
          >
            <TechBadge name={badge.name} variant={idx % 2 === 0 ? 'glow' : 'subtle'} size="sm" />
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-4xl mx-auto text-center space-y-8">
        {/* Chapter & Status Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-violet/40 text-xs font-mono tracking-widest uppercase text-brand-sky shadow-glow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>09:00 AM • MORNING CHAPTER</span>
        </motion.div>

        {/* Narrative Salutation & Name */}
        <div className="space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base font-mono uppercase tracking-[0.25em] text-slate-400"
          >
            GOOD MORNING.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none font-display"
          >
            I'M <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-brand-sky">VIDHYA</span>
            <span className="text-brand-violet">.</span>
          </motion.h1>

          {/* Morphing Role Title */}
          <div className="h-12 sm:h-14 flex items-center justify-center overflow-hidden">
            <motion.div
              key={currentTitleIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple via-brand-indigo to-brand-cyan font-mono"
            >
              {titles[currentTitleIndex]}
            </motion.div>
          </div>
        </div>

        {/* Value Proposition Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          {PERSONAL_INFO.experienceYears} years turning complex frontend challenges into{' '}
          <span className="text-white font-medium">fast</span>,{' '}
          <span className="text-white font-medium">scalable</span>, and{' '}
          <span className="text-brand-sky font-medium">delightful</span> React experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <MagneticButton
            variant="primary"
            size="lg"
            onClick={() => {
              document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
            }}
            cursorLabel="EXPLORE"
            className="w-full sm:w-auto font-mono text-sm tracking-wider"
          >
            <span>EXPLORE MY JOURNEY</span>
            <ArrowDown className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            size="lg"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            cursorLabel="TALK"
            className="w-full sm:w-auto font-mono text-sm tracking-wider"
          >
            LET'S BUILD SOMETHING ↗
          </MagneticButton>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 font-mono text-[10px] tracking-widest uppercase cursor-pointer"
        onClick={() => document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span>SCROLL TO INITIALIZE</span>
        <div className="w-5 h-8 rounded-full border border-slate-700 flex justify-center pt-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-brand-violet rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};
