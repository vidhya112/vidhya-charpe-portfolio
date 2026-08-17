import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { Gauge, Zap, Activity, CheckCircle2, Cpu } from 'lucide-react';
import { fadeUp } from '../../lib/motion';

export const PerformanceLab: React.FC = () => {
  const [isOptimizedView, setIsOptimizedView] = useState(true);

  const optimizationPillars = [
    {
      title: 'Route & Vendor Code Splitting',
      description: 'Isolating large vendor dependencies into separate asynchronous chunks, reducing initial parse times.',
      impact: '62% smaller entry bundle',
    },
    {
      title: 'Component & Media Lazy Loading',
      description: 'Deferring offscreen modal trees and media posters using React Suspense and Intersection Observers.',
      impact: 'Eliminated offscreen render stalls',
    },
    {
      title: 'Memoization (useMemo / useCallback)',
      description: 'Stabilizing reference identities and computational results across dense patient and medical record lists.',
      impact: '0 wasted render cycles on table scroll',
    },
    {
      title: 'Cache & Service Worker Strategies',
      description: 'Hydrating static UI assets from cache while executing network fetches in the background.',
      impact: 'Sub-second warm reloads',
    },
  ];

  return (
    <section id="performance" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          time="03:30 PM"
          chapter="THE PERFORMANCE LAB"
          title="MAKE IT FAST."
          subtitle="Engineering 45% measured page load reductions through disciplined bundle hygiene and render isolation."
        />

        {/* Interactive Lab Bench */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="rounded-3xl glass-panel-elevated p-6 sm:p-10 border border-brand-violet/30 shadow-2xl space-y-8"
        >
          {/* Header & Toggle Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-brand-sky font-bold uppercase">
                <Activity className="w-4 h-4 text-brand-cyan" />
                Live Benchmark Simulator
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Measured Performance Delta
              </h3>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface border border-white/10">
              <button
                onClick={() => setIsOptimizedView(false)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  !isOptimizedView
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                UNOPTIMIZED (BEFORE)
              </button>
              <button
                onClick={() => setIsOptimizedView(true)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  isOptimizedView
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow-emerald'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                OPTIMIZED (AFTER) ✓
              </button>
            </div>
          </div>

          {/* Metric Comparison Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Speedometer Card */}
            <div className="p-6 rounded-2xl bg-surface-card border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <Gauge
                className={`w-12 h-12 mb-3 transition-colors duration-500 ${
                  isOptimizedView ? 'text-emerald-400' : 'text-red-400'
                }`}
              />
              <div
                className={`text-4xl sm:text-5xl font-extrabold font-mono transition-colors duration-500 ${
                  isOptimizedView ? 'text-emerald-400 text-glow-cyan' : 'text-red-400'
                }`}
              >
                {isOptimizedView ? '98' : '48'}
                <span className="text-xl font-normal text-slate-400">/100</span>
              </div>
              <div className="text-xs font-mono uppercase font-bold text-slate-300 mt-2">
                Lighthouse Score
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                {isOptimizedView ? 'Near-Instant FCP' : 'High First Contentful Paint'}
              </div>
            </div>

            {/* Load Time Card */}
            <div className="p-6 rounded-2xl bg-surface-card border border-white/10 flex flex-col items-center justify-center text-center">
              <Zap
                className={`w-12 h-12 mb-3 transition-colors duration-500 ${
                  isOptimizedView ? 'text-brand-cyan' : 'text-amber-400'
                }`}
              />
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white">
                {isOptimizedView ? '0.8s' : '2.4s'}
              </div>
              <div className="text-xs font-mono uppercase font-bold text-slate-300 mt-2">
                Page Load Duration
              </div>
              <div className="text-[11px] font-mono text-emerald-400 font-bold mt-1">
                {isOptimizedView ? '45% Improvement Measured' : 'Uncompressed Assets'}
              </div>
            </div>

            {/* Frame Rate & Rendering */}
            <div className="p-6 rounded-2xl bg-surface-card border border-white/10 flex flex-col items-center justify-center text-center">
              <Cpu
                className={`w-12 h-12 mb-3 transition-colors duration-500 ${
                  isOptimizedView ? 'text-brand-violet' : 'text-slate-500'
                }`}
              />
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white">
                {isOptimizedView ? '60 FPS' : '32 FPS'}
              </div>
              <div className="text-xs font-mono uppercase font-bold text-slate-300 mt-2">
                Interaction Scroll Rate
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                {isOptimizedView ? 'Zero Layout Thrashing' : 'Forced Reflows Detected'}
              </div>
            </div>
          </div>

          {/* Visual Latency Bar Simulation */}
          <div className="p-5 rounded-2xl bg-surface border border-white/5 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>INITIAL HYDRATION TIMELINE:</span>
              <span className={isOptimizedView ? 'text-emerald-400' : 'text-red-400'}>
                {isOptimizedView ? 'DOM Interactive in 320ms' : 'DOM Blocked for 1.8s'}
              </span>
            </div>

            <div className="h-4 w-full bg-surface-elevated rounded-full overflow-hidden p-0.5 flex">
              <motion.div
                className={`h-full rounded-full transition-all duration-700 ${
                  isOptimizedView
                    ? 'w-[35%] bg-gradient-to-r from-brand-violet to-brand-cyan'
                    : 'w-[90%] bg-red-500'
                }`}
              />
            </div>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            {optimizationPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-surface-card/60 border border-white/5 hover:border-brand-violet/30 transition-all space-y-1.5"
              >
                <div className="flex items-center gap-2 font-bold text-white text-xs font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>{pillar.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{pillar.description}</p>
                <div className="text-[11px] font-mono text-brand-sky font-semibold pt-1">
                  Impact: {pillar.impact}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
