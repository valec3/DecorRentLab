// Definición de tipos para la base de datos de categorías (Schema: decor_store)

export interface CategoryRow {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  imagen_cover: string | null;
  created_at?: string;
}
