# Project Engram - Decor Rent Lab

## 🔭 Visión General

Este archivo sirve como el "cerebro" del proyecto, registrando el por qué de las decisiones y el estado actual de los componentes críticos.

## 🗄️ Registro de Migraciones (Supabase)

Las siguientes migraciones han sido aplicadas al entorno de base de datos:

| Versión | Nombre                      | Estado       | Motivo                                                                                  |
| :------ | :-------------------------- | :----------- | :-------------------------------------------------------------------------------------- |
| **V1**  | `init_schema`               | ✅ Ejecutado | Creación del esquema base (`decor_store`), tablas de productos, categorías y atributos. |
| **V2**  | `add_admin_rls_policies`    | ✅ Ejecutado | Implementación de Row Level Security (RLS) para proteger el acceso administrativo.      |
| **V3**  | `create_testimonials_table` | ✅ Ejecutado | Creación de la tabla de testimonios con RLS y triggers de actualización.                |
| **V5**  | `create_contact_info_table` | ✅ Ejecutado | Creación de la tabla `contact_info` para gestión dinámica de datos de contacto y WhatsApp. |

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

---

## 🧠 Decisiones Arquitectónicas

- **Patrón de Capas**: Se mantiene una separación estricta entre la lógica de acceso a datos (Repository) y la lógica de negocio (Service) para facilitar el testing y la migración de proveedores en el futuro.
- **Mapeo de Datos**: Los servicios son responsables de la transformación `snake_case` (DB) <-> `camelCase` (UI).
- **Consumo de Datos Globales**: Se utiliza el hook `useContactInfo` para asegurar que los cambios en el Admin Panel se reflejen inmediatamente en todo el sitio sin recargas enviadas por el servidor (SSR) siempre que sea posible.
