import React from 'react';
import { Mail, FileText, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { PERSONAL_INFO } from '../../data/constants';
import { trackExternalLink, trackResumeDownload } from '../../lib/analytics';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-background-secondary border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-brand-violet/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
          {/* Brand & positioning */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xl font-extrabold text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-violet shadow-glow-sm" />
              <span>{PERSONAL_INFO.name.toUpperCase()}</span>
            </div>
            <p className="text-xs font-mono text-slate-400">
              Software Engineer • React • TypeScript • Frontend Architecture
            </p>
            <p className="text-xs text-slate-400 italic font-mono pt-1">
              “Built with curiosity, coffee & too many commits.”
            </p>
          </div>

          {/* Social and Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackExternalLink('github', PERSONAL_INFO.github)}
              className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-brand-violet/50 hover:shadow-glow-sm transition-all"
              aria-label="GitHub Profile"
              data-cursor="GITHUB"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackExternalLink('linkedin', PERSONAL_INFO.linkedin)}
              className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-brand-sky/50 hover:shadow-glow-cyan transition-all"
              aria-label="LinkedIn Profile"
              data-cursor="LINKEDIN"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onClick={() => trackExternalLink('email', PERSONAL_INFO.email)}
              className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-brand-cyan/50 transition-all"
              aria-label="Send Email"
              data-cursor="EMAIL"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.resumeDownloadUrl}
              download="Vidhya_Charpe_Resume.pdf"
              onClick={trackResumeDownload}
              className="flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-xl glass-panel text-slate-200 hover:text-white hover:border-brand-violet/50 transition-all"
              data-cursor="PDF"
            >
              <FileText className="w-3.5 h-3.5 text-brand-sky" />
              <span>Resume</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-surface-elevated text-slate-300 hover:text-white hover:bg-brand-violet/20 border border-white/10 transition-all"
              aria-label="Scroll back to top"
              data-cursor="TOP"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 {PERSONAL_INFO.name}</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-slate-200 transition-colors text-[11px] underline decoration-slate-600 underline-offset-4"
            >
              Admin View / Metrics
            </button>
            <span className="text-slate-400">|</span>
            <span className="text-slate-400">Built with React & Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
