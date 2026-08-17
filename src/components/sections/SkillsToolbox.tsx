import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { skillCategories, EnhancedSkill } from '../../data/skills';
import { TechBadge } from '../common/TechBadge';
import {
  Layout,
  Database,
  Palette,
  Network,
  ShieldCheck,
  Cpu,
  Wrench,
  Bot,
  Sparkles,
  Briefcase,
  CheckCircle2,
  Layers,
  Zap,
} from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';
import { trackSkillsInteraction } from '../../lib/analytics';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layout,
  Database,
  Palette,
  Network,
  ShieldCheck,
  Cpu,
  Wrench,
  Bot,
};

export const SkillsToolbox: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<EnhancedSkill | null>(null);

  // Top core competencies for quick overview
  const coreCompetencies = [
    { name: 'React 19 & Architecture', level: '98%', yoe: '4+ Yrs', color: 'from-blue-500 to-cyan-400' },
    { name: 'TypeScript & Type Safety', level: '95%', yoe: '3+ Yrs', color: 'from-indigo-500 to-blue-400' },
    { name: 'Redux Toolkit & Slices', level: '94%', yoe: '4+ Yrs', color: 'from-purple-500 to-indigo-400' },
    { name: 'Material UI & Tailwind', level: '96%', yoe: '4+ Yrs', color: 'from-pink-500 to-rose-400' },
    { name: 'Jest & RTL Test Coverage', level: '92%', yoe: '4+ Yrs', color: 'from-emerald-500 to-teal-400' },
    { name: 'Performance & 45% Boost', level: '95%', yoe: '4+ Yrs', color: 'from-amber-400 to-orange-500' },
  ];

  const handleSelectSkill = (skill: EnhancedSkill) => {
    setSelectedSkill(skill);
    trackSkillsInteraction(skill.name);
  };

  return (
    <section
      id="skills"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background-secondary/50 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        <SectionHeading
          time="11:30 AM"
          chapter="MY TOOLBOX"
          title="The Frontend Engineering Arsenal"
          subtitle="Battle-tested technologies selected for resilience, strict type safety, 60fps performance, and delightful user experiences."
        />

        {/* Core Competencies Quick Benchmark Matrix */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="rounded-3xl glass-panel-elevated p-6 sm:p-8 border border-brand-violet/30 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-brand-sky uppercase font-bold tracking-wider">
                <Zap className="w-4 h-4 text-brand-cyan" />
                Verified Engineering Strength
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Core Specialization Matrix
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              4+ Years Enterprise Production Experience
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreCompetencies.map((comp) => (
              <div
                key={comp.name}
                className="p-4 rounded-2xl bg-surface/80 border border-white/5 hover:border-brand-violet/40 transition-all space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono group-hover:text-brand-sky transition-colors">
                    {comp.name}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    {comp.yoe}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-surface-elevated rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${comp.color} transition-all duration-700`}
                    style={{ width: comp.level }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Selected Skill Quick Detail Inspector Drawer */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.25 }}
              className="p-6 rounded-3xl glass-panel-elevated border border-brand-cyan/50 shadow-2xl relative overflow-hidden bg-gradient-to-r from-brand-violet/15 via-surface-card to-brand-cyan/10"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-brand-violet/25 text-brand-sky border border-brand-violet/40 shadow-glow-sm">
                    <Sparkles className="w-5 h-5 text-brand-cyan animate-pulse" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        {selectedSkill.name}
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 font-bold">
                        {selectedSkill.level || 'Expert'}
                      </span>
                      {selectedSkill.years && (
                        <span className="text-[10px] font-mono text-brand-sky px-2 py-0.5 rounded-full bg-brand-violet/20 border border-brand-violet/30">
                          {selectedSkill.years}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl">
                      {selectedSkill.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-3.5 py-1.5 text-xs font-mono text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all shrink-0 self-start md:self-center"
                >
                  Close ✕
                </button>
              </div>

              {/* Skill Project References & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {selectedSkill.projectUsage && (
                  <div className="flex items-start gap-2 text-xs font-mono text-slate-300">
                    <Briefcase className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 uppercase text-[10px] block">Production Usage:</span>
                      <span className="text-white font-semibold">{selectedSkill.projectUsage}</span>
                    </div>
                  </div>
                )}

                {selectedSkill.tags && (
                  <div className="flex items-start gap-2 text-xs font-mono text-slate-300">
                    <Layers className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 uppercase text-[10px] block">Key Competencies:</span>
                      <div className="flex flex-wrap gap-1.5 mt-0.5">
                        {selectedSkill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 text-[11px] border border-white/10"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((cat) => {
            const Icon = iconMap[cat.iconName] || Layout;
            return (
              <motion.div
                key={cat.id}
                variants={fadeUp}
                className="rounded-3xl glass-panel-elevated p-6 sm:p-7 border border-white/10 hover:border-brand-violet/40 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                {/* Subtle top glow line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-violet/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-2xl bg-brand-violet/15 text-brand-sky group-hover:bg-brand-violet/30 group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-lg tracking-tight">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400 line-clamp-1">
                        {cat.skills.length} Core Technologies
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  {/* Skill Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {cat.skills.map((skill) => {
                      const isSelected = selectedSkill?.name === skill.name;
                      return (
                        <div
                          key={skill.name}
                          onClick={() => handleSelectSkill(skill)}
                          className="cursor-pointer"
                        >
                          <TechBadge
                            name={skill.name}
                            variant={isSelected ? 'accent' : skill.highlight ? 'glow' : 'subtle'}
                            size="sm"
                            className={
                              isSelected
                                ? 'ring-2 ring-brand-cyan border-brand-cyan shadow-glow-cyan'
                                : ''
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card Footer Hint */}
                <div className="pt-4 mt-5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1 text-slate-400 group-hover:text-brand-sky transition-colors">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Production Tested
                  </span>
                  <span className="text-[10px] text-brand-violet">Click to inspect</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
