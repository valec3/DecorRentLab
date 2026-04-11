import { createClient as createServerSupabase } from "../server";
import { CategoryRow } from "./interfaces";

export class CategoryRepository {
  private async getDb() {
    // SIEMPRE usar el cliente de servidor para asegurar RLS y seguridad.
    return await createServerSupabase();
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

  /**
   * Obtiene una categoría por su slug o ID.
   */
  async getCategoryByIdOrSlug(idOrSlug: string): Promise<CategoryRow | null> {
    const db = await this.getDb();
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        idOrSlug,
      );
    
    let query = db.from("categories").select("*");
    if (isUuid) {
      query = query.eq("id", idOrSlug);
    } else {
      query = query.eq("slug", idOrSlug);
    }

    const { data, error } = await query.single();

    if (error) {
      if (error.code === "PGRST116") return null;
      console.error("Error fetching category by slug/id:", error);
      throw error;
    }

    return data as CategoryRow;
  }

  async createCategory(category: Partial<CategoryRow>): Promise<CategoryRow> {
    const db = await this.getDb();
    const { data, error } = await db
      .from("categories")
      .insert(category)
      .select()
      .single();
      
    if (error) {
      console.error("Error creating category:", error);
      throw error;
    }
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
      
    if (error) {
      console.error("Error updating category:", error);
      throw error;
    }
    return data as CategoryRow;
  }

  async deleteCategory(id: string): Promise<void> {
    const db = await this.getDb();
    const { error } = await db.from("categories").delete().eq("id", id);
    if (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
}
