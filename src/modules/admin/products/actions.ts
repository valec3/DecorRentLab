import { Producto } from "@/types";
import { productService } from "@/services/supabase/products/service";

/**
 * Obtiene los productos para la administración.
 * Llama directamente al servicio de Supabase en el servidor.
 */
export async function fetchAdminProducts(): Promise<Producto[]> {
  try {
    const { data } = await productService.getPaginatedProducts(1, 100);
    return data || [];
  } catch (error) {
    console.error("fetchAdminProducts Error:", error);
    return [];
  }
}
