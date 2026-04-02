import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'featured' | 'unavailable';
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-crema-oscuro text-gris-calido border-borde',
    success: 'bg-verde-savia/10 text-verde-savia border-verde-savia/20',
    warning: 'bg-dorado/10 text-dorado-oscuro border-dorado/20',
    error: 'bg-red-50 text-red-600 border-red-100',
    featured: 'bg-dorado text-white border-dorado-oscuro shadow-sm',
    unavailable: 'bg-carbon/10 text-carbon border-carbon/20 backdrop-blur-sm'
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
