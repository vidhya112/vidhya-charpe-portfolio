import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { FileText, Download, Eye, Award, Briefcase, GraduationCap } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';
import { Modal } from '../common/Modal';
import { PERSONAL_INFO } from '../../data/constants';
import { fadeUp } from '../../lib/motion';
import { trackResumeDownload, trackResumeView } from '../../lib/analytics';

export const ResumeSection: React.FC = () => {
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);

  const handleDownload = () => {
    trackResumeDownload();
    const link = document.createElement('a');
    link.href = PERSONAL_INFO.resumeDownloadUrl;
    link.download = 'Vidhya_Charpe_Resume.pdf';
    link.click();
  };

  const handleOpenPreview = () => {
    trackResumeView();
    setIsResumePreviewOpen(true);
  };

  return (
    <section id="resume" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background-secondary/50 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          time="07:30 PM"
          chapter="CREDENTIALS"
          title="WANT THE FULL STORY?"
          subtitle="4+ years of verified software engineering experience across enterprise React development, testing, and modern frontend architecture."
        />

        {/* Resume Card Preview */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="rounded-3xl glass-panel-elevated p-6 sm:p-10 border border-brand-violet/30 shadow-2xl space-y-8 relative overflow-hidden"
        >
          {/* Top banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-brand-violet/20 text-brand-sky border border-brand-violet/40 shadow-glow-sm">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {PERSONAL_INFO.name} — Curriculum Vitae
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Software Engineer • React & TypeScript Specialist • 4+ Years Experience
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <MagneticButton
                variant="primary"
                size="md"
                onClick={handleDownload}
                className="font-mono text-xs w-full sm:w-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD RESUME (PDF)</span>
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                size="md"
                onClick={handleOpenPreview}
                className="font-mono text-xs w-full sm:w-auto"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>VIEW SUMMARY</span>
              </MagneticButton>
            </div>
          </div>

          {/* Quick Resume Highlights Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-surface-card border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-sky font-bold uppercase">
                <Briefcase className="w-4 h-4 text-brand-violet" />
                Experience
              </div>
              <div className="text-sm font-bold text-white">Cybage Software Pvt. Ltd.</div>
              <div className="text-xs text-slate-400 font-mono">Software Engineer (2022 – Present)</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                4+ years delivering scalable healthcare (Tango Care) and enterprise platforms (Marco Technologies).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-card border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-sky font-bold uppercase">
                <GraduationCap className="w-4 h-4 text-brand-cyan" />
                Education
              </div>
              <div className="text-sm font-bold text-white">Post Graduate Diploma (PG-DAC)</div>
              <div className="text-xs text-slate-400 font-mono">CDAC (2021)</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Advanced Computing, distributed systems, algorithms, and full-stack software architecture.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-card border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-sky font-bold uppercase">
                <Award className="w-4 h-4 text-emerald-400" />
                Key Metrics
              </div>
              <div className="text-sm font-bold text-white">Verified Impact</div>
              <div className="text-xs text-slate-400 font-mono">Production Standards</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                45% faster load times, 85%+ test coverage, 12+ features shipped, 20% sprint velocity boost.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Resume Preview Modal */}
        <Modal
          isOpen={isResumePreviewOpen}
          onClose={() => setIsResumePreviewOpen(false)}
          title="Vidhya Charpe — Professional Resume"
          maxWidth="4xl"
        >
          <div className="space-y-6 text-slate-200">
            {/* Header info */}
            <div className="p-4 rounded-xl bg-surface border border-white/10 space-y-2">
              <h3 className="text-2xl font-extrabold text-white">{PERSONAL_INFO.name}</h3>
              <p className="text-xs font-mono text-brand-sky">
                Software Engineer • {PERSONAL_INFO.email} • {PERSONAL_INFO.location}
              </p>
              <p className="text-xs text-slate-300">
                Summary: Software Engineer with 4+ years of professional experience specializing in React.js, TypeScript, Redux Toolkit, and Material UI. Proven track record of boosting performance by 45% and maintaining 85%+ code coverage.
              </p>
            </div>

            {/* Employment History */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-brand-sky font-bold">
                Professional Experience
              </h4>
              <div className="p-4 rounded-xl bg-surface-card border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-white">
                  <span>Cybage Software Pvt. Ltd. — Software Engineer</span>
                  <span className="text-xs font-mono text-slate-400">Jan 2022 – Present</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                  <li>Engineered scalable healthcare management system (Tango Care) using React.js, Material UI, and REST microservices.</li>
                  <li>Delivered enterprise solutions (Marco Technologies) with strict TypeScript typing, Azure Boards, and automated CI/CD.</li>
                  <li>Achieved 45% page load time optimization utilizing code splitting, lazy loading, and memoization.</li>
                  <li>Maintained 85%+ test coverage with Jest and React Testing Library across critical client workflows.</li>
                  <li>Boosted sprint delivery velocity by 20% through standardized reusable component architectures.</li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <MagneticButton
                variant="primary"
                size="md"
                onClick={handleDownload}
                className="font-mono text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </MagneticButton>
              <button
                onClick={() => setIsResumePreviewOpen(false)}
                className="text-xs font-mono text-slate-400 hover:text-white"
              >
                Close Preview ✕
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};
