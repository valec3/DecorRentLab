import { createClient } from "@/services/supabase/server";
import { AboutContentRow } from "./interfaces";

export class AboutRepository {
  async getAboutContent(): Promise<AboutContentRow | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("about_content")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching about content:", error);
      return null;
    }

    return data;
  }

  async updateAboutContent(data: Partial<AboutContentRow>): Promise<AboutContentRow> {
    const supabase = await createClient();
    
    // First, check if a record exists
    const current = await this.getAboutContent();
    
    if (current) {
      const { data: updated, error } = await supabase
        .from("about_content")
        .update(data)
        .eq("id", current.id)
        .select()
        .single();

      if (error) throw error;
      return updated;
    } else {
      // If no record exists, create one
      const { data: created, error } = await supabase
        .from("about_content")
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      return created;
    }
  }
}
