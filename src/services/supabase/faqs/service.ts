import { FaqItem } from "@/types";
import { FaqFilters, FaqRow } from "./interfaces";
import { FaqRepository, FaqUpsertRow } from "./repository";

export class FaqService {
  private repository: FaqRepository;

  constructor() {
    this.repository = new FaqRepository();
  }

  async getAll(filters?: FaqFilters): Promise<FaqItem[]> {
    const rows = await this.repository.getFaqs(filters);
    return rows.map((row) => this.mapRowToDomain(row));
  }

  async replaceAll(items: FaqItem[]): Promise<FaqItem[]> {
    const rows = items.map((item, index) => this.mapDomainToRow(item, index));
    const updated = await this.repository.replaceFaqs(rows);
    return updated.map((row) => this.mapRowToDomain(row));
  }

  private mapRowToDomain(row: FaqRow): FaqItem {
    return {
      id: row.id,
      question: row.question,
      answer: row.answer,
      orderIndex: row.order_index,
      active: row.active,
    };
  }

  private mapDomainToRow(item: FaqItem, orderIndex: number): FaqUpsertRow {
    const row: FaqUpsertRow = {
      question: item.question,
      answer: item.answer,
      order_index: item.orderIndex ?? orderIndex,
      active: item.active ?? true,
    };

    if (item.id) {
      row.id = item.id;
    }

    return row;
  }
}

export const faqService = new FaqService();
