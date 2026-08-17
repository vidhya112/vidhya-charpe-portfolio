import React from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'words' | 'characters' | 'lines';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  type = 'words',
}) => {
  if (type === 'characters') {
    const letters = Array.from(text);
    const container: Variants = {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.03, delayChildren: delay * i },
      }),
    };

    const child: Variants = {
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', damping: 12, stiffness: 100 },
      },
      hidden: {
        opacity: 0,
        y: 15,
      },
    };

    return (
      <motion.span
        className={`inline-block ${className}`}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {letters.map((letter, index) => (
          <motion.span variants={child} key={index} className="inline-block">
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  const words = text.split(' ');
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
