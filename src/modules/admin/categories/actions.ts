import { Categoria } from "@/types";
import { categoryService } from "@/services/supabase/categories/service";

/**
 * Obtiene las categorías para la administración.
 * Llama directamente al servicio de Supabase en el servidor.
 */
export async function fetchAdminCategories(): Promise<Categoria[]> {
  try {
    const data = await categoryService.getCategories();
    return data || [];
  } catch (error) {
    console.error("fetchAdminCategories Error:", error);
    return [];
  }
}
