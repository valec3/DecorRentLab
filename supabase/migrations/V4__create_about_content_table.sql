-- Migración V4: Tabla de Contenido "Nosotros"
-- Fecha: 12 de abril de 2026

-- 1. Tabla de Contenido Nosotros
CREATE TABLE IF NOT EXISTS decor_store.about_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    main_image TEXT NOT NULL,
    history_title TEXT NOT NULL,
    history_paragraphs TEXT[] NOT NULL,
    services_title TEXT NOT NULL,
    services JSONB NOT NULL,
    values_title TEXT NOT NULL,
    values JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Seguridad RLS
ALTER TABLE decor_store.about_content ENABLE ROW LEVEL SECURITY;

-- Política de Lectura Pública
CREATE POLICY "Public Read About Content" ON decor_store.about_content 
    FOR SELECT USING (true);

-- Política de Gestión Administrativa
CREATE POLICY "Admin All About Content" ON decor_store.about_content 
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Permisos
GRANT ALL ON TABLE decor_store.about_content TO anon, authenticated;

-- 4. Trigger para updated_at
CREATE TRIGGER update_about_content_updated_at
    BEFORE UPDATE ON decor_store.about_content
    FOR EACH ROW
    EXECUTE FUNCTION decor_store.update_updated_at_column();
