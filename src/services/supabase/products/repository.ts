import { supabase } from "../client";
import { ProductRow, CategoryRow, ProductFilters } from "./interfaces";

export class ProductRepository {
  private get db() {
    if (!supabase) {
      throw new Error('Supabase client is not initialized. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local and RESTART the server.');
    }
    return supabase;
  }

  /**
   * Obtiene productos con paginación y filtros opcionales.
   */
  async getProducts(
    page: number = 1,
    perPage: number = 8,
    filters?: ProductFilters
  ): Promise<{ data: ProductRow[]; count: number }> {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    let query = this.db
      .from('products')
      .select('*, categories!inner(*)', { count: 'exact' });

    // Aplicar Filtros
    if (filters?.categoriaSlug) {
      query = query.eq('categories.slug', filters.categoriaSlug);
    }
    
    if (filters?.destacado !== undefined) {
      query = query.eq('destacado', filters.destacado);
    }

    if (filters?.search) {
      query = query.ilike('nombre', `%${filters.search}%`);
    }

    // Orden y Paginación
    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    return { 
      data: (data || []) as ProductRow[], 
      count: count || 0 
    };
  }

  /**
   * Obtiene un producto por su slug con sus variantes y categoría.
   */
  async getProductBySlug(slug: string): Promise<ProductRow | null> {
    const { data, error } = await this.db
      .from('products')
      .select('*, categories(*), product_variants(*)')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No encontrado
      console.error('Error fetching product by slug:', error);
      throw error;
    }

    return data as ProductRow;
  }

  /**
   * Obtiene todas las categorías disponibles.
   */
  async getCategories(): Promise<CategoryRow[]> {
    const { data, error } = await this.db
      .from('categories')
      .select('*')
      .order('nombre');

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    return data as CategoryRow[];
  }
}
