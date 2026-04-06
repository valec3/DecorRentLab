import { Categoria } from "@/types";

export async function fetchAdminCategories(): Promise<Categoria[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
    
    if (!res.ok) {
      throw new Error("Error fetching categories from API");
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("fetchAdminCategories Error:", error);
    return [];
  }
}
