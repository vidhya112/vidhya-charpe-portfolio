import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'button' | 'hidden'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      const clickableTarget = target.closest('button, a, input, textarea, [role="button"]');

      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
        setCursorVariant('hover');
      } else if (clickableTarget) {
        setCursorText('');
        setCursorVariant('button');
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    const handleMouseLeave = () => setCursorVariant('hidden');
    const handleMouseEnter = () => setCursorVariant('default');

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice || prefersReducedMotion || cursorVariant === 'hidden') {
    return null;
  }

  return (
    <>
      {/* Central precise dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-brand-cyan/90 mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorVariant === 'hover' ? 0 : 6,
          height: cursorVariant === 'hover' ? 0 : 6,
        }}
      />

      {/* Outer reactive follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border flex items-center justify-center text-[10px] font-mono font-bold tracking-wider uppercase transition-colors duration-200"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorVariant === 'hover' ? 70 : cursorVariant === 'button' ? 44 : 28,
          height: cursorVariant === 'hover' ? 70 : cursorVariant === 'button' ? 44 : 28,
          borderColor:
            cursorVariant === 'hover'
              ? 'rgba(139, 92, 246, 0.8)'
              : cursorVariant === 'button'
              ? 'rgba(6, 182, 212, 0.6)'
              : 'rgba(255, 255, 255, 0.25)',
          backgroundColor:
            cursorVariant === 'hover'
              ? 'rgba(124, 58, 237, 0.2)'
              : cursorVariant === 'button'
              ? 'rgba(6, 182, 212, 0.1)'
              : 'rgba(255, 255, 255, 0.02)',
          backdropFilter: cursorVariant === 'hover' ? 'blur(4px)' : 'none',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-white text-xs font-semibold drop-shadow"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};
