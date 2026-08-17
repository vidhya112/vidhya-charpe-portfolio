import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { CheckCircle2, Play, Terminal } from 'lucide-react';
import { fadeUp } from '../../lib/motion';

export const TestingLab: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [completedTests, setCompletedTests] = useState(5);

  const testSuites = [
    { name: 'PatientRecordTable.test.tsx', tests: '✓ Component rendering & virtualization' },
    { name: 'ReferralForm.test.tsx', tests: '✓ User interactions & input sanitization' },
    { name: 'HealthcareApiAdapter.test.tsx', tests: '✓ API states (Loading, Success, Error 500)' },
    { name: 'UsePerformanceOptimizer.test.tsx', tests: '✓ Edge cases & memoization integrity' },
    { name: 'RootErrorBoundary.test.tsx', tests: '✓ Regression protection & graceful recovery' },
  ];

  const handleRunTests = () => {
    setIsRunning(true);
    setCompletedTests(0);

    testSuites.forEach((_, idx) => {
      setTimeout(() => {
        setCompletedTests(idx + 1);
        if (idx === testSuites.length - 1) {
          setIsRunning(false);
        }
      }, (idx + 1) * 350);
    });
  };

  return (
    <section id="testing" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background-secondary/50 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          time="04:30 PM"
          chapter="TESTING SUITE"
          title="TRUST THE CODE."
          subtitle="Comprehensive behavioral test suites with Jest and React Testing Library providing fearless regression protection."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left Column: Simulated Test Runner Terminal */}
          <div className="lg:col-span-7 rounded-3xl glass-panel-elevated p-6 sm:p-8 border border-white/15 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>vitest / jest --coverage</span>
              </div>

              <button
                onClick={handleRunTests}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-white bg-brand-violet hover:bg-brand-indigo rounded-xl shadow-sm transition-all disabled:opacity-50"
              >
                <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                <span>{isRunning ? 'RUNNING...' : 'RUN TESTS'}</span>
              </button>
            </div>

            {/* Test output stream */}
            <div className="space-y-3 font-mono text-xs bg-[#080d1a] p-5 rounded-2xl border border-white/5 min-h-[220px]">
              <div className="text-slate-400 flex items-center justify-between">
                <span>$ npm test -- --run</span>
                <span className="text-emerald-400 text-[11px]">PASS 5 / 5 suites</span>
              </div>

              {testSuites.map((suite, idx) => {
                const isPassed = idx < completedTests;
                return (
                  <motion.div
                    key={suite.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isPassed ? 1 : 0.2, x: 0 }}
                    className={`flex items-start justify-between p-2 rounded-lg ${
                      isPassed ? 'bg-emerald-500/10 text-slate-200' : 'text-slate-600'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold flex items-center gap-2">
                        {isPassed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-slate-700 inline-block" />
                        )}
                        <span className={isPassed ? 'text-white' : 'text-slate-500'}>{suite.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 pl-5.5">{suite.tests}</div>
                    </div>

                    <span className="text-[10px] text-emerald-400 font-bold self-center">
                      {isPassed ? 'PASS' : 'QUEUED'}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 85%+ Coverage Ring Badge */}
          <div className="lg:col-span-5 rounded-3xl glass-panel-elevated p-8 border border-brand-violet/30 shadow-2xl text-center space-y-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2">
              <span className="text-xs font-mono text-brand-sky uppercase font-bold tracking-widest">
                VERIFIED STANDARD
              </span>
              <h3 className="text-2xl font-extrabold text-white">Targeted Code Coverage</h3>
            </div>

            {/* Circular coverage meter simulation */}
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset="37.68" // 85% filled
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-extrabold font-mono text-white text-glow-cyan">85%+</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Coverage</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 font-mono space-y-1">
              <div>Frameworks: <span className="text-white font-semibold">Jest & React Testing Library</span></div>
              <div className="text-slate-400 text-[11px]">“Protecting user workflows before code hits production.”</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
