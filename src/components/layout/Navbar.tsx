import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command } from 'lucide-react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { MagneticButton } from '../common/MagneticButton';
import { PERSONAL_INFO } from '../../data/constants';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeSection } = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'WORK', href: '#projects', section: 'projects' },
    { label: 'JOURNEY', href: '#journey', section: 'journey' },
    { label: 'TOOLBOX', href: '#skills', section: 'skills' },
    { label: 'PROCESS', href: '#workflow', section: 'workflow' },
    { label: 'ABOUT', href: '#about', section: 'about' },
    { label: 'CONTACT', href: '#contact', section: 'contact' },
  ];

  // Story Chapters for active indicator
  const getChapterIndicator = () => {
    if (['hero', 'terminal', 'about'].includes(activeSection)) return { label: 'MORNING', step: 1 };
    if (['journey', 'editor', 'skills', 'workflow'].includes(activeSection)) return { label: 'BUILD', step: 2 };
    if (['projects', 'performance', 'testing', 'ai'].includes(activeSection)) return { label: 'SHIP', step: 3 };
    if (['daily', 'bugfix', 'mindset', 'beyond', 'resume'].includes(activeSection)) return { label: 'EXPLORE', step: 4 };
    return { label: 'CONNECT', step: 5 };
  };

  const currentChapter = getChapterIndicator();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[800] transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-5 md:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Personal Brand */}
          <a
            href="#hero"
            className="group flex items-center gap-2 text-lg sm:text-xl font-extrabold tracking-tight text-white focus:outline-none"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-brand-violet group-hover:bg-brand-cyan group-hover:scale-125 transition-all duration-300 shadow-glow-sm" />
            <span className="font-display">VIDHYA<span className="text-brand-violet">.</span></span>
            <span className="hidden sm:inline-block text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
              REACT ARCHITECT
            </span>
          </a>

          {/* Center Story Indicator (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel border border-white/10 text-xs font-mono">
            <span className="text-brand-sky font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
              {currentChapter.label}
            </span>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              {[
                { name: 'MORNING', step: 1 },
                { name: 'BUILD', step: 2 },
                { name: 'SHIP', step: 3 },
                { name: 'EXPLORE', step: 4 },
                { name: 'CONNECT', step: 5 },
              ].map((c) => (
                <span
                  key={c.name}
                  className={`transition-colors ${
                    currentChapter.step === c.step ? 'text-white font-bold' : 'text-slate-600'
                  }`}
                >
                  {currentChapter.step === c.step ? '●' : '○'}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <div
              className={`flex items-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-300 ${
                isScrolled ? 'glass-panel-elevated shadow-lg' : 'bg-transparent'
              }`}
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-1.5 text-xs font-mono font-medium tracking-wider rounded-lg transition-all duration-200 ${
                    activeSection === item.section
                      ? 'text-white bg-white/10 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Command Palette Button */}
            <button
              onClick={onOpenCommandPalette}
              aria-label="Open Command Palette"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-300 hover:text-white bg-surface-elevated/80 border border-white/10 hover:border-brand-violet/50 rounded-xl transition-all ml-2"
            >
              <Command className="w-3.5 h-3.5 text-brand-sky" />
              <span className="hidden xl:inline text-[11px]">Ctrl+K</span>
            </button>

            {/* Let's Talk CTA */}
            <MagneticButton
              variant="primary"
              size="sm"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="ml-2 shadow-sm text-xs font-mono"
            >
              LET'S BUILD ↗
            </MagneticButton>
          </nav>

          {/* Mobile Menu Toggle & Command Palette */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCommandPalette}
              aria-label="Open command palette"
              className="p-2 rounded-xl glass-panel text-slate-300 hover:text-white"
            >
              <Command className="w-4 h-4 text-brand-sky" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl glass-panel text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[799] bg-background/95 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col justify-between pb-10"
          >
            <div className="space-y-4">
              <div className="text-[11px] font-mono tracking-widest text-brand-sky uppercase mb-4">
                Current Chapter: {currentChapter.label}
              </div>
              <div className="divide-y divide-white/10">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-2xl font-bold tracking-tight text-slate-200 hover:text-white hover:text-brand-violet transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
                  </motion.a>
                ))}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full text-left py-3 text-xs font-mono text-slate-400 hover:text-white"
                >
                  Admin Telemetry Portal
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-sm font-mono"
              >
                LET'S BUILD SOMETHING ↗
              </MagneticButton>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2">
                <span>{PERSONAL_INFO.name}</span>
                <span className="text-brand-violet">React • 4+ YOE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
