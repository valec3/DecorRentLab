'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { MagneticWrapper } from './MagneticWrapper';

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps extends Omit<BaseButtonProps, keyof HTMLMotionProps<'button'>> {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  loading?: boolean;
  magnetic?: boolean;
  className?: string;
}

const motionProps: HTMLMotionProps<'button'> = {
  whileHover: { scale: 1.02, y: -2 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  magnetic = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-dorado text-white hover:bg-dorado-oscuro focus:ring-dorado shadow-soft hover:shadow-medium',
    secondary: 'bg-white text-dorado border-2 border-dorado hover:bg-dorado hover:text-white focus:ring-dorado',
    whatsapp: 'bg-whatsapp text-white hover:bg-green-600 focus:ring-whatsapp shadow-soft hover:shadow-medium',
    outline: 'bg-transparent text-carbon border border-borde hover:bg-crema-oscuro focus:ring-borde',
    ghost: 'bg-transparent text-gris-calido hover:text-carbon hover:bg-crema-oscuro'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const buttonContent = (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...(motionProps as any)}
      {...(props as any)}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </motion.button>
  );

  if (magnetic) {
    return <MagneticWrapper strength={30}>{buttonContent}</MagneticWrapper>;
  }

  return buttonContent;
}
