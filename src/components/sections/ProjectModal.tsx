import React from 'react';
import { Modal } from '../common/Modal';
import { Project } from '../../types';
import { TechBadge } from '../common/TechBadge';
import { MagneticButton } from '../common/MagneticButton';
import { GithubIcon } from '../common/Icons';
import { ExternalLink, CheckCircle2, Cpu } from 'lucide-react';
import { trackProjectDemoClick, trackExternalLink } from '../../lib/analytics';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.title} maxWidth="4xl">
      <div className="space-y-8 text-slate-200">
        {/* Header summary */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-brand-violet/20 border border-brand-violet/40 text-brand-sky">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-400">Timeline: {project.timeline}</span>
            <span className="text-xs font-mono text-slate-400">• Role: {project.role}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{project.subtitle}</h2>
        </div>

        {/* Narrative & Long Description */}
        <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed">
          <p>{project.longDescription}</p>
        </div>

        {/* Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-surface/70 border border-white/10">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="text-center p-3 rounded-xl bg-surface-card/60">
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-brand-sky">{m.value}</div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Engineering Highlights & Decisions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Highlights */}
          <div className="space-y-3 p-5 rounded-2xl bg-surface-card/50 border border-white/10">
            <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-brand-sky flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Key Implementations
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-brand-violet font-bold">›</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Decisions / Challenges */}
          <div className="space-y-3 p-5 rounded-2xl bg-surface-card/50 border border-white/10">
            <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-brand-sky flex items-center gap-2">
              <Cpu className="w-4 h-4 text-brand-violet" />
              Architectural Decisions
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              {(project.decisions || project.challenges || []).map((d, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-brand-cyan font-bold">›</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technologies Used */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Technology Stack:</div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <TechBadge key={t} name={t} variant="glow" size="sm" />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <MagneticButton
                variant="primary"
                size="md"
                onClick={() => {
                  trackProjectDemoClick(project.id, project.liveUrl!);
                  window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                }}
                className="font-mono text-xs"
              >
                <span>LIVE EXPERIENCE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </MagneticButton>
            )}

            {project.githubUrl && (
              <MagneticButton
                variant="secondary"
                size="md"
                onClick={() => {
                  trackExternalLink('github', project.githubUrl!);
                  window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                }}
                className="font-mono text-xs"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>VIEW SOURCE</span>
              </MagneticButton>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            Close Window ✕
          </button>
        </div>
      </div>
    </Modal>
  );
};
