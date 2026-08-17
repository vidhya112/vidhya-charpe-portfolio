import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { journeyTimeline } from '../../data/journey';
import { TechBadge } from '../common/TechBadge';
import { Briefcase, GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';
import { fadeUp } from '../../lib/motion';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background-secondary/40 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          time="10:00 AM"
          chapter="THE JOURNEY"
          title="From Academic Foundations to Enterprise Engineering"
          subtitle="A progressive trajectory of technical ownership, scalable architecture, and continuous growth."
        />

        {/* Timeline Container */}
        <div className="relative mt-16 pl-6 sm:pl-10 border-l-2 border-brand-violet/30 space-y-16">
          {journeyTimeline.map((item) => {
            const isEducation = item.type === 'education';
            const Icon = isEducation ? GraduationCap : Briefcase;

            return (
              <motion.div
                key={item.year}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="relative group"
              >
                {/* Illuminated Timeline Node */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-8 h-8 rounded-full bg-surface-card border-2 border-brand-violet group-hover:border-brand-cyan group-hover:bg-brand-violet/30 flex items-center justify-center transition-all duration-300 shadow-glow-sm">
                  <Icon className="w-3.5 h-3.5 text-brand-sky" />
                </div>

                {/* Milestone Card */}
                <div className="rounded-2xl glass-panel-elevated p-6 sm:p-8 border border-white/10 hover:border-brand-violet/40 transition-all duration-300 shadow-xl space-y-5">
                  {/* Header info */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div>
                      <span className="text-xs font-mono text-brand-sky uppercase font-bold tracking-widest">
                        {item.period || item.year}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                        {item.title}
                      </h3>
                      {item.organization && (
                        <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-1">
                          <span className="text-slate-200 font-semibold">{item.organization}</span>
                          {item.location && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                {item.location}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                      {item.year}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  {item.highlights.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Engineering Highlights:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {item.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack chips */}
                  <div className="pt-3 border-t border-white/5 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <TechBadge key={tech} name={tech} variant="subtle" size="sm" />
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
