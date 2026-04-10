-- SCRIPT DE CARGA MASIVA: DECOR RENT LAB (NUEVA ESTRUCTURA)
-- ESTE SCRIPT DEBE EJECUTARSE EN EL SQL EDITOR DE SUPABASE

-- 1. Limpiar datos existentes
TRUNCATE decor_store.categories, decor_store.products, decor_store.atributo_grupos, decor_store.atributo_valores CASCADE;

-- 2. INSERTAR CATEGORÍAS
INSERT INTO decor_store.categories (nombre, slug, descripcion, imagen_cover) VALUES
('Paneles y Backing', 'paneles-backing', 'Fondos decorativos perfecto para fotocabinas y sesiones fotográficas.', 'https://m.media-amazon.com/images/I/41kKdvMQrNL._AC_UL320_.jpg'),
('Estructuras en Metal', 'estructuras-metal', 'Arcos y estructuras metálicas para ceremonias y decoración.', 'https://m.media-amazon.com/images/I/71dCQdyx0xL._AC_SX208_CB1169409_QL70_.jpg'),
('Cilindros y Mesas', 'cilindros-mesas', 'Cilindros decorativos y mesas modulares para composiciones únicas.', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=400&fit=crop'),
('Fundas en Tela', 'fundas-tela', 'Fundas elegantes para transformar tus espacios con tela.', 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&h=400&fit=crop'),
('Números y Letras LED', 'numeros-letras-led', 'Letras y números LED, incluyendo la línea Infinity brillante.', 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop'),
('Altillo y Complementos', 'altillo-complementos', 'Altillos y elementos complementarios para elevar tu decoración.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop'),
('Sillas y Mesas', 'sillas-mesas', 'Mobiliario elegante para eventos formales y casuales.', 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&h=400&fit=crop'),
('Esferas Gigantes', 'esferas-gigantes', 'Big Shiny Balls - Esferas decorativas gigantes para impactar.', 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=400&h=400&fit=crop'),
('Pared de Flores', 'pared-flores', 'Paredes florales y el icónico Corazón de Flores.', 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=400&fit=crop'),
('Mariposas LED', 'mariposas-led', 'Mariposas luminosas LED para un toque mágico y soñador.', 'https://images.unsplash.com/photo-1551298370-9d3d53e40c81?w=400&h=400&fit=crop');

-- 3. INSERTAR PRODUCTOS Y ATRIBUTOS
DO $$
DECLARE
    id_cat UUID;
    id_prod UUID;
    id_grupo UUID;
BEGIN
    -- PRODUCTO 1: Panel Floral Vintage
    SELECT id INTO id_cat FROM decor_store.categories WHERE slug = 'paneles-backing';
    INSERT INTO decor_store.products (nombre, slug, categoria_id, descripcion_corta, descripcion_larga, precio_alquiler, precio_venta, precio_original_venta, etiqueta_promocion, peso, garantia, tiempo_montaje, ideal_para, imagenes, destacado)
    VALUES ('Panel Floral Vintage', 'panel-floral-vintage', id_cat, 'Panel decorativo con flores secas estilo vintage.', 'Un fondo decorativo único que aporta romanticismo y elegancia...', 45000, 120000, 150000, 'Oferta Lanzamiento', '8 kg', '3 dias', '45 min', '{Bodas, Quinceañeras, Sesiones fotográficas}', '{"https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&h=1000&fit=crop"}', true)
    RETURNING id INTO id_prod;
    
    -- Atributos para Panel Floral
    INSERT INTO decor_store.atributo_grupos (producto_id, nombre, tipo_ui) 
    VALUES (id_prod, 'Medidas', 'select') RETURNING id INTO id_grupo;
    
    INSERT INTO decor_store.atributo_valores (grupo_id, label, valor, precio_adicional) VALUES
    (id_grupo, '1.20m x 2.00m', '1.20x2.00', 0),
    (id_grupo, '1.50m x 2.40m', '1.50x2.40', 12000);

    INSERT INTO decor_store.atributo_grupos (producto_id, nombre, tipo_ui) 
    VALUES (id_prod, 'Estilo Flor', 'text') RETURNING id INTO id_grupo;
    
    INSERT INTO decor_store.atributo_valores (grupo_id, label, valor, precio_adicional) VALUES
    (id_grupo, 'Primavera Pastel', 'pasteles', 0),
    (id_grupo, 'Otoño Rústico', 'rustico', 5000);

    -- PRODUCTO 2: Backing de Luces LED
    SELECT id INTO id_cat FROM decor_store.categories WHERE slug = 'paneles-backing';
    INSERT INTO decor_store.products (nombre, slug, categoria_id, descripcion_corta, descripcion_larga, precio_alquiler, precio_venta, peso, garantia, tiempo_montaje, ideal_para, imagenes, destacado)
    VALUES ('Backing de Luces LED', 'backing-luces-led', id_cat, 'Panel con rangkaian luces LED cálidas.', 'Un fondo luminoso que transforma cualquier espacio...', 65000, 180000, '12 kg', '3 dias', '60 min', '{Bodas, Eventos corporativos}', '{"https://images.unsplash.com/photo-1513519247388-442b704783d8?w=800&h=1000&fit=crop"}', false)
    RETURNING id INTO id_prod;

    -- Atributos para Backing LED
    INSERT INTO decor_store.atributo_grupos (producto_id, nombre, tipo_ui) 
    VALUES (id_prod, 'Tono de Luz', 'color_picker') RETURNING id INTO id_grupo;
    
    INSERT INTO decor_store.atributo_valores (grupo_id, label, valor, precio_adicional) VALUES
    (id_grupo, 'Cálido', '#FFD27D', 0),
    (id_grupo, 'Blanco Frío', '#E0F0FF', 0),
    (id_grupo, 'Dorado Vintage', '#DAA520', 2000);

    -- PRODUCTO 3: Arco de Ceremonia Dorado
    SELECT id INTO id_cat FROM decor_store.categories WHERE slug = 'estructuras-metal';
    INSERT INTO decor_store.products (nombre, slug, categoria_id, descripcion_corta, descripcion_larga, precio_alquiler, precio_venta, precio_original_venta, etiqueta_promocion, peso, garantia, tiempo_montaje, ideal_para, imagenes, destacado)
    VALUES ('Arco de Ceremonia Dorado', 'arco-ceremonia-dorado', id_cat, 'Arco metálico dorado para ceremonias nupciales.', 'El arco que define una ceremonia...', 85000, 250000, 300000, 'Especial Bodas', '25 kg', '5 dias', '90 min', '{Bodas, Ceremonias}', '{"https://m.media-amazon.com/images/I/71WSSyClwQL._AC_UL320_.jpg"}', true)
    RETURNING id INTO id_prod;

    -- Atributos para Arco
    INSERT INTO decor_store.atributo_grupos (producto_id, nombre, tipo_ui) 
    VALUES (id_prod, 'Material', 'text') RETURNING id INTO id_grupo;
    
    INSERT INTO decor_store.atributo_valores (grupo_id, label, valor, precio_adicional) VALUES
    (id_grupo, 'Acero Reforzado', 'acero', 0),
    (id_grupo, 'Hierro Forjado', 'hierro', 15000);

    INSERT INTO decor_store.atributo_grupos (producto_id, nombre, tipo_ui) 
    VALUES (id_prod, 'Acabado', 'text') RETURNING id INTO id_grupo;
    
    INSERT INTO decor_store.atributo_valores (grupo_id, label, valor, precio_adicional) VALUES
    (id_grupo, 'Mate', 'mate', 0),
    (id_grupo, 'Brillante Especial', 'brillante', 8000);

    -- ... Seguir con el resto de productos de forma similar si se desea, 
    -- o dejar estos como ejemplos completos para el MVP.

END $$;
