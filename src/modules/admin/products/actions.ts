import { Producto } from "@/types";

export async function fetchAdminProducts(): Promise<Producto[]> {
  try {
    // Usamos URL absoluta en entorno servidor interno, o rutas relativas si pasamos la baseURL,
    // pero idealmente NextResponse llama la API localmente.
    // Para simplificar y dado que el admin se renderiza en cliente o SSR en localhost,
    // extraemos todo mediante fetch a la ruta API (siguiendo directriz de no consultar supabase directo).
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products?perPage=100`, { cache: 'no-store' });
    
    if (!res.ok) {
      throw new Error("Error fetching products from API");
    }

    const { data } = await res.json();
    return data || [];
  } catch (error) {
    console.error("fetchAdminProducts Error:", error);
    return [];
  }
}
