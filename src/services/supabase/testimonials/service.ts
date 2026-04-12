import { TestimonialRepository } from "./repository";
import { TestimonialItem } from "@/types";
import { TestimonialRow, TestimonialFilters } from "./interfaces";

export class TestimonialService {
  private repository: TestimonialRepository;

  constructor() {
    this.repository = new TestimonialRepository();
  }

  async getAll(filters?: TestimonialFilters): Promise<TestimonialItem[]> {
    const rows = await this.repository.getTestimonials(filters);
    return rows.map((row) => this.mapRowToDomain(row));
  }

  async getById(id: string): Promise<TestimonialItem | null> {
    const row = await this.repository.getTestimonialById(id);
    if (!row) return null;
    return this.mapRowToDomain(row);
  }

  async create(data: Partial<TestimonialItem>): Promise<TestimonialItem> {
    const row = await this.repository.createTestimonial(this.mapDomainToRow(data));
    return this.mapRowToDomain(row);
  }

  async update(id: string, data: Partial<TestimonialItem>): Promise<TestimonialItem> {
    const row = await this.repository.updateTestimonial(id, this.mapDomainToRow(data));
    return this.mapRowToDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.repository.deleteTestimonial(id);
  }

  /**
   * Mapeadores
   */
  private mapRowToDomain(row: TestimonialRow): TestimonialItem {
    return {
      id: row.id,
      name: row.name,
      event: row.event || "",
      text: row.text,
      image: row.image || "",
      rating: row.rating,
      active: row.active,
    };
  }

  private mapDomainToRow(data: Partial<TestimonialItem>): Partial<TestimonialRow> {
    const row: Partial<TestimonialRow> = {};
    if (data.name !== undefined) row.name = data.name;
    if (data.event !== undefined) row.event = data.event;
    if (data.text !== undefined) row.text = data.text;
    if (data.image !== undefined) row.image = data.image;
    if (data.rating !== undefined) row.rating = data.rating;
    if (data.active !== undefined) row.active = data.active;
    return row;
  }
}

export const testimonialService = new TestimonialService();
