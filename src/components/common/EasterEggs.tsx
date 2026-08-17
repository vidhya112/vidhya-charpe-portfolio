import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useKonamiCode } from '../../hooks/useReducedMotion';
import { Modal } from './Modal';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export const EasterEggs: React.FC = () => {
  const [isKonamiOpen, setIsKonamiOpen] = useState(false);

  useKonamiCode(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#06b6d4', '#10b981', '#ffffff'],
      });
    } catch {
      // confetti catch
    }
    setIsKonamiOpen(true);
  });

  return (
    <>
      <Modal
        isOpen={isKonamiOpen}
        onClose={() => setIsKonamiOpen(false)}
        title="DEVELOPER EASTER EGG UNLOCKED"
      >
        <div className="space-y-6 text-slate-200">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-brand-violet/10 border border-brand-violet/30">
            <div className="p-3 rounded-full bg-brand-violet/20 text-brand-sky">
              <Sparkles className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg">Secret Konami Code Activated</h4>
              <p className="text-xs text-slate-300 font-mono">
                ↑ ↑ ↓ ↓ ← → ← → B A • Engineering Mode: OVERCLOCKED
              </p>
            </div>
          </div>

          <div className="font-mono text-xs bg-surface-elevated/90 p-4 rounded-xl border border-white/10 space-y-2 text-brand-sky">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>React 19 Fiber Architecture: LOADED</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Lighthouse Perf Mode: 95+</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Coffee Reservoir: MAXIMUM CAPACITY ☕</span>
            </div>
            <div className="text-slate-400 pt-2 border-t border-white/5">
              “Thanks for exploring under the hood! Great engineers always test the boundaries.” — Vidhya
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <MagneticButton
              variant="primary"
              size="md"
              onClick={() => setIsKonamiOpen(false)}
            >
              Back to Portfolio 🚀
            </MagneticButton>
          </div>
        </div>
      </Modal>
    </>
  );
};
