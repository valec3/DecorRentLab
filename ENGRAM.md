# Project Engram - Decor Rent Lab

## 🔭 Visión General

Este archivo sirve como el "cerebro" del proyecto, registrando el por qué de las decisiones y el estado actual de los componentes críticos.

## 🗄️ Registro de Migraciones (Supabase)

Las siguientes migraciones han sido aplicadas al entorno de base de datos:

| Versión | Nombre                      | Estado       | Motivo                                                                                     |
| :------ | :-------------------------- | :----------- | :----------------------------------------------------------------------------------------- |
| **V1**  | `init_schema`               | ✅ Ejecutado | Creación del esquema base (`decor_store`), tablas de productos, categorías y atributos.    |
| **V2**  | `add_admin_rls_policies`    | ✅ Ejecutado | Implementación de Row Level Security (RLS) para proteger el acceso administrativo.         |
| **V3**  | `create_testimonials_table` | ✅ Ejecutado | Creación de la tabla de testimonios con RLS y triggers de actualización.                   |
| **V5**  | `create_contact_info_table` | ✅ Ejecutado | Creación de la tabla `contact_info` para gestión dinámica de datos de contacto y WhatsApp. |
| **V6**  | `create_faqs_table`         | 🟡 Pendiente | Nueva tabla `faqs` para administrar preguntas frecuentes desde el panel.                   |

---

## 📝 Bitácora de Actividades

### 2026-04-11

#### 1. Estandarización de Reglas

- **Acción**: Creación de `RULES.md` y actualización de `AGENTS.md`.
- **Motivo**: Establecer una fuente de verdad única para la arquitectura `Client -> API -> Service -> Repository` y asegurar que cualquier agente de IA siga estos patrones.

#### 2. Implementación de Gestión de Testimonios (Finalizado)

- **Acción**: CRUD completo de testimonios en el panel admin e integración en la navegación.
- **Motivo**: Permitir al administrador gestionar las reseñas de los clientes de forma dinámica y accesible.
- **Detalle Técnico**:
  - Creación de migración **V3** (tabla `testimonials`) documentada internamente.
  - Implementación de capa de servicios y repositorio.
  - Creación de API Routes `/api/testimonials` con revalidación de caché.
  - Desarrollo de vistas administrativas (`TestimonialForm`, `TestimonialTable`) usando `fetch` para consistencia.
  - Integración del acceso en el sidebar del administrador.

### 2026-04-12

#### Resolviendo Errores de Build (Finalizado)

- **Acción**: Ejecución de `npm run build` y corrección de errores de tipado.
- **Motivo**: Asegurar que la aplicación sea desplegable y cumpla con los estándares de Next.js 15+.
- **Detalle Técnico**:
  - Se actualizó `src/app/api/testimonials/[id]/route.ts` y `src/app/admin/testimonials/[id]/page.tsx` para esperar (`await`) el objeto `params`, siguiendo el nuevo patrón asíncrono de Next.js.
  - Se corrigió un error de tipado en `src/data/content.ts` donde los IDs de los testimonios eran números en lugar de strings.
  - Los cambios fueron pusheados después de verificar que el build finalizara exitosamente.

#### Consumo de Testimonios Reales (Finalizado)

- **Acción**: Migración de testimonios mockeados a datos reales de Supabase en la Landing Page.
- **Motivo**: Requerimiento del usuario para mostrar contenido dinámico gestionado desde el panel admin.
- **Detalle Técnico**:
  - Se refactorizó el componente `Testimonials` para recibir datos por props.
  - Se actualizó `src/app/page.tsx` para consumir la API `/api/testimonials?active=true`.
  - Se implementó lógica de "Empty State" para ocultar la sección si no hay testimonios activos.
  - Se optimizó la navegación del carrusel para ocultar controles si hay menos de 2 testimonios.

### 2026-04-16

#### 1. Sistema Dinámico de Contacto (Finalizado)

- **Acción**: Implementación completa de gestión de contacto desde el Admin Panel.
- **Motivo**: Requerimiento para centralizar el número de WhatsApp y datos de contacto en una sola fuente de verdad (DB).
- **Detalle Técnico**:
  - Creación de migración **V5** (tabla `contact_info`).
  - Implementación de `ContactRepository` y `ContactService` con lógica de `upsert`.
  - Creación de API `/api/contact` y hook `useContactInfo`.
  - Integración global en Header, Footer, Hero, CTA y botones de WhatsApp.

#### 2. Mejoras en Buscador y Catálogo (Finalizado)

- **Acción**: Refactorización del sistema de filtros y ordenamiento.
- **Motivo**: El usuario reportó que los filtros no funcionaban y eran confusos.
- **Detalle Técnico**:
  - Actualización de `ProductRepository` para soportar `sortBy` (nombre, precio, destacados) y búsqueda por nombre/descripción.
  - Simplificación de la UI del catálogo en una única barra de herramientas.
  - Corrección de bugs de React Hooks en el componente de Catálogo.

#### 3. Refinamientos UI/UX y Branding

- **Acción**: Mejoras visuales y corrección de bugs menores.
- **Detalle Técnico**:
  - Ajuste de responsive 2-columnas para móviles en "Piezas Destacadas".
  - Remoción de icono de Instagram y agregado de créditos a "Klein Code" en el footer.
  - Solución de errores de consola (Image src vacío y props no válidas en Button).

#### 5. Corrección de errores de Build (Finalizado)

- **Acción**: Resolución de errores de tipado que bloqueaban el despliegue.
- **Motivo**: `npm run build` fallaba debido a inconsistencias de tipos en el Sitemap y el Cliente de Supabase.
- **Detalle Técnico**:
  - Se agregó `created_at` a la interfaz `Producto` y se mapeó en `ProductService`.
  - Se migró `ContactRepository` al uso de `createClient` (SSR) dinámico para evitar errores de nulidad del singleton de Supabase durante el build-time.
  - Se verificó el éxito del build localmente.

#### 4. Optimización SEO (Finalizado)

- **Acción**: Refactorización de páginas críticas (Catálogo, Producto, Contacto) a Server Components.
- **Motivo**: Mejorar el indexado por motores de búsqueda y el rendimiento de carga inicial.
- **Detalle Técnico**:
  - Implementación de `generateMetadata` dinámico para productos.
  - Creación de `robots.ts` y `sitemap.ts` (dinámico para productos).
  - Separación de lógica interactiva en componentes cliente bajo `src/modules`.
  - Configuración de metadatos globales (OpenGraph, Twitter, Authors) en `layout.tsx`.

### 2026-05-20

#### Migración de Moneda a Euros (Finalizado)

- **Acción**: Actualización de la visualización y formateo de precios de Pesos (ARS/$) a Euros (€).
- **Motivo**: Requerimiento del usuario para adaptar la tienda al mercado europeo.
- **Detalle Técnico**:
  - Cambiada la localización del formateo de `es-AR` a `es-ES` para la representación de miles y decimales en Euros.
  - Actualizados los componentes `ProductCard`, `ProductDetail` y `VariantSelector` para colocar el símbolo `€` pospuesto al valor numérico.
  - Actualizado el panel de administración (`ProductForm` y `ProductTable`) para dar consistencia al ingreso y visualización de adicionales y precios en Euros (`EUR`).
  - Adaptado el mensaje generado para WhatsApp en el detalle del producto para que envíe las cotizaciones estimadas en Euros.

### 2026-05-26

#### FAQs editables desde Admin (En progreso)

- **Acción**: Se agregó una nueva tabla de FAQs y endpoints para edición desde el panel.
- **Motivo**: Permitir administrar preguntas frecuentes y reflejarlas en la web pública.

### 2026-05-27

#### Configuración de OpenNext para Cloudflare (Finalizado)

- **Acción**: Instalación y migración exitosa a `@opennextjs/cloudflare` para despliegue en Cloudflare Pages/Workers.
- **Motivo**: Habilitar el despliegue optimizado de Next.js 16 en la infraestructura de Cloudflare.
- **Detalle Técnico**:
  - Se ejecutó el asistente de migración de OpenNext, creando `wrangler.jsonc`, `open-next.config.ts`, `.dev.vars` y configurando los scripts de despliegue.
  - Se corrigió un error de build de Next.js 16: Next.js 16 obliga a que `src/proxy.ts` corra estrictamente en el **Node.js runtime** (prohibiendo configuraciones de segmento como `runtime = 'edge'`), lo cual choca con la restricción de Edge de OpenNext. Se migró de forma limpia a `src/middleware.ts` (exclusivo para Edge por defecto), renombrando la función exportada a `middleware`. Esto resolvió por completo la incompatibilidad de compilación.
  - Se solucionó un error 500 silencioso en local y producción desactivando **Turbopack** para la compilación (`next build --webpack`). OpenNext tiene incompatibilidades conocidas con los bundles generados por Turbopack (que es el compilador por defecto en Next 16), por lo que forzar el compilador clásico de Webpack estabilizó por completo la ejecución del Worker.
  - Se corrigió el error de despliegue 10143 en la CI de Cloudflare. El nombre de proyecto en Cloudflare es `decorentlab`, por lo que el sistema de CI sobreescribía el nombre del Worker pero dejaba roto el binding de servicio `WORKER_SELF_REFERENCE` que seguía apuntando a `decoracion-tienda`. Se homogeneizó el nombre del Worker y del binding en `wrangler.jsonc` a `decorentlab` para resolver la subida.

---

## 🧠 Decisiones Arquitectónicas

- **Patrón de Capas**: Se mantiene una separación estricta entre la lógica de acceso a datos (Repository) y la lógica de negocio (Service) para facilitar el testing y la migración de proveedores en el futuro.
- **Mapeo de Datos**: Los servicios son responsables de la transformación `snake_case` (DB) <-> `camelCase` (UI).
- **Consumo de Datos Globales**: Se utiliza el hook `useContactInfo` para asegurar que los cambios en el Admin Panel se reflejen inmediatamente en todo el sitio sin recargas enviadas por el servidor (SSR) siempre que sea posible.
