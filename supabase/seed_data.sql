-- SCRIPT DE CARGA MASIVA: DECOR RENT LAB
-- ESTE SCRIPT DEBE EJECUTARSE EN EL SQL EDITOR DE SUPABASE

-- 1. Limpiar datos existentes (Opcional, previene duplicados si se re-ejecuta)
TRUNCATE decor_store.categories, decor_store.products, decor_store.product_variants CASCADE;

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

-- 3. INSERTAR PRODUCTOS (USANDO BLOQUE ANÓNIMO PARA MANEJAR IDs DINÁMICOS)
DO $$
DECLARE
    id_cat UUID;
    id_prod UUID;
BEGIN
    -- PRODUCTO 1: Panel Floral Vintage
    SELECT id INTO id_cat FROM decor_store.categories WHERE slug = 'paneles-backing';
    INSERT INTO decor_store.products (nombre, slug, categoria_id, descripcion_corta, descripcion_larga, precio_alquiler, precio_venta, precio_original_venta, etiqueta_promocion, peso, garantia, tiempo_montaje, ideal_para, imagenes, destacado)
    VALUES ('Panel Floral Vintage', 'panel-floral-vintage', id_cat, 'Panel decorativo con flores secas estilo vintage.', 'Un fondo decorativo único que aporta romanticismo y elegancia...', 45000, 120000, 150000, 'Oferta Lanzamiento', '8 kg', '3 dias', '45 min', '{Bodas, Quinceañeras, Sesiones fotográficas}', '{"https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&h=1000&fit=crop"}', true)
    RETURNING id INTO id_prod;
    
    INSERT INTO decor_store.product_variants (product_id, tipo, nombre, valor, precio_adicional) VALUES
    (id_prod, 'medida', 'Medidas', '1.20m x 2.00m', 0),
    (id_prod, 'medida', 'Medidas', '1.50m x 2.40m', 12000),
    (id_prod, 'color', 'Estilo', 'Pastel multicolor', 0);

    -- PRODUCTO 2: Backing de Luces LED
    SELECT id INTO id_cat FROM decor_store.categories WHERE slug = 'paneles-backing';
    INSERT INTO decor_store.products (nombre, slug, categoria_id, descripcion_corta, descripcion_larga, precio_alquiler, precio_venta, peso, garantia, tiempo_montaje, ideal_para, imagenes, destacado)
    VALUES ('Backing de Luces LED', 'backing-luces-led', id_cat, 'Panel con rangkaian luces LED cálidas.', 'Un fondo luminoso que transforma cualquier espacio...', 65000, 180000, '12 kg', '3 dias', '60 min', '{Bodas, Eventos corporativos}', '{"https://images.unsplash.com/photo-1513519247388-442b704783d8?w=800&h=1000&fit=crop"}', false)
    RETURNING id INTO id_prod;

    -- PRODUCTO 3: Arco de Ceremonia Dorado
    SELECT id INTO id_cat FROM decor_store.categories WHERE slug = 'estructuras-metal';
    INSERT INTO decor_store.products (nombre, slug, categoria_id, descripcion_corta, descripcion_larga, precio_alquiler, precio_venta, precio_original_venta, etiqueta_promocion, peso, garantia, tiempo_montaje, ideal_para, imagenes, destacado)
    VALUES ('Arco de Ceremonia Dorado', 'arco-ceremonia-dorado', id_cat, 'Arco metálico dorado para ceremonias nupciales.', 'El arco que define una ceremonia...', 85000, 250000, 300000, 'Especial Bodas', '25 kg', '5 dias', '90 min', '{Bodas, Ceremonias}', '{"https://m.media-amazon.com/images/I/71WSSyClwQL._AC_UL320_.jpg"}', true)
    RETURNING id INTO id_prod;

    -- PRODUCTO 4: Estructura Circular LED
    SELECT id INTO id_cat FROM decor_store.categories WHERE slug = 'estructuras-metal';
    INSERT INTO decor_store.products (nombre, slug, categoria_id, descripcion_corta, precio_alquiler, precio_venta, destacado)
    VALUES ('Estructura Circular LED', 'estructura-circular-led', id_cat, 'Marco circular moderno con iluminación LED integrada.', 95000, 280000, true)
    RETURNING id INTO id_prod;

    -- PRODUCTO 5: Cilindro Velador Luminoso
    SELECT id INTO id_cat FROM decor_store.categories WHERE slug = 'cilindros-mesas';
    INSERT INTO decor_store.products (nombre, slug, categoria_id, descripcion_corta, precio_alquiler, destacado)
    VALUES ('Cilindro Velador Luminoso', 'cilindro-velador-luminoso', id_cat, 'Cilindro de acrílico con luz LED interior.', 18000, false)
    RETURNING id INTO id_prod;

    -- PRODUCTO 6: Letras LED Infinity
    SELECT id INTO id_cat FROM decor_store.categories WHERE slug = 'numeros-letras-led';
    INSERT INTO decor_store.products (nombre, slug, categoria_id, descripcion_corta, precio_alquiler, precio_venta, destacado)
    VALUES ('Letras LED Infinity', 'letras-led-infinity', id_cat, 'Letras LED línea Infinity con brillo excepcional.', 35000, 95000, true)
    RETURNING id INTO id_prod;

    -- PRODUCTO 7: Corazón de Flores
    SELECT id INTO id_cat FROM decor_store.categories WHERE slug = 'pared-flores';
    INSERT INTO decor_store.products (nombre, slug, categoria_id, descripcion_corta, precio_alquiler, destacado)
    VALUES ('Corazón de Flores', 'corazon-flores', id_cat, 'El icónico corazón de flores, pieza romántica.', 55000, true)
    RETURNING id INTO id_prod;

    -- PRODUCTO 8: Big Shiny Ball 60cm
    SELECT id INTO id_cat FROM decor_store.categories WHERE slug = 'esferas-gigantes';
    INSERT INTO decor_store.products (nombre, slug, categoria_id, descripcion_corta, precio_alquiler, destacado)
    VALUES ('Big Shiny Ball 60cm', 'big-shiny-ball-60', id_cat, 'Esfera decorativa de superficie espejo 60cm.', 42000, true)
    RETURNING id INTO id_prod;

    -- PRODUCTO 9: Silla Tiffany Blanca
    SELECT id INTO id_cat FROM decor_store.categories WHERE slug = 'sillas-mesas';
    INSERT INTO decor_store.products (nombre, slug, categoria_id, descripcion_corta, precio_alquiler, destacado)
    VALUES ('Silla Tiffany Blanca', 'silla-tiffany-blanca', id_cat, 'Silla Tiffany clásica en blanco brillante.', 4500, true)
    RETURNING id INTO id_prod;

    -- PRODUCTO 10: Mariposas LED Pack x20
    SELECT id INTO id_cat FROM decor_store.categories WHERE slug = 'mariposas-led';
    INSERT INTO decor_store.products (nombre, slug, categoria_id, descripcion_corta, precio_alquiler, destacado)
    VALUES ('Mariposas LED Pack x20', 'mariposas-led-pack', id_cat, 'Pack de 20 mariposas LED.', 12000, false)
    RETURNING id INTO id_prod;

END $$;
