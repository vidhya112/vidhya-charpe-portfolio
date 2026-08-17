import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { Bug, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';
import { fadeUp } from '../../lib/motion';

export const BugFixGame: React.FC = () => {
  const [bugState, setBugState] = useState<'idle' | 'triggered' | 'solved'>('idle');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);

  const bugOptions = [
    {
      id: 0,
      title: 'State Race Condition in useEffect',
      explanation: 'Missing cleanup and uncancelled asynchronous promise resolution during unmount.',
      isCorrect: true,
    },
    {
      id: 1,
      title: 'Incorrect CSS flex-basis Property',
      explanation: 'Layout issue unrelated to asynchronous state updates.',
      isCorrect: false,
    },
    {
      id: 2,
      title: 'Hardcoded Localhost Port in Production',
      explanation: 'Environment variable missing, but error occurs in client-side hook cycle.',
      isCorrect: false,
    },
  ];

  const handleTriggerBug = () => {
    setBugState('triggered');
    setSelectedOption(null);
    setIsWrongAnswer(false);
  };

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    if (bugOptions[idx].isCorrect) {
      setIsWrongAnswer(false);
      setBugState('solved');
    } else {
      setIsWrongAnswer(true);
    }
  };

  const handleReset = () => {
    setBugState('idle');
    setSelectedOption(null);
    setIsWrongAnswer(false);
  };

  return (
    <section id="bugfix" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          time="06:00 PM"
          chapter="INTERACTIVE DIAGNOSTIC"
          title="SOMETHING BROKE."
          subtitle="Engineering is defined by how we diagnose, isolate, and resolve critical runtime bugs under pressure."
        />

        {/* Diagnostic Simulator Container */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="rounded-3xl glass-panel-elevated p-6 sm:p-10 border border-brand-violet/30 shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Bug className="w-4 h-4 text-red-400" />
              <span>Interactive Frontend Debugger Simulator</span>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset State</span>
            </button>
          </div>

          {/* Interactive Simulation Area */}
          <div className="p-6 rounded-2xl bg-[#070b14] border border-white/10 space-y-4">
            {bugState === 'idle' && (
              <div className="text-center py-8 space-y-4">
                <p className="text-sm font-mono text-slate-300">
                  Simulate a high-frequency asynchronous submission on a healthcare referral form:
                </p>
                <MagneticButton
                  variant="primary"
                  size="md"
                  onClick={handleTriggerBug}
                  className="bg-brand-violet font-mono text-xs shadow-glow-sm"
                >
                  CLICK: SUBMIT REFERRAL PAYLOAD
                </MagneticButton>
              </div>
            )}

            {bugState === 'triggered' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                {/* Red Error Banner */}
                <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/40 flex items-start gap-3 text-red-300 font-mono text-xs">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">RUNTIME WARNING: MEMORY LEAK & DESYNC DETECTED</div>
                    <div className="text-[11px] text-red-300/90 mt-0.5">
                      Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
                  Select the architectural root cause to deploy fix:
                </div>

                {/* Options List */}
                <div className="space-y-2">
                  {bugOptions.map((opt, idx) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border font-mono text-xs transition-all flex items-start justify-between gap-3 ${
                        selectedOption === idx && !opt.isCorrect
                          ? 'bg-red-500/20 border-red-500 text-red-200'
                          : 'bg-surface-elevated/70 border-white/10 hover:border-brand-violet/50 hover:bg-surface-card text-slate-200'
                      }`}
                    >
                      <div>
                        <div className="font-bold">{opt.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{opt.explanation}</div>
                      </div>
                      <span className="text-[11px] text-brand-sky">Select ❯</span>
                    </button>
                  ))}
                </div>

                {isWrongAnswer && (
                  <div className="text-xs font-mono text-red-400 text-center pt-2">
                    ✕ Not the root cause. Inspect component unmount lifecycle!
                  </div>
                )}
              </motion.div>
            )}

            {bugState === 'solved' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-glow-emerald">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold font-mono text-white">BUG FOUND & FIX DEPLOYED ✓</h4>
                  <p className="text-xs font-mono text-slate-300 max-w-md mx-auto">
                    Applied AbortController cleanup in custom hook + normalized Redux optimistic update.
                    Zero memory leaks.
                  </p>
                </div>

                <div className="pt-2">
                  <MagneticButton
                    variant="secondary"
                    size="sm"
                    onClick={handleReset}
                    className="font-mono text-xs"
                  >
                    Play Again
                  </MagneticButton>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
