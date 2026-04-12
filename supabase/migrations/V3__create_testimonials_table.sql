-- Migración V3: Tabla de Testimonios/Comentarios
-- Fecha: 11 de abril de 2026
-- Objetivo: Implementar la infraestructura para la gestión de reseñas y estandarizar la auditoría (updated_at).

/*
  DETALLE TÉCNICO DE LA MIGRACIÓN:
  
  1. TABLA: decor_store.testimonials
     - name: Nombre del cliente (Requerido).
     - event: Contexto opcional (Boda, XV, etc).
     - text: El cuerpo de la reseña.
     - rating: Restringido de 1 a 5 mediante un CHECK constraint para integridad de datos.
     - active: Permite al administrador ocultar reseñas sin borrarlas.
  
  2. SEGURIDAD (RLS):
     - Público (Anon): Solo puede leer (SELECT) registros donde active = true.
     - Admin (Autenticado): Acceso total (ALL) para gestión desde el panel.
  
  3. AUDITORÍA (Triggers):
     - Función update_updated_at_column(): Función compartida que garantiza que el campo 
       updated_at se actualice en cada modificación.
     - Aplicación Retroactiva: Se vincula esta función a las tablas existentes (categories, products)
       para homogeneizar el comportamiento de auditoría en todo el esquema.
*/

-- 1. Tabla de Testimonios
CREATE TABLE IF NOT EXISTS decor_store.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    event TEXT,
    text TEXT NOT NULL,
    image TEXT,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Seguridad RLS
ALTER TABLE decor_store.testimonials ENABLE ROW LEVEL SECURITY;

-- Política de Lectura Pública (Solo testimonios activos)
CREATE POLICY "Public Read Testimonials" ON decor_store.testimonials 
    FOR SELECT USING (active = true);

-- Política de Gestión Administrativa (CRUD completo para autenticados)
CREATE POLICY "Admin All Testimonials" ON decor_store.testimonials 
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Permisos
GRANT ALL ON TABLE decor_store.testimonials TO anon, authenticated;

-- 4. Función para actualizar el timestamp de updated_at
CREATE OR REPLACE FUNCTION decor_store.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. Trigger para Testimonios
CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON decor_store.testimonials
    FOR EACH ROW
    EXECUTE FUNCTION decor_store.update_updated_at_column();

-- 6. Opcional: Trigger para tablas existentes (Categorías y Productos)
-- Esto mejora la consistencia del esquema original
DROP TRIGGER IF EXISTS update_categories_updated_at ON decor_store.categories;
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON decor_store.categories
    FOR EACH ROW
    EXECUTE FUNCTION decor_store.update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON decor_store.products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON decor_store.products
    FOR EACH ROW
    EXECUTE FUNCTION decor_store.update_updated_at_column();
