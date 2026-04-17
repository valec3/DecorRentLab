-- Migración V5: Tabla de Información de Contacto
-- Fecha: 16 de abril de 2026

-- 1. Tabla de Información de Contacto
CREATE TABLE IF NOT EXISTS decor_store.contact_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    hours TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Seguridad RLS
ALTER TABLE decor_store.contact_info ENABLE ROW LEVEL SECURITY;

-- Política de Lectura Pública
CREATE POLICY "Public Read Contact Info" ON decor_store.contact_info 
    FOR SELECT USING (true);

-- Política de Gestión Administrativa
-- Nota: Se incluye 'anon' porque las API Routes actuales usan el cliente con anon_key desde el servidor.
CREATE POLICY "Admin All Contact Info" ON decor_store.contact_info 
    FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 3. Permisos
GRANT ALL ON TABLE decor_store.contact_info TO anon, authenticated;

-- 4. Trigger para updated_at
CREATE TRIGGER update_contact_info_updated_at
    BEFORE UPDATE ON decor_store.contact_info
    FOR EACH ROW
    EXECUTE FUNCTION decor_store.update_updated_at_column();

-- 5. Insertar datos iniciales (opcional, para que no esté vacío)
INSERT INTO decor_store.contact_info (phone, email, address, hours, whatsapp_number)
VALUES ('+54 9 11 1234-5678', 'info@decorentlab.com', 'Buenos Aires, Argentina', 'Lun - Sáb: 9:00 - 19:00', '5491112345678')
ON CONFLICT DO NOTHING;
