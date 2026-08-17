import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { mindsetStatements } from '../../data/workflow';
import { Sparkles, Check } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';

export const Mindset: React.FC = () => {
  const pillars = [
    'Performance & Sub-Second Latency',
    'Long-Term Code Maintainability',
    'Comprehensive Accessibility (a11y)',
    'Modular & Reusable Component Systems',
    'Explicit Backend API Contracts',
    'Fearless Testing & Regression Coverage',
    'Developer Experience (DX) & Clean Types',
    'Effortless, Human-Centric UX',
  ];

  return (
    <section id="mindset" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background-secondary/50 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          time="06:30 PM"
          chapter="ENGINEERING MINDSET"
          title="“I DON'T JUST BUILD UI.”"
          subtitle="A holistic architectural philosophy centered around engineering longevity and human experience."
        />

        {/* Large Editorial Headline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <p className="text-sm font-mono uppercase tracking-widest text-brand-sky font-bold">
            WHEN I WRITE FRONTEND CODE, I THINK ABOUT:
          </p>
        </motion.div>

        {/* Dynamic Editorial Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar}
              variants={fadeUp}
              whileHover={{ y: -3, scale: 1.02 }}
              className="p-6 rounded-2xl glass-panel-elevated border border-white/10 hover:border-brand-violet/40 transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono text-brand-violet font-bold">0{idx + 1}</span>
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                  {pillar}
                </h4>
              </div>
              <div className="pt-4 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <Check className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Production Standard</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mindset Statements Carousel / Stack */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl glass-panel border border-brand-violet/30 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-sky uppercase font-bold">
            <Sparkles className="w-4 h-4 text-brand-cyan animate-pulse" />
            Engineering Axioms
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mindsetStatements.slice(0, 4).map((stmt, i) => (
              <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <span className="text-brand-violet font-bold text-base">“</span>
                <p className="italic">{stmt}”</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
