import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Rocket, Code, Terminal, FileText, Send, User, Cpu, Sparkles, X, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/constants';
import { trackCommandPaletteOpened, trackResumeDownload } from '../../lib/analytics';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = [
    {
      id: 'projects',
      title: 'Explore Projects & Work',
      subtitle: 'Netflix Experience, Tango Care, Marco Technologies',
      icon: Rocket,
      category: 'Navigation',
      handler: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'netflix',
      title: 'Open Netflix Experience Live Demo',
      subtitle: 'https://vidhya112.github.io/Netflix_App/',
      icon: ExternalLink,
      category: 'Projects',
      handler: () => {
        window.open(PERSONAL_INFO.netflixProjectUrl, '_blank');
        onClose();
      },
    },
    {
      id: 'skills',
      title: 'View Engineering Toolbox',
      subtitle: 'React, TypeScript, Redux, Material UI, Jest',
      icon: Code,
      category: 'Navigation',
      handler: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'performance',
      title: 'Inspect The Performance Lab',
      subtitle: '45% page load improvement & optimization metrics',
      icon: Cpu,
      category: 'Navigation',
      handler: () => {
        document.getElementById('performance')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'journey',
      title: 'Review Career Journey',
      subtitle: 'Cybage Software & Engineering Experience',
      icon: Terminal,
      category: 'Navigation',
      handler: () => {
        document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'resume',
      title: 'Download Resume (PDF)',
      subtitle: 'Vidhya Charpe — React Frontend Engineer',
      icon: FileText,
      category: 'Actions',
      handler: () => {
        trackResumeDownload();
        const link = document.createElement('a');
        link.href = PERSONAL_INFO.resumeDownloadUrl;
        link.download = 'Vidhya_Charpe_Resume.pdf';
        link.click();
        onClose();
      },
    },
    {
      id: 'contact',
      title: 'Start a Conversation / Contact',
      subtitle: 'Inquire for frontend engineering & freelance',
      icon: Send,
      category: 'Actions',
      handler: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'about',
      title: 'Who is behind the code?',
      subtitle: 'Personal philosophy & engineering mindset',
      icon: User,
      category: 'Navigation',
      handler: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
  ];

  const filteredActions = actions.filter(
    (action) =>
      action.title.toLowerCase().includes(query.toLowerCase()) ||
      action.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      action.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      trackCommandPaletteOpened();
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].handler();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-start justify-center p-4 pt-20 sm:pt-28">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-xl rounded-2xl glass-panel-elevated shadow-2xl overflow-hidden z-10 border border-brand-violet/30"
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-surface-card/60">
              <Search className="w-5 h-5 text-brand-sky mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or jump to section..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-white placeholder-slate-400 font-mono text-sm focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5">
              {filteredActions.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm font-mono flex flex-col items-center">
                  <Sparkles className="w-8 h-8 text-brand-violet mb-2 opacity-50" />
                  No commands matched "{query}"
                </div>
              ) : (
                filteredActions.map((action, index) => {
                  const Icon = action.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={action.id}
                      onClick={action.handler}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? 'bg-brand-violet/20 border border-brand-violet/40 text-white shadow-glow-sm'
                          : 'text-slate-300 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          isSelected ? 'bg-brand-violet text-white' : 'bg-surface-elevated text-brand-sky'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium tracking-tight truncate">{action.title}</div>
                        <div className="text-xs text-slate-400 truncate">{action.subtitle}</div>
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                        {action.category}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer helper */}
            <div className="px-4 py-2 bg-surface/80 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span>↑↓ Navigate</span>
                <span>•</span>
                <span>↵ Select</span>
                <span>•</span>
                <span>ESC Close</span>
              </div>
              <span className="text-brand-violet font-semibold">VIDHYA.DEV</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
