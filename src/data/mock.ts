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
    descripcionLarga: `
<h2>El panel que transforma tu evento</h2>
<p>Un fondo decorativo único que aporta romanticismo y elegancia a cualquier celebración. Este panel combina <strong>flores secas naturales</strong> en tonos pastel cuidadosamente seleccionadas, creando una composición artística que impresiona a cada invitado.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Madera MDF estructural + flores naturales secas</li>
  <li><strong>Dimensiones base:</strong> 1.20m de ancho × 2.00m de alto</li>
  <li><strong>Peso:</strong> Aproximado 8 kg</li>
  <li><strong>Paleta:</strong> Tonos pastel — rosa, crema y lavanda</li>
</ul>
<h2>¿Para qué tipo de eventos es ideal?</h2>
<p>Perfecto para <em>fotocabinas</em>, rincones fotográficos de bodas, quinceañeras, sesiones de fotos profesionales y eventos corporativos con identidad floral.</p>
<blockquote>Cada panel es armado a mano con flores secas naturales, por lo que los tonos pueden presentar variaciones naturales que enriquecen su unicidad.</blockquote>
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
      { tipo: "acabado", nombre: "Acabado", valor: "Mate" },
      { tipo: "acabado", nombre: "Acabado", valor: "Brillante", precioAdicional: 2000 },
    ],
    precioAlquiler: 45000,
    precioVenta: 120000,
    promocion: {
      precioOriginalVenta: 150000,
      etiqueta: "Oferta Lanzamiento"
    },
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
    descripcionLarga: `
<h2>Iluminación que crea magia</h2>
<p>Un fondo luminoso que transforma cualquier espacio en un entorno romántico y cinematográfico. Las <strong>luces LED de tono cálido</strong> están estratégicamente distribuidas para crear una atmósfera irresistible en fotos y videos.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Tipo de iluminación:</strong> LED cálida de bajo consumo</li>
  <li><strong>Material:</strong> Estructura metálica lacada + focos LED</li>
  <li><strong>Dimensiones base:</strong> 2.00m × 2.50m</li>
  <li><strong>Tonos disponibles:</strong> Dorado cálido, blanco cálido, frío</li>
</ul>
<h2>¿Dónde brilla más este backing?</h2>
<p>Ideal para recepciones nupciales, eventos corporativos de alto perfil, <em>baby showers nocturnos</em> y sesiones fotográficas con atmosfera romántica.</p>
<blockquote>La iluminación cálida favorece la piel en todas las fotografías, haciendo que cada invitado luzca espléndido en las fotos del evento.</blockquote>
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
    precioAlquiler: 65000,
    precioVenta: 180000,
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
    descripcionLarga: `
<h2>El arco que define una ceremonia</h2>
<p>Un arco metálico de estructura robusta con <strong>acabado dorado mate premium</strong>, diseñado para ceremonias de boda que buscan un look elegante y atemporal. Su diseño versátil se adapta a cualquier estilo de decoración: desde lo rústico hasta lo más contemporáneo.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Hierro estructural con pintura epoxi de alta durabilidad</li>
  <li><strong>Acabado:</strong> Dorado mate premium (también disponible en plateado y negro)</li>
  <li><strong>Dimensiones base:</strong> 3.00m de ancho × 2.50m de alto</li>
  <li><strong>Resistencia climática:</strong> Apto para uso en exteriores</li>
</ul>
<h2>¿Cómo personalizarlo?</h2>
<p>El arco se puede decorar con <em>flores naturales o artificiales</em>, telas, guirnaldas de luces LED, plantas colgantes y cualquier complemento que imagine. Es la base perfecta para el momento más fotografiado de tu boda.</p>
<blockquote>Incluye montaje y desmontaje profesional. Coordinamos la instalación con tu decoradora para que todo esté listo antes de que lleguen los invitados.</blockquote>
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
      { tipo: "acabado", nombre: "Acabado", valor: "Mate" },
      { tipo: "acabado", nombre: "Acabado", valor: "Brillante", precioAdicional: 2000 },
    ],
    precioAlquiler: 85000,
    precioVenta: 250000,
    promocion: {
      precioOriginalVenta: 300000,
      precioOriginalAlquiler: 100000,
      etiqueta: "Especial Bodas"
    },
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
    descripcionLarga: `
<h2>El círculo perfecto para cada evento</h2>
<p>Un marco circular contemporáneo con <strong>luces LED empotradas en todo su perímetro</strong> que genera un impacto visual dramático a primera vista. Es la pieza central que eleva el nivel estético de cualquier recepción o sesión fotográfica.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Aluminio de alta resistencia + LED perimetral</li>
  <li><strong>Forma:</strong> Circular perfecta con luz uniforme 360°</li>
  <li><strong>Diámetros disponibles:</strong> 2.00m, 2.50m y 3.00m</li>
  <li><strong>Acabados:</strong> Dorado, blanco y rosa gold</li>
</ul>
<h2>Usos más populares</h2>
<p>Perfecta como <em>photo booth premium</em>, fondo para novios durante el brindis, elemento central en recepciones de gala o como instalación artística en exhibiciones y event spaces.</p>
<blockquote>La estructura circular LED es uno de nuestros elementos más fotografiados. Genera miles de impresiones orgánicas en redes sociales gracias a su impacto visual único.</blockquote>
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
      { tipo: "acabado", nombre: "Acabado", valor: "Mate" },
      { tipo: "acabado", nombre: "Acabado", valor: "Brillante", precioAdicional: 2000 },
    ],
    precioAlquiler: 95000,
    precioVenta: 280000,
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
    descripcionLarga: `
<h2>Ambiente y elegancia en cada mesa</h2>
<p>Un cilindro decorativo de <strong>acrílico cristal de alta transparencia</strong> con iluminación LED interior. Crea un punto lumínico elegante y sofisticado que convierte cualquier mesa en una instalación de diseño.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Acrílico cristal premium</li>
  <li><strong>Iluminación:</strong> LED interior de tono cálido</li>
  <li><strong>Dimensiones base:</strong> 30cm de diámetro × 50cm de alto</li>
  <li><strong>Alimentación:</strong> Cable eléctrico estándar (incluido)</li>
</ul>
<h2>¿Dónde utilizarlo?</h2>
<p>Como <em>centro de mesa de lujo</em>, velador decorativo en áreas lounge, ambientación de espacios VIP y cualquier evento nocturno que requiera una iluminación diferenciadora y premium.</p>
<blockquote>Recomendamos combinar varios cilindros de distintas alturas en la misma mesa para lograr un efecto escalonado de alto impacto visual.</blockquote>
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
      { tipo: "acabado", nombre: "Acabado", valor: "Mate" },
      { tipo: "acabado", nombre: "Acabado", valor: "Brillante", precioAdicional: 2000 },
    ],
    precioAlquiler: 18000,
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
    descripcionLarga: `
<h2>Sofisticación sobre cristal templado</h2>
<p>Una mesa de diseño contemporáneo con <strong>base cilíndrica metálica</strong> y superficie de cristal templado de 10mm. La combinación de materiales nobles transmite una elegancia discreta y moderna, ideal para ambientes de alto nivel.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Cristal templado 10mm + base metálica lacada</li>
  <li><strong>Dimensiones base:</strong> 80cm de diámetro × 75cm de alto</li>
  <li><strong>Capacidad de carga:</strong> Hasta 30 kg</li>
  <li><strong>Base disponible en:</strong> Dorado o plateado</li>
</ul>
<h2>Usos ideales</h2>
<p>Perfecta como <em>centro de mesa principal</em> para exhibir centros florales, como mesa de regalos en bodas, puesto de exhibición de productos en eventos corporativos o mesa de recepción para cocktails.</p>
<blockquote>Su diseño transparente y liviano visualmente hace que cualquier espacio se sienta más amplio, sin sacrificar el protagonismo decorativo.</blockquote>
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
      { tipo: "acabado", nombre: "Acabado", valor: "Mate" },
      { tipo: "acabado", nombre: "Acabado", valor: "Brillante", precioAdicional: 2000 },
    ],
    precioAlquiler: 28000,
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
    descripcionLarga: `
<h2>El acabado que eleva tu evento</h2>
<p>Funda de <strong>seda sintética de alta calidad</strong> diseñada específicamente para sillas Chiavari y similares. El brillo sutil y el caído natural del tejido transforman instantáneamente sillas simples en piezas de decoración de alta gama.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Seda sintética premium</li>
  <li><strong>Compatible con:</strong> Sillas Chiavari, plegables y de eventos</li>
  <li><strong>Acabado:</strong> Brillo sutil y superficie suave al tacto</li>
  <li><strong>Cantidad mínima de alquiler:</strong> 10 unidades</li>
</ul>
<h2>Colores disponibles</h2>
<p>Disponible en <em>blanco perla</em>, marfil, champagne y dorado. Podemos coordinar el color con el resto de la decoración de tu evento para una coherencia visual impecable.</p>
<blockquote>El precio indica el costo por unidad. Para eventos con 50 o más sillas, consultar descuento por volumen.</blockquote>
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
    precioAlquiler: 2500,
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
    descripcionLarga: `
<h2>Textura y lujo que se siente</h2>
<p>Funda de <strong>terciopelo de alta calidad</strong> que aporta riqueza textural y sofisticación a banquetas, poufs y sillas de acento. Los colores profundos y saturados crean un ambiente de lounge íntimo y exclusivo.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Terciopelo premium 100% poliéster de alta densidad</li>
  <li><strong>Compatible con:</strong> Banquetas de 40×40cm</li>
  <li><strong>Colores disponibles:</strong> Burdeos, verde esmeralda, azul navy</li>
  <li><strong>Cantidad mínima de alquiler:</strong> 6 unidades</li>
</ul>
<h2>Cuidado y mantenimiento</h2>
<p>Cada funda se entrega <em>limpia y planchada</em>. Recomendamos no exponerlas directamente al sol durante el evento para preservar la intensidad del color y la suavidad de la tela.</p>
<blockquote>Los colores profundos del terciopelo son ideales para ambientes con iluminación tenue o seteos de tipo speakeasy y garden party nocturno.</blockquote>
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
      { tipo: "acabado", nombre: "Acabado", valor: "Mate" },
      { tipo: "acabado", nombre: "Acabado", valor: "Brillante", precioAdicional: 2000 },
    ],
    precioAlquiler: 3500,
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
    descripcionLarga: `
<h2>Tu nombre, iluminado</h2>
<p>Letras LED de la <strong>línea Infinity</strong> con acabado espejo que refleja la luz en múltiples ángulos, generando un brillo excepcional de 360°. Perfectas para personalizar el espacio más fotografiado de tu evento.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Acrílico LED de alta luminosidad con acabado espejo</li>
  <li><strong>Alturas disponibles:</strong> 40cm, 60cm, 80cm y 100cm</li>
  <li><strong>Colores:</strong> Dorado, plata y rosa gold</li>
  <li><strong>Efecto visual:</strong> Brillo intenso 360° sin puntos muertos</li>
</ul>
<h2>¿Qué podés personalizar?</h2>
<p>Nombres propios, palabras clave de tu evento (<em>AMOR, SÍ, FOREVER</em>), iniciales de los novios, logos corporativos iluminados o cualquier texto corto que quieras destacar.</p>
<blockquote>Contanos la palabra o nombre que necesitás y te confirmamos disponibilidad. Trabajamos con letras mayúsculas de hasta 8 caracteres por pedido.</blockquote>
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
      { tipo: "acabado", nombre: "Acabado", valor: "Mate" },
      { tipo: "acabado", nombre: "Acabado", valor: "Brillante", precioAdicional: 2000 },
    ],
    precioAlquiler: 35000,
    precioVenta: 95000,
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
    descripcionLarga: `
<h2>Visibles desde el primer momento</h2>
<p>Números LED de gran formato que se convierten en el protagonista visual de la mesa de cumpleaños o la decoración del espacio. <strong>Visibles a más de 50 metros de distancia</strong>, son el complemento perfecto para que cada invitado sepa en qué celebración está.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> LED Tube de alta luminosidad</li>
  <li><strong>Alturas disponibles:</strong> 60cm, 80cm, 100cm y 120cm</li>
  <li><strong>Colores:</strong> Rosa, dorado, blanco y azul</li>
  <li><strong>Ubicación:</strong> Sobre mesa o apoyados en el suelo</li>
</ul>
<h2>Momentos ideales para usarlos</h2>
<p>Perfectos para mesas de cumpleaños, <em>age reveals</em>, baby showers, gender reveals y cualquier celebración donde el número o la fecha del evento sea el elemento central de la decoración.</p>
<blockquote>Disponibles del 0 al 9. Podés armar cualquier combinación de dos o más dígitos para años, fechas o edades especiales.</blockquote>
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
    precioAlquiler: 28000,
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
    descripcionLarga: `
<h2>La plataforma que eleva tu decoración</h2>
<p>Altillo de <strong>madera maciza de pino</strong> con tratamiento de sellador protector y acabado rústico natural. Pensado para elevar pasteles, piezas centrales y elementos decorativos, dándoles mayor protagonismo visual en el espacio del evento.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Madera maciza de pino tratada</li>
  <li><strong>Acabado:</strong> Rústico natural (también disponible en blanco y negro)</li>
  <li><strong>Dimensiones base:</strong> 2.00m × 1.00m × 40cm de alto</li>
  <li><strong>Capacidad de carga:</strong> Hasta 100 kg</li>
</ul>
<h2>¿Para qué usarlo?</h2>
<p>Ideal para elevar la torta principal en bodas y cumpleaños, crear podios para músicos o DJ, <em>exhibir centros florales monumentales</em> o usarlo como base fotográfica con contenido o elementos decorativos.</p>
<blockquote>El altillo se integra perfectamente con el Arco de Ceremonia y los Backings Florales de nuestro catálogo, formando un set de decoración completo.</blockquote>
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
      { tipo: "acabado", nombre: "Acabado", valor: "Mate" },
      { tipo: "acabado", nombre: "Acabado", valor: "Brillante", precioAdicional: 2000 },
    ],
    precioAlquiler: 32000,
    precioVenta: 85000,
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
    descripcionLarga: `
<h2>Elegancia grecolatina en tu evento</h2>
<p>Columna de estilo clásico con <strong>capitel corintio en acabado dorado mate</strong>. Una pieza decorativa que aporta solemnidad y elegancia atemporal, evocando la grandiosidad de la arquitectura clásica en cualquier evento de alta gama.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Fibra de vidrio de alta resistencia</li>
  <li><strong>Estilo:</strong> Corintio clásico con capitel tallado</li>
  <li><strong>Dimensiones base:</strong> 30cm × 30cm de base × 100cm de alto</li>
  <li><strong>Acabados disponibles:</strong> Dorado mate, plateado y blanco</li>
</ul>
<h2>Aplicaciones principales</h2>
<p>Perfecta como soporte para grandes centros florales, elemento estructural en escenografías temáticas de estilo clásico o griego, y como pieza decorativa de entrada en <em>cocktails y recepciones formales</em>.</p>
<blockquote>Las columnas se alquilan por unidad. Se recomienda usar en pares o grupos de cuatro para lograr una composición arquitectónica equilibrada.</blockquote>
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
    precioAlquiler: 22000,
    precioVenta: 65000,
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
    descripcionLarga: `
<h2>El ícono de las bodas elegantes</h2>
<p>La silla Tiffany en <strong>blanco brillante</strong> es la pieza más reconocida de la decoración de eventos nupciales. Su silueta liviana y refinada aporta distinción y clase sin sobrecargar el espacio visual del salón.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Plástico ABS de alta resistencia</li>
  <li><strong>Color base:</strong> Blanco brillante (también disponible en dorado, negro y champagne)</li>
  <li><strong>Dimensiones:</strong> 45cm × 45cm × 90cm de alto</li>
  <li><strong>Capacidad de carga:</strong> Hasta 150 kg</li>
  <li><strong>Apilable:</strong> Sí, facilita el transporte y almacenamiento</li>
</ul>
<h2>¿En qué tipo de eventos se usa?</h2>
<p>Perfectas para <em>ceremonias de boda al aire libre</em>, recepciones de gala, conferencias ejecutivas y cualquier evento formal donde la elegancia visual sea una prioridad.</p>
<blockquote>El precio es por unidad. Contamos con stock mínimo de 100 sillas. Para eventos de más de 200 personas, consultanos disponibilidad con anticipación.</blockquote>
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
      { tipo: "acabado", nombre: "Acabado", valor: "Mate" },
      { tipo: "acabado", nombre: "Acabado", valor: "Brillante", precioAdicional: 2000 },
    ],
    precioAlquiler: 4500,
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
    descripcionLarga: `
<h2>Confort y estilo en un solo mueble</h2>
<p>Sillón lounge de diseño moderno tapizado en <strong>terciopelo premium de alta densidad</strong>. Combina comodidad excepcional con una estética sofisticada que eleva instantáneamente la calidad visual de cualquier espacio del evento.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Terciopelo premium + estructura metálica lacada</li>
  <li><strong>Dimensiones:</strong> 70cm × 80cm × 80cm de alto</li>
  <li><strong>Base:</strong> Giratoria cromada de alta resistencia</li>
  <li><strong>Colores disponibles:</strong> Verde esmeralda, burdeos, azul navy y rosa pálido</li>
</ul>
<h2>¿Dónde brilla este sillón?</h2>
<p>Perfecto para armar <em>áreas lounge de alta gama</em>, zonas VIP en recepciones y bodas, corners de relax en eventos corporativos y como prop de lujo en sesiones fotográficas y producciones editoriales.</p>
<blockquote>Se alquila por unidad. Para armar un set lounge completo, podés combinar con la Mesa Redonda de Cristal y la Funda de Terciopelo Premium para banquetas. Consultanos composiciones personalizadas.</blockquote>
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
      { tipo: "acabado", nombre: "Acabado", valor: "Mate" },
      { tipo: "acabado", nombre: "Acabado", valor: "Brillante", precioAdicional: 2000 },
    ],
    precioAlquiler: 18000,
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
    descripcionLarga: `
<h2>El espejo perfecto del evento</h2>
<p>Esfera decorativa con <strong>superficie de acero inoxidable efecto espejo</strong> que refleja el entorno creando composiciones visuales únicas y sorprendentes en cada ángulo. Es la pieza que transforma cualquier espacio en una instalación de arte contemporáneo.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Acero inoxidable 304 pulido espejo</li>
  <li><strong>Diámetro base:</strong> 60cm (también disponible en 80cm y 100cm)</li>
  <li><strong>Peso:</strong> 12 kg</li>
  <li><strong>Resistencia:</strong> Apta para uso en intemperie</li>
</ul>
<h2>¿Cómo usarla en tu evento?</h2>
<p>Como <em>centro de mesa monumental</em>, instalación de ingreso, complemento de escenografías florales o como pieza independiente de alto impacto visual para bodas premium, eventos corporativos y sesiones fotográficas.</p>
<blockquote>Cada Big Shiny Ball capta y refleja la luz del evento, multiplicando visualmente la iluminación y creando puntos de interés en todo el salón.</blockquote>
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
      { tipo: "acabado", nombre: "Acabado", valor: "Mate" },
      { tipo: "acabado", nombre: "Acabado", valor: "Brillante", precioAdicional: 2000 },
    ],
    precioAlquiler: 42000,
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
    descripcionLarga: `
<h2>El dorado que llena el salón</h2>
<p>Gran esfera de 80cm con <strong>acabado dorado efecto espejo de máxima intensidad</strong>. Pieza escultórica que se convierte en el centro de atención de cualquier evento de lujo. Su superficie dorada captura cada fuente de luz y la proyecta de forma espectacular.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Acero inoxidable con recubrimiento dorado espejo</li>
  <li><strong>Diámetro:</strong> 80cm (también disponible en 100cm)</li>
  <li><strong>Peso:</strong> 22 kg</li>
  <li><strong>Acabados:</strong> Oro rosa espejo, oro amarillo y plata espejo</li>
</ul>
<h2>El impacto que merece tu evento</h2>
<p>Ideal para bodas temáticas doradas, <em>eventos de lujo</em>, recepciones de gala y cualquier celebración donde se busque un elemento de decoración que sea a la vez escultura y joya del salón.</p>
<blockquote>Recomendamos ubicarla sobre el Altillo de Madera o sobre la Mesa Redonda de Cristal para crear una composición decorativa de máximo nivel premium.</blockquote>
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
      { tipo: "acabado", nombre: "Acabado", valor: "Mate" },
      { tipo: "acabado", nombre: "Acabado", valor: "Brillante", precioAdicional: 2000 },
    ],
    precioAlquiler: 68000,
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
    descripcionLarga: `
<h2>El símbolo universal del amor</h2>
<p>El icónico corazón de flores, pieza <em>centerpiece</em> que se ha convertido en el símbolo del romanticismo en eventos. Elaborado con <strong>flores artificiales premium de alta calidad</strong> con una apariencia tan natural que sorprende a cada invitado.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Flores artificiales de alta calidad con aspecto natural</li>
  <li><strong>Dimensiones base:</strong> 1.20m × 1.20m (también disponible en 80cm y 1.50m)</li>
  <li><strong>Colores:</strong> Rosa, blanco, rojo y mixto personalizado</li>
  <li><strong>Estructura:</strong> Autosustentable, no necesita soporte externo</li>
</ul>
<h2>¿Cuándo es el momento ideal?</h2>
<p>Perfecto para el momento de la ceremonia, <em>sesiones de pedido de mano</em>, fotocabinas románticas, aniversarios y cualquier evento donde el amor sea el protagonista de la celebración.</p>
<blockquote>Cada corazón puede incorporar luces LED internas o pétalos sueltos dispersos en el suelo para amplificar el efecto romántico. Consultanos las opciones de personalización.</blockquote>
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
      { tipo: "acabado", nombre: "Acabado", valor: "Mate" },
      { tipo: "acabado", nombre: "Acabado", valor: "Brillante", precioAdicional: 2000 },
    ],
    precioAlquiler: 55000,
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
    descripcionLarga: `
<h2>La pared que define el espacio</h2>
<p>Extensa pared floral modular con <strong>cobertura total de flores artificiales de apariencia realista</strong>. La pieza de mayor impacto arquitectónico de nuestro catálogo, capaz de transformar por completo la estética de cualquier salón o espacio al aire libre.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Flores artificiales premium de alta calidad</li>
  <li><strong>Dimensiones base:</strong> 3.00m × 2.50m (también disponible en 4.00m × 2.50m)</li>
  <li><strong>Estructura:</strong> Modular, adaptable a cualquier espacio</li>
  <li><strong>Instalación:</strong> Profesional incluida en el alquiler</li>
</ul>
<h2>Usos más frecuentes</h2>
<p>Como <em>backdrop principal de la recepción</em>, divisor elegante de sectores del salón, fondo de escenario para espectáculos o como el photo booth más impactante de la celebración.</p>
<blockquote>Con 2 horas de montaje profesional, transformamos cualquier espacio en un jardín de ensueño. Coordinamos con el equipo de catering y producción del evento para que la instalación sea perfecta.</blockquote>
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
      { tipo: "acabado", nombre: "Acabado", valor: "Mate" },
      { tipo: "acabado", nombre: "Acabado", valor: "Brillante", precioAdicional: 2000 },
    ],
    precioAlquiler: 120000,
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
    descripcionLarga: `
<h2>El detalle que encanta a todos</h2>
<p>Set de <strong>20 mariposas LED</strong> con alas de apariencia realista e iluminación parpadeante. Se pueden adherir a paredes, techos, paneles florales o suspender con hilo de nylon para crear un efecto visual de ensueño.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Cantidad:</strong> 20 unidades por pack (también disponible pack x50)</li>
  <li><strong>Material:</strong> Plástico liviano con LED integrado</li>
  <li><strong>Envergadura:</strong> 10cm por mariposa</li>
  <li><strong>Colores:</strong> Multicolor RGB, blanco cálido y rosa</li>
</ul>
<h2>¿Dónde colocarlas?</h2>
<p>Son perfectas para decorar techos con efecto nube de mariposas, <em>integrarlas en paredes florales</em>, llenar de vida los arreglos de mesa o crear caminos de entrada mágicos para el ingreso de los novios.</p>
<blockquote>Las mariposas se pueden combinar con el Panel Floral Vintage o la Pared Floral Completa para crear instalaciones únicas que ningún invitado olvidará.</blockquote>
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
    precioAlquiler: 12000,
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
    descripcionLarga: `
<h2>La reina del espacio</h2>
<p>Gran mariposa LED decorativa de <strong>60cm de envergadura</strong>, perfecta como pieza focal única o para crear composiciones monumentales. El acabado metálico con iluminación LED integrada la convierte en una joya decorativa que captura miradas desde cualquier ángulo del salón.</p>
<h2>Características técnicas</h2>
<ul>
  <li><strong>Material:</strong> Metal estructural + LED integrado</li>
  <li><strong>Dimensiones:</strong> 60cm × 50cm (también disponible en 80cm × 65cm)</li>
  <li><strong>Colores:</strong> Dorado, rosa gold y plateado</li>
  <li><strong>Acabado:</strong> Metálico premium con efecto espejo</li>
</ul>
<h2>Usos más populares</h2>
<p>Como pieza central de <em>mesas de honor</em>, decoración de entrada al salón, complemento de paredes florales y como protagonista de sesiones fotográficas de moda y eventos premium.</p>
<blockquote>Combinada en grupos de 3 unidades de distintos tamaños, crea una instalación artística de alto impacto visual que eleva la estética de cualquier evento.</blockquote>
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
    precioAlquiler: 28000,
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
