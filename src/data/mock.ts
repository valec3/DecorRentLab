import { Categoria, Producto } from "@/types";

export const categorias: Categoria[] = [
  {
    id: "1",
    nombre: "Paneles y Backing",
    slug: "paneles-backing",
    descripcion:
      "Fondos decorativos perfecto para fotocabinas y sesiones fotográficas.",
    imagenCover:
      "https://m.media-amazon.com/images/I/41kKdvMQrNL._AC_UL320_.jpg",
  },
  {
    id: "2",
    nombre: "Estructuras en Metal",
    slug: "estructuras-metal",
    descripcion: "Arcos y estructuras metálicas para ceremonias y decoración.",
    imagenCover:
      "https://m.media-amazon.com/images/I/71dCQdyx0xL._AC_SX208_CB1169409_QL70_.jpg",
  },
  {
    id: "3",
    nombre: "Cilindros y Mesas",
    slug: "cilindros-mesas",
    descripcion:
      "Cilindros decorativos y mesas modulares para composiciones únicas.",
    imagenCover:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=400&fit=crop",
  },
  {
    id: "4",
    nombre: "Fundas en Tela",
    slug: "fundas-tela",
    descripcion: "Fundas elegantes para transformar tus espacios con tela.",
    imagenCover:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&h=400&fit=crop",
  },
  {
    id: "5",
    nombre: "Números y Letras LED",
    slug: "numeros-letras-led",
    descripcion:
      "Letras y números LED, incluyendo la línea Infinity brillante.",
    imagenCover:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop",
  },
  {
    id: "6",
    nombre: "Altillo y Complementos",
    slug: "altillo-complementos",
    descripcion:
      "Altillos y elementos complementarios para elevar tu decoración.",
    imagenCover:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop",
  },
  {
    id: "7",
    nombre: "Sillas y Mesas",
    slug: "sillas-mesas",
    descripcion: "Mobiliario elegante para eventos formales y casuales.",
    imagenCover:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&h=400&fit=crop",
  },
  {
    id: "8",
    nombre: "Esferas Gigantes",
    slug: "esferas-gigantes",
    descripcion:
      "Big Shiny Balls - Esferas decorativas gigantes para impactar.",
    imagenCover:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=400&h=400&fit=crop",
  },
  {
    id: "9",
    nombre: "Pared de Flores",
    slug: "pared-flores",
    descripcion: "Paredes florales y el icónico Corazón de Flores.",
    imagenCover:
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=400&fit=crop",
  },
  {
    id: "10",
    nombre: "Mariposas LED",
    slug: "mariposas-led",
    descripcion: "Mariposas luminosas LED para un toque mágico y soñador.",
    imagenCover:
      "https://images.unsplash.com/photo-1551298370-9d3d53e40c81?w=400&h=400&fit=crop",
  },
];

export const productos: Producto[] = [
  {
    id: "p1",
    nombre: "Panel Floral Vintage",
    slug: "panel-floral-vintage",
    categoriaSlug: "paneles-backing",
    descripcionCorta:
      "Panel decorativo con flores secas estilo vintage, perfecto para fotocabinas.",
    descripcionLarga: `# Panel Floral Vintage

Un fondo decorativo único que aporta romanticismo y elegancia a cualquier evento. Este panel combina flores secas naturales en tonos pastel cuidadosamente seleccionadas.

## Características

- **Diseño**: Vintage con Flores Secas
- **Material**: Madera MDF estructural + Flores naturales secas
- **Dimensiones**: 1.20m de ancho x 2.00m de alto
- **Peso**: Aproximado 8 kg
- **Color**: Tonos pastel - rosa, crema, lavanda

## Usos Recomendados

Perfecto para:
- Fotocabinas y rincones fotográficos
- Ceremonias de boda
- Quinceañeras
- Sesiones de fotos profesionales
- Eventos corporativos

## Incluye

- Estructura auto sostenible
- Instalación profesional disponible
`,
    variantes: [
      {
        tipo: "material",
        nombre: "Material",
        valor: "Madera MDF + Flores secas naturales",
      },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "1.20m x 2.00m",
        precioAdicional: 0,
      },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "1.50m x 2.40m",
        precioAdicional: 12000,
      },
      { tipo: "color", nombre: "Estilo", valor: "Pastel multicolor" },
      {
        tipo: "color",
        nombre: "Estilo",
        valor: "Blanco y crema",
        precioAdicional: 0,
      },
      {
        tipo: "color",
        nombre: "Estilo",
        valor: "Tonos cálidos",
        precioAdicional: 0,
      },
    ],
    precio: 45000,
    peso: "8 kg",
    garantia: "3 dias",
    tiempoMontaje: "45 min",
    idealPara: ["Bodas", "Quinceañeras", "Sesiones fotográficas"],
    imagenes: [
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&h=1000&fit=crop",
    ],
    destacado: true,
    disponible: true,
  },
  {
    id: "p2",
    nombre: "Backing de Luces LED",
    slug: "backing-luces-led",
    categoriaSlug: "paneles-backing",
    descripcionCorta:
      "Panel con rangkaian luces LED cálidas que crean ambiente mágico.",
    descripcionLarga: `# Backing de Luces LED

Un fondo luminoso que transforma cualquier espacio en un entorno mágico y romántico. Las luces LED estratégicamente ubicadas crean efectos de iluminación espectaculares.

## Características

- **Tipo de iluminación**: LED cálida
- **Material**: Estructura metálica + Focos LED de bajo consumo
- **Dimensiones**: 2.00m x 2.50m
- **Colores disponibles**: Dorado cálido, blanco cálido
- **Consumo**: Bajo consumo energético

## Usos Recomendados

- Recepciones de boda
- Eventos corporativos
- Sesiones fotográficas
- Baby showers
`,
    variantes: [
      {
        tipo: "material",
        nombre: "Material",
        valor: "Estructura metal + Focos LED",
      },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "2.00m x 2.50m",
        precioAdicional: 0,
      },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "3.00m x 3.00m",
        precioAdicional: 20000,
      },
      { tipo: "color", nombre: "Color luz", valor: "Dorado cálido" },
      {
        tipo: "color",
        nombre: "Color luz",
        valor: "Blanco cálido",
        precioAdicional: 0,
      },
      { tipo: "color", nombre: "Color luz", valor: "Frío", precioAdicional: 0 },
    ],
    precio: 65000,
    peso: "12 kg",
    garantia: "3 dias",
    tiempoMontaje: "60 min",
    idealPara: ["Bodas", "Eventos corporativos", "Cumpleaños"],
    imagenes: [
      "https://images.unsplash.com/photo-1513519247388-442b704783d8?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&h=1000&fit=crop",
    ],
    destacado: false,
    disponible: true,
  },
  {
    id: "e1",
    nombre: "Arco de Ceremonia Dorado",
    slug: "arco-ceremonia-dorado",
    categoriaSlug: "estructuras-metal",
    descripcionCorta:
      "Arco metálico dorado para ceremonias nupciales elegantes.",
    descripcionLarga: `# Arco de Ceremonia Dorado

Un arco metálico de estructura robusta con acabado dorado mate, diseñado especialmente para ceremonias de boda. Su diseño versátil permite decorarlo con flores, tela o iluminación según tu estilo.

## Características

- **Material**: Hierro estructural con pintura epoxi
- **Acabado**: Dorado mate premium
- **Dimensiones**: 3.00m ancho x 2.50m alto
- **Tipo**: Semi arco o arco completo
- **Resistencia**: Alta resistencia climática

## Opciones de Decoración

- Flores naturales o artificiales
- Telas y arneses
- Luces LED
- Elementos verdes
`,
    variantes: [
      { tipo: "material", nombre: "Material", valor: "Hierro pintado" },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "3.00m x 2.50m",
        precioAdicional: 0,
      },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "4.00m x 3.00m",
        precioAdicional: 15000,
      },
      { tipo: "color", nombre: "Color", valor: "Dorado" },
      {
        tipo: "color",
        nombre: "Color",
        valor: "Plateado",
        precioAdicional: 5000,
      },
      {
        tipo: "color",
        nombre: "Color",
        valor: "Negro mate",
        precioAdicional: 5000,
      },
    ],
    precio: 85000,
    peso: "25 kg",
    garantia: "5 dias",
    tiempoMontaje: "90 min",
    idealPara: ["Bodas", "Ceremonias", "Eventos formales"],
    imagenes: [
      "https://m.media-amazon.com/images/I/71WSSyClwQL._AC_UL320_.jpg",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=1000&fit=crop",
    ],
    destacado: true,
    disponible: true,
  },
  {
    id: "e2",
    nombre: "Estructura Circular LED",
    slug: "estructura-circular-led",
    categoriaSlug: "estructuras-metal",
    descripcionCorta: "Marco circular moderno con iluminación LED integrada.",
    descripcionLarga: `# Estructura Circular LED

Un marco circular contemporáneo con luces LED empotradas que crea un impacto visual dramático. Perfecto como pieza central para recepciones y sesiones fotográficas.

## Características

- **Material**: Aluminum + LED de alta luminosidad
- **Forma**: Circular
- **Dimensiones**: 2.00m diámetro
- **Acabado**: Dorado/Blanco
- **Tipo de LED**: Empotrada perimetral

## Usos

- Photo booth
- Centro de mesa monumental
- Fondo para novios
- Exhibiciones
`,
    variantes: [
      { tipo: "material", nombre: "Material", valor: "Aluminio + LED" },
      {
        tipo: "medida",
        nombre: "Diámetro",
        valor: "2.00m",
        precioAdicional: 0,
      },
      {
        tipo: "medida",
        nombre: "Diámetro",
        valor: "2.50m",
        precioAdicional: 15000,
      },
      {
        tipo: "medida",
        nombre: "Diámetro",
        valor: "3.00m",
        precioAdicional: 30000,
      },
      { tipo: "color", nombre: "Acabado", valor: "Dorado" },
      { tipo: "color", nombre: "Acabado", valor: "Blanco", precioAdicional: 0 },
      {
        tipo: "color",
        nombre: "Acabado",
        valor: "Rosa gold",
        precioAdicional: 5000,
      },
    ],
    precio: 95000,
    peso: "18 kg",
    garantia: "5 dias",
    tiempoMontaje: "75 min",
    idealPara: ["Bodas", "Eventos premium", "Fotografía"],
    imagenes: [
      "https://m.media-amazon.com/images/I/817SRtiP8sL._AC_UL320_.jpg",
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&h=1000&fit=crop",
    ],
    destacado: true,
    disponible: true,
  },
  {
    id: "c1",
    nombre: "Cilindro Velador Luminoso",
    slug: "cilindro-velador-luminoso",
    categoriaSlug: "cilindros-mesas",
    descripcionCorta:
      "Cilindro de acrílico con luz LED interior, crea atmósfera mágica.",
    descripcionLarga: `# Cilindro Velador Luminoso

Un cilindro decorativo de acrílico transparente con iluminación LED interior. Perfecto como velador decorativo o centro de mesa para crear atmósfera mágica.

## Características

- **Material**: Acrílico cristal
- **Iluminación**: LED RGB interior
- **Dimensiones**: 30cm diámetro x 50cm alto
- **Color luz**: Blanco cálido (customizable)
- **Autonomía**: Cable eléctrico

## Usos

- Centros de mesa
- Veladores decorativos
- Ambientación de espacios
- Eventos nocturnos
`,
    variantes: [
      { tipo: "material", nombre: "Material", valor: "Acrílico + LED" },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "30cm x 50cm",
        precioAdicional: 0,
      },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "40cm x 70cm",
        precioAdicional: 8000,
      },
      { tipo: "color", nombre: "Color luz", valor: "Blanco cálido" },
      {
        tipo: "color",
        nombre: "Color luz",
        valor: "RGB multicolor",
        precioAdicional: 5000,
      },
    ],
    precio: 18000,
    peso: "3 kg",
    garantia: "2 dias",
    tiempoMontaje: "10 min",
    idealPara: ["Bodas", "Cenas ejecutivas", "Eventos nocturnos"],
    imagenes: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=1000&fit=crop",
    ],
    destacado: false,
    disponible: true,
  },
  {
    id: "c2",
    nombre: "Mesa Redonda Moderna",
    slug: "mesa-redonda-moderna",
    categoriaSlug: "cilindros-mesas",
    descripcionCorta:
      "Mesa circular con base cilíndrica y superficie de cristal.",
    descripcionLarga: `# Mesa Redonda Moderna

Una mesa elegante de diseño contemporáneo con base cilíndrica. La superficie de cristal templado aporta sofisticación, ideal para centros de mesa o exhibiciones.

## Características

- **Material**: Cristal templado 10mm + Base metálica
- **Dimensiones**: 80cm diámetro x 75cm alto
- **Capacidad**: Hasta 30 kg
- **Color base**: Dorado

## Usos

- Centros de mesa
- Exhibición de productos
- Mesas de regalos
- Recepciones
`,
    variantes: [
      {
        tipo: "material",
        nombre: "Material",
        valor: "Cristal templado + Metal",
      },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "80cm diámetro x 75cm alto",
        precioAdicional: 0,
      },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "100cm diámetro x 75cm alto",
        precioAdicional: 12000,
      },
      { tipo: "color", nombre: "Color base", valor: "Dorado" },
      {
        tipo: "color",
        nombre: "Color base",
        valor: "Plateado",
        precioAdicional: 0,
      },
    ],
    precio: 28000,
    peso: "15 kg",
    garantia: "3 dias",
    tiempoMontaje: "15 min",
    idealPara: ["Recepciones", "Exposiciones", "Eventos"],
    imagenes: [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=1000&fit=crop",
    ],
    destacado: false,
    disponible: true,
  },
  {
    id: "f1",
    nombre: "Funda Seda Chair",
    slug: "funda-seda-chair",
    categoriaSlug: "fundas-tela",
    descripcionCorta:
      "Funda de seda premium para sillas formales estilo Chiavari.",
    descripcionLarga: `# Funda Seda Chair

Funda de seda sintética premium diseñada específicamente para sillas Chiavari. El acabado elegante y sofisticado eleva instantáneamente cualquier evento formal.

## Características

- **Material**: Seda sintética de alta calidad
- **Compatibilidad**: Sillas Chiavari, Fold
- **Color**: Blanco perla
- **Acabado**: Brillo sutil
- **Cantidad minima**: 10 unidades

## Colores disponibles

- Blanco perla
- Marfil
- Champagne
- Dorado
`,
    variantes: [
      { tipo: "material", nombre: "Material", valor: "Seda sintética premium" },
      { tipo: "color", nombre: "Color", valor: "Blanco perla" },
      { tipo: "color", nombre: "Color", valor: "Marfil", precioAdicional: 0 },
      {
        tipo: "color",
        nombre: "Color",
        valor: "Champagne",
        precioAdicional: 500,
      },
      { tipo: "color", nombre: "Color", valor: "Dorado", precioAdicional: 500 },
    ],
    precio: 2500,
    peso: "0.3 kg c/u",
    garantia: "1 dia",
    tiempoMontaje: "5 min",
    idealPara: ["Bodas", "Galas", "Eventos corporativos"],
    imagenes: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&h=1000&fit=crop",
    ],
    destacado: true,
    disponible: true,
  },
  {
    id: "f2",
    nombre: "Funda Terciopelo Premium",
    slug: "funda-terciopelo-premium",
    categoriaSlug: "fundas-tela",
    descripcionCorta: "Funda de terciopelo luxe para banquetas y poufs.",
    descripcionLarga: `# Funda Terciopelo Premium

Funda de terciopelo de alta calidad que aporta textura y lujo a banquetas y poufs. Los colores profundos crean un ambiente sofisticado y acolhador.

## Características

- **Material**: Terciopelo premium (100% poliester)
- **Compatible**: Banquetas 40x40cm
- **Colores**: Burdeos, Verde esmeralda, Azul navy
- **Textura**: Suave y rica
- **Cantidad minima**: 6 unidades

## Cuidado

- Lavado en seco recomendado
- No exponer directamente al sol
`,
    variantes: [
      { tipo: "material", nombre: "Material", valor: "Terciopelo premium" },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "40cm x 40cm",
        precioAdicional: 0,
      },
      { tipo: "color", nombre: "Color", valor: "Burdeos" },
      { tipo: "color", nombre: "Color", valor: "Verde esmeralda" },
      {
        tipo: "color",
        nombre: "Color",
        valor: "Azul navy",
        precioAdicional: 0,
      },
    ],
    precio: 3500,
    peso: "0.5 kg c/u",
    garantia: "1 dia",
    tiempoMontaje: "3 min",
    idealPara: ["Bodas", "Lounge areas", "Eventos premium"],
    imagenes: [
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1544457070-4cd96414b3ad?w=800&h=1000&fit=crop",
    ],
    destacado: false,
    disponible: true,
  },
  {
    id: "l1",
    nombre: "Letras LED Infinity",
    slug: "letras-led-infinity",
    categoriaSlug: "numeros-letras-led",
    descripcionCorta:
      "Letras LED línea Infinity con brillo excepcional efecto espejo.",
    descripcionLarga: `# Letras LED Infinity

Letters LED de la línea Infinity con brillo excepcional. El acabado espejo refleja la luz creando efectos visuales sorprendentes. Perfecto para photobooths y decoraciones personalizadas.

## Características

- **Material**: Acrílico LED de alta luminosidad
- **Acabado**: Espejo
- **Altura**: 40cm - 100cm (personalizable)
- **Colores**: Dorado, Plata, Rosa gold
- **Efecto**: Brillo intenso 360°

## Opciones

- Nombres personalizados
- Palabras decorativas
- Logos iluminados
`,
    variantes: [
      { tipo: "material", nombre: "Material", valor: "Acrílico LED" },
      { tipo: "medida", nombre: "Altura", valor: "40cm", precioAdicional: 0 },
      {
        tipo: "medida",
        nombre: "Altura",
        valor: "60cm",
        precioAdicional: 8000,
      },
      {
        tipo: "medida",
        nombre: "Altura",
        valor: "80cm",
        precioAdicional: 15000,
      },
      {
        tipo: "medida",
        nombre: "Altura",
        valor: "100cm",
        precioAdicional: 22000,
      },
      { tipo: "color", nombre: "Color", valor: "Dorado" },
      { tipo: "color", nombre: "Color", valor: "Plata" },
      {
        tipo: "color",
        nombre: "Color",
        valor: "Rosa gold",
        precioAdicional: 5000,
      },
    ],
    precio: 35000,
    peso: "5-12 kg",
    garantia: "3 dias",
    tiempoMontaje: "30 min",
    idealPara: ["Bodas", "Quinceañeras", "Eventos"],
    imagenes: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1517705008128-361805f42e8a?w=800&h=1000&fit=crop",
    ],
    destacado: true,
    disponible: true,
  },
  {
    id: "l2",
    nombre: "Números LED Gigantes",
    slug: "numeros-led-gigantes",
    categoriaSlug: "numeros-letras-led",
    descripcionCorta:
      "Números LED de gran formato ideales para mesas de cumpleaños.",
    descripcionLarga: `# Números LED Gigantes

Números LED de gran formato perfectos para mesas de cumpleaños, age reveal y decoraciones especiales. Visibles desde larga distancia.

## Características

- **Material**: LED Tube
- **Altura**: 60cm - 120cm
- **Colores**: Rosa, Dorado, Blanco, Azul
- **Visibilidad**: Hasta 50 metros
- **Uso**: Mesa o suelo

## Ideal para

- Mesas de cumpleaños
- Age reveal
- Baby showers
- Revelaciones de género
`,
    variantes: [
      { tipo: "material", nombre: "Material", valor: "LED Tube" },
      { tipo: "medida", nombre: "Altura", valor: "60cm", precioAdicional: 0 },
      {
        tipo: "medida",
        nombre: "Altura",
        valor: "80cm",
        precioAdicional: 6000,
      },
      {
        tipo: "medida",
        nombre: "Altura",
        valor: "100cm",
        precioAdicional: 12000,
      },
      {
        tipo: "medida",
        nombre: "Altura",
        valor: "120cm",
        precioAdicional: 18000,
      },
      { tipo: "color", nombre: "Color", valor: "Rosa" },
      { tipo: "color", nombre: "Color", valor: "Dorado" },
      { tipo: "color", nombre: "Color", valor: "Blanco" },
      { tipo: "color", nombre: "Color", valor: "Azul", precioAdicional: 0 },
    ],
    precio: 28000,
    peso: "4-8 kg",
    garantia: "2 dias",
    tiempoMontaje: "20 min",
    idealPara: ["Cumpleaños", "Age reveal", "Baby shower"],
    imagenes: [
      "https://images.unsplash.com/photo-1551298370-9d3d53e40c81?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?w=800&h=1000&fit=crop",
    ],
    destacado: true,
    disponible: true,
  },
  {
    id: "a1",
    nombre: "Altillo de Madera Rústica",
    slug: "altillo-madera-rustica",
    categoriaSlug: "altillo-complementos",
    descripcionCorta:
      "Plataforma de madera con acabado rústico para elevar decoraciones.",
    descripcionLarga: `# Altillo de Madera Rústica

Altillo de madera maciza con acabado rústico natural. Perfecto para elevar decoraciones, pasteles o elementos especiales en eventos.

## Características

- **Material**: Madera maciza de pino
- **Acabado**: Rústico natural
- **Dimensiones**: 2.00m x 1.00m x 40cm alto
- **Capacidad**: Hasta 100 kg
- **Tratamiento**: Sellador protector

## Usos

- Elevación de pasteles
- Exhibición de productos
- Podios
- Fotografías
`,
    variantes: [
      { tipo: "material", nombre: "Material", valor: "Madera maciza de pino" },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "2.00m x 1.00m x 40cm",
        precioAdicional: 0,
      },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "2.50m x 1.20m x 40cm",
        precioAdicional: 12000,
      },
      { tipo: "color", nombre: "Acabado", valor: "Natural" },
      {
        tipo: "color",
        nombre: "Acabado",
        valor: "Blanco",
        precioAdicional: 5000,
      },
      {
        tipo: "color",
        nombre: "Acabado",
        valor: "Negro",
        precioAdicional: 5000,
      },
    ],
    precio: 32000,
    peso: "35 kg",
    garantia: "5 dias",
    tiempoMontaje: "45 min",
    idealPara: ["Bodas", "Eventos rusticos", "Exposiciones"],
    imagenes: [
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1616489953149-880140293699?w=800&h=1000&fit=crop",
    ],
    destacado: false,
    disponible: true,
  },
  {
    id: "a2",
    nombre: "Columna Clásica Dorada",
    slug: "columna-clasica-dorada",
    categoriaSlug: "altillo-complementos",
    descripcionCorta: "Columna corintia decorativa con finish dorado elegante.",
    descripcionLarga: `# Columna Clásica Dorada

Columna de estilo clásico con capitel corintio en finish dorado. Pieza decorativa que aporta elegancia atemporal a cualquier evento.

## Características

- **Material**: Fibra de vidrio
- **Estilo**: Corintio clásico
- **Dimensiones**: 30cm x 30cm base x 100cm alto
- **Acabado**: Dorado mate
- **Uso**: Decorativo/Funcional

## Aplicaciones

- Soporte de超高花卉
- Elemento estructural decorativo
- Eventos griegos/romanos
- Fotografías
`,
    variantes: [
      { tipo: "material", nombre: "Material", valor: "Fibra de vidrio" },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "30cm x 30cm x 100cm",
        precioAdicional: 0,
      },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "40cm x 40cm x 120cm",
        precioAdicional: 8000,
      },
      { tipo: "color", nombre: "Acabado", valor: "Dorado" },
      {
        tipo: "color",
        nombre: "Acabado",
        valor: "Plateado",
        precioAdicional: 0,
      },
      { tipo: "color", nombre: "Acabado", valor: "Blanco", precioAdicional: 0 },
    ],
    precio: 22000,
    peso: "8 kg",
    garantia: "3 dias",
    tiempoMontaje: "15 min",
    idealPara: ["Bodas", "Eventos griegos", "Decoración clásica"],
    imagenes: [
      "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=1000&fit=crop",
    ],
    destacado: false,
    disponible: true,
  },
  {
    id: "s1",
    nombre: "Silla Tiffany Blanca",
    slug: "silla-tiffany-blanca",
    categoriaSlug: "sillas-mesas",
    descripcionCorta:
      "Silla Tiffany clásica en blanco brillante, símbolo de elegancia.",
    descripcionLarga: `# Silla Tiffany Blanca

La silla Tiffany icónica en blanco brillante. Su silueta elegante y reconocible aporta distinción y sofisticación a cualquier evento formal.

## Características

- **Material**: Plástico ABS de alta resistencia
- **Color**: Blanco brillante
- **Dimensiones**: 45cm x 45cm x 90cm alto
- **Capacidad**: Hasta 150 kg
- **Apilable**: Si

## Usos

- Ceremonias de boda
- Recepciones
- Conferencias
- Eventos formales
`,
    variantes: [
      { tipo: "material", nombre: "Material", valor: "Plástico ABS" },
      { tipo: "color", nombre: "Color", valor: "Blanco brillante" },
      { tipo: "color", nombre: "Color", valor: "Dorado", precioAdicional: 800 },
      { tipo: "color", nombre: "Color", valor: "Negro", precioAdicional: 800 },
      {
        tipo: "color",
        nombre: "Color",
        valor: "Champagne",
        precioAdicional: 1000,
      },
    ],
    precio: 4500,
    peso: "4 kg",
    garantia: "2 dias",
    tiempoMontaje: "2 min",
    idealPara: ["Bodas", "Conferencias", "Eventos formales"],
    imagenes: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=1000&fit=crop",
    ],
    destacado: true,
    disponible: true,
  },
  {
    id: "s2",
    nombre: "Silla Lounge Velvet",
    slug: "silla-lounge-velvet",
    categoriaSlug: "sillas-mesas",
    descripcionCorta: "Sillón lounge moderno tapizado en terciopelo premium.",
    descripcionLarga: `# Silla Lounge Velvet

Sillón lounge de diseño moderno tapizado en terciopelo premium. Combina confort excepcional con estilo sofisticado, ideal para áreas VIP y lounges.

## Características

- **Material**: Terciopelo premium + Estructura metálica
- **Color**: Verde esmeralda
- **Dimensiones**: 70cm x 80cm x 80cm
- **Base**: Giratoria cromada
- **Comodidad**: Alta

## Ideal para

- Áreas VIP
- Lounges
- Sesiones fotográficas
- Recepciones premium
`,
    variantes: [
      {
        tipo: "material",
        nombre: "Material",
        valor: "Terciopelo premium + Metal",
      },
      { tipo: "color", nombre: "Color", valor: "Verde esmeralda" },
      { tipo: "color", nombre: "Color", valor: "Burdeos", precioAdicional: 0 },
      {
        tipo: "color",
        nombre: "Color",
        valor: "Azul navy",
        precioAdicional: 0,
      },
      {
        tipo: "color",
        nombre: "Color",
        valor: "Rosa pálido",
        precioAdicional: 0,
      },
    ],
    precio: 18000,
    peso: "18 kg",
    garantia: "3 dias",
    tiempoMontaje: "10 min",
    idealPara: ["Eventos premium", "Lounge", "Sesiones fotográficas"],
    imagenes: [
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1534349762230-e0cadf8f3b2c?w=800&h=1000&fit=crop",
    ],
    destacado: true,
    disponible: true,
  },
  {
    id: "b1",
    nombre: "Big Shiny Ball 60cm",
    slug: "big-shiny-ball-60",
    categoriaSlug: "esferas-gigantes",
    descripcionCorta: "Esfera decorativa de superficie espejo 60cm.",
    descripcionLarga: `# Big Shiny Ball 60cm

Esfera decorativa con superficie de acero inoxidable efecto espejo. Refleja el entorno creando composiciones visuales únicas y sorprendentes.

## Características

- **Material**: Acero inoxidable 304
- **Acabado**: Espejo completo
- **Dimensiones**: 60cm diámetro
- **Peso**: 12 kg
- **Resistencia**: Intemperie

## Usos

- Centros de mesa monumental
- Fotografía
- Eventos premium
- Decoración exterior
`,
    variantes: [
      { tipo: "material", nombre: "Material", valor: "Acero inoxidable 304" },
      {
        tipo: "medida",
        nombre: "Tamaño",
        valor: "60cm diámetro",
        precioAdicional: 0,
      },
      {
        tipo: "medida",
        nombre: "Tamaño",
        valor: "80cm diámetro",
        precioAdicional: 18000,
      },
      {
        tipo: "medida",
        nombre: "Tamaño",
        valor: "100cm diámetro",
        precioAdicional: 35000,
      },
      { tipo: "color", nombre: "Acabado", valor: "Plata espejo" },
      {
        tipo: "color",
        nombre: "Acabado",
        valor: "Oro rosa",
        precioAdicional: 8000,
      },
      {
        tipo: "color",
        nombre: "Acabado",
        valor: "Dorado",
        precioAdicional: 8000,
      },
    ],
    precio: 42000,
    peso: "12 kg",
    garantia: "5 dias",
    tiempoMontaje: "15 min",
    idealPara: ["Bodas", "Eventos premium", "Fotografía"],
    imagenes: [
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&h=1000&fit=crop",
    ],
    destacado: true,
    disponible: true,
  },
  {
    id: "b2",
    nombre: "Big Shiny Ball 80cm Oro",
    slug: "big-shiny-ball-80-oro",
    categoriaSlug: "esferas-gigantes",
    descripcionCorta:
      "Esfera dorada efecto espejo 80cm para impacto visual máximo.",
    descripcionLarga: `# Big Shiny Ball 80cm Oro

Gran esfera de 80cm con finish dorado efecto espejo. Pieza impactante que se convierte en el centro de atención de cualquier evento sofisticado.

## Características

- **Material**: Acero inoxidable dorado
- **Acabado**: Oro rosa espejo
- **Dimensiones**: 80cm diámetro
- **Peso**: 22 kg
- **Tipo**: Impacto visual máximo

## Efecto Visual

- Refleja iluminación ambiente
- Crea puntos de luz
- Fotogénica
- Premium look
`,
    variantes: [
      {
        tipo: "material",
        nombre: "Material",
        valor: "Acero inoxidable dorado",
      },
      {
        tipo: "medida",
        nombre: "Tamaño",
        valor: "80cm diámetro",
        precioAdicional: 0,
      },
      {
        tipo: "medida",
        nombre: "Tamaño",
        valor: "100cm diámetro",
        precioAdicional: 20000,
      },
      { tipo: "color", nombre: "Acabado", valor: "Oro rosa espejo" },
      {
        tipo: "color",
        nombre: "Acabado",
        valor: "Oro amarillo",
        precioAdicional: 0,
      },
      {
        tipo: "color",
        nombre: "Acabado",
        valor: "Plata espejo",
        precioAdicional: 5000,
      },
    ],
    precio: 68000,
    peso: "22 kg",
    garantia: "5 dias",
    tiempoMontaje: "20 min",
    idealPara: ["Bodas doradas", "Eventos de lujo", "Decoración premium"],
    imagenes: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=1000&fit=crop",
    ],
    destacado: true,
    disponible: true,
  },
  {
    id: "pf1",
    nombre: "Corazón de Flores",
    slug: "corazon-flores",
    categoriaSlug: "pared-flores",
    descripcionCorta:
      "El icónico corazón de flores, pieza centerpiece romántica.",
    descripcionLarga: `# Corazón de Flores

El icónico corazón de flores, pieza centerpiece que se ha convertido en símbolo de romanticismo. Flores artificiales de alta calidad con apariencia natural.

## Características

- **Material**: Flores artificiales premium
- **Dimensiones**: 1.20m x 1.20m
- **Colores**: Rosa, Blanco, Rojo (personalizable)
- **Estructura': Auto sostenible
- **Uso**: Interior/Exterior cubierto

## Opciones de personalización

- Color principal
- Size (pequeño, mediano, grande)
- Texto/flores adicionales
`,
    variantes: [
      {
        tipo: "material",
        nombre: "Material",
        valor: "Flores artificiales premium",
      },
      {
        tipo: "medida",
        nombre: "Tamaño",
        valor: "Pequeño (80cm)",
        precioAdicional: 0,
      },
      {
        tipo: "medida",
        nombre: "Tamaño",
        valor: "Mediano (1.20m)",
        precioAdicional: 15000,
      },
      {
        tipo: "medida",
        nombre: "Tamaño",
        valor: "Grande (1.50m)",
        precioAdicional: 30000,
      },
      { tipo: "color", nombre: "Color", valor: "Rosa" },
      { tipo: "color", nombre: "Color", valor: "Blanco" },
      { tipo: "color", nombre: "Color", valor: "Rojo", precioAdicional: 0 },
      {
        tipo: "color",
        nombre: "Color",
        valor: "Mixto personalizado",
        precioAdicional: 5000,
      },
    ],
    precio: 55000,
    peso: "15 kg",
    garantia: "5 dias",
    tiempoMontaje: "45 min",
    idealPara: ["Bodas", "Pedidos de mano", "Sesiones fotográficas"],
    imagenes: [
      "https://images.unsplash.com/photo-1513519247388-442b704783d8?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&h=1000&fit=crop",
    ],
    destacado: true,
    disponible: true,
  },
  {
    id: "pf2",
    nombre: "Pared Floral Completa",
    slug: "pared-floral-completa",
    categoriaSlug: "pared-flores",
    descripcionCorta:
      "Pared floral extensa para backdrop principal o divisor de espacios.",
    descripcionLarga: `# Pared Floral Completa

Extensa pared floral completa, ideal como backdrop principal o divisor de espacios. Cobertura total con flores artificiales de apariencia realista.

## Características

- **Material**: Flores artificiales premium
- **Dimensiones**: 3.00m x 2.50m
- **Color**: Verde botánico + Blancas
- **Estructura': Modular
- **Instalación': Profesionales

## Usos

- Backdrop principal
- Divisor de espacios
- Fondo de escenario
- Photo booth
`,
    variantes: [
      {
        tipo: "material",
        nombre: "Material",
        valor: "Flores artificiales premium",
      },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "3.00m x 2.50m",
        precioAdicional: 0,
      },
      {
        tipo: "medida",
        nombre: "Medidas",
        valor: "4.00m x 2.50m",
        precioAdicional: 35000,
      },
      { tipo: "color", nombre: "Estilo", valor: "Verde botánico + Blancas" },
      {
        tipo: "color",
        nombre: "Estilo",
        valor: "Rosa pálido + Blancas",
        precioAdicional: 0,
      },
      {
        tipo: "color",
        nombre: "Estilo",
        valor: "Rojo + Blancas",
        precioAdicional: 0,
      },
      {
        tipo: "color",
        nombre: "Estilo",
        valor: "Personalizado",
        precioAdicional: 10000,
      },
    ],
    precio: 120000,
    peso: "45 kg",
    garantia: "7 dias",
    tiempoMontaje: "120 min",
    idealPara: ["Bodas", "Eventos corporativos", "Fotografía"],
    imagenes: [
      "https://images.unsplash.com/photo-1617806118233-f8e137ca7a2a?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=1000&fit=crop",
    ],
    destacado: true,
    disponible: true,
  },
  {
    id: "m1",
    nombre: "Mariposas LED Pack x20",
    slug: "mariposas-led-pack",
    categoriaSlug: "mariposas-led",
    descripcionCorta:
      "Pack de 20 mariposas LED con iluminación parpadeante realista.",
    descripcionLarga: `# Mariposas LED Pack x20

Set de 20 mariposas LED con alas realistas e iluminación parpadeante. Se pueden pegar a paredes, techos o flotar libremente creando un efecto mágico.

## Características

- **Cantidad**: 20 unidades
- **Material**: Plástico + LED
- **Tamaño**: 10cm envergadura
- **Color**: Multicolor (RGB)
- **Efecto**: Parpadeo realista

## Usos

- Decoración de techos
- Paredes florales
- Arreglos de mesa
- Eventos temáticos
`,
    variantes: [
      { tipo: "material", nombre: "Material", valor: "Plástico + LED" },
      { tipo: "medida", nombre: "Pack", valor: "Pack x20", precioAdicional: 0 },
      {
        tipo: "medida",
        nombre: "Pack",
        valor: "Pack x50",
        precioAdicional: 25000,
      },
      { tipo: "color", nombre: "Color", valor: "Multicolor (RGB)" },
      {
        tipo: "color",
        nombre: "Color",
        valor: "Blanco cálido",
        precioAdicional: 0,
      },
      { tipo: "color", nombre: "Color", valor: "Rosa", precioAdicional: 0 },
    ],
    precio: 15000,
    peso: "0.5 kg",
    garantia: "2 dias",
    tiempoMontaje: "30 min",
    idealPara: ["Bodas", "Fiestas temáticas", "Decoración ceilings"],
    imagenes: [
      "https://images.unsplash.com/photo-1616137422495-1e902b70b748?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&h=1000&fit=crop",
    ],
    destacado: false,
    disponible: true,
  },
  {
    id: "m2",
    nombre: "Mariposa LED Gigante",
    slug: "mariposa-led-gigante",
    categoriaSlug: "mariposas-led",
    descripcionCorta: "Gran mariposa LED decorativa de 60cm como pieza focal.",
    descripcionLarga: `# Mariposa LED Gigante

Gran mariposa LED decorativa de 60cm, perfecta como pieza focal o para composiciones especiales. Acabado metálico con iluminación LED integrada.

## Características

- **Material**: Metal + LED
- **Dimensiones**: 60cm x 50cm
- **Color**: Dorado/Rosa
- **Acabado': Metálico
- **Uso**: Pieza focal

## Aplicaciones

- Centro de mesa monumental
- Decoración de entrada
- Sesiones fotográficas
- Eventos premium
`,
    variantes: [
      { tipo: "material", nombre: "Material", valor: "Metal + LED" },
      {
        tipo: "medida",
        nombre: "Tamaño",
        valor: "60cm x 50cm",
        precioAdicional: 0,
      },
      {
        tipo: "medida",
        nombre: "Tamaño",
        valor: "80cm x 65cm",
        precioAdicional: 12000,
      },
      { tipo: "color", nombre: "Color", valor: "Dorado" },
      {
        tipo: "color",
        nombre: "Color",
        valor: "Rosa gold",
        precioAdicional: 0,
      },
      { tipo: "color", nombre: "Color", valor: "Plateado", precioAdicional: 0 },
    ],
    precio: 28000,
    peso: "3 kg",
    garantia: "3 dias",
    tiempoMontaje: "15 min",
    idealPara: ["Eventos premium", "Fotografía", "Decoración central"],
    imagenes: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=1000&fit=crop",
    ],
    destacado: false,
    disponible: true,
  },
];

export const getCategoriaBySlug = (slug: string): Categoria | undefined => {
  return categorias.find((c) => c.slug === slug);
};

export const getProductosByCategoria = (categoriaSlug: string): Producto[] => {
  return productos.filter((p) => p.categoriaSlug === categoriaSlug);
};

export const getProductoBySlug = (slug: string): Producto | undefined => {
  return productos.find((p) => p.slug === slug);
};

export const getProductosDestacados = (): Producto[] => {
  return productos.filter((p) => p.destacado);
};

export const buscarProductos = (query: string): Producto[] => {
  const lowerQuery = query.toLowerCase();
  return productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(lowerQuery) ||
      p.descripcionCorta.toLowerCase().includes(lowerQuery) ||
      p.categoriaSlug.toLowerCase().includes(lowerQuery),
  );
};
