export interface Category {
    id: number | string;
    name: string;
    subcategories?: Category[];
  }