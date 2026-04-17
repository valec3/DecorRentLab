import { Metadata } from 'next';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { productService } from '@/services/supabase/products/service';
import { categoryService } from '@/services/supabase/categories/service';
import { CatalogoContent } from '@/modules/catalogo/CatalogoContent';

export const metadata: Metadata = {
  title: "Catálogo de Piezas",
  description: "Explora nuestra colección premium de decoración para alquiler. Vajilla, mobiliario, iluminación y más.",
};

export default async function CatalogoPage() {
  // Fetch inicial en el servidor para SEO
  const [result, categorias] = await Promise.all([
    productService.getPaginatedProducts(1, 9, { sortBy: 'destacados' }),
    categoryService.getCategories()
  ]);

  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 text-gris-calido bg-crema">
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-dorado" />
        <p className="font-light tracking-widest text-sm uppercase">Cargando catálogo...</p>
      </div>
    }>
      <CatalogoContent 
        initialProductos={result.data} 
        initialCategorias={categorias}
        initialPagination={result}
      />
    </Suspense>
  );
}

