import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { MagneticButton } from '../common/MagneticButton';
import { BuyMeCoffee } from './BuyMeCoffee';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Check,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import { PERSONAL_INFO, PROJECT_TYPES, BUDGET_RANGES } from '../../data/constants';
import { submitContact } from '../../lib/firebase';
import { trackContactStarted, trackContactSubmitted, trackExternalLink } from '../../lib/analytics';
import { fadeUp } from '../../lib/motion';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: PROJECT_TYPES[0],
    budgetRange: BUDGET_RANGES[0],
    message: '',
    honeypot: '', // anti-spam
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    'React Frontend Development',
    'Modern UI/UX Implementation',
    'Responsive Single Page Applications',
    'Frontend Performance Optimization',
    'Modular Component Systems (MUI/Tailwind)',
    'Type-Safe React & TypeScript Projects',
    'Unit Testing & Code Coverage (Jest/RTL)',
    'UI Bug Diagnosis & Refactoring',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (formStatus === 'idle') {
      trackContactStarted();
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      setFormStatus('error');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const response = await submitContact(formData);
      if (response.success) {
        trackContactSubmitted(formData.projectType);
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          projectType: PROJECT_TYPES[0],
          budgetRange: BUDGET_RANGES[0],
          message: '',
          honeypot: '',
        });
      } else {
        setErrorMessage(response.message || 'Something went wrong. Please try again.');
        setFormStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please try again or email directly.');
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          time="08:30 PM"
          chapter="LET'S CONNECT"
          title="YOUR IDEA. LET'S BUILD IT."
          subtitle="Have a product idea, frontend challenge, or scalable React project that needs a polished interface? Let's talk."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Links & Capabilities */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Direct Connect Box */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-brand-violet/30 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Available For Opportunities</h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Full-time engineering roles, high-impact contracts & freelance collaborations.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-3 font-mono text-xs">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  onClick={() => trackExternalLink('email', PERSONAL_INFO.email)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-surface-card border border-white/5 hover:border-brand-violet/40 text-slate-300 hover:text-white transition-all group"
                  data-cursor="EMAIL"
                >
                  <div className="p-2 rounded-lg bg-brand-violet/20 text-brand-sky group-hover:bg-brand-violet group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-slate-500 uppercase">Direct Email</div>
                    <div className="truncate font-semibold">{PERSONAL_INFO.email}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink('linkedin', PERSONAL_INFO.linkedin)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-surface-card border border-white/5 hover:border-brand-sky/40 text-slate-300 hover:text-white transition-all group"
                  data-cursor="LINKEDIN"
                >
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-slate-500 uppercase">LinkedIn Profile</div>
                    <div className="truncate font-semibold">linkedin.com/in/vidhyacharpe</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink('github', PERSONAL_INFO.github)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-surface-card border border-white/5 hover:border-brand-violet/40 text-slate-300 hover:text-white transition-all group"
                  data-cursor="GITHUB"
                >
                  <div className="p-2 rounded-lg bg-white/10 text-slate-300 group-hover:bg-brand-violet group-hover:text-white transition-colors">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-slate-500 uppercase">GitHub Repository</div>
                    <div className="truncate font-semibold">github.com/vidhya112</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              </div>

              {/* Response Time Badge */}
              <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Typical response time: Within 24 hours</span>
              </div>
            </div>

            {/* Scope Capabilities */}
            <div className="space-y-3 p-6 rounded-3xl glass-panel border border-white/10">
              <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-brand-sky">
                Engineering Services & Scope
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {services.map((srv, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-cyan shrink-0 mt-0.5" />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Validated Contact Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-7 rounded-3xl glass-panel-elevated p-6 sm:p-10 border border-brand-violet/30 shadow-2xl relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              Send a Direct Project Message
            </h3>
            <p className="text-xs font-mono text-slate-400 mb-6">
              Messages are processed through secure serverless validation and recorded to Firestore.
            </p>

            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="inline-flex p-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-glow-emerald">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-white font-mono">MESSAGE DELIVERED ✓</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out! I have received your message and will get back to you shortly.
                  </p>
                  <MagneticButton
                    variant="secondary"
                    size="sm"
                    onClick={() => setFormStatus('idle')}
                    className="font-mono text-xs mt-4"
                  >
                    Send Another Message
                  </MagneticButton>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  {/* Honeypot field for anti-spam */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleInputChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-semibold" htmlFor="name">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-xl bg-surface/80 border border-white/10 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-brand-violet"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-semibold" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-surface/80 border border-white/10 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-brand-violet"
                      />
                    </div>
                  </div>

                  {/* Project Type & Budget Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-semibold" htmlFor="projectType">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface/80 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-brand-violet"
                      >
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type} className="bg-surface-elevated text-white">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-semibold" htmlFor="budgetRange">
                        Budget Range
                      </label>
                      <select
                        id="budgetRange"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface/80 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-brand-violet"
                      >
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b} className="bg-surface-elevated text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-semibold" htmlFor="message">
                      Project Details / Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your product requirements, timelines, or engineering challenge..."
                      className="w-full px-4 py-2.5 rounded-xl bg-surface/80 border border-white/10 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-brand-violet resize-none"
                    />
                  </div>

                  {/* Error display */}
                  {formStatus === 'error' && (
                    <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMessage || 'Failed to submit form.'}</span>
                    </div>
                  )}

                  {/* Submit CTA */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <MagneticButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={formStatus === 'submitting'}
                      className="w-full sm:w-auto font-mono text-xs"
                    >
                      {formStatus === 'submitting' ? (
                        <span>TRANSMITTING MESSAGE...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>START A CONVERSATION</span>
                        </>
                      )}
                    </MagneticButton>

                    <span className="text-[11px] font-mono text-slate-500 text-center sm:text-right">
                      🔒 Validated & Rate-Limited
                    </span>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Buy Me a Coffee Section Footer Accent */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center justify-center text-center space-y-3">
          <p className="text-xs font-mono text-slate-400">Did this portfolio narrative inspire or help you?</p>
          <BuyMeCoffee />
        </div>
      </div>
    </section>
  );
};
