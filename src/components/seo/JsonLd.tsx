/**
 * Schema.org JSON-LD para el negocio principal.
 * Se inyecta en el <head> de todas las páginas vía layout.tsx.
 * Mejora la presencia en resultados de búsqueda locales y rich results.
 */
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Decor Rent Lab',
    description:
      'Alquiler de elementos decorativos únicos y premium en Buenos Aires. Paneles, letras LED, esferas gigantes y todo para que tu evento sea inolvidable.',
    url: 'https://decorentlab.com.ar',
    logo: 'https://decorentlab.com.ar/logo.png',
    image: 'https://decorentlab.com.ar/og-image.jpg',
    telephone: '+5491112345678',
    email: 'info@decorentlab.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Buenos Aires',
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -34.6037,
      longitude: -58.3816,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    priceRange: '$$',
    servesCuisine: null,
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Schema.org JSON-LD para una página de producto individual.
 * Habilita rich snippets de producto en Google (precio, disponibilidad, imagen).
 */
interface ProductSchemaProps {
  nombre: string;
  descripcion: string;
  imagen: string;
  precio?: number;
  disponible: boolean;
  slug: string;
}

export function ProductSchema({
  nombre,
  descripcion,
  imagen,
  precio,
  disponible,
  slug,
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: nombre,
    description: descripcion,
    image: imagen,
    url: `https://decorentlab.com.ar/producto/${slug}`,
    brand: {
      '@type': 'Brand',
      name: 'Decor Rent Lab',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: precio ?? 0,
      availability: disponible
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Decor Rent Lab',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
