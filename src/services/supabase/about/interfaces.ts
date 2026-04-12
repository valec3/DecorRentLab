import { ServiceItem, ValueItem } from "@/types";

export interface AboutContentRow {
  id: string;
  title: string;
  description: string;
  main_image: string;
  history_title: string;
  history_paragraphs: string[];
  services_title: string;
  services: ServiceItem[];
  values_title: string;
  values: ValueItem[];
  updated_at?: string;
}
