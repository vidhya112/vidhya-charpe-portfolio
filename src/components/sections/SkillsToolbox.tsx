import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { skillCategories } from '../../data/skills';
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
  Search,
  Sparkles,
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
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; description?: string } | null>(null);

  const filteredCategories = skillCategories.filter((cat) => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) return false;
    if (!searchQuery.trim()) return true;

    return (
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background-secondary/50 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          time="11:30 AM"
          chapter="MY TOOLBOX"
          title="The Frontend Engineering Arsenal"
          subtitle="Battle-tested technologies selected for resilience, type safety, performance, and delightful user experiences."
        />

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => {
                setActiveCategory('all');
                trackSkillsInteraction('all');
              }}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-xl transition-all duration-200 shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-brand-violet text-white font-bold shadow-glow-sm'
                  : 'bg-surface-elevated text-slate-300 hover:text-white hover:bg-surface-card border border-white/10'
              }`}
            >
              ALL ({skillCategories.reduce((acc, c) => acc + c.skills.length, 0)})
            </button>
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  trackSkillsInteraction(category.id);
                }}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-xl transition-all duration-200 shrink-0 ${
                  activeCategory === category.id
                    ? 'bg-brand-violet text-white font-bold shadow-glow-sm'
                    : 'bg-surface-elevated text-slate-300 hover:text-white hover:bg-surface-card border border-white/10'
                }`}
              >
                {category.title.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search skill (e.g. Redux, Jest)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-surface-elevated/90 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-brand-violet/60"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredCategories.map((cat) => {
            const Icon = iconMap[cat.iconName] || Layout;
            return (
              <motion.div
                key={cat.id}
                variants={fadeUp}
                className="rounded-2xl glass-panel-elevated p-6 border border-white/10 hover:border-brand-violet/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-brand-violet/15 text-brand-sky group-hover:bg-brand-violet/30 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base tracking-tight">{cat.title}</h3>
                      <p className="text-[11px] font-mono text-slate-400 line-clamp-1">{cat.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-3">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        onClick={() => setSelectedSkill(skill)}
                        className="cursor-pointer"
                        title={skill.description}
                      >
                        <TechBadge
                          name={skill.name}
                          variant={skill.highlight ? 'glow' : 'subtle'}
                          size="sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Selected Skill Quick Detail Drawer */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-8 p-4 rounded-2xl glass-panel border border-brand-cyan/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-glow-cyan"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-brand-cyan shrink-0 animate-pulse" />
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <span>{selectedSkill.name}</span>
                    <span className="text-[10px] font-mono text-brand-sky px-2 py-0.5 rounded bg-brand-violet/20 border border-brand-violet/30">
                      IN PRODUCTION
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">{selectedSkill.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-xs font-mono text-slate-400 hover:text-white px-3 py-1 rounded-lg bg-white/5"
              >
                Close ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
