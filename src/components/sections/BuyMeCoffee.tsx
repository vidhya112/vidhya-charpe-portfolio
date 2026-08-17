import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/constants';
import { trackCoffeeClick } from '../../lib/analytics';

export const BuyMeCoffee: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackCoffeeClick();
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount < 4) {
      window.open(PERSONAL_INFO.buyMeACoffeeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="relative group px-5 py-2.5 rounded-2xl glass-panel-elevated border border-amber-500/30 hover:border-amber-400 text-slate-200 hover:text-white transition-all shadow-md overflow-hidden flex items-center gap-2.5 font-mono text-xs"
        data-cursor="COFFEE"
      >
        {/* Animated coffee liquid fill on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-amber-600/30 to-amber-500/10 pointer-events-none"
          initial={{ y: '100%' }}
          animate={{ y: isHovered ? '0%' : '100%' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        <div className="relative z-10 flex items-center gap-2">
          <Coffee className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-bold tracking-wide">BUY ME A COFFEE ☕</span>
        </div>
      </motion.button>

      {/* Playful easter egg state */}
      {clickCount >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-[11px] font-mono text-amber-400 flex items-center gap-1 font-bold animate-pulse"
        >
          <Sparkles className="w-3 h-3" />
          <span>Coffee level: CRITICAL ☕ ({clickCount} cups queued!)</span>
        </motion.div>
      )}
    </div>
  );
};
