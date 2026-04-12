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

---

## 🧠 Decisiones Arquitectónicas

- **Patrón de Capas**: Se mantiene una separación estricta entre la lógica de acceso a datos (Repository) y la lógica de negocio (Service) para facilitar el testing y la migración de proveedores en el futuro.
- **Mapeo de Datos**: Los servicios son responsables de la transformación `snake_case` (DB) <-> `camelCase` (UI).
