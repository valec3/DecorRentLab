export interface Categoria {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  imagenCover: string;
}

export interface AtributoValor {
  id?: string;
  label: string;
  valor: string;
  precioAdicional: number;
}

export interface AtributoGrupo {
  id?: string;
  nombre: string;
  tipoUi: 'text' | 'color_picker' | 'select';
  opciones: AtributoValor[];
}

export interface Producto {
  id: string;
  nombre: string;
  slug: string;
  categoriaSlug: string;
  descripcionCorta: string;
  descripcionLarga: string;
  atributos?: AtributoGrupo[];
  precioVenta?: number;
  precioAlquiler?: number;
  promocion?: {
    precioOriginalVenta?: number;
    precioOriginalAlquiler?: number;
    etiqueta?: string;
  };
  peso?: string;
  garantia?: string;
  tiempoMontaje?: string;
  idealPara: string[];
  imagenes: string[];
  destacado: boolean;
  disponible: boolean;
  material?: string;
  medidas?: string;
  color?: string;
}

export interface Filtro {
  tipo: "categoria" | "estilo" | "color" | "disponibilidad";
  valor: string;
  label: string;
}

export interface ContactoForm {
  nombre: string;
  telefono: string;
  tipoEvento: string;
  fecha: string;
  mensaje: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  event: string;
  text: string;
  image: string;
  rating: number;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  primaryButtonText: string;
  whatsappMessage: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface AboutContent {
  title: string;
  description: string;
  mainImage: string;
  historyTitle: string;
  historyParagraphs: string[];
  servicesTitle: string;
  services: ServiceItem[];
  valuesTitle: string;
  values: ValueItem[];
}

export interface StepItem {
  title: string;
  description: string;
}

export interface PhilosophyItem {
  title: string;
  description: string;
}

export interface HomeContent {
  hero: HeroContent;
  howItWorks: {
    title: string;
    description: string;
    steps: StepItem[];
  };
  philosophy: {
    title: string;
    description: string;
    image: string;
    stats: {
      value: string;
      label: string;
    };
    items: PhilosophyItem[];
  };
  cta: {
    title: string;
    description: string;
    whatsappMessage: string;
  };
}
