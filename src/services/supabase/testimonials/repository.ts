import { createClient as createServerSupabase } from "../server";
import { TestimonialRow, TestimonialFilters } from "./interfaces";

export class TestimonialRepository {
  private async getDb() {
    return await createServerSupabase();
  }

  async getTestimonials(filters?: TestimonialFilters): Promise<TestimonialRow[]> {
    const db = await this.getDb();
    let query = db.from("testimonials").select("*");

    if (filters?.active !== undefined) {
      query = query.eq("active", filters.active);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,text.ilike.%${filters.search}%`);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching testimonials:", error);
      throw error;
    }

    return (data || []) as TestimonialRow[];
  }

  async getTestimonialById(id: string): Promise<TestimonialRow | null> {
    const db = await this.getDb();
    const { data, error } = await db
      .from("testimonials")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }

    return data as TestimonialRow;
  }

  async createTestimonial(testimonial: Partial<TestimonialRow>): Promise<TestimonialRow> {
    const db = await this.getDb();
    const { data, error } = await db
      .from("testimonials")
      .insert(testimonial)
      .select()
      .single();

    if (error) throw error;
    return data as TestimonialRow;
  }

  async updateTestimonial(id: string, testimonial: Partial<TestimonialRow>): Promise<TestimonialRow> {
    const db = await this.getDb();
    const { data, error } = await db
      .from("testimonials")
      .update(testimonial)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as TestimonialRow;
  }

  async deleteTestimonial(id: string): Promise<void> {
    const db = await this.getDb();
    const { error } = await db.from("testimonials").delete().eq("id", id);
    if (error) throw error;
  }
}
