import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { workflowStages } from '../../data/workflow';
import {
  Search,
  Layers,
  Code,
  Plug,
  CheckCircle2,
  Gauge,
  Send,
  Sparkles,
} from 'lucide-react';
import { fadeUp } from '../../lib/motion';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  Layers,
  Code,
  Plug,
  CheckCircle2,
  Gauge,
  Send,
};

export const Workflow: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(5); // Default to OPTIMIZE (step 06)

  const activeStage = workflowStages[activeStepIndex];
  const ActiveIcon = iconMap[activeStage.iconName] || Code;

  return (
    <section id="workflow" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          time="01:30 PM"
          chapter="HOW I BUILD"
          title="From Idea → Production-Ready Software"
          subtitle="A disciplined 7-stage engineering lifecycle transforming ambiguity into resilient, high-velocity digital experiences."
        />

        {/* 7 Stage Pipeline Horizontal Stepper */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10"
        >
          {workflowStages.map((stage, idx) => {
            const isSelected = idx === activeStepIndex;
            const Icon = iconMap[stage.iconName] || Code;

            return (
              <button
                key={stage.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 relative group text-center ${
                  isSelected
                    ? 'bg-brand-violet/25 border-brand-cyan/60 shadow-glow-md'
                    : 'glass-panel border-white/10 hover:border-brand-violet/40 hover:bg-white/5'
                }`}
              >
                {/* Step number badge */}
                <span className={`text-[10px] font-mono mb-1 font-bold ${isSelected ? 'text-brand-cyan' : 'text-slate-500'}`}>
                  {stage.step}
                </span>

                <div className={`p-2 rounded-xl mb-2 transition-colors ${isSelected ? 'bg-brand-violet text-white' : 'bg-surface-elevated text-slate-400 group-hover:text-brand-sky'}`}>
                  <Icon className="w-4 h-4" />
                </div>

                <span className={`text-xs font-bold font-mono tracking-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {stage.title}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Active Stage Deep Dive Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl glass-panel-elevated p-6 sm:p-10 border border-brand-violet/30 shadow-2xl relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-violet/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Stage Info */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-brand-violet/20 text-brand-sky border border-brand-violet/40 shadow-glow-sm">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-brand-cyan uppercase tracking-widest font-bold">
                      STAGE {activeStage.step}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {activeStage.title}: <span className="text-brand-sky font-normal text-xl">{activeStage.subtitle}</span>
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2">
                  {activeStage.description}
                </p>

                <div className="p-4 rounded-xl bg-surface-card/90 border border-white/10 font-mono text-xs text-slate-300 leading-relaxed">
                  <span className="text-brand-violet font-bold">“</span>
                  {activeStage.deepDive}
                  <span className="text-brand-violet font-bold">”</span>
                </div>
              </div>

              {/* Right Column: Engineering Practices */}
              <div className="lg:col-span-5 space-y-3 p-6 rounded-2xl bg-surface/60 border border-white/10">
                <h4 className="text-xs font-mono text-brand-sky uppercase font-bold tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-violet" />
                  Core Engineering Practices
                </h4>
                <div className="space-y-2.5">
                  {activeStage.practices.map((practice, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{practice}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
