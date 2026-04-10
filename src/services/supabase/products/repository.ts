import { createClient as createServerSupabase } from "../server";
import {
  ProductRow,
  CategoryRow,
  ProductFilters,
  VariantRow,
} from "./interfaces";

export class ProductRepository {
  private async getDb() {
    // SIEMPRE usar el cliente de servidor para asegurar RLS y seguridad.
    // Este repositorio solo debe ser llamado desde Server Components, API Routes o Server Actions.
    return await createServerSupabase();
  }

  /**
   * Obtiene productos con paginación y filtros opcionales.
   */
  async getProducts(
    page: number = 1,
    perPage: number = 8,
    filters?: ProductFilters,
  ): Promise<{ data: ProductRow[]; count: number }> {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    const db = await this.getDb();

    let query = db
      .from("products")
      .select("*, categories!inner(*)", { count: "exact" });

    // Aplicar Filtros
    if (filters?.categoriaSlug) {
      query = query.eq("categories.slug", filters.categoriaSlug);
    }

    if (filters?.destacado !== undefined) {
      query = query.eq("destacado", filters.destacado);
    }

    if (filters?.search) {
      query = query.ilike("nombre", `%${filters.search}%`);
    }

    // Orden y Paginación
    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Error fetching products:", error);
      throw error;
    }

    return {
      data: (data || []) as ProductRow[],
      count: count || 0,
    };
  }

  /**
   * Obtiene un producto por su slug o ID con sus variantes y categoría.
   */
  async getProductBySlugOrId(slugOrId: string): Promise<ProductRow | null> {
    const db = await this.getDb();
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        slugOrId,
      );
    let query = db
      .from("products")
      .select("*, categories(*), atributo_grupos(*, atributo_valores(*))");

    if (isUuid) {
      query = query.eq("id", slugOrId);
    } else {
      query = query.eq("slug", slugOrId);
    }

    const { data, error } = await query.single();

    if (error) {
      if (error.code === "PGRST116") return null; // No encontrado
      console.error("Error fetching product by slug/id:", error);
      throw error;
    }

    return data as ProductRow;
  }

  async createProduct(
    product: Partial<ProductRow> & {
      categoria_slug_temp?: string;
      product_variants?: Partial<VariantRow>[];
    },
  ): Promise<ProductRow> {
    const db = await this.getDb();
    // Si viene categoria_slug_temp, resolvemos el ID
    if (product.categoria_slug_temp) {
      const { data: cat } = await db
        .from("categories")
        .select("id")
        .eq("slug", product.categoria_slug_temp)
        .single();
      if (cat) product.categoria_id = cat.id;
    }

    // Separamos las variantes de los datos del producto
    const {
      product_variants,
      categoria_slug_temp: _unused,
      ...insertData
    } = product;

    const { data: newProduct, error } = await db

      .from("products")
      .insert(insertData)
      .select("*, categories(*)")
      .single();

    if (error) {
      console.error("Supabase error (code 42501 usually means RLS):", error);
      throw error;
    }

    // Insertar atributos si existen (MVP: Estrategia simple)
    if (product.atributos && product.atributos.length > 0) {
      for (const grupo of product.atributos) {
        const { data: newGrupo } = await db
          .from("atributo_grupos")
          .insert({
            producto_id: newProduct.id,
            nombre: grupo.nombre,
            tipo_ui: grupo.tipoUi,
          })
          .select()
          .single();

        if (newGrupo && grupo.opciones && grupo.opciones.length > 0) {
          const opciones = grupo.opciones.map((o) => ({
            grupo_id: newGrupo.id,
            label: o.label,
            valor: o.valor,
            precio_adicional: o.precioAdicional || 0,
          }));
          await db.from("atributo_valores").insert(opciones);
        }
      }
    }

    return newProduct as ProductRow;
  }

  async updateProduct(
    idOrSlug: string,
    product: Partial<ProductRow> & {
      categoria_slug_temp?: string;
      product_variants?: Partial<VariantRow>[];
    },
  ): Promise<ProductRow> {
    const db = await this.getDb();
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        idOrSlug,
      );

    if (product.categoria_slug_temp) {
      const { data: cat } = await db
        .from("categories")
        .select("id")
        .eq("slug", product.categoria_slug_temp)
        .single();
      if (cat) product.categoria_id = cat.id;
    }

    // Separamos las variantes
    const {
      product_variants,
      categoria_slug_temp: _unused2,
      ...updateData
    } = product;
    let query = db.from("products").update(updateData);

    if (isUuid) query = query.eq("id", idOrSlug);
    else query = query.eq("slug", idOrSlug);

    const { data: updatedProduct, error } = await query
      .select("*, categories(*)")
      .single();
    if (error) throw error;

    // Actualizar atributos (Estrategia MVP: Borrar y Reinsertar)
    if (product.atributos) {
      await db.from("atributo_grupos").delete().eq("producto_id", updatedProduct.id);

      if (product.atributos.length > 0) {
        for (const grupo of product.atributos) {
          const { data: newGrupo } = await db
            .from("atributo_grupos")
            .insert({
              producto_id: updatedProduct.id,
              nombre: grupo.nombre,
              tipo_ui: grupo.tipoUi,
            })
            .select()
            .single();

          if (newGrupo && grupo.opciones && grupo.opciones.length > 0) {
            const opciones = grupo.opciones.map((o) => ({
              grupo_id: newGrupo.id,
              label: o.label,
              valor: o.valor,
              precio_adicional: o.precioAdicional || 0,
            }));
            await db.from("atributo_valores").insert(opciones);
          }
        }
      }
    }

    return updatedProduct as ProductRow;
  }

  async deleteProduct(idOrSlug: string): Promise<void> {
    const db = await this.getDb();
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        idOrSlug,
      );
    let query = db.from("products").delete();
    if (isUuid) query = query.eq("id", idOrSlug);
    else query = query.eq("slug", idOrSlug);

    const { error } = await query;
    if (error) throw error;
  }

  /**
   * Obtiene todas las categorías disponibles.
   */
  async getCategories(): Promise<CategoryRow[]> {
    const db = await this.getDb();
    const { data, error } = await db
      .from("categories")
      .select("*")
      .order("nombre");

    if (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }

    return data as CategoryRow[];
  }

  async createCategory(category: Partial<CategoryRow>): Promise<CategoryRow> {
    const db = await this.getDb();
    const { data, error } = await db
      .from("categories")
      .insert(category)
      .select()
      .single();
    if (error) throw error;
    return data as CategoryRow;
  }

  async updateCategory(
    id: string,
    category: Partial<CategoryRow>,
  ): Promise<CategoryRow> {
    const db = await this.getDb();
    const { data, error } = await db
      .from("categories")
      .update(category)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as CategoryRow;
  }

  async deleteCategory(id: string): Promise<void> {
    const db = await this.getDb();
    const { error } = await db.from("categories").delete().eq("id", id);
    if (error) throw error;
  }
}
