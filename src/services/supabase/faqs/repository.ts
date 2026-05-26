import { createClient } from "@/services/supabase/server";
import { FaqFilters, FaqRow } from "./interfaces";

export type FaqUpsertRow = Partial<Omit<FaqRow, "created_at" | "updated_at">> & {
  question: string;
  answer: string;
  order_index: number;
  active: boolean;
};

export class FaqRepository {
  private async getDb() {
    return await createClient();
  }

  async getFaqs(filters?: FaqFilters): Promise<FaqRow[]> {
    const db = await this.getDb();
    let query = db.from("faqs").select("*");

    if (filters?.active !== undefined) {
      query = query.eq("active", filters.active);
    }

    const { data, error } = await query.order("order_index", { ascending: true });

    if (error) {
      console.error("Error fetching faqs:", error);
      throw error;
    }

    return (data || []) as FaqRow[];
  }

  async replaceFaqs(items: FaqUpsertRow[]): Promise<FaqRow[]> {
    const db = await this.getDb();
    const existing = await this.getFaqs();
    const existingIds = existing.map((item) => item.id);
    const incomingIds = items
      .map((item) => item.id)
      .filter((id): id is string => typeof id === "string" && id.length > 0);

    if (existingIds.length > 0) {
      if (incomingIds.length > 0) {
        const idsToDelete = existingIds.filter((id) => !incomingIds.includes(id));
        if (idsToDelete.length > 0) {
          const { error } = await db.from("faqs").delete().in("id", idsToDelete);
          if (error) throw error;
        }
      } else {
        const { error } = await db.from("faqs").delete().in("id", existingIds);
        if (error) throw error;
      }
    }

    const updates = items.filter((item) => item.id);
    if (updates.length > 0) {
      const { error } = await db
        .from("faqs")
        .upsert(updates, { onConflict: "id" });

      if (error) throw error;
    }

    const inserts = items.filter((item) => !item.id);
    if (inserts.length > 0) {
      const { error } = await db.from("faqs").insert(inserts);
      if (error) throw error;
    }

    return await this.getFaqs();
  }
}
