-- Migración V2: Políticas de Escritura y Gestión (RLS)
-- Fecha: 10 de abril de 2026

-- Políticas de Gestión para el esquema decor_store
-- Permite que los usuarios autenticados realicen operaciones CRUD completas.

-- 1. Categorías
CREATE POLICY "Admin All Categories" ON decor_store.categories 
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. Productos
CREATE POLICY "Admin All Products" ON decor_store.products 
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Atributo Grupos
CREATE POLICY "Admin All Grupos" ON decor_store.atributo_grupos 
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Atributo Valores
CREATE POLICY "Admin All Valores" ON decor_store.atributo_valores 
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
