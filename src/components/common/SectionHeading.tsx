import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/motion';

interface SectionHeadingProps {
  time?: string;
  chapter?: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  time,
  chapter,
  title,
  subtitle,
  alignment = 'center',
  className = '',
}) => {
  const isCenter = alignment === 'center';

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}
    >
      {/* Chapter Marker / Timestamp */}
      {(time || chapter) && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-4 glass-panel border border-brand-violet/30 text-brand-sky ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
          {time && <span className="text-slate-300 font-semibold">{time}</span>}
          {time && chapter && <span className="text-slate-600">•</span>}
          {chapter && <span className="text-brand-purple">{chapter}</span>}
        </div>
      )}

      {/* Main Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Aesthetic accent line */}
      <div className={`mt-6 h-[2px] w-16 bg-gradient-to-r from-brand-violet via-brand-cyan to-transparent ${isCenter ? 'mx-auto' : ''}`} />
    </motion.div>
  );
};
