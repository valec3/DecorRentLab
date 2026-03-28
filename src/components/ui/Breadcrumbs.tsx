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
    <nav className="flex items-center gap-2 text-sm text-gris-calido mb-6">
      <Link
        href="/"
        className="hover:text-carbon transition-colors flex items-center"
      >
        <Home size={16} />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={16} />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-carbon transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-carbon font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
