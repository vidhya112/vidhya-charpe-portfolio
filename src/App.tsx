import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/common/CustomCursor';
import { CommandPalette } from './components/common/CommandPalette';
import { EasterEggs } from './components/common/EasterEggs';
import { CookieConsent } from './components/common/CookieConsent';
import { PageLoader } from './components/layout/PageLoader';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Narrative Story Sections
import { Hero } from './components/sections/Hero';
import { TerminalSection } from './components/sections/TerminalSection';
import { About } from './components/sections/About';
import { Journey } from './components/sections/Journey';
import { CodeEditor } from './components/sections/CodeEditor';
import { SkillsToolbox } from './components/sections/SkillsToolbox';
import { Workflow } from './components/sections/Workflow';
import { Projects } from './components/sections/Projects';
import { PerformanceLab } from './components/sections/PerformanceLab';
import { TestingLab } from './components/sections/TestingLab';
import { AIEngineering } from './components/sections/AIEngineering';
import { DailyJourney } from './components/sections/DailyJourney';
import { BugFixGame } from './components/sections/BugFixGame';
import { Mindset } from './components/sections/Mindset';
import { BeyondTheJob } from './components/sections/BeyondTheJob';
import { ResumeSection } from './components/sections/ResumeSection';
import { DramaticBridge } from './components/sections/DramaticBridge';
import { ContactSection } from './components/sections/ContactSection';
import { AdminDashboard } from './components/sections/AdminDashboard';
import { trackPageView } from './lib/analytics';

export function App() {
  const [loading, setLoading] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    trackPageView('home');

    // Ctrl+K keybinding listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-slate-100 selection:bg-brand-violet/40 selection:text-brand-sky">
      {/* Global Interactive Overlays */}
      <CustomCursor />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
      <EasterEggs />
      <CookieConsent />
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Initial Screen Loader */}
      <AnimatePresence>
        {loading && <PageLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Global Navigation */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Narrative Story Progression */}
      <main id="main-content" className="relative z-10 focus:outline-none">
        {/* 09:00 MORNING */}
        <Hero />

        {/* 09:12 THE FIRST COMMIT */}
        <TerminalSection />

        {/* 09:30 WHO IS BEHIND THE CODE */}
        <About />

        {/* 10:00 THE JOURNEY */}
        <Journey />

        {/* 10:45 ENTER THE CODEBASE */}
        <CodeEditor />

        {/* 11:30 MY TOOLBOX */}
        <SkillsToolbox />

        {/* 01:30 HOW I BUILD */}
        <Workflow />

        {/* 02:30 THINGS I'VE BUILT (SHOWCASE) */}
        <Projects />

        {/* 03:30 THE PERFORMANCE LAB */}
        <PerformanceLab />

        {/* 04:30 TRUST THE CODE (TESTING) */}
        <TestingLab />

        {/* 05:00 AI × ENGINEERING */}
        <AIEngineering />

        {/* 05:30 ONE DAY IN MY CODE */}
        <DailyJourney />

        {/* 06:00 SOMETHING BROKE (INTERACTIVE BUG FIX) */}
        <BugFixGame />

        {/* 06:30 ENGINEERING MINDSET */}
        <Mindset />

        {/* 07:00 BEYOND THE JOB (SIDE PROJECTS) */}
        <BeyondTheJob />

        {/* 07:30 RESUME & CREDENTIALS */}
        <ResumeSection />

        {/* 08:00 DRAMATIC BRIDGE */}
        <DramaticBridge />

        {/* 08:30 CONTACT & FREELANCING */}
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
    </div>
  );
}

export default App;
