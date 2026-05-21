import { MetadataRoute } from 'next';
import { productService } from '@/services/supabase/products/service';
import { categoryService } from '@/services/supabase/categories/service';

const baseUrl = 'https://decorentlab.com.ar';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Rutas estáticas con prioridades correctas
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'daily',   // catálogo cambia frecuente
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [];

  // Rutas de categorías
  try {
    const categorias = await categoryService.getCategories();
    const categoryRoutes = categorias.map((cat) => ({
      url: `${baseUrl}/catalogo/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
    dynamicRoutes.push(...categoryRoutes);
  } catch (error) {
    console.error('Error generating sitemap categories:', error);
  }

  // Rutas de productos
  try {
    const productsResult = await productService.getPaginatedProducts(1, 1000);
    const productRoutes = productsResult.data.map((product) => ({
      url: `${baseUrl}/producto/${product.slug}`,
      lastModified: new Date(product.created_at || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
    dynamicRoutes.push(...productRoutes);
  } catch (error) {
    console.error('Error generating sitemap products:', error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
