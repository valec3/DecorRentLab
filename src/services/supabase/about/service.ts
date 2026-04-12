import { AboutRepository } from "./repository";
import { AboutContent } from "@/types";
import { AboutContentRow } from "./interfaces";

export class AboutService {
  private repository: AboutRepository;

  constructor() {
    this.repository = new AboutRepository();
  }

  async getAbout(): Promise<AboutContent | null> {
    const row = await this.repository.getAboutContent();
    if (!row) return null;
    return this.mapRowToDomain(row);
  }

  async updateAbout(data: Partial<AboutContent>): Promise<AboutContent> {
    const row = await this.repository.updateAboutContent(this.mapDomainToRow(data));
    return this.mapRowToDomain(row);
  }

  private mapRowToDomain(row: AboutContentRow): AboutContent {
    return {
      title: row.title,
      description: row.description,
      mainImage: row.main_image,
      historyTitle: row.history_title,
      historyParagraphs: row.history_paragraphs,
      servicesTitle: row.services_title,
      services: row.services,
      valuesTitle: row.values_title,
      values: row.values,
    };
  }

  private mapDomainToRow(data: Partial<AboutContent>): Partial<AboutContentRow> {
    const row: Partial<AboutContentRow> = {};
    if (data.title !== undefined) row.title = data.title;
    if (data.description !== undefined) row.description = data.description;
    if (data.mainImage !== undefined) row.main_image = data.mainImage;
    if (data.historyTitle !== undefined) row.history_title = data.historyTitle;
    if (data.historyParagraphs !== undefined) row.history_paragraphs = data.historyParagraphs;
    if (data.servicesTitle !== undefined) row.services_title = data.servicesTitle;
    if (data.services !== undefined) row.services = data.services;
    if (data.valuesTitle !== undefined) row.values_title = data.valuesTitle;
    if (data.values !== undefined) row.values = data.values;
    return row;
  }
}

export const aboutService = new AboutService();
