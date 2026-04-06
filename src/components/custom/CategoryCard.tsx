import Link from 'next/link';
import Image from 'next/image';
import { Categoria } from '@/types';

interface CategoryCardProps {
  categoria: Categoria;
}

export function CategoryCard({ categoria }: CategoryCardProps) {
  return (
    <Link href={`/catalogo/${categoria.slug}`} className="group">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-crema-oscuro">
        <Image
          src={categoria.imagenCover}
          alt={categoria.nombre}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-serif text-xl md:text-2xl text-white mb-2 group-hover:text-dorado transition-colors">
            {categoria.nombre}
          </h3>
          <p className="text-white/80 text-sm line-clamp-2">
            {categoria.descripcion}
          </p>
        </div>
      </div>
    </Link>
  );
}
