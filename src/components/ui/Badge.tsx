import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'featured' | 'unavailable';
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-crema-oscuro text-gris-calido',
    success: 'bg-verde-savia/10 text-verde-savia',
    warning: 'bg-dorado/10 text-dorado-oscuro',
    error: 'bg-red-100 text-red-700',
    featured: 'bg-dorado text-white',
    unavailable: 'bg-carbon text-white'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
