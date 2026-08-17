import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { Code2, Zap, ShieldCheck, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';
import { PERSONAL_INFO } from '../../data/constants';

export const About: React.FC = () => {
  const stats = [
    {
      value: '4+',
      label: 'YEARS EXPERIENCE',
      subtext: 'Enterprise React & TypeScript',
      icon: Code2,
      color: 'from-brand-violet to-brand-indigo',
    },
    {
      value: '45%',
      label: 'FASTER PAGE LOADS',
      subtext: 'Lazy loading & code splitting',
      icon: Zap,
      color: 'from-amber-400 to-orange-500',
    },
    {
      value: '85%+',
      label: 'CODE COVERAGE',
      subtext: 'Jest & React Testing Library',
      icon: ShieldCheck,
      color: 'from-emerald-400 to-teal-500',
    },
    {
      value: '12+',
      label: 'FEATURES DELIVERED',
      subtext: 'Across healthcare & enterprise',
      icon: Rocket,
      color: 'from-brand-sky to-blue-600',
    },
    {
      value: '20%',
      label: 'SPRINT VELOCITY BOOST',
      subtext: 'Reusable UI component systems',
      icon: TrendingUp,
      color: 'from-brand-cyan to-emerald-400',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          time="09:30 AM"
          chapter="WHO IS BEHIND THE CODE"
          title="Engineering Interfaces with Rigor & Empathy"
          subtitle="A senior mindset focused on delivering production systems where performance, maintainability, and visual excellence converge."
        />

        {/* Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Creative Stylized Avatar / Code Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl p-1 bg-gradient-to-br from-brand-violet/40 via-white/10 to-brand-cyan/40 shadow-2xl overflow-hidden group">
              {/* Inner container */}
              <div className="rounded-[22px] bg-surface-card p-6 sm:p-8 space-y-6 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />

                {/* Profile Header Badge */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-violet to-brand-cyan p-0.5 shadow-glow-sm flex items-center justify-center">
                    <div className="w-full h-full bg-surface-elevated rounded-[14px] flex items-center justify-center font-display font-extrabold text-2xl text-white">
                      VC
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{PERSONAL_INFO.name}</h3>
                    <p className="text-xs font-mono text-brand-sky">{PERSONAL_INFO.role} • React Specialist</p>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">{PERSONAL_INFO.currentCompany}</p>
                  </div>
                </div>

                {/* Persona Quote */}
                <div className="p-4 rounded-xl bg-surface/70 border border-white/10 font-mono text-xs text-slate-300 leading-relaxed">
                  <span className="text-brand-violet font-bold">const</span> mindset = &#123;
                  <div className="pl-4 text-brand-sky">
                    craft: <span className="text-emerald-300">"Scalable React Architectures"</span>,
                  </div>
                  <div className="pl-4 text-brand-sky">
                    standard: <span className="text-emerald-300">"Production-grade test coverage"</span>,
                  </div>
                  <div className="pl-4 text-brand-sky">
                    passion: <span className="text-emerald-300">"Intuitive, effortless user experiences"</span>,
                  </div>
                  &#125;;
                </div>

                {/* Key Bullet Points */}
                <div className="space-y-2.5 text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Specialized in enterprise React & TypeScript</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Healthcare & Enterprise platform engineering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>AI-assisted development with Claude & Copilot</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative + Metrics */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Narrative Paragraph */}
            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
              <p>
                I’m <span className="text-white font-semibold">Vidhya</span>, a Software Engineer specializing in{' '}
                <span className="text-brand-sky font-semibold">React</span> and modern frontend development. I enjoy
                turning complex requirements into reusable components, scalable architectures, and interfaces that
                feel effortless to use.
              </p>
              <p className="text-sm sm:text-base text-slate-400">
                Over the past 4+ years at <span className="text-white">Cybage Software</span>, I have engineered
                mission-critical web solutions across healthcare management (Tango Care) and enterprise platforms (Marco Technologies),
                focusing on data virtualization, predictable Redux state, and comprehensive test coverage.
              </p>
            </div>

            {/* Source-Backed Metrics Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={fadeUp}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="p-4 rounded-2xl glass-panel-elevated border border-white/10 hover:border-brand-violet/40 transition-all shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                        {stat.value}
                      </span>
                      <Icon className="w-4 h-4 text-brand-sky opacity-80" />
                    </div>
                    <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-300">
                      {stat.label}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 truncate">
                      {stat.subtext}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
