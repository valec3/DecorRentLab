import { MetadataRoute } from 'next';
import { productService } from '@/services/supabase/products/service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://decorentlab.com.ar';

  // Rutas estáticas
  const routes = [
    '',
    '/catalogo',
    '/nosotros',
    '/contacto',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Rutas dinámicas de productos (Obtenemos todos los slugs)
  try {
    const productsResult = await productService.getPaginatedProducts(1, 1000);
    const productRoutes = productsResult.data.map((product) => ({
      url: `${baseUrl}/producto/${product.slug}`,
      lastModified: new Date(product.created_at || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...routes, ...productRoutes];
  } catch (error) {
    console.error("Error generating sitemap products:", error);
    return routes;
  }
}
