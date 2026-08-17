import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  cursorLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  cursorLabel,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = 'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet disabled:opacity-50 disabled:cursor-not-allowed group';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs tracking-wide',
    md: 'px-5 py-2.5 text-sm tracking-wide',
    lg: 'px-7 py-3.5 text-base tracking-wide font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-brand-violet to-brand-indigo text-white shadow-glow-sm hover:shadow-glow-md hover:brightness-110 border border-white/20',
    secondary:
      'bg-surface-elevated text-slate-200 border border-white/10 hover:border-brand-violet/50 hover:bg-surface-card hover:text-white',
    glass:
      'glass-panel text-slate-100 hover:border-brand-cyan/50 hover:bg-brand-violet/10',
    ghost:
      'bg-transparent text-slate-300 hover:text-white hover:bg-white/5',
    danger:
      'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30',
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 200, mass: 0.1 }}
      data-cursor={cursorLabel}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...(props as any)}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Light sheen effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
    </motion.button>
  );
};
