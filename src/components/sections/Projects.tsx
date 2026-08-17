import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { projects } from '../../data/projects';
import { Project } from '../../types';
import { ProjectModal } from './ProjectModal';
import { TechBadge } from '../common/TechBadge';
import { MagneticButton } from '../common/MagneticButton';
import { ArrowRight, Play, Eye, Tv, HeartPulse, Building2 } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';
import { trackProjectView, trackProjectDemoClick } from '../../lib/analytics';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Exploration: Tv,
  Healthcare: HeartPulse,
  Enterprise: Building2,
};

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenProject = (project: Project) => {
    trackProjectView(project.id, project.title);
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background-secondary/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          time="02:30 PM"
          chapter="THINGS I'VE BUILT"
          title="Engineered for Scale, Built for Humans"
          subtitle="Featured systems spanning media streaming exploration, healthcare provider orchestration, and enterprise technology platforms."
        />

        {/* Featured Netflix Hero Showcase Card */}
        {projects
          .filter((p) => p.id === 'netflix-experience')
          .map((netflixProject) => (
            <motion.div
              key={netflixProject.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="mb-16 relative rounded-3xl p-1 bg-gradient-to-r from-red-600/50 via-brand-violet/40 to-brand-cyan/40 shadow-2xl overflow-hidden group"
            >
              <div className="rounded-[22px] bg-[#090d18] p-6 sm:p-10 relative overflow-hidden">
                {/* Visual Ambient Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/20 transition-all duration-700" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  {/* Left Column: Info & Narrative */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1.5 shadow-sm">
                        <Tv className="w-3.5 h-3.5" />
                        FEATURED SHOWCASE
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {netflixProject.timeline}
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                      {netflixProject.title}
                    </h3>

                    <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                      {netflixProject.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {netflixProject.technologies.map((t) => (
                        <TechBadge key={t} name={t} variant="subtle" size="sm" />
                      ))}
                    </div>

                    {/* Key metrics */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {netflixProject.metrics?.map((m, i) => (
                        <div key={i} className="p-3 rounded-xl bg-surface/80 border border-white/5 text-center">
                          <div className="text-lg sm:text-xl font-bold font-mono text-red-400">{m.value}</div>
                          <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      <MagneticButton
                        variant="primary"
                        size="md"
                        onClick={() => {
                          trackProjectDemoClick(netflixProject.id, netflixProject.liveUrl!);
                          window.open(netflixProject.liveUrl, '_blank', 'noopener,noreferrer');
                        }}
                        cursorLabel="OPEN"
                        className="bg-gradient-to-r from-red-600 to-rose-600 shadow-glow-sm font-mono text-xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>LIVE EXPERIENCE ↗</span>
                      </MagneticButton>

                      <MagneticButton
                        variant="secondary"
                        size="md"
                        onClick={() => handleOpenProject(netflixProject)}
                        cursorLabel="VIEW"
                        className="font-mono text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>VIEW CASE STUDY</span>
                      </MagneticButton>
                    </div>
                  </div>

                  {/* Right Column: Stylized Mockup Preview */}
                  <div
                    onClick={() => handleOpenProject(netflixProject)}
                    className="lg:col-span-5 relative rounded-2xl glass-panel-elevated p-4 border border-white/15 shadow-2xl cursor-pointer group-hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                  >
                    {/* Simulated App Banner Mockup */}
                    <div className="h-56 sm:h-72 rounded-xl bg-gradient-to-b from-red-950/40 via-surface-card to-black p-4 flex flex-col justify-between border border-red-500/20 relative">
                      <div className="flex items-center justify-between text-xs font-mono text-red-400">
                        <span className="font-extrabold text-sm tracking-wider">NETFLIX UI</span>
                        <span className="px-2 py-0.5 rounded bg-red-600/30 text-[10px]">LIVE DEMO</span>
                      </div>

                      <div className="space-y-2">
                        <div className="h-3 w-2/3 bg-white/20 rounded-full animate-pulse" />
                        <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                      </div>

                      <div className="flex gap-2">
                        {[1, 2, 3, 4].map((col) => (
                          <div
                            key={col}
                            className="h-20 flex-1 rounded-lg bg-surface-elevated/80 border border-white/10 flex items-center justify-center text-[10px] font-mono text-slate-500"
                          >
                            POSTER {col}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

        {/* Other Projects Grid (Tango Care & Marco Technologies) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects
            .filter((p) => p.id !== 'netflix-experience')
            .map((project) => {
              const CategoryIcon = categoryIcons[project.category] || Building2;
              return (
                <motion.div
                  key={project.id}
                  variants={fadeUp}
                  className="rounded-3xl glass-panel-elevated p-6 sm:p-8 border border-white/10 hover:border-brand-violet/40 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Category & Status */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-brand-violet/15 text-brand-sky border border-brand-violet/30">
                        <CategoryIcon className="w-3.5 h-3.5" />
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{project.timeline}</span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-brand-sky transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-brand-violet mt-0.5">{project.subtitle}</p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.slice(0, 5).map((t) => (
                        <TechBadge key={t} name={t} variant="subtle" size="sm" />
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="text-xs font-mono text-slate-500 self-center">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenProject(project)}
                      className="text-xs font-mono text-brand-sky font-bold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                    >
                      <span>INSPECT CASE STUDY</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="text-[11px] font-mono text-slate-400">{project.role}</div>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>

        {/* Modal Case Study Component */}
        <ProjectModal
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
