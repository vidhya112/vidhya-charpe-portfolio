import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { Tv, Lightbulb } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { MagneticButton } from '../common/MagneticButton';
import { TechBadge } from '../common/TechBadge';
import { PERSONAL_INFO } from '../../data/constants';
import { fadeUp } from '../../lib/motion';
import { trackProjectDemoClick, trackExternalLink } from '../../lib/analytics';

export const BeyondTheJob: React.FC = () => {
  return (
    <section id="beyond" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          time="07:00 PM"
          chapter="BEYOND THE JOB"
          title="WHEN WORK ENDS, I STILL BUILD."
          subtitle="“Side projects are where I experiment, learn, and turn ambitious ideas into fluid interfaces.”"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Exploration Narrative */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4 text-base text-slate-300 leading-relaxed">
              <p>
                Engineering doesn't stop with daily sprint tickets. Outside enterprise client commitments, I continuously
                explore emerging frontend paradigms, prototype UI experiments, and evaluate new animation techniques.
              </p>
              <p className="text-slate-400 text-sm">
                Projects like the <span className="text-white font-semibold">Netflix Experience</span> allow me to
                explore high-density streaming layout systems, aggressive media lazy-loading, and atomic component isolation
                free from enterprise legacy constraints.
              </p>
            </div>

            {/* Tech badges */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Current Experiments:</div>
              <div className="flex flex-wrap gap-2">
                <TechBadge name="React 19 Server Actions" variant="glow" size="sm" />
                <TechBadge name="View Transitions API" variant="subtle" size="sm" />
                <TechBadge name="Micro-Frontends Interop" variant="subtle" size="sm" />
                <TechBadge name="Web Audio Synthesis" variant="glow" size="sm" />
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <MagneticButton
                variant="primary"
                size="md"
                onClick={() => {
                  trackProjectDemoClick('netflix-experience', PERSONAL_INFO.netflixProjectUrl);
                  window.open(PERSONAL_INFO.netflixProjectUrl, '_blank', 'noopener,noreferrer');
                }}
                className="font-mono text-xs"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>EXPLORE NETFLIX APP ↗</span>
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                size="md"
                onClick={() => {
                  trackExternalLink('github', PERSONAL_INFO.github);
                  window.open(PERSONAL_INFO.github, '_blank', 'noopener,noreferrer');
                }}
                className="font-mono text-xs"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GITHUB REPOSITORIES</span>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right: Creative Sandbox Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-5 rounded-3xl glass-panel-elevated p-6 sm:p-8 border border-brand-violet/30 shadow-2xl space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-brand-violet/20 text-brand-sky">
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">The Continuous Learning Lab</h4>
                <p className="text-xs font-mono text-slate-400">Never Stop Building</p>
              </div>
            </div>

            <div className="space-y-3 text-xs font-mono text-slate-300">
              <div className="p-3 rounded-xl bg-surface/70 border border-white/5 flex items-center justify-between">
                <span>Streaming Media Architecture</span>
                <span className="text-emerald-400">Deployed ✓</span>
              </div>
              <div className="p-3 rounded-xl bg-surface/70 border border-white/5 flex items-center justify-between">
                <span>Strict TypeScript Design Systems</span>
                <span className="text-emerald-400">Active ✓</span>
              </div>
              <div className="p-3 rounded-xl bg-surface/70 border border-white/5 flex items-center justify-between">
                <span>AI Pair-Programming (Claude/Copilot)</span>
                <span className="text-emerald-400">Mastered ✓</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
