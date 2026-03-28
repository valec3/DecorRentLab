import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { categorias, getCategoriaBySlug, getProductosByCategoria } from '@/data/mock';
import { ProductCard } from '@/components/ui/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface PageProps {
  params: Promise<{ categoria: string }>;
}

export async function generateStaticParams() {
  return categorias.map((cat) => ({
    categoria: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria } = await params;
  const cat = getCategoriaBySlug(categoria);
  
  if (!cat) {
    return { title: 'Categoría no encontrada' };
  }

  return {
    title: `${cat.nombre} | Decor Rent Lab`,
    description: cat.descripcion,
  };
}

export default async function CategoriaPage({ params }: PageProps) {
  const { categoria } = await params;
  const cat = getCategoriaBySlug(categoria);

  if (!cat) {
    notFound();
  }

  const productos = getProductosByCategoria(categoria);

  return (
    <div className="pt-24 pb-16 bg-crema min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Catálogo', href: '/catalogo' },
            { label: cat.nombre },
          ]}
        />

        {/* Category Header */}
        <div className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-carbon mb-4">
            {cat.nombre}
          </h1>
          <p className="text-gris-calido max-w-2xl">
            {cat.descripcion}
          </p>
        </div>

        {/* Products Grid */}
        {productos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((producto, index) => (
              <div
                key={producto.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard producto={producto} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gris-calido">
              No hay productos disponibles en esta categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
