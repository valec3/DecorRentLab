# Decor Rent Lab - Especificación Técnica

## 1. Arquitectura

- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Datos**: Mocks locales en JSON/TS
- **Rutas**: 
  - `/` - Home
  - `/catalogo` - Catálogo general
  - `/catalogo/[categoria]` - Categoría dinámica
  - `/producto/[slug]` - Producto dinámico
  - `/nosotros` - Nosotros/Servicios
  - `/contacto` - Contacto

## 2. Paleta de Colores

- **Fondo base**: `#FDFBF7` (crema/marfil)
- **Fondo secundario**: `#F5F0E8` (crema más oscuro)
- **Texto principal**: `#2D2926` (carbón suave)
- **Texto secundario**: `#6B635B` (gris cálido)
- **Acento primario**: `#C9A66B` (dorado suave)
- **Acento secundario**: `#8B7355` (terracota tenue)
- **Éxito**: `#7D9B76` (verde salvia)
- **Borde**: `#E8E2D9` (beige sutil)
- **WhatsApp**: `#25D366`

## 3. Tipografía

- **Headings**: Playfair Display (serif, elegante)
- **Body**: DM Sans (sans-serif, legible)

## 4. Componentes UI

- Button (variantes: primary, secondary, whatsapp, outline)
- Badge (variantes: default, success, warning, error, featured, unavailable)
- Input / Textarea
- ProductCard
- CategoryCard
- Breadcrumbs

## 5. Estructura de Datos

### Categorías (10)
1. Paneles y Backing
2. Estructuras en Metal
3. Cilindros y Mesas
4. Fundas en Tela
5. Números y Letras LED
6. Altillo y Complementos
7. Sillas y Mesas
8. Esferas Gigantes (Big Shiny Balls)
9. Pared de Flores
10. Mariposas LED

### Productos
- 20 productos distribuidos (2 por categoría)
- Cada producto tiene: id, nombre, slug, categoría, descripción corta/larga, material, medidas, color, idealPara[], imágenes[], destacado, disponible

## 6. Rutas de WhatsApp

- Teléfono: +5491112345678
- Mensaje prellenado: `Hola Decor Rent Lab, quiero cotizar: [Nombre del producto]`

## 7. Responsive

- Mobile: < 640px
- Tablet: 640px - 1023px
- Desktop: >= 1024px

## 8. SEO

- Meta tags por página
- Semantic HTML
- Open Graph tags
