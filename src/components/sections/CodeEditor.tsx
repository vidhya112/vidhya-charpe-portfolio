import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { Code2, FileCode, Copy, Check } from 'lucide-react';
import { fadeUp } from '../../lib/motion';

interface CodeFile {
  id: string;
  name: string;
  language: string;
  description: string;
  code: string;
}

export const CodeEditor: React.FC = () => {
  const files: CodeFile[] = [
    {
      id: 'app',
      name: 'App.tsx',
      language: 'typescript',
      description: 'Root engineering story architecture',
      code: `// Vidhya.dev — Frontend Architecture
import React from 'react';
import { Journey, Build, Optimize, Test, Ship } from '@/features';
import { usePerformanceOptimizer } from '@/hooks/usePerformance';

export function Experience(): JSX.Element {
  const { metrics, isOptimized } = usePerformanceOptimizer({
    lazyLoad: true,
    codeSplitting: true,
    memoizeThreshold: 60, // 60fps standard
  });

  return (
    <Journey title="A Day in the Life">
      <Build framework="React 19" typeSafety="Strict TypeScript" />
      <Optimize target="45% Page Load Boost" metrics={metrics} />
      <Test standard="85%+ Coverage" suite={['Jest', 'RTL']} />
      <Ship pipeline="Azure DevOps CI/CD" isReady={isOptimized} />
    </Journey>
  );
}`,
    },
    {
      id: 'hooks',
      name: 'usePerformance.ts',
      language: 'typescript',
      description: 'Custom hook for rendering & latency profiling',
      code: `import { useMemo, useCallback } from 'react';

export function usePerformanceOptimizer(config: OptimizerConfig) {
  // Memoize expensive transforms to eliminate redundant render cycles
  const optimizedData = useMemo(() => {
    return transformPatientRecords(config.records, {
      virtualize: true,
      lazyImages: true,
    });
  }, [config.records]);

  const handleUpdate = useCallback((id: string, status: string) => {
    // Optimistic UI state update with normalized Redux dispatch
    dispatch(updateReferralStatus({ id, status }));
  }, [dispatch]);

  return { optimizedData, handleUpdate, isOptimized: true };
}`,
    },
    {
      id: 'features',
      name: 'ReferralSlice.ts',
      language: 'typescript',
      description: 'Redux Toolkit normalized state store',
      code: `import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HealthcareApi } from '@/services/HealthcareApi';

export const fetchReferralById = createAsyncThunk(
  'referrals/fetchById',
  async (referralId: string, { rejectWithValue }) => {
    try {
      const response = await HealthcareApi.getReferral(referralId);
      return response.data;
    } catch (err) {
      return rejectWithValue('Failed to retrieve patient referral record');
    }
  }
);

export const referralSlice = createSlice({
  name: 'referrals',
  initialState: { items: {}, status: 'idle', error: null },
  reducers: {
    // Atomic state mutations
  },
});`,
    },
  ];

  const [activeTab, setActiveTab] = useState(files[0].id);
  const [copied, setCopied] = useState(false);

  const activeFile = files.find((f) => f.id === activeTab) || files[0];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="editor" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          time="10:45 AM"
          chapter="ENTER THE CODEBASE"
          title="Readable, Modular, Composable React Code"
          subtitle="Clean component boundaries, custom hooks, and predictable state slices designed for long-term scalability."
        />

        {/* Stylized Interactive Code Sandbox */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="rounded-2xl glass-panel-elevated overflow-hidden border border-brand-violet/30 shadow-2xl"
        >
          {/* Editor Header Bar */}
          <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-surface-card border-b border-white/10 gap-2">
            {/* Window controls & Editor title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5 ml-2">
                <Code2 className="w-3.5 h-3.5 text-brand-violet" />
                <span>vidhya.dev/workspace</span>
              </span>
            </div>

            {/* Copy button */}
            <button
              onClick={copyToClipboard}
              aria-label="Copy code to clipboard"
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* File Tabs */}
          <div className="flex items-center overflow-x-auto bg-[#070b14] border-b border-white/10 px-2 pt-2 scrollbar-none">
            {files.map((file) => {
              const isActive = file.id === activeTab;
              return (
                <button
                  key={file.id}
                  onClick={() => setActiveTab(file.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-t-xl border-t border-x transition-all duration-150 shrink-0 ${
                    isActive
                      ? 'bg-surface-elevated text-brand-sky border-brand-violet/40 font-semibold'
                      : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-brand-violet' : 'text-slate-500'}`} />
                  <span>{file.name}</span>
                </button>
              );
            })}
          </div>

          {/* Code Viewport with Syntax Aesthetic */}
          <div className="p-5 sm:p-6 bg-[#080d18] font-mono text-xs sm:text-sm overflow-x-auto min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.pre
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-slate-200 leading-relaxed"
              >
                <code>
                  {activeFile.code.split('\n').map((line, lineIdx) => {
                    const isComment = line.trim().startsWith('//');
                    const isImport = line.trim().startsWith('import') || line.trim().startsWith('export');
                    const isKeyword = line.includes('function') || line.includes('const') || line.includes('return') || line.includes('interface');

                    return (
                      <div key={lineIdx} className="table-row">
                        <span className="table-cell pr-4 sm:pr-6 text-right select-none text-slate-600 text-xs">
                          {lineIdx + 1}
                        </span>
                        <span
                          className={`table-cell ${
                            isComment
                              ? 'text-slate-500 italic'
                              : isImport
                              ? 'text-brand-purple'
                              : isKeyword
                              ? 'text-brand-cyan'
                              : 'text-slate-200'
                          }`}
                        >
                          {line}
                        </span>
                      </div>
                    );
                  })}
                </code>
              </motion.pre>
            </AnimatePresence>
          </div>

          {/* Editor Status Bar */}
          <div className="px-4 py-2 bg-surface border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                TypeScript 5.7 (Strict)
              </span>
              <span>•</span>
              <span>UTF-8</span>
            </div>
            <span className="text-slate-400">{activeFile.description}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
