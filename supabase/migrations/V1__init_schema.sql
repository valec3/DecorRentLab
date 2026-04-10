-- Migración V1: Esquema Profesional Decor Rent Lab
-- Autor: Antigravity
-- Fecha: 10 de abril de 2026

-- 1. Preparación del Entorno
CREATE SCHEMA IF NOT EXISTS decor_store;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabla de Categorías
CREATE TABLE IF NOT EXISTS decor_store.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    descripcion TEXT,
    imagen_cover TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabla de Productos
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
    peso TEXT,
    garantia TEXT,
    tiempo_montaje TEXT,
    ideal_para TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Sistema de Variantes (Atributos Hierárquicos)
-- Un producto puede tener varios grupos (ej: 'Color', 'Material')
CREATE TABLE IF NOT EXISTS decor_store.atributo_grupos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    producto_id UUID NOT NULL REFERENCES decor_store.products(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL, -- e.g., 'Color', 'Material', 'Tamaño'
    tipo_ui TEXT NOT NULL CHECK (tipo_ui IN ('text', 'color_picker', 'select')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cada grupo tiene múltiples opciones (ej: 'Rojo', 'Dorado')
CREATE TABLE IF NOT EXISTS decor_store.atributo_valores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    grupo_id UUID NOT NULL REFERENCES decor_store.atributo_grupos(id) ON DELETE CASCADE,
    label TEXT NOT NULL, -- e.g., 'Dorado Metal'
    valor TEXT NOT NULL, -- e.g., '#FFD700' o 'metal-gold'
    precio_adicional NUMERIC(12, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Índices de Rendimiento
CREATE INDEX IF NOT EXISTS idx_products_slug ON decor_store.products(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON decor_store.categories(slug);
CREATE INDEX IF NOT EXISTS idx_products_categoria_id ON decor_store.products(categoria_id);
CREATE INDEX IF NOT EXISTS idx_atributo_grupos_prod ON decor_store.atributo_grupos(producto_id);
CREATE INDEX IF NOT EXISTS idx_atributo_valores_grupo ON decor_store.atributo_valores(grupo_id);

-- 7. Seguridad RLS (Se habilitan, las políticas se definen en V2)
ALTER TABLE decor_store.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE decor_store.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE decor_store.atributo_grupos ENABLE ROW LEVEL SECURITY;
ALTER TABLE decor_store.atributo_valores ENABLE ROW LEVEL SECURITY;

-- 8. Permisos Globales de Esquema
GRANT USAGE ON SCHEMA decor_store TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA decor_store TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA decor_store TO anon, authenticated;

-- 9. Políticas de Lectura Pública (SELECT)
CREATE POLICY "Public Read Categories" ON decor_store.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON decor_store.products FOR SELECT USING (true);
CREATE POLICY "Public Read Atributo Grupos" ON decor_store.atributo_grupos FOR SELECT USING (true);
CREATE POLICY "Public Read Atributo Valores" ON decor_store.atributo_valores FOR SELECT USING (true);
