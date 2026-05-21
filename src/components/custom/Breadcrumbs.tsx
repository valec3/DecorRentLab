import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Navegación de ruta" className="flex items-center gap-1.5 text-sm text-gris-calido mb-6">
      <Link
        href="/"
        className="hover:text-carbon transition-colors duration-200 flex items-center p-0.5 rounded"
        aria-label="Inicio"
      >
        <Home size={14} />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <ChevronRight size={13} className="text-borde shrink-0" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-carbon transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-carbon font-medium" aria-current="page">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
