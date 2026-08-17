import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('vidhya_portfolio_analytics_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('vidhya_portfolio_analytics_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('vidhya_portfolio_analytics_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[900] glass-panel-elevated p-4 sm:p-5 rounded-2xl shadow-2xl border border-brand-violet/30"
        >
          <div className="flex items-start gap-3.5 mb-3">
            <div className="p-2 rounded-xl bg-brand-violet/20 text-brand-sky shrink-0 mt-0.5">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">Privacy & Analytics</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                I use lightweight, anonymous telemetry to improve interactions and measure project views. No personal data is tracked.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
            <button
              onClick={handleDecline}
              className="px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors rounded-lg"
            >
              Decline
            </button>
            <MagneticButton
              variant="primary"
              size="sm"
              onClick={handleAccept}
              className="text-xs py-1.5 px-3"
            >
              <Check className="w-3.5 h-3.5 mr-1" />
              Accept Analytics
            </MagneticButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
