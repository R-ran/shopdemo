export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price?: number | null;
  image_url: string;
  images: string[];
  category_id: string | null;
  stock: number;
  is_featured: boolean;
  is_bestseller: boolean;
  categories?: Category | null;
}
