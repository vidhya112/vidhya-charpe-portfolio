import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { Bot, Sparkles, Brain, CheckCircle2 } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';

export const AIEngineering: React.FC = () => {
  const pillars = [
    {
      tool: 'Claude 3.7 / Anthropic',
      role: 'Architectural Exploration & Refactoring',
      description: 'Stress-testing edge cases, exploring alternative state boundaries, and drafting unit test suites for complex React components.',
      icon: Sparkles,
      color: 'from-amber-400/20 to-orange-500/20 text-amber-300 border-amber-500/30',
    },
    {
      tool: 'GitHub Copilot',
      role: 'Boilerplate & Velocity Acceleration',
      description: 'Auto-completing routine TypeScript interfaces, boilerplate reducers, and recurring prop schemas to minimize repetitive typing.',
      icon: Bot,
      color: 'from-brand-violet/20 to-brand-indigo/20 text-brand-sky border-brand-violet/30',
    },
    {
      tool: 'Human Engineering Judgment',
      role: 'The Final Deciding Authority',
      description: 'Validating security, runtime performance, a11y standards, and domain logic. Engineering judgment dictates what actually ships to production.',
      icon: Brain,
      color: 'from-emerald-400/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
    },
  ];

  return (
    <section id="ai" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          time="05:00 PM"
          chapter="AI × ENGINEERING"
          title="CODE + AI"
          subtitle="“AI helps me move faster. Engineering judgment decides what should actually ship.”"
        />

        {/* Narrative Banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="rounded-3xl glass-panel-elevated p-8 sm:p-10 border border-brand-violet/30 shadow-2xl mb-12 relative overflow-hidden"
        >
          <div className="max-w-3xl space-y-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Augmenting Velocity without Compromising Architectural Integrity
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              In modern frontend engineering, AI is not a replacement for deep architectural understanding — it is a
              force multiplier. By pairing modern AI tooling with rigorous code review and manual verification, I
              deliver robust features faster while eliminating repetitive boilerplate.
            </p>
          </div>
        </motion.div>

        {/* 3 Pillars Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.tool}
                variants={fadeUp}
                className="rounded-2xl glass-panel-elevated p-6 border border-white/10 hover:border-brand-violet/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} border w-fit shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white tracking-tight">{item.tool}</h4>
                    <p className="text-xs font-mono text-brand-sky font-semibold mt-0.5">{item.role}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Production-tested workflow</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
