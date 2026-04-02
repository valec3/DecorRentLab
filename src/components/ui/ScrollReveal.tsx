'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  className?: string; // Nuevo
  height?: 'fit-content' | '100%'; // Nuevo
}

export function ScrollReveal({
  children,
  width = 'fit-content',
  height = 'fit-content',
  delay = 0.2,
  direction = 'up',
  distance = 30,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <div 
      ref={ref} 
      className={className}
      style={{ 
        position: 'relative', 
        width, 
        height,
        overflow: 'visible' 
      }}
    >
      <motion.div
        className={height === '100%' ? 'h-full' : ''}
        variants={{
          hidden: {
            opacity: 0,
            ...directionOffset[direction],
          },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
          },
        }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ height: height === '100%' ? '100%' : 'auto' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
