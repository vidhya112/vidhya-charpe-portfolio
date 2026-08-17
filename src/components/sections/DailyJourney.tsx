import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { dailySchedule } from '../../data/workflow';
import {
  Coffee,
  Compass,
  Code2,
  Bug,
  Sun,
  Network,
  GitPullRequest,
  ShieldCheck,
  Zap,
  Rocket,
  Clock,
} from 'lucide-react';
import { TechBadge } from '../common/TechBadge';
import { fadeUp } from '../../lib/motion';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Coffee,
  Compass,
  Code2,
  Bug,
  Sun,
  Network,
  GitPullRequest,
  ShieldCheck,
  Zap,
  Rocket,
};

export const DailyJourney: React.FC = () => {
  return (
    <section id="daily" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background-secondary/40 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          time="05:30 PM"
          chapter="ONE DAY IN MY CODE"
          title="A Day in the Life of a Frontend Engineer"
          subtitle="An illustrative chronicle of continuous problem-solving, architectural focus, and shipping clean software."
        />

        {/* Timeline Stack */}
        <div className="relative mt-16 pl-6 sm:pl-10 border-l-2 border-brand-violet/30 space-y-12">
          {dailySchedule.map((step) => {
            const Icon = iconMap[step.iconName] || Clock;

            return (
              <motion.div
                key={step.time}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="relative group"
              >
                {/* Node indicator */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-8 h-8 rounded-full bg-surface-card border-2 border-brand-violet group-hover:border-brand-cyan group-hover:bg-brand-violet/30 flex items-center justify-center transition-all duration-300 shadow-glow-sm">
                  <Icon className="w-3.5 h-3.5 text-brand-sky" />
                </div>

                {/* Event Card */}
                <div className="rounded-2xl glass-panel-elevated p-6 sm:p-7 border border-white/10 hover:border-brand-violet/40 transition-all duration-300 shadow-lg space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-brand-violet/20 text-brand-sky border border-brand-violet/30">
                        {step.time}
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                        {step.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{step.subtitle}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Quote statement */}
                  {step.quote && (
                    <div className="p-3 rounded-xl bg-surface/70 border border-white/5 font-mono text-xs text-brand-sky italic">
                      “{step.quote}”
                    </div>
                  )}

                  {/* Code snippet if any */}
                  {step.codeSnippet && (
                    <div className="p-3 rounded-xl bg-[#080d1a] border border-white/5 font-mono text-[11px] text-slate-300 overflow-x-auto">
                      <pre><code>{step.codeSnippet}</code></pre>
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {step.techTags.map((tag) => (
                      <TechBadge key={tag} name={tag} variant="subtle" size="sm" />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
