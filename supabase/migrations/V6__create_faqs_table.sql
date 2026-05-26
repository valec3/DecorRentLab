-- Migracion V6: Tabla de Preguntas Frecuentes (FAQs)
-- Fecha: 26 de mayo de 2026

CREATE TABLE IF NOT EXISTS decor_store.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE decor_store.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read FAQs" ON decor_store.faqs
    FOR SELECT USING (true);

CREATE POLICY "Admin All FAQs" ON decor_store.faqs
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

GRANT ALL ON TABLE decor_store.faqs TO anon, authenticated;

CREATE TRIGGER update_faqs_updated_at
    BEFORE UPDATE ON decor_store.faqs
    FOR EACH ROW
    EXECUTE FUNCTION decor_store.update_updated_at_column();
