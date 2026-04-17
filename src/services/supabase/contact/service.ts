import { ContactRepository } from "./repository";
import { ContactInfo } from "@/types";
import { ContactInfoRow } from "./interfaces";

export class ContactService {
  private repository: ContactRepository;

  constructor() {
    this.repository = new ContactRepository();
  }

  async getContactInfo(): Promise<ContactInfo | null> {
    const row = await this.repository.getContactInfo();
    if (!row) return null;
    return this.mapRowToContact(row);
  }

  async saveContactInfo(contact: Partial<ContactInfo>): Promise<ContactInfo> {
    const row = await this.repository.upsertContactInfo({
      id: contact.id,
      phone: contact.phone,
      email: contact.email,
      address: contact.address,
      hours: contact.hours,
      whatsapp_number: contact.whatsappNumber,
    });
    return this.mapRowToContact(row);
  }

  async updateContactInfo(id: string, contact: Partial<ContactInfo>): Promise<ContactInfo> {
    const row = await this.repository.updateContactInfo(id, {
      phone: contact.phone,
      email: contact.email,
      address: contact.address,
      hours: contact.hours,
      whatsapp_number: contact.whatsappNumber,
    });
    return this.mapRowToContact(row);
  }

  private mapRowToContact(row: ContactInfoRow): ContactInfo {
    return {
      id: row.id,
      phone: row.phone,
      email: row.email,
      address: row.address,
      hours: row.hours,
      whatsappNumber: row.whatsapp_number,
    };
  }
}

export const contactService = new ContactService();
