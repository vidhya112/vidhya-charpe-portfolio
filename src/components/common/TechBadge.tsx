import React from 'react';
import { motion } from 'framer-motion';

interface TechBadgeProps {
  name: string;
  variant?: 'subtle' | 'glow' | 'accent';
  size?: 'sm' | 'md';
  onClick?: () => void;
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  name,
  variant = 'subtle',
  size = 'md',
  onClick,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-xs md:text-sm px-3.5 py-1.5 gap-2',
  };

  const variantClasses = {
    subtle:
      'bg-surface-elevated/80 border border-white/10 text-slate-300 hover:border-brand-violet/40 hover:text-white hover:bg-surface-card',
    glow:
      'bg-brand-violet/10 border border-brand-violet/30 text-brand-sky hover:bg-brand-violet/20 hover:border-brand-cyan/50 hover:shadow-glow-sm',
    accent:
      'bg-brand-cyan/10 border border-brand-cyan/30 text-cyan-200 hover:bg-brand-cyan/20 hover:border-cyan-400',
  };

  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`inline-flex items-center font-mono rounded-lg transition-all duration-200 cursor-default select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan/60" />
      <span>{name}</span>
    </motion.span>
  );
};
