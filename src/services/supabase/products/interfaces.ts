import { Producto, Variante } from "@/types";

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
  peso: string | null;
  garantia: string | null;
  tiempo_montaje: string | null;
  ideal_para: string[] | null;
  imagenes: string[] | null;
  destacado: boolean;
  disponible: boolean;
  material: string | null;
  medidas: string | null;
  color: string | null;
  created_at?: string;
  // Joins
  categories?: CategoryRow;
  product_variants?: VariantRow[];
}

export interface VariantRow {
  id: string;
  producto_id: string;
  tipo: "material" | "medida" | "color" | "acabado";
  nombre: string;
  valor: string;
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
