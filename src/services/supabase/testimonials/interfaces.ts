export interface TestimonialRow {
  id: string;
  name: string;
  event: string | null;
  text: string;
  image: string | null;
  rating: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TestimonialFilters {
  active?: boolean;
  search?: string;
}
