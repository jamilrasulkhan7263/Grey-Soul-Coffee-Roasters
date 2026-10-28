export type DietaryTag =
  | 'Single Estate'
  | 'Direct Trade'
  | 'Micro-Lot'
  | 'Bestseller'
  | 'Vegan'
  | 'Veg'
  | 'Gluten-Free'
  | 'Award-Winner'
  | 'Limited Batch';

export type MenuCategory =
  | 'All'
  | 'Specialty Beans'
  | 'Tasting Bar'
  | 'Bakery Pairings';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All'>;
  subcategory?: string;
  price: number; // in ₹ INR
  description: string;
  origin?: string;
  elevation?: string;
  process?: string;
  roastProfile?: string;
  tags: DietaryTag[];
  rating: number; // e.g. 4.9
  reviewCount: number;
  emoji: string;
  ingredients: string[];
  allergens: string[];
  calories: string;
  prepTime: string;
  tastingNotes?: string[];
  imagePlaceholderColor?: string;
  sku?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  customization?: string;
}

export interface ReservationData {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference:
    | 'Slow Brew & Cupping Bar'
    | 'Espresso Tasting Counter'
    | 'Bandra West Courtyard'
    | 'Roaster Mezzanine'
    | 'Any Available';
  specialRequests?: string;
}
