export interface Categoria {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  imagenCover: string;
}

export interface Variante {
  tipo: "material" | "medida" | "color";
  nombre: string;
  valor: string;
  precioAdicional?: number;
}

export interface VarianteSeleccionada {
  varianteId: string;
  valor: string;
  precioAdicional: number;
}

export interface Producto {
  id: string;
  nombre: string;
  slug: string;
  categoriaSlug: string;
  descripcionCorta: string;
  descripcionLarga: string;
  variantes?: Variante[];
  precio?: number;
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
