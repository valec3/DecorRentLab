import { createClient as createServerSupabase } from "../server";
import { ContactInfoRow } from "./interfaces";

export class ContactRepository {
  private readonly table = "contact_info";
  private readonly schema = "decor_store";

  private async getDb() {
    return await createServerSupabase();
  }

  async getContactInfo(): Promise<ContactInfoRow | null> {
    const db = await this.getDb();
    const { data, error } = await db
      .schema(this.schema)
      .from(this.table)
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching contact info:", error);
      return null;
    }

    return data;
  }

  async upsertContactInfo(contact: Partial<ContactInfoRow>): Promise<ContactInfoRow> {
    const db = await this.getDb();
    const { data, error } = await db
      .schema(this.schema)
      .from(this.table)
      .upsert({ 
        id: contact.id || undefined,
        ...contact,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error("Error upserting contact info:", error);
      throw error;
    }

    return data;
  }

  async updateContactInfo(id: string, contact: Partial<ContactInfoRow>): Promise<ContactInfoRow> {
    const db = await this.getDb();
    const { data, error } = await db
      .schema(this.schema)
      .from(this.table)
      .update(contact)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error || !data) {
      console.error("Error updating contact info:", error || "Row not found");
      throw error || new Error("Row not found");
    }

    return data;
  }
}
