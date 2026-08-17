import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { TechBadge } from '../common/TechBadge';
import { fadeUp } from '../../lib/motion';

export const TerminalSection: React.FC = () => {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const scriptSequence = [
    { text: '$ git status', delay: 200 },
    { text: 'On branch feature/frontend-architecture', delay: 500 },
    { text: 'Your branch is up to date with origin/develop.', delay: 700 },
    { text: '$ npm run dev', delay: 1100 },
    { text: '⚡ VITE v6.1.0 ready in 184 ms', delay: 1500 },
    { text: '➜ Local:   http://localhost:5173/', delay: 1800 },
    { text: '➜ Hydrated: React 19 • TypeScript • Redux Toolkit', delay: 2200 },
    { text: '➜ Ready: "Every day starts with a problem worth solving."', delay: 2600 },
  ];

  const runTerminalScript = () => {
    setTerminalLines([]);
    setIsTyping(true);

    scriptSequence.forEach((item, index) => {
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, item.text]);
        if (index === scriptSequence.length - 1) {
          setIsTyping(false);
        }
      }, item.delay);
    });
  };

  useEffect(() => {
    runTerminalScript();
  }, []);

  return (
    <section
      id="terminal"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background-secondary/60 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          time="09:12 AM"
          chapter="THE FIRST COMMIT"
          title="Every Day Starts with a Problem Worth Solving"
          subtitle="Before the first line of UI renders, the architecture is initialized with clean branches, reliable scripts, and strict TypeScript types."
        />

        {/* Animated Terminal Window */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="rounded-2xl glass-panel-elevated overflow-hidden border border-white/15 shadow-2xl relative"
        >
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-surface-card border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                vidhya@dev-station: ~/projects/portfolio (feature/frontend)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={runTerminalScript}
                disabled={isTyping}
                aria-label="Rerun terminal sequence"
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isTyping ? 'animate-spin' : ''}`} />
                <span>Replay</span>
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm min-h-[260px] space-y-2 bg-[#080c14] text-slate-300">
            {terminalLines.map((line, idx) => {
              const isCommand = line.startsWith('$');
              const isSuccess = line.startsWith('⚡') || line.startsWith('➜');
              return (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    isCommand
                      ? 'text-brand-cyan font-bold flex items-center gap-2'
                      : isSuccess
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                  }`}
                >
                  {isCommand && <span className="text-brand-violet">❯</span>}
                  <span>{isCommand ? line.substring(2) : line}</span>
                </div>
              );
            })}

            {/* Active Blinking Cursor */}
            <div className="flex items-center gap-2 text-brand-sky font-semibold pt-1">
              <span className="text-brand-violet">❯</span>
              <span className="animate-blink bg-brand-cyan inline-block w-2.5 h-4 ml-0.5" />
            </div>
          </div>

          {/* Terminal Footer Revealed Tech */}
          <div className="p-4 bg-surface/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="text-slate-400">Environment Ready:</span>
            <div className="flex flex-wrap gap-2">
              <TechBadge name="React 19" variant="glow" size="sm" />
              <TechBadge name="TypeScript" variant="glow" size="sm" />
              <TechBadge name="Redux" variant="glow" size="sm" />
              <TechBadge name="REST APIs" variant="glow" size="sm" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
