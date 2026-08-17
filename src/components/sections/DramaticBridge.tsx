import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/motion';

export const DramaticBridge: React.FC = () => {
  return (
    <section className="relative py-36 px-4 sm:px-6 lg:px-8 bg-[#020408] flex flex-col items-center justify-center text-center overflow-hidden border-t border-white/5">
      {/* Deep black atmosphere with ultra-subtle center violet glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-violet/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-slate-500"
        >
          08:00 PM • THE DAY ISN'T REALLY OVER.
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.15 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-300 tracking-tight"
        >
          There's always something new to build.
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.3 }}
          className="pt-6"
        >
          <span className="text-sm font-mono uppercase text-brand-cyan tracking-widest block mb-2 font-bold">
            YOUR IDEA?
          </span>
          <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-display text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-brand-sky">
            LET'S BUILD IT<span className="text-brand-violet">.</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
};
