import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const steps = [
      { text: 'VIDHYA.DEV BOOTSTRAP...', progress: 35, delay: 200 },
      { text: 'HYDRATING REACT FIBER...', progress: 65, delay: 500 },
      { text: 'CALIBRATING DESIGN SYSTEM...', progress: 85, delay: 850 },
      { text: 'EXPERIENCE READY ✓', progress: 100, delay: 1100 },
    ];

    const timeouts = steps.map((s, idx) =>
      setTimeout(() => {
        setStep(idx);
        setProgress(s.progress);
        if (idx === steps.length - 1) {
          setTimeout(onComplete, 350);
        }
      }, s.delay)
    );

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [onComplete]);

  const stepTexts = [
    'VIDHYA.DEV BOOTSTRAP...',
    'HYDRATING REACT FIBER...',
    'CALIBRATING DESIGN SYSTEM...',
    'EXPERIENCE READY ✓',
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[99999] bg-[#05070d] flex flex-col items-center justify-center p-6 select-none"
    >
      {/* Central Loader Panel */}
      <div className="w-full max-w-sm rounded-2xl glass-panel-elevated p-6 border border-brand-violet/30 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-violet/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-brand-sky font-semibold">
            <Terminal className="w-4 h-4 text-brand-violet animate-pulse" />
            <span>VIDHYA.DEV</span>
          </div>
          <span className="text-brand-violet font-mono">{progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-surface-elevated rounded-full overflow-hidden mb-5">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-violet via-brand-indigo to-brand-cyan"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        {/* Terminal status line */}
        <div className="h-6 font-mono text-xs text-slate-200 flex items-center gap-2">
          <span className="text-brand-cyan animate-pulse">❯</span>
          <span>{stepTexts[step]}</span>
        </div>
      </div>
    </motion.div>
  );
};
