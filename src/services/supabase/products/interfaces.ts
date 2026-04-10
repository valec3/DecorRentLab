// Definición de tipos para la base de datos (Schema: decor_store)

export interface CategoryRow {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  imagen_cover: string | null;
  created_at?: string;
}

export interface ProductRow {
  id: string;
  nombre: string;
  slug: string;
  categoria_id: string;
  descripcion_corta: string | null;
  descripcion_larga: string | null;
  precio_venta: number | null;
  precio_alquiler: number | null;
  precio_original_venta: number | null;
  precio_original_alquiler: number | null;
  etiqueta_promocion: string | null;
  imagenes: string[] | null;
  destacado: boolean;
  disponible: boolean;
  peso: string | null;
  garantia: string | null;
  tiempo_montaje: string | null;
  ideal_para: string[] | null;
  created_at?: string;
  // Joins
  categories?: CategoryRow;
  atributo_grupos?: AttributeGroupRow[];
}

export interface AttributeGroupRow {
  id: string;
  producto_id: string;
  nombre: string; // e.g., 'Color', 'Material'
  tipo_ui: 'text' | 'color_picker' | 'select';
  created_at?: string;
  // Joins
  atributo_valores?: AttributeValueRow[];
}

export interface AttributeValueRow {
  id: string;
  grupo_id: string;
  label: string; // e.g., 'Dorado'
  valor: string; // e.g., '#FFD700'
  precio_adicional: number;
  created_at?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  count: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface ProductFilters {
  categoriaSlug?: string;
  search?: string;
  destacado?: boolean;
}
