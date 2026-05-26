export interface FaqRow {
  id: string;
  question: string;
  answer: string;
  order_index: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FaqFilters {
  active?: boolean;
}
