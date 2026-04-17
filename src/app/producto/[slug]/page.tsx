import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productService } from '@/services/supabase/products/service';
import { ProductDetail } from '@/modules/products/ProductDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const producto = await productService.getProduct(slug);

  if (!producto) {
    return {
      title: 'Producto no encontrado',
    };
  }

  const categoryName = producto.categoriaSlug.replace(/-/g, ' ');
  const title = `${producto.nombre} | ${categoryName}`;
  const description = producto.descripcionCorta || `Alquiler de ${producto.nombre} para eventos premium.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: producto.imagenes?.[0] ? [{ url: producto.imagenes[0] }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: producto.imagenes?.[0] ? [producto.imagenes[0]] : [],
    },
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const producto = await productService.getProduct(slug);

  if (!producto) {
    notFound();
  }

  // Cargar relacionados (Server Side)
  const result = await productService.getPaginatedProducts(1, 5, {
    categoriaSlug: producto.categoriaSlug,
  });
  
  const relacionados = result.data
    .filter((p) => p.id !== producto.id)
    .slice(0, 4);

  return <ProductDetail producto={producto} relacionados={relacionados} />;
}
