# Reglas del Proyecto Decor Rent Lab

Este documento resume la arquitectura, patrones y convenciones que rigen el desarrollo de este proyecto.

## 🏗️ Arquitectura de Datos
El proyecto sigue un flujo de datos estructurado para garantizar la mantenibilidad y escalabilidad.

**Flujo: Client ➔ API ➔ Supabase Service ➔ Repository ➔ Supabase DB**

### Capas de la Aplicación
1.  **Client (Frontend)**: Componentes de React y hooks ubicados en `src/app` y `src/modules`.
2.  **API (Intermediate)**: Route Handlers en `src/app/api/...`. Proporcionan una capa REST interna para el frontend.
3.  **Service (Business Logic)**: Ubicados en `src/services/supabase/[feature]/service.ts`. Contienen la lógica de negocio y orquestan el acceso a datos.
4.  **Repository (Data Access)**: Ubicados en `src/services/supabase/[feature]/repository.ts`. Encapsulan las consultas directas a Supabase.
5.  **Supabase**: Capa de persistencia (PostgreSQL) y autenticación.

---

## 📁 Estructura de Carpetas Clave
-   `src/app/api`: Endpoints HTTP definidos como Route Handlers.
-   `src/services/supabase`: Implementación de la arquitectura de datos.
    -   `client.ts` / `server.ts`: Inicialización del cliente Supabase para diferentes entornos.
    -   `[feature]/interfaces.ts`: Tipos específicos de la base de datos y contratos internos.
    -   `[feature]/repository.ts`: Métodos de acceso a datos (SELECT, INSERT, etc).
    -   `[feature]/service.ts`: Mapeo de datos y lógica de dominio.
-   `src/modules`: Componentes UI y lógica visual organizada por dominio de negocio.
-   `src/types`: Interfaces de TypeScript para las entidades globales del dominio.
-   `src/components`: Componentes UI reutilizables (shadcn/ui y personalizados).

---

## 🛠️ Patrones y Convenciones

### 1. Acceso a Datos (Repository & Service)
-   **No acceso directo**: Está prohibido llamar a `supabase.from(...)` directamente desde los componentes UI o las rutas API. Se debe usar el servicio correspondiente.
-   **Mapping**: Los servicios deben transformar las filas de la base de datos (`snake_case`) a objetos de dominio (`camelCase`).
-   **Interfaces**: Cada entidad debe tener interfaces claras tanto para la base de datos como para el dominio.

### 2. Autenticación y Seguridad
-   Se utiliza `@supabase/ssr` para la gestión de sesiones en el servidor y el cliente.
-   La protección de rutas se gestiona mediante el middleware y la lógica en `src/proxy.ts`.

### 3. Estilo y UI
-   **Tailwind CSS**: Uso obligatorio de Tailwind para el diseño.
-   **Diseño Premium**: Seguir la guía de colores y tipografía establecida en `SPEC.md`.
-   **Componentes Reutilizables**: Priorizar el uso de componentes en `src/components` para mantener la consistencia visual.

### 4. Naming
-   Archivos y carpetas: `kebab-case`.
-   Componentes React: `PascalCase`.
-   Variables y funciones: `camelCase`.
-   Campos de DB: `snake_case`.
