import { TestimonialItem } from "@/types";
import { testimonialService } from "@/services/supabase/testimonials/service";

/**
 * Obtiene los testimonios para la administración.
 */
export async function fetchAdminTestimonials(): Promise<TestimonialItem[]> {
  try {
    return await testimonialService.getAll();
  } catch (error) {
    console.error("fetchAdminTestimonials Error:", error);
    return [];
  }
}
