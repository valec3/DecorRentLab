import { FaqItem } from "@/types";
import { faqService } from "@/services/supabase/faqs/service";

export async function fetchFaqs(): Promise<FaqItem[]> {
  try {
    return await faqService.getAll();
  } catch (error) {
    console.error("fetchFaqs Error:", error);
    return [];
  }
}
