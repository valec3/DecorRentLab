-- Migración V1: Aislamiento decor_store

-- 1. Crear esquema dedicado
CREATE SCHEMA IF NOT EXISTS decor_store;

-- 2. Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. Tabla de Categorías (Categories)
CREATE TABLE IF NOT EXISTS decor_store.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    descripcion TEXT,
    imagen_cover TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabla de Productos (Products)
CREATE TABLE IF NOT EXISTS decor_store.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    categoria_id UUID NOT NULL REFERENCES decor_store.categories(id) ON DELETE CASCADE,
    descripcion_corta TEXT,
    descripcion_larga TEXT,
    precio_venta NUMERIC(12, 2),
    precio_alquiler NUMERIC(12, 2),
    precio_original_venta NUMERIC(12, 2),
    precio_original_alquiler NUMERIC(12, 2),
    etiqueta_promocion TEXT,
    imagenes TEXT[] DEFAULT '{}',
    destacado BOOLEAN DEFAULT FALSE,
    disponible BOOLEAN DEFAULT TRUE,
    material TEXT,
    medidas TEXT,
    color TEXT,
    peso TEXT,
    garantia TEXT,
    tiempo_montaje TEXT,
    ideal_para TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabla de Variantes (Product Variants)
CREATE TABLE IF NOT EXISTS decor_store.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES decor_store.products(id) ON DELETE CASCADE,
    tipo TEXT NOT NULL CHECK (tipo IN ('material', 'medida', 'color', 'acabado')),
    nombre TEXT NOT NULL,
    valor TEXT NOT NULL,
    precio_adicional NUMERIC(12, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Índices para rendimiento
CREATE INDEX IF NOT EXISTS idx_products_slug ON decor_store.products(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON decor_store.categories(slug);
CREATE INDEX IF NOT EXISTS idx_products_categoria_id ON decor_store.products(categoria_id);
CREATE INDEX IF NOT EXISTS idx_variants_product_id ON decor_store.product_variants(product_id);

-- 7. Habilitar Seguridad (RLS)
ALTER TABLE decor_store.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE decor_store.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE decor_store.product_variants ENABLE ROW LEVEL SECURITY;

-- 8. Permisos de Esquema para API
GRANT USAGE ON SCHEMA decor_store TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA decor_store TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA decor_store TO anon, authenticated;

-- 9. Políticas de Lectura Pública (SELECT)
CREATE POLICY "Public Read Categories" ON decor_store.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON decor_store.products FOR SELECT USING (true);
CREATE POLICY "Public Read Variants" ON decor_store.product_variants FOR SELECT USING (true);
