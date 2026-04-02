import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'featured' | 'unavailable';
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-crema-oscuro text-gris-calido border-borde/50',
    success: 'bg-verde-savia/10 text-verde-savia border-verde-savia/20',
    warning: 'bg-dorado/10 text-dorado-oscuro border-dorado/20',
    error: 'bg-red-50/50 text-red-600 border-red-100/50',
    featured: 'bg-dorado-metal text-white border-transparent shadow-glow inner-glow',
    unavailable: 'bg-carbon/5 text-carbon/60 border-carbon/10 backdrop-blur-md'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-bold tracking-premium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
