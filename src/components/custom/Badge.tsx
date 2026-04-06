import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'featured' | 'unavailable';
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-crema-oscuro/50 text-gris-calido border-borde/30',
    success: 'bg-verde-savia/10 text-verde-savia border-verde-savia/15',
    warning: 'bg-dorado/15 text-dorado-oscuro border-dorado/20',
    error: 'bg-red-50/40 text-red-500 border-red-100/30',
    featured: 'bg-dorado text-white border-transparent shadow-sm',
    unavailable: 'bg-carbon/10 text-carbon/70 border-carbon/20 backdrop-blur-sm'
  };

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded-sm text-[7px] font-bold uppercase tracking-widest border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
